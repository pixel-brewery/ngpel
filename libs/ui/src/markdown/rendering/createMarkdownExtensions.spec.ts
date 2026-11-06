import { BlockquoteProcessor, CodeBlockProcessor } from '@pixel-brewery/markdowner-core';
import { Marked, Parser, type Token, type Tokens } from 'marked';
import { describe, expect, it } from 'vitest';
import { createMarkdownExtensions } from './createMarkdownExtensions';
import { createMarkedRenderer } from './createMarkedRenderer';
import { TextOnlyHtmlTokenizer } from './TextOnlyHtmlTokenizer';

function createParser(parseMarkdown: (source: string) => string = (source) => source): Marked {
    const blockquoteProcessor = new BlockquoteProcessor();
    const codeBlockProcessor = new CodeBlockProcessor();

    return new Marked({
        renderer: createMarkedRenderer(),
        extensions: createMarkdownExtensions(parseMarkdown),
        walkTokens: (token: Token): void => {
            blockquoteProcessor.walkTokens(token);
            codeBlockProcessor.walkTokens(token);
        },
    });
}

function render(markdown: string, parseMarkdown?: (source: string) => string): string {
    return createParser(parseMarkdown).parse(markdown, { async: false, gfm: true, tokenizer: new TextOnlyHtmlTokenizer() });
}

/**
 * Runs one extension renderer directly against a hand-built token, bypassing the processors that
 * normally populate every optional member.
 */
function renderToken(name: string, token: Tokens.Generic, parseMarkdown: (source: string) => string = (source) => source): string | false | undefined {
    const extension = createMarkdownExtensions(parseMarkdown).find((candidate) => candidate.name === name);

    if (extension === undefined || !('renderer' in extension)) {
        throw new Error(`No renderer registered for '${name}'.`);
    }

    return extension.renderer.call({ parser: new Parser({}) }, token);
}

