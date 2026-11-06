import { describe, expect, it } from 'vitest';
import { cleanExternalUrl } from './cleanExternalUrl';

describe('cleanExternalUrl', () => {
    it('normalizes an https target', () => {
        // Arrange
        const href = 'https://example.com';

        // Act
        const actual = cleanExternalUrl(href);

        // Assert
        expect(actual).toBe('https://example.com/');
    });

    it('decodes entity-encoded ampersands before parsing the query', () => {
        // Arrange
        const href = 'http://example.com/a?b=1&amp;c=2';

        // Act
        const actual = cleanExternalUrl(href);

        // Assert
        expect(actual).toBe('http://example.com/a?b=1&c=2');
    });

    it('rejects a javascript target', () => {
        // Arrange
        const href = 'javascript:alert(1)';

        // Act
        const actual = cleanExternalUrl(href);

        // Assert
        expect(actual).toBeNull();
    });

    it('rejects a relative path', () => {
        // Arrange
        const href = '/docs/start';

        // Act
        const actual = cleanExternalUrl(href);

        // Assert
        expect(actual).toBeNull();
    });

    it('rejects a data URL', () => {
        // Arrange
        const href = 'data:text/html,<script>alert(1)</script>';

        // Act
        const actual = cleanExternalUrl(href);

        // Assert
        expect(actual).toBeNull();
    });
});
