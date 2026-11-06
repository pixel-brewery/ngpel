// #region Imports

import { computed, type Signal } from '@angular/core';

// #endregion

/**
 * A WPF-style command: a reactive `canExecute` gate paired with a synchronous `execute`.
 *
 * @remarks
 * `execute` invokes the handler synchronously in the caller's turn, so parameters that are only valid
 * during the triggering event (a `FileList`, a `DataTransfer`) are captured before the browser recycles
 * them. Creating a command needs no Angular injection context.
 *
 * @typeParam T The parameter type passed to {@link Command.execute}.
 * @public
 */
export type Command<T = void> = {
    // #region Properties

    /**
     * Indicates whether the command can currently be executed.
     */
    readonly canExecute: Signal<boolean>;

    // #endregion

    // #region Methods

    /**
     * Executes the command when {@link Command.canExecute} is `true`; otherwise does nothing.
     *
     * @param parameter The parameter handed to the handler.
     */
    execute(parameter: T): void;

    // #endregion
};

/**
 * Synchronous command implementation behind {@link command}.
 */
class CommandImpl<T> implements Command<T> {
    // #region Fields

    private readonly _execute: (parameter: T) => void;
    private readonly _canExecute: Signal<boolean>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `CommandImpl` class.
     *
     * @param execute The handler invoked on execution.
     * @param canExecute Optional gate signal; the command is always executable without it.
     */
    public constructor(execute: (parameter: T) => void, canExecute?: Signal<boolean>) {
        this._execute = execute;
        this._canExecute = computed(() => canExecute?.() ?? true);
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

    // #endregion

    // #region Methods

    /**
     * Executes the handler synchronously when the gate allows it.
     *
     * @public
     * @param parameter The parameter handed to the handler.
     */
    public execute(parameter: T): void {
        if (this._canExecute()) {
            this._execute(parameter);
        }
    }

    // #endregion
}

/**
 * Creates a synchronous {@link Command}. Co-located with the type because a separate `command.ts` would
 * collide with `Command.ts` on case-insensitive file systems.
 *
 * @public
 * @typeParam T The parameter type of the command.
 * @param execute The handler invoked by {@link Command.execute}.
 * @param canExecute Optional signal gating execution; defaults to always executable.
 * @returns A new command.
 */
export function command<T = unknown>(execute: (parameter: T) => void, canExecute?: Signal<boolean>): Command<T> {
    return new CommandImpl<T>(execute, canExecute);
}
