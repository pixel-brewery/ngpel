// #region Imports

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PaperSurfaceComponentIntl, providePaperSurfaceComponentIntl } from './PaperSurfaceComponentIntl';

// #endregion

/**
 * Responsive paper-like content surface that grows with its projected content.
 *
 * @public
 */
@Component({
    selector: 'ngp-paper-surface',
    template: `
        <article
            part="paper"
            role="document"
            class="mx-auto box-border w-full min-w-0 max-w-[210mm] overflow-visible p-4 sm:p-8 md:p-[18mm] print:max-w-none print:p-0"
            [attr.aria-label]="ariaLabel()"
        >
            <ng-content />
        </article>
    `,
    styles: `
        :host {
            display: block;
        }

        [part='paper'] {
            background-color: var(--mosaik-scheme-surface);
            border: var(--mosaik-layout-thickness) solid var(--mosaik-scheme-highlight);
            color: var(--mosaik-scheme-foreground);
        }

        @media (min-width: 640px) {
            [part='paper'] {
                border-radius: var(--mosaik-layout-radius);
            }
        }

        @media print {
            [part='paper'] {
                border: 0;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        providePaperSurfaceComponentIntl({
            ariaLabel: 'loc.paperSurface.ariaLabel',
        }),
    ],
})
export class PaperSurfaceComponent {
    // #region Fields

    private readonly _intl: PaperSurfaceComponentIntl = inject(PaperSurfaceComponentIntl, { optional: true }) ?? new PaperSurfaceComponentIntl();

    /**
     * Accessible document label.
     *
     * @public
     * @readonly
     */
    public readonly ariaLabel = input(this._intl.ariaLabel);

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    // #endregion

    // #region Methods

    // #endregion
}
