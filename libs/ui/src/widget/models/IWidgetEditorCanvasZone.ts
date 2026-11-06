// #region Imports

import type { IWidgetGridItemDefinition } from '../layout/IWidgetGridItemDefinition';
import type { IWidgetGridZoneDefinition } from '../layout/IWidgetGridZoneDefinition';

// #endregion

/** One semantic zone and the enabled widgets currently rendered on the editor canvas. */
export interface IWidgetEditorCanvasZone {
    readonly definition: IWidgetGridZoneDefinition;
    readonly items: ReadonlyArray<IWidgetGridItemDefinition>;
}
