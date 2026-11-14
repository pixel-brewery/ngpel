import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FloatingActionButtonComponent, IconNameDirective, TooltipDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { IHasElementRef } from '../../directives/hover-reveal-for/IHasElementRef';

/**
 * Switches the application navigation between its labelled and icon-only forms.
 * The shell owns the persisted state and positions the control through its inline and block offsets.
 *
 * @public
 */
@Component({
    selector: 'ngp-navigation-collapse-toggle',
    imports: [FloatingActionButtonComponent, IconNameDirective, TooltipDirective],
    template: `
        <mosaik-fab
            part="button"
            [class.ngp-edge-button]="edgeButton()"
            [attr.test-id]="testId() || null"
            [attr.aria-label]="label()"
            [attr.aria-expanded]="!collapsed()"
            [attr.aria-controls]="navigationId()"
            [attr.aria-keyshortcuts]="ariaShortcut()"
            [appearance]="'outline'"
            [size]="'small'"
            [iconName]="collapsed() ? 'chevronRight' : 'chevronLeft'"
            [disabled]="disabled()"
            [mosaikTooltip]="edgeButton() ? { content: tooltip(), showDelay: 400 } : tooltip()"
            [mosaikTooltipPlacement]="'right'"
        >
            <span slot="label" class="sr-only">{{ label() }}</span>
        </mosaik-fab>
    `,
    styles: `
        :host {
            position: absolute;
            inset-inline-start: var(--ngp-navigation-collapse-toggle-x, var(--app-nav-width, 0px));
            inset-block-start: var(--ngp-navigation-collapse-toggle-y, 50%);
            transform: translate(-50%, -50%);
            z-index: var(--ngp-navigation-collapse-toggle-layer, 1);
            display: grid;
            place-items: center;
        }
        :host([data-ngp-edge-button]) {
            width: 44px;
            height: 44px;
            cursor: pointer;
        }
        .ngp-edge-button {
            width: 28px;
            height: 28px;
            --fab-border-radius: 9999px;
            --fab-background-color: var(--mosaik-scheme-surface);
            --fab-focus-ring-color: var(--mosaik-color-primary-500);
        }
        .ngp-edge-button:hover {
            --fab-background-color: var(--mosaik-scheme-background);
        }
        @media (hover: hover) {
            :host([data-ngp-navigation]:not(:hover):not([data-ngp-revealed])) {
                opacity: 0;
            }
            :host {
                transition: opacity var(--mosaik-duration-short) ease;
            }
        }
        @media (hover: hover) and (prefers-reduced-motion: no-preference) {
            :host([data-ngp-edge-button]) {
                transition:
                    opacity 160ms ease-in 80ms,
                    inset-inline-start var(--mosaik-duration-short) ease;
            }
            :host([data-ngp-edge-button]:is(:hover, [data-ngp-revealed])) {
                transition:
                    opacity 120ms ease-out,
                    inset-inline-start var(--mosaik-duration-short) ease;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            :host {
                transition: none;
            }
        }
    `,
    host: {
        '[attr.data-ngp-edge-button]': 'edgeButton() ? "" : null',
        '[attr.data-ngp-navigation]': 'navigation() ? "" : null',
        '[attr.data-ngp-revealed]': 'revealed() ? "" : null',
        '(click)': 'activate()',
        '(focusin)': 'focusEntered($event)',
        '(focusout)': 'focusLeft()',
        '(keydown)': 'keyboardFocused()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationCollapseToggleComponent {
    // #region Fields

    private readonly _window = inject(DOCUMENT).defaultView;
    private readonly _apple = isApplePlatform(this._window?.navigator);
    private readonly _navigationHovered = signal(false);
    private readonly _keyboardFocused = signal(false);

    // #endregion

    // #region Ctor

    /** Connects the navigation hover group and optional platform shortcut to the toggle lifetime. */
    public constructor() {
        effect((onCleanup) => {
            const navigation = this.navigation()?.elementRef.nativeElement;
            if (!navigation) {
                return;
            }
            const enter = (): void => this._navigationHovered.set(true);
            const leave = (): void => this._navigationHovered.set(false);
            navigation.addEventListener('pointerenter', enter);
            navigation.addEventListener('pointerleave', leave);
            onCleanup(() => {
                navigation.removeEventListener('pointerenter', enter);
                navigation.removeEventListener('pointerleave', leave);
                leave();
            });
        });
        effect((onCleanup) => {
            const key = this.shortcutKey().toLowerCase();
            if (!key || !this._window || this.disabled()) {
                return;
            }
            const onKeyDown = (event: KeyboardEvent): void => this.onShortcut(event, key);
            this._window.addEventListener('keydown', onKeyDown);
            onCleanup(() => this._window?.removeEventListener('keydown', onKeyDown));
        });
    }

    // #endregion

    // #region Properties

    /** Navigation host providing the hover region and accessible controls ID. */
    public readonly navigation = input<IHasElementRef | null>(null);
    /** Whether the shell currently renders icon-only navigation. */
    public readonly collapsed = input.required<boolean>();
    /** Accessible name of the current action, supplied by the shell. */
    public readonly label = input.required<string>();
    /** Optional key to combine with Ctrl or Command. */
    public readonly shortcutKey = input('');
    /** Localized name of Ctrl displayed in the shortcut tooltip. */
    public readonly controlKeyLabel = input('Ctrl');
    /** Whether pointer and keyboard activation are unavailable. */
    public readonly disabled = input(false);
    /** Uses a larger pointer target around the floating button when it straddles a panel edge. */
    public readonly edgeButton = input(false);
    /** Optional automation identifier for the action. */
    public readonly testId = input('');
    /** Requested state. The shell applies and persists it. */
    public readonly collapsedChange = output<boolean>();
    /** Whether navigation hover or keyboard focus reveals the toggle. */
    public readonly revealed = computed(() => this._navigationHovered() || this._keyboardFocused());

    protected readonly navigationId = computed(() => this.navigation()?.elementRef.nativeElement.id || null);
    protected readonly ariaShortcut = computed(() => {
        const key = this.shortcutKey().toUpperCase();
        return key ? `${this._apple ? 'Meta' : 'Control'}+${key}` : null;
    });
    protected readonly tooltip = computed(() => {
        const key = this.shortcutKey().toUpperCase();
        if (!key) {
            return this.label();
        }
        return `${this.label()} ${this._apple ? `⌘${key}` : `${this.controlKeyLabel()}+${key}`}`;
    });

    // #endregion

    // #region Methods

    protected activate(): void {
        if (!this.disabled()) {
            this.collapsedChange.emit(!this.collapsed());
        }
    }

    protected focusEntered(event: FocusEvent): void {
        const [target] = event.composedPath();
        try {
            this._keyboardFocused.set(target instanceof Element && target.matches(':focus-visible'));
        } catch {
            this._keyboardFocused.set(false);
        }
    }

    protected focusLeft(): void {
        this._keyboardFocused.set(false);
    }

    protected keyboardFocused(): void {
        this._keyboardFocused.set(true);
    }

    private onShortcut(event: KeyboardEvent, key: string): void {
        const modifier = this._apple ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey;
        const editing = event
            .composedPath()
            .some(
                (node) =>
                    node instanceof HTMLElement &&
                    (['INPUT', 'TEXTAREA', 'SELECT'].includes(node.tagName) ||
                        node.isContentEditable ||
                        (node.hasAttribute('contenteditable') && node.getAttribute('contenteditable') !== 'false')),
            );
        if (
            !modifier ||
            event.defaultPrevented ||
            event.repeat ||
            event.isComposing ||
            event.altKey ||
            event.shiftKey ||
            event.key.toLowerCase() !== key ||
            editing
        ) {
            return;
        }

        event.preventDefault();
        this.activate();
    }

    // #endregion
}

function isApplePlatform(navigator: Navigator | undefined): boolean {
    const platform = (navigator as (Navigator & { userAgentData?: { platform?: string } }) | undefined)?.userAgentData?.platform ?? navigator?.platform ?? '';
    return /mac|iphone|ipad|ipod/i.test(platform);
}
