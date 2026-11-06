import type { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ICommandSource } from '../models/ICommandSource';
import { SEARCH_COMMAND_SOURCE_TOKEN } from '../provider/SEARCH_COMMAND_SOURCE_TOKEN';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import type { ICommandItem } from '../models/ICommandItem';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { ISearchResult } from '../models/ISearchResult';
import type { ISearchConfig } from '../provider/ISearchConfig';
import { provideSearch } from '../provider/provideSearch';
import { SEARCH_PROVIDER_TOKEN } from '../provider/SEARCH_PROVIDER_TOKEN';
import { withSearchCommands } from '../provider/withSearchCommands';
import { SearchSession } from './SearchSession';

/** Scriptable command source: returns the scripted commands and records every query it was asked. */
class RecordingCommandSource implements ICommandSource {
    public readonly queries: Array<string> = [];

    private _commands: ReadonlyArray<ICommandItem>;

    public constructor(
        public readonly id: string,
        commands: ReadonlyArray<ICommandItem> = [],
    ) {
        this._commands = commands;
    }

    public getCommands(query: string): ReadonlyArray<ICommandItem> {
        this.queries.push(query);

        return this._commands;
    }

    public setCommands(commands: ReadonlyArray<ICommandItem>): void {
        this._commands = commands;
    }

    public provide(): Provider {
        return { provide: SEARCH_COMMAND_SOURCE_TOKEN, useValue: [this], multi: true };
    }
}

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

class DeferredSearchProvider implements ISearchProvider {
    public readonly id: string = 'deferred';
    public readonly label: string = 'Deferred';
    private readonly _pending: Array<(results: ReadonlyArray<ISearchResult>) => void> = [];

    public search(): Promise<ReadonlyArray<ISearchResult>> {
        return new Promise<ReadonlyArray<ISearchResult>>((resolve) => {
            this._pending.push(resolve);
        });
    }

    public activate(): void {
        return;
    }

    public answer(callIndex: number, results: ReadonlyArray<ISearchResult>): void {
        this._pending[callIndex]?.(results);
    }
}

