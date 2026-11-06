import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DrawerService, type ICancel } from '@pixel-brewery/mosaik-elements-angular';
import { ContextOverlayService, ContextOverlayUrl, provideContextOverlayRouting } from '@pixel-brewery/ngpel-router';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IContextDrawerTarget } from './IContextDrawerTarget';
import { provideContextDrawerTarget } from './provideContextDrawerTarget';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ DrawerService: class DrawerService {} }));

@Component({ selector: 'ngp-context-drawer-test-page', template: '' })
class TestPage {}

@Component({ selector: 'ngp-context-drawer-test-content', template: '' })
class TestDrawer {}

const BACKGROUND = '/reports?filter=active#chart';

function configureDrawer<TData, TResult = unknown>(target: IContextDrawerTarget<TData, TResult>) {
    const closed = new Subject<ICancel<TResult>>();
    const ref = { closed, close: vi.fn(() => closed.complete()) };
    const show = vi.fn(() => ref);
    const onInvalidUrl = vi.fn();
    TestBed.configureTestingModule({
        providers: [
            provideRouter([{ path: 'reports', component: TestPage }], withDisabledInitialNavigation()),
            provideContextOverlayRouting({ supportsPath: (path) => path === '/reports', onInvalidUrl }),
            { provide: DrawerService, useValue: { show } },
            provideContextDrawerTarget(() => target),
        ],
    });

    return { closed, show, onInvalidUrl };
}

describe('provideContextDrawerTarget', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('opens a drawer from a shared URL and leaves the background route in place on close', async () => {
        // Arrange
        const outcome = vi.fn();
        const resolveDetailData = vi.fn(async (id: string, context: string | undefined) => ({ id, context, restored: true }));
        const onClosed = vi.fn();
        const address = { key: 'report.detail', id: '42', context: 'team:7' };
        const { closed, show, onInvalidUrl } = configureDrawer<Awaited<ReturnType<typeof resolveDetailData>>, string>({
            key: address.key,
            canOpen: (mode) => mode === 'detail',
            loadView: async () => TestDrawer,
            detailData: (id, context) => ({ id, context, restored: false }),
            resolveDetailData,
            onClosed,
        });
        const url = TestBed.inject(ContextOverlayUrl).add(BACKGROUND, address.key, address.id, address.context);
        const harness = await RouterTestingHarness.create(url);
        const page = harness.routeDebugElement?.componentInstance;
        TestBed.inject(ContextOverlayService).closedOutcome.subscribe(outcome);
        await vi.waitFor(() => expect(show).toHaveBeenCalledOnce());

        // Act
        const result: ICancel<string> = { reason: 'positive', result: 'saved' };
        closed.next(result);

        // Assert
        expect(resolveDetailData).toHaveBeenCalledExactlyOnceWith(address.id, address.context, expect.any(AbortSignal));
        expect(show).toHaveBeenCalledExactlyOnceWith(TestDrawer, {
            data: { id: address.id, context: address.context, restored: true },
            closeOnNavigation: false,
        });
        expect(onClosed).toHaveBeenCalledExactlyOnceWith(result, address);
        expect(outcome).toHaveBeenCalledExactlyOnceWith({ state: address, result });
        expect(onInvalidUrl).not.toHaveBeenCalled();
        expect(TestBed.inject(Location).path(true)).toBe(BACKGROUND);
        expect(page).toBeInstanceOf(TestPage);
        expect(harness.routeDebugElement?.componentInstance).toBe(page);
    });

    it('leaves the page unchanged when a detail-only target is requested in create mode', async () => {
        // Arrange
        const loadView = vi.fn(async () => TestDrawer);
        const { show } = configureDrawer({
            key: 'report.detail',
            canOpen: () => true,
            loadView,
            detailData: (id) => ({ id }),
        });
        await RouterTestingHarness.create(BACKGROUND);
        const service = TestBed.inject(ContextOverlayService);

        // Act
        const accepted = service.open('report.detail');

        // Assert
        expect(accepted).toBe(false);
        expect(loadView).not.toHaveBeenCalled();
        expect(show).not.toHaveBeenCalled();
        expect(TestBed.inject(Location).path(true)).toBe(BACKGROUND);
    });

    it('passes a transient create draft to the drawer while keeping it out of the URL', async () => {
        // Arrange
        const draft = { label: 'Unsaved' };
        const { show } = configureDrawer<{ context?: string; draft?: unknown }>({
            key: 'report.detail',
            canOpen: (mode) => mode === 'create',
            loadView: async () => TestDrawer,
            detailData: () => ({}),
            createData: (context, draft) => ({ context, draft }),
        });
        await RouterTestingHarness.create(BACKGROUND);
        const service = TestBed.inject(ContextOverlayService);

        // Act
        const accepted = service.open('report.detail', undefined, 'team:7', draft);

        // Assert
        expect(accepted).toBe(true);
        await vi.waitFor(() => expect(show).toHaveBeenCalledExactlyOnceWith(TestDrawer, { data: { context: 'team:7', draft }, closeOnNavigation: false }));
        expect(TestBed.inject(Location).path(true)).toBe('/reports?filter=active&overlay=report.detail&overlayContext=team%3A7#chart');
    });

    it('uses transient detail data without resolving the address again', async () => {
        // Arrange
        const record = { id: '42', label: 'Loaded' };
        const resolveDetailData = vi.fn(async (id: string) => ({ id, record: { id, label: 'Fetched' } }));
        const { show } = configureDrawer<{ id: string; record: unknown }>({
            key: 'report.detail',
            canOpen: () => true,
            loadView: async () => TestDrawer,
            detailData: (id, _context, record) => ({ id, record }),
            resolveDetailData,
        });
        await RouterTestingHarness.create(BACKGROUND);
        const service = TestBed.inject(ContextOverlayService);

        // Act
        const accepted = service.open('report.detail', '42', undefined, record);

        // Assert
        expect(accepted).toBe(true);
        await vi.waitFor(() => expect(show).toHaveBeenCalledExactlyOnceWith(TestDrawer, { data: { id: '42', record }, closeOnNavigation: false }));
        expect(resolveDetailData).not.toHaveBeenCalled();
    });

    it('reports a failed detail restoration without mounting a drawer', async () => {
        // Arrange
        const error = new Error('The linked detail is unavailable.');
        const { show, onInvalidUrl } = configureDrawer({
            key: 'report.detail',
            canOpen: () => true,
            loadView: async () => TestDrawer,
            detailData: (id) => ({ id }),
            resolveDetailData: async () => {
                throw error;
            },
        });
        const link = TestBed.inject(ContextOverlayUrl).add(BACKGROUND, 'report.detail', '42');

        // Act
        await RouterTestingHarness.create(link);

        // Assert
        await vi.waitFor(() => expect(onInvalidUrl).toHaveBeenCalledExactlyOnceWith(link, error));
        expect(show).not.toHaveBeenCalled();
    });
});
