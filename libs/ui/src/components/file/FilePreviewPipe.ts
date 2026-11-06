// #region Imports

import { DOCUMENT } from '@angular/common';
import { inject, type OnDestroy, Pipe, type PipeTransform } from '@angular/core';
import type { ThumbnailPreview } from '@pixel-brewery/mosaik-elements-foundation';
import { createFilePreview, createFilePreviewFallback, resolveFilePreviewMediaKind } from './FilePreview';

// #endregion

/**
 * Creates a lifecycle-safe Mosaik thumbnail preview for a browser file.
 *
 * @public
 */
@Pipe({
    name: 'ngpFilePreview',
    pure: true,
})
export class FilePreviewPipe implements OnDestroy, PipeTransform {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);
    private _objectUrl: null | string = null;
    private _objectUrlApi: null | typeof URL = null;

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /**
     * Converts a browser file into the Mosaik thumbnail contract.
     *
     * @param value - File selected by the user.
     * @returns A Mosaik thumbnail preview or the generic document fallback.
     * @public
     */
    public transform(value: File | null | undefined): ThumbnailPreview {
        this.revokeObjectUrl();

        if (!value) {
            return this.createFallbackPreview();
        }

        const mediaKind = resolveFilePreviewMediaKind(value.type, value.name);
        if (mediaKind === 'other') {
            return this.createFallbackPreview();
        }

        const objectUrlApi = this._document.defaultView?.URL;
        if (!objectUrlApi?.createObjectURL) {
            return this.createFallbackPreview();
        }

        try {
            const objectUrl = objectUrlApi.createObjectURL(value);

            this._objectUrl = objectUrl;
            this._objectUrlApi = objectUrlApi;

            return createFilePreview(mediaKind, objectUrl, value.name);
        } catch {
            return this.createFallbackPreview();
        }
    }

    /**
     * Releases the current browser object URL.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this.revokeObjectUrl();
    }

    private createFallbackPreview(): ThumbnailPreview {
        return createFilePreviewFallback();
    }

    private revokeObjectUrl(): void {
        if (this._objectUrl && this._objectUrlApi) {
            this._objectUrlApi.revokeObjectURL(this._objectUrl);
        }

        this._objectUrl = null;
        this._objectUrlApi = null;
    }

    // #endregion
}
