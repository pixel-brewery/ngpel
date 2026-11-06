// #region Imports

import { DestroyRef, DOCUMENT, inject, Injectable, signal, type Signal, type WritableSignal } from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import type { ICommandItem } from '../models/ICommandItem';
import type { ICommandSource } from '../models/ICommandSource';
import type { ISearchProvider } from '../models/ISearchProvider';
import type { ISearchQueryOptions } from '../models/ISearchQueryOptions';
import type { ISearchResult } from '../models/ISearchResult';
import { SEARCH_ALL_QUERY } from '../models/SEARCH_ALL_QUERY';
import { SEARCH_COMMAND_SOURCE_TOKEN } from '../provider/SEARCH_COMMAND_SOURCE_TOKEN';
import { SEARCH_COMMAND_TOKEN } from '../provider/SEARCH_COMMAND_TOKEN';
import { SEARCH_CONFIG } from '../provider/SEARCH_CONFIG';
import { SEARCH_PROVIDER_TOKEN } from '../provider/SEARCH_PROVIDER_TOKEN';

// #endregion

/**
 * Environment-wide owner of the search capability: it holds the registered contributors, the
 * surface state every search view binds to, and the querying itself. It is headless — it decides
 * *that* the surface should be open, never *how* it looks.
 *
 * Exactly one instance exists per application; the per-surface state lives in `SearchSession`.
 *
 * @public
 */
@Injectable()
export class SearchManager {
    // #region Fields

