import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Subject } from 'rxjs';
import type { INavigationGuard } from './INavigationGuard';
import type { INavItem } from './INavItem';
import { NAVIGATION_GUARD_TOKEN } from './NAVIGATION_GUARD_TOKEN';
import { NavigationManager } from './NavigationManager';
import { provideNavigation } from './provider/provideNavigation';
import { withNavigationItems } from './provider/withNavigationItems';

/** One guard evaluation the spec has not resolved yet. */
interface IPendingGuardEvaluation {
    readonly nav: INavItem;
    readonly resolve: (result: INavItem | null) => void;
}

/** A navigation guard that never answers on its own, so a slow evaluation can be interleaved with a newer one. */
class DeferredNavigationGuard implements INavigationGuard {
    public readonly stateChanges = new Subject<void>();

    private readonly _pending: Array<IPendingGuardEvaluation> = [];

    public get pendingCount(): number {
        return this._pending.length;
    }

    public canRegister(nav: INavItem): Promise<INavItem | null> {
        return new Promise<INavItem | null>((resolve): void => {
            this._pending.push({ nav, resolve });
        });
    }

    public resolveEarliest(isAllowed: boolean): void {
        this.resolvePending(this._pending.shift(), isAllowed);
    }

    public resolveLatest(isAllowed: boolean): void {
        this.resolvePending(this._pending.pop(), isAllowed);
    }

    private resolvePending(evaluation: IPendingGuardEvaluation | undefined, isAllowed: boolean): void {
        if (evaluation === undefined) {
            throw new Error('No pending navigation guard evaluation.');
        }

        evaluation.resolve(isAllowed ? evaluation.nav : null);
    }
}

/** A navigation guard whose verdict the spec flips, together with the subject that triggers re-evaluation. */
class MutableNavigationGuard implements INavigationGuard {
    public readonly stateChanges = new Subject<void>();
    public isAllowed = true;

    public canRegister(nav: INavItem): INavItem | null {
        return this.isAllowed ? nav : null;
    }
}

const feedbackItem: INavItem = { key: 'administration.feedback', label: 'Feedback' };

function configure(items: ReadonlyArray<INavItem>, guard?: INavigationGuard): NavigationManager {
    TestBed.configureTestingModule({
        providers: [
            provideRouter([{ path: '**', children: [] }]),
            ...(guard === undefined ? [] : [{ provide: NAVIGATION_GUARD_TOKEN, useValue: guard, multi: true }]),
            provideNavigation(...items.map((item, index) => withNavigationItems({ id: `contribution-${index}`, items: item }))),
        ],
    });

    return TestBed.inject(NavigationManager);
}

async function register(...items: ReadonlyArray<INavItem>): Promise<NavigationManager> {
    const manager = configure(items);
    await vi.waitFor((): void => expect(manager.isReady()).toBe(true));

    return manager;
}

