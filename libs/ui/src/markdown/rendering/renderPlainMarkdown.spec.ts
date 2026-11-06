import { describe, expect, it } from 'vitest';
import { renderPlainMarkdown } from './renderPlainMarkdown';

describe('renderPlainMarkdown', () => {
    it('keeps quotes inside fenced code blocks readable', () => {
        // Arrange
        const markdown = '```json\n{ "feasible": true }\n```';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toContain('<code class="language-json">{ &quot;feasible&quot;: true }');
        expect(actual).not.toContain('&amp;quot;');
    });

    it('keeps inline code readable', () => {
        // Arrange
        const markdown = 'use `--flag="a & b"`';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toContain('<code>--flag=&quot;a &amp; b&quot;</code>');
    });

    it('renders block structure around a code fence', () => {
        // Arrange
        const markdown = '* first\n* second\n\nDefinition of ready\n\n```json\n[]\n```';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toContain('<li>first</li>');
        expect(actual).toContain('<p>Definition of ready</p>');
        expect(actual).toContain('<pre><code class="language-json">[]');
    });

    it('escapes embedded block-level HTML instead of rendering it', () => {
        // Arrange
        const markdown = '<div onclick="x">hi</div>';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toBe('<p>&lt;div onclick=&quot;x&quot;&gt;hi&lt;/div&gt;</p>\n');
    });

    it('opens http(s) links externally', () => {
        // Arrange
        const markdown = '[docs](https://example.com/a?b=1&c=2)';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toBe('<p><a href="https://example.com/a?b=1&amp;c=2" target="_blank" rel="noopener noreferrer">docs</a></p>\n');
    });

    it('escapes the title of a link into its attribute', () => {
        // Arrange
        const markdown = '[docs](https://example.com/ "a & \\"b\\"")';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toContain('title="a &amp; &quot;b&quot;"');
    });

    it('drops the anchor for links that are not http(s)', () => {
        // Arrange
        const markdown = '[bad](javascript:alert(1))';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toBe('<p>bad</p>\n');
    });

    it('emits no Mosaik element', () => {
        // Arrange
        const markdown = '# Problem and solution\n\n* one\n\n| a |\n| --- |\n| 1 |';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).not.toContain('<mosaik-');
        expect(actual).toContain('<h1>Problem and solution</h1>');
    });

    it('turns single newlines into line breaks when requested', () => {
        // Arrange
        const markdown = 'a\nb';

        // Act
        const actual = renderPlainMarkdown(markdown, true);

        // Assert
        expect(actual).toBe('<p>a<br>b</p>\n');
    });

    it('renders an empty source to an empty string', () => {
        // Arrange
        const markdown = '';

        // Act
        const actual = renderPlainMarkdown(markdown);

        // Assert
        expect(actual).toBe('');
    });
});
