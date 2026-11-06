// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';

// #endregion

/**
 * A strictly typed busy scope holding multiple named busy states, each with its own nested
 * counter (enter/exit). All signals are created up front, so the scope is ready to bind to
 * templates immediately after construction.
 *
 * @typeParam TState String union of the allowed state names.
 * @public
 */
export class BusyScope<TState extends string> {
    // #region Fields

    private readonly _scopeName: string;
    private readonly _counts: Map<TState, WritableSignal<number>>;
    private readonly _busyFlags: Map<TState, Signal<boolean>>;
    private readonly _stateNames: Signal<ReadonlyArray<TState>>;
    private readonly _isBusy: Signal<boolean>;
    private readonly _busyRecord: Signal<Record<TState, boolean>>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `BusyScope` class with a fixed set of allowed states.
     *
     * @public
     * @param allowedStates The only allowed state names for this scope.
     * @param scopeName Optional name for diagnostics.
     * @throws Error when no state is provided.
     */
    public constructor(allowedStates: ReadonlyArray<TState>, scopeName?: string) {
        if (!allowedStates || allowedStates.length === 0) {
            throw new Error('BusyScope requires at least one allowed state.');
        }

        this._scopeName = scopeName ?? 'scope';
        this._counts = new Map<TState, WritableSignal<number>>();
        this._busyFlags = new Map<TState, Signal<boolean>>();

        for (const state of allowedStates) {
            const counter = signal(0);
            this._counts.set(state, counter);
            this._busyFlags.set(
                state,
                computed(() => counter() > 0),
            );
        }

        const names: ReadonlyArray<TState> = Array.from(this._counts.keys());
        this._stateNames = signal(names).asReadonly();
        this._isBusy = computed(() => names.some((name) => this.busy(name)()));
        this._busyRecord = computed(() => {
            const record = {} as Record<TState, boolean>;
            for (const name of names) {
                record[name] = this.busy(name)();
            }

            return record;
        });
    }

    // #endregion

    // #region Properties

    /**
     * The diagnostic name of this scope.
     *
     * @public
     */
    public get scopeName(): string {
        return this._scopeName;
    }

    /**
     * The allowed state names in registration order.
     *
     * @public
     */
    public get stateNames(): Signal<ReadonlyArray<TState>> {
        return this._stateNames;
    }

    /**
     * `true` while at least one state is busy.
     *
     * @public
     */
    public get isBusy(): Signal<boolean> {
        return this._isBusy;
    }

    /**
     * A record of every state and its busy flag.
     *
     * @public
     */
    public get busyRecord(): Signal<Record<TState, boolean>> {
        return this._busyRecord;
    }

    // #endregion

    // #region Methods

    /**
     * Marks the beginning of the specified busy state by incrementing its nested counter.
     *
     * @public
     * @param state One of the allowed state names.
     */
    public enter(state: TState): void {
        this.ensureState(state).update((count) => count + 1);
    }

    /**
     * Marks the end of the specified busy state by decrementing its nested counter (never below zero).
     *
     * @public
     * @param state One of the allowed state names.
     */
    public exit(state: TState): void {
        this.ensureState(state).update((count) => Math.max(0, count - 1));
    }

    /**
     * Resets the specified state to not busy, or resets all states when `state` is omitted.
     *
     * @public
     * @param state Optional state to reset.
     */
    public reset(state?: TState): void {
        if (state !== undefined) {
            this.ensureState(state).set(0);
            return;
        }

        for (const counter of this._counts.values()) {
            counter.set(0);
        }
    }

    /**
     * Returns the stable, memoized busy flag for the given state.
     *
     * @public
     * @param state One of the allowed state names.
     * @returns A signal that is `true` while the state counter is greater than zero.
     */
    public busy(state: TState): Signal<boolean> {
        const flag = this._busyFlags.get(state);
        if (!flag) {
            throw this.invalidState(state);
        }

        return flag;
    }

    /**
     * Returns the nested counter signal for a given state.
     *
     * @public
     * @param state One of the allowed state names.
     * @returns A signal representing the current nesting depth.
     */
    public countOf(state: TState): Signal<number> {
        return this.ensureState(state).asReadonly();
    }

    /**
     * Produces a computed flag that becomes `true` if any of the provided states is busy.
     *
     * @public
     * @param states The states to aggregate.
     * @returns A signal that is `true` when any listed state is busy.
     */
    public aggregate(states: ReadonlyArray<TState> | ReadonlySet<TState>): Signal<boolean> {
        const names = Array.from(states);

        return computed(() => names.some((name) => this.busy(name)()));
    }

    /**
     * Convenience alias for {@link BusyScope.aggregate}.
     *
     * @public
     * @param states The states to check.
     * @returns A signal that is `true` when any listed state is busy.
     */
    public any(states: ReadonlyArray<TState> | ReadonlySet<TState>): Signal<boolean> {
        return this.aggregate(states);
    }

    /**
     * Produces a computed flag that becomes `true` only if all of the provided states are busy.
     *
     * @public
     * @param states The states to check.
     * @returns A signal that is `true` when every listed state is busy (and the list is not empty).
     */
    public all(states: ReadonlyArray<TState> | ReadonlySet<TState>): Signal<boolean> {
        const names = Array.from(states);

        return computed(() => names.length > 0 && names.every((name) => this.busy(name)()));
    }

    private ensureState(state: TState): WritableSignal<number> {
        const counter = this._counts.get(state);
        if (!counter) {
            throw this.invalidState(state);
        }

        return counter;
    }

    private invalidState(state: TState): Error {
        const allowed = this._stateNames().join(', ');

        return new Error(`[BusyScope:${this._scopeName}] Invalid state '${String(state)}'. Allowed: ${allowed}`);
    }

    // #endregion
}
