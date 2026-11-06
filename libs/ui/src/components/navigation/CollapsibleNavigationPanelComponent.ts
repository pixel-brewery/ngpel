import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, model, viewChild } from '@angular/core';
import { ButtonComponent, CardTitleComponent, IconNameDirective, TypographyDirective } from '@pixel-brewery/mosaik-elements-angular';
import { compactViewportSignal } from './compactViewportSignal';

/**
 * A page-level navigation panel with independent scrolling and a compact rail.
 * Both navigation views stay mounted. On narrow viewports the expanded panel overlays adjacent content.
 *
 * @public
 */
@Component({
    selector: 'ngp-collapsible-navigation-panel',
    imports: [ButtonComponent, CardTitleComponent, IconNameDirective, TypographyDirective],
    template: `
        @if (isOverlayOpen()) {
            <div part="scrim" aria-hidden="true" (click)="dismiss()"></div>
        }
        <aside part="root" [attr.aria-label]="title()">
            <header part="header">
                <div part="expanded-header" [hidden]="!expanded()" [attr.inert]="expanded() ? null : ''">
                    <mosaik-card-title part="title" [mosaikTypography]="'caption'" [text]="title()" />
                    <div part="actions">
                        <ng-content select="[ngpCollapsibleNavigationPanelAction]" />
                    </div>
                </div>
                <mosaik-button
                    #toggle
                    part="toggle"
                    [type]="'button'"
                    [appearance]="'plain'"
                    [size]="'small'"
                    [iconSize]="'small'"
                    [iconName]="expanded() ? 'chevron-left' : 'chevron-right'"
                    [attr.aria-controls]="contentId()"
                    [attr.aria-expanded]="expanded()"
                    [attr.aria-label]="expanded() ? collapseLabel() : expandLabel()"
                    (click)="toggleExpanded()"
                >
                    <span slot="label" class="sr-only">{{ expanded() ? collapseLabel() : expandLabel() }}</span>
                </mosaik-button>
            </header>
            <div part="content" [id]="contentId()">
                <div part="expanded-content" [hidden]="!expanded()" [attr.inert]="expanded() ? null : ''">
                    <ng-content />
                </div>
                <div part="collapsed-content" [hidden]="expanded()" [attr.inert]="expanded() ? '' : null">
                    <div part="collapsed-actions">
                        <ng-content select="[ngpCollapsibleNavigationPanelCollapsedAction]" />
                    </div>
                    <ng-content select="[ngpCollapsibleNavigationPanelCollapsed]" />
                </div>
            </div>
        </aside>
    `,
    styles: `
        :host {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            min-width: 0;
            min-height: 0;
        }
        [part='root'] {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            min-height: 0;
            overflow: hidden;
            background: var(--mosaik-scheme-background);
        }
        [part='header'],
        [part='expanded-header'],
        [part='actions'] {
            display: flex;
            align-items: center;
            gap: var(--mosaik-layout-space);
        }
        [part='header'] {
            flex: none;
            justify-content: center;
            padding-inline: var(--mosaik-layout-space);
            border-bottom: 1px solid var(--mosaik-scheme-highlight);
        }
        [part='expanded-header'],
        [part='title'] {
            flex: 1;
            min-width: 0;
        }
        [part='title'] {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        [part='actions'],
        [part='toggle'] {
            flex: none;
        }
        [part='toggle'] {
            --button-min-height: calc(var(--mosaik-layout-space) * 4);
        }
        [part='content'] {
            flex: 1;
            min-height: 0;
            overflow: hidden;
        }
        [part='expanded-content'],
        [part='collapsed-content'] {
            height: 100%;
            overflow: hidden auto;
        }
        [part='collapsed-actions']:not(:empty) {
            display: flex;
            justify-content: center;
            padding-block: var(--mosaik-layout-space);
        }
        [hidden] {
            display: none;
        }
        :host([data-ngp-overlay]) [part='root'] {
            position: absolute;
            inset-block: 0;
            inset-inline-start: 0;
            z-index: var(--ngp-navigation-panel-overlay-layer, 10);
            width: min(var(--ngp-navigation-panel-collapsed-width, 4.5rem), 100vw);
            box-shadow: var(--mosaik-elevation-light);
        }
        :host([data-ngp-overlay][data-ngp-expanded]) [part='root'] {
            width: min(var(--ngp-navigation-panel-expanded-width, 16.5rem), 100vw);
        }
        [part='scrim'] {
            position: absolute;
            inset-block: 0;
            inset-inline-start: 0;
            z-index: calc(var(--ngp-navigation-panel-overlay-layer, 10) - 1);
            width: 100vw;
            background: var(--mosaik-scheme-semi-transparent);
            backdrop-filter: blur(4px);
        }
    `,
    host: {
        '[attr.data-ngp-overlay]': 'isOverlayViewport() ? "" : null',
        '[attr.data-ngp-expanded]': 'expanded() ? "" : null',
        '(keydown.escape)': 'dismiss($event)',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleNavigationPanelComponent {
    // #region Fields

    private readonly _document = inject(DOCUMENT);
    private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _toggle = viewChild('toggle', { read: ElementRef<HTMLElement> });
    private readonly _narrow = compactViewportSignal();

    // #endregion

    // #region Ctor

    /** Moves focus into an expanded overlay when it was opened from outside the panel. */
    public constructor() {
        effect(() => {
            if (this.isOverlayOpen() && !this._host.nativeElement.contains(this._document.activeElement)) {
                this.focusToggle();
            }
        });
    }

    // #endregion

    // #region Properties

    /** Heading and accessible name of the panel. */
    public readonly title = input.required<string>();
    /** ID of the navigation content controlled by the toggle. */
    public readonly contentId = input.required<string>();
    /** Accessible name of the expand action. */
    public readonly expandLabel = input.required<string>();
    /** Accessible name of the collapse action. */
    public readonly collapseLabel = input.required<string>();
    /** Whether the navigation is expanded. Can be bound bidirectionally. */
    public readonly expanded = model(true);
    /** Overrides the narrow viewport layout. Leave it unset to follow the application breakpoint. */
    public readonly overlay = input<boolean | null>(null);
    /** Whether the expanded panel overlays adjacent content. Use this to make that content inert. */
    public readonly isOverlayOpen = computed(() => this.isOverlayViewport() && this.expanded());

    protected readonly isOverlayViewport = computed(() => this.overlay() ?? this._narrow());

    // #endregion

    // #region Methods

    protected toggleExpanded(): void {
        this.expanded.update((current) => !current);
    }

    protected dismiss(event?: Event): void {
        if (event?.defaultPrevented || !this.isOverlayOpen()) {
            return;
        }
        event?.preventDefault();
        event?.stopPropagation();
        this.expanded.set(false);
        this.focusToggle();
    }

    private focusToggle(): void {
        this._toggle()?.nativeElement.focus({ preventScroll: true });
    }

    // #endregion
}
