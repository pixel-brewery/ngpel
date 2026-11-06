import type { Signal } from '@angular/core';
import type { Command } from '@pixel-brewery/ngpel-mvp';
import type { ActivityLogState } from './ActivityLogState';

/** State and actions of an activity log whose data source is supplied by its host. @public */
export interface IActivityLogController<T> {
    /** Entries loaded for the active scope. */
    readonly entries: Signal<ReadonlyArray<T>>;
    /** Initial request state. */
    readonly state: Signal<ActivityLogState>;
    /** Additional page request state, independent of visible entries. */
    readonly moreState: Signal<ActivityLogState>;
    /** Whether another page can be requested. */
    readonly hasMore: Signal<boolean>;
    /** Loads the first page again. */
    readonly reloadCommand: Command<void>;
    /** Requests the next page. */
    readonly loadMoreCommand: Command<void>;
    /** Resolves the stable entry key for rendering. */
    itemKey(item: T): string | number;
    /** Loads the first page on initial display. */
    ensureLoaded(): void;
    /** Adds newly recorded entries while retaining previously loaded pages. */
    refresh(): void;
}
