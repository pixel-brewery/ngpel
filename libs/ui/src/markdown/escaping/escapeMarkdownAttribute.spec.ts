import { describe, expect, it } from 'vitest';
import { escapeMarkdownAttribute } from './escapeMarkdownAttribute';

describe('escapeMarkdownAttribute', () => {
    it('escapes every character that could break out of an attribute', () => {
        // Arrange
        const value = '<a href="x" title=\'y\'>a & b</a>';

        // Act
        const actual = escapeMarkdownAttribute(value);

        // Assert
        expect(actual).toBe('&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;a &amp; b&lt;/a&gt;');
    });

    it('escapes the ampersand first so produced entities stay intact', () => {
        // Arrange
        const value = '"&"';

        // Act
        const actual = escapeMarkdownAttribute(value);

        // Assert
        expect(actual).toBe('&quot;&amp;&quot;');
        expect(actual).not.toContain('&amp;quot;');
    });

    it('escapes an already escaped value again instead of guessing at intent', () => {
        // Arrange
        const value = '&lt;b&gt;';

        // Act
        const actual = escapeMarkdownAttribute(value);

        // Assert
        expect(actual).toBe('&amp;lt;b&amp;gt;');
    });

    it('returns an empty string unchanged', () => {
        // Arrange
        const value = '';

        // Act
        const actual = escapeMarkdownAttribute(value);

        // Assert
        expect(actual).toBe('');
    });
});
