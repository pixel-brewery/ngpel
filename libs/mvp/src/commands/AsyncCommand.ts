// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { LoadingRef } from '../refs/LoadingRef';
import type { Command } from './Command';
import type { LoadingRefSource } from './LoadingRefSource';
import { resolveLoadingRef } from './resolveLoadingRef';

// #endregion

/**
 * A fire-and-forget asynchronous {@link Command}: the handler starts synchronously, the command stays
 * non-executable while the returned promise is pending and rejections are consumed silently.
 *
 * @remarks
 * Use {@link AsyncAwaitCommand} when the view needs the result or the error of the last execution.
 *
 * @typeParam T The parameter type passed to {@link Command.execute}.
 * @public
 */
export type AsyncCommand<T = unknown> = Command<T> & {
    // #region Properties

    /**
     * Indicates whether the asynchronous handler is currently running.
     */
    readonly isExecuting: Signal<boolean>;

    // #endregion
};

/**
 * Asynchronous command implementation behind {@link asyncCommand}.
 */
class AsyncCommandImpl<T> implements AsyncCommand<T> {
    // #region Fields

    private readonly _execute: (parameter: T) => Promise<void>;
    private readonly _loadingRef: LoadingRef | undefined;
    private readonly _isExecuting: WritableSignal<boolean>;
    private readonly _canExecute: Signal<boolean>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AsyncCommandImpl` class.
     *
     * @param execute The asynchronous handler.
     * @param canExecute Optional gate signal combined with the re-entrancy guard.
     * @param loadingRef Optional loading ref entered while the handler runs.
     */
    public constructor(execute: (parameter: T) => Promise<void>, canExecute?: Signal<boolean>, loadingRef?: LoadingRef) {
        this._execute = execute;
        this._loadingRef = loadingRef;
        this._isExecuting = signal(false);
        this._canExecute = computed(() => (canExecute?.() ?? true) && !this._isExecuting());
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether the command can currently be executed.
     *
     * @public
     */
    public get canExecute(): Signal<boolean> {
        return this._canExecute;
    }

    /**
     * Indicates whether the asynchronous handler is currently running.
     *
     * @public
     */
    public get isExecuting(): Signal<boolean> {
        return this._isExecuting.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Starts the handler synchronously when the gate allows it and tracks its completion.
     *
     * @public
     * @param parameter The parameter handed to the handler.
     */
    public execute(parameter: T): void {
        if (!this._canExecute()) {
            return;
        }

        this._isExecuting.set(true);
        this._loadingRef?.enter();

        this.start(parameter)
            .catch(() => {
                // Fire-and-forget: rejections are consumed. Use asyncAwaitCommand() to observe them.
            })
            .finally(() => {
                this._loadingRef?.leave();
                this._isExecuting.set(false);
            });
    }

    /**
     * Invokes the handler and folds a synchronous throw into the promise chain so the executing state
     * and the loading ref always unwind.
     */
    private start(parameter: T): Promise<void> {
        try {
            return this._execute(parameter);
        } catch (error: unknown) {
            return Promise.reject(error);
        }
    }

    // #endregion
}

/**
 * Creates a fire-and-forget {@link AsyncCommand}. Co-located with the type because a separate
 * `asyncCommand.ts` would collide with `AsyncCommand.ts` on case-insensitive file systems.
 *
 * @public
 * @typeParam T The parameter type of the command.
 * @param execute The asynchronous handler; it starts synchronously inside {@link Command.execute}.
 * @param canExecute Optional gate signal; the command is additionally blocked while executing.
 * @param loadingRef Optional {@link LoadingRefSource} entered for the duration of the handler.
 * @returns A new asynchronous command.
 */
export function asyncCommand<T = unknown>(
    execute: (parameter: T) => Promise<void>,
    canExecute?: Signal<boolean>,
    loadingRef?: LoadingRefSource,
): AsyncCommand<T> {
    return new AsyncCommandImpl<T>(execute, canExecute, resolveLoadingRef(loadingRef));
}
