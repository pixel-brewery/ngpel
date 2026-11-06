import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, type Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { IRouteTitleOptions } from './IRouteTitleOptions';
import type { IRouteTitleTextResolver } from './IRouteTitleTextResolver';
import { provideRouteDataTitleStrategy } from './provideRouteDataTitleStrategy';
import { ROUTE_TITLE_TEXT_RESOLVER } from './ROUTE_TITLE_TEXT_RESOLVER';

@Component({
    selector: 'ngp-titled-host',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class TitledHostView {}

const routes: Routes = [
    {
        path: 'main',
        data: { title: 'app.main' },
        children: [
            { path: 'users', component: TitledHostView, data: { title: 'app.users', description: 'Every user.' } },
            { path: 'plain', component: TitledHostView },
        ],
    },
    { path: 'bare', component: TitledHostView },
    { path: 'resolved', component: TitledHostView, title: 'Resolved by Angular' },
];

async function navigate(url: string, options?: IRouteTitleOptions, resolver?: IRouteTitleTextResolver): Promise<void> {
    TestBed.configureTestingModule({
        providers: [
            provideRouter(routes),
            provideRouteDataTitleStrategy(options),
            ...(resolver === undefined ? [] : [{ provide: ROUTE_TITLE_TEXT_RESOLVER, useValue: resolver }]),
        ],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url, TitledHostView);
}

describe('RouteDataTitleStrategy', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        document.title = 'untouched';
        document.head.querySelector('meta[name="description"]')?.remove();
    });

    afterEach(() => {
        document.title = '';
    });

    it('composes the title deepest first and appends the application name', async () => {
        // Arrange
        const options: IRouteTitleOptions = { appName: 'Contoso' };

        // Act
        await navigate('/main/users', options);

        // Assert
        expect(document.title).toBe('app.users · app.main · Contoso');
    });

    it('resolves every segment through the text resolver', async () => {
        // Arrange
        const resolver: IRouteTitleTextResolver = { resolve: (text: string): string => text.replace('app.', '') };

        // Act
        await navigate('/main/users', { appName: 'Contoso', separator: ' | ' }, resolver);

        // Assert
        expect(document.title).toBe('users | main | Contoso');
    });

    it('writes the meta description of the deepest route that declares one', async () => {
        // Arrange
        const options: IRouteTitleOptions = { appName: 'Contoso' };

        // Act
        await navigate('/main/users', options);

        // Assert
        expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Every user.');
    });

    it('leaves the document untouched when neither the route data nor Angular yield a title', async () => {
        // Arrange
        const options = undefined;

        // Act
        await navigate('/bare', options);

        // Assert
        expect(document.title).toBe('untouched');
        expect(document.head.querySelector('meta[name="description"]')).toBeNull();
    });

    it('does not repeat the title a componentless parent passes down to its child', async () => {
        // Arrange
        const options = undefined;

        // Act
        await navigate('/main/plain', options);

        // Assert
        expect(document.title).toBe('app.main');
    });

    it('falls back to the title Angular resolves when no route data declares one', async () => {
        // Arrange
        const options = undefined;

        // Act
        await navigate('/resolved', options);

        // Assert
        expect(document.title).toBe('Resolved by Angular');
    });

    it('reads the configured route data keys instead of the defaults', async () => {
        // Arrange
        const options: IRouteTitleOptions = { titleDataKey: 'heading' };

        // Act
        await navigate('/main/users', options);

        // Assert
        expect(document.title).toBe('untouched');
    });
});
