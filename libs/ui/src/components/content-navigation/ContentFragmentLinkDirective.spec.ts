// #region Imports

import { DOCUMENT, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContentFragmentLinkDirective } from './ContentFragmentLinkDirective';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

describe('ContentFragmentLinkDirective', () => {
    let context: ContentNavigationContext;
    let directive: ContentFragmentLinkDirective;

    /** Reads the host binding the directive publishes. */
    function href(): string {
        return (directive as unknown as { readonly href: () => string }).href();
    }

    beforeEach(() => {
        context = new ContentNavigationContext();
        context.register({ id: 'summary', label: 'Summary' });

        TestBed.configureTestingModule({
            providers: [
                ContentFragmentLinkDirective,
                { provide: ContentNavigationContext, useValue: context },
                { provide: DOCUMENT, useValue: { location: { pathname: '/external/commercial-process/public-token', search: '?preview=1' } } },
            ],
        });

        // The just-in-time compiler never sees an `input()` initialiser, so the spec owns the signal.
        directive = TestBed.inject(ContentFragmentLinkDirective);
        Object.defineProperty(directive, 'fragmentId', { value: signal('summary') });
    });

    it('keeps the current route and query in a same-page link', () => {
        // Arrange
        // Act
        const link = href();

        // Assert
        expect(link).toBe('/external/commercial-process/public-token?preview=1#summary');
    });

    it('activates the destination immediately, before the browser scrolls to it', () => {
        // Arrange
        const onClick = (directive as unknown as { onClick(): void }).onClick.bind(directive);

        // Act
        onClick();

        // Assert
        expect(context.activeItemId()).toBe('summary');
    });
});
