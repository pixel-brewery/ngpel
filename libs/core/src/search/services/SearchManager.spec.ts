import { DOCUMENT, type Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchResult } from '../models/ISearchResult';
import type { ISearchProvider } from '../models/ISearchProvider';
import { SEARCH_PROVIDER_TOKEN } from '../provider/SEARCH_PROVIDER_TOKEN';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import { SEARCH_COMMAND_TOKEN } from '../provider/SEARCH_COMMAND_TOKEN';
import { SEARCH_CONFIG } from '../provider/SEARCH_CONFIG';
import { SearchManager } from './SearchManager';

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

describe('SearchManager', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('stamps results with their provider and deduplicates them by id', async () => {
        // Arrange
        const shared = fakeSearchResult('shared:1');
        const first = new RecordingSearchProvider('first', [shared]);
        const second = new RecordingSearchProvider('second', [shared, fakeSearchResult('second:2')]);
        const manager = createManager([first, second]);

        // Act
        const results = await manager.search('query', 10);

        // Assert
        expect(results).toEqual([
            { ...shared, providerId: 'first' },
            { ...fakeSearchResult('second:2'), providerId: 'second' },
        ]);
        expect(second.takes).toEqual([10]);
    });

    it('publishes fast results early and merges later snapshots in registration order', async () => {
        // Arrange
        const shared = fakeSearchResult('shared:1');
        const earlyResult = fakeSearchResult('second:1');
        let answerFirst!: (results: ReadonlyArray<ISearchResult>) => void;
        const firstAnswer = new Promise<ReadonlyArray<ISearchResult>>((resolve) => {
            answerFirst = resolve;
        });
        const first = new RecordingSearchProvider('first');
        vi.spyOn(first, 'search').mockReturnValue(firstAnswer);
        const second = new RecordingSearchProvider('second', [shared, earlyResult]);
        const manager = createManager([first, second]);
        const onResults = vi.fn();

        // Act
        const search = manager.search('query', undefined, { onResults });
        await vi.waitFor(() =>
            expect(onResults).toHaveBeenCalledWith([
                { ...shared, providerId: 'second' },
                { ...earlyResult, providerId: 'second' },
            ]),
        );
        answerFirst([shared]);
        const finalResults = await search;

        // Assert
        expect(finalResults).toEqual([
            { ...shared, providerId: 'first' },
            { ...earlyResult, providerId: 'second' },
        ]);
        expect(onResults).toHaveBeenCalledTimes(2);
        expect(onResults).toHaveBeenLastCalledWith(finalResults);
    });

    it('aborts promptly and ignores a legacy provider answer that arrives later', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('legacy');
        let answer!: (results: ReadonlyArray<ISearchResult>) => void;
        const pendingAnswer = new Promise<ReadonlyArray<ISearchResult>>((resolve) => {
            answer = resolve;
        });
        const searchProvider = vi.spyOn(provider, 'search').mockReturnValue(pendingAnswer);
        const manager = createManager([provider]);
        const controller = new AbortController();
        const onResults = vi.fn();
        const search = manager.search('query', 5, { onResults, signal: controller.signal });

        // Act
        controller.abort();

        // Assert
        await expect(search).rejects.toMatchObject({ name: 'AbortError' });
        expect(searchProvider).toHaveBeenCalledWith('query', 5, controller.signal);
        answer([fakeSearchResult('legacy:1')]);
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
        expect(onResults).not.toHaveBeenCalled();
    });

    it('keeps the results of the providers that answered when another one fails', async () => {
        // Arrange
        const successful = new RecordingSearchProvider('successful', [fakeSearchResult('successful:1')]);
        const failing = new RecordingSearchProvider('failing', [], { failure: new Error('Provider unavailable') });
        const manager = createManager([successful, failing]);

        // Act
        const results = await manager.search('query');

        // Assert
        expect(results).toEqual([{ ...fakeSearchResult('successful:1'), providerId: 'successful' }]);
    });

    it('rethrows the first failure when every active provider fails', async () => {
        // Arrange
        const failure = new Error('All providers unavailable');
        const manager = createManager([new RecordingSearchProvider('failing', [], { failure })]);

        // Act
        const search = manager.search('query');

        // Assert
        await expect(search).rejects.toBe(failure);
    });

    it('skips providers the current user cannot access', async () => {
        // Arrange
        const hidden = new RecordingSearchProvider('hidden', [fakeSearchResult('hidden:1')], { canAccess: false });
        const manager = createManager([hidden]);

        // Act
        const results = await manager.search('query');

        // Assert
        expect(results).toEqual([]);
        expect(hidden.queries).toEqual([]);
    });

    it('queries the union of the selected providers while a filter is active', async () => {
        // Arrange
        const first = new RecordingSearchProvider('first', [fakeSearchResult('first:1')]);
        const second = new RecordingSearchProvider('second', [fakeSearchResult('second:1')]);
        const third = new RecordingSearchProvider('third', [fakeSearchResult('third:1')]);
        const manager = createManager([first, second, third]);
        manager.toggleActiveProvider('first');
        manager.toggleActiveProvider('second');

        // Act
        const results = await manager.search('query');

        // Assert
        expect(results.map((result) => result.id)).toEqual(['first:1', 'second:1']);
        expect(third.queries).toEqual([]);
    });

    it('returns to all providers once the last filter is deselected', () => {
        // Arrange
        const manager = createManager([new RecordingSearchProvider('first'), new RecordingSearchProvider('second')]);
        manager.toggleActiveProvider('first');

        // Act
        manager.toggleActiveProvider('first');

        // Assert
        expect(manager.activeProviderIds()).toEqual([]);
    });

    it('ignores a filter for a provider that does not exist', () => {
        // Arrange
        const manager = createManager([new RecordingSearchProvider('first')]);

        // Act
        manager.toggleActiveProvider('unknown');

        // Assert
        expect(manager.activeProviderIds()).toEqual([]);
    });

    it('leaves exclusive providers out of an ordinary search', async () => {
        // Arrange
        const ordinary = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:1')]);
        const assistant = new RecordingSearchProvider('platform.assistant', [fakeSearchResult('platform.assistant:1')], { isExclusive: true });
        const manager = createManager([ordinary, assistant]);

        // Act
        const results = await manager.search('query');

        // Assert
        expect(results.map((result) => result.id)).toEqual(['crm.customers:1']);
        expect(assistant.queries).toEqual([]);
    });

    it('queries only the exclusive provider while it is active', async () => {
        // Arrange
        const ordinary = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:1')]);
        const assistant = new RecordingSearchProvider('platform.assistant', [fakeSearchResult('platform.assistant:1')], { isExclusive: true });
        const manager = createManager([ordinary, assistant]);
        manager.setExclusiveProvider('platform.assistant');

        // Act
        const results = await manager.search('query');

        // Assert
        expect(results.map((result) => result.id)).toEqual(['platform.assistant:1']);
        expect(ordinary.queries).toEqual([]);
    });

    it('ignores an exclusive activation of a provider that is not exclusive', () => {
        // Arrange
        const manager = createManager([new RecordingSearchProvider('crm.customers')]);

        // Act
        manager.setExclusiveProvider('crm.customers');

        // Assert
        expect(manager.exclusiveProviderId()).toBeNull();
    });

    it('hands a result back to the provider named by its id prefix', async () => {
        // Arrange
        const owner = new RecordingSearchProvider('crm.customers');
        const other = new RecordingSearchProvider('sales.orders');
        const manager = createManager([owner, other]);
        const result = fakeSearchResult('crm.customers:42', { providerId: 'sales.orders' });

        // Act
        await manager.activateResult(result);

        // Assert
        expect(owner.activations).toEqual([result]);
        expect(other.activations).toEqual([]);
    });

    it('falls back to the declared provider id when the result id carries no prefix', async () => {
        // Arrange
        const owner = new RecordingSearchProvider('crm.customers');
        const manager = createManager([owner]);
        const result = fakeSearchResult('42', { providerId: 'crm.customers' });

        // Act
        await manager.activateResult(result);

        // Assert
        expect(owner.activations).toEqual([result]);
    });

    it('rejects activation of a result no registered provider owns', async () => {
        // Arrange
        const owner = new RecordingSearchProvider('crm.customers');
        const manager = createManager([owner]);

        // Act
        const activation = manager.activateResult(fakeSearchResult('unknown:42', { providerId: 'unknown' }));

        // Assert
        await expect(activation).rejects.toThrow('The selected search provider is unavailable.');
        expect(owner.activations).toEqual([]);
    });

    it('rechecks access when the user selects an earlier result', async () => {
        // Arrange
        const result = fakeSearchResult('crm.customers:42');
        const owner = new RecordingSearchProvider('crm.customers', [result]);
        const canAccess = vi.spyOn(owner, 'canAccess');
        const manager = createManager([owner]);
        await manager.search('query');
        canAccess.mockReturnValue(false);

        // Act
        const activation = manager.activateResult(result);

        // Assert
        await expect(activation).rejects.toThrow('The selected search provider is unavailable.');
        expect(owner.activations).toEqual([]);
    });

    it('rejects a filtered owner even if a shorter prefix and the declared provider are active', async () => {
        // Arrange
        const publicProvider = new RecordingSearchProvider('library');
        const privateProvider = new RecordingSearchProvider('library:private');
        const manager = createManager([publicProvider, privateProvider]);
        const result = fakeSearchResult('library:private:42', { providerId: 'library' });
        manager.toggleActiveProvider('library');

        // Act
        const activation = manager.activateResult(result);

        // Assert
        await expect(activation).rejects.toThrow('The selected search provider is unavailable.');
        expect(publicProvider.activations).toEqual([]);
        expect(privateProvider.activations).toEqual([]);
    });

    it('rejects activation when the provider explicitly could not open the result', async () => {
        // Arrange
        const owner = new RecordingSearchProvider('crm.customers');
        const activate = vi.spyOn(owner, 'activate').mockImplementation(async () => false);
        const manager = createManager([owner]);
        const result = fakeSearchResult('crm.customers:42');

        // Act
        const activation = manager.activateResult(result);

        // Assert
        await expect(activation).rejects.toThrow('The selected search result could not be opened.');
        expect(activate).toHaveBeenCalledWith(result);
    });

    it('propagates an activation rejection from the owning provider', async () => {
        // Arrange
        const failure = new Error('Navigation failed');
        const owner = new RecordingSearchProvider('crm.customers');
        vi.spyOn(owner, 'activate').mockRejectedValue(failure);
        const manager = createManager([owner]);
        const result = fakeSearchResult('crm.customers:42');

        // Act
        const activation = manager.activateResult(result);

        // Assert
        await expect(activation).rejects.toBe(failure);
    });

    it('opens the surface and raises the focus request', () => {
        // Arrange
        const manager = createManager([]);
        const focusRequest = manager.focusRequest();

        // Act
        manager.open();

        // Assert
        expect(manager.isOpen()).toBe(true);
        expect(manager.isFocused()).toBe(true);
        expect(manager.focusRequest()).toBe(focusRequest + 1);
    });

    it('closes the results popup but keeps the launcher expanded', () => {
        // Arrange
        const manager = createManager([]);
        manager.open();

        // Act
        manager.closeResults();

        // Assert
        expect(manager.isOpen()).toBe(false);
        expect(manager.isFocused()).toBe(true);
    });

    it('refuses to re-open the results of a launcher that is not expanded', () => {
        // Arrange
        const manager = createManager([]);
        manager.close();

        // Act
        manager.openResults();

        // Assert
        expect(manager.isOpen()).toBe(false);
    });

    it('toggles the surface closed once it is open', () => {
        // Arrange
        const manager = createManager([]);
        manager.open();

        // Act
        manager.toggle();

        // Assert
        expect(manager.isOpen()).toBe(false);
        expect(manager.isFocused()).toBe(false);
    });

    it('reports the state of a dedicated search route', () => {
        // Arrange
        const manager = createManager([]);

        // Act
        manager.setRouteActive(true);

        // Assert
        expect(manager.isRouteActive()).toBe(true);
    });

    it('opens the surface on the configured hotkey', () => {
        // Arrange
        const manager = createManager([], [{ provide: SEARCH_CONFIG, useValue: { hotkey: 'meta+k' } }]);
        const view = TestBed.inject(DOCUMENT).defaultView;

        // Act
        view?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

        // Assert
        expect(manager.isOpen()).toBe(true);
    });

    it('ignores the hotkey while the user types in a form field', () => {
        // Arrange
        const manager = createManager([], [{ provide: SEARCH_CONFIG, useValue: { hotkey: 'meta+k' } }]);
        const document = TestBed.inject(DOCUMENT);
        const input = document.createElement('input');
        document.body.appendChild(input);

        // Act
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));

        // Assert
        expect(manager.isOpen()).toBe(false);
        input.remove();
    });

    it('binds no listener when no hotkey is configured', () => {
        // Arrange
        const manager = createManager([]);
        const view = TestBed.inject(DOCUMENT).defaultView;

        // Act
        view?.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

        // Assert
        expect(manager.isOpen()).toBe(false);
    });

    it('matches static commands on label, description and keywords', async () => {
        // Arrange
        const manager = createManager(
            [],
            [
                {
                    provide: SEARCH_COMMAND_TOKEN,
                    useValue: [
                        fakeCommandItem('settings.open', { label: 'Open settings' }),
                        fakeCommandItem('help.open', { label: 'Help', keywords: ['settings'] }),
                        fakeCommandItem('sales.orders', { label: 'Orders' }),
                    ],
                    multi: true,
                },
            ],
        );

        // Act
        const commands = await manager.getCommands('settings');

        // Assert
        expect(commands.map((command) => command.id)).toEqual(['settings.open', 'help.open']);
    });
});

function createManager(providers: ReadonlyArray<RecordingSearchProvider>, extraProviders: ReadonlyArray<Provider> = []): SearchManager {
    TestBed.configureTestingModule({ providers: [SearchManager, ...providers.map((provider) => provider.provide()), ...extraProviders] });

    return TestBed.inject(SearchManager);
}
