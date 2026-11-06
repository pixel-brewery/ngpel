import { TestBed } from '@angular/core/testing';
import { type EnvironmentProviders, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { INavigationGuard } from '../INavigationGuard';
import type { INavItem } from '../INavItem';
import { NAVIGATION_ITEM_TOKEN } from '../NAVIGATION_ITEM_TOKEN';
import { NavigationHandleDispatcher } from '../NavigationHandleDispatcher';
import { NavigationManager } from '../NavigationManager';
import { provideNavigation } from './provideNavigation';
import { withNavigationGuard } from './withNavigationGuard';
import { withNavigationItems } from './withNavigationItems';

@Injectable()
class BlockingNavigationGuard implements INavigationGuard {
    public canRegister(): INavItem | null {
        return null;
    }
}

describe('provideNavigation', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers the manager, the dispatcher and every contributed item', async () => {
        // Arrange
        const feature = withNavigationItems({ id: 'home-navigation', items: { key: 'home', label: 'Home', handle: 'route:/' } });
        TestBed.configureTestingModule({ providers: [provideRouter([]), provideNavigation(feature)] });

        // Act
        const manager = TestBed.inject(NavigationManager);

        // Assert
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        expect(TestBed.inject(NavigationHandleDispatcher)).toBeInstanceOf(NavigationHandleDispatcher);
        expect(
            TestBed.inject(NAVIGATION_ITEM_TOKEN)
                .flat()
                .map((item): string => item.key),
        ).toEqual(['home']);
        expect(manager.all().map((item): string => item.key)).toEqual(['home']);
    });

    it('composes items and guards together', async () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                provideRouter([]),
                provideNavigation(
                    withNavigationItems({ id: 'home-navigation', items: { key: 'home', label: 'Home' } }),
                    withNavigationGuard({ id: 'blocking', guard: BlockingNavigationGuard }),
                ),
            ],
        });

        // Act
        const manager = TestBed.inject(NavigationManager);

        // Assert
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        expect(manager.all()).toEqual([]);
    });

    it('registers an empty navigation without features', async () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideRouter([]), provideNavigation()] });

        // Act
        const manager = TestBed.inject(NavigationManager);

        // Assert
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        expect(manager.all()).toEqual([]);
    });

    it('rejects two contributions of the same kind sharing an id', () => {
        // Arrange
        const items: INavItem = { key: 'home', label: 'Home' };

        // Act
        const act = (): EnvironmentProviders =>
            provideNavigation(withNavigationItems({ id: 'home-navigation', items }), withNavigationItems({ id: 'home-navigation', items }));

        // Assert
        expect(act).toThrowError(/duplicate id 'home-navigation'/);
    });
});
