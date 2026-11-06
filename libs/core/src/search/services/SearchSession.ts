// #region Imports

import { computed, inject, Injectable, signal, type Signal, type WritableSignal } from '@angular/core';
import type { ICommandItem } from '../models/ICommandItem';
import { isCommandItem } from '../models/isCommandItem';
import type { ISearchResult } from '../models/ISearchResult';
import type { ISearchSection } from '../models/ISearchSection';
import { isSearchResult } from '../models/isSearchResult';
import { SEARCH_ALL_QUERY } from '../models/SEARCH_ALL_QUERY';
import type { SearchSectionLayout } from '../models/SearchSectionLayout';
import type { ISearchConfig } from '../provider/ISearchConfig';
import { SEARCH_CONFIG } from '../provider/SEARCH_CONFIG';
import { SearchManager } from './SearchManager';
import { SearchRankingStrategy } from './SearchRankingStrategy';

// #endregion

/**
 * View-independent state of one search surface: the query, the ranked sections, the active item
 * and the loading and error flags. It is deliberately not provided by `provideSearch()` — every
 * surface lists it in its own providers, so a launcher and a full-page surface keep separate state
 * while sharing the one {@link SearchManager}.
 *
 * @public
 */
@Injectable()
export class SearchSession {
    // #region Fields

    private readonly _manager: SearchManager;
    private readonly _rankingStrategy: SearchRankingStrategy;
    private readonly _config: ISearchConfig;
    private readonly _query: WritableSignal<string>;
    private readonly _commands: WritableSignal<ReadonlyArray<ICommandItem>>;
    private readonly _queryCommands: WritableSignal<ReadonlyArray<ICommandItem>>;
    private readonly _results: WritableSignal<ReadonlyArray<ISearchResult>>;
    private readonly _activeIndex: WritableSignal<number>;
    private readonly _hasSearched: WritableSignal<boolean>;
    private readonly _isLoading: WritableSignal<boolean>;
    private readonly _error: WritableSignal<unknown>;
    private readonly _visibleCommands: Signal<ReadonlyArray<ICommandItem>>;
    private readonly _sections: Signal<ReadonlyArray<ISearchSection>>;
    private readonly _items: Signal<ReadonlyArray<ICommandItem | ISearchResult>>;
    private readonly _activeItemId: Signal<string | null>;
    private _requestVersion: number;
    private _isCommandCatalogLoaded: boolean;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `SearchSession` class.
     *
     * @public
     */
    public constructor() {
        this._manager = inject(SearchManager);
        this._rankingStrategy = inject(SearchRankingStrategy);
        this._config = inject(SEARCH_CONFIG, { optional: true }) ?? {};
        this._query = signal('');
        this._commands = signal<ReadonlyArray<ICommandItem>>([]);
        this._queryCommands = signal<ReadonlyArray<ICommandItem>>([]);
        this._results = signal<ReadonlyArray<ISearchResult>>([]);
        this._activeIndex = signal(-1);
        this._hasSearched = signal(false);
        this._isLoading = signal(false);
        this._error = signal<unknown>(null);
        this._requestVersion = 0;
        this._isCommandCatalogLoaded = false;
        this._visibleCommands = computed(() => this.createVisibleCommands());
        this._sections = computed(() => this.createSections());
        this._items = computed(() => this._sections().flatMap((section) => section.items));
        this._activeItemId = computed(() => this.resolveActiveItemId());
    }

    // #endregion

    // #region Properties

    /**
     * The current, trimmed query.
     *
     * @public
     * @readonly
     */
    public get query(): Signal<string> {
        return this._query.asReadonly();
    }

    /**
     * The sections to render, commands first and one section per result group.
     *
     * @public
     * @readonly
     */
    public get sections(): Signal<ReadonlyArray<ISearchSection>> {
        return this._sections;
    }

    /**
     * The selectable items of all sections in display order — the keyboard navigation order.
     *
     * @public
     * @readonly
     */
    public get items(): Signal<ReadonlyArray<ICommandItem | ISearchResult>> {
        return this._items;
    }

    /**
     * Id of the active item, or `null` while nothing is selectable.
     *
     * @public
     * @readonly
     */
    public get activeItemId(): Signal<string | null> {
        return this._activeItemId;
    }

    /**
     * Indicates whether a non-empty query has been answered. Surfaces use it to tell "no results"
     * from "nothing typed yet".
     *
     * @public
     * @readonly
     */
    public get hasSearched(): Signal<boolean> {
        return this._hasSearched.asReadonly();
    }

