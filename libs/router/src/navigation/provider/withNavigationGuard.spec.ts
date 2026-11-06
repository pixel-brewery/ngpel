import { inject, Injectable, InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { INavigationGuard } from '../INavigationGuard';
import type { INavItem } from '../INavItem';
import { NAVIGATION_GUARD_TOKEN } from '../NAVIGATION_GUARD_TOKEN';
import { NavigationManager } from '../NavigationManager';
import { NavigationFeatureKinds } from './NavigationFeatureKind';
import { provideNavigation } from './provideNavigation';
import { withNavigationGuard } from './withNavigationGuard';
import { withNavigationItems } from './withNavigationItems';

const HELD_CAPABILITIES = new InjectionToken<ReadonlyArray<string>>('HELD_CAPABILITIES');

@Injectable()
class CapabilityNavigationGuard implements INavigationGuard {
    private readonly _held: ReadonlyArray<string> = inject(HELD_CAPABILITIES);

    public canRegister(nav: INavItem): INavItem | null {
        const required = nav.capabilities ?? [];

        return required.length === 0 || required.some((capability): boolean => this._held.includes(capability)) ? nav : null;
    }
}

describe('withNavigationGuard', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('contributes a multi feature of the guard kind', () => {
        // Arrange
        const options = { id: 'capabilities', guard: CapabilityNavigationGuard };

        // Act
        const feature = withNavigationGuard(options);

        // Assert
        expect(feature.id).toBe('capabilities');
        expect(feature.kind).toBe(NavigationFeatureKinds.Guard);
        expect(feature.options.multi).toBe(true);
        expect(feature.provide()).toEqual([{ provide: NAVIGATION_GUARD_TOKEN, useClass: CapabilityNavigationGuard, multi: true }]);
    });

    it('lets the guard decide through dependency injection which items survive', async () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                provideRouter([]),
                { provide: HELD_CAPABILITIES, useValue: ['orders.read'] },
                provideNavigation(
                    withNavigationGuard({ id: 'capabilities', guard: CapabilityNavigationGuard }),
                    withNavigationItems({
                        id: 'shop-navigation',
                        items: [
                            { key: 'orders', label: 'Orders', capabilities: ['orders.read'] },
                            { key: 'admin', label: 'Administration', capabilities: ['system.write'] },
                        ],
                    }),
                ),
            ],
        });

        // Act
        const manager = TestBed.inject(NavigationManager);

        // Assert
        await vi.waitFor((): void => expect(manager.isReady()).toBe(true));
        expect(manager.all().map((item): string => item.key)).toEqual(['orders']);
    });
});
