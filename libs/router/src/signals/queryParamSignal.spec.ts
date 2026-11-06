import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { fromNullable, positiveIntegerCodec } from '@pixel-brewery/ngpel-core/storage';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { queryParamSignal } from './queryParamSignal';
import type { UrlParamSignal } from './UrlParamSignal';

@Component({
    selector: 'ngp-order-list-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class OrderListHostView {
    public readonly page: UrlParamSignal<number> = queryParamSignal('page', fromNullable(positiveIntegerCodec));

    public readonly fragmentDroppingPage: UrlParamSignal<number> = queryParamSignal('page', fromNullable(positiveIntegerCodec), { preserveFragment: false });

    public readonly historyReplacingPage: UrlParamSignal<number> = queryParamSignal('page', fromNullable(positiveIntegerCodec), { replaceUrl: true });
}

async function createHost(url: string): Promise<{ host: OrderListHostView; router: Router }> {
    TestBed.configureTestingModule({
        providers: [provideRouter([{ path: 'orders', component: OrderListHostView }])],
    });

    const harness = await RouterTestingHarness.create();
    const host = await harness.navigateByUrl(url, OrderListHostView);

    return { host, router: TestBed.inject(Router) };
}

describe('queryParamSignal', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('reads the parameter and writes it back through a navigation, preserving unrelated parameters', async () => {
        // Arrange
        const { host, router } = await createHost('/orders?page=2&sort=name');

        // Act
        await host.page.set(3);

        // Assert
        expect(host.page()).toBe(3);
        expect(router.url).toContain('page=3');
        expect(router.url).toContain('sort=name');
    });

    it('reports an unparsable parameter as absent and removes it on clear', async () => {
        // Arrange
        const { host, router } = await createHost('/orders?page=zero');

        // Act
        await host.page.clear();

        // Assert
        expect(host.page()).toBeUndefined();
        expect(router.url).toBe('/orders');
    });

    it('derives the next value from the activated URL', async () => {
        // Arrange
        const { host } = await createHost('/orders?page=4');

        // Act
        await host.page.update((currentPage): number => (currentPage ?? 1) + 1);

        // Assert
        expect(host.page()).toBe(5);
    });

    it('keeps the URL fragment by default', async () => {
        // Arrange
        const { host, router } = await createHost('/orders?page=2#summary');

        // Act
        await host.page.set(3);

        // Assert
        expect(router.url).toBe('/orders?page=3#summary');
    });

    it.each([
        {
            activatedUrl: '/orders?page=2',
            browserUrl: '/orders?page=2&overlay=order.detail&overlayId=42&team=1&team=2#summary',
            expectedUrl: '/orders?page=3&overlay=order.detail&overlayId=42&team=1&team=2#summary',
        },
        {
            activatedUrl: '/orders?page=2&overlay=order.detail&overlayId=42',
            browserUrl: '/orders?page=2&team=1&team=2#summary',
            expectedUrl: '/orders?page=3&team=1&team=2#summary',
        },
    ])('writes against the browser URL when the activated route has stale overlay state', async ({ activatedUrl, browserUrl, expectedUrl }) => {
        // Arrange
        const { host, router } = await createHost(activatedUrl);
        TestBed.inject(Location).go(browserUrl);

        // Act
        await host.page.set(3);

        // Assert
        expect(router.url).toBe(expectedUrl);
    });

    it('replaces the current browser entry when requested', async () => {
        // Arrange
        const { host } = await createHost('/orders?page=2');
        const location = TestBed.inject(Location);
        const replaceState = vi.spyOn(location, 'replaceState');
        const go = vi.spyOn(location, 'go');

        // Act
        await host.historyReplacingPage.set(3);

        // Assert
        expect(location.path()).toBe('/orders?page=3');
        expect(replaceState).toHaveBeenCalledOnce();
        expect(go).not.toHaveBeenCalled();
    });

    it('drops the URL fragment while preserveFragment is disabled', async () => {
        // Arrange
        const { host, router } = await createHost('/orders?page=2#summary');

        // Act
        await host.fragmentDroppingPage.set(3);

        // Assert
        expect(router.url).toBe('/orders?page=3');
    });

    it('refuses to serialize a value the codec rejects', async () => {
        // Arrange
        const { host } = await createHost('/orders?page=1');

        // Act
        const act = (): Promise<boolean> => host.page.set(0);

        // Assert
        expect(act).toThrowError(TypeError);
    });
});
