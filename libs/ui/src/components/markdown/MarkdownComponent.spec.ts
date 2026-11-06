// #region Imports

import { getDebugNode, ɵresolveComponentResources as resolveComponentResources, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import { MarkdownComponent } from './MarkdownComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { Component, Directive } = await import('@angular/core');

    class TestTextComponent {
        // #region Fields

        public formatter = '';
        public text = '';
        public wrap = false;

        // #endregion

        // #region Ctor

        // #endregion

        // #region Properties

        // #endregion

        // #region Methods

        // #endregion
    }

    class TestTypographyDirective {
        // #region Fields

        public mosaikTypography = '';

        // #endregion

        // #region Ctor

        // #endregion

        // #region Properties

        // #endregion

        // #region Methods

        // #endregion
    }

    Component({
        selector: 'mosaik-text',
        standalone: true,
        template: '',
        inputs: ['formatter', 'text', 'wrap'],
    })(TestTextComponent);

    Directive({
        selector: '[mosaikTypography]',
        standalone: true,
        inputs: ['mosaikTypography'],
    })(TestTypographyDirective);

    return {
        TextComponent: TestTextComponent,
        TypographyDirective: TestTypographyDirective,
    };
});

describe('MarkdownComponent', () => {
    describe('sanitized rendering', () => {
        it('delegates untrusted standard Markdown to the Mosaik text formatter', async () => {
            // arrange
            await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
            TestBed.configureTestingModule({ imports: [MarkdownComponent] });
            await TestBed.compileComponents();
            const fixture = TestBed.createComponent(MarkdownComponent);
            setSignalInput(fixture.componentInstance.text, '# Heading\n\n**Important**<script>alert("unsafe")</script>');
            setSignalInput(fixture.componentInstance.sanitize, true);

            // act
            fixture.detectChanges();

            // assert
            const root = fixture.nativeElement.shadowRoot as ShadowRoot;
            const text = root.querySelector('mosaik-text') as HTMLElement | null;
            const textComponent =
                text === null
                    ? null
                    : (getDebugNode(text)?.componentInstance as { readonly formatter: string; readonly text: string; readonly wrap: boolean } | undefined);
            expect(text).not.toBeNull();
            expect(textComponent?.formatter).toBe('markdown');
            expect(textComponent?.text).toBe('# Heading\n\n**Important**&lt;script&gt;alert(&quot;unsafe&quot;)&lt;/script&gt;');
            expect(textComponent?.wrap).toBe(true);
        });
    });
});

function setSignalInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
