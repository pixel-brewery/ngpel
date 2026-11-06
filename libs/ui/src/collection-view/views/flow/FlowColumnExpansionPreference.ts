// #region Imports

import { computed, type Signal } from '@angular/core';
import { jsonCodec, localStorageSignal, type LocalStorageSignal } from '@pixel-brewery/ngpel-core/storage';

// #endregion

/**
 * Persistent expanded state for the columns of one flow board.
 *
 * @public
 */
export interface IFlowColumnExpansionPreference<TColumnKey extends string = string> {
    /**
     * Resolves whether one known column is expanded.
     */
    readonly isColumnExpanded: (columnKey: TColumnKey) => boolean;

    /**
     * Applies a column expansion change emitted by the board.
     */
    readonly onColumnExpansionChanged: (change: unknown) => void;
}

interface IFlowColumnExpansionChange {
    readonly columnKey: string;
    readonly isExpanded: boolean;
}

/**
 * Creates a local-storage-backed flow-column expansion preference.
 *
 * Collapsed keys are persisted instead of expanded keys so newly introduced
 * columns remain expanded by default.
 *
 * @param storageKey - Stable local-storage key for this board.
 * @param columnKeys - Complete ordered set of supported column keys.
 * @returns Persistent column expansion state.
 *
 * @public
 */
export function createFlowColumnExpansionPreference<TColumnKey extends string>(
    storageKey: string,
    columnKeys: ReadonlyArray<TColumnKey>,
): IFlowColumnExpansionPreference<TColumnKey> {
    return new FlowColumnExpansionPreference(storageKey, columnKeys);
}

class FlowColumnExpansionPreference<TColumnKey extends string> implements IFlowColumnExpansionPreference<TColumnKey> {
    // #region Fields

    private readonly _columnKeys: ReadonlyArray<TColumnKey>;
    private readonly _columnKeySet: ReadonlySet<string>;
    private readonly _collapsedColumnKeysStorage: LocalStorageSignal<ReadonlyArray<string>>;
    private readonly _collapsedColumnKeys: Signal<ReadonlySet<string>>;

    // #endregion

    // #region Ctor

    public constructor(storageKey: string, columnKeys: ReadonlyArray<TColumnKey>) {
        this._columnKeys = [...columnKeys];
        this._columnKeySet = new Set<string>(columnKeys);
        this._collapsedColumnKeysStorage = localStorageSignal(storageKey, jsonCodec<ReadonlyArray<string>>(isStringArray));
        this._collapsedColumnKeys = computed(
            () => new Set<string>((this._collapsedColumnKeysStorage() ?? []).filter((columnKey) => this._columnKeySet.has(columnKey))),
        );
    }

    // #endregion

    // #region Methods

    public readonly isColumnExpanded = (columnKey: TColumnKey): boolean => !this._collapsedColumnKeys().has(columnKey);

    public readonly onColumnExpansionChanged = (change: unknown): void => {
        if (!isFlowColumnExpansionChange(change) || !this._columnKeySet.has(change.columnKey)) {
            return;
        }

        const currentlyExpanded = !this._collapsedColumnKeys().has(change.columnKey);

        if (currentlyExpanded === change.isExpanded) {
            return;
        }

        const collapsedColumnKeys = new Set<string>(this._collapsedColumnKeys());

        if (change.isExpanded) {
            collapsedColumnKeys.delete(change.columnKey);
        } else {
            collapsedColumnKeys.add(change.columnKey);
        }

        this._collapsedColumnKeysStorage.set(this._columnKeys.filter((columnKey) => collapsedColumnKeys.has(columnKey)));
    };

    // #endregion
}

function isFlowColumnExpansionChange(candidate: unknown): candidate is IFlowColumnExpansionChange {
    if (typeof candidate !== 'object' || candidate === null) {
        return false;
    }

    const change = candidate as Partial<IFlowColumnExpansionChange>;

    return typeof change.columnKey === 'string' && typeof change.isExpanded === 'boolean';
}

function isStringArray(candidate: unknown): candidate is ReadonlyArray<string> {
    return Array.isArray(candidate) && candidate.every((value) => typeof value === 'string');
}
