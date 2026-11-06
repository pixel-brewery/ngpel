// #region Imports

import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { FileDownloadService } from '@pixel-brewery/ngpel-core/browser';
import { DRAWER_REF, DRAWER_REF_DATA, DrawerService, type ICancel, type IDrawerConfig } from '@pixel-brewery/mosaik-elements-angular';
import { finalize, of, Subject } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DocumentPreviewService } from './DocumentPreviewService';
import { DocumentPreviewDrawerComponent } from './DocumentPreviewDrawerComponent';
import type { IDocumentPreviewData } from './IDocumentPreviewData';
import type { IDocumentPreviewRef } from './IDocumentPreviewRef';

// #endregion

vi.mock('@pixel-brewery/ngpel-core/browser', () => ({ FileDownloadService: class {} }));

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class {},
    Cancel: { negative: () => ({ reason: 'negative' }) },
    DRAWER_REF: 'DRAWER_REF',
    DRAWER_REF_DATA: 'DRAWER_REF_DATA',
    DrawerContentDirective: class {},
    DrawerHeaderComponent: class {},
    DrawerHeaderDirective: class {},
    DrawerService: class {},
    IconNameDirective: class {},
    TextComponent: class {},
    TranslateService: class {},
}));

describe('DocumentPreviewService', () => {
    let show: ReturnType<typeof vi.fn>;
    let service: DocumentPreviewService;
    let createObjectUrl: ReturnType<typeof vi.fn>;
    let revokeObjectUrl: ReturnType<typeof vi.fn>;
    let downloadBlobAs: ReturnType<typeof vi.fn>;
    let originalCreateObjectUrl: PropertyDescriptor | undefined;
    let originalRevokeObjectUrl: PropertyDescriptor | undefined;
    let sessions: Array<{ closed: Subject<ICancel<void>>; ref: IDocumentPreviewRef; data: IDocumentPreviewData }>;

    beforeEach(() => {
        let sequence = 0;
        sessions = [];
        createObjectUrl = vi.fn(() => `blob:document-${++sequence}`);
        revokeObjectUrl = vi.fn();
        downloadBlobAs = vi.fn();
        originalCreateObjectUrl = Object.getOwnPropertyDescriptor(window.URL, 'createObjectURL');
        originalRevokeObjectUrl = Object.getOwnPropertyDescriptor(window.URL, 'revokeObjectURL');
        Object.defineProperty(window.URL, 'createObjectURL', { configurable: true, value: createObjectUrl });
        Object.defineProperty(window.URL, 'revokeObjectURL', { configurable: true, value: revokeObjectUrl });
        show = vi.fn((_component: unknown, config: Partial<IDrawerConfig<IDocumentPreviewData>>) => {
            const data = config.data;
            if (!data) throw new Error('Document preview data is required.');
            const closed = new Subject<ICancel<void>>();
            const ref = {
                closed,
                close: vi.fn(() => closed.next({ reason: 'negative' })),
                data,
            } as unknown as IDocumentPreviewRef;
            sessions.push({ closed, ref, data });
            return ref;
        });
        TestBed.configureTestingModule({
            providers: [
                DocumentPreviewService,
                { provide: DrawerService, useValue: { show } },
                { provide: FileDownloadService, useValue: { downloadBlobAs } },
                { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => ({ url }) } },
            ],
        });
        service = TestBed.inject(DocumentPreviewService);
    });

    afterEach(() => {
        sessions.forEach((session) => session.closed.complete());
        restoreProperty('createObjectURL', originalCreateObjectUrl);
        restoreProperty('revokeObjectURL', originalRevokeObjectUrl);
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('opens independent nested drawers and closes only the requested document session', () => {
        // arrange
        const first = new Subject<Blob>();
        const second = new Subject<Blob>();
        const firstCancelled = vi.fn();
        const firstLoaded = vi.fn();
        const secondLoaded = vi.fn();
        const firstRef = service.open({
            fileName: 'first.pdf',
            mimeType: 'application/pdf',
            load: () => first.pipe(finalize(firstCancelled)),
            onLoaded: firstLoaded,
        });
        const secondRef = service.open({
            fileName: 'second.pdf',
            mimeType: 'application/pdf',
            load: () => second,
            onLoaded: secondLoaded,
        });

        // act
        firstRef.close();
        first.next(new Blob(['late first document'], { type: 'application/pdf' }));
        second.next(new Blob(['second document'], { type: 'application/pdf' }));

        // assert
        expect(firstRef).not.toBe(secondRef);
        expect(show).toHaveBeenCalledTimes(2);
        expect(show.mock.calls.every((call) => call[1].singleton === false)).toBe(true);
        expect(firstCancelled).toHaveBeenCalledOnce();
        expect(firstLoaded).not.toHaveBeenCalled();
        expect(secondLoaded).toHaveBeenCalledOnce();
        expect(sessions[0]!.data.state.source()).toBeNull();
        expect(sessions[1]!.data.state.source()).not.toBeNull();
        expect(secondRef.close).not.toHaveBeenCalled();
    });

    it('captures caller metadata and releases a loaded document once on every close signal', () => {
        // arrange
        const request = {
            fileName: 'captured.pdf',
            title: 'Captured document',
            mimeType: 'application/pdf' as const,
            load: () => of(new Blob(['captured bytes'], { type: 'application/pdf' })),
        };
        const ref = service.open(request);
        request.fileName = 'different.pdf';
        request.title = 'Different document';

        // act
        ref.close();
        sessions[0]!.closed.next({ reason: 'negative' });
        sessions[0]!.closed.complete();
        sessions[0]!.data.state.dispose();

        // assert
        expect(ref.data?.fileName).toBe('captured.pdf');
        expect(ref.data?.title).toBe('Captured document');
        expect(revokeObjectUrl).toHaveBeenCalledExactlyOnceWith('blob:document-1');
        expect(sessions[0]!.data.state.source()).toBeNull();
    });

    it('cancels pending work when the drawer closes through completion without a result', () => {
        // arrange
        const pending = new Subject<Blob>();
        const cancelled = vi.fn();
        const onLoaded = vi.fn();
        service.open({
            fileName: 'document.pdf',
            mimeType: 'application/pdf',
            load: () => pending.pipe(finalize(cancelled)),
            onLoaded,
        });

        // act
        sessions[0]!.closed.complete();
        pending.next(new Blob(['late document'], { type: 'application/pdf' }));

        // assert
        expect(cancelled).toHaveBeenCalledOnce();
        expect(createObjectUrl).not.toHaveBeenCalled();
        expect(onLoaded).not.toHaveBeenCalled();
    });

    it('downloads only ready validated bytes under the captured file name without another fetch', () => {
        // arrange
        const pending = new Subject<Blob>();
        const load = vi.fn(() => pending);
        const request = { fileName: 'Document-42-revision-3.pdf', mimeType: 'application/pdf' as const, load };
        const ref = service.open(request);
        request.fileName = 'Different-document.pdf';
        const injector = Injector.create({
            parent: TestBed.inject(Injector),
            providers: [
                { provide: DRAWER_REF, useValue: ref },
                { provide: DRAWER_REF_DATA, useValue: sessions[0]!.data },
            ],
        });
        const drawer = runInInjectionContext(injector, () => new DocumentPreviewDrawerComponent());
        drawer['onDownload']();
        expect(downloadBlobAs).not.toHaveBeenCalled();
        const blob = new Blob(['captured document'], { type: 'application/pdf' });
        pending.next(blob);

        // act
        drawer['onDownload']();

        // assert
        expect(downloadBlobAs).toHaveBeenCalledExactlyOnceWith(blob, 'Document-42-revision-3.pdf');
        expect(load).toHaveBeenCalledOnce();
        expect(ref.close).not.toHaveBeenCalled();
        expect(sessions[0]!.data.state.source()).not.toBeNull();
        ref.close();
        drawer['onDownload']();
        expect(downloadBlobAs).toHaveBeenCalledOnce();
        injector.destroy();
    });

    it('does not load or allocate browser resources when opening the drawer fails', () => {
        // arrange
        const load = vi.fn(() => of(new Blob(['document'], { type: 'application/pdf' })));
        show.mockImplementationOnce(() => {
            throw new Error('drawer unavailable');
        });

        // act
        const open = (): IDocumentPreviewRef => service.open({ fileName: 'document.pdf', mimeType: 'application/pdf', load });

        // assert
        expect(open).toThrow('drawer unavailable');
        expect(load).not.toHaveBeenCalled();
        expect(createObjectUrl).not.toHaveBeenCalled();
        expect(revokeObjectUrl).not.toHaveBeenCalled();
    });

    function restoreProperty(property: 'createObjectURL' | 'revokeObjectURL', descriptor?: PropertyDescriptor): void {
        if (descriptor) Object.defineProperty(window.URL, property, descriptor);
        else Reflect.deleteProperty(window.URL, property);
    }
});
