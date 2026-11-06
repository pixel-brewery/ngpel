import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { ISearchResult } from '../models/ISearchResult';
import { SEARCH_PROVIDER_TOKEN } from './SEARCH_PROVIDER_TOKEN';
import { SearchKinds } from './SearchKinds';
import { withSearchProviders } from './withSearchProviders';

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

@Injectable()
class ProbeSearchProvider implements ISearchProvider {
    public readonly id: string = 'crm.customers';
    public readonly label: string = 'Customers';

    public search(): ReadonlyArray<ISearchResult> {
        return [fakeSearchResult('crm.customers:42')];
    }

    public activate(): void {
        return;
    }
}

describe('withSearchProviders', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('creates a multi feature of the providers kind carrying the contribution id', () => {
        // Arrange
        const options = { id: 'crm', providers: [ProbeSearchProvider] };

        // Act
        const feature = withSearchProviders(options);

        // Assert
        expect(feature.id).toBe('crm');
        expect(feature.kind).toBe(SearchKinds.Providers);
        expect(feature.options.multi).toBe(true);
    });

    it('registers provider classes as themselves and as a provider batch', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [...withSearchProviders({ id: 'crm', providers: [ProbeSearchProvider] }).provide()] });

        // Act
        const batches = TestBed.inject(SEARCH_PROVIDER_TOKEN);

        // Assert
        expect(batches).toEqual([[TestBed.inject(ProbeSearchProvider)]]);
    });

    it('contributes no providers when the contribution registers no class', () => {
        // Arrange
        const feature = withSearchProviders({ id: 'empty', providers: [] });

        // Act
        const providers = feature.provide();

        // Assert
        expect(providers).toEqual([]);
    });
});
