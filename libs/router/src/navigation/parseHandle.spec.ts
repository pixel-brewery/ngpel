import { describe, expect, it } from 'vitest';
import type { IParsedHandle } from './IParsedHandle';
import type { NavHandle } from './NavHandle';
import { parseHandle } from './parseHandle';

describe('parseHandle', () => {
    it('keeps colons inside the value, so an external URL survives', () => {
        // Arrange
        const handle: NavHandle = 'ext:https://example.test/docs?tab=api';

        // Act
        const parsed = parseHandle(handle);

        // Assert
        expect(parsed).toEqual({
            scheme: 'ext',
            path: 'https://example.test/docs',
            query: { tab: 'api' },
            raw: handle,
        });
    });

    it('decodes boolean, null and numeric query literals', () => {
        // Arrange
        const handle: NavHandle = 'cmd:dialog.open?modal=true&owner=null&count=3&name=alice';

        // Act
        const parsed = parseHandle(handle);

        // Assert
        expect(parsed.query).toEqual({ modal: true, owner: null, count: 3, name: 'alice' });
    });

    it('collects a repeated query parameter into an array', () => {
        // Arrange
        const handle: NavHandle = 'route:/main/orders?state=open&state=paid&state=void';

        // Act
        const parsed = parseHandle(handle);

        // Assert
        expect(parsed.query).toEqual({ state: ['open', 'paid', 'void'] });
    });

    it('keeps a second question mark inside the query part', () => {
        // Arrange
        const handle: NavHandle = 'ext:https://example.test/search?q=what?&lang=en';

        // Act
        const parsed = parseHandle(handle);

        // Assert
        expect(parsed.path).toBe('https://example.test/search');
        expect(parsed.query).toEqual({ q: 'what?', lang: 'en' });
    });

    it('parses a handle without a query part', () => {
        // Arrange
        const handle: NavHandle = 'route:/main/users';

        // Act
        const parsed = parseHandle(handle);

        // Assert
        expect(parsed.path).toBe('/main/users');
        expect(parsed.query).toEqual({});
    });

    it.each(['route:', 'ext:'])('rejects the handle %j that carries no value', (candidate) => {
        // Arrange
        const handle = candidate as NavHandle;

        // Act
        const act = (): IParsedHandle => parseHandle(handle);

        // Assert
        expect(act).toThrowError(/missing value after the scheme/);
    });

    it('rejects an unknown scheme', () => {
        // Arrange
        const handle = 'mailto:someone@example.test' as NavHandle;

        // Act
        const act = (): IParsedHandle => parseHandle(handle);

        // Assert
        expect(act).toThrowError(/unknown scheme "mailto"/);
    });
});
