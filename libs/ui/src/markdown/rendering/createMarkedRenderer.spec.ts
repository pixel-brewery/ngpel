import { Marked, Parser, Renderer, type Tokens } from 'marked';
import { describe, expect, it } from 'vitest';
import { createMarkedRenderer } from './createMarkedRenderer';
import type { IMarkdownRendererOptions } from './IMarkdownRendererOptions';
import { TextOnlyHtmlTokenizer } from './TextOnlyHtmlTokenizer';

function render(markdown: string, options?: Partial<IMarkdownRendererOptions>): string {
    const parser = new Marked({ renderer: createMarkedRenderer(options) });

    return parser.parse(markdown, { async: false, gfm: true, tokenizer: new TextOnlyHtmlTokenizer() });
}

function createBoundRenderer(): Renderer {
    const renderer = Object.assign(new Renderer(), createMarkedRenderer());

    renderer.parser = new Parser({ renderer });

    return renderer;
}

describe('createMarkedRenderer', () => {
    it('applies the neutral defaults to links', () => {
        // Arrange
        const markdown = '[docs](https://example.com/)';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('variant="primary" appearance="default"');
        expect(actual).toContain('<mosaik-text class="paragraph" wrap="true">');
    });

    it('honours custom variant, appearance and wrap options', () => {
        // Arrange
        const markdown = '[docs](https://example.com/)';

        // Act
        const actual = render(markdown, { variant: 'secondary', appearance: 'soft', wrapText: false });

        // Assert
        expect(actual).toContain('variant="secondary" appearance="soft"');
        expect(actual).toContain('<mosaik-text class="paragraph" wrap="false">');
    });

    it('never renders a heading larger than headline 4', () => {
        // Arrange
        const markdown = '# Title';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('class="heading heading-4 h4"');
    });

    it('keeps deeper headings on their own level', () => {
        // Arrange
        const markdown = '###### Deep';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('class="heading heading-6 h6"');
        expect(actual).toContain('font: var(--mosaik-typography-headline6)');
    });

    it('renders a thematic break as a three-dot divider', () => {
        // Arrange
        const markdown = 'a\n\n---\n\nb';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<div class="divider" role="separator"><span></span><span></span><span></span></div>');
    });

    it('escapes the title of a link into its attribute', () => {
        // Arrange
        const markdown = '[docs](https://example.com/ "a \\"quoted\\" & title")';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('title="a &quot;quoted&quot; &amp; title"');
    });

    it('renders an image with its size suffix and legend', () => {
        // Arrange
        const markdown = '![Diagram](https://example.com/a.png=200x100 "Overview")';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-image class="image" src="https://example.com/a.png"');
        expect(actual).toContain('width="200px"');
        expect(actual).toContain('height="100px"');
        expect(actual).toContain('legend="Overview" legend-position="bottom"');
        expect(actual).toContain('alt="Diagram"');
    });

    it('renders an image with only a height suffix', () => {
        // Arrange
        const markdown = '![](https://example.com/a.png=x80)';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('height="80px"');
        expect(actual).not.toContain('width=');
        expect(actual).not.toContain('legend=');
    });

    it('renders an image with only a width suffix', () => {
        // Arrange
        const markdown = '![](https://example.com/a.png=120x)';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('width="120px"');
        expect(actual).not.toContain('height=');
    });

    it('drops the image and keeps the escaped alt text for a non-http source', () => {
        // Arrange
        const markdown = '![<b>alt</b>](javascript:alert(1))';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toBe('&lt;b&gt;alt&lt;/b&gt;');
        expect(actual).not.toContain('<mosaik-image');
    });

    it('renders an inline image inside a paragraph as an image element', () => {
        // Arrange
        const markdown = 'see ![shot](https://example.com/s.png) here';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-image class="image" src="https://example.com/s.png"');
        expect(actual).not.toContain('class="paragraph"');
    });

    it('renders an ordered list with its start offset', () => {
        // Arrange
        const markdown = '3. three\n4. four';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-listing class="list" type="ordered" start="3" variant="primary" appearance="soft">');
        expect(actual).toContain('<mosaik-listing-item class="list-item">three</mosaik-listing-item>');
    });

    it('renders an ordered list starting at one without a start attribute', () => {
        // Arrange
        const markdown = '1. one\n2. two';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-listing class="list" type="ordered" variant="primary" appearance="soft">');
    });

    it('renders emphasis, strike-through and inline code as elements', () => {
        // Arrange
        const markdown = '*em* ~~gone~~ `x`';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-text class="emphasis" wrap="true"><span slot="text">em</span></mosaik-text>');
        expect(actual).toContain('<del>gone</del>');
        expect(actual).toContain('<mosaik-code class="codespan" text="x"></mosaik-code>');
    });

    it('lower-cases and trims the fence language to its first word', () => {
        // Arrange
        const markdown = '```TypeScript extra\nlet a = 1;\n```';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('data-language="typescript"');
        expect(actual).toContain('text="let a = 1;"');
    });

    it('renders a plain blockquote as a blockquote container', () => {
        // Arrange
        const markdown = '> quoted';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<div class="blockquote"><mosaik-text class="paragraph" wrap="true"><span slot="text">quoted</span></mosaik-text></div>');
    });

    it('renders table cells with their column alignment', () => {
        // Arrange
        const markdown = '| a | b |\n| :-- | --: |\n| 1 | 2 |';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-table-body-cell class="table-cell" align="left" text-overflow="wrap">1</mosaik-table-body-cell>');
        expect(actual).toContain('<mosaik-table-body-cell class="table-cell" align="right" text-overflow="wrap">2</mosaik-table-body-cell>');
    });

    it('renders a task list checkbox with the configured variant', () => {
        // Arrange
        const markdown = '- [x] done';

        // Act
        const actual = render(markdown, { variant: 'success' });

        // Assert
        expect(actual).toContain('<mosaik-checkbox class="checkbox" is-checked="true" appearance="soft" variant="success"');
    });
});

describe('createMarkedRenderer renderer members', () => {
    it('renders a standalone image token', () => {
        // Arrange
        const renderer = createBoundRenderer();
        const token: Tokens.Image = { type: 'image', raw: '', href: 'https://example.com/a.png', title: null, text: 'alt text', tokens: [] };

        // Act
        const actual = renderer.image(token);

        // Assert
        expect(actual).toBe(
            '<mosaik-image class="image" src="https://example.com/a.png" legend="alt text" legend-position="bottom" alt="alt text"></mosaik-image>',
        );
    });

    it('renders a standalone list item token', () => {
        // Arrange
        const renderer = createBoundRenderer();
        const item: Tokens.ListItem = { type: 'list_item', raw: '', task: false, loose: false, text: 'x', tokens: [{ type: 'text', raw: 'x', text: 'x' }] };

        // Act
        const actual = renderer.listitem(item);

        // Assert
        expect(actual).toBe('<mosaik-listing-item class="list-item">x</mosaik-listing-item>');
    });
});
