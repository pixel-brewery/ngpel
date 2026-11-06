// #region Imports

import type { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EMPTY, finalize, of, Subject, throwError, type Observable } from 'rxjs';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { DOCUMENT_PREVIEW_MIME_TYPES } from './DOCUMENT_PREVIEW_MIME_TYPES';
import type { DocumentPreviewMimeType } from './DocumentPreviewMimeType';
import { DocumentPreviewState } from './DocumentPreviewState';
import type { IDocumentPreviewRequest } from './IDocumentPreviewRequest';

// #endregion

describe('DocumentPreviewState', () => {
    let createObjectUrl: ReturnType<typeof vi.fn>;
    let revokeObjectUrl: ReturnType<typeof vi.fn>;
    let trustResourceUrl: ReturnType<typeof vi.fn>;
    let objectUrlApi: typeof URL;
    let sanitizer: DomSanitizer;
    let onLoaded: Mock<(blob: Blob) => void>;

    beforeEach(() => {
        createObjectUrl = vi.fn(() => 'blob:document-preview');
        revokeObjectUrl = vi.fn();
        trustResourceUrl = vi.fn((url: string) => ({ url }) as unknown as SafeResourceUrl);
        objectUrlApi = {
            createObjectURL: createObjectUrl,
            revokeObjectURL: revokeObjectUrl,
        } as unknown as typeof URL;
        sanitizer = { bypassSecurityTrustResourceUrl: trustResourceUrl } as unknown as DomSanitizer;
        onLoaded = vi.fn<(blob: Blob) => void>();
    });

    function create(request: Partial<IDocumentPreviewRequest> = {}, managedPdf = false): DocumentPreviewState {
        return new DocumentPreviewState(
            {
                fileName: 'document.pdf',
                mimeType: 'application/pdf',
                load: () => of(new Blob(['document'], { type: 'application/pdf' })),
                onLoaded,
                ...request,
            },
            sanitizer,
            objectUrlApi,
            managedPdf,
        );
    }

    it('notifies the caller only after validated bytes have a ready resource source', () => {
        // arrange
        const pending = new Subject<Blob>();
        const state = create({ load: () => pending });
        const blob = new Blob(['document'], { type: 'application/pdf' });
        onLoaded.mockImplementation(() => {
            expect(state.source()).not.toBeNull();
            expect(state.loading()).toBe(false);
        });
        state.load();
        expect(state.loading()).toBe(true);
        expect(onLoaded).not.toHaveBeenCalled();
        expect(createObjectUrl).not.toHaveBeenCalled();

        // act
        pending.next(blob);
        pending.next(new Blob(['ignored second response'], { type: 'application/pdf' }));

        // assert
        expect(onLoaded).toHaveBeenCalledExactlyOnceWith(blob);
        expect(createObjectUrl).toHaveBeenCalledExactlyOnceWith(blob);
        expect(state.source()).not.toBeNull();
        expect(state.loadFailed()).toBe(false);
        state.dispose();
    });

    it('offers managed PDF bytes without an object URL before the first page paints', () => {
        // arrange
        const blob = new Blob(['document'], { type: 'application/pdf' });
        const onRendered = vi.fn();
        const state = create({ load: () => of(blob), onRendered }, true);

        // act
        state.load();

        // assert
        expect(state.blob()).toBe(blob);
        expect(state.renderAttempt()?.blob).toBe(blob);
        expect(state.rendering()).toBe(true);
        expect(state.rendered()).toBe(false);
        expect(createObjectUrl).not.toHaveBeenCalled();
        expect(onLoaded).toHaveBeenCalledExactlyOnceWith(blob);
        expect(onRendered).not.toHaveBeenCalled();
    });

    it('acknowledges only the first actual render of an image attempt', () => {
        // arrange
        const blob = new Blob(['image'], { type: 'image/png' });
        const onRendered = vi.fn();
        const state = create({ mimeType: 'image/png', load: () => of(blob), onRendered });
        state.load();
        const attempt = state.renderAttempt();
        if (!attempt) throw new Error('Expected a validated image attempt.');
        state.acknowledgeRendered(attempt);

        // act
        state.acknowledgeRendered(attempt);

        // assert
        expect(state.rendering()).toBe(false);
        expect(state.rendered()).toBe(true);
        expect(onRendered).toHaveBeenCalledExactlyOnceWith(blob);
    });

    it('keeps validated bytes available after a render failure', () => {
        // arrange
        const state = create({}, true);
        state.load();
        const attempt = state.renderAttempt();
        if (!attempt) throw new Error('Expected a validated PDF attempt.');

        // act
        state.failRendering(attempt);

        // assert
        expect(state.rendering()).toBe(false);
        expect(state.loadFailed()).toBe(false);
        expect(state.renderFailed()).toBe(true);
        expect(state.blob()).toBe(attempt.blob);
    });

    it('ignores a render acknowledgment that arrives after a retry', () => {
        // arrange
        const onRendered = vi.fn();
        const state = create({ onRendered }, true);
        state.load();
        const attempt = state.renderAttempt();
        if (!attempt) throw new Error('Expected a validated PDF attempt.');
        state.failRendering(attempt);
        state.retry();

        // act
        state.acknowledgeRendered(attempt);

        // assert
        expect(state.renderAttempt()).not.toBe(attempt);
        expect(state.rendering()).toBe(true);
        expect(onRendered).not.toHaveBeenCalled();
    });

    it.each(DOCUMENT_PREVIEW_MIME_TYPES)('accepts a nonempty %s document with the exact expected MIME', (mimeType) => {
        // arrange
        const blob = new Blob(['document'], { type: mimeType });
        const state = create({ mimeType, load: () => of(blob) });

        // act
        state.load();

        // assert
        expect(state.loadFailed()).toBe(false);
        expect(state.source()).not.toBeNull();
        expect(onLoaded).toHaveBeenCalledExactlyOnceWith(blob);
        state.dispose();
    });

    it('accepts a valid PDF MIME essence with Content-Type parameters', () => {
        // arrange
        const blob = new Blob(['document'], { type: 'application/pdf; charset=binary' });
        const state = create({ load: () => of(blob) });

        // act
        state.load();

        // assert
        expect(state.loadFailed()).toBe(false);
        expect(state.source()).not.toBeNull();
        expect(state.blob()).toBe(blob);
        expect(onLoaded).toHaveBeenCalledExactlyOnceWith(blob);
        state.dispose();
    });

    it.each([
        ['empty bytes', 'application/pdf', new Blob([], { type: 'application/pdf' })],
        ['a MIME mismatch', 'application/pdf', new Blob(['document'], { type: 'image/png' })],
        ['a missing MIME', 'application/pdf', new Blob(['document'])],
        ['HTML', 'text/html', new Blob(['<script>alert(1)</script>'], { type: 'text/html' })],
        ['SVG', 'image/svg+xml', new Blob(['<svg/>'], { type: 'image/svg+xml' })],
        ['a non-blob response', 'application/pdf', 'invalid response'],
    ] as const)('rejects %s before trusting or allocating a renderable resource', (_reason, mimeType, value) => {
        // arrange
        const state = create({
            mimeType: mimeType as DocumentPreviewMimeType,
            load: () => of(value as Blob),
        });

        // act
        state.load();

        // assert
        expect(state.loadFailed()).toBe(true);
        expect(state.loading()).toBe(false);
        expect(state.source()).toBeNull();
        expect(createObjectUrl).not.toHaveBeenCalled();
        expect(trustResourceUrl).not.toHaveBeenCalled();
        expect(onLoaded).not.toHaveBeenCalled();
    });

    it('retries the captured loader after failure without retargeting to a changed caller descriptor', () => {
        // arrange
        const pending = new Subject<Blob>();
        const load = vi
            .fn()
            .mockReturnValueOnce(throwError(() => new Error('unavailable')))
            .mockReturnValue(pending);
        const replacement = vi.fn(() => of(new Blob(['other'], { type: 'application/pdf' })));
        const request = {
            fileName: 'captured.pdf',
            mimeType: 'application/pdf' as const,
            load: (): Observable<Blob> => load(),
            onLoaded,
        };
        const state = new DocumentPreviewState(request, sanitizer, objectUrlApi);
        state.load();
        expect(state.loadFailed()).toBe(true);
        request.load = replacement;

        // act
        state.retry();
        state.retry();
        const blob = new Blob(['captured document'], { type: 'application/pdf' });
        pending.next(blob);

        // assert
        expect(load).toHaveBeenCalledTimes(2);
        expect(replacement).not.toHaveBeenCalled();
        expect(state.loadFailed()).toBe(false);
        expect(onLoaded).toHaveBeenCalledExactlyOnceWith(blob);
        state.dispose();
    });

    it.each(['empty completion', 'synchronous loader failure'])('exposes retryable feedback for %s without notifying successful loading', (kind) => {
        // arrange
        const load = (): typeof EMPTY => {
            if (kind === 'synchronous loader failure') throw new Error('unavailable');
            return EMPTY;
        };
        const state = create({ load });

        // act
        state.load();

        // assert
        expect(state.loading()).toBe(false);
        expect(state.loadFailed()).toBe(true);
        expect(state.source()).toBeNull();
        expect(onLoaded).not.toHaveBeenCalled();
    });

    it('cancels a pending load on disposal and ignores late bytes and retry attempts', () => {
        // arrange
        const pending = new Subject<Blob>();
        const cancelled = vi.fn();
        const load = vi.fn(() => pending.pipe(finalize(cancelled)));
        const state = create({ load });
        state.load();

        // act
        state.dispose();
        pending.next(new Blob(['late document'], { type: 'application/pdf' }));
        state.retry();
        state.load();

        // assert
        expect(cancelled).toHaveBeenCalledOnce();
        expect(load).toHaveBeenCalledOnce();
        expect(state.loading()).toBe(false);
        expect(state.source()).toBeNull();
        expect(createObjectUrl).not.toHaveBeenCalled();
        expect(onLoaded).not.toHaveBeenCalled();
    });

    it('releases a ready resource exactly once when close and host destruction both dispose it', () => {
        // arrange
        const state = create();
        state.load();

        // act
        state.dispose();
        state.dispose();

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledExactlyOnceWith('blob:document-preview');
        expect(state.source()).toBeNull();
    });

    it('releases a resource created during a close race without publishing it or notifying the caller', () => {
        // arrange
        const state = create();
        createObjectUrl.mockImplementation(() => {
            state.dispose();
            return 'blob:late-resource';
        });

        // act
        state.load();

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledExactlyOnceWith('blob:late-resource');
        expect(state.source()).toBeNull();
        expect(onLoaded).not.toHaveBeenCalled();
    });

    it('cleans up an allocated URL if the resource trust boundary fails', () => {
        // arrange
        const state = create();
        trustResourceUrl.mockImplementation(() => {
            throw new Error('resource unavailable');
        });

        // act
        state.load();

        // assert
        expect(state.loadFailed()).toBe(true);
        expect(state.source()).toBeNull();
        expect(revokeObjectUrl).toHaveBeenCalledExactlyOnceWith('blob:document-preview');
        expect(onLoaded).not.toHaveBeenCalled();
        state.dispose();
        expect(revokeObjectUrl).toHaveBeenCalledOnce();
    });

    it('keeps an unavailable object URL API retryable without a resource leak', () => {
        // arrange
        createObjectUrl.mockImplementation(() => {
            throw new Error('unsupported browser');
        });
        const state = create();

        // act
        state.load();

        // assert
        expect(state.loadFailed()).toBe(true);
        expect(state.source()).toBeNull();
        expect(revokeObjectUrl).not.toHaveBeenCalled();
        expect(onLoaded).not.toHaveBeenCalled();
    });
});
