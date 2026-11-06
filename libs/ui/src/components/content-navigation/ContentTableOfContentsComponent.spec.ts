// #region Imports

import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ContentNavigationContext } from './ContentNavigationContext';
import { ContentTableOfContentsComponent } from './ContentTableOfContentsComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const { Component, Directive } = await import('@angular/core');

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

    return {
        TextComponent: TestTextComponent,
        TranslateService: class TranslateService {},
        TypographyDirective: TestTypographyDirective,
    };
});

describe('Content table of contents', () => {
    let originalRelativeUrl: string;

    beforeEach(() => {
        originalRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        window.history.replaceState(null, '', '/external/commercial-process/public-token?preview=1');
    });

    afterEach(() => {
        window.history.replaceState(null, '', originalRelativeUrl);
    });

    describe('fragment navigation', () => {
        it('marks the destination represented by the viewport with the highlight treatment', async () => {
            // arrange
            await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });
            context.register({ id: 'signature', label: 'Signature' });
            TestBed.configureTestingModule({
                imports: [ContentTableOfContentsComponent],
                providers: [
                    { provide: ContentNavigationContext, useValue: context },
                    {
                        provide: TranslateService,
                        useValue: { translate: (_key: string, fallback: string): string => fallback },
                    },
                ],
            });
            await TestBed.compileComponents();
            const fixture = TestBed.createComponent(ContentTableOfContentsComponent);
            fixture.detectChanges();

            // act
            context.activate('signature');
            fixture.detectChanges();

            // assert
            const links = fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
            expect(links[0]?.getAttribute('aria-current')).toBeNull();
            expect(links[0]?.getAttribute('data-active')).toBeNull();
            expect(links[1]?.getAttribute('aria-current')).toBe('location');
            expect(links[1]?.getAttribute('data-active')).toBe('true');
        });
    });
});
