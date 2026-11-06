import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, type UrlTree } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { fromNullable, positiveIntegerCodec } from '@pixel-brewery/ngpel-core/storage';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { IRouteParamNavigationContext } from './IRouteParamNavigationContext';
import { routeParamSignal } from './routeParamSignal';
import type { UrlParamSignal } from './UrlParamSignal';

function toUserUrlTree({ serializedValue, router }: IRouteParamNavigationContext<number>): UrlTree {
    return serializedValue === undefined ? router.createUrlTree(['/users']) : router.createUrlTree(['/users', serializedValue]);
}

@Component({
    selector: 'ngp-user-detail-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserDetailHostView {
    public readonly userId: UrlParamSignal<number> = routeParamSignal('userId', fromNullable(positiveIntegerCodec), {
        toUrlTree: toUserUrlTree,
    });

    public readonly replacingUserId: UrlParamSignal<number> = routeParamSignal('userId', fromNullable(positiveIntegerCodec), {
        toUrlTree: toUserUrlTree,
        replaceUrl: true,
    });
}

async function createHost(url: string): Promise<{ host: UserDetailHostView; router: Router }> {
    TestBed.configureTestingModule({
        providers: [
            provideRouter([
                { path: 'users', component: UserDetailHostView },
                { path: 'users/:userId', component: UserDetailHostView },
            ]),
        ],
    });

    const harness = await RouterTestingHarness.create();
    const host = await harness.navigateByUrl(url, UserDetailHostView);

    return { host, router: TestBed.inject(Router) };
}

describe('routeParamSignal', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('reads the route parameter and navigates to the destination the policy returns', async () => {
        // Arrange
        const { host, router } = await createHost('/users/4711');

        // Act
        await host.userId.set(815);

        // Assert
        expect(host.userId()).toBe(815);
        expect(router.url).toBe('/users/815');
    });

    it('reports an unparsable parameter as absent', async () => {
        // Arrange
        const { host } = await createHost('/users/not-an-id');

        // Act
        const value = host.userId();

        // Assert
        expect(value).toBeUndefined();
    });

    it('navigates to the cleared destination', async () => {
        // Arrange
        const { host, router } = await createHost('/users/4711');

        // Act
        await host.userId.clear();

        // Assert
        expect(router.url).toBe('/users');
    });

    it('derives the next value from the activated URL', async () => {
        // Arrange
        const { host } = await createHost('/users/7');

        // Act
        await host.userId.update((currentId): number => (currentId ?? 0) + 1);

        // Assert
        expect(host.userId()).toBe(8);
    });

    it('pushes a history entry while replaceUrl is not set', async () => {
        // Arrange
        const { host } = await createHost('/users/4711');
        const location = TestBed.inject(Location);
        const go = vi.spyOn(location, 'go');
        const replaceState = vi.spyOn(location, 'replaceState');

        // Act
        await host.userId.set(815);

        // Assert
        expect(go).toHaveBeenCalledTimes(1);
        expect(replaceState).not.toHaveBeenCalled();
    });

    it('replaces the current history entry while replaceUrl is set', async () => {
        // Arrange
        const { host } = await createHost('/users/4711');
        const location = TestBed.inject(Location);
        const go = vi.spyOn(location, 'go');
        const replaceState = vi.spyOn(location, 'replaceState');

        // Act
        await host.replacingUserId.set(815);

        // Assert
        expect(replaceState).toHaveBeenCalledTimes(1);
        expect(go).not.toHaveBeenCalled();
    });
});
