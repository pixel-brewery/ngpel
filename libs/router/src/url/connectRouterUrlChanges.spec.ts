import { NavigationEnd, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { connectRouterUrlChanges } from './connectRouterUrlChanges';

function createNavigationEnd(url: string): NavigationEnd {
    return new NavigationEnd(1, url, url);
}

function createLocation(url: string): { path: () => string } {
    return { path: (): string => url };
}

describe('connectRouterUrlChanges', () => {
    it('reports the initial URL while connecting', () => {
        // Arrange
        const events = new Subject<NavigationEnd>();
        const seen: string[] = [];

        // Act
        connectRouterUrlChanges(createLocation('/main/orders'), { events }, (url): void => {
            seen.push(url);
        });

        // Assert
        expect(seen).toEqual(['/main/orders']);
    });

    it('reports every completed navigation', () => {
        // Arrange
        const events = new Subject<NavigationEnd>();
        const seen: string[] = [];
        connectRouterUrlChanges(createLocation('/main/orders'), { events }, (url): void => {
            seen.push(url);
        });

        // Act
        events.next(createNavigationEnd('/main/users'));

        // Assert
        expect(seen).toEqual(['/main/orders', '/main/users']);
    });

    it('ignores an event that is not a completed navigation', () => {
        // Arrange
        const events = new Subject<NavigationEnd | NavigationStart>();
        const seen: string[] = [];
        connectRouterUrlChanges(createLocation('/'), { events }, (url): void => {
            seen.push(url);
        });

        // Act
        events.next(new NavigationStart(2, '/main/users'));

        // Assert
        expect(seen).toEqual(['/']);
    });

    it('reports nothing more after disconnecting', () => {
        // Arrange
        const events = new Subject<NavigationEnd>();
        const seen: string[] = [];
        const disconnect = connectRouterUrlChanges(createLocation('/'), { events }, (url): void => {
            seen.push(url);
        });
        disconnect();

        // Act
        events.next(createNavigationEnd('/main/users'));

        // Assert
        expect(seen).toEqual(['/']);
    });
});
