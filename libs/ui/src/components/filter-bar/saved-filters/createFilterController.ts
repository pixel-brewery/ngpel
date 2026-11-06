// #region Imports

import { signal, type Signal, type WritableSignal } from '@angular/core';
import { command, type Command, type IPresenterControllerHostRef, type IViewPresenter } from '@pixel-brewery/ngpel-mvp';
import type { FilterValues } from '../IFilterDefinition';
import type { IFilterController } from './IFilterController';
import type { ISavedFilter } from './ISavedFilter';
import type { ISavedFilterController } from './ISavedFilterController';
import type { ISavedFilterCreateRequest } from './ISavedFilterCreateRequest';
import { createSavedFilterController } from './createSavedFilterController';

// #endregion

/**
 * Configuration for {@link createFilterController}.
 *
 * @public
 */
export interface IFilterControllerConfig {
    /**
     * Stable preference key used for named saved filters.
     */
    readonly savedFilterStorageKey: string;

    /**
     * Active filter values owned by the concrete list presenter.
     */
    readonly activeFilters: Signal<FilterValues>;

    /**
     * Whether a filter is active.
     */
    readonly isFilterActive: Signal<boolean>;

    /**
     * Applies filter values in the concrete list presenter.
     */
    readonly applyFilterValues: (values: FilterValues) => void;
}

/**
 * Internal implementation of the list filter controller.
 *
 * @internal
 */
class FilterController implements IFilterController {
    // #region Fields

    private readonly _host: IPresenterControllerHostRef;
    private readonly _config: IFilterControllerConfig;
    private readonly _isFilterVisible: WritableSignal<boolean> = signal(false);
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
        this._savedFilterController = createSavedFilterController({
            storageKey: config.savedFilterStorageKey,
        });
        this._toggleFilterCommand = command(() => this.onExecuteToggleCommand());
        this._closeFilterCommand = command(() => this.onExecuteCloseCommand());
        this._applyFilterCommand = command((values?: FilterValues) => this.onExecuteApplyFilterCommand(values ?? {}));
        this._saveFilterCommand = command((request?: ISavedFilterCreateRequest) => this.onExecuteSaveFilterCommand(request));
        this._deleteFilterCommand = command((id?: string) => this.onExecuteDeleteFilterCommand(id));
        this._applySavedFilterCommand = command((id?: string) => this.onExecuteApplySavedFilterCommand(id));
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
