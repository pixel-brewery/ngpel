import type { Signal } from '@angular/core';

/**
 * Host configuration for the optional PDF.js preview. The host owns the matching SDK, worker,
 * viewer styles and any assets it chooses to serve.
 *
 * @public
 */
export interface IPdfPreviewOptions {
    /** Imports the PDF.js API before importing the official viewer module. */
    readonly load: () => Promise<Readonly<{ api: object; viewer: object }>>;

    /** URL of the matching PDF.js module worker. */
    readonly workerSrc: string;

    /** Viewer locale. A signal refreshes an open preview when the language changes. Defaults to the document language. */
    readonly locale?: string | Signal<string>;

    /** Base URL of the viewer's annotation image assets. */
    readonly imageResourcesPath?: string;

    /** Base URL of the SDK's character maps. */
    readonly cMapUrl?: string;

    /** Base URL of the SDK's standard fonts. */
    readonly standardFontDataUrl?: string;

    /** Base URL of the SDK's WebAssembly assets. */
    readonly wasmUrl?: string;

    /** Base URL of the SDK's ICC color profiles. */
    readonly iccUrl?: string;
}
