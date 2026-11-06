import { describe, expect, it } from 'vitest';
import { RoutePath } from './RoutePath';

describe('RoutePath', () => {
    it('builds a nested, parameterized path and formats it', () => {
        // Arrange
        const path = RoutePath.create('main').withChild('users').withParam(':userId');

        // Act
        const formatted = path.format('userId', 'a b/c');

        // Assert
        expect(path.path).toBe('main/users/:userId');
        expect(path.toRoute()).toBe('/main/users/:userId');
        expect(path.toString()).toBe('main/users/:userId');
        expect(formatted).toBe('main/users/a%20b%2Fc');
    });

    it('ignores a repeated parameter declaration', () => {
        // Arrange
        const path = RoutePath.create('users').withParam(':userId');

        // Act
        const repeated = path.withParam(':userId');

        // Assert
        expect(repeated.path).toBe('users/:userId');
    });

    it.each(['/main', './main', 'main?tab=1', 'main#anchor'])('rejects the malformed path %j', (candidate) => {
        // Arrange
        const path = candidate;

        // Act
        const act = (): RoutePath => RoutePath.create(path);

        // Assert
        expect(act).toThrowError(/route path/);
    });

    it('compares a URL against the template, ignoring a leading slash, query and fragment', () => {
        // Arrange
        const path = RoutePath.create('main/users');

        // Act
        const results = [path.equals('/main/users?page=2'), path.equals('main/users#top'), path.equals('main/orders')];

        // Assert
        expect(results).toEqual([true, true, false]);
    });
});
