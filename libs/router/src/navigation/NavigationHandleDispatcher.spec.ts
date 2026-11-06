import { ChangeDetectionStrategy, Component, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { INavHandleHandler } from './INavHandleHandler';
import type { INavItem } from './INavItem';
import { NAV_HANDLE_HANDLER } from './NAV_HANDLE_HANDLER';
import { NAVIGATION_WINDOW } from './NAVIGATION_WINDOW';
import { NavigationHandleDispatcher } from './NavigationHandleDispatcher';
import { provideNavigation } from './provider/provideNavigation';

@Component({
    selector: 'ngp-dispatch-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class DispatchHostView {}

function createDispatcher(providers: ReadonlyArray<Provider> = []): NavigationHandleDispatcher {
    TestBed.configureTestingModule({
        providers: [
            provideRouter([
                { path: 'main/users', component: DispatchHostView },
                { path: '**', component: DispatchHostView },
            ]),
            provideNavigation(),
            ...providers,
        ],
    });

    return TestBed.inject(NavigationHandleDispatcher);
}

describe('NavigationHandleDispatcher', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('navigates the router for a route handle, including its query parameters', async () => {
        // Arrange
        const dispatcher = createDispatcher();

        // Act
        await dispatcher.executeHandle('route:/main/users?page=2');

        // Assert
        expect(TestBed.inject(Router).url).toBe('/main/users?page=2');
    });

    it('opens an external handle on the window of the injected document by default', async () => {
        // Arrange
        const dispatcher = createDispatcher();
        const open = vi.spyOn(window, 'open').mockReturnValue(null);

        // Act
        await dispatcher.executeHandle('ext:https://example.test/docs');

        // Assert
        expect(open).toHaveBeenCalledWith('https://example.test/docs', '_blank', 'noopener,noreferrer');
    });

    it('opens an external handle in an isolated browsing context', async () => {
        // Arrange
        const open = vi.fn();
        const dispatcher = createDispatcher([{ provide: NAVIGATION_WINDOW, useValue: { open } }]);

        // Act
        await dispatcher.executeHandle('ext:https://example.test/docs?tab=api');

        // Assert
        expect(open).toHaveBeenCalledWith('https://example.test/docs?tab=api', '_blank', 'noopener,noreferrer');
    });

    it('assumes https for an external handle without a scheme', async () => {
        // Arrange
        const open = vi.fn();
        const dispatcher = createDispatcher([{ provide: NAVIGATION_WINDOW, useValue: { open } }]);

        // Act
        await dispatcher.executeHandle('ext:example.test/docs');

        // Assert
        expect(open).toHaveBeenCalledWith('https://example.test/docs', '_blank', 'noopener,noreferrer');
    });

    it('repeats a multi-valued query parameter on the external URL', async () => {
        // Arrange
        const open = vi.fn();
        const dispatcher = createDispatcher([{ provide: NAVIGATION_WINDOW, useValue: { open } }]);

        // Act
        await dispatcher.executeHandle('ext:https://example.test/search?tag=a&tag=b');

        // Assert
        expect(open).toHaveBeenCalledWith('https://example.test/search?tag=a&tag=b', '_blank', 'noopener,noreferrer');
    });

    it('stays silent where there is no window', async () => {
        // Arrange
        const dispatcher = createDispatcher([{ provide: NAVIGATION_WINDOW, useValue: null }]);

        // Act
        const act = async (): Promise<void> => dispatcher.executeHandle('ext:https://example.test');

        // Assert
        await expect(act()).resolves.toBeUndefined();
    });

    it('rejects a command handle while no handler is registered', async () => {
        // Arrange
        const dispatcher = createDispatcher();

        // Act
        const act = async (): Promise<void> => dispatcher.executeHandle('cmd:dialog.open.settings');

        // Assert
        await expect(act()).rejects.toThrowError(/No handler is registered .* "cmd"/);
    });

    it('delegates a command handle to a registered handler', async () => {
        // Arrange
        const execute = vi.fn();
        const handler: INavHandleHandler = { scheme: 'cmd', execute };
        const dispatcher = createDispatcher([{ provide: NAV_HANDLE_HANDLER, useValue: handler, multi: true }]);

        // Act
        await dispatcher.executeHandle('cmd:dialog.open.settings?modal=true');

        // Assert
        expect(execute).toHaveBeenCalledWith(expect.objectContaining({ scheme: 'cmd', path: 'dialog.open.settings', query: { modal: true } }));
    });

    it('lets a registered handler replace the built-in route behavior', async () => {
        // Arrange
        const execute = vi.fn();
        const handler: INavHandleHandler = { scheme: 'route', execute };
        const dispatcher = createDispatcher([{ provide: NAV_HANDLE_HANDLER, useValue: handler, multi: true }]);

        // Act
        await dispatcher.executeHandle('route:/main/users');

        // Assert
        expect(execute).toHaveBeenCalledTimes(1);
        expect(TestBed.inject(Router).url).toBe('/');
    });

    it('does nothing for an item without a handle', async () => {
        // Arrange
        const open = vi.fn();
        const dispatcher = createDispatcher([{ provide: NAVIGATION_WINDOW, useValue: { open } }]);
        const item: INavItem = { key: 'group', label: 'Group' };

        // Act
        await dispatcher.execute(item);

        // Assert
        expect(open).not.toHaveBeenCalled();
        expect(TestBed.inject(Router).url).toBe('/');
    });
});
