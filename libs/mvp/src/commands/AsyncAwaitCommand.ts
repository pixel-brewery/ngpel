// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { LoadingRef } from '../refs/LoadingRef';
import type { Command } from './Command';
import type { LoadingRefSource } from './LoadingRefSource';
import { resolveLoadingRef } from './resolveLoadingRef';

// #endregion

/**
 * An asynchronous {@link Command} that captures the outcome of its last execution into the `result`
 * and `error` signals.
 *
 * @remarks
 * Extends the fire-and-forget {@link AsyncCommand} contract: the handler starts synchronously, the
 * command is blocked while pending, and a rejection lands in `error` instead of being swallowed.
 *
 * @typeParam T The parameter type passed to {@link Command.execute}.
 * @typeParam R The result type returned by the handler.
 * @public
 */
export type AsyncAwaitCommand<T = void, R = unknown> = Command<T> & {
    // #region Properties

    /**
     * Indicates whether the asynchronous handler is currently running.
     */
    readonly isExecuting: Signal<boolean>;

    /**
     * The result of the last successful execution; resets to `null` when the next execution fails.
     */
    readonly result: Signal<R | null>;

    /**
     * The error of the last failed execution; resets to `null` when the next execution succeeds.
     * Non-`Error` rejections are wrapped in an `Error` whose message is their string form.
     */
    readonly error: Signal<Error | null>;

    // #endregion
};

/**
 * Result-capturing asynchronous command implementation behind {@link asyncAwaitCommand}.
 */
class AsyncAwaitCommandImpl<T, R> implements AsyncAwaitCommand<T, R> {
    // #region Fields

    private readonly _execute: (parameter: T) => Promise<R>;
    private readonly _loadingRef: LoadingRef | undefined;
    private readonly _result: WritableSignal<R | null>;
    private readonly _error: WritableSignal<Error | null>;
    private readonly _isExecuting: WritableSignal<boolean>;
    private readonly _canExecute: Signal<boolean>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AsyncAwaitCommandImpl` class.
     *
     * @param execute The asynchronous handler producing the result.
     * @param canExecute Optional gate signal combined with the re-entrancy guard.
     * @param loadingRef Optional loading ref entered while the handler runs.
     */
    public constructor(execute: (parameter: T) => Promise<R>, canExecute?: Signal<boolean>, loadingRef?: LoadingRef) {
        this._execute = execute;
        this._loadingRef = loadingRef;
        this._result = signal<R | null>(null);
        this._error = signal<Error | null>(null);
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

    /**
     * The result of the last successful execution.
     *
     * @public
     */
    public get result(): Signal<R | null> {
        return this._result.asReadonly();
    }

    /**
     * The error of the last failed execution.
     *
     * @public
     */
    public get error(): Signal<Error | null> {
        return this._error.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Starts the handler synchronously when the gate allows it and captures its outcome.
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
            .then((result) => {
                this._error.set(null);
                this._result.set(result);
            })
            .catch((error: unknown) => {
                this._result.set(null);
                this._error.set(error instanceof Error ? error : new Error(String(error)));
            })
            .finally(() => {
                this._loadingRef?.leave();
                this._isExecuting.set(false);
            });
    }

    /**
     * Invokes the handler and folds a synchronous throw into the promise chain so it is reported through
     * `error` like any rejection.
     */
    private start(parameter: T): Promise<R> {
        try {
            return this._execute(parameter);
        } catch (error: unknown) {
            return Promise.reject(error);
        }
    }

    // #endregion
}

/**
 * Creates a result-capturing {@link AsyncAwaitCommand}. Co-located with the type because a separate
 * `asyncAwaitCommand.ts` would collide with `AsyncAwaitCommand.ts` on case-insensitive file systems.
 *
 * @public
 * @typeParam T The parameter type of the command.
 * @typeParam R The result type of the handler.
 * @param execute The asynchronous handler returning the result; it starts synchronously inside {@link Command.execute}.
 * @param canExecute Optional gate signal; the command is additionally blocked while executing.
 * @param loadingRef Optional {@link LoadingRefSource} entered for the duration of the handler.
 * @returns A new result-capturing asynchronous command.
 */
export function asyncAwaitCommand<T = void, R = unknown>(
    execute: (parameter: T) => Promise<R>,
    canExecute?: Signal<boolean>,
    loadingRef?: LoadingRefSource,
): AsyncAwaitCommand<T, R> {
    return new AsyncAwaitCommandImpl<T, R>(execute, canExecute, resolveLoadingRef(loadingRef));
}
