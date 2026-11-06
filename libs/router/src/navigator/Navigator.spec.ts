import { ChangeDetectionStrategy, Component, createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, type Route, Router, type Routes } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { Navigator } from './Navigator';
import { provideNavigator } from './provideNavigator';

@Component({
    selector: 'ngp-first-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class FirstHostView {}

@Component({
    selector: 'ngp-second-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class SecondHostView {}

const routes: Routes = [
    { path: 'first', component: FirstHostView },
    { path: 'second', component: SecondHostView },
];

function createNavigator(): { navigator: Navigator; router: Router } {
    TestBed.configureTestingModule({ providers: [provideRouter(routes), provideNavigator()] });

    return { navigator: TestBed.inject(Navigator), router: TestBed.inject(Router) };
}

function createNavigatorInChildInjector(): { navigator: Navigator; router: Router; injector: EnvironmentInjector } {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });

    const injector = createEnvironmentInjector([provideNavigator()], TestBed.inject(EnvironmentInjector));

    return { navigator: injector.get(Navigator), router: TestBed.inject(Router), injector };
}

function recordCompletedNavigations(navigator: Navigator): { urls: ReadonlyArray<string>; stop: () => void } {
    const urls: string[] = [];
    const subscription = navigator.events.subscribe((event): void => {
        if (event instanceof NavigationEnd) {
            urls.push(event.urlAfterRedirects);
        }
    });

    return { urls, stop: (): void => subscription.unsubscribe() };
}

describe('Navigator', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('tracks the current and the previous URL across navigations', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first');

        // Act
        await navigator.navigateByUrl('/second');

        // Assert
        expect(navigator.current).toBe('/second');
        expect(navigator.previous).toBe('/first');
        expect(navigator.currentTree.toString()).toBe('/second');
        expect(navigator.previousTree.toString()).toBe('/first');
    });

    it('steps back through the journal and keeps the forward entry reachable', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first');
        await navigator.navigateByUrl('/second');

        // Act
        navigator.back();

        // Assert
        await expect.poll((): string => navigator.current).toBe('/first');
        expect(navigator.journal.canGoForward).toBe(true);
    });

    it('steps forward again after a step back', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first');
        await navigator.navigateByUrl('/second');
        navigator.back();
        await expect.poll((): string => navigator.current).toBe('/first');

        // Act
        navigator.forward();

        // Assert
        await expect.poll((): string => navigator.current).toBe('/second');
    });

    it('navigates to the route that renders a view component', async () => {
        // Arrange
        const { navigator } = createNavigator();

        // Act
        const succeeded = await navigator.navigateByView(SecondHostView);

        // Assert
        expect(succeeded).toBe(true);
        expect(navigator.current).toBe('/second');
    });

    it('reports failure for a component no route renders', async () => {
        // Arrange
        const { navigator } = createNavigator();

        // Act
        const succeeded = await navigator.navigateByView(class UnknownView {});

        // Assert
        expect(succeeded).toBe(false);
    });

    it('navigates to a route definition', async () => {
        // Arrange
        const { navigator } = createNavigator();

        // Act
        const succeeded = await navigator.navigateByRoute({ path: 'second' });

        // Assert
        expect(succeeded).toBe(true);
        expect(navigator.current).toBe('/second');
    });

    it('reports failure for a route definition without a path', async () => {
        // Arrange
        const { navigator } = createNavigator();
        const route: Route = { component: FirstHostView };

        // Act
        const succeeded = await navigator.navigateByRoute(route);

        // Assert
        expect(succeeded).toBe(false);
        expect(navigator.journal.entries).toEqual([]);
    });

    it('reports failure when there is no route definition at all', async () => {
        // Arrange
        const { navigator } = createNavigator();

        // Act
        const succeeded = await navigator.navigateByRoute(undefined);

        // Assert
        expect(succeeded).toBe(false);
        expect(navigator.journal.entries).toEqual([]);
    });

    it('forwards the router events', async () => {
        // Arrange
        const { navigator } = createNavigator();
        const recorder = recordCompletedNavigations(navigator);

        // Act
        await navigator.navigateByUrl('/first');

        // Assert
        expect(recorder.urls).toEqual(['/first']);
    });

    it('forwards no router event to an observer that unsubscribed', async () => {
        // Arrange
        const { navigator } = createNavigator();
        const recorder = recordCompletedNavigations(navigator);
        recorder.stop();

        // Act
        await navigator.navigateByUrl('/first');

        // Assert
        expect(recorder.urls).toEqual([]);
    });

    it('emits a location change for a browser history event', () => {
        // Arrange
        const { navigator } = createNavigator();
        const changes: string[] = [];
        navigator.locationChanged.subscribe((): void => {
            changes.push(navigator.current);
        });

        // Act
        window.dispatchEvent(new PopStateEvent('popstate', { state: null }));

        // Assert
        expect(changes).toHaveLength(1);
    });

    it('emits no location change for a programmatic navigation', async () => {
        // Arrange
        const { navigator } = createNavigator();
        const changes: string[] = [];
        navigator.locationChanged.subscribe((): void => {
            changes.push(navigator.current);
        });

        // Act
        await navigator.navigateByUrl('/first');

        // Assert
        expect(changes).toEqual([]);
    });

    it('merges query parameters into the current URL', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first?page=1');

        // Act
        await navigator.update({ sort: 'name' });

        // Assert
        expect(navigator.current).toContain('page=1');
        expect(navigator.current).toContain('sort=name');
    });

    it('answers whether a URL is active', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first?page=1');

        // Act
        const results = [navigator.isActive('/first'), navigator.isActive('/second')];

        // Assert
        expect(results).toEqual([true, false]);
    });

    it('stops recording after it is disposed', async () => {
        // Arrange
        const { navigator } = createNavigator();
        await navigator.navigateByUrl('/first');
        navigator.dispose();

        // Act
        await navigator.navigateByUrl('/second');

        // Assert
        expect(navigator.previous).toBe('/');
        expect(navigator.journal.entries.map((entry): string => entry.urlTree.toString())).toEqual(['/first']);
    });

    it('stops recording once the injector that provides it is destroyed', async () => {
        // Arrange
        const { navigator, router, injector } = createNavigatorInChildInjector();
        await router.navigateByUrl('/first');
        injector.destroy();

        // Act
        await router.navigateByUrl('/second');

        // Assert
        expect(navigator.previous).toBe('/');
        expect(navigator.journal.entries.map((entry): string => entry.urlTree.toString())).toEqual(['/first']);
    });
});
