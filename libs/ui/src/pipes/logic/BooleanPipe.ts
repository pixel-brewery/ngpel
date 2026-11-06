// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

/**
 * Chooses between two values by a condition, which keeps the two-branch decisions a template makes
 * over and over out of the component: `[icon]="task.isDone | ngpBoolean: 'check' : 'clock'"`,
 * `[variant]="isCritical | ngpBoolean: 'danger' : 'default'"`.
 *
 * The result keeps the type of the two branches, so a design-system token union survives the pipe.
 *
 * @public
 */
@Pipe({ name: 'ngpBoolean' })
export class BooleanPipe implements PipeTransform {
    // #region Methods

    /**
     * Returns `whenTrue` or `whenFalse` depending on `condition`.
     *
     * @public
     * @param condition The condition to evaluate.
     * @param whenTrue The value for a met condition.
     * @param whenFalse The value for an unmet condition.
     * @returns The chosen value.
     */
    public transform<TValue>(condition: boolean, whenTrue: TValue, whenFalse: TValue): TValue {
        return condition ? whenTrue : whenFalse;
    }

    // #endregion
}
