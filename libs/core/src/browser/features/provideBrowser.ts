// #region Imports

import { type EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { composeProviders, type IFeature } from '@pixel-brewery/ngpel-core';
import type { BrowserFeatureKind } from './BrowserFeatureKind';

// #endregion

/**
 * Composes the browser capability ports. Only the capabilities contributed by the given features
 * are registered — `provideBrowser()` without features registers nothing.
 *
 * @public
 * @param features Capability features such as `withClipboard()`, `withExternalLinks()` and
 * `withFileDownload()`.
 * @returns Environment providers for the application or route composition root.
 * @throws Error when two features of the same kind are given.
 *
 * @example
 * ```typescript
 * export const appConfig = {
 *     providers: [provideBrowser(withClipboard(), withExternalLinks(), withFileDownload())]
 * };
 * ```
 */
export function provideBrowser(...features: ReadonlyArray<IFeature<BrowserFeatureKind>>): EnvironmentProviders {
    return makeEnvironmentProviders(composeProviders([], features));
}