describe('NavigationManager', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('indexes the contributed items by key, region and parent', async () => {
        // Arrange
        const group: INavItem = { key: 'administration', label: 'Administration', region: 'main', order: 10 };
        const child: INavItem = { key: 'feedback', label: 'Feedback', region: 'main', parent: 'administration', order: 20 };

        // Act
        const manager = await register(group, child);

        // Assert
        expect(manager.all().map((item): string => item.key)).toEqual(['administration', 'feedback']);
        expect(manager.roots().map((item): string => item.key)).toEqual(['administration']);
        expect(
            manager
                .byRegion('main')()
                .map((item): string => item.key),
        ).toEqual(['administration', 'feedback']);
        expect(
            manager
                .rootsByRegion('main')()
                .map((item): string => item.key),
        ).toEqual(['administration']);
        expect(
            manager
                .children('administration')()
                .map((item): string => item.key),
        ).toEqual(['feedback']);
        expect(manager.parent('feedback')()?.key).toBe('administration');
        expect(manager.item('feedback')()?.label).toBe('Feedback');
        expect(manager.has('feedback')()).toBe(true);
    });

    it('reports an unknown key as absent', async () => {
        // Arrange
        const manager = await register(feedbackItem);

        // Act
        const isRegistered = manager.has('unknown')();

        // Assert
        expect(isRegistered).toBe(false);
        expect(manager.item('unknown')()).toBeUndefined();
        expect(manager.parent('unknown')()).toBeUndefined();
        expect(manager.children('unknown')()).toEqual([]);
    });

    it('treats an item whose parent was removed as a root item', async () => {
        // Arrange
        const orphan: INavItem = { key: 'feedback', label: 'Feedback', region: 'main', parent: 'administration' };

        // Act
        const manager = await register(orphan);

        // Assert
        expect(manager.roots().map((item): string => item.key)).toEqual(['feedback']);
    });

    it('rebuilds the navigation whenever the guard state changes', async () => {
        // Arrange
        const guard = new MutableNavigationGuard();
        const manager = configure([feedbackItem], guard);
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        guard.isAllowed = false;

        // Act
        guard.stateChanges.next();

        // Assert
        expect(manager.isReady()).toBe(false);
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        expect(manager.has(feedbackItem.key)()).toBe(false);
    });

    it('ignores an outdated guard result that arrives after a newer rebuild', async () => {
        // Arrange
        const guard = new DeferredNavigationGuard();
        const manager = configure([feedbackItem], guard);
        guard.stateChanges.next();
        guard.resolveLatest(true);
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));

        // Act
        guard.resolveEarliest(false);

        // Assert
        await vi.waitFor((): void => expect(guard.pendingCount).toBe(0));
        expect(manager.isReady()).toBe(true);
        expect(manager.has(feedbackItem.key)()).toBe(true);
    });

    it('merges two contributions to the same group instead of dropping the second', async () => {
        // Arrange
        const feedbackGroup: INavItem = {
            key: 'administration',
            label: 'Administration',
            icon: 'settings',
            order: 80,
            region: 'main',
            capabilities: ['feedback.read'],
            children: [{ key: 'feedback', label: 'Feedback', order: 10 }],
        };
        const newsGroup: INavItem = {
            key: 'administration',
            label: 'Administration',
            order: 80,
            capabilities: ['newsletter.write'],
            children: [{ key: 'news', label: 'News', order: 0 }],
        };

        // Act
        const manager = await register(feedbackGroup, newsGroup);

        // Assert
        const merged = manager.item('administration')();
        expect(merged?.children?.map((child): string => child.key)).toEqual(['news', 'feedback']);
        expect(merged?.capabilities).toEqual(['feedback.read', 'newsletter.write']);
        expect(
            manager
                .byRegion('main')()
                .map((item): string => item.key),
        ).toEqual(['administration']);
    });

    it('keeps the scalars of the first contribution and takes the lower order', async () => {
        // Arrange
        const first: INavItem = { key: 'administration', label: 'First', icon: 'settings', order: 80, region: 'main' };
        const second: INavItem = { key: 'administration', label: 'Second', icon: 'alert', order: 20 };

        // Act
        const manager = await register(first, second);

        // Assert
        const merged = manager.item('administration')();
        expect(merged?.label).toBe('First');
        expect(merged?.icon).toBe('settings');
        expect(merged?.region).toBe('main');
        expect(merged?.order).toBe(20);
    });

    it('keeps a merged group unrestricted when one contribution declares no capabilities', async () => {
        // Arrange
        const restricted: INavItem = { key: 'administration', label: 'Administration', capabilities: ['a.read'] };
        const unrestricted: INavItem = { key: 'administration', label: 'Administration' };

        // Act
        const manager = await register(restricted, unrestricted);

        // Assert
        expect(manager.item('administration')()?.capabilities).toBeUndefined();
    });

    it('de-duplicates a child key contributed twice, keeping the first', async () => {
        // Arrange
        const first: INavItem = {
            key: 'administration',
            label: 'Administration',
            children: [{ key: 'news', label: 'First news', order: 0 }],
        };
        const second: INavItem = {
            key: 'administration',
            label: 'Administration',
            children: [{ key: 'news', label: 'Second news', order: 5 }],
        };

        // Act
        const manager = await register(first, second);

        // Assert
        const children = manager.item('administration')()?.children ?? [];
        expect(children).toHaveLength(1);
        expect(children[0]?.label).toBe('First news');
    });

    it('links a declared child that is registered as its own item', async () => {
        // Arrange
        const group: INavItem = { key: 'administration', label: 'Administration', children: [{ key: 'news', label: 'News' }] };
        const news: INavItem = { key: 'news', label: 'News' };

        // Act
        const manager = await register(group, news);

        // Assert
        expect(
            manager
                .children('administration')()
                .map((item): string => item.key),
        ).toEqual(['news']);
        expect(manager.parent('news')()?.key).toBe('administration');
    });

    it('lets the parent an item declares itself win over a declaration as another group child', async () => {
        // Arrange
        const group: INavItem = {
            key: 'administration',
            label: 'Administration',
            children: [{ key: 'news', label: 'News' }],
        };
        const owner: INavItem = { key: 'content', label: 'Content' };
        const news: INavItem = { key: 'news', label: 'News', parent: 'content' };

        // Act
        const manager = await register(group, owner, news);

        // Assert
        expect(manager.parent('news')()?.key).toBe('content');
        expect(
            manager
                .children('content')()
                .map((item): string => item.key),
        ).toEqual(['news']);
        expect(manager.children('administration')()).toEqual([]);
    });

    it('executes the handle of a registered item', async () => {
        // Arrange
        const manager = await register({ key: 'users', label: 'Users', handle: 'route:/main/users' });

        // Act
        await manager.execute('users');

        // Assert
        expect(TestBed.inject(Router).url).toBe('/main/users');
    });

    it('reports an unregistered key as not executed through tryExecute', async () => {
        // Arrange
        const manager = await register(feedbackItem);

        // Act
        const succeeded = await manager.tryExecute('unknown');

        // Assert
        expect(succeeded).toBe(false);
    });

    it('rejects executing an unregistered key', async () => {
        // Arrange
        const manager = await register(feedbackItem);

        // Act
        const act = manager.execute('unknown');

        // Assert
        await expect(act).rejects.toThrowError(/is not registered/);
    });

    it('rejects a malformed item while the registry is constructed', () => {
        // Arrange
        const malformed: INavItem = { key: '', label: 'Nameless' };

        // Act
        const act = (): NavigationManager => configure([malformed]);

        // Assert
        expect(act).toThrowError(/"key" and "label" are required/);
    });

    it('rejects an item whose handle cannot be parsed', () => {
        // Arrange
        const malformed = { key: 'users', label: 'Users', handle: 'route:' } as INavItem;

        // Act
        const act = (): NavigationManager => configure([malformed]);

        // Assert
        expect(act).toThrowError(/missing value after the scheme/);
    });
});