    /**
     * Indicates whether a query is in flight.
     *
     * @public
     * @readonly
     */
    public get isLoading(): Signal<boolean> {
        return this._isLoading.asReadonly();
    }

    /**
     * The error of the last query, or `null` when it succeeded.
     *
     * @public
     * @readonly
     */
    public get error(): Signal<unknown> {
        return this._error.asReadonly();
    }

    /**
     * The configured input debounce in milliseconds.
     *
     * @public
     * @readonly
     */
    public get delay(): number {
        return this._config.delay ?? 150;
    }

    // #endregion

    // #region Methods

    /**
     * Loads the command catalogue shown before the user types. Repeated calls are ignored, so a
     * surface may call it on every open.
     *
     * @public
     */
    public async initialize(): Promise<void> {
        if (this._isCommandCatalogLoaded) {
            return;
        }

        this._isCommandCatalogLoaded = true;
        const commands = await this._manager.getCommands(SEARCH_ALL_QUERY);
        this._commands.set(this.uniqueCommands(this._rankingStrategy.rank('', commands).filter(isCommandItem)));
        this.resetActiveIndex();
    }

    /**
     * Runs a query and publishes its ranked commands and results. Answers of superseded queries are
     * discarded, so a slow provider cannot overwrite the result of a later keystroke.
     *
     * @public
     * @param value The raw query; an empty one returns the session to suggestion mode.
     */
    public async updateQuery(value: string): Promise<void> {
        const query = value.trim();
        const requestVersion = this.nextRequestVersion();

        this._query.set(query);
        this._error.set(null);

        if (query.length === 0) {
            this._queryCommands.set([]);
            this._results.set([]);
            this._hasSearched.set(false);
            this._isLoading.set(false);
            this.resetActiveIndex();

            return;
        }

        this._isLoading.set(true);

        try {
            const items = await this._manager.query(query, this.resultTake());

            if (!this.isCurrentRequest(requestVersion)) {
                return;
            }

            this._queryCommands.set(this.uniqueCommands(this._rankingStrategy.rank(query, items.filter(isCommandItem)).filter(isCommandItem)));
            this._results.set(this._rankingStrategy.rank(query, items.filter(isSearchResult)).filter(isSearchResult));
            this._hasSearched.set(true);
            this.resetActiveIndex();
        } catch (error: unknown) {
            if (!this.isCurrentRequest(requestVersion)) {
                return;
            }

            this._queryCommands.set([]);
            this._results.set([]);
            this._hasSearched.set(true);
            this._error.set(error);
            this.resetActiveIndex();
        } finally {
            if (this.isCurrentRequest(requestVersion)) {
                this._isLoading.set(false);
            }
        }
    }

    /**
     * Re-runs the current query, for example after the provider filter changed. Does nothing while
     * the session is in suggestion mode.
     *
     * @public
     */
    public async refreshResults(): Promise<void> {
        const query = this._query();

        if (query.length === 0) {
            return;
        }

        await this.updateQuery(query);
    }

    /**
     * Shows a query text without searching for it. Surfaces use it while an exclusive provider owns
     * the input, where the query is submitted explicitly instead of on every keystroke.
     *
     * @public
     * @param value The text to display.
     */
    public setQueryText(value: string): void {
        this._query.set(value);
    }

    /**
     * Clears the query and returns to suggestion mode. A query in flight is discarded.
     *
     * @public
     */
    public clear(): void {
        this.nextRequestVersion();
        this._query.set('');
        this._queryCommands.set([]);
        this._results.set([]);
        this._hasSearched.set(false);
        this._isLoading.set(false);
        this._error.set(null);
        this.resetActiveIndex();
    }

    /**
     * Moves the selection to the next item and wraps around at the end.
     *
     * @public
     */
    public moveNext(): void {
        const items = this._items();

        if (items.length === 0) {
            this._activeIndex.set(-1);

            return;
        }

        this._activeIndex.set(this._activeIndex() >= items.length - 1 ? 0 : this._activeIndex() + 1);
    }

    /**
     * Moves the selection to the previous item and wraps around at the start.
     *
     * @public
     */
    public movePrevious(): void {
        const items = this._items();

        if (items.length === 0) {
            this._activeIndex.set(-1);

            return;
        }

        this._activeIndex.set(this._activeIndex() <= 0 ? items.length - 1 : this._activeIndex() - 1);
    }

