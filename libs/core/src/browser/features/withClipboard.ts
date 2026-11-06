// #region Imports

import type { Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { CLIPBOARD } from '../clipboard/CLIPBOARD';
import { ClipboardService } from '../clipboard/ClipboardService';
import type { IClipboard } from '../clipboard/IClipboard';
import { type BrowserFeatureKind, BrowserFeatureKinds } from './BrowserFeatureKind';

// #endregion

/**
 * Registers the {@link CLIPBOARD} port.
 *
 * @public
 * @param adapter The adapter class to instantiate; defaults to the `DOCUMENT`-based
 * {@link ClipboardService}.
 * @returns A feature for `provideBrowser(...)`.
 */
export function withClipboard(adapter: Type<IClipboard> = ClipboardService): IFeature<BrowserFeatureKind> {
    return createFeature('clipboard', BrowserFeatureKinds.Clipboard, [{ provide: CLIPBOARD, useClass: adapter }]);
}
