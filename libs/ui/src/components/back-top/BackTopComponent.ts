// #region Imports

import { type ExtendedScrollToOptions } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, HostBinding, inject, input, output, signal } from '@angular/core';
import { FloatingActionButtonComponent, IconNameDirective } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Displays a floating back-to-top button that scrolls the nearest scroll container to the top.
 *
 * @public
 */
@Component({
    selector: 'ngp-back-top',
    template: `
        @if (visible()) {
            <div part="root">
                <mosaik-fab
                    part="button"
                    [attr.aria-label]="label()"
                    [attr.test-id]="testId()"
                    [appearance]="'solid'"
                    [iconName]="'chevronUp'"
                    [size]="'large'"
                    [variant]="'primary'"
                    (click)="onClick()"
                >
                    <span slot="label" class="sr-only">{{ label() }}</span>
                </mosaik-fab>
            </div>
        }
    `,
    styleUrls: ['./BackTopComponent.scss'],
    exportAs: 'backTop',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FloatingActionButtonComponent, IconNameDirective],
})
export class BackTopComponent {
    // #region Fields

    private readonly _elementRef = inject(ElementRef<HTMLElement>);
    private readonly _scrollable = signal<HTMLElement | null>(null);
    private readonly _visible = signal(false);
    private readonly _position = signal(0);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `BackTopComponent` class.
     *
     * @public
     */
    public constructor() {
        effect((onCleanup) => {
            const scrollable = this.findScrollContainer();
            this._scrollable.set(scrollable);
            this.updateVisibility();

            if (!scrollable) {
                return;
            }

            const scrollHandler = () => this.updateVisibility();
            const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scrollHandler);
            scrollable.addEventListener('scroll', scrollHandler, { passive: true });
            resizeObserver?.observe(scrollable);
            for (const child of Array.from(scrollable.children)) {
                resizeObserver?.observe(child);
            }

            onCleanup(() => {
                scrollable.removeEventListener('scroll', scrollHandler);
                resizeObserver?.disconnect();
            });
        });
    }

    // #endregion

    // #region Properties

    /**
     * The scroll offset before the button becomes visible.
     *
     * @public
     * @readonly
     */
    public readonly offset = input<number>(120);

    /** Explicit scroll target when the component is outside the scrolling subtree. */
    public readonly scrollable = input<HTMLElement | null>(null);

    /** Accessible label for the action. */
    public readonly label = input<string>('');

    /** Stable automation identifier for the action. */
    public readonly testId = input<string>('back-top');

    /**
     * The scroll options applied when the button is clicked.
     *
     * @public
     * @readonly
     */
    public readonly options = input<ExtendedScrollToOptions | null | undefined>({ top: 0, behavior: 'smooth' });

    /**
     * Emits when the scroll-to-top action completes.
     *
     * @public
     * @readonly
     */
    public readonly restored = output<{ sender: BackTopComponent; restored: boolean }>();

    /**
     * Indicates whether the button is currently visible.
     *
     * @public
     * @readonly
     */
    public readonly visible = computed(() => this._visible());

    /**
     * Indicates the current scroll progress of the active container.
     *
     * @public
     * @readonly
     */
    public readonly position = computed(() => this._position());

    /**
     * Applies an active class when the button is visible.
     *
     * @protected
     * @readonly
     */
    @HostBinding('class.active')
    protected get active(): boolean {
        return this.visible();
    }

    // #endregion

    // #region Methods

    /**
     * Scrolls the nearest scroll container back to the top.
     *
     * @protected
     */
    protected onClick(): void {
        const scrollable = this._scrollable();
        if (!scrollable) {
            return;
        }

        const behavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';
        scrollable.scrollTo({ ...(this.options() ?? { top: 0 }), behavior });
        this.restored.emit({ sender: this, restored: true });
    }

    /**
     * Updates the visibility state from the current scroll container position.
     *
     * @private
     */
    private updateVisibility(): void {
        const currentScrollable = this._scrollable();
        if (!currentScrollable) {
            return;
        }

        const offset = currentScrollable.scrollTop;
        this._visible.set(currentScrollable.scrollHeight > currentScrollable.clientHeight && offset > this.offset());
        this._position.set(this.getPosition(currentScrollable));
    }

    /**
     * Finds the nearest scrollable ancestor for the host element.
     *
     * @private
     */
    private findScrollContainer(): HTMLElement | null {
        const explicitScrollable = this.scrollable();
        if (explicitScrollable) {
            return explicitScrollable;
        }

        let currentElement: HTMLElement | null = this._elementRef.nativeElement.parentElement;

        while (currentElement) {
            const style = window.getComputedStyle(currentElement);
            const overflowY = style.overflowY;
            const overflowX = style.overflowX;
            const canScroll = currentElement.scrollHeight > currentElement.clientHeight;
            const isScrollable = ['auto', 'scroll', 'overlay'].includes(overflowY) || ['auto', 'scroll', 'overlay'].includes(overflowX);

            if (isScrollable && canScroll) {
                return currentElement;
            }

            currentElement = currentElement.parentElement;
        }

        return null;
    }

    /**
     * Resolves the current scroll progress from the provided element.
     *
     * @private
     */
    private getPosition(element?: HTMLElement | null): number {
        if (!element) {
            return 0;
        }

        return Math.round((100 / Math.max(element.scrollHeight - element.offsetHeight, 1)) * element.scrollTop) || 0;
    }

    private prefersReducedMotion(): boolean {
        return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // #endregion
}
