// #region Imports

import { assertInInjectionContext, computed, DestroyRef, effect, inject, signal, untracked } from '@angular/core';
import { command } from '@pixel-brewery/ngpel-mvp';
import { defaultIfEmpty, defer, take, type Subscription } from 'rxjs';
import type { ActivityLogState } from './ActivityLogState';
import type { IActivityLogController } from './IActivityLogController';
import type { IActivityLogControllerOptions } from './IActivityLogControllerOptions';
import type { IActivityLogPage } from './IActivityLogPage';

// #endregion

/**
 * Owns paging and cancellation for one activity view. Create in the host's injection context.
 *
 * @param options Source, stable identity, and optional reactive scope.
 * @returns The log controller.
 * @public
 */
export function createActivityLogController<T>(options: IActivityLogControllerOptions<T>): IActivityLogController<T> {
    assertInInjectionContext(createActivityLogController);
    return new ActivityLogController(options);
}

class ActivityLogController<T> implements IActivityLogController<T> {
    // #region Fields

    private readonly _entries = signal<ReadonlyArray<T>>([]);
    private readonly _state = signal<ActivityLogState>('idle');
    private readonly _moreState = signal<ActivityLogState>('idle');
    private readonly _offset = signal(0);
    private readonly _total = signal(0);
    private readonly _pageSize: number;
    private _scope: unknown;
    private _request?: Subscription;

    // #endregion

    // #region Ctor

    public constructor(private readonly _options: IActivityLogControllerOptions<T>) {
        const requestedSize = _options.pageSize ?? 100;
        this._pageSize = Number.isFinite(requestedSize) ? Math.max(1, Math.trunc(requestedSize)) : 100;
        this._scope = _options.scope?.();
        if (_options.scope) {
            effect(() => {
                const scope = _options.scope?.();
                untracked(() => this.changeScope(scope));
            });
        }
        inject(DestroyRef).onDestroy(() => this._request?.unsubscribe());
    }

    // #endregion

    // #region Properties

    public readonly entries = this._entries.asReadonly();
    public readonly state = this._state.asReadonly();
    public readonly moreState = this._moreState.asReadonly();
    public readonly hasMore = computed(() => this._offset() < this._total());
    public readonly reloadCommand = command(() => this.load());
    public readonly loadMoreCommand = command(() => this.loadMore());

    // #endregion

    // #region Methods

    public itemKey(item: T): string | number {
        return this._options.itemKey(item);
    }

    public ensureLoaded(): void {
        if (this._state() === 'idle') {
            this.load();
        }
    }

    public refresh(): void {
        if (this._state() === 'idle') {
            return;
        }
        if (this._state() !== 'loaded') {
            this.load();
            return;
        }

        this._moreState.set('idle');
        this.request(
            0,
            (page) => {
                const oldEntries = this._entries();
                const first = this.unique(page.items);
                const freshKeys = new Set(first.map((item) => this.itemKey(item)));
                const older = oldEntries.filter((item) => !freshKeys.has(this.itemKey(item)));
                this._entries.set([...first, ...older]);
                this._offset.set(Math.max(page.items.length, this._offset() + first.length + older.length - oldEntries.length));
                this._total.set(Math.max(this._offset(), page.total));
            },
            () => undefined,
        );
    }

    private load(): void {
        this._state.set('loading');
        this._moreState.set('idle');
        this.request(
            0,
            (page) => {
                this._entries.set(this.unique(page.items));
                this._offset.set(page.items.length);
                this._total.set(page.items.length === 0 ? 0 : page.total);
                this._state.set('loaded');
            },
            () => {
                this._entries.set([]);
                this._offset.set(0);
                this._total.set(0);
                this._state.set('failed');
            },
        );
    }

    private loadMore(): void {
        if (this._state() !== 'loaded' || this._moreState() === 'loading' || !this.hasMore()) {
            return;
        }
        this._moreState.set('loading');
        this.request(
            this._offset(),
            (page) => {
                this._entries.update((entries) => this.unique([...entries, ...page.items]));
                this._offset.update((offset) => offset + page.items.length);
                this._total.set(page.items.length === 0 ? this._offset() : page.total);
                this._moreState.set('idle');
            },
            () => this._moreState.set('failed'),
        );
    }

    private request(offset: number, accept: (page: IActivityLogPage<T>) => void, fail: () => void): void {
        this._request?.unsubscribe();
        this._request = defer(() => this._options.loadPage(offset, this._pageSize))
            .pipe(take(1), defaultIfEmpty({ items: [], total: offset }))
            .subscribe({ next: accept, error: fail });
    }

    private unique(items: ReadonlyArray<T>): ReadonlyArray<T> {
        const keys = new Set<string | number>();
        return items.filter((item) => {
            const key = this.itemKey(item);
            if (keys.has(key)) {
                return false;
            }
            keys.add(key);
            return true;
        });
    }

    private changeScope(scope: unknown): void {
        if (Object.is(scope, this._scope)) {
            return;
        }
        this._scope = scope;
        this._request?.unsubscribe();
        this._entries.set([]);
        this._offset.set(0);
        this._total.set(0);
        if (this._state() !== 'idle') {
            this.load();
        }
    }

    // #endregion
}
