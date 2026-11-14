// #region Imports

import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID, type InputSignal, type Signal } from '@angular/core';
import { RailActionComponent } from '../rail/RailActionComponent';

// #endregion

/** Consistent compact action that opens the dialog AI rail. */
@Component({
    selector: 'ngp-ai-rail-action',
    imports: [RailActionComponent],
    template: `
        <ngp-rail-action
            [target]="'ai'"
            [label]="label()"
            [floatingLabel]="floatingLabel()"
            [icon]="'sparkle'"
            [variant]="'highlight'"
            [loading]="loading()"
            [disabled]="disabled()"
            [skeletonTestId]="skeletonTestId()"
            [testId]="testId()"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiRailActionComponent {
    private readonly _locale = inject(LOCALE_ID).split('-')[0];

    public readonly loading: InputSignal<boolean> = input(false);
    public readonly disabled: InputSignal<boolean | Signal<boolean>> = input<boolean | Signal<boolean>>(false);
    public readonly skeletonTestId: InputSignal<string> = input('dialog-ai-toggle-skeleton');
    public readonly testId: InputSignal<string> = input('dialog-ai-toggle');

    /** Accessible label of the rail action. */
    public readonly label = input(
        this._locale === 'de' ? 'KI nutzen' : this._locale === 'nl' ? 'AI gebruiken' : this._locale === 'uk' ? 'Використати ШІ' : 'Use AI',
    );

    /** Visible text in the floating rail. */
    public readonly floatingLabel = input('');
}
