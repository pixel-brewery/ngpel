import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import type { INavItem } from '../INavItem';
import { NAVIGATION_ITEM_TOKEN } from '../NAVIGATION_ITEM_TOKEN';
import { NavigationFeatureKinds } from './NavigationFeatureKind';
import { provideNavigation } from './provideNavigation';
import { withNavigationItems } from './withNavigationItems';

function registeredItems(...features: ReadonlyArray<ReturnType<typeof withNavigationItems>>): ReadonlyArray<INavItem> {
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideNavigation(...features)] });

    return TestBed.inject(NAVIGATION_ITEM_TOKEN).flat();
}

describe('withNavigationItems', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('contributes a multi feature of the item kind', () => {
        // Arrange
        const items: ReadonlyArray<INavItem> = [
            { key: 'home', label: 'Home' },
            { key: 'orders', label: 'Orders' },
        ];

        // Act
        const feature = withNavigationItems({ id: 'shop-navigation', items });

        // Assert
        expect(feature.id).toBe('shop-navigation');
        expect(feature.kind).toBe(NavigationFeatureKinds.Item);
        expect(feature.options.multi).toBe(true);
        expect(feature.provide()).toEqual([{ provide: NAVIGATION_ITEM_TOKEN, useValue: items, multi: true }]);
    });

    it('accepts a single item as well as a list', () => {
        // Arrange
        const feature = withNavigationItems({ id: 'home-navigation', items: { key: 'home', label: 'Home' } });

        // Act
        const items = registeredItems(feature);

        // Assert
        expect(items.map((item): string => item.key)).toEqual(['home']);
    });

    it('applies the contribution order to every item that declares none', () => {
        // Arrange
        const feature = withNavigationItems({
            id: 'shop-navigation',
            order: 40,
            items: [
                { key: 'home', label: 'Home' },
                { key: 'orders', label: 'Orders', order: 5 },
            ],
        });

        // Act
        const items = registeredItems(feature);

        // Assert
        expect(items.map((item): number | undefined => item.order)).toEqual([40, 5]);
    });

    it('leaves the items untouched without a contribution order', () => {
        // Arrange
        const item: INavItem = { key: 'home', label: 'Home' };
        const feature = withNavigationItems({ id: 'home-navigation', items: item });

        // Act
        const items = registeredItems(feature);

        // Assert
        expect(items[0]).toBe(item);
        expect(items[0]?.order).toBeUndefined();
    });
});