describe('SearchSession', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('publishes the results of a query and asks the providers with the configured limit', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42', { label: 'Ada Lovelace' })]);
        const session = createSession({ resultTake: 5 }, [provider.provide()]);

        // Act
        await session.updateQuery('  ada  ');

        // Assert
        expect(session.query()).toBe('ada');
        expect(session.hasSearched()).toBe(true);
        expect(session.isLoading()).toBe(false);
        expect(session.items().map((item) => item.id)).toEqual(['crm.customers:42']);
        expect(provider.takes).toEqual([5]);
    });

    it('keeps every group and every item of the answer', async () => {
        // Arrange
        const results = [
            ...Array.from({ length: 12 }, (_, index) => fakeSearchResult(`task:${index}`, { label: `Task ${index}`, group: 'Tasks' })),
            ...Array.from({ length: 3 }, (_, index) => fakeSearchResult(`conversation:${index}`, { label: `Conversation ${index}`, group: 'Conversations' })),
        ];
        const session = createSession({}, [new RecordingSearchProvider('workspace', results).provide()]);

        // Act
        await session.updateQuery('everything');

        // Assert
        expect(session.sections().map((section) => section.label)).toEqual(['Tasks', 'Conversations']);
        expect(session.sections()[0]?.items).toHaveLength(12);
        expect(session.sections()[1]?.items).toHaveLength(3);
    });

    it('adopts the layout of the provider that produced a group', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('people', [fakeSearchResult('people:1', { label: 'Ada' })], { layout: 'grid' });
        const session = createSession({}, [provider.provide()]);

        // Act
        await session.updateQuery('ada');

        // Assert
        expect(session.sections()[0]?.layout).toBe('grid');
    });

    it('returns to suggestion mode for an empty query', async () => {
        // Arrange
        const session = createSession({}, [new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]).provide()]);
        await session.updateQuery('ada');

        // Act
        await session.updateQuery('   ');

        // Assert
        expect(session.query()).toBe('');
        expect(session.hasSearched()).toBe(false);
        expect(session.sections()).toEqual([]);
    });

    it('clears the query state', async () => {
        // Arrange
        const session = createSession({}, [new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]).provide()]);
        await session.updateQuery('ada');

        // Act
        session.clear();

        // Assert
        expect(session.query()).toBe('');
        expect(session.hasSearched()).toBe(false);
        expect(session.sections()).toEqual([]);
    });

    it('discards the answer of a superseded query', async () => {
        // Arrange
        const provider = new DeferredSearchProvider();
        const session = createSession({}, [{ provide: SEARCH_PROVIDER_TOKEN, useValue: [provider], multi: true }]);
        const staleQuery = session.updateQuery('stale');
        const currentQuery = session.updateQuery('current');

        // Act
        provider.answer(1, [fakeSearchResult('current:1', { providerId: 'deferred' })]);
        await currentQuery;
        provider.answer(0, [fakeSearchResult('stale:1', { providerId: 'deferred' })]);
        await staleQuery;

        // Assert
        expect(session.query()).toBe('current');
        expect(session.items().map((item) => item.id)).toEqual(['current:1']);
    });

    it('publishes the error of a failed query and empties the results', async () => {
        // Arrange
        const failure = new Error('Provider unavailable');
        const session = createSession({}, [new RecordingSearchProvider('crm.customers', [], { failure }).provide()]);

        // Act
        await session.updateQuery('ada');

        // Assert
        expect(session.error()).toBe(failure);
        expect(session.items()).toEqual([]);
        expect(session.hasSearched()).toBe(true);
        expect(session.isLoading()).toBe(false);
    });

    it('re-runs the current query when the provider selection changed', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]);
        const session = createSession({}, [provider.provide()]);
        await session.updateQuery('ada');

        // Act
        await session.refreshResults();

        // Assert
        expect(provider.queries).toEqual(['ada', 'ada']);
    });

    it('does not query anything while the session is in suggestion mode', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]);
        const session = createSession({}, [provider.provide()]);

        // Act
        await session.refreshResults();

        // Assert
        expect(provider.queries).toEqual([]);
    });

    it('loads the command catalogue exactly once', async () => {
        // Arrange
        const source = new RecordingCommandSource('settings', [fakeCommandItem('settings.open')]);
        const session = createSession({}, [source.provide()]);
        await session.initialize();

        // Act
        await session.initialize();

        // Assert
        expect(source.queries).toEqual(['']);
        expect(session.items().map((item) => item.id)).toEqual(['settings.open']);
    });

    it('labels the command section with the configured translation key', async () => {
        // Arrange
        const session = createSession({ commandSectionLabelKey: 'app.search.commands' }, [], [fakeCommandItem('settings.open')]);

        // Act
        await session.initialize();

        // Assert
        expect(session.sections()[0]?.id).toBe('commands');
        expect(session.sections()[0]?.labelKey).toBe('app.search.commands');
    });

    it('suppresses the command section when commands are turned off', async () => {
        // Arrange
        const session = createSession({ showCommands: false }, [], [fakeCommandItem('settings.open')]);

        // Act
        await session.initialize();

        // Assert
        expect(session.sections()).toEqual([]);
    });

    it('limits the command suggestions to the configured maximum', async () => {
        // Arrange
        const commands = Array.from({ length: 5 }, (_, index) => fakeCommandItem(`settings.${index}`));
        const session = createSession({ maxCommandSuggestions: 2 }, [], commands);

        // Act
        await session.initialize();

        // Assert
        expect(session.items().map((item) => item.id)).toEqual(['settings.0', 'settings.1']);
    });

    it('wraps the selection around the end of the item list', async () => {
        // Arrange
        const session = createSession({}, [], [fakeCommandItem('settings.open'), fakeCommandItem('help.open')]);
        await session.initialize();
        session.moveNext();

        // Act
        session.moveNext();

        // Assert
        expect(session.activeItemId()).toBe('settings.open');
    });

    it('wraps the selection around the start of the item list', async () => {
        // Arrange
        const session = createSession({}, [], [fakeCommandItem('settings.open'), fakeCommandItem('help.open')]);
        await session.initialize();

        // Act
        session.movePrevious();

        // Assert
        expect(session.activeItemId()).toBe('help.open');
    });

    it('selects nothing while the surface is empty', () => {
        // Arrange
        const session = createSession({});

        // Act
        session.moveNext();

        // Assert
        expect(session.activeItemId()).toBeNull();
    });

    it('executes the active command on selection', async () => {
        // Arrange
        const execute = vi.fn();
        const session = createSession({}, [], [fakeCommandItem('settings.open', { execute })]);
        await session.initialize();

        // Act
        await session.selectActive();

        // Assert
        expect(execute).toHaveBeenCalledTimes(1);
    });

    it('hands a selected result to the provider that owns it', async () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]);
        const session = createSession({}, [provider.provide()]);
        await session.updateQuery('ada');

        // Act
        await session.selectActive();

        // Assert
        expect(provider.activations.map((result) => result.id)).toEqual(['crm.customers:42']);
    });

    it('shows a query text without searching for it', () => {
        // Arrange
        const provider = new RecordingSearchProvider('crm.customers', [fakeSearchResult('crm.customers:42')]);
        const session = createSession({}, [provider.provide()]);

        // Act
        session.setQueryText('ada');

        // Assert
        expect(session.query()).toBe('ada');
        expect(provider.queries).toEqual([]);
    });

    it('falls back to the default input delay', () => {
        // Arrange
        const session = createSession({});

        // Act
        const delay = session.delay;

        // Assert
        expect(delay).toBe(150);
    });

    it('publishes the configured input delay', () => {
        // Arrange
        const session = createSession({ delay: 400 });

        // Act
        const delay = session.delay;

        // Assert
        expect(delay).toBe(400);
    });
});

function createSession(config: ISearchConfig, providers: ReadonlyArray<Provider> = [], commands: ReadonlyArray<ICommandItem> = []): SearchSession {
    TestBed.configureTestingModule({
        providers: [provideSearch(config, withSearchCommands({ id: 'spec', commands })), SearchSession, ...providers],
    });

    return TestBed.inject(SearchSession);
}
