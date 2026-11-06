// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideBrowser(...)` accepts. Each kind is non-multi: exactly one adapter
 * per capability may be registered.
 *
 * @public
 */
export type BrowserFeatureKind = 'clipboard' | 'external-links' | 'file-download';

/**
 * The branded kind vocabulary of the browser package. Products that ship their own adapter (for
 * example an IPC-backed clipboard in a desktop shell) create features with these kinds so the
 * kernel still rejects duplicate registrations.
 *
 * @public
 */
export const BrowserFeatureKinds = {
    Clipboard: featureKind<BrowserFeatureKind>('clipboard'),
    ExternalLinks: featureKind<BrowserFeatureKind>('external-links'),
    FileDownload: featureKind<BrowserFeatureKind>('file-download'),
} as const satisfies Record<string, FeatureKind<BrowserFeatureKind>>;
