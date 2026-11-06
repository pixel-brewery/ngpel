import { describe, expect, it } from 'vitest';
import type { ICommandItem } from './ICommandItem';
import type { ISearchResult } from './ISearchResult';
import { isCommandItem } from './isCommandItem';

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

describe('isCommandItem', () => {
    it('accepts an item that carries an execute method', () => {
        // Arrange
        const item: unknown = fakeCommandItem('settings.open');

        // Act
        const isCommand = isCommandItem(item);

        // Assert
        expect(isCommand).toBe(true);
    });

    it('rejects a search result, which carries no execute method', () => {
        // Arrange
        const item: unknown = fakeSearchResult('crm.customers:42');

        // Act
        const isCommand = isCommandItem(item);

        // Assert
        expect(isCommand).toBe(false);
    });

    it('rejects values that are not objects', () => {
        // Arrange
        const values: ReadonlyArray<unknown> = [null, undefined, 'settings.open', 42];

        // Act
        const matches = values.filter((value) => isCommandItem(value));

        // Assert
        expect(matches).toEqual([]);
    });
});