    /**
     * Selects the active item, if there is one.
     *
     * @public
     */
    public async selectActive(): Promise<void> {
        const item = this._items()[this._activeIndex()];

        if (item === undefined) {
            return;
        }

        await this.select(item);
    }

    /**
     * Selects an explicit item: commands execute, results are handed to their provider.
     *
     * @public
     * @param item The item to select.
     */
    public async select(item: ICommandItem | ISearchResult): Promise<void> {
        if (isCommandItem(item)) {
            await item.execute();

            return;
        }

        await this._manager.activateResult(item);
    }

    /**
     * Merges the catalogue with the commands of the current query and limits them to the configured
     * suggestion count.
     */
    private createVisibleCommands(): ReadonlyArray<ICommandItem> {
        const query = this._query().toLowerCase();
        const mergedCommands = this.uniqueCommands([...this._commands(), ...this._queryCommands()]);

        if (query.length === 0) {
            return mergedCommands.slice(0, this.maxCommandSuggestions());
        }

        const filteredCommands = mergedCommands.filter((command) => this.matches(command, query));

        return this._rankingStrategy.rank(query, filteredCommands).filter(isCommandItem).slice(0, this.maxCommandSuggestions());
    }

    /**
     * Builds the section list: the command section first, then one section per result group.
     */
    private createSections(): ReadonlyArray<ISearchSection> {
        const sections: Array<ISearchSection> = [];
        const commands = this._visibleCommands();

        if (commands.length > 0 && this.showCommands()) {
            sections.push({ id: 'commands', labelKey: this._config.commandSectionLabelKey, items: commands });
        }

        return [...sections, ...this.createResultSections()];
    }

    /**
     * Groups the results by their group, falling back to the producing provider.
     */
    private createResultSections(): ReadonlyArray<ISearchSection> {
        const groupedResults = new Map<string, Array<ISearchResult>>();

        for (const result of this._results()) {
            const group = result.group ?? result.providerId ?? 'results';
            const existingGroup = groupedResults.get(group);

            if (existingGroup === undefined) {
                groupedResults.set(group, [result]);

                continue;
            }

            existingGroup.push(result);
        }

        return [...groupedResults.entries()].map(([group, results]) => ({
            id: `results:${group}`,
            label: group,
            layout: this.resolveGroupLayout(results),
            items: results,
        }));
    }

    /**
     * Resolves the layout of a result group from the provider that produced its first result.
     */
    private resolveGroupLayout(results: ReadonlyArray<ISearchResult>): SearchSectionLayout {
        const firstProviderId = results[0]?.providerId;

        if (firstProviderId === undefined) {
            return 'list';
        }

        return this._manager.providers.find((provider) => provider.id === firstProviderId)?.layout ?? 'list';
    }

    /**
     * Resolves the id of the active item.
     */
    private resolveActiveItemId(): string | null {
        return this._items()[this._activeIndex()]?.id ?? null;
    }

    /**
     * Selects the first item, or nothing when the surface is empty.
     */
    private resetActiveIndex(): void {
        this._activeIndex.set(this._items().length > 0 ? 0 : -1);
    }

    /**
     * Keeps the first command per id.
     */
    private uniqueCommands(commands: ReadonlyArray<ICommandItem>): ReadonlyArray<ICommandItem> {
        const uniqueCommands = new Map<string, ICommandItem>();

        for (const command of commands) {
            if (!uniqueCommands.has(command.id)) {
                uniqueCommands.set(command.id, command);
            }
        }

        return [...uniqueCommands.values()];
    }

    /**
     * Matches a command against the lower-cased query.
     */
    private matches(command: ICommandItem, query: string): boolean {
        return `${command.label}\n${command.description ?? ''}\n${(command.keywords ?? []).join('\n')}`.toLowerCase().includes(query);
    }

    /**
     * Starts a new request generation and returns its version.
     */
    private nextRequestVersion(): number {
        this._requestVersion += 1;

        return this._requestVersion;
    }

    /**
     * Determines whether a request is still the newest one.
     */
    private isCurrentRequest(requestVersion: number): boolean {
        return requestVersion === this._requestVersion;
    }

    /**
     * The configured suggestion limit.
     */
    private maxCommandSuggestions(): number {
        return this._config.maxCommandSuggestions ?? 6;
    }

    /**
     * The configured per-provider result limit.
     */
    private resultTake(): number {
        return this._config.resultTake ?? 20;
    }

    /**
     * Whether the command section is emitted.
     */
    private showCommands(): boolean {
        return this._config.showCommands ?? true;
    }

    // #endregion
}
