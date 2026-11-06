// #region Imports

import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, computed, input, type InputSignal, type Signal } from '@angular/core';

// #endregion

/**
 * Provides a responsive, business-agnostic shell for immersive sessions.
 *
 * The component owns layout and optional modal focus semantics. Overlay
 * lifecycle, session state and all projected actions remain the responsibility
 * of the consumer.
 *
 * @public
 */
@Component({
    selector: 'ngp-immersive-session-shell',
    imports: [CdkTrapFocus],
    template: `
        <section
            part="root"
            class="shell"
            [attr.aria-modal]="modal() ? 'true' : null"
            [attr.aria-label]="ariaLabel()"
            [attr.role]="modal() ? 'dialog' : 'region'"
            [class.shell--rail-open]="railOpen()"
            [cdkTrapFocus]="modal()"
            [cdkTrapFocusAutoCapture]="modal()"
            [style.--ngp-immersive-session-rail-width]="railWidthStyle()"
        >
            <div part="notification" class="notification">
                <ng-content select="[ngpImmersiveSessionNotification]" />
            </div>

            <header part="header" class="header">
                <div part="header-content" class="header__content">
                    <ng-content select="[ngpImmersiveSessionHeader]" />
                </div>
                <div part="status" class="header__status">
                    <ng-content select="[ngpImmersiveSessionStatus]" />
                </div>
            </header>

            <div part="body" class="body">
                <main part="stage" class="stage">
                    <ng-content select="[ngpImmersiveSessionStage]" />
                </main>

                @if (railOpen()) {
                    <aside part="rail" class="rail" [attr.aria-label]="railAriaLabel()">
                        <ng-content select="[ngpImmersiveSessionRail]" />
                    </aside>
                }
            </div>

            <footer part="footer" class="footer">
                <ng-content select="[ngpImmersiveSessionFooter]" />
            </footer>
        </section>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
            width: 100%;
            height: 100%;
            min-width: 0;
            min-height: 0;
            color: var(--mosaik-scheme-foreground);
        }

        .shell {
            --ngp-immersive-session-rail-width: 384px;

            display: grid;
            grid-template-rows: auto auto minmax(0, 1fr) auto;
            width: 100%;
            height: 100%;
            min-height: 100dvh;
            overflow: hidden;
            background:
                radial-gradient(circle at 50% 28%, color-mix(in srgb, var(--mosaik-color-highlight-500) 9%, transparent), transparent 42%),
                var(--mosaik-scheme-background);
            isolation: isolate;
        }

        .notification {
            position: relative;
            z-index: 3;
        }

        .header {
            display: flex;
            z-index: 2;
            min-width: 0;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) 1rem max(1rem, env(safe-area-inset-left));
            border-bottom: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
            background: color-mix(in srgb, var(--mosaik-scheme-background) 90%, transparent);
            backdrop-filter: blur(18px);
        }

        .header__content,
        .header__status {
            display: flex;
            min-width: 0;
            align-items: center;
            gap: 0.75rem;
        }

        .header__status {
            justify-content: flex-end;
        }

        .body {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            min-width: 0;
            min-height: 0;
            overflow: hidden;
        }

        .shell--rail-open .body {
            grid-template-columns: minmax(0, 1fr) minmax(18rem, var(--ngp-immersive-session-rail-width));
        }

        .stage {
            display: grid;
            min-width: 0;
            min-height: 0;
            overflow: auto;
            place-items: center;
            padding: clamp(1rem, 4vw, 3rem);
            overscroll-behavior: contain;
        }

        .rail {
            min-width: 0;
            min-height: 0;
            overflow: auto;
            padding: 1rem;
            border-left: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
            background: color-mix(in srgb, var(--mosaik-scheme-surface) 92%, transparent);
            overscroll-behavior: contain;
        }

        .footer {
            display: flex;
            z-index: 2;
            min-width: 0;
            align-items: center;
            justify-content: center;
            padding: 1rem max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
            border-top: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
            background: color-mix(in srgb, var(--mosaik-scheme-background) 90%, transparent);
            backdrop-filter: blur(18px);
        }

        @media (width < 64rem) {
            .shell--rail-open .body {
                grid-template-columns: minmax(0, 1fr);
                grid-template-rows: minmax(0, 1fr) minmax(12rem, 38dvh);
            }

            .rail {
                border-top: 1px solid color-mix(in srgb, var(--mosaik-scheme-foreground) 10%, transparent);
                border-left: 0;
            }
        }

        @media (width < 40rem) {
            .header {
                align-items: flex-start;
                flex-direction: column;
            }

            .header__status {
                width: 100%;
                justify-content: flex-start;
            }

            .stage,
            .rail {
                padding: 0.75rem;
            }
        }

        @media (prefers-reduced-transparency: reduce) {
            .header,
            .footer {
                background: var(--mosaik-scheme-background);
                backdrop-filter: none;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmersiveSessionShellComponent {
    // #region Properties

    /**
     * Accessible name for the complete immersive session surface.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel: InputSignal<string> = input.required<string>();

    /** Enables modal semantics, automatic focus capture, trapping and focus restoration. */
    public readonly modal: InputSignal<boolean> = input<boolean>(false);

    /**
     * Indicates whether the contextual rail is currently rendered.
     *
     * @public
     * @readonly
     */
    public readonly railOpen: InputSignal<boolean> = input<boolean>(true);

    /**
     * Optional accessible name for the contextual rail.
     *
     * @public
     * @readonly
     */
    public readonly railAriaLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Preferred rail width. Numeric values are interpreted as CSS pixels.
     *
     * @public
     * @readonly
     */
    public readonly railWidth: InputSignal<number | string> = input<number | string>(384);

    /**
     * CSS width derived from the public rail-width input.
     *
     * @protected
     * @readonly
     */
    protected readonly railWidthStyle: Signal<string> = computed(() => this.toCssSize(this.railWidth()));

    // #endregion

    // #region Methods

    /**
     * Converts a numeric or textual dimension into a safe CSS size.
     *
     * @param value - Consumer-provided dimension.
     * @private
     * @returns CSS-compatible size.
     */
    private toCssSize(value: number | string): string {
        return typeof value === 'number' ? `${Math.max(0, value)}px` : value;
    }

    // #endregion
}
