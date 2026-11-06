// #region Imports

import type { Type } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { EXTERNAL_LINK_OPENER } from '../external-links/EXTERNAL_LINK_OPENER';
import { ExternalLinkService } from '../external-links/ExternalLinkService';
import type { IExternalLinkOpener } from '../external-links/IExternalLinkOpener';
import { type BrowserFeatureKind, BrowserFeatureKinds } from './BrowserFeatureKind';

// #endregion

/**
 * Registers the {@link EXTERNAL_LINK_OPENER} port.
 *
 * @public
 * @param adapter The adapter class to instantiate; defaults to the `DOCUMENT`-based
 * {@link ExternalLinkService}.
 * @returns A feature for `provideBrowser(...)`.
 */
export function withExternalLinks(adapter: Type<IExternalLinkOpener> = ExternalLinkService): IFeature<BrowserFeatureKind> {
    return createFeature('external-links', BrowserFeatureKinds.ExternalLinks, [{ provide: EXTERNAL_LINK_OPENER, useClass: adapter }]);
}
