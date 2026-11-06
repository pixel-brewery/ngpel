import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, type Routes } from '@angular/router';
import { BROWSER_STORAGE } from '@pixel-brewery/ngpel-core/storage';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createSideNavigationController } from './createSideNavigationController';
import type { ISideNavigationController } from './ISideNavigationController';

/** In-memory `Storage`: a fresh object per call, and never the real `localStorage`. */
function createMemoryStorage(initialEntries: Readonly<Record<string, string>> = {}): Storage {
    const store = new Map<string, string>(Object.entries(initialEntries));

    return {
        get length(): number {
            return store.size;
        },
        clear(): void {
            store.clear();
        },
        getItem(key: string): string | null {
            return store.get(key) ?? null;
        },
        key(index: number): string | null {
            return [...store.keys()][index] ?? null;
        },
        removeItem(key: string): void {
            store.delete(key);
        },
        setItem(key: string, value: string): void {
            store.set(key, String(value));
        },
    };
}

/** The `change` event of {@link FakeMediaQueryList}; jsdom implements no `MediaQueryListEvent`. */
class FakeMediaQueryListEvent extends Event implements MediaQueryListEvent {
    public constructor(
        public readonly media: string,
        public readonly matches: boolean,
    ) {
        super('change');
    }
}

/** A controllable `MediaQueryList` whose match state the spec flips at will. */
class FakeMediaQueryList extends EventTarget implements MediaQueryList {
    public onchange: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null = null;

    private _matches: boolean;

    public constructor(
        public readonly media: string,
        matches = false,
    ) {
        super();
        this._matches = matches;
    }

    public get matches(): boolean {
        return this._matches;
    }

    public addListener(callback: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null): void {
        if (callback) {
            this.addEventListener('change', callback as EventListener);
        }
    }

    public removeListener(callback: ((this: MediaQueryList, event: MediaQueryListEvent) => unknown) | null): void {
        if (callback) {
            this.removeEventListener('change', callback as EventListener);
        }
    }

    public setMatches(matches: boolean): void {
        if (matches === this._matches) {
            return;
        }

        this._matches = matches;
        const event = new FakeMediaQueryListEvent(this.media, matches);
        this.onchange?.call(this, event);
        this.dispatchEvent(event);
    }
}

/** Handle returned by {@link installFakeMatchMedia}. */
interface IFakeMatchMediaInstallation {
    query(media: string): FakeMediaQueryList;
    setMatches(media: string, matches: boolean): void;
    restore(): void;
}

/** Replaces `matchMedia` with a fake handing out one controllable list per query, until `restore()`. */
function installFakeMatchMedia(initiallyMatching: ReadonlyArray<string> = [], scope: object = globalThis): IFakeMatchMediaInstallation {
    const lists = new Map<string, FakeMediaQueryList>();
    const previous = Object.getOwnPropertyDescriptor(scope, 'matchMedia');

    const query = (media: string): FakeMediaQueryList => {
        let list = lists.get(media);

        if (list === undefined) {
            list = new FakeMediaQueryList(media, initiallyMatching.includes(media));
            lists.set(media, list);
        }

        return list;
    };

    Object.defineProperty(scope, 'matchMedia', { configurable: true, writable: true, value: query });

    return {
        query,
        setMatches(media: string, matches: boolean): void {
            query(media).setMatches(matches);
        },
        restore(): void {
            if (previous) {
                Object.defineProperty(scope, 'matchMedia', previous);
            } else {
                Reflect.deleteProperty(scope, 'matchMedia');
            }
        },
    };
}

const MOBILE_QUERY = '(max-width: 959.98px)';
const DESKTOP_QUERY = '(min-width: 960px)';

