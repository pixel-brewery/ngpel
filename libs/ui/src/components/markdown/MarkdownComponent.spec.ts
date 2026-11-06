// #region Imports

import { ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MarkdownComponent } from './MarkdownComponent';

// #endregion

describe('MarkdownComponent', () => {
    beforeEach(async () => {
        TestBed.configureTestingModule({ imports: [MarkdownComponent] });
        await TestBed.compileComponents();
    });

    it('preserves the semantic Markdown heading hierarchy', () => {
        const root = render('# Heading 1\n\n## Heading 2\n\n###### Heading 6');

        expect(root.querySelector('h1')?.textContent).toBe('Heading 1');
        expect(root.querySelector('h2')?.textContent).toBe('Heading 2');
        expect(root.querySelector('h6')?.textContent).toBe('Heading 6');
    });

    it('renders GFM tables, tasks and mixed inline content', () => {
        const root = render(
            '| Name | State |\n| --- | ---: |\n| **Alpha** | Ready |\n\n- [x] Done\n- [ ] Pending\n\nBefore ![Preview](https://example.com/image.png) after',
        );

        expect(root.querySelector('table strong')?.textContent).toBe('Alpha');
        expect(root.querySelector('td:nth-child(2)')?.getAttribute('style')).toContain('text-align: right');
        const tasks = Array.from(root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
        expect(tasks).toHaveLength(2);
        expect(tasks[0]?.checked).toBe(true);
        expect(tasks[1]?.checked).toBe(false);
        expect(root.textContent).toContain('Done');
        expect(root.textContent).toContain('Pending');
        expect(root.textContent).not.toContain('[x]');
        expect(root.textContent).not.toContain('[ ]');
        expect(root.querySelector('p img')?.getAttribute('src')).toBe('https://example.com/image.png');
        const imageParagraph = root.querySelector('p:has(img)');
        expect(imageParagraph?.textContent).toContain('Before');
        expect(imageParagraph?.textContent).toContain('after');
    });

    it('renders raw HTML and unsafe links as inert text', () => {
        const root = render('<script>alert("unsafe")</script>\n\n[unsafe](javascript:alert(1))');

        expect(root.querySelector('script')).toBeNull();
        expect(root.querySelector('a')).toBeNull();
        expect(root.textContent).toContain('<script>alert("unsafe")</script>');
        expect(root.textContent).toContain('unsafe');
    });

    it('renders plain web addresses as safe links', () => {
        const root = render('Open https://example.com/path?source=chat');
        const link = root.querySelector('a');

        expect(link?.textContent).toBe('https://example.com/path?source=chat');
        expect(link?.getAttribute('href')).toBe('https://example.com/path?source=chat');
    });

    it('routes approved document links and leaves unpublished references inert', () => {
        const root = render('[Guide](guide.md) and [Draft](draft.md)', 'document', (href) =>
            href === 'guide.md' ? '/main/help/documentation?page=guide.md' : null,
        );

        expect(root.querySelector('a')?.getAttribute('href')).toBe('/main/help/documentation?page=guide.md');
        expect(root.querySelectorAll('a')).toHaveLength(1);
        expect(root.textContent).toContain('Draft');
    });

    it('supports the extended callout dialect without injecting HTML', () => {
        const root = render('::: warning Attention\nUse **care**.\n:::');
        const callout = root.querySelector('aside');

        expect(callout?.getAttribute('data-variant')).toBe('warning');
        expect(callout?.querySelector('[part="callout-title"]')?.textContent).toBe('Attention');
        expect(callout?.querySelector('p strong')?.textContent).toBe('care');
    });
    it('renders every registered extended Markdown block', () => {
        const root = render(
            '> [!INFO]\n> Typed quote.\n\n~~~ts name="sample.ts" {1}\nconst value = true;\n~~~\n\n::: details More\nDetails body.\n::: end-details\n\n::: card Card | Subtitle | primary\nCard body.\n::: end-card\n\n::: button Continue | /continue | primary | soft\n:::\n\n::: splits\n::: split Left\nLeft body.\n::: end-split\n::: split Right\nRight body.\n::: end-split\n::: end-splits\n\n::: steps\n::: step First\nFirst body.\n::: end-step\n::: end-steps\n\n::: tabs\n::: tab Overview\nTab body.\n::: end-tab\n::: end-tabs',
        );

        expect(root.querySelector('blockquote[data-variant="info"]')?.textContent).toContain('Typed quote');
        expect(root.querySelector('figure figcaption')?.textContent).toBe('sample.ts');
        expect(root.querySelector('details[part="details"] summary')?.textContent).toBe('More');
        expect(root.querySelector('article[part="card"]')?.textContent).toContain('Card body');
        expect(root.querySelector('a[part="button"]')?.getAttribute('href')).toBe('/continue');
        expect(root.querySelectorAll('article[part="split"]')).toHaveLength(2);
        expect(root.querySelector('ol[part="steps"]')?.textContent).toContain('First body');
        expect(root.querySelector('section[part="tabs"]')?.textContent).toContain('Tab body');
    });

    it('renders inline mode without block elements', () => {
        const root = render('Use **care**.', 'inline');

        expect(root.querySelector('p')).toBeNull();
        expect(root.querySelector('strong')?.textContent).toBe('care');
    });
});

function render(source: string, mode: 'document' | 'inline' = 'document', linkResolver: ((href: string) => string | null) | null = null): ShadowRoot {
    const fixture = TestBed.createComponent(MarkdownComponent);
    setInput(fixture.componentInstance.text, source);
    setInput(fixture.componentInstance.mode, mode);
    setInput(fixture.componentInstance.linkResolver, linkResolver);
    fixture.detectChanges();

    return fixture.nativeElement.shadowRoot as ShadowRoot;
}

function setInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
