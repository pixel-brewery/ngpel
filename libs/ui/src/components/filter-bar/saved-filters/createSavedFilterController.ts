// #region Imports

import { assertInInjectionContext, inject, signal } from '@angular/core';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import type { FilterValues } from '../IFilterDefinition';
import type { ISavedFilterController } from './ISavedFilterController';
import type { ISavedFilter } from './ISavedFilter';
import type { ISavedFilterPreferenceState } from './ISavedFilterPreferenceState';

// #endregion

// #region Models

/**
 * Configuration for {@link createSavedFilterController}.
 *
 * @public
 */
export interface ISavedFilterControllerConfig {
    /**
     * Stable preference key for the owning view.
     */
    readonly storageKey: string;
}

// #endregion

// #region Constants

const SAVED_FILTER_PREFERENCE_VERSION = 1;

const SAVED_FILTER_PREFERENCE_CODEC = new JsonUserPreferenceCodec<ISavedFilterPreferenceState>(isSavedFilterPreferenceState);

// #endregion

/**
 * Creates a local-storage backed saved filter controller.
 *
 * @param config - Controller configuration.
 * @public
 */
export function createSavedFilterController(config: ISavedFilterControllerConfig): ISavedFilterController {
    assertInInjectionContext(createSavedFilterController);

    const storage = inject<IUserPreferenceStorage>(USER_PREFERENCE_STORAGE);
    const initialState = storage.read(config.storageKey, SAVED_FILTER_PREFERENCE_CODEC);
    const savedFilters = signal<ReadonlyArray<ISavedFilter>>(initialState?.filters ?? []);

    const persist = (filters: ReadonlyArray<ISavedFilter>): void => persistSavedFilters(storage, config.storageKey, filters);

    return {
        savedFilters: savedFilters.asReadonly(),

        save(name: string, values: FilterValues): ISavedFilter | undefined {
            const normalizedName = name.trim();

            if (!normalizedName || Object.keys(values).length === 0) {
                return undefined;
            }

            const now = new Date().toISOString();
            const existing = savedFilters().find((savedFilter) => savedFilter.name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase());
            const savedFilter: ISavedFilter = {
                id: existing?.id ?? createSavedFilterId(normalizedName),
                name: normalizedName,
                values,
                createdAt: existing?.createdAt ?? now,
                updatedAt: now,
            };
            const nextFilters = existing
                ? savedFilters().map((filter) => (filter.id === existing.id ? savedFilter : filter))
                : [...savedFilters(), savedFilter];

            savedFilters.set(nextFilters);
            persist(nextFilters);

            return savedFilter;
        },

        remove(id: string): void {
            const nextFilters = savedFilters().filter((savedFilter) => savedFilter.id !== id);

            savedFilters.set(nextFilters);
            persist(nextFilters);
        },

        find(id: string): ISavedFilter | undefined {
            return savedFilters().find((savedFilter) => savedFilter.id === id);
        },
    };
}

function persistSavedFilters(storage: IUserPreferenceStorage, key: string, filters: ReadonlyArray<ISavedFilter>): void {
    if (filters.length === 0) {
        storage.remove(key);
        return;
    }

    storage.write(
        key,
        {
            version: SAVED_FILTER_PREFERENCE_VERSION,
            filters,
        },
        SAVED_FILTER_PREFERENCE_CODEC,
    );
}

function createSavedFilterId(name: string): string {
    const slug = name
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return `saved-filter-${slug || 'filter'}-${Date.now()}`;
}

function isSavedFilterPreferenceState(value: unknown): value is ISavedFilterPreferenceState {
    return isRecord(value) && value['version'] === SAVED_FILTER_PREFERENCE_VERSION && Array.isArray(value['filters']) && value['filters'].every(isSavedFilter);
}

function isSavedFilter(value: unknown): value is ISavedFilter {
    return (
        isRecord(value) &&
        typeof value['id'] === 'string' &&
        typeof value['name'] === 'string' &&
        isRecord(value['values']) &&
        typeof value['createdAt'] === 'string' &&
        typeof value['updatedAt'] === 'string'
    );
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}
