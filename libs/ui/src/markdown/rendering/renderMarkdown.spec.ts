import { describe, expect, it } from 'vitest';
import { renderMarkdown } from './renderMarkdown';

describe('renderMarkdown', () => {
    it('renders headings as Mosaik text on the headline scale', () => {
        // Arrange
        const markdown = '## Recovery scope';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-text class="heading heading-4 h4"');
        expect(actual).toContain('font: var(--mosaik-typography-headline4)');
        expect(actual).toContain('<span slot="text">Recovery scope</span>');
    });

    it('renders a paragraph as Mosaik text with Mosaik inline elements', () => {
        // Arrange
        const markdown = 'Only **managed workspaces** are in scope.';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-text class="paragraph" wrap="true">');
        expect(actual).toContain('<mosaik-text class="strong" wrap="true">');
        expect(actual).toContain('<span slot="text">managed workspaces</span>');
    });

    it('renders lists as a Mosaik listing', () => {
        // Arrange
        const markdown = '* Detect actionable drift\n* Surface safe recovery guidance';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-listing class="list" type="unordered"');
        expect(actual).toContain('<mosaik-listing-item class="list-item">Detect actionable drift</mosaik-listing-item>');
    });

    it('renders a task list with one Mosaik checkbox per item', () => {
        // Arrange
        const markdown = '- [x] done\n- [ ] open';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual.match(/<mosaik-checkbox/gu)).toHaveLength(2);
        expect(actual).toContain('is-checked="true"');
        expect(actual).toContain('is-checked="false"');
        expect(actual).not.toContain('[x]');
    });

    it('keeps quotes inside fenced code blocks readable', () => {
        // Arrange
        const markdown = '```json\n{ "feasible": true }\n```';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toBe('<mosaik-code class="code" data-language="json" text="{ &quot;feasible&quot;: true }"></mosaik-code>');
    });

    it('keeps ampersands and angle brackets inside code blocks readable', () => {
        // Arrange
        const markdown = '```\na & b <c>\n```';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('a &amp; b &lt;c&gt;');
        expect(actual).not.toContain('&amp;amp;');
    });

    it('keeps inline code readable in a Mosaik code element', () => {
        // Arrange
        const markdown = 'use `--flag="a & b"`';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-code class="codespan" text="--flag=&quot;a &amp; b&quot;"></mosaik-code>');
    });

    it('renders tables as a Mosaik table', () => {
        // Arrange
        const markdown = '| a | b |\n| --- | --- |\n| 1 | 2 |';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-table class="table">');
        expect(actual).toContain('<mosaik-table-header-cell text-overflow="wrap">a');
        expect(actual).toContain('<mosaik-table-body-cell class="table-cell" align="left"');
    });

    it('escapes embedded block-level HTML instead of rendering it', () => {
        // Arrange
        const markdown = '<div onclick="x">hi</div>';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toBe(
            '<mosaik-text class="paragraph" wrap="true"><span slot="text">&lt;div onclick=&quot;x&quot;&gt;hi&lt;/div&gt;</span></mosaik-text>',
        );
    });

    it('escapes embedded inline HTML instead of rendering it', () => {
        // Arrange
        const markdown = 'a <img src=x onerror=alert(1)> b';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('&lt;img src=x onerror=alert(1)&gt;');
        expect(actual).not.toContain('<img');
    });

    it('escapes HTML used as link text', () => {
        // Arrange
        const markdown = '[<b>x</b>](https://example.com)';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<span slot="label">&lt;b&gt;x&lt;/b&gt;</span>');
    });

    it('opens http(s) links externally through a Mosaik anchor', () => {
        // Arrange
        const markdown = '[docs](https://example.com/a?b=1&c=2)';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-anchor class="link" href="https://example.com/a?b=1&amp;c=2" target="_blank" rel="noopener noreferrer"');
        expect(actual).toContain('<span slot="label">docs</span>');
    });

    it('drops the anchor for links that are not http(s)', () => {
        // Arrange
        const markdown = '[bad](javascript:alert(1))';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toBe('<mosaik-text class="paragraph" wrap="true"><span slot="text">bad</span></mosaik-text>');
    });

    it('renders a GitHub alert as a Mosaik message with its variant', () => {
        // Arrange
        const markdown = '> [!WARNING]\n> careful with `--force`';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-message class="message" appearance="soft" variant="warning"');
        expect(actual).toContain('header="Warning"');
        expect(actual).toContain('<mosaik-code class="codespan" text="--force"></mosaik-code>');
    });

    it('renders the authored callout block as a Mosaik banner', () => {
        // Arrange
        const markdown = '::: warning Be cautious!\nThis is a warning box.\n:::';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-banner appearance="soft" variant="warning" header="Be cautious!">');
        expect(actual).toContain('<div slot="subHeader">');
    });

    it('renders the authored details block as a Mosaik expander', () => {
        // Arrange
        const markdown = '::: details More\ninner\n::: end-details';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-expander header="More" appearance="soft">');
    });

    it('renders the authored button block as an externally opening Mosaik button', () => {
        // Arrange
        const markdown = '::: button Get Started | https://example.com | primary | soft\n:::';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toContain('<mosaik-button label="Get Started" href="https://example.com"');
        expect(actual).toContain('target="_blank" rel="noopener noreferrer"');
    });

    it('turns single newlines into line breaks when requested', () => {
        // Arrange
        const markdown = 'a\nb';

        // Act
        const actual = renderMarkdown(markdown, true);

        // Assert
        expect(actual).toContain('a<br class="br">b');
    });

    it('keeps single newlines as soft breaks by default', () => {
        // Arrange
        const markdown = 'a\nb';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).not.toContain('<br');
    });

    it('renders an empty source to an empty string', () => {
        // Arrange
        const markdown = '';

        // Act
        const actual = renderMarkdown(markdown);

        // Assert
        expect(actual).toBe('');
    });

    it('reuses one configured pipeline across calls', () => {
        // Arrange
        const markdown = '> [!INFO]\n> first';
        const first = renderMarkdown(markdown);

        // Act
        const second = renderMarkdown(markdown);

        // Assert
        expect(second).toBe(first);
        expect(second.match(/<mosaik-message/gu)).toHaveLength(1);
    });
});
