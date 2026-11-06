//#region Imports

import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, ElementRef, inject, input, model, output, PLATFORM_ID, signal } from '@angular/core';
import { BackdropComponent, ButtonComponent, IconNameDirective, StackComponent } from '@pixel-brewery/mosaik-elements-angular';
import { DetailPanelComponentIntl, provideDetailPanelComponentIntl } from './DetailPanelComponentIntl';

//#endregion

export type DetailPanelHandleVariant = 'arrow' | 'dots';

export type DetailPanelCloseReason = 'handle' | 'backdrop' | 'escape' | 'api';

export interface IDetailPanelChange {
    opened: boolean;
    reason: DetailPanelCloseReason;
}

@Component({
    selector: 'ngp-detail-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-disabled]': 'disabled()',
        '[class.is-disabled]': 'disabled()',
    },
    imports: [BackdropComponent, ButtonComponent, IconNameDirective, StackComponent],
    template: `
        <div class="ngp-detail-panel__root" part="root">
            <mosaik-stack class="ngp-detail-panel__content" part="content" [fit]="'both'" [orientation]="'vertical'">
                <ng-content />
            </mosaik-stack>

            <div class="ngp-detail-panel__overlay" part="overlay" [attr.data-visible]="opened()" [attr.aria-hidden]="!opened()">
                @if (hasBackdrop()) {
                    <mosaik-backdrop
                        class="ngp-detail-panel__backdrop"
                        part="panel-backdrop"
                        [attr.data-visible]="opened()"
                        [attr.aria-hidden]="!opened()"
                        [attr.aria-label]="backdropLabel()"
                        (click)="close('backdrop')"
                    />
                }

                <section
                    class="ngp-detail-panel__panel"
                    part="panel"
                    [id]="panelId"
                    [attr.aria-label]="panelLabel()"
                    [attr.aria-modal]="opened()"
                    [attr.role]="opened() ? 'dialog' : null"
                    [attr.data-visible]="opened()"
                    [attr.data-closing]="closing()"
                    [attr.data-handle-variant]="handleVariant()"
                    [attr.data-widget-tour-target]="disabled() ? null : opened() ? 'detailPanel detailPanelOpenState' : 'detailPanel'"
                    (transitionend)="onPanelTransitionEnd($event)"
                >
                    <mosaik-button
                        class="ngp-detail-panel__handle"
                        part="handle"
                        [type]="'button'"
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [size]="'small'"
                        [iconName]="handleIconName()"
                        [iconSize]="'small'"
                        [disabled]="disabled()"
                        [attr.aria-expanded]="opened()"
                        [attr.aria-controls]="panelId"
                        [attr.aria-label]="opened() ? closeLabel() : openLabel()"
                        [attr.data-widget-tour-target]="disabled() ? null : opened() ? 'detailAction detailCloseAction' : 'detailAction detailOpenAction'"
                        (click)="toggle('handle')"
                    />

                    <mosaik-stack class="ngp-detail-panel__detail" part="detail" [fit]="'both'" [orientation]="'vertical'">
                        <ng-content select="[ngpDetailPanelDetail]" />
                    </mosaik-stack>
                </section>
            </div>
        </div>
    `,
    styles: `
        :host {
            --ngp-detail-panel-width: 100%;
            --ngp-detail-panel-height: min(50vh, 0rem);
            --ngp-detail-panel-min-height: 16rem;
            --ngp-detail-panel-handle-height: 2.75rem;
            --ngp-detail-panel-padding: 1rem;
            --ngp-detail-panel-inset: var(--drawer-viewport-inset, calc(var(--mosaik-layout-space, 6px) * 2));
            --ngp-detail-panel-content-padding: 0;
            --ngp-detail-panel-detail-padding: 1rem;
            --ngp-detail-panel-z-index: 20;
            --ngp-detail-panel-backdrop-z-index: 1;
            --ngp-detail-panel-panel-z-index: 2;
            --ngp-detail-panel-transition-duration: 250ms;
            --ngp-detail-panel-transition-easing: ease;
            --ngp-detail-panel-background: var(--mosaik-scheme-surface, #ffffff);
            --ngp-detail-panel-foreground: var(--mosaik-scheme-foreground, #1d1d1f);
            --ngp-detail-panel-border-color: var(--drawer-border-color, var(--mosaik-scheme-highlight, rgba(0, 0, 0, 0.12)));
            --ngp-detail-panel-border-radius: var(--drawer-border-radius, var(--mosaik-layout-radius, 6px));
            --ngp-detail-panel-handle-border-radius: 999rem;

            display: block;
            position: relative;
            inline-size: var(--ngp-detail-panel-width);
            block-size: 100%;
            min-block-size: 0;
            color: var(--ngp-detail-panel-foreground);
        }

        :host(.is-disabled) {
            pointer-events: none;
            opacity: 0.64;
        }

        .ngp-detail-panel__root {
            position: relative;
            display: grid;
            inline-size: 100%;
            block-size: 100%;
            min-block-size: 0;
            overflow: hidden;
        }

        .ngp-detail-panel__content {
            position: relative;
            z-index: 0;
            min-inline-size: 0;
            min-block-size: 0;
            padding: var(--ngp-detail-panel-content-padding);
        }

        .ngp-detail-panel__overlay {
            position: absolute;
            inset: 0;
            z-index: var(--ngp-detail-panel-z-index);
            pointer-events: none;
        }

        .ngp-detail-panel__backdrop {
            --backdrop-background-color: transparent;
            --backdrop-transition-property: backdrop-filter;

            position: absolute;
            inset: 0;
            z-index: var(--ngp-detail-panel-backdrop-z-index);
            background-color: transparent;
            backdrop-filter: blur(0px);
            pointer-events: none;
        }

        .ngp-detail-panel__backdrop[data-visible='true'] {
            backdrop-filter: blur(var(--ngp-detail-panel-backdrop-blur, var(--backdrop-blur, 4px)));
            pointer-events: auto;
        }

        .ngp-detail-panel__panel {
            position: absolute;
            inset-inline: var(--ngp-detail-panel-inset);
            inset-block-end: var(--ngp-detail-panel-inset);
            z-index: var(--ngp-detail-panel-panel-z-index);
            display: grid;
            grid-template-rows: var(--ngp-detail-panel-handle-height) minmax(0, 1fr);
            inline-size: auto;
            block-size: var(--ngp-detail-panel-height);
            min-block-size: var(--ngp-detail-panel-min-height);
            max-block-size: calc(100% - (var(--ngp-detail-panel-inset) * 2));
            border: 1px solid transparent;
            border-radius: var(--ngp-detail-panel-border-radius);
            background: transparent;
            overflow: hidden;
            pointer-events: auto;
            transform: translateY(calc(100% - var(--ngp-detail-panel-handle-height)));
            transition:
                transform var(--ngp-detail-panel-transition-duration) var(--ngp-detail-panel-transition-easing),
                background-color var(--ngp-detail-panel-transition-duration) var(--ngp-detail-panel-transition-easing),
                border-color var(--ngp-detail-panel-transition-duration) var(--ngp-detail-panel-transition-easing),
                visibility var(--ngp-detail-panel-transition-duration) var(--ngp-detail-panel-transition-easing);
        }

        .ngp-detail-panel__panel[data-visible='true'] {
            background-color: var(--ngp-detail-panel-background);
            border-color: var(--ngp-detail-panel-border-color);
        }

        .ngp-detail-panel__panel[data-visible='true'] {
            transform: translateY(0);
        }

        .ngp-detail-panel__handle {
            position: relative;
            justify-self: end;
            align-self: center;
            inline-size: 2.2rem;
            right: 0.5rem;
            border-radius: var(--ngp-detail-panel-handle-border-radius);
            transition: transform var(--ngp-detail-panel-transition-duration) var(--ngp-detail-panel-transition-easing);
        }

        .ngp-detail-panel__detail {
            visibility: hidden;
            min-inline-size: 0;
            min-block-size: 0;
            padding: var(--ngp-detail-panel-detail-padding);
            overflow: auto;
            overscroll-behavior: contain;
        }

        .ngp-detail-panel__panel[data-visible='true'] .ngp-detail-panel__detail,
        .ngp-detail-panel__panel[data-closing='true'] .ngp-detail-panel__detail {
            visibility: visible;
        }

        @media (prefers-reduced-motion: reduce) {
            .ngp-detail-panel__backdrop,
            .ngp-detail-panel__panel,
            .ngp-detail-panel__handle {
                transition-duration: 1ms;
            }
        }
    `,
    providers: [
        provideDetailPanelComponentIntl({
            panelLabel: 'loc.detailPanel.panelLabel',
            openLabel: 'loc.detailPanel.openLabel',
            closeLabel: 'loc.detailPanel.closeLabel',
            backdropLabel: 'loc.detailPanel.backdropLabel',
        }),
    ],
})
export class DetailPanelComponent {
    private static nextId = 0;

