import { describe, expect, it } from 'vitest';
import type { ICommandItem } from './ICommandItem';
import type { ISearchResult } from './ISearchResult';
import { isSearchResult } from './isSearchResult';

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

describe('isSearchResult', () => {
    it('accepts an identified, labelled item without an execute method', () => {
        // Arrange
        const item: unknown = fakeSearchResult('crm.customers:42');

        // Act
        const isResult = isSearchResult(item);

        // Assert
        expect(isResult).toBe(true);
    });

    it('rejects a command, so both guards partition the item union', () => {
        // Arrange
        const item: unknown = fakeCommandItem('settings.open');

        // Act
        const isResult = isSearchResult(item);

        // Assert
        expect(isResult).toBe(false);
    });

    it('rejects an object without a label', () => {
        // Arrange
        const item: unknown = { id: 'crm.customers:42' };

        // Act
        const isResult = isSearchResult(item);

        // Assert
        expect(isResult).toBe(false);
    });
});
