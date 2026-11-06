import { DOCUMENT, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { ISearchResult } from '../models/ISearchResult';
import { SEARCH_PROVIDER_TOKEN } from './SEARCH_PROVIDER_TOKEN';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import { DefaultSearchRankingStrategy } from '../services/DefaultSearchRankingStrategy';
import { SearchManager } from '../services/SearchManager';
import { SearchRankingStrategy } from '../services/SearchRankingStrategy';
import { provideSearch } from './provideSearch';
import { SEARCH_CONFIG } from './SEARCH_CONFIG';
import { withSearchCommands } from './withSearchCommands';

/** Optional overrides for {@link RecordingSearchProvider}. */
interface IRecordingSearchProviderOptions {
    readonly label?: string;
    readonly layout?: SearchSectionLayout;
    readonly isExclusive?: boolean;
    readonly canAccess?: boolean;
    readonly failure?: unknown;
}

/** Scriptable search provider: answers with scripted results or a scripted rejection and records every call. */
class RecordingSearchProvider implements ISearchProvider {
    public readonly label: string;
    public readonly layout: SearchSectionLayout | undefined;
    public readonly isExclusive: boolean;
    public readonly queries: Array<string> = [];
    public readonly takes: Array<number | undefined> = [];
    public readonly activations: Array<ISearchResult> = [];

    private readonly _canAccess: boolean;
    private readonly _failure: unknown;
    private _results: ReadonlyArray<ISearchResult>;

    public constructor(
        public readonly id: string,
        results: ReadonlyArray<ISearchResult> = [],
        options: IRecordingSearchProviderOptions = {},
    ) {
        this.label = options.label ?? id;
        this.layout = options.layout;
        this.isExclusive = options.isExclusive ?? false;
        this._canAccess = options.canAccess ?? true;
        this._failure = options.failure;
        this._results = results;
    }

    public canAccess(): boolean {
        return this._canAccess;
    }

    public async search(query: string, take?: number): Promise<ReadonlyArray<ISearchResult>> {
        this.queries.push(query);
        this.takes.push(take);

        if (this._failure !== undefined) {
            throw this._failure;
        }

        return this._results;
    }

    public activate(result: ISearchResult): void {
        this.activations.push(result);
    }

    public setResults(results: ReadonlyArray<ISearchResult>): void {
        this._results = results;
    }

    public provide(): Provider {
        return { provide: SEARCH_PROVIDER_TOKEN, useValue: [this], multi: true };
    }
}

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

describe('provideSearch', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('publishes the configuration and the default ranking next to the manager', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideSearch({ resultTake: 5 })] });

        // Act
        const manager = TestBed.inject(SearchManager);

        // Assert
        expect(manager).toBeInstanceOf(SearchManager);
        expect(TestBed.inject(SEARCH_CONFIG)).toEqual({ resultTake: 5 });
        expect(TestBed.inject(SearchRankingStrategy)).toBeInstanceOf(DefaultSearchRankingStrategy);
    });

    it('composes the contributed features into the manager', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers');
        TestBed.configureTestingModule({
            providers: [provideSearch({}, withSearchCommands({ id: 'settings', commands: [fakeCommandItem('settings.open')] })), provider.provide()],
        });

        // Act
        const commands = await TestBed.inject(SearchManager).query('settings');

        // Assert
        expect(commands.map((command) => command.id)).toEqual(['settings.open']);
        expect(provider.queries).toEqual(['settings']);
    });

    it('creates the manager eagerly so the hotkey is bound before a surface exists', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideSearch({ hotkey: 'meta+k' })] });
        const view = TestBed.inject(DOCUMENT).defaultView;

        // Act
        view?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

        // Assert
        expect(TestBed.inject(SearchManager).isOpen()).toBe(true);
    });

    it('rejects two contributions of the same kind sharing an id', () => {
        // Arrange
        const first = withSearchCommands({ id: 'settings', commands: [fakeCommandItem('settings.open')] });
        const second = withSearchCommands({ id: 'settings', commands: [fakeCommandItem('settings.close')] });

        // Act
        const compose = (): unknown => provideSearch({}, first, second);

        // Assert
        expect(compose).toThrow("Feature conflict: duplicate id 'settings' within kind 'search-commands'.");
    });
});
