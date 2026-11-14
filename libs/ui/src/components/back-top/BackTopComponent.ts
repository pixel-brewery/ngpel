// #region Imports

import { type ExtendedScrollToOptions } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    type AnimationCallbackEvent,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    effect,
    ElementRef,
    HostBinding,
    inject,
    input,
    output,
    signal,
} from '@angular/core';
import { FloatingActionButtonComponent, IconNameDirective } from '@pixel-brewery/mosaik-elements-angular';
import { AnimationPlayer, AnimationPreset } from '@pixel-brewery/mosaik-elements-foundation';

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
            <div part="root" (animate.enter)="onEnter($event)" (animate.leave)="onLeave($event)">
                <mosaik-fab
                    part="button"
                    [attr.aria-label]="label()"
                    [attr.test-id]="testId()"
                    [appearance]="'solid'"
                    [iconName]="'chevronUp'"
                    [size]="size()"
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
export class BackTopComponent implements AfterViewInit {
    // #region Fields

    private readonly _elementRef = inject(ElementRef<HTMLElement>);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _animationPlayer = inject(AnimationPlayer, { optional: true }) ?? new AnimationPlayer();
    private readonly _viewReady = signal(false);
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
        // Routed views may join their scroll container only after the first render.
        const capturedScroll = (event: Event) => {
            const scrollable = this.findScrollContainer();
            if (scrollable && event.target === scrollable) {
                this._scrollable.set(scrollable);
                this.updateVisibility();
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', capturedScroll, { capture: true, passive: true });
            this._destroyRef.onDestroy(() => window.removeEventListener('scroll', capturedScroll, true));
        }

        effect((onCleanup) => {
            if (!this._viewReady()) {
                return;
            }

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
            const revealAfter = this.revealAfter();
            if (revealAfter) {
                resizeObserver?.observe(revealAfter);
            }
            for (const child of Array.from(scrollable.children)) {
                resizeObserver?.observe(child);
            }

            onCleanup(() => {
                scrollable.removeEventListener('scroll', scrollHandler);
                resizeObserver?.disconnect();
            });
        });
    }

    /** Starts observing the scroll container once the view is mounted. */
    public ngAfterViewInit(): void {
        this._viewReady.set(true);
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

    /** Shows the control after this element has fully scrolled above the container. */
    public readonly revealAfter = input<HTMLElement | null>(null);

    /** Explicit scroll target when the component is outside the scrolling subtree. */
    public readonly scrollable = input<HTMLElement | null>(null);

    /** Accessible label for the action. */
    public readonly label = input<string>('');

    /** Stable automation identifier for the action. */
    public readonly testId = input<string>('back-top');

    /** Whether the floating action button fades in and out. */
    public readonly animate = input(false, { transform: booleanAttribute });

    /** Size of the floating action button. Pass `undefined` to use the host theme default. */
    public readonly size = input<ReturnType<FloatingActionButtonComponent['size']>>('large');

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
        // The host can be attached to its scroll container after the first effect runs.
        const scrollable = this.findScrollContainer() ?? this._scrollable();
        if (!scrollable) {
            return;
        }

        const behavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';
        scrollable.scrollTo({ ...(this.options() ?? { top: 0 }), behavior });
        this.restored.emit({ sender: this, restored: true });
    }

    /** Fades in the button using the Mosaik preset. */
    protected onEnter(event: AnimationCallbackEvent): void {
        if (!this.animate()) {
            event.animationComplete();
            return;
        }

        const element = event.target as HTMLElement;
        element.style.opacity = '0';
        void this._animationPlayer.playToFinal(element, AnimationPreset.fadeIn).finally(() => event.animationComplete());
    }

    /** Keeps the button mounted until Mosaik's fade-out has finished. */
    protected onLeave(event: AnimationCallbackEvent): void {
        if (!this.animate()) {
            event.animationComplete();
            return;
        }

        const element = event.target as HTMLElement;
        const opacity = window.getComputedStyle(element).opacity;

        void this._animationPlayer
            .stopAll(element)
            .then(() => {
                // Preserve the current fade-in frame if scrolling reverses direction mid-animation.
                element.style.opacity = opacity;
                return this._animationPlayer.playToFinal(element, AnimationPreset.fadeOut);
            })
            .finally(() => event.animationComplete());
    }

    /**
     * Updates the visibility state from the current scroll container position.
     *
     * @private
     */
    private updateVisibility(): void {
        const currentScrollable = this._scrollable();
        if (!currentScrollable) {
            this._visible.set(false);
            this._position.set(0);
            return;
        }

        const revealAfter = this.revealAfter();
        const pastThreshold = revealAfter
            ? revealAfter.getBoundingClientRect().bottom <= currentScrollable.getBoundingClientRect().top
            : currentScrollable.scrollTop > this.offset();
        this._visible.set(currentScrollable.scrollHeight > currentScrollable.clientHeight && pastThreshold);
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
            const isScrollable = ['auto', 'scroll', 'overlay'].includes(overflowY) || ['auto', 'scroll', 'overlay'].includes(overflowX);

            // Loading content can make this container scrollable after the button is initialized.
            if (isScrollable) {
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