    private readonly _destroyRef: DestroyRef;
    private readonly _window: Window | null;
    private readonly _hotkey: string;
    private readonly _sources: ReadonlyArray<ICommandSource>;
    private readonly _staticCommands: ReadonlyArray<ICommandItem>;
    private readonly _providers: ReadonlyArray<ISearchProvider>;
    private readonly _isOpen: WritableSignal<boolean>;
    private readonly _isFocused: WritableSignal<boolean>;
    private readonly _focusRequest: WritableSignal<number>;
    private readonly _isRouteActive: WritableSignal<boolean>;
    private readonly _activeProviderIds: WritableSignal<ReadonlyArray<string>>;
    private readonly _exclusiveProviderId: WritableSignal<string | null>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `SearchManager` class and binds the configured hotkey.
     *
     * @public
     */
    public constructor() {
        this._destroyRef = inject(DestroyRef);
        this._window = inject(DOCUMENT).defaultView;
        this._hotkey = inject(SEARCH_CONFIG, { optional: true })?.hotkey ?? '';
        this._sources = (inject(SEARCH_COMMAND_SOURCE_TOKEN, { optional: true }) ?? []).flat();
        this._staticCommands = (inject(SEARCH_COMMAND_TOKEN, { optional: true }) ?? []).flat();
        this._providers = (inject(SEARCH_PROVIDER_TOKEN, { optional: true }) ?? []).flat();
        this._isOpen = signal(false);
        this._isFocused = signal(false);
        this._focusRequest = signal(0);
        this._isRouteActive = signal(false);
        this._activeProviderIds = signal<ReadonlyArray<string>>([]);
        this._exclusiveProviderId = signal<string | null>(null);

        this.bindHotkey();
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether the result surface should be visible.
     *
     * @public
     * @readonly
     */
    public get isOpen(): Signal<boolean> {
        return this._isOpen.asReadonly();
    }

    /**
     * Indicates whether the launcher is in its expanded state. The results popup can be closed
     * while the launcher stays expanded.
     *
     * @public
     * @readonly
     */
    public get isFocused(): Signal<boolean> {
        return this._isFocused.asReadonly();
    }

    /**
     * Monotonic counter incremented on every `open()`. Surfaces watch it to move the caret into
     * their input again even when the surface was already open.
     *
     * @public
     * @readonly
     */
    public get focusRequest(): Signal<number> {
        return this._focusRequest.asReadonly();
    }

    /**
     * Indicates whether a dedicated search route is currently active. The application reports it
     * through {@link SearchManager.setRouteActive}; the engine only carries the flag so that a
     * launcher can step aside for a full-page surface.
     *
     * @public
     * @readonly
     */
    public get isRouteActive(): Signal<boolean> {
        return this._isRouteActive.asReadonly();
    }

    /**
     * All registered providers the current user may access, exclusive ones included. Provider
     * filters must skip entries whose `isExclusive` is `true`.
     *
     * @public
     * @readonly
     */
    public get providers(): ReadonlyArray<ISearchProvider> {
        return this._providers.filter((provider) => provider.canAccess?.() ?? true);
    }

    /**
     * The selected provider ids. An empty selection means "every accessible, non-exclusive
     * provider".
     *
     * @public
     * @readonly
     */
    public get activeProviderIds(): Signal<ReadonlyArray<string>> {
        return this._activeProviderIds.asReadonly();
    }

    /**
     * Id of the exclusive provider that currently replaces the ordinary result set, or `null`.
     *
     * @public
     * @readonly
     */
    public get exclusiveProviderId(): Signal<string | null> {
        return this._exclusiveProviderId.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Opens the search surface and asks it to take the caret.
     *
     * @public
     */
    public open(): void {
        this._isFocused.set(true);
        this._isOpen.set(true);
        this._focusRequest.update((value) => value + 1);
    }

    /**
     * Re-opens the results popup of an already expanded launcher. Does nothing otherwise, so a
     * blurred launcher cannot be re-opened by a late result.
     *
     * @public
     */
    public openResults(): void {
        if (!this._isFocused()) {
            return;
        }

        this._isOpen.set(true);
    }

    /**
     * Closes the results popup but keeps the launcher expanded.
     *
     * @public
     */
    public closeResults(): void {
        this._isOpen.set(false);
    }

    /**
     * Closes the search surface completely.
     *
     * @public
     */
    public close(): void {
        this._isOpen.set(false);
        this._isFocused.set(false);
    }

    /**
     * Toggles the search surface.
     *
     * @public
     */
    public toggle(): void {
        if (this._isOpen()) {
            this.close();

            return;
        }

        this.open();
    }

    /**
     * Reports whether a dedicated search route is active.
     *
     * @public
     * @param active Whether the route is active.
     */
    public setRouteActive(active: boolean): void {
        this._isRouteActive.set(active);
    }

    /**
     * Adds or removes a provider from the filter. Ids that are unknown, inaccessible or exclusive
     * are ignored, so a stale filter chip cannot empty the result set.
     *
     * @public
     * @param providerId The provider to toggle, or `null` to clear the filter.
     */
    public toggleActiveProvider(providerId: string | null): void {
        if (providerId === null) {
            this._activeProviderIds.set([]);

            return;
        }

        const selectableProviderIds = new Set(this.providers.filter((provider) => provider.isExclusive !== true).map((provider) => provider.id));

        if (!selectableProviderIds.has(providerId)) {
            return;
        }

        const currentIds = this._activeProviderIds();
        const nextIds = currentIds.includes(providerId) ? currentIds.filter((id) => id !== providerId) : [...currentIds, providerId];

        this._activeProviderIds.set(nextIds);
    }

    /**
     * Activates an exclusive provider: while it is set, only that provider is queried and the
     * ordinary provider filter is bypassed. Ids that are unknown, inaccessible or not marked
     * `isExclusive` are ignored.
     *
     * @public
     * @param providerId The exclusive provider to activate, or `null` to return to ordinary search.
     */
    public setExclusiveProvider(providerId: string | null): void {
        if (providerId === null) {
            this._exclusiveProviderId.set(null);

            return;
        }

        const isKnown = this.providers.some((provider) => provider.isExclusive === true && provider.id === providerId);

        if (!isKnown) {
            return;
        }

        this._exclusiveProviderId.set(providerId);
    }

    /**
     * Queries commands and semantic results for one query.
     *
     * @public
     * @param query The raw query; {@link SEARCH_ALL_QUERY} asks for the complete catalogue.
     * @param take Maximum number of results requested from each active provider.
     * @param options Optional progressive result delivery and cancellation.
     * @returns The commands followed by the results.
     * @throws The first provider error when every active provider failed.
     */
    public async query(query: string, take?: number, options?: ISearchQueryOptions): Promise<ReadonlyArray<ICommandItem | ISearchResult>> {
        const [commands, results] = await Promise.all([this.getCommands(query, options?.signal), this.search(query, take, options)]);

        return [...commands, ...results];
    }

    /**
     * Queries the static commands and every registered command source. Static commands are matched
     * against label, description and keywords; sources match on their own terms.
     *
     * @public
     * @param query The raw query; {@link SEARCH_ALL_QUERY} asks for the complete catalogue.
     * @param signal Cancels the request when supplied by the caller.
     * @returns The matching commands, static ones first.
     * @throws The error of the first rejecting command source.
     */
    public async getCommands(query: string, signal?: AbortSignal): Promise<ReadonlyArray<ICommandItem>> {
        signal?.throwIfAborted();

        const trimmedQuery = query.trim();
        const returnAll = trimmedQuery === SEARCH_ALL_QUERY;
        const normalizedQuery = trimmedQuery.toLowerCase();
        const sourceQuery = returnAll ? '' : trimmedQuery;

        const staticMatches = returnAll ? this._staticCommands : this._staticCommands.filter((command) => this.matches(command, normalizedQuery));
        const requests = this._sources.map(async (source) => {
            signal?.throwIfAborted();

            return signal === undefined ? source.getCommands(sourceQuery) : source.getCommands(sourceQuery, signal);
        });
        const sourcedCommands = await this.awaitAbortable(Promise.all(requests), signal);

        return [...staticMatches, ...sourcedCommands.flat()];
    }

    /**
     * Queries the active semantic providers. A provider that rejects is skipped as long as one
     * provider answered, so a single failing backend cannot empty the surface; results are stamped
     * with their provider id and deduplicated by result id.
     *
     * @public
     * @param query The raw query; {@link SEARCH_ALL_QUERY} asks for the complete catalogue.
     * @param take Maximum number of results requested from each active provider.
     * @param options Optional progressive result delivery and cancellation.
     * @returns The deduplicated results in provider order.
     * @throws The first provider error when every active provider failed.
     */
    public async search(query: string, take?: number, options: ISearchQueryOptions = {}): Promise<ReadonlyArray<ISearchResult>> {
        const { onResults, signal } = options;
        signal?.throwIfAborted();

        const trimmedQuery = query.trim();
        const providerQuery = trimmedQuery === SEARCH_ALL_QUERY ? '' : trimmedQuery;
        const requests = this.resolveActiveProviders().map(async (provider) => {
            signal?.throwIfAborted();

            const results = await (signal === undefined ? provider.search(providerQuery, take) : provider.search(providerQuery, take, signal));
            signal?.throwIfAborted();

            return results.map((result) => ({ ...result, providerId: result.providerId ?? provider.id }));
        });
        const settled = Promise.allSettled(requests);
        const completed: Array<ReadonlyArray<ISearchResult>> = [];
        const progress =
            onResults === undefined
                ? undefined
                : Promise.all(
                      requests.map((request, index) =>
                          request.then(
                              (results) => {
                                  if (signal?.aborted === true) {
                                      return;
                                  }

                                  completed[index] = results;
                                  onResults(this.mergeResults(completed));
                              },
                              () => undefined,
                          ),
                      ),
                  );
        const [outcomes] = await this.awaitAbortable(Promise.all([settled, progress]), signal);

        const fulfilled = outcomes.flatMap((outcome) => (outcome.status === 'fulfilled' ? [outcome.value] : []));

        if (fulfilled.length === 0) {
            const rejected = outcomes.find((outcome): outcome is PromiseRejectedResult => outcome.status === 'rejected');

            if (rejected !== undefined) {
                throw rejected.reason;
            }
        }

        return this.mergeResults(fulfilled);
    }

    /**
     * Hands a selected result back to the provider that owns it. The owner is resolved from the
     * longest registered `'<providerId>:'` prefix of the result id and, failing that, from its
     * `providerId`.
     *
     * @public
     * @param result The selected result.
     * @returns A promise that settles when the owning provider finished activating.
     * @throws The provider is unavailable or reported that it could not open the result.
     */
    public async activateResult(result: ISearchResult): Promise<void> {
        let prefixOwner: ISearchProvider | undefined;

        for (const candidate of this._providers) {
            if (result.id.startsWith(`${candidate.id}:`) && (prefixOwner === undefined || candidate.id.length > prefixOwner.id.length)) {
                prefixOwner = candidate;
            }
        }

        const provider = prefixOwner ?? this._providers.find((candidate) => candidate.id === result.providerId);

        if (provider === undefined || !this.resolveActiveProviders().includes(provider)) {
            throw new Error('The selected search provider is unavailable.');
        }

        if ((await provider.activate(result)) === false) {
            throw new Error('The selected search result could not be opened.');
        }
    }

    /**
     * Keeps the first result per id, using the order of the contributing providers.
     */
    private mergeResults(results: ReadonlyArray<ReadonlyArray<ISearchResult>>): ReadonlyArray<ISearchResult> {
        const uniqueResults = new Map<string, ISearchResult>();

        for (const result of results.flat()) {
            if (!uniqueResults.has(result.id)) {
                uniqueResults.set(result.id, result);
            }
        }

        return [...uniqueResults.values()];
    }

    /**
     * Settles promptly on cancellation, even if a contributor ignores the signal.
     */
    private awaitAbortable<T>(work: Promise<T>, signal?: AbortSignal): Promise<T> {
        if (signal === undefined) {
            return work;
        }

        let onAbort: () => void;
        const aborted = new Promise<never>((_, reject) => {
            onAbort = () => reject(signal.reason);
            signal.addEventListener('abort', onAbort, { once: true });

            if (signal.aborted) {
                onAbort();
            }
        });

        return Promise.race([work, aborted]).finally(() => signal.removeEventListener('abort', onAbort));
    }

    /**
     * Resolves the providers a query is dispatched to. It is evaluated per query instead of being
     * memoised, so an access decision that resolves late is honoured by the next search.
     */
    private resolveActiveProviders(): ReadonlyArray<ISearchProvider> {
        const accessibleProviders = this.providers;
        const exclusiveProviderId = this._exclusiveProviderId();

        if (exclusiveProviderId !== null) {
            return accessibleProviders.filter((provider) => provider.id === exclusiveProviderId);
        }

        const activeIds = this._activeProviderIds();
        const selectableProviders = accessibleProviders.filter((provider) => provider.isExclusive !== true);

        if (activeIds.length === 0) {
            return selectableProviders;
        }

        return selectableProviders.filter((provider) => activeIds.includes(provider.id));
    }

    /**
     * Installs the global hotkey listener. Without a configured hotkey or a window (server-side
     * rendering) nothing is bound.
     */
    private bindHotkey(): void {
        const hotkey = this._hotkey.trim().toLowerCase();

        if (hotkey.length === 0 || this._window === null) {
            return;
        }

        const subscription = fromEvent<KeyboardEvent>(this._window, 'keydown')
            .pipe(
                filter((event) => !event.defaultPrevented),
                filter((event) => !this.isEditableTarget(event.target)),
                filter((event) => this.matchesHotkey(event, hotkey)),
            )
            .subscribe((event) => {
                event.preventDefault();
                this.open();
            });

        this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    /**
     * Matches a static command against the normalized query.
     */
    private matches(command: ICommandItem, query: string): boolean {
        if (query.length === 0) {
            return true;
        }

        return `${command.label}\n${command.description ?? ''}\n${(command.keywords ?? []).join('\n')}`.toLowerCase().includes(query);
    }

    /**
     * Matches a keyboard event against the configured gesture. Modifiers the gesture does not name
     * are not required to be absent.
     */
    private matchesHotkey(event: KeyboardEvent, hotkey: string): boolean {
        const parts = hotkey.split('+');
        const key = parts[parts.length - 1] ?? '';

        return (
            (!parts.includes('meta') || event.metaKey) &&
            (!parts.includes('ctrl') || event.ctrlKey) &&
            (!parts.includes('alt') || event.altKey) &&
            (!parts.includes('shift') || event.shiftKey) &&
            event.key.toLowerCase() === key
        );
    }

    /**
     * Determines whether the event target already consumes typing. The check is structural on
     * purpose: the manager must not reach for a global `HTMLElement`.
     */
    private isEditableTarget(target: EventTarget | null): boolean {
        const element = target as { tagName?: unknown; getAttribute?: (name: string) => string | null } | null;

        if (element === null || typeof element.tagName !== 'string' || typeof element.getAttribute !== 'function') {
            return false;
        }

        const tagName = element.tagName.toLowerCase();
        const isFormField = tagName === 'input' || tagName === 'textarea' || tagName === 'select';

        return isFormField || (element.getAttribute('contenteditable') ?? 'false') !== 'false';
    }

    // #endregion
}
