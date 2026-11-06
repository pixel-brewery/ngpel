import '@angular/compiler';
import { ErrorHandler, Injector, runInInjectionContext, signal } from '@angular/core';
import { Mentionable } from '../behaviors/Mentionable';
import { ViewMentionRegistry } from '../index';
import { ViewPresenter } from '../presenters/ViewPresenter';
import type { IViewMentionSource } from '../mentions/IViewMentionSource';
import { describe, expect, it, vi } from 'vitest';
import type { IViewItemAction } from './IViewItemAction';
import { VIEW_ITEM_ACTIONS } from './VIEW_ITEM_ACTIONS';
import { ViewItemActionRegistry } from './ViewItemActionRegistry';
import { ViewItemActionable } from './ViewItemActionable';

class ItemPresenterStub extends ViewItemActionable(Mentionable(ViewPresenter)) {
    public override getViewMentionSource(): IViewMentionSource {
        return {
            viewKey: 'items',
            routePrefix: '/items',
            items: () => [{ resourceType: 'item', resourceId: '42', label: 'Item 42', icon: 'box', descriptionKey: 'loc.items' }],
        };
    }
}

describe(ViewItemActionable.name, () => {
    it('invokes a dynamically registered feature action for only the selected live item', async () => {
        const execute = vi.fn().mockResolvedValue(undefined);
        const open = vi.fn();
        const prefetch = vi.fn();
        const isAvailable = signal(true);
        const action: IViewItemAction = {
            id: 'review',
            order: 100,
            labelKey: 'loc.review',
            iconName: 'box',
            isAvailable,
            choices: signal([{ id: 'team' }, { id: 'blocked', disabled: true }]),
            open,
            prefetch,
            execute,
        };
        const earlier: IViewItemAction = {
            id: 'export',
            order: 50,
            labelKey: 'loc.export',
            iconName: 'arrowDown',
            isAvailable: signal(true),
            execute: vi.fn(),
        };
        const injector = Injector.create({
            providers: [
                { provide: ViewMentionRegistry, useValue: { register: () => vi.fn() } },
                { provide: ErrorHandler, useValue: { handleError: vi.fn() } },
                { provide: VIEW_ITEM_ACTIONS, useValue: action, multi: true },
                { provide: VIEW_ITEM_ACTIONS, useValue: earlier, multi: true },
                ViewItemActionRegistry,
            ],
        });
        const presenter = runInInjectionContext(injector, () => new ItemPresenterStub());
        presenter.initialize();
        expect(presenter.viewItemActions().map((item) => item.id)).toEqual(['export', 'review']);
        expect(prefetch).toHaveBeenCalledOnce();

        presenter.openViewItemActionCommand.execute('review');
        presenter.executeViewItemActionCommand.execute({ resourceId: '42', actionId: 'review', choiceId: 'team' });
        await vi.waitFor(() => expect(execute).toHaveBeenCalledWith(expect.objectContaining({ resourceId: '42' }), 'team'));
        await vi.waitFor(() => expect(presenter.executeViewItemActionCommand.isExecuting()).toBe(false));
        expect(open).toHaveBeenCalledOnce();

        presenter.executeViewItemActionCommand.execute({ resourceId: 'missing', actionId: 'review', choiceId: 'team' });
        await vi.waitFor(() => expect(presenter.executeViewItemActionCommand.isExecuting()).toBe(false));
        presenter.executeViewItemActionCommand.execute({ resourceId: '42', actionId: 'review', choiceId: 'blocked' });
        await vi.waitFor(() => expect(presenter.executeViewItemActionCommand.isExecuting()).toBe(false));
        expect(execute).toHaveBeenCalledOnce();
        isAvailable.set(false);
        expect(presenter.viewItemActions().map((item) => item.id)).toEqual(['export']);
        presenter.dispose();
    });

    it('hides unavailable contributions and rejects duplicate action IDs', () => {
        const unavailable: IViewItemAction = {
            id: 'review',
            order: 100,
            labelKey: 'loc.review',
            iconName: 'box',
            isAvailable: signal(false),
            execute: vi.fn(),
        };
        const injector = Injector.create({
            providers: [
                { provide: ViewMentionRegistry, useValue: { register: () => vi.fn() } },
                { provide: ErrorHandler, useValue: { handleError: vi.fn() } },
                { provide: VIEW_ITEM_ACTIONS, useValue: unavailable, multi: true },
                ViewItemActionRegistry,
            ],
        });
        const presenter = runInInjectionContext(injector, () => new ItemPresenterStub());
        presenter.initialize();
        expect(presenter.viewItemActions()).toEqual([]);
        presenter.executeViewItemActionCommand.execute({ resourceId: '42', actionId: 'review' });
        expect(unavailable.execute).not.toHaveBeenCalled();
        presenter.dispose();

        const duplicateInjector = Injector.create({
            providers: [
                { provide: VIEW_ITEM_ACTIONS, useValue: unavailable, multi: true },
                { provide: VIEW_ITEM_ACTIONS, useValue: unavailable, multi: true },
                ViewItemActionRegistry,
            ],
        });
        expect(() => duplicateInjector.get(ViewItemActionRegistry)).toThrow(/duplicate view item action/i);

        const incompleteInjector = Injector.create({
            providers: [
                {
                    provide: VIEW_ITEM_ACTIONS,
                    useValue: { id: 'broken', order: 100, labelKey: 'loc.broken', iconName: 'box' },
                    multi: true,
                },
                ViewItemActionRegistry,
            ],
        });
        expect(() => incompleteInjector.get(ViewItemActionRegistry)).toThrow(/invalid.*view item action/i);

        const emptyInjector = Injector.create({
            providers: [
                { provide: ViewMentionRegistry, useValue: { register: () => vi.fn() } },
                { provide: ErrorHandler, useValue: { handleError: vi.fn() } },
                ViewItemActionRegistry,
            ],
        });
        const emptyPresenter = runInInjectionContext(emptyInjector, () => new ItemPresenterStub());
        emptyPresenter.initialize();
        expect(emptyPresenter.viewItemActions()).toEqual([]);
        emptyPresenter.dispose();
    });

    it('reports a feature action failure instead of silently losing it', async () => {
        const failure = new Error('Action failed');
        const handleError = vi.fn();
        const injector = Injector.create({
            providers: [
                { provide: ViewMentionRegistry, useValue: { register: () => vi.fn() } },
                { provide: ErrorHandler, useValue: { handleError } },
                {
                    provide: VIEW_ITEM_ACTIONS,
                    useValue: {
                        id: 'review',
                        order: 100,
                        labelKey: 'loc.review',
                        iconName: 'box',
                        isAvailable: signal(true),
                        execute: vi.fn().mockRejectedValue(failure),
                    } satisfies IViewItemAction,
                    multi: true,
                },
                ViewItemActionRegistry,
            ],
        });
        const presenter = runInInjectionContext(injector, () => new ItemPresenterStub());
        presenter.initialize();
        presenter.executeViewItemActionCommand.execute({ resourceId: '42', actionId: 'review' });
        await vi.waitFor(() => expect(handleError).toHaveBeenCalledWith(failure));
        presenter.dispose();
    });
});
