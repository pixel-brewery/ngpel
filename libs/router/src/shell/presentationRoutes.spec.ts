import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet, type Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { presentationRoutes } from './presentationRoutes';

@Component({
    selector: 'ngp-shell-host',
    template: '<router-outlet />',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet],
})
class ShellHostView {}

@Component({
    selector: 'ngp-explore-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ExploreHostView {}

const children: Routes = [{ path: 'explore', component: ExploreHostView }];

describe('presentationRoutes', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
    });

    it('mounts the shell at its default path with the children below it', () => {
        // Arrange
        const options = { shell: (): typeof ShellHostView => ShellHostView, redirectTo: 'explore' };

        // Act
        const routes = presentationRoutes(children, options);

        // Assert
        expect(routes).toHaveLength(1);
        expect(routes[0]?.path).toBe('main');
        expect(routes[0]?.children?.map((child): string | undefined => child.path)).toEqual(['', 'explore']);
        expect(routes[0]?.children?.[0]).toEqual({ path: '', pathMatch: 'full', redirectTo: 'explore' });
    });

    it('mounts the shell at a custom path without a default child', () => {
        // Arrange
        const options = { shell: (): typeof ShellHostView => ShellHostView, path: 'app' };

        // Act
        const routes = presentationRoutes(children, options);

        // Assert
        expect(routes[0]?.path).toBe('app');
        expect(routes[0]?.children?.map((child): string | undefined => child.path)).toEqual(['explore']);
    });

    it('attaches the given guards and data', () => {
        // Arrange
        const canActivate = [(): boolean => true];
        const canMatch = [(): boolean => true];

        // Act
        const routes = presentationRoutes(children, {
            shell: (): typeof ShellHostView => ShellHostView,
            guards: { canActivate, canMatch },
            data: { hasNav: true },
        });

        // Assert
        expect(routes[0]?.canActivate).toBe(canActivate);
        expect(routes[0]?.canMatch).toBe(canMatch);
        expect(routes[0]?.data).toEqual({ hasNav: true });
    });

    it('omits guards that were not given', () => {
        // Arrange
        const options = { shell: (): typeof ShellHostView => ShellHostView };

        // Act
        const routes = presentationRoutes(children, options);

        // Assert
        expect('canActivate' in (routes[0] ?? {})).toBe(false);
        expect('canMatch' in (routes[0] ?? {})).toBe(false);
        expect('data' in (routes[0] ?? {})).toBe(false);
    });

    it('redirects the shell path to the default child at runtime', async () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideRouter(presentationRoutes(children, { shell: (): typeof ShellHostView => ShellHostView, redirectTo: 'explore' }))],
        });

        // Act
        const harness = await RouterTestingHarness.create('/main');

        // Assert
        expect(harness.routeDebugElement).not.toBeNull();
        expect(TestBed.inject(Router).url).toBe('/main/explore');
    });

    it('keeps an unmatched path outside the shell', async () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideRouter(presentationRoutes(children, { shell: (): typeof ShellHostView => ShellHostView }))],
        });
        const router = TestBed.inject(Router);

        // Act
        const succeeded = await router.navigateByUrl('/unknown').catch((): boolean => false);

        // Assert
        expect(succeeded).toBe(false);
    });
});