@Component({
    selector: 'ngp-page-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class PageHostView {}

const routes: Routes = [
    { path: 'explore', component: PageHostView },
    { path: 'orders', component: PageHostView },
    { path: 'editor', component: PageHostView, data: { hasNav: false } },
];

let media: IFakeMatchMediaInstallation | undefined;
let storage: Storage = createMemoryStorage();

async function createController(
    url = '/explore',
    matching: ReadonlyArray<string> = [DESKTOP_QUERY],
): Promise<{ controller: ISideNavigationController; router: Router }> {
    media = installFakeMatchMedia(matching, document.defaultView ?? globalThis);
    TestBed.configureTestingModule({
        providers: [provideRouter(routes), { provide: BROWSER_STORAGE, useValue: storage }],
    });

    const router = TestBed.inject(Router);
    await router.navigateByUrl(url);

    return { controller: TestBed.runInInjectionContext(() => createSideNavigationController()), router };
}

describe('createSideNavigationController', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        storage = createMemoryStorage();
    });

    afterEach(() => {
        media?.restore();
        media = undefined;
    });

    it('opens the navigation by default on a wide viewport', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        const isOpen = controller.isNavigationOpen();

        // Assert
        expect(isOpen).toBe(true);
        expect(controller.isMobile()).toBe(false);
    });

    it('persists the navigation preference of a wide viewport', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        controller.toggleNavigation();

        // Assert
        expect(controller.isNavigationOpen()).toBe(false);
        expect(storage.getItem('presentation.isNavOpen')).toBe('false');
    });

    it('keeps the navigation state transient where it is an overlay', async () => {
        // Arrange
        const { controller } = await createController('/explore', [MOBILE_QUERY]);

        // Act
        controller.setNavigationOpen(true);

        // Assert
        expect(controller.isNavigationOpen()).toBe(true);
        expect(storage.getItem('presentation.isNavOpen')).toBeNull();
    });

    it('closes the navigation again when a mobile viewport navigates', async () => {
        // Arrange
        const { controller, router } = await createController('/explore', [MOBILE_QUERY]);
        controller.setNavigationOpen(true);

        // Act
        await router.navigateByUrl('/orders');

        // Assert
        expect(controller.isNavigationOpen()).toBe(false);
    });

    it('suppresses the navigation on a route that declares it away', async () => {
        // Arrange
        const { controller } = await createController('/editor');

        // Act
        const isOpen = controller.isNavigationOpen();

        // Assert
        expect(isOpen).toBe(false);
    });

    it('ignores the compact preference on a mobile viewport', async () => {
        // Arrange
        storage.setItem('presentation.navigationIsRail', 'true');
        const { controller } = await createController('/explore', [MOBILE_QUERY]);

        // Act
        const isCompact = controller.isNavigationCompact();

        // Assert
        expect(isCompact).toBe(false);
    });

    it('persists the compact navigation preference on a wide viewport', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        controller.toggleNavigationCompact();

        // Assert
        expect(controller.isNavigationCompact()).toBe(true);
        expect(storage.getItem('presentation.navigationIsRail')).toBe('true');
    });

    it('persists the desktop and the mobile rail independently', async () => {
        // Arrange
        storage.setItem('presentation.isMobileRailOpen', 'true');
        const { controller } = await createController();

        // Act
        controller.toggleRail();

        // Assert
        expect(controller.isRailOpen()).toBe(true);
        expect(storage.getItem('presentation.isRailOpen')).toBe('true');
        expect(storage.getItem('presentation.isMobileRailOpen')).toBe('true');
    });

    it('closes the rail of the current viewport', async () => {
        // Arrange
        storage.setItem('presentation.isRailOpen', 'true');
        const { controller } = await createController();

        // Act
        controller.closeRail();

        // Assert
        expect(controller.isRailOpen()).toBe(false);
        expect(storage.getItem('presentation.isRailOpen')).toBe('false');
    });

    it('persists a split position inside the configured bounds', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        controller.setRailSplitPosition(65);

        // Assert
        expect(controller.railSplitPosition()).toBe(65);
        expect(controller.isRailOpen()).toBe(true);
    });

    it('treats a fully collapsed split as a closed rail without persisting the position', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        controller.setRailSplitPosition(100);

        // Assert
        expect(controller.isRailOpen()).toBe(false);
        expect(controller.railSplitPosition()).toBe(60);
    });

    it('ignores a split position on a mobile viewport, where the rail is a sheet', async () => {
        // Arrange
        const { controller } = await createController('/explore', [MOBILE_QUERY]);

        // Act
        controller.setRailSplitPosition(65);

        // Assert
        expect(storage.getItem('presentation.railSplitPosition')).toBeNull();
        expect(storage.getItem('presentation.isRailOpen')).toBeNull();
    });

    it('follows the viewport when the media query changes', async () => {
        // Arrange
        const { controller } = await createController();

        // Act
        media?.setMatches(MOBILE_QUERY, true);

        // Assert
        expect(controller.isMobile()).toBe(true);
    });

    it('refuses to be created outside an injection context', () => {
        // Arrange
        media = installFakeMatchMedia([DESKTOP_QUERY], document.defaultView ?? globalThis);

        // Act
        const act = (): ISideNavigationController => createSideNavigationController();

        // Assert
        expect(act).toThrowError();
    });
});
