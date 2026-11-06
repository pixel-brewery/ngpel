// #region Imports

import { ChangeDetectionStrategy, Component, computed, inject, input, isSignal, type InputSignal, type Signal } from '@angular/core';
import { IconNameDirective, SkeletonComponent, ToggleButtonComponent, TooltipDirective } from '@pixel-brewery/mosaik-elements-angular';
import type { Appearance, Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { CommandDirective } from '@pixel-brewery/ngpel-mvp';
import { command, type Command } from '@pixel-brewery/ngpel-mvp';
import { RAIL_HOST } from './RailHostToken';

// #endregion

/**
 * Renders one compact action that either activates independently declared rail content
 * or hosts another action directive when no target is supplied.
 *
 * @public
 */
@Component({
    selector: 'ngp-rail-action',
    imports: [CommandDirective, IconNameDirective, SkeletonComponent, ToggleButtonComponent, TooltipDirective],
    template: `
        @if (visible()) {
            @if (loading()) {
                <mosaik-skeleton [height]="'32px'" [width]="'32px'" [shimmer]="true" [attr.test-id]="skeletonTestId() || null" />
            } @else {
                <mosaik-toggle-button
                    [attr.aria-label]="label()"
                    [mosaikTooltip]="label()"
                    [iconName]="icon()"
                    [variant]="variant()"
                    [appearance]="appearance()"
                    [size]="'small'"
                    [disabled]="!activateCommand.canExecute()"
                    [attr.test-id]="testId() || null"
                    [ngpCommand]="{ click: activateCommand }"
                />
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'block',
    },
})
export class RailActionComponent {
    // #region Fields

    private readonly _railHost = inject(RAIL_HOST);
    private readonly _activateCommand: Command<void> = command(
        () => {
            const target = this.target();
            if (target !== null) {
                this._railHost.activateContent(target);
            }
        },
        computed(() => {
            const target = this.target();
            return this.visible() && !this.loading() && !resolveBooleanState(this.disabled()) && (target === null || this._railHost.hasContent(target));
        }),
    );

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Stable key of the rail content activated by this action. Omit the target
     * when a host directive handles the action instead.
     *
     * @public
     * @readonly
     */
    public readonly target: InputSignal<string | null> = input<string | null>(null);

    /**
     * Accessible label and tooltip for the compact action.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Mosaik icon rendered by the compact action.
     *
     * @public
     * @readonly
     */
    public readonly icon: InputSignal<string> = input.required<string>();

    /**
     * Visual Mosaik variant of the action.
     *
     * @public
     * @readonly
     */
    public readonly variant: InputSignal<Variant> = input<Variant>('neutral');

    /**
     * Visual Mosaik appearance of the action.
     *
     * @public
     * @readonly
     */
    public readonly appearance: InputSignal<Appearance> = input<Appearance>('solid');

    /**
     * Indicates whether the action participates in the current rail.
     *
     * @public
     * @readonly
     */
    public readonly visible: InputSignal<boolean> = input(true);

    /**
     * Indicates whether the action is currently unavailable.
     *
     * @public
     * @readonly
     */
    public readonly disabled: InputSignal<boolean | Signal<boolean>> = input<boolean | Signal<boolean>>(false);

    /**
     * Replaces the action with a size-preserving skeleton while its feature initializes.
     *
     * @public
     * @readonly
     */
    public readonly loading: InputSignal<boolean> = input(false);

    /**
     * Optional test identifier applied to the loading skeleton.
     *
     * @public
     * @readonly
     */
    public readonly skeletonTestId: InputSignal<string> = input('');

    /**
     * Optional stable test identifier applied to the interactive action.
     *
     * @public
     * @readonly
     */
    public readonly testId: InputSignal<string> = input('');

    /**
     * Command that activates the configured target through the generic rail host.
     *
     * @protected
     * @readonly
     */
    protected get activateCommand(): Command<void> {
        return this._activateCommand;
    }

    // #endregion

    // #region Methods
    // #endregion
}

function resolveBooleanState(value: boolean | Signal<boolean>): boolean {
    return isSignal(value) ? value() : value;
}
