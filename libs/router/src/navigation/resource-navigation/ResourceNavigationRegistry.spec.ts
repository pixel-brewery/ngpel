import { inject, InjectionToken, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import type { IResourceNavigationTarget } from './IResourceNavigationTarget';
import { provideResourceNavigationTarget } from './provideResourceNavigationTarget';
import { ResourceNavigationRegistry } from './ResourceNavigationRegistry';

const TEST_ROUTE_ROOT = new InjectionToken<string>('TEST_ROUTE_ROOT');

function createRegistry(...providers: Provider[]): ResourceNavigationRegistry {
    TestBed.configureTestingModule({ providers });

    return TestBed.inject(ResourceNavigationRegistry);
}

describe('ResourceNavigationRegistry', () => {
    it('finds the target and foreign identifier field for a source alias', () => {
        // Arrange
        const target: IResourceNavigationTarget = {
            targetKey: 'library.article',
            sources: [
                { key: 'articles', idField: 'id' },
                { key: 'contributions', idField: 'articleId' },
            ],
            createUrl: (id) => `/articles/${id}`,
        };
        const registry = createRegistry(provideResourceNavigationTarget(target));

        // Act
        const source = registry.resolveSource('contributions');

        // Assert
        expect(source).toEqual({ target, idField: 'articleId' });
    });

    it('rejects a malformed resource target key at registration', () => {
        // Arrange
        const provider = provideResourceNavigationTarget({ targetKey: '../articles', createUrl: () => '/articles/42' });
        TestBed.configureTestingModule({ providers: [provider] });

        // Act and assert
        expect(() => TestBed.inject(ResourceNavigationRegistry)).toThrow('Invalid resource navigation target');
    });

    it('creates a page link from a registered target key', () => {
        // Arrange
        const from = encodeURIComponent('/reports');
        const registry = createRegistry(
            provideResourceNavigationTarget({
                targetKey: 'library.article',
                createUrl: (id) => `/library/archive/../articles/${id}?from=${from}#details`,
            }),
        );

        // Act
        const url = registry.urlFor('library.article', 'article:42');

        // Assert
        expect(url).toBe(`/library/articles/article:42?from=${from}#details`);
    });

    it('adds a drawer link from a feature factory alongside a page target', () => {
        // Arrange
        const registry = createRegistry(
            { provide: TEST_ROUTE_ROOT, useValue: '/workspace' },
            provideResourceNavigationTarget({
                targetKey: 'library.article',
                createUrl: (id) => `/articles/${id}`,
            }),
            provideResourceNavigationTarget(() => {
                const root = inject(TEST_ROUTE_ROOT);

                return {
                    targetKey: 'library.contributor',
                    createUrl: (id) => `${root}/report?overlay=library.contributor&overlayId=${id}#chart`,
                };
            }),
        );

        // Act
        const url = registry.urlFor('library.contributor', '42');

        // Assert
        expect(url).toBe('/workspace/report?overlay=library.contributor&overlayId=42#chart');
    });

    it('can resolve an unregistered key with no feature providers', () => {
        // Arrange
        const registry = createRegistry();

        // Act
        const target = registry.resolve('library.article');

        // Assert
        expect(target).toBeUndefined();
    });

    it('rejects links for an unregistered target', () => {
        // Arrange
        const registry = createRegistry();

        // Act and assert
        expect(() => registry.urlFor('library.article', '42')).toThrow('Unknown resource navigation target');
    });

    it.each(['', '../42', 'a'.repeat(129)])('rejects invalid identifier %j before building the URL', (id) => {
        // Arrange
        const createUrl = vi.fn(() => '/articles');
        const registry = createRegistry(provideResourceNavigationTarget({ targetKey: 'library.article', createUrl }));

        // Act and assert
        expect(() => registry.urlFor('library.article', id)).toThrow('Invalid resource navigation identifier');
        expect(createUrl).not.toHaveBeenCalled();
    });

    it('evaluates the feature link policy for the requested resource', () => {
        // Arrange
        const canNavigate = vi.fn((id: string): boolean => id !== '42');
        const createUrl = vi.fn(() => '/articles/42');
        const registry = createRegistry(provideResourceNavigationTarget({ targetKey: 'library.article', createUrl, canNavigate }));

        // Act and assert
        expect(() => registry.urlFor('library.article', '42')).toThrow('denied the link');
        expect(canNavigate).toHaveBeenCalledWith('42');
        expect(createUrl).not.toHaveBeenCalled();
    });

    it.each(['https://other.test/articles/42', '//other.test', '/\\other.test', '/archive/..//other.test', '/\t/other.test', 'articles/42'])(
        'rejects an unsafe or non-root-relative URL %j',
        (url) => {
            // Arrange
            const registry = createRegistry(provideResourceNavigationTarget({ targetKey: 'library.article', createUrl: () => url }));

            // Act and assert
            expect(() => registry.urlFor('library.article', '42')).toThrow('invalid application URL');
        },
    );

    it('rejects a duplicate target key', () => {
        // Arrange
        const provider = provideResourceNavigationTarget({ targetKey: 'library.article', createUrl: () => '/articles/42' });
        TestBed.configureTestingModule({ providers: [provider, provider] });

        // Act and assert
        expect(() => TestBed.inject(ResourceNavigationRegistry)).toThrow('Duplicate resource navigation target');
    });

    it('rejects a duplicate source alias from another target', () => {
        // Arrange
        const sources = [{ key: 'articles', idField: 'id' }];
        TestBed.configureTestingModule({
            providers: [
                provideResourceNavigationTarget({ targetKey: 'library.article', sources, createUrl: () => '/articles/42' }),
                provideResourceNavigationTarget({ targetKey: 'catalog.article', sources, createUrl: () => '/catalog/42' }),
            ],
        });

        // Act and assert
        expect(() => TestBed.inject(ResourceNavigationRegistry)).toThrow('Duplicate resource navigation source');
    });
});
