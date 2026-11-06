// #region Imports

import type { DayOfWeek, SchedulerView } from '@pixel-brewery/mosaik-elements-foundation';
import { CollectionViewKind } from '../../core/CollectionViewKind';
import type { ICollectionViewDefinition } from '../../core/ICollectionViewDefinition';

// #endregion

/**
 * Configuration for the calendar projection of a collection view.
 *
 * @public
 */
export interface ICollectionCalendarViewConfig<TItem, TView extends string> extends ICollectionViewDefinition<TView> {
    /**
     * Discriminator used by the collection-view factory.
     */
    readonly viewKind: typeof CollectionViewKind.Calendar;

    /**
     * Resolves a unique key for the scheduler event.
     */
    readonly eventKey: (item: TItem) => string;

    /**
     * Resolves the start date/time for the scheduler event.
     */
    readonly eventStart: (item: TItem) => Date;

    /**
     * Resolves the end date/time for the scheduler event.
     */
    readonly eventEnd: (item: TItem) => Date;

    /**
     * Resolves the display title for the scheduler event.
     */
    readonly eventTitle: (item: TItem) => string;

    /**
     * Resolves optional content for the scheduler event.
     */
    readonly eventContent?: (item: TItem) => string | undefined;

    /**
     * Resolves the visual variant for the scheduler event.
     */
    readonly eventVariant?: (item: TItem) => string | undefined;

    /**
     * Resolves the event status for the scheduler event.
     */
    readonly eventStatus?: (item: TItem) => string | undefined;

    /**
     * Resolves whether the item is an all-day event.
     */
    readonly eventAllDay?: (item: TItem) => boolean;

    /**
     * Default scheduler view mode.
     */
    readonly schedulerView?: SchedulerView;

    /**
     * First visible hour in timeGrid view.
     */
    readonly hourStart?: number;

    /**
     * Last visible hour in timeGrid view.
     */
    readonly hourEnd?: number;

    /**
     * Time slot step in minutes.
     */
    readonly stepMinutes?: number;

    /**
     * First day of the week.
     */
    readonly firstDayOfWeek?: DayOfWeek;

    /**
     * Whether to highlight the current day.
     */
    readonly isTodayHighlighted?: boolean;

    /**
     * Whether to highlight weekends.
     */
    readonly isWeekendHighlighted?: boolean;
}
