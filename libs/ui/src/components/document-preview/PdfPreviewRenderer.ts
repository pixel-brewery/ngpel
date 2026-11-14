// #region Imports

import type { IPdfPreviewOptions } from './IPdfPreviewOptions';

// #endregion

interface IPdfLoadingTask {
    readonly promise: Promise<unknown>;
    destroy(): Promise<void>;
}

interface IPdfApi {
    readonly GlobalWorkerOptions: { workerSrc: string };
    readonly AnnotationMode: { readonly ENABLE: number };
    getDocument(options: object): IPdfLoadingTask;
}

interface IPdfEventBus {
    on(name: string, listener: (event: unknown) => void, options: { readonly signal: AbortSignal }): void;
}

interface IPdfLocalization {
    translate(container: HTMLElement): Promise<void>;
    destroy(): void | Promise<void>;
}

interface IPdfViewer {
    readonly pagesPromise: Promise<unknown> | null;
    currentScaleValue: string;
    setDocument(document: unknown): void;
    update(): void;
    getCachedPageViews(): ReadonlySet<{ destroy(): void }>;
}

interface IPdfLinkService {
    setViewer(viewer: IPdfViewer): void;
    setDocument(document: unknown): void;
}

interface IPdfViewerModule {
    readonly EventBus: new () => IPdfEventBus;
    readonly GenericL10n: new (locale: string) => IPdfLocalization;
    readonly PDFLinkService: new (options: object) => IPdfLinkService;
    readonly PDFViewer: new (options: object) => IPdfViewer;
    readonly LinkTarget: { readonly BLANK: number };
}

/** Owns one cancellable display using the host's lazy official PDF.js viewer. @internal */
export class PdfPreviewRenderer {
    // #region Fields

    private readonly _abortController = new AbortController();
    private readonly _pages: HTMLDivElement;
    private _viewer: IPdfViewer | null = null;
    private _linkService: IPdfLinkService | null = null;
    private _localization: IPdfLocalization | null = null;
    private _loadingTask: IPdfLoadingTask | null = null;
    private _resizeObserver: ResizeObserver | null = null;
    private _disposePromise: Promise<void> | null = null;
    private _started = false;
    private _initialized = false;
    private _rendered = false;
    private _width = 0;

    // #endregion

    // #region Ctor

    public constructor(
        private readonly _container: HTMLDivElement,
        private readonly _options: Omit<IPdfPreviewOptions, 'locale'> & { readonly locale?: string },
        private readonly _onRendered: () => void,
        private readonly _onFailed: () => void,
    ) {
        this._pages = _container.ownerDocument.createElement('div');
        this._pages.classList.add('pdfViewer');
        _container.append(this._pages);
    }

    // #endregion

    // #region Methods

    /** Loads and initializes the viewer. A successful page paint is reported separately. */
    public async render(blob: Blob): Promise<void> {
        const signal = this._abortController.signal;

        if (this._started || signal.aborted) return;
        this._started = true;

        try {
            const modules = await this._options.load();
            if (signal.aborted) return;

            // This optional host boundary also keeps the SDK types out of ngpel's public declarations.
            const api = modules.api as IPdfApi;
            const sdk = modules.viewer as IPdfViewerModule;
            const eventBus = new sdk.EventBus();
            const locale = this._options.locale || this._container.ownerDocument.documentElement.lang || 'en';
            const localization = new sdk.GenericL10n(locale);
            this._localization = localization;
            const linkService = new sdk.PDFLinkService({ eventBus, externalLinkTarget: sdk.LinkTarget.BLANK, externalLinkRel: 'noopener noreferrer' });
            this._linkService = linkService;
            const viewer = new sdk.PDFViewer({
                container: this._container,
                viewer: this._pages,
                eventBus,
                linkService,
                l10n: localization,
                abortSignal: signal,
                annotationMode: api.AnnotationMode.ENABLE,
                imageResourcesPath: this._options.imageResourcesPath,
            });
            this._viewer = viewer;
            linkService.setViewer(viewer);
            eventBus.on(
                'pagesinit',
                () => {
                    this._initialized = true;
                    this.fitWidth();
                },
                { signal },
            );
            eventBus.on('pagerendered', (event) => this.onPageRendered(event), { signal });
            this.observeWidth();

            await localization.translate(this._container);
            if (signal.aborted) return;

            const bytes = await blob.arrayBuffer();
            if (signal.aborted) return;

            api.GlobalWorkerOptions.workerSrc = this._options.workerSrc;
            const task = api.getDocument({
                data: new Uint8Array(bytes),
                cMapUrl: this._options.cMapUrl,
                standardFontDataUrl: this._options.standardFontDataUrl,
                wasmUrl: this._options.wasmUrl,
                iccUrl: this._options.iccUrl,
            });
            this._loadingTask = task;

            const document = await task.promise;
            if (signal.aborted) return;

            linkService.setDocument(document);
            viewer.setDocument(document);
            await viewer.pagesPromise;
        } catch {
            this.fail();
        }
    }

    /** Cancels listeners and releases page caches, worker and localization once. */
    public dispose(): Promise<void> {
        if (this._disposePromise) return this._disposePromise;

        const viewer = this._viewer;
        const linkService = this._linkService;
        const task = this._loadingTask;
        const localization = this._localization;
        this._viewer = null;
        this._linkService = null;
        this._loadingTask = null;
        this._localization = null;

        this._disposePromise = Promise.allSettled([
            Promise.resolve().then(() => {
                try {
                    for (const page of viewer?.getCachedPageViews() ?? []) {
                        try {
                            page.destroy();
                        } catch {
                            // Each page releases its own cache. Continue with the remaining pages.
                        }
                    }
                } finally {
                    try {
                        viewer?.setDocument(null);
                    } finally {
                        linkService?.setDocument(null);
                    }
                }
            }),
            Promise.resolve().then(() => task?.destroy()),
            Promise.resolve().then(() => localization?.destroy()),
        ]).then(() => undefined);

        this._abortController.abort();
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
        this._pages.remove();
        return this._disposePromise;
    }

    private onPageRendered(event: unknown): void {
        if (this._abortController.signal.aborted || typeof event !== 'object' || event === null) return;

        if ('error' in event && event.error !== null && event.error !== undefined) {
            this.fail();
            return;
        }

        if ('cssTransform' in event && event.cssTransform === true) return;

        if (!this._rendered && 'pageNumber' in event && typeof event.pageNumber === 'number' && event.pageNumber > 0) {
            this._rendered = true;
            this._onRendered();
        }
    }

    private observeWidth(): void {
        const Observer = this._container.ownerDocument.defaultView?.ResizeObserver;
        if (!Observer) return;

        this._resizeObserver = new Observer(() => {
            if (this._initialized && this._width !== this._container.clientWidth) this.fitWidth();
        });
        this._resizeObserver.observe(this._container);
    }

    private fitWidth(): void {
        if (this._abortController.signal.aborted || !this._viewer) return;

        this._width = this._container.clientWidth;
        this._viewer.currentScaleValue = 'page-width';
        this._viewer.update();
    }

    private fail(): void {
        if (this._abortController.signal.aborted) return;

        try {
            this._onFailed();
        } finally {
            void this.dispose();
        }
    }

    // #endregion
}
