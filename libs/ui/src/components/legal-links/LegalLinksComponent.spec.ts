// #region Imports

import { getDebugNode, ɵresolveComponentResources as resolveComponentResources, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { readFile } from 'node:fs/promises';
import { describe, expect, it, vi } from 'vitest';
import type { ILegalLink } from './ILegalLink';
import { LegalLinksComponent } from './LegalLinksComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { Component, Directive, inject, TemplateRef, ViewContainerRef } = await import('@angular/core');

    class TestTextComponent {
        // #region Fields

        public readonlyValue = false;
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
        template: '{{ text }}',
        inputs: ['readonlyValue: readonly', 'text', 'wrap'],
    })(TestTextComponent);

    Directive({
        selector: '[mosaikTypography]',
        standalone: true,
        inputs: ['mosaikTypography'],
    })(TestTypographyDirective);

    class TestTranslateDirective {
        public constructor() {
            inject(ViewContainerRef).createEmbeddedView(inject(TemplateRef), { $implicit: (key: string) => `translated:${key}` });
        }
    }
    Directive({ selector: '[mosaikTranslate]', standalone: true })(TestTranslateDirective);

    return {
        TextComponent: TestTextComponent,
        TranslateDirective: TestTranslateDirective,
        TranslateService: class TranslateService {},
        TypographyDirective: TestTypographyDirective,
    };
});

const LINKS: ReadonlyArray<ILegalLink> = [
    { label: 'Website', url: 'https://contoso.example' },
    { label: 'Imprint', url: 'https://contoso.example/imprint' },
    { label: 'Privacy', url: 'https://contoso.example/privacy' },
];

describe('LegalLinksComponent', () => {
    describe('trusted external navigation', () => {
        it('renders the supplied destinations with isolated browser contexts', async () => {
            // arrange
            await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
            TestBed.configureTestingModule({
                imports: [LegalLinksComponent],
                providers: [
                    {
                        provide: TranslateService,
                        useValue: { translate: (_key: string, fallback: string): string => fallback },
                    },
                ],
            });
            await TestBed.compileComponents();
            const fixture = TestBed.createComponent(LegalLinksComponent);
            setSignalInput(fixture.componentInstance.links, LINKS);

            // act
            fixture.detectChanges();

            // assert
            const anchors = fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
            expect(anchors).toHaveLength(LINKS.length);
            expect(anchors[0]?.target).toBe('_blank');
            expect(anchors[0]?.rel).toContain('noopener');
            expect(anchors[0]?.getAttribute('referrerpolicy')).toBe('no-referrer');
        });

        it('keeps an additional terms link separate from the supplied ones', async () => {
            // arrange
            await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
            TestBed.configureTestingModule({
                imports: [LegalLinksComponent],
                providers: [
                    {
                        provide: TranslateService,
                        useValue: { translate: (_key: string, fallback: string): string => fallback },
                    },
                ],
            });
            await TestBed.compileComponents();
            const fixture = TestBed.createComponent(LegalLinksComponent);
            setSignalInput(fixture.componentInstance.links, LINKS);
            setSignalInput(fixture.componentInstance.additionalLinks, [{ label: 'AGB', url: 'https://tenant.example/terms', openInNewTab: false }]);

            // act
            fixture.detectChanges();

            // assert
            const termsLink = fixture.nativeElement.querySelector('a[href="https://tenant.example/terms"]') as HTMLAnchorElement | null;
            const termsText = termsLink?.querySelector('mosaik-text') as HTMLElement | null;
            const termsTextComponent = termsText === null ? null : (getDebugNode(termsText)?.componentInstance as { readonly text: string } | undefined);
            expect(termsTextComponent?.text).toBe('AGB');
            expect(termsLink?.target).toBe('');
            expect(termsLink?.getAttribute('referrerpolicy')).toBe('no-referrer');
        });

        it('resolves link translation keys and keeps additional documents reachable in a second row', () => {
            // arrange
            TestBed.configureTestingModule({ imports: [LegalLinksComponent] });
            const fixture = TestBed.createComponent(LegalLinksComponent);
            setSignalInput(fixture.componentInstance.links, [
                { label: 'Privacy', translationKey: 'legal.privacy', url: 'https://contoso.example/privacy' },
                LINKS[1]!,
            ]);
            setSignalInput(fixture.componentInstance.firstRowSize, 2);
            setSignalInput(fixture.componentInstance.additionalLinks, [{ label: 'Terms', url: 'https://tenant.example/terms' }]);

            // act
            fixture.detectChanges();

            // assert
            const navigation = fixture.nativeElement as HTMLElement;
            expect(navigation.querySelector('a[href="https://contoso.example/privacy"]')?.textContent).toBe('translated:legal.privacy');
            const terms = navigation.querySelector('a[href="https://tenant.example/terms"]');
            expect(terms?.closest('ul')?.querySelectorAll('a')).toHaveLength(1);
            expect(terms?.textContent).toBe('Terms');
        });
    });
});

function setSignalInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
