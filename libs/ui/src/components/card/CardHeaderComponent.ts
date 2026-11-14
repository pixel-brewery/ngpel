// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, type InputSignal } from '@angular/core';
import { ButtonComponent, CardHeaderComponent as MosaikCardHeaderComponent, IconComponent, TranslateDirective } from '@pixel-brewery/mosaik-elements-angular';
import { CardComponent } from './CardComponent';

// #endregion

/**
 * Adds the card's expansion control to the Mosaik header suffix.
 *
 * @public
 */
@Component({
    selector: 'ngp-card-header',
    template: `
        <mosaik-card-header *mosaikTranslate="let t" class="w-full" [text]="text()" [subText]="subText()">
            <ng-content select="[slot=prefix]" />
            <ng-content select="[slot=header]" />
            <ng-content select="[slot=subHeader]" />
            <ng-content select="[slot=suffix]" />
            @if (card.effectiveIsExpandable()) {
                <mosaik-button
                    slot="suffix"
                    [attr.data-ngp-part]="'card-expand-toggle'"
                    [attr.test-id]="'card-expand-toggle'"
                    [type]="'button'"
                    [appearance]="'plain'"
                    [size]="'small'"
                    [attr.aria-expanded]="card.isExpanded()"
                    (click)="card.toggle()"
                >
                    <mosaik-icon slot="icon" [icon]="'chevronDown'" [size]="'small'" [angle]="card.isExpanded() ? 180 : 0" />
                    <span slot="label" class="sr-only">{{ card.isExpanded() ? t('loc.card.actions.collapse') : t('loc.card.actions.expand') }}</span>
                </mosaik-button>
            }
        </mosaik-card-header>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MosaikCardHeaderComponent, ButtonComponent, IconComponent, TranslateDirective],
    host: {
        slot: 'header',
        class: 'flex w-full',
    },
})
export class CardHeaderComponent {
    // #region Fields

    /**
     * The owning card's expansion state.
     *
     * @public
     * @readonly
     */
    public readonly card: CardComponent = inject(CardComponent);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Primary header text.
     *
     * @public
     * @readonly
     */
    public readonly text: InputSignal<string> = input.required<string>();

    /**
     * Supporting header text.
     *
     * @public
     * @readonly
     */
    public readonly subText: InputSignal<string> = input.required<string>();

    // #endregion

    // #region Methods
    // #endregion
}
