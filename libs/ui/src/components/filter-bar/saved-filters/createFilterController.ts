// #region Imports

import { inject, signal, type Signal, type WritableSignal } from '@angular/core';
import { JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE, type IUserPreferenceStorage } from '@pixel-brewery/ngpel-core/storage';
import { command, type Command, type IPresenterControllerHostRef } from '@pixel-brewery/ngpel-mvp';
import type { FilterValues } from '../IFilterDefinition';
import type { IFilterController } from './IFilterController';
import type { IFilterControllerConfig } from './IFilterControllerConfig';
import type { ISavedFilter } from './ISavedFilter';
import type { ISavedFilterController } from './ISavedFilterController';
import type { ISavedFilterCreateRequest } from './ISavedFilterCreateRequest';
import { createSavedFilterController } from './createSavedFilterController';

// #endregion

type LiveFilterState =
    { readonly version: 1 | 3; readonly values: FilterValues } | { readonly version: 2; readonly values: FilterValues; readonly isVisible: boolean };

const LIVE_FILTER_VERSION = 3;
const LIVE_FILTER_CODEC = new JsonUserPreferenceCodec<LiveFilterState>(isLiveFilterState);

/**
 * Internal implementation of the list filter controller.
 *
 * @internal
 */
class FilterController implements IFilterController {
    // #region Fields

    private readonly _host: IPresenterControllerHostRef;
    private readonly _config: IFilterControllerConfig;
    private readonly _isFilterVisible: WritableSignal<boolean>;
    private readonly _storage?: IUserPreferenceStorage;
    private readonly _savedFilterController: ISavedFilterController;
    private readonly _toggleFilterCommand: Command<void>;
    private readonly _closeFilterCommand: Command<void>;
    private readonly _applyFilterCommand: Command<FilterValues>;
    private readonly _saveFilterCommand: Command<ISavedFilterCreateRequest>;
    private readonly _deleteFilterCommand: Command<string>;
    private readonly _applySavedFilterCommand: Command<string>;

    // #endregion

    // #region Ctor

    public constructor(host: IPresenterControllerHostRef, config: IFilterControllerConfig) {
        this._host = host;
        this._config = config;
        const live = config.livePreference;
        this._storage = live ? inject(USER_PREFERENCE_STORAGE) : undefined;
        const previous = live && this._storage?.read(live.storageKey, LIVE_FILTER_CODEC);
        this._isFilterVisible = signal(Boolean(live?.openWhenActive && previous && Object.keys(previous.values).length > 0));

        this._savedFilterController = createSavedFilterController({
            storageKey: config.savedFilterStorageKey,
        });
        this._toggleFilterCommand = command(() => this.onExecuteToggleCommand());
        this._closeFilterCommand = command(() => this.onExecuteCloseCommand());
        this._applyFilterCommand = command((values?: FilterValues) => this.onExecuteApplyFilterCommand(values ?? {}));
        this._saveFilterCommand = command((request?: ISavedFilterCreateRequest) => this.onExecuteSaveFilterCommand(request));
        this._deleteFilterCommand = command((id?: string) => this.onExecuteDeleteFilterCommand(id));
        this._applySavedFilterCommand = command((id?: string) => this.onExecuteApplySavedFilterCommand(id));

        if (live && previous) {
            live.restoreValues(previous.values);
        }
    }

    // #endregion

    // #region Properties

    /** @inheritdoc */
    public get host(): IPresenterControllerHostRef {
        return this._host;
    }

    /** @inheritdoc */
    public get activeFilters(): Signal<FilterValues> {
        return this._config.activeFilters;
    }

    /** @inheritdoc */
    public get isFilterVisible(): Signal<boolean> {
        return this._isFilterVisible.asReadonly();
    }

    /** @inheritdoc */
    public get isFilterActive(): Signal<boolean> {
        return this._config.isFilterActive;
    }

    /** @inheritdoc */
    public get savedFilters(): Signal<ReadonlyArray<ISavedFilter>> {
        return this._savedFilterController.savedFilters;
    }

    /** @inheritdoc */
    public get toggleFilterCommand(): Command<void> {
        return this._toggleFilterCommand;
    }

    /** @inheritdoc */
    public get closeFilterCommand(): Command<void> {
        return this._closeFilterCommand;
    }

    /** @inheritdoc */
    public get applyFilterCommand(): Command<FilterValues> {
        return this._applyFilterCommand;
    }

    /** @inheritdoc */
    public get saveFilterCommand(): Command<ISavedFilterCreateRequest> {
        return this._saveFilterCommand;
    }

    /** @inheritdoc */
    public get applySavedFilterCommand(): Command<string> {
        return this._applySavedFilterCommand;
    }

    /** @inheritdoc */
    public get deleteSavedFilterCommand(): Command<string> {
        return this._deleteFilterCommand;
    }

    // #endregion

    // #region Methods

    private onExecuteToggleCommand(): void {
        this._isFilterVisible.update((visible) => !visible);
    }

    private onExecuteCloseCommand(): void {
        this._isFilterVisible.set(false);
    }

    private onExecuteDeleteFilterCommand(id?: string): void {
        if (!id) {
            return;
        }

        this._savedFilterController.remove(id);
    }

    private onExecuteApplyFilterCommand(values: FilterValues): void {
        this._config.applyFilterValues(values);

        const key = this._config.livePreference?.storageKey;
        if (key === undefined || !this._storage) {
            return;
        }

        if (Object.keys(values).length === 0) {
            this._storage.remove(key);
        } else {
            this._storage.write(key, { version: LIVE_FILTER_VERSION, values }, LIVE_FILTER_CODEC);
        }
    }

    private onExecuteSaveFilterCommand(request?: ISavedFilterCreateRequest): void {
        if (!request) {
            return;
        }

        this._savedFilterController.save(request.name, request.values);
    }

    private onExecuteApplySavedFilterCommand(id?: string): void {
        if (!id) {
            return;
        }

        const savedFilter = this._savedFilterController.find(id);

        if (!savedFilter) {
            return;
        }

        this._isFilterVisible.set(true);
        this.onExecuteApplyFilterCommand(savedFilter.values);
    }

    // #endregion
}

/**
 * Creates the shared controller for list filter interactions.
 *
 * @param config - Controller configuration.
 * @public
 */
export function createFilterController(config: IFilterControllerConfig): (host: IPresenterControllerHostRef) => IFilterController {
    return (host: IPresenterControllerHostRef): IFilterController => new FilterController(host, config);
}

function isLiveFilterState(value: unknown): value is LiveFilterState {
    if (!isRecord(value) || !isRecord(value['values'])) {
        return false;
    }

    return value['version'] === 1 || value['version'] === LIVE_FILTER_VERSION || (value['version'] === 2 && typeof value['isVisible'] === 'boolean');
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
