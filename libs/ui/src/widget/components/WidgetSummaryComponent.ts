// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';

// #endregion

/**
 * Presents one prominent widget value with a descriptive label, an optional unit and a hint.
 *
 * The value scales with the width of the widget rather than with a breakpoint, so the same summary
 * reads correctly in a one-column tile and in a six-column one. Set `compact` for a widget that
 * shows several summaries side by side.
 *
 * It renders a description list, so the label stays associated with its value for assistive
 * technology even though the value is shown first.
 *
 * @public
 *
 * @example
 * ```html
 * <ngp-widget-summary label="Open tickets" [value]="openTickets()" unit="today" />
 * ```
 */
@Component({
    selector: 'ngp-widget-summary',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.ngp-widget-summary--compact]': 'compact()',
    },
    template: `
        <dl class="ngp-widget-summary__list">
            <div class="ngp-widget-summary__content">
                <dt class="ngp-widget-summary__label">{{ label() }}</dt>
                <dd class="ngp-widget-summary__value">
                    <span class="ngp-widget-summary__number">{{ value() }}</span>
                    @if (unit(); as resolvedUnit) {
                        <span class="ngp-widget-summary__unit">{{ resolvedUnit }}</span>
                    }
                </dd>
                @if (hint(); as resolvedHint) {
                    <dd class="ngp-widget-summary__hint">{{ resolvedHint }}</dd>
                }
            </div>
        </dl>
    `,
    styles: `
        :host {
            display: flex;
            flex: 1 1 auto;
            width: 100%;
            min-height: 0;

            --ngp-widget-summary-number-size: clamp(3rem, 15cqi, 4.5rem);
            --ngp-widget-summary-unit-size: clamp(1rem, 5cqi, 1.5rem);
            --ngp-widget-summary-unit-gap: 0.375rem;
        }

        :host(.ngp-widget-summary--compact) {
            --ngp-widget-summary-number-size: clamp(1.5rem, 8cqi, 2.25rem);
            --ngp-widget-summary-unit-size: clamp(0.75rem, 3.5cqi, 1rem);
            --ngp-widget-summary-unit-gap: 0.25rem;
        }

        .ngp-widget-summary__list {
            container-type: inline-size;
            box-sizing: border-box;
            display: flex;
            flex: 1 1 auto;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            min-height: 0;
            margin: 0;
            padding: 0.75rem 0.25rem;
        }

        .ngp-widget-summary__content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            text-align: center;
        }

        .ngp-widget-summary__label {
            order: 2;
            width: 100%;
            max-width: 100%;
            margin: 0;
            color: var(--ngp-widget-summary-muted-color, color-mix(in srgb, currentColor 65%, transparent));
            font-size: 0.75rem;
            font-weight: 500;
            line-height: 1.25;
            text-wrap: balance;
            hyphens: auto;
        }

        .ngp-widget-summary__value {
            order: 1;
            display: flex;
            align-items: baseline;
            justify-content: center;
            max-width: 100%;
            margin: 0;
        }

        .ngp-widget-summary__number {
            color: var(--ngp-widget-summary-color, inherit);
            font-size: var(--ngp-widget-summary-number-size);
            font-weight: 600;
            line-height: 1;
            letter-spacing: -0.025em;
            font-variant-numeric: tabular-nums;
        }

        .ngp-widget-summary__unit {
            margin-inline-start: var(--ngp-widget-summary-unit-gap);
            color: var(--ngp-widget-summary-muted-color, color-mix(in srgb, currentColor 65%, transparent));
            font-size: var(--ngp-widget-summary-unit-size);
            font-weight: 500;
            line-height: 1;
        }

        .ngp-widget-summary__hint {
            order: 3;
            max-width: 100%;
            margin: 0;
            color: var(--ngp-widget-summary-muted-color, var(--mosaik-scheme-foreground-subtle, currentColor));
            font-size: 0.75rem;
            line-height: 1.25;
            overflow-wrap: anywhere;
            text-wrap: balance;
        }
    `,
})
export class WidgetSummaryComponent {
    // #region Properties

    /**
     * The descriptive label of the value.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * The value, already formatted for display.
     *
     * @public
     * @readonly
     */
    public readonly value: InputSignal<string> = input.required<string>();

    /**
     * The unit shown next to the value.
     *
     * @public
     * @readonly
     */
    public readonly unit: InputSignal<string | undefined> = input<string>();

    /** Optional secondary text below the label, such as a comparison or denominator. */
    public readonly hint = input<string>();

    /**
     * Whether the summary is rendered at the smaller scale used when a widget shows several of
     * them next to each other.
     *
     * @public
     * @readonly
     */
    public readonly compact: InputSignal<boolean> = input(false);

    // #endregion
}
