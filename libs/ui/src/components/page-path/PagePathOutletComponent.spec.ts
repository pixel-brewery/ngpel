import { ElementRef, getDebugNode, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AnimationPlayer, AnimationPreset } from '@pixel-brewery/mosaik-elements-foundation';
import { command } from '@pixel-brewery/ngpel-mvp';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IPagePathLevel } from './IPagePathLevel';
import { PagePathOutletComponent } from './PagePathOutletComponent';
import { PagePathRegistry } from './PagePathRegistry';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await import('@angular/core');
    const element = (selector: string, inputs: string[] = []) => angular.Component({ selector, template: '<ng-content />', inputs })(class {});
    return {
        BreakpointService: class BreakpointService {},
        BreadcrumbComponent: element('mosaik-breadcrumb'),
        BreadcrumbItemComponent: element('mosaik-breadcrumb-item', ['label', 'isActive', 'underline']),
        ButtonComponent: element('mosaik-button', ['label', 'iconSize', 'appearance', 'disabled']),
        DividerComponent: element('mosaik-divider'),
        FormatPipe: angular.Pipe({ name: 'format' })(
            class {
                public transform(format: string, label: string): string {
                    return format.replace('{0}', label);
                }
            },
        ),
        IconNameDirective: angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(class {}),
        SkeletonComponent: element('mosaik-skeleton', ['width', 'height', 'shimmer']),
    };
});

vi.mock('@pixel-brewery/mosaik-elements-foundation', () => ({
    AnimationPlayer: class AnimationPlayer {},
    AnimationPreset: {
        fadeSlideIn: { steps: [{ opacity: 0 }, { opacity: 1 }] },
        fadeSlideOut: { steps: [{ opacity: 1 }, { opacity: 0 }] },
    },
}));

describe('PagePathOutletComponent', () => {
    afterEach(() => TestBed.resetTestingModule());

    async function create(initial: ReadonlyArray<IPagePathLevel>, options?: { compact?: boolean; animated?: boolean }) {
        const levels = signal(initial);
        const player = {
            play: vi.fn(async () => new Event('finish')),
            playToFinal: vi.fn(async () => new Event('finish')),
            stopAll: vi.fn(async () => []),
        };
        TestBed.configureTestingModule({ providers: [{ provide: AnimationPlayer, useValue: player }] });
        const fixture = TestBed.createComponent(PagePathOutletComponent);
        const root = fixture.nativeElement as HTMLElement;
        const renderedLevels = () => Array.from(root.querySelectorAll<HTMLElement>('mosaik-breadcrumb-item'));
        Object.assign(fixture.componentInstance, {
            headerLayout: signal(true),
            compact: signal(options?.compact ?? false),
            animateLevels: signal(options?.animated ?? false),
            // JIT does not compile signal query initializers in the fixture.
            _levelElements: () => renderedLevels().map((element) => new ElementRef(element)),
        });
        TestBed.inject(PagePathRegistry).register(levels);
        const render = async () => {
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();
            await fixture.whenStable();
        };
        await render();
        return { root, renderedLevels, levels, player, render };
    }

    function pauseExit(player: { playToFinal: ReturnType<typeof vi.fn<() => Promise<Event>>> }): () => void {
        let finish: (() => void) | undefined;
        player.playToFinal.mockReturnValueOnce(
            new Promise((resolve) => {
                finish = () => resolve(new Event('finish'));
            }),
        );
        return () => finish?.();
    }

    it('offers the parent action on a compact path and executes it on activation', async () => {
        const back = vi.fn();
        const { root } = await create([{ label: 'List', command: command(back) }, { label: 'Detail' }], { compact: true });

        root.querySelector<HTMLElement>('[test-id="page-path-back"]')?.click();

        expect(back).toHaveBeenCalledOnce();
    });

    it('activates only enabled parent levels via the keyboard', async () => {
        const navigate = vi.fn();
        const { renderedLevels } = await create([
            { label: 'List', command: command(navigate) },
            { label: 'Area', command: command(navigate, signal(false)) },
            { label: 'Detail', command: command(navigate) },
        ]);

        for (const level of renderedLevels()) {
            level.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        }

        expect(navigate).toHaveBeenCalledOnce();
    });

    it('keeps a shared parent while entering the new levels in order', async () => {
        const view = await create([{ label: 'List' }], { animated: true });
        const [parent] = view.renderedLevels();
        view.player.play.mockClear();

        view.levels.set([{ label: 'List' }, { label: 'Area' }, { label: 'Detail' }]);
        await view.render();

        const [sameParent, area, detail] = view.renderedLevels();
        expect(sameParent).toBe(parent);
        expect(view.player.play.mock.calls).toEqual([
            [area, AnimationPreset.fadeSlideIn, { duration: 200, delay: 0, fill: 'both' }],
            [detail, AnimationPreset.fadeSlideIn, { duration: 200, delay: 40, fill: 'both' }],
        ]);
    });

    it('retains the departing level until its animation finishes', async () => {
        const view = await create([{ label: 'List' }, { label: 'Old' }], { animated: true });
        const [parent, old] = view.renderedLevels();
        const finish = pauseExit(view.player);

        view.levels.set([{ label: 'List' }, { label: 'New' }]);
        await view.render();
        expect(view.renderedLevels()).toEqual([parent, old]);
        finish();

        await vi.waitFor(async () => {
            await view.render();
            const [sameParent, replacement] = view.renderedLevels();
            expect(sameParent).toBe(parent);
            expect(replacement).not.toBe(old);
            expect(replacement?.getAttribute('aria-current')).toBe('page');
        });
    });

    it('shows the latest path when navigation changes again during an exit', async () => {
        const view = await create([{ label: 'List' }, { label: 'Old' }], { animated: true });
        const finish = pauseExit(view.player);

        view.levels.set([{ label: 'List' }, { label: 'Intermediate' }]);
        await view.render();
        view.levels.set([{ label: 'List' }, { label: 'Latest' }]);
        await view.render();
        finish();

        await vi.waitFor(async () => {
            await view.render();
            const last = view.renderedLevels().at(-1);
            expect(last && getDebugNode(last)?.componentInstance).toMatchObject({ label: 'Latest' });
            expect(view.player.playToFinal).toHaveBeenCalledOnce();
        });
    });
});
