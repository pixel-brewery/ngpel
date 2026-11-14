// #region Imports

import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChild,
    DOCUMENT,
    effect,
    ElementRef,
    inject,
    Injector,
    input,
    type InputSignal,
    output,
    signal,
    type Signal,
    untracked,
    viewChild,
} from '@angular/core';
import { BackdropComponent } from '@pixel-brewery/mosaik-elements-angular';
import { PointerIdleDirective } from '../../directives/pointer-idle/PointerIdleDirective';
import { ImmersiveSessionOrbAnchorDirective } from './ImmersiveSessionOrbAnchorDirective';
import type { ImmersiveSessionPhase } from './ImmersiveSessionPhase';
import type { ImmersiveSessionRailState } from './ImmersiveSessionRailState';

// #endregion

/**
 * Provides a responsive, business-agnostic shell for immersive sessions.
 *
 * The component owns layout, phase presentation, rail attachment and modal focus. The consumer
 * controls session state, dismissal and all projected actions.
 *
 * @public
 */
@Component({
    selector: 'ngp-immersive-session-shell',
    imports: [BackdropComponent, CdkTrapFocus, PointerIdleDirective],
    template: `
        <section
            part="root"
            class="shell"
            ngpPointerIdle
            #idle="ngpPointerIdle"
            [ngpPointerIdleDisabled]="!idleDetectionEnabled()"
            [ngpPointerIdleHold]="idleHoldSelector()"
            [attr.data-ngp-phase]="phase()"
            [attr.data-ngp-idle]="idleDetectionEnabled() && idle.isIdle() ? '' : null"
            [attr.data-mosaik-portal-scope]="orbLayout() && modal() ? '' : null"
            [attr.aria-modal]="modal() && !overlayOpen() ? 'true' : null"
            [attr.aria-label]="ariaLabel()"
            [attr.role]="modal() && !overlayOpen() ? 'dialog' : 'region'"
            [attr.data-rail]="effectiveRailState()"
            [class.shell--rail-open]="railVisible()"
            [class.shell--orb]="orbLayout()"
            [cdkTrapFocus]="modal() && !overlayOpen()"
            [cdkTrapFocusAutoCapture]="modal()"
            [style.--ngp-immersive-session-rail-width]="railWidthStyle()"
            [style.--ngp-immersive-session-orb-preflight-transform]="orbPreflightTransform()"
        >
            <div part="notification" class="notification" [attr.inert]="overlayOpen() ? '' : null">
                <ng-content select="[ngpImmersiveSessionNotification]" />
            </div>

            <header part="header" class="header" [attr.inert]="overlayOpen() ? '' : null">
                <div part="header-content" class="header__content">
                    <ng-content select="[ngpImmersiveSessionHeader]" />
                </div>
                <div part="status" class="header__status">
                    <ng-content select="[ngpImmersiveSessionStatus]" />
                </div>
            </header>

            <div part="body" class="body" [attr.inert]="overlayOpen() ? '' : null">
                <main #stage part="stage" class="stage" tabindex="-1">
                    @if (orbLayout()) {
                        <div #orb part="orb">
                            <ng-content select="[ngpImmersiveSessionOrb]" />
                        </div>
                    }
                    <div
                        part="preflight"
                        class="phase-content"
                        [hidden]="!preflightVisible() && !(orbLayout() && phase() === 'connecting')"
                        [attr.inert]="preflightVisible() ? null : ''"
                    >
                        <ng-content select="[ngpImmersiveSessionPreflight]" />
                    </div>
                    <div
                        part="live"
                        class="phase-content"
                        [hidden]="preflightVisible() && !orbLayout()"
                        [attr.role]="orbLayout() ? 'region' : null"
                        [attr.tabindex]="orbLayout() ? 0 : null"
                        [attr.aria-label]="orbLayout() ? ariaLabel() : null"
                        [attr.inert]="preflightVisible() ? '' : null"
                    >
                        <ng-content select="[ngpImmersiveSessionStage]" />
                    </div>
                    @if (orbLayout()) {
                        <div part="aside" [attr.inert]="railVisible() ? '' : null">
                            <ng-content select="[ngpImmersiveSessionAside]" />
                        </div>
                    }
                    <div
                        part="rail-handle"
                        class="rail-handle"
                        [hidden]="!orbLayout() && (railVisible() || phase() !== 'live')"
                        [attr.inert]="orbLayout() && (railVisible() || phase() !== 'live') ? '' : null"
                    >
                        <ng-content select="[ngpImmersiveSessionRailHandle]" />
                    </div>
                </main>

                @if (railAttached()) {
                    <aside
                        part="rail"
                        class="rail"
                        [attr.aria-label]="railAriaLabel()"
                        [hidden]="!railVisible() && !orbLayout()"
                        [attr.inert]="railVisible() ? null : ''"
                    >
                        <ng-content select="[ngpImmersiveSessionRail]" />
                    </aside>
                }
            </div>

            <footer part="footer" class="footer" [attr.inert]="overlayOpen() ? '' : null">
                <ng-content select="[ngpImmersiveSessionFooter]" />
            </footer>

            @if (orbLayout()) {
                <div part="caption" [attr.inert]="overlayOpen() ? '' : null">
                    <ng-content select="[ngpImmersiveSessionCaption]" />
                </div>
                <div part="sheet">
                    <ng-content select="[ngpImmersiveSessionSheet]" />
                </div>
            }

            @if (overlayOpen()) {
                <mosaik-backdrop part="backdrop" class="backdrop" (click)="requestOverlayDismissal($event)" />
                <div
                    part="overlay"
                    class="overlay"
                    role="dialog"
                    [attr.aria-modal]="modal() ? 'true' : null"
                    [attr.aria-label]="overlayAriaLabel() ?? ariaLabel()"
                    cdkTrapFocus
                    [cdkTrapFocusAutoCapture]="true"
                    (keydown.escape)="requestOverlayDismissal($event)"
                >
                    <div part="overlay-content" class="overlay-content" tabindex="-1" cdkFocusInitial>
                        <ng-content select="[ngpImmersiveSessionOverlay]" />
                    </div>
                </div>
            }
        </section>
    `,
    styleUrl: './ImmersiveSessionOrbLayout.scss',
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

            position: relative;
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
            position: relative;
            display: grid;
            min-width: 0;
            min-height: 0;
            overflow: auto;
            place-items: center;
            padding: clamp(1rem, 4vw, 3rem);
            overscroll-behavior: contain;
        }

        .phase-content {
            display: contents;
        }

        .phase-content[hidden] {
            display: none;
        }

        .rail-handle {
            position: absolute;
            inset-block-start: 50%;
            inset-inline-end: 0;
            transform: translateY(-50%);
        }

        .rail-handle:empty,
        .rail-handle[hidden],
        .rail[hidden] {
            display: none;
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

        .header,
        .rail-handle,
        .footer {
            transition: opacity var(--mosaik-duration-medium) ease;
        }

        [data-ngp-idle] .header:not(:focus-within),
        [data-ngp-idle] .rail-handle:not(:focus-within) {
            opacity: 0.4;
        }

        [data-ngp-idle] .footer:not(:focus-within) {
            opacity: 0;
            pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
            .header,
            .rail-handle,
            .footer {
                transition: none;
            }
        }

        .backdrop,
        .overlay {
            position: absolute;
            inset: 0;
        }

        .backdrop {
            z-index: 4;
        }

        .overlay {
            z-index: 5;
            display: grid;
            padding: 1rem;
            place-items: center;
            pointer-events: none;
        }

        .overlay-content {
            max-inline-size: 100%;
            max-block-size: 100%;
            overflow: auto;
            pointer-events: auto;
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
    // #region Fields

    private readonly _document = inject(DOCUMENT);
    private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _injector = inject(Injector);
    private readonly _stage = viewChild<ElementRef<HTMLElement>>('stage');
    private readonly _orb = viewChild<ElementRef<HTMLElement>>('orb');
    private readonly _orbAnchor = contentChild(ImmersiveSessionOrbAnchorDirective, { descendants: true });
    private readonly _orbPreflightTransform = signal<string | null>(null);
    private _focusBeforeOverlay: HTMLElement | null = null;
    private _showingPreflight: boolean | undefined;

    // #endregion

    // #region Ctor

    /** Maintains focus when a phase or modal overlay changes which content is reachable. */
    public constructor() {
        effect(() => this.synchronizeOverlayFocus(this.overlayOpen()));
        effect(() => this.synchronizePhaseFocus(this.preflightVisible()));
        effect((onCleanup) => {
            const register = this.registerModalLayer();
            if (this.modal() && register) {
                onCleanup(untracked(() => register(this._host.nativeElement)));
            }
        });
        effect((onCleanup) => {
            if (!this.orbLayout() || !this.preflightVisible()) {
                return;
            }

            const anchor = this._orbAnchor()?.elementRef.nativeElement;
            const stage = this._stage()?.nativeElement;
            const orb = this._orb()?.nativeElement;
            const ResizeObserverConstructor = this._document.defaultView?.ResizeObserver;
            if (!anchor || !stage || !orb || !ResizeObserverConstructor) {
                this._orbPreflightTransform.set(null);
                return;
            }

            const measure = (): void => this.measureOrbAnchor(anchor, stage, orb);
            const observer = new ResizeObserverConstructor(measure);
            observer.observe(stage);
            observer.observe(anchor);
            observer.observe(orb);
            onCleanup(() => observer.disconnect());
        });
    }

    // #endregion

    // #region Properties

    /**
     * Accessible name for the complete immersive session surface.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel: InputSignal<string> = input.required<string>();

    /** Shows the preparation slot during preflight and the stage during connection, live and completion. */
    public readonly phase = input<ImmersiveSessionPhase>('live');

    /** Uses the stage centered on a persistent orb with animated phase and rail transitions. */
    public readonly layout = input<'standard' | 'orb'>('standard');

    /** Registers the modal host in an application-owned layer and returns its cleanup. */
    public readonly registerModalLayer = input<(host: HTMLElement) => () => void>();

    /** Allows shell controls to fade during inactivity in the live phase on hover-capable devices. */
    public readonly idleEnabled = input(false);

    /** Enables modal semantics, automatic focus capture, trapping and focus restoration. */
    public readonly modal: InputSignal<boolean> = input<boolean>(false);

    /**
     * Indicates whether the contextual rail is currently rendered.
     *
     * @public
     * @readonly
     */
    public readonly railOpen: InputSignal<boolean> = input<boolean>(true);

    /** Explicit rail state. When supplied, the rail retains its content while closed. */
    public readonly railState = input<ImmersiveSessionRailState>();

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

    /** Controls the projected overlay and makes the underlying shell inert while open. */
    public readonly overlayOpen = input(false);

    /** Accessible overlay name. Defaults to the shell's accessible name. */
    public readonly overlayAriaLabel = input<string | null>(null);

    /** Requests dismissal after Escape or a backdrop click. */
    public readonly overlayDismissed = output<void>();

    protected readonly effectiveRailState = computed(() => this.railState() ?? (this.railOpen() ? 'pinned' : 'closed'));
    protected readonly railVisible = computed(() => this.phase() === 'live' && this.effectiveRailState() !== 'closed');
    protected readonly railAttached = computed(() => this.railState() !== undefined || this.railOpen());
    protected readonly preflightVisible = computed(() => this.phase() === 'preflight');
    protected readonly orbLayout = computed(() => this.layout() === 'orb');
    protected readonly orbPreflightTransform = this._orbPreflightTransform.asReadonly();
    protected readonly idleDetectionEnabled = computed(() => this.idleEnabled() && this.phase() === 'live' && !this.overlayOpen());
    protected readonly idleHoldSelector = computed(() => {
        const regions = "[part='header'], [part='footer'], [part='rail'], [part='rail-handle']";
        return this.orbLayout() ? regions + ", [part='overlay'], mosaik-portal-projection" : regions;
    });

    /**
     * CSS width derived from the public rail-width input.
     *
     * @protected
     * @readonly
     */
    protected readonly railWidthStyle: Signal<string> = computed(() => this.toCssSize(this.railWidth()));

    // #endregion

    // #region Methods

    protected requestOverlayDismissal(event?: Event): void {
        if (this.overlayOpen()) {
            event?.preventDefault();
            event?.stopPropagation();
            this.overlayDismissed.emit();
        }
    }

    private measureOrbAnchor(anchor: HTMLElement, stage: HTMLElement, orb: HTMLElement): void {
        // The offset chain excludes CSS transforms, including the one this method updates.
        let left = 0;
        let top = 0;
        let current: HTMLElement | null = anchor;
        while (current && current !== stage) {
            left += current.offsetLeft;
            top += current.offsetTop;
            const parent: Element | null = current.offsetParent;
            current = parent instanceof HTMLElement ? parent : null;
        }

        if (current !== stage || !anchor.offsetWidth || !orb.offsetWidth) {
            this._orbPreflightTransform.set(null);
            return;
        }

        const x = left + anchor.offsetWidth / 2 - (orb.offsetLeft + orb.offsetWidth / 2);
        const y = top + anchor.offsetHeight / 2 - (orb.offsetTop + orb.offsetHeight / 2);
        const scale = anchor.offsetWidth / orb.offsetWidth;
        this._orbPreflightTransform.set(`translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${scale.toFixed(4)})`);
    }

    private synchronizeOverlayFocus(open: boolean): void {
        if (open) {
            let element = this._document.activeElement;

            while (element?.shadowRoot?.activeElement) {
                element = element.shadowRoot.activeElement;
            }

            this._focusBeforeOverlay = element instanceof HTMLElement ? element : null;
            return;
        }

        const previous = this._focusBeforeOverlay;
        this._focusBeforeOverlay = null;

        if (previous) {
            afterNextRender(
                () => {
                    if (!this.overlayOpen() && previous.isConnected && !previous.closest('[inert]')) {
                        previous.focus({ preventScroll: true });
                    }
                },
                { injector: this._injector },
            );
        }
    }

    private synchronizePhaseFocus(preflight: boolean): void {
        const previous = this._showingPreflight;
        this._showingPreflight = preflight;
        if (previous === undefined || previous === preflight) {
            return;
        }

        const stage = untracked(this._stage)?.nativeElement;
        const focused = this._document.activeElement;
        const hiding = stage?.querySelector(previous ? '[part="preflight"]' : '[part="live"]');
        if (!stage || !hiding?.contains(focused)) {
            return;
        }

        afterNextRender(
            () => {
                const active = this._document.activeElement;
                if (preflight === this.preflightVisible() && !this.overlayOpen() && (active === focused || active === this._document.body)) {
                    stage.focus({ preventScroll: true });
                }
            },
            { injector: this._injector },
        );
    }

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
