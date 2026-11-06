import { inject, Injectable } from '@angular/core';
import { DrawerService } from '@pixel-brewery/mosaik-elements-angular';
import { firstValueFrom } from 'rxjs';
import type { IRecurrenceEditorOptions } from './IRecurrenceEditorOptions';
import { RecurrenceEditorDrawerComponent } from './RecurrenceEditorDrawerComponent';
import type { IRecurrenceValue } from './RecurrenceRule';

/** Opens the recurrence editor in the application's Mosaik drawer. @public */
@Injectable({ providedIn: 'root' })
export class RecurrenceEditorService {
    // #region Fields

    private readonly _drawers = inject(DrawerService);

    // #endregion

    // #region Methods

    /**
     * Opens a draft of the recurrence.
     * @param options Initial value, editable options and localized labels.
     * @returns The applied recurrence, or undefined when the drawer is dismissed.
     */
    public async open(options: IRecurrenceEditorOptions = {}): Promise<IRecurrenceValue | undefined> {
        const drawer = this._drawers.show<IRecurrenceEditorOptions, IRecurrenceValue>(RecurrenceEditorDrawerComponent, { data: options });
        const close = await firstValueFrom(drawer.closed, { defaultValue: undefined });
        return close?.reason === 'positive' ? close.result : undefined;
    }

    // #endregion
}
