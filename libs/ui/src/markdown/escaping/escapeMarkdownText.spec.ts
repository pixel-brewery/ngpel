import { describe, expect, it } from 'vitest';
import { escapeMarkdownText } from './escapeMarkdownText';

describe('escapeMarkdownText', () => {
    it('escapes twice so the attribute parser leaves literal markup behind', () => {
        // Arrange
        const value = '<img src=x onerror=alert(1)>';

        // Act
        const actual = escapeMarkdownText(value);

        // Assert
        expect(actual).toBe('&amp;lt;img src=x onerror=alert(1)&amp;gt;');
    });

    it('turns a bare ampersand into a doubly escaped entity', () => {
        // Arrange
        const value = 'a & b';

        // Act
        const actual = escapeMarkdownText(value);

        // Assert
        expect(actual).toBe('a &amp;amp; b');
    });

    it('leaves text without special characters untouched', () => {
        // Arrange
        const value = 'Recovery scope';

        // Act
        const actual = escapeMarkdownText(value);

        // Assert
        expect(actual).toBe('Recovery scope');
    });
});
