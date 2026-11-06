import { describe, expect, it, vi } from 'vitest';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';
import { PdfPreviewRenderer } from './PdfPreviewRenderer';

function createSdk() {
    const listeners = new Map<string, (event: unknown) => void>();
    const documentProxy = {};
    const destroyDocument = vi.fn(async () => undefined);
    const destroyLocalization = vi.fn(async () => undefined);
    const destroyPage = vi.fn();
    const destroyOtherPage = vi.fn();
    const linkDocument = vi.fn();
    const setDocument = vi.fn();
    const getDocument = vi.fn(() => ({ promise: Promise.resolve(documentProxy), destroy: destroyDocument }));
    const workerOptions = { workerSrc: '' };
    const modules = {
        api: { getDocument, GlobalWorkerOptions: workerOptions, AnnotationMode: { ENABLE: 1 } },
        viewer: {
            EventBus: class {
                public on(name: string, callback: (event: unknown) => void): void {
                    listeners.set(name, callback);
                }
            },
            GenericL10n: class {
                public readonly destroy = destroyLocalization;
                public readonly translate = vi.fn().mockResolvedValue(undefined);
            },
            PDFLinkService: class {
                public readonly setDocument = linkDocument;
                public readonly setViewer = vi.fn();
            },
            PDFViewer: class {
                public readonly setDocument = setDocument;
                public readonly pagesPromise = Promise.resolve();
                public getCachedPageViews(): ReadonlySet<{ destroy(): void }> {
                    return new Set([{ destroy: destroyPage }, { destroy: destroyOtherPage }]);
                }
            },
            LinkTarget: { BLANK: 2 },
        },
    };

    return { modules, listeners, workerOptions, getDocument, destroyDocument, destroyLocalization, destroyPage, destroyOtherPage, linkDocument, setDocument };
}

function pdfBlob(): Blob {
    const blob = new Blob(['pdf'], { type: 'application/pdf' });
    Object.defineProperty(blob, 'arrayBuffer', { value: async () => new Uint8Array([1, 2, 3]).buffer });
    return blob;
}

describe('PdfPreviewRenderer', () => {
    it('waits for the first actual page paint after initialization', async () => {
        // arrange
        const sdk = createSdk();
        const container = document.createElement('div');
        const rendered = vi.fn();
        const failed = vi.fn();
        const renderer = new PdfPreviewRenderer(container, { workerSrc: '/pdf.worker.mjs', load: async () => sdk.modules }, rendered, failed);
        await renderer.render(pdfBlob());
        const pageRendered = sdk.listeners.get('pagerendered');
        pageRendered?.({ pageNumber: 1, cssTransform: true });
        expect(rendered).not.toHaveBeenCalled();

        // act
        pageRendered?.({ pageNumber: 1, cssTransform: false });

        // assert
        expect(rendered).toHaveBeenCalledOnce();
        expect(failed).not.toHaveBeenCalled();
        expect(sdk.workerOptions.workerSrc).toBe('/pdf.worker.mjs');
        expect(sdk.getDocument).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ data: new Uint8Array([1, 2, 3]) }));
        await renderer.dispose();
    });

    it('ignores a lazy SDK response after the owning preview closes', async () => {
        // arrange
        const sdk = createSdk();
        const container = document.createElement('div');
        const rendered = vi.fn();
        const failed = vi.fn();
        let resolveModules: ((modules: Awaited<ReturnType<IPdfPreviewOptions['load']>>) => void) | undefined;
        const renderer = new PdfPreviewRenderer(
            container,
            {
                workerSrc: '/pdf.worker.mjs',
                load: () =>
                    new Promise((resolve) => {
                        resolveModules = resolve;
                    }),
            },
            rendered,
            failed,
        );
        const pending = renderer.render(pdfBlob());
        await renderer.dispose();

        // act
        resolveModules?.(sdk.modules);
        await pending;

        // assert
        expect(sdk.getDocument).not.toHaveBeenCalled();
        expect(rendered).not.toHaveBeenCalled();
        expect(failed).not.toHaveBeenCalled();
        expect(container.childElementCount).toBe(0);
    });

    it('releases the viewer, document and remaining cached pages after a render error', async () => {
        // arrange
        const sdk = createSdk();
        const container = document.createElement('div');
        const rendered = vi.fn();
        const failed = vi.fn();
        const renderer = new PdfPreviewRenderer(container, { workerSrc: '/pdf.worker.mjs', load: async () => sdk.modules }, rendered, failed);
        await renderer.render(pdfBlob());
        sdk.destroyPage.mockImplementation(() => {
            throw new Error('already destroyed');
        });

        // act
        sdk.listeners.get('pagerendered')?.({ pageNumber: 1, error: new Error('cannot display') });
        await renderer.dispose();

        // assert
        expect(failed).toHaveBeenCalledOnce();
        expect(rendered).not.toHaveBeenCalled();
        expect(sdk.setDocument).toHaveBeenLastCalledWith(null);
        expect(sdk.linkDocument).toHaveBeenLastCalledWith(null);
        expect(sdk.destroyDocument).toHaveBeenCalledOnce();
        expect(sdk.destroyLocalization).toHaveBeenCalledOnce();
        expect(sdk.destroyOtherPage).toHaveBeenCalledOnce();
        expect(container.childElementCount).toBe(0);
    });
});
