import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { Provider } from '@angular/core';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { ISearchResult } from '../models/ISearchResult';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import { SEARCH_PROVIDER_TOKEN } from './SEARCH_PROVIDER_TOKEN';

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

describe('SEARCH_PROVIDER_TOKEN', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('aggregates one batch per registered provider', () => {
        // Arrange
        const customers = new RecordingSearchProvider('crm.customers');
        const orders = new RecordingSearchProvider('sales.orders');
        TestBed.configureTestingModule({ providers: [customers.provide(), orders.provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_PROVIDER_TOKEN);

        // Assert
        expect(batches).toEqual([[customers], [orders]]);
    });

    it('is absent when no feature contributed providers', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const batches = TestBed.inject(SEARCH_PROVIDER_TOKEN, null, { optional: true });

        // Assert
        expect(batches).toBeNull();
    });
});