describe('createMarkdownExtensions', () => {
    it('registers the nine markdowner-core processors', () => {
        // Arrange
        const parseMarkdown = (source: string): string => source;

        // Act
        const actual = createMarkdownExtensions(parseMarkdown);

        // Assert
        expect(actual.map((extension) => extension.name)).toEqual([
            'splits',
            'callout',
            'blockquote',
            'code',
            'tabs',
            'steps',
            'details',
            'md_button',
            'md_card',
        ]);
    });

    it('renders splits as a horizontal stack of boxes', () => {
        // Arrange
        const markdown = '::: splits\n::: split Left\n- a\n::: end-split\n::: split Right\n- b\n::: end-split\n::: end-splits';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-stack orientation="horizontal" gap="small">');
        expect(actual.match(/<mosaik-box fit="both"/gu)).toHaveLength(2);
        expect(actual).toContain('<h6>Left</h6>');
        expect(actual).toContain('<h6>Right</h6>');
    });

    it('renders a split without body tokens as an empty box', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'splits', raw: '', splits: [{ type: 'split', id: 'left', title: [] }] };

        // Act
        const actual = renderToken('splits', token);

        // Assert
        expect(actual).toBe(
            '<mosaik-stack orientation="horizontal" gap="small"><mosaik-box fit="both" inset="all" highlighted="true" cornered="true"><h6></h6></mosaik-box></mosaik-stack>',
        );
    });

    it('renders a callout without a title as a banner with an empty header', () => {
        // Arrange
        const markdown = '::: info\nBody text.\n:::';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-banner appearance="soft" variant="info" header="">');
        expect(actual).toContain('<div slot="subHeader">');
    });

    it('renders a callout without body tokens as an empty banner', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'callout', raw: '', variant: 'info' };

        // Act
        const actual = renderToken('callout', token);

        // Assert
        expect(actual).toBe('<mosaik-banner appearance="soft" variant="info" header=""><div slot="subHeader"></div></mosaik-banner>');
    });

    it('escapes markup in a callout title twice', () => {
        // Arrange
        const markdown = '::: warning <b>x</b>\nBody.\n:::';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('header="&amp;lt;b&amp;gt;x&amp;lt;/b&amp;gt;"');
    });

    it('renders a neutral blockquote through the nested parser without a header', () => {
        // Arrange
        const nestedSources: Array<string> = [];
        const parseMarkdown = (source: string): string => {
            nestedSources.push(source);

            return `[nested:${source}]`;
        };
        const markdown = '> plain quote';

        // Act
        const actual = render(markdown, parseMarkdown);

        // Assert
        expect(actual).toBe(
            '<mosaik-message class="message" appearance="soft" variant="neutral"><div slot="content">[nested:plain quote]</div></mosaik-message>',
        );
        expect(nestedSources).toEqual(['plain quote']);
    });

    it('renders a typed blockquote with a capitalized header', () => {
        // Arrange
        const markdown = '> [!DANGER]\n> stop';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('variant="danger" header="Danger"');
        expect(actual).toContain('<div slot="content">stop</div>');
    });

    it('falls back to the raw quote text when the processor left no content', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'blockquote', raw: '> raw', text: 'raw' };

        // Act
        const actual = renderToken('blockquote', token);

        // Assert
        expect(actual).toBe('<mosaik-message class="message" appearance="soft" variant="neutral"><div slot="content">raw</div></mosaik-message>');
    });

    it('renders an empty quote body when neither content nor text is present', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'blockquote', raw: '' };

        // Act
        const actual = renderToken('blockquote', token);

        // Assert
        expect(actual).toBe('<mosaik-message class="message" appearance="soft" variant="neutral"><div slot="content"></div></mosaik-message>');
    });

    it('renders a mermaid fence as a diagram container with escaped text', () => {
        // Arrange
        const markdown = '```mermaid\ngraph LR; A-->B\n```';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toBe('<div class="code diagram mermaid">graph LR; A--&gt;B</div>');
    });

    it('renders a fence with a file name as a code element carrying the file name', () => {
        // Arrange
        const markdown = '```ts name="example.ts"\nconst a = 1;\n```';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toBe('<mosaik-code class="code" data-language="ts" data-file-name="example.ts" text="const a = 1;"></mosaik-code>');
    });

    it('renders a fence without a language as a code element with an empty language', () => {
        // Arrange
        const markdown = '```\nplain\n```';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toBe('<mosaik-code class="code" data-language="" text="plain"></mosaik-code>');
    });

    it('renders tabs with escaped labels and their default variant', () => {
        // Arrange
        const markdown = '::: tabs\n::: tab One & <b>\nfirst\n::: end-tab\n::: tab Two\n[!WARNING]\nsecond\n::: end-tab\n::: end-tabs';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-tab appearance="soft">');
        expect(actual).toContain('label="One &amp;amp; &amp;lt;b&amp;gt;" variant="primary"');
        expect(actual).toContain('label="Two" variant="warning"');
    });

    it('renders a tab without body tokens as an empty primary tab item', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'tabs', raw: '', tabs: [{ type: 'tab', id: 'tab-1', title: 'One' }] };

        // Act
        const actual = renderToken('tabs', token);

        // Assert
        expect(actual).toBe('<mosaik-tab appearance="soft"><mosaik-tab-item label="One" variant="primary" id="tab-1"></mosaik-tab-item></mosaik-tab>');
    });

    it('renders steps as a vertical stepper', () => {
        // Arrange
        const markdown = '::: steps\n::: step Install\nrun it\n::: end-step\n::: step Import\nuse it\n::: end-step\n::: end-steps';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-stepper orientation="vertical">');
        expect(actual).toContain('<mosaik-stepper-item header="Install" state="completed"');
        expect(actual).toContain('<mosaik-stepper-item header="Import" state="completed"');
    });

    it('renders a step without body tokens as an empty stepper item', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'steps', raw: '', steps: [{ type: 'step', id: 'step-1', title: 'Install' }] };

        // Act
        const actual = renderToken('steps', token);

        // Assert
        expect(actual).toBe(
            '<mosaik-stepper orientation="vertical"><mosaik-stepper-item header="Install" state="completed" id="step-1"></mosaik-stepper-item></mosaik-stepper>',
        );
    });

    it('renders details as an expander with the escaped title and the parsed body', () => {
        // Arrange
        const markdown = '::: details What & why\nBecause.\n::: end-details';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<mosaik-expander header="What &amp;amp; why" appearance="soft">');
        expect(actual).toContain('Because.');
    });

    it('renders details without body tokens as an empty expander', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'details', raw: '', title: 'Empty' };

        // Act
        const actual = renderToken('details', token);

        // Assert
        expect(actual).toBe('<mosaik-expander header="Empty" appearance="soft"></mosaik-expander>');
    });

    it('renders a card with header, sub header and body', () => {
        // Arrange
        const markdown = '::: card Joy & Theme | Warm <i>playful</i> | primary\nBody text.\n::: end-card';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain(
            '<mosaik-box fit="auto" inset="all" highlighted="true" cornered="true"><h6>Joy &amp; Theme</h6><small>Warm &lt;i&gt;playful&lt;/i&gt;</small>',
        );
        expect(actual).toContain('Body text.');
    });

    it('renders a card without a sub header', () => {
        // Arrange
        const markdown = '::: card Only header\nBody.\n::: end-card';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('<h6>Only header</h6>');
        expect(actual).not.toContain('<small>');
    });

    it('renders a card without body tokens as a box with only the header', () => {
        // Arrange
        const token: Tokens.Generic = { type: 'md_card', raw: '', header: 'Header', subHeader: '' };

        // Act
        const actual = renderToken('md_card', token);

        // Assert
        expect(actual).toBe('<mosaik-box fit="auto" inset="all" highlighted="true" cornered="true"><h6>Header</h6></mosaik-box>');
    });

    it('escapes the label and href of a button', () => {
        // Arrange
        const markdown = '::: button <b>Go</b> | https://example.com/?a=1&b=2\n:::';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toContain('label="&amp;lt;b&amp;gt;Go&amp;lt;/b&amp;gt;"');
        expect(actual).toContain('href="https://example.com/?a=1&amp;b=2"');
    });

    it('keeps a relative button href because the dialect documents in-app targets', () => {
        // Arrange
        const markdown = '::: button Docs | /docs | secondary | soft\n:::';

        // Act
        const actual = render(markdown);

        // Assert
        expect(actual).toBe(
            '<mosaik-button label="Docs" href="/docs" target="_blank" rel="noopener noreferrer" variant="secondary" appearance="soft"></mosaik-button>',
        );
    });
});