    private readonly _intl: DetailPanelComponentIntl = inject(DetailPanelComponentIntl, { optional: true }) ?? new DetailPanelComponentIntl();
    private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);
    private closeAnimationTimeoutId: ReturnType<typeof setTimeout> | undefined;

    protected readonly panelId = `ngp-detail-panel-${DetailPanelComponent.nextId++}`;
    protected readonly closing = signal(false);

    public readonly opened = model(false);

    public readonly disabled = input(false);
    public readonly hasBackdrop = input(true);
    public readonly closeOnBackdropClick = input(true);
    public readonly closeOnEscape = input(true);
    public readonly restoreFocusOnClose = input(true);

    public readonly handleVariant = input<DetailPanelHandleVariant>('arrow');

    public readonly panelLabel = input(this._intl.panelLabel);
    public readonly openLabel = input(this._intl.openLabel);
    public readonly closeLabel = input(this._intl.closeLabel);
    public readonly backdropLabel = input(this._intl.backdropLabel);

    public readonly openedChangeReason = output<IDetailPanelChange>();
    public readonly panelOpened = output<IDetailPanelChange>();
    public readonly panelClosed = output<IDetailPanelChange>();

    private readonly previousFocusedElement = signal<HTMLElement | null>(null);

    protected readonly canCloseByBackdrop = computed(() => {
        return this.hasBackdrop() && this.closeOnBackdropClick() && !this.disabled();
    });

    public constructor() {
        effect(() => {
            const opened = this.opened();

            if (!isPlatformBrowser(this.platformId)) {
                return;
            }

            if (opened) {
                this.previousFocusedElement.set(this.document.activeElement as HTMLElement | null);
                return;
            }

            this.restorePreviousFocus();
        });

        if (isPlatformBrowser(this.platformId)) {
            this.document.addEventListener('keydown', this.handleDocumentKeyDown);
            this.destroyRef.onDestroy(() => this.document.removeEventListener('keydown', this.handleDocumentKeyDown));
        }

        this.destroyRef.onDestroy(() => this.clearClosingTimeout());
    }

    public open(reason: DetailPanelCloseReason = 'api'): void {
        if (this.disabled() || this.opened()) {
            return;
        }

        this.finishClosing();
        this.opened.set(true);
        this.emitStateChange(true, reason);
    }

    public close(reason: DetailPanelCloseReason = 'api'): void {
        if (this.disabled() || !this.opened()) {
            return;
        }

        if (reason === 'backdrop' && !this.canCloseByBackdrop()) {
            return;
        }

        this.startClosing();
        this.opened.set(false);
        this.emitStateChange(false, reason);
    }

    public toggle(reason: DetailPanelCloseReason = 'handle'): void {
        if (this.opened()) {
            this.close(reason);
            return;
        }

        this.open(reason);
    }

    protected handleIconName(): string {
        if (this.handleVariant() === 'dots') {
            return 'moreHorizontal';
        }

        return this.opened() ? 'chevronDown' : 'chevronUp';
    }

    protected onPanelTransitionEnd(event: TransitionEvent): void {
        if (event.target !== event.currentTarget || event.propertyName !== 'transform' || this.opened()) {
            return;
        }

        this.finishClosing();
    }

    private readonly handleDocumentKeyDown = (event: KeyboardEvent): void => {
        if (!this.opened() || !this.closeOnEscape() || this.disabled()) {
            return;
        }

        if (event.key !== 'Escape') {
            return;
        }

        const hostElement = this.host.nativeElement;

        if (!hostElement.isConnected) {
            this.document.removeEventListener('keydown', this.handleDocumentKeyDown);
            return;
        }

        event.preventDefault();
        this.close('escape');
    };

    private emitStateChange(opened: boolean, reason: DetailPanelCloseReason): void {
        const change: IDetailPanelChange = {
            opened,
            reason,
        };

        this.openedChangeReason.emit(change);

        if (opened) {
            this.panelOpened.emit(change);
            return;
        }

        this.panelClosed.emit(change);
    }

    private restorePreviousFocus(): void {
        if (!this.restoreFocusOnClose()) {
            return;
        }

        const element = this.previousFocusedElement();

        if (!element || !this.document.contains(element)) {
            return;
        }

        queueMicrotask(() => element.focus());
    }

    private startClosing(): void {
        if (!isPlatformBrowser(this.platformId)) {
            this.closing.set(false);
            return;
        }

        this.clearClosingTimeout();
        this.closing.set(true);
        this.closeAnimationTimeoutId = setTimeout(() => this.finishClosing(), 350);
    }

    private finishClosing(): void {
        this.clearClosingTimeout();
        this.closing.set(false);
    }

    private clearClosingTimeout(): void {
        if (this.closeAnimationTimeoutId === undefined) {
            return;
        }

        clearTimeout(this.closeAnimationTimeoutId);
        this.closeAnimationTimeoutId = undefined;
    }
}
