// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, model, output } from '@angular/core';
import { ButtonComponent, IconNameDirective } from '@pixel-brewery/mosaik-elements-angular';
import { TicktackPanelComponentIntl, provideTicktackPanelComponentIntl } from './TicktackPanelComponentIntl';

// #endregion

/**
 * Describes which side of a ticktack panel is visible.
 *
 * @public
 */
export type TicktackPanelPosition = 'primary' | 'secondary';

/**
 * Describes why a ticktack panel changed sides.
 *
 * @public
 */
export type TicktackPanelChangeReason = 'forward' | 'backward' | 'api';

/**
 * State change emitted by a ticktack panel.
 *
 * @public
 */
export interface ITicktackPanelChange {
    readonly position: TicktackPanelPosition;
    readonly reason: TicktackPanelChangeReason;
}

/**
 * Horizontally switches between a primary and secondary content surface.
 *
 * The default slot contains the primary surface. Content marked with
 * `ngpTicktackPanelSecondary` is projected into the secondary surface.
 *
 * @public
 */
@Component({
    selector: 'ngp-ticktack-panel',
    template: `
        <div class="ngp-ticktack-panel__viewport" part="viewport">
            <div class="ngp-ticktack-panel__track" part="track">
                <section
                    class="ngp-ticktack-panel__panel ngp-ticktack-panel__panel--primary"
                    part="primary-panel"
                    [id]="primaryPanelId"
                    [attr.aria-label]="primaryPanelLabel()"
                    [attr.aria-hidden]="secondaryActive()"
                    [attr.inert]="secondaryActive() ? '' : null"
                >
                    <div class="ngp-ticktack-panel__content" part="primary-content">
                        <ng-content />
                    </div>
                    <mosaik-button
                        class="ngp-ticktack-panel__navigation"
                        part="forward-button"
                        [type]="'button'"
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [size]="'small'"
                        [iconName]="'chevronRight'"
                        [iconSize]="'small'"
                        [disabled]="disabled()"
                        [attr.aria-controls]="secondaryPanelId"
                        [attr.aria-label]="forwardLabel()"
                        (click)="showSecondary('forward')"
                    />
                </section>

                <section
                    class="ngp-ticktack-panel__panel ngp-ticktack-panel__panel--secondary"
                    part="secondary-panel"
                    [id]="secondaryPanelId"
                    [attr.aria-label]="secondaryPanelLabel()"
                    [attr.aria-hidden]="!secondaryActive()"
                    [attr.inert]="secondaryActive() ? null : ''"
                >
                    <mosaik-button
                        class="ngp-ticktack-panel__navigation"
                        part="backward-button"
                        [type]="'button'"
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [size]="'small'"
                        [iconName]="'chevronLeft'"
                        [iconSize]="'small'"
                        [disabled]="disabled()"
                        [attr.aria-controls]="primaryPanelId"
                        [attr.aria-label]="backwardLabel()"
                        (click)="showPrimary('backward')"
                    />
                    <div class="ngp-ticktack-panel__content" part="secondary-content">
                        <ng-content select="[ngpTicktackPanelSecondary]" />
                    </div>
                </section>
            </div>
        </div>
    `,
    styles: `
        :host {
            --ngp-ticktack-panel-gap: 0.5rem;
            --ngp-ticktack-panel-transition-duration: 250ms;
            --ngp-ticktack-panel-transition-easing: ease;

            display: block;
            inline-size: 100%;
            min-inline-size: 0;
        }

        :host([data-disabled='true']) {
            opacity: 0.64;
        }

        .ngp-ticktack-panel__viewport {
            inline-size: 100%;
            min-inline-size: 0;
            overflow: hidden;
        }

        .ngp-ticktack-panel__track {
            display: flex;
            inline-size: 100%;
            min-inline-size: 0;
            transform: translateX(0);
            transition: transform var(--ngp-ticktack-panel-transition-duration) var(--ngp-ticktack-panel-transition-easing);
            will-change: transform;
        }

        :host([data-position='secondary']) .ngp-ticktack-panel__track {
            transform: translateX(-100%);
        }

        .ngp-ticktack-panel__panel {
            display: grid;
            flex: 0 0 100%;
            align-items: center;
            gap: var(--ngp-ticktack-panel-gap);
            inline-size: 100%;
            min-inline-size: 0;
        }

        .ngp-ticktack-panel__panel--primary {
            grid-template-columns: minmax(0, 1fr) auto;
        }

        .ngp-ticktack-panel__panel--secondary {
            grid-template-columns: auto minmax(0, 1fr);
        }

        .ngp-ticktack-panel__content {
            min-inline-size: 0;
        }

        .ngp-ticktack-panel__navigation {
            flex: none;
            inline-size: 2.2rem;
            border-radius: 9999rem;
        }

        @media (prefers-reduced-motion: reduce) {
            .ngp-ticktack-panel__track {
                transition-duration: 1ms;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-position]': "secondaryActive() ? 'secondary' : 'primary'",
        '[attr.data-disabled]': 'disabled()',
    },
    imports: [ButtonComponent, IconNameDirective],
    providers: [
        provideTicktackPanelComponentIntl({
            primaryPanelLabel: 'loc.ticktackPanel.primaryPanelLabel',
            secondaryPanelLabel: 'loc.ticktackPanel.secondaryPanelLabel',
            forwardLabel: 'loc.ticktackPanel.forwardLabel',
            backwardLabel: 'loc.ticktackPanel.backwardLabel',
        }),
    ],
})
export class TicktackPanelComponent {
    // #region Fields

    private static _nextId = 0;

    protected readonly _intl: TicktackPanelComponentIntl = inject(TicktackPanelComponentIntl, { optional: true }) ?? new TicktackPanelComponentIntl();

    protected readonly primaryPanelId = `ngp-ticktack-panel-primary-${TicktackPanelComponent._nextId}`;
    protected readonly secondaryPanelId = `ngp-ticktack-panel-secondary-${TicktackPanelComponent._nextId++}`;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    public readonly secondaryActive = model(false);
    public readonly disabled = input(false);
    public readonly primaryPanelLabel = input(this._intl.primaryPanelLabel);
    public readonly secondaryPanelLabel = input(this._intl.secondaryPanelLabel);
    public readonly forwardLabel = input(this._intl.forwardLabel);
    public readonly backwardLabel = input(this._intl.backwardLabel);
    public readonly panelChanged = output<ITicktackPanelChange>();

    // #endregion

    // #region Methods

    /**
     * Shows the secondary surface.
     *
     * @param reason - Trigger for the state change.
     * @public
     */
    public showSecondary(reason: TicktackPanelChangeReason = 'api'): void {
        if (this.disabled() || this.secondaryActive()) {
            return;
        }

        this.secondaryActive.set(true);
        this.panelChanged.emit({ position: 'secondary', reason });
    }

    /**
     * Shows the primary surface.
     *
     * @param reason - Trigger for the state change.
     * @public
     */
    public showPrimary(reason: TicktackPanelChangeReason = 'api'): void {
        if (this.disabled() || !this.secondaryActive()) {
            return;
        }

        this.secondaryActive.set(false);
        this.panelChanged.emit({ position: 'primary', reason });
    }

    // #endregion
}
