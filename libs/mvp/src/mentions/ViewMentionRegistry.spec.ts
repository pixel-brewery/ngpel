// #region Imports

import { Location } from '@angular/common';
import { Injector, runInInjectionContext } from '@angular/core';
import { describe, expect, it } from 'vitest';
import type { IViewMentionOption } from './IViewMentionOption';
import { ViewMentionRegistry } from './ViewMentionRegistry';

// #endregion

function createRegistry(path: () => string): ViewMentionRegistry {
    const injector = Injector.create({ providers: [{ provide: Location, useValue: { path } }] });

    return runInInjectionContext(injector, () => new ViewMentionRegistry());
}

function createOption(resourceId: string, label: string = resourceId): IViewMentionOption {
    return { resourceType: 'order', resourceId, label, icon: 'cart', descriptionKey: 'orders.title' };
}

describe('ViewMentionRegistry', () => {
    it('filters the current route resources without matching query parameters', () => {
        // Arrange
        const registry = createRegistry(() => '/orders?page=3');
        const option = createOption('42', 'Order Forty Two');
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => [option] });

        // Act
        const actual = registry.items('  FORTY  ');

        // Assert
        expect(actual).toEqual([option]);
        expect(registry.activeViewKey).toBe('orders.list');
    });

    it('reads the current resource projection rather than retaining an earlier page', () => {
        // Arrange
        const registry = createRegistry(() => '/orders');
        let page = [createOption('1', 'First order')];
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => page });
        registry.items('first');
        page = [createOption('2', 'Second order')];

        // Act
        const actual = registry.items('second');

        // Assert
        expect(actual).toEqual(page);
    });

    it('does not offer a source on an unrelated route', () => {
        // Arrange
        const registry = createRegistry(() => '/customers');
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => [createOption('1')] });

        // Act
        const actual = registry.items('');

        // Assert
        expect(actual).toEqual([]);
        expect(registry.activeViewKey).toBeNull();
    });

    it('requires a route segment boundary after the registered prefix', () => {
        // Arrange
        const registry = createRegistry(() => '/orders-archive');
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => [createOption('1')] });

        // Act
        const actual = registry.items('');

        // Assert
        expect(actual).toEqual([]);
    });

    it('prioritizes the most recently registered source on a nested route', () => {
        // Arrange
        const registry = createRegistry(() => '/orders/42');
        const nested = createOption('42', 'Current order');
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => [createOption('1')] });
        registry.register({ viewKey: 'orders.detail', routePrefix: '/orders', items: () => [nested] });

        // Act
        const actual = registry.items('');

        // Assert
        expect(actual).toEqual([nested]);
        expect(registry.activeViewKey).toBe('orders.detail');
    });

    it('restores the earlier source when the newer registration is released', () => {
        // Arrange
        const registry = createRegistry(() => '/orders/42');
        const listOption = createOption('1');
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => [listOption] });
        const close = registry.register({ viewKey: 'orders.detail', routePrefix: '/orders', items: () => [createOption('42')] });

        // Act
        close();

        // Assert
        expect(registry.items('')).toEqual([listOption]);
        expect(registry.activeViewKey).toBe('orders.list');
    });

    it('limits matching suggestions to fifty loaded resources', () => {
        // Arrange
        const registry = createRegistry(() => '/orders');
        const page = Array.from({ length: 60 }, (_, index) => createOption(String(index)));
        registry.register({ viewKey: 'orders.list', routePrefix: '/orders', items: () => page });

        // Act
        const actual = registry.items('');

        // Assert
        expect(actual).toEqual(page.slice(0, 50));
    });
});
