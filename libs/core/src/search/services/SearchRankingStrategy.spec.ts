import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { Provider } from '@angular/core';
import type { ISearchProvider } from '../models/ISearchProvider';
import { SEARCH_PROVIDER_TOKEN } from '../provider/SEARCH_PROVIDER_TOKEN';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchResult } from '../models/ISearchResult';
import { provideSearch } from '../provider/provideSearch';
import { SearchRankingStrategy } from './SearchRankingStrategy';
import { SearchSession } from './SearchSession';

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

class ReverseRankingStrategy extends SearchRankingStrategy {
    public override rank(_query: string, items: ReadonlyArray<ICommandItem | ISearchResult>): ReadonlyArray<ICommandItem | ISearchResult> {
        return [...items].reverse();
    }
}

describe('SearchRankingStrategy', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('is the seam a custom strategy is bound to', async () => {
        // Arrange
        const results = [fakeSearchResult('crm.customers:1', { label: 'Ada' }), fakeSearchResult('crm.customers:2', { label: 'Grace' })];
        TestBed.configureTestingModule({
            providers: [
                provideSearch({}),
                new RecordingSearchProvider('crm.customers', results).provide(),
                SearchSession,
                { provide: SearchRankingStrategy, useClass: ReverseRankingStrategy },
            ],
        });
        const session = TestBed.inject(SearchSession);

        // Act
        await session.updateQuery('a');

        // Assert
        expect(session.items().map((item) => item.id)).toEqual(['crm.customers:2', 'crm.customers:1']);
    });

    it('is unavailable without a search composition root', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const strategy = TestBed.inject(SearchRankingStrategy, null, { optional: true });

        // Assert
        expect(strategy).toBeNull();
    });
});
