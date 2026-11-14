import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ActivityLogComponent } from './ActivityLogComponent';
import { createActivityLogController } from './createActivityLogController';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { Component } = await import('@angular/core');
    const control = (selector: string, inputs: string[] = []) => Component({ selector, template: '<ng-content />', inputs })(class {});
    return {
        ButtonComponent: control('mosaik-button', ['label', 'icon', 'isBusy']),
        EmptyStateComponent: control('mosaik-empty-state', ['header', 'content']),
        ErrorStateComponent: control('mosaik-error-state', ['header', 'content']),
        SkeletonComponent: control('mosaik-skeleton', ['shape', 'width', 'height', 'shimmer']),
        TimelineComponent: control('mosaik-timeline', ['align']),
        TimelineContentComponent: control('mosaik-timeline-content'),
        TimelineItemComponent: control('mosaik-timeline-item'),
        TimelineMarkerComponent: control('mosaik-timeline-marker'),
        TimelineSeparatorComponent: control('mosaik-timeline-separator', ['label', 'description']),
    };
});

describe('ActivityLogComponent', () => {
    afterEach(() => TestBed.resetTestingModule());

    function createView(options: { refresh?: boolean; unreadBoundary?: number | null; loaded?: boolean }) {
        const loadPage = vi.fn(() => of({ items: [3, 2, 1], total: 3 }));
        const controller = TestBed.runInInjectionContext(() => createActivityLogController({ loadPage, itemKey: (item) => item }));

        if (options.loaded) controller.ensureLoaded();

        const fixture = TestBed.createComponent(ActivityLogComponent<number>);
        Object.assign(fixture.componentInstance, {
            controller: signal(controller),
            detailed: signal(true),
            refreshOnMount: signal(options.refresh ?? false),
            testIdPrefix: signal('history'),
            unreadBoundary: signal(options.unreadBoundary),
        });
        fixture.detectChanges();
        return { fixture, loadPage };
    }

    it('refreshes a previously loaded timeline once when reopened', () => {
        const { loadPage } = createView({ refresh: true, loaded: true });

        expect(loadPage).toHaveBeenCalledTimes(2);
    });

    it('places the new changes separator before the first previously read entry', () => {
        const { fixture } = createView({ unreadBoundary: 2 });
        const root = fixture.nativeElement as HTMLElement;
        const first = root.querySelector('[test-id="history-entry-3"]');
        const separator = root.querySelector('[test-id="history-new-changes"]');
        const read = root.querySelector('[test-id="history-entry-2"]');

        expect(first?.nextElementSibling).toBe(separator);
        expect(separator?.nextElementSibling).toBe(read);
    });
});
