// #region Imports

import { computed, signal, type Signal } from '@angular/core';
import type { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defer, finalize, take, type Subscription } from 'rxjs';
import { DOCUMENT_PREVIEW_MIME_TYPES } from './DOCUMENT_PREVIEW_MIME_TYPES';
import type { IDocumentPreviewRenderAttempt } from './IDocumentPreviewRenderAttempt';
import type { IDocumentPreviewRequest } from './IDocumentPreviewRequest';

// #endregion

/**
 * Owns one captured document load and its temporary browser resource.
 *
 * @internal
 */
export class DocumentPreviewState {
    // #region Fields

    private readonly _request: IDocumentPreviewRequest;
    private readonly _sanitizer: DomSanitizer;
    private readonly _objectUrlApi: typeof URL | undefined;
    private readonly _managedPdf: boolean;
    private readonly _loading = signal(false);
    private readonly _loadFailed = signal(false);
    private readonly _blob = signal<Blob | null>(null);
    private readonly _source = signal<SafeResourceUrl | null>(null);
    private readonly _renderAttempt = signal<IDocumentPreviewRenderAttempt | null>(null);
    private readonly _renderState = signal<'idle' | 'rendering' | 'rendered' | 'failed'>('idle');
    private _subscription: Subscription | undefined;
    private _objectUrl: string | null = null;
    private _sequence = 0;
    private _disposed = false;
    private _hasNotifiedRendered = false;

    // #endregion

    // #region Ctor

    /**
     * Captures the caller's descriptor independently of subsequent caller changes.
     *
     * @param request - Exact document and loader to retain for this session.
     * @param sanitizer - Angular resource URL trust boundary.
     * @param objectUrlApi - Browser API owning the temporary resource.
     * @param managedPdf - Whether PDF bytes go directly to the opt-in renderer.
     * @internal
     */
    public constructor(request: IDocumentPreviewRequest, sanitizer: DomSanitizer, objectUrlApi: typeof URL | undefined, managedPdf = false) {
        this._request = { ...request };
        this._sanitizer = sanitizer;
        this._objectUrlApi = objectUrlApi;
        this._managedPdf = managedPdf;
    }

    // #endregion

    // #region Properties

    /** Indicates that the current attempt has not yet completed. */
    public readonly loading: Signal<boolean> = this._loading.asReadonly();

    /** Indicates that the captured document can be retried. */
    public readonly loadFailed: Signal<boolean> = this._loadFailed.asReadonly();

    /** Original validated bytes retained for download, including after a renderer error. */
    public readonly blob: Signal<Blob | null> = this._blob.asReadonly();

    /** Safe source allocated only for a validated, supported blob. */
    public readonly source: Signal<SafeResourceUrl | null> = this._source.asReadonly();

    /** Exact generation currently passed to an image or managed PDF renderer. */
    public readonly renderAttempt = this._renderAttempt.asReadonly();

    /** Whether the current preview is waiting for its first render. */
    public readonly rendering = computed(() => this._renderState() === 'rendering');

    /** Whether the current renderer has displayed the document. */
    public readonly rendered = computed(() => this._renderState() === 'rendered');

    /** Whether the current bytes could not be rendered. */
    public readonly renderFailed = computed(() => this._renderState() === 'failed');

    // #endregion

    // #region Methods

    /**
     * Loads the captured document once without overlapping an active attempt.
     *
     * @internal
     */
    public load(): void {
        if (this._disposed || this._loading()) return;

        const sequence = ++this._sequence;
        this._subscription?.unsubscribe();
        this.releaseObjectUrl();
        this._loadFailed.set(false);
        this._loading.set(true);
        this._subscription = defer(() => this._request.load())
            .pipe(
                take(1),
                finalize(() => {
                    if (this.isCurrent(sequence)) this._loading.set(false);
                }),
            )
            .subscribe({
                next: (blob) => this.accept(blob, sequence),
                error: () => this.fail(sequence),
                complete: () => {
                    if (this.isCurrent(sequence) && this._blob() === null) this.fail(sequence);
                },
            });
    }

    /**
     * Repeats only a failed attempt using the original loader.
     *
     * @internal
     */
    public retry(): void {
        if (this._loadFailed() || this.renderFailed()) this.load();
    }

    /** Marks the current bytes as pending while their viewer is recreated. */
    public beginRendering(attempt: IDocumentPreviewRenderAttempt): void {
        if (this._renderAttempt() === attempt && !this.renderFailed()) this._renderState.set('rendering');
    }

    /** Acknowledges the first successful display of the current bytes. */
    public acknowledgeRendered(attempt: IDocumentPreviewRenderAttempt): void {
        if (this._renderAttempt() !== attempt || !this.rendering()) return;

        this._renderState.set('rendered');

        if (!this._hasNotifiedRendered) {
            this._hasNotifiedRendered = true;
            this._request.onRendered?.(attempt.blob);
        }
    }

    /** Records a current renderer failure while retaining downloadable bytes. */
    public failRendering(attempt: IDocumentPreviewRenderAttempt): void {
        if (this._renderAttempt() === attempt) this._renderState.set('failed');
    }

    /**
     * Cancels pending work and releases a source at most once.
     *
     * @internal
     */
    public dispose(): void {
        if (this._disposed) return;
        this._disposed = true;
        ++this._sequence;
        this._subscription?.unsubscribe();
        this._subscription = undefined;
        this._loading.set(false);
        this.releaseObjectUrl();
    }

    private accept(blob: Blob, sequence: number): void {
        if (!this.isCurrent(sequence)) return;
        if (
            !(blob instanceof Blob) ||
            blob.size <= 0 ||
            !DOCUMENT_PREVIEW_MIME_TYPES.includes(this._request.mimeType) ||
            blob.type.split(';', 1)[0]?.trim().toLowerCase() !== this._request.mimeType
        ) {
            this.fail(sequence);
            return;
        }

        const isPdf = this._request.mimeType === 'application/pdf';
        const managedPdf = isPdf && this._managedPdf;

        if (!managedPdf && !this.acceptObjectUrl(blob, sequence)) return;

        if (!isPdf || managedPdf) {
            this._renderAttempt.set({ blob, sequence });
            this._renderState.set('rendering');
        }

        this._blob.set(blob);
        this._loading.set(false);
        this._request.onLoaded?.(blob);
    }

    private acceptObjectUrl(blob: Blob, sequence: number): boolean {
        const url = this._objectUrlApi;
        let objectUrl: string | null = null;

        try {
            if (!url?.createObjectURL) {
                this.fail(sequence);
                return false;
            }

            objectUrl = url.createObjectURL(blob);
            const source = this._sanitizer.bypassSecurityTrustResourceUrl(objectUrl);

            if (!this.isCurrent(sequence)) {
                url.revokeObjectURL(objectUrl);
                return false;
            }

            this._objectUrl = objectUrl;
            this._source.set(source);
            return true;
        } catch {
            if (objectUrl !== null) url?.revokeObjectURL(objectUrl);
            this.fail(sequence);
            return false;
        }
    }

    private fail(sequence: number): void {
        if (!this.isCurrent(sequence)) return;
        this._loadFailed.set(true);
        this._loading.set(false);
    }

    private isCurrent(sequence: number): boolean {
        return !this._disposed && sequence === this._sequence;
    }

    private releaseObjectUrl(): void {
        const objectUrl = this._objectUrl;
        this._objectUrl = null;
        this._blob.set(null);
        this._source.set(null);
        this._renderAttempt.set(null);
        this._renderState.set('idle');
        if (objectUrl !== null) this._objectUrlApi?.revokeObjectURL(objectUrl);
    }

    // #endregion
}
