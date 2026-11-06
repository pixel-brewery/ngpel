import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ContextOverlayLoader } from './ContextOverlayLoader';
import { ContextOverlayService } from './ContextOverlayService';
import type { IContextOverlayRef } from './IContextOverlayRef';
import type { IContextOverlayState } from './IContextOverlayState';
import type { IContextOverlayTarget } from './IContextOverlayTarget';
import { provideContextOverlayRouting } from './provideContextOverlayRouting';
import { provideContextOverlayTarget } from './provideContextOverlayTarget';

@Component({
    selector: 'ngp-overlay-test-page',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestPage {}

function fixtureTarget(key: string) {
    const mounts: Array<{
        readonly state: IContextOverlayState;
        readonly data: unknown;
        readonly result: Subject<string>;
        readonly close: () => void;
    }> = [];
    const target: IContextOverlayTarget<string> = {
        key,
        canOpen: () => true,
        prepare: (state, data) => async () => () => {
            const result = new Subject<string>();
            const close = vi.fn((): void => result.complete());
            mounts.push({ state, data, result, close });
            return { closed: result.asObservable(), close };
        },
        onClosed: vi.fn(),
    };

    return { target, mounts };
}

async function createHost(url: string, ...targets: IContextOverlayTarget<string>[]) {
    const invalid = vi.fn();
    TestBed.configureTestingModule({
        providers: [
            provideRouter(
                [
                    { path: 'app/report', component: TestPage },
                    { path: 'sign-in', component: TestPage },
                ],
                withDisabledInitialNavigation(),
            ),
            provideContextOverlayRouting({ supportsPath: (path) => path.startsWith('/app/'), onInvalidUrl: invalid }),
            ...targets.map((target) => provideContextOverlayTarget(() => target)),
        ],
    });
    const harness = await RouterTestingHarness.create(url);

    return { service: TestBed.inject(ContextOverlayService), location: TestBed.inject(Location), harness, invalid };
}

describe('ContextOverlayService', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('restores the top layer on browser Forward while retaining the mounted background drawer', async () => {
        // Arrange
        const report = fixtureTarget('report.detail');
        const task = fixtureTarget('task.detail');
        const { location, service } = await createHost('/app/report?team=1&team=2&overlay=report.detail&overlayId=42#chart', report.target, task.target);
        expect(service.open('task.detail', '5')).toBe(true);
        await vi.waitFor(() => expect(task.mounts).toHaveLength(1));
        const outcome = vi.fn();
        service.closedOutcome.subscribe(outcome);
        const firstTask = task.mounts[0]!;
        location.back();
        await vi.waitFor(() => expect(firstTask.close).toHaveBeenCalledOnce());

        // Act
        location.forward();

        // Assert
        await vi.waitFor(() => expect(task.mounts).toHaveLength(2));
        expect(report.mounts).toHaveLength(1);
        expect(report.mounts[0]!.close).not.toHaveBeenCalled();
        expect(location.path(true)).toBe('/app/report?team=1&team=2&overlay=report.detail&overlayId=42&overlay.1=task.detail&overlayId.1=5#chart');
        expect(outcome).not.toHaveBeenCalled();
    });

    it('appends overlays and replaces only the top URL state on an interactive close', async () => {
        // Arrange
        const report = fixtureTarget('report.detail');
        const task = fixtureTarget('task.edit');
        const { location, service } = await createHost('/app/report?filter=active#chart', report.target, task.target);
        expect(service.open('report.detail', '42')).toBe(true);
        expect(service.open('task.edit', '5')).toBe(true);
        await vi.waitFor(() => expect(task.mounts).toHaveLength(1));
        const outcome = vi.fn();
        service.closedOutcome.subscribe(outcome);

        // Act
        task.mounts[0]!.result.next('saved');

        // Assert
        expect(location.path(true)).toBe('/app/report?filter=active&overlay=report.detail&overlayId=42#chart');
        expect(report.mounts[0]!.close).not.toHaveBeenCalled();
        expect(task.target.onClosed).toHaveBeenCalledWith('saved', { key: 'task.edit', id: '5' });
        expect(outcome).toHaveBeenCalledWith({ state: { key: 'task.edit', id: '5' }, result: 'saved' });
    });

    it('promotes a create overlay in place and keeps transient data on its own layer', async () => {
        // Arrange
        const report = fixtureTarget('report.detail');
        const task = fixtureTarget('task.edit');
        const { location, service } = await createHost('/app/report?filter=active', report.target, task.target);
        const draft = { title: 'Unsaved' };
        expect(service.open('report.detail', '42')).toBe(true);
        expect(service.open('task.edit', undefined, 'report:42', draft)).toBe(true);
        await vi.waitFor(() => expect(task.mounts).toHaveLength(1));

        // Act
        const updated = service.identifyCreated('task.edit', '5');

        // Assert
        expect(updated).toBe(true);
        expect(report.mounts[0]!.data).toBeUndefined();
        expect(task.mounts[0]!.data).toBe(draft);
        expect(task.mounts[0]!.close).not.toHaveBeenCalled();
        expect(location.path()).toBe(
            '/app/report?filter=active&overlay=report.detail&overlayId=42&overlay.1=task.edit&overlayId.1=5&overlayContext.1=report%3A42',
        );
    });

    it('rejects a denied deep link before preparing its target', async () => {
        // Arrange
        const prepare = vi.fn<() => ContextOverlayLoader<string>>();
        const { invalid } = await createHost('/app/report?overlay=report.detail&overlayId=42', {
            key: 'report.detail',
            canOpen: () => false,
            prepare,
        });

        // Assert
        await vi.waitFor(() => expect(invalid).toHaveBeenCalledOnce());
        expect(prepare).not.toHaveBeenCalled();
    });

    it('opens the current overlay while a superseded lazy loader is still pending', async () => {
        // Arrange
        const oldOpen = vi.fn<() => IContextOverlayRef<string>>();
        const newTarget = fixtureTarget('report.new');
        let finish!: (open: () => IContextOverlayRef<string>) => void;
        const pending = new Promise<() => IContextOverlayRef<string>>((resolve) => {
            finish = resolve;
        });
        const load = vi.fn<ContextOverlayLoader<string>>(() => pending);
        const { location } = await createHost(
            '/app/report?overlay=report.old&overlayId=1',
            { key: 'report.old', canOpen: () => true, prepare: () => load },
            newTarget.target,
        );
        await vi.waitFor(() => expect(load).toHaveBeenCalledOnce());

        // Act
        location.replaceState('/app/report?overlay=report.new&overlayId=2');

        // Assert
        await vi.waitFor(() => expect(newTarget.mounts).toHaveLength(1));
        expect(load.mock.calls[0]?.[0].aborted).toBe(true);
        finish(oldOpen);
        await pending;
        expect(oldOpen).not.toHaveBeenCalled();
    });

    it('closes mounted surfaces and completes outcomes when the injector is destroyed', async () => {
        // Arrange
        const report = fixtureTarget('report.detail');
        const { service } = await createHost('/app/report?overlay=report.detail&overlayId=42', report.target);
        await vi.waitFor(() => expect(report.mounts).toHaveLength(1));
        const next = vi.fn();
        const complete = vi.fn();
        service.closedOutcome.subscribe({ next, complete });

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(report.mounts[0]!.close).toHaveBeenCalledOnce();
        expect(complete).toHaveBeenCalledOnce();
        expect(next).not.toHaveBeenCalled();
    });
});
