// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { Command } from './Command';

// #endregion

/**
 * A {@link Command} that owns an ordered queue of child commands and executes them sequentially in
 * FIFO order with the same parameter.
 *
 * @remarks
 * The composite is executable only when the queue is non-empty, the optional external gate is `true`
 * and every child can execute. Registration is reference-based: a child may be registered once.
 *
 * @typeParam T The parameter type passed to every child.
 * @public
 */
export type CompositeCommand<T = void> = Command<T> & {
    // #region Properties

    /**
     * The number of registered child commands.
     */
    readonly count: Signal<number>;

    // #endregion

    // #region Methods

    /**
     * Appends a child command to the queue.
     *
     * @param command The command to register.
     * @throws Error when the command is `null`/`undefined` or already registered.
     */
    register(command: Command<T>): void;

    /**
     * Removes a child command from the queue.
     *
     * @param command The command to unregister.
     * @throws Error when the command is `null`/`undefined` or not registered.
     */
    unregister(command: Command<T>): void;

    /**
     * Returns whether the child command is registered.
     *
     * @param command The command to look up.
     */
    has(command: Command<T>): boolean;

    /**
     * Removes every child command.
     */
    clear(): void;

    // #endregion
};

/**
 * Composite command implementation behind {@link compositeCommand}. The queue is an immutable array
 * held in a signal, so every mutation replaces the array and the derived signals re-evaluate.
 */
class CompositeCommandImpl<T> implements CompositeCommand<T> {
    // #region Fields

    private readonly _children: WritableSignal<ReadonlyArray<Command<T>>>;
    private readonly _canExecute: Signal<boolean>;
    private readonly _count: Signal<number>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `CompositeCommandImpl` class.
     *
     * @param canExecute Optional external gate combined with the children's gates.
     */
    public constructor(canExecute?: Signal<boolean>) {
        this._children = signal<ReadonlyArray<Command<T>>>([]);
        this._count = computed(() => this._children().length);
        this._canExecute = computed(() => {
            const children = this._children();

            if (children.length === 0 || !(canExecute?.() ?? true)) {
                return false;
            }

            return children.every((child) => child.canExecute());
        });
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether the composite can currently be executed.
     *
     * @public
     */
    public get canExecute(): Signal<boolean> {
        return this._canExecute;
    }

    /**
     * The number of registered child commands.
     *
     * @public
     */
    public get count(): Signal<number> {
        return this._count;
    }

    // #endregion

    // #region Methods

    /**
     * Executes every executable child in FIFO order when the composite gate allows it.
     *
     * @public
     * @param parameter The parameter handed to every child.
     */
    public execute(parameter: T): void {
        if (!this._canExecute()) {
            return;
        }

        for (const child of this._children()) {
            if (child.canExecute()) {
                child.execute(parameter);
            }
        }
    }

    /**
     * Appends a child command to the queue.
     *
     * @public
     * @param command The command to register.
     * @throws Error when the command is `null`/`undefined` or already registered.
     */
    public register(command: Command<T>): void {
        this.ensureCommand(command);

        if (this.has(command)) {
            throw new Error('InvalidOperationException: command is already registered.');
        }

        this._children.update((children) => [...children, command]);
    }

    /**
     * Removes a child command from the queue.
     *
     * @public
     * @param command The command to unregister.
     * @throws Error when the command is `null`/`undefined` or not registered.
     */
    public unregister(command: Command<T>): void {
        this.ensureCommand(command);

        if (!this.has(command)) {
            throw new Error('InvalidOperationException: command is not registered.');
        }

        this._children.update((children) => children.filter((child) => child !== command));
    }

    /**
     * Returns whether the child command is registered.
     *
     * @public
     * @param command The command to look up.
     */
    public has(command: Command<T>): boolean {
        return this._children().includes(command);
    }

    /**
     * Removes every child command.
     *
     * @public
     */
    public clear(): void {
        this._children.set([]);
    }

    private ensureCommand(command: Command<T>): void {
        if (command === null || command === undefined) {
            throw new Error('ArgumentNullException: command must not be null or undefined.');
        }
    }

    // #endregion
}

/**
 * Creates a {@link CompositeCommand}. Co-located with the type because a separate `compositeCommand.ts`
 * would collide with `CompositeCommand.ts` on case-insensitive file systems.
 *
 * @public
 * @typeParam T The parameter type passed to every child.
 * @param canExecute Optional external gate; the composite additionally requires a non-empty queue whose children can all execute.
 * @returns A new composite command.
 */
export function compositeCommand<T = void>(canExecute?: Signal<boolean>): CompositeCommand<T> {
    return new CompositeCommandImpl<T>(canExecute);
}
