import { describe, expect, it } from 'vitest';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchResult } from '../models/ISearchResult';
import { DefaultSearchRankingStrategy } from './DefaultSearchRankingStrategy';
import { SearchRankingStrategy } from './SearchRankingStrategy';

/** Optional overrides for {@link fakeCommandItem}. */
interface IFakeCommandItemOptions {
    readonly label?: string;
    readonly description?: string;
    readonly group?: string;
    readonly keywords?: ReadonlyArray<string>;
    readonly execute?: () => unknown;
}

/** Builds a palette command; the label defaults to the id and `execute()` is a no-op unless overridden. */
function fakeCommandItem(id: string, options: IFakeCommandItemOptions = {}): ICommandItem {
    return {
        id,
        label: options.label ?? id,
        description: options.description,
        group: options.group,
        keywords: options.keywords,
        execute: options.execute ?? ((): void => undefined),
    };
}

/** Optional overrides for {@link fakeSearchResult}. */
interface IFakeSearchResultOptions {
    readonly label?: string;
    readonly description?: string;
    readonly providerId?: string;
    readonly group?: string;
    readonly keywords?: ReadonlyArray<string>;
}

/** Builds a semantic search result; the label defaults to the id. */
function fakeSearchResult(id: string, options: IFakeSearchResultOptions = {}): ISearchResult {
    return {
        id,
        label: options.label ?? id,
        description: options.description,
        providerId: options.providerId,
        group: options.group,
        keywords: options.keywords,
    };
}

describe('DefaultSearchRankingStrategy', () => {
    it('is a search ranking strategy', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();

        // Act
        const isStrategy = strategy instanceof SearchRankingStrategy;

        // Assert
        expect(isStrategy).toBe(true);
    });

    it('orders exact matches before prefixes, substrings, descriptions and keywords', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();
        const items: ReadonlyArray<ICommandItem | ISearchResult> = [
            fakeCommandItem('keyword', { label: 'Preferences', keywords: ['open'] }),
            fakeCommandItem('description', { label: 'Preferences', description: 'Open the settings' }),
            fakeCommandItem('substring', { label: 'Reopen last tab' }),
            fakeCommandItem('prefix', { label: 'Open settings' }),
            fakeCommandItem('exact', { label: 'Open' }),
        ];

        // Act
        const ranked = strategy.rank('open', items);

        // Assert
        expect(ranked.map((item) => item.id)).toEqual(['exact', 'prefix', 'substring', 'description', 'keyword']);
    });

    it('ignores the case and the surrounding whitespace of the query', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();
        const items: ReadonlyArray<ISearchResult> = [fakeSearchResult('other', { label: 'Zeta' }), fakeSearchResult('match', { label: 'Ada Lovelace' })];

        // Act
        const ranked = strategy.rank('  ADA  ', items);

        // Assert
        expect(ranked.map((item) => item.id)).toEqual(['match', 'other']);
    });

    it('keeps the contributed order for an empty query', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();
        const items: ReadonlyArray<ICommandItem> = [fakeCommandItem('second', { label: 'Zeta' }), fakeCommandItem('first', { label: 'Alpha' })];

        // Act
        const ranked = strategy.rank('', items);

        // Assert
        expect(ranked).toBe(items);
    });

    it('keeps the contributed order of items that match nowhere', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();
        const items: ReadonlyArray<ICommandItem> = [fakeCommandItem('second', { label: 'Zeta' }), fakeCommandItem('first', { label: 'Alpha' })];

        // Act
        const ranked = strategy.rank('nothing matches this', items);

        // Assert
        expect(ranked.map((item) => item.id)).toEqual(['second', 'first']);
    });

    it('never drops an item, because limiting is the surface decision', () => {
        // Arrange
        const strategy = new DefaultSearchRankingStrategy();
        const items: ReadonlyArray<ICommandItem> = [fakeCommandItem('match', { label: 'Open' }), fakeCommandItem('miss', { label: 'Zeta' })];

        // Act
        const ranked = strategy.rank('open', items);

        // Assert
        expect(ranked).toHaveLength(2);
    });
});
