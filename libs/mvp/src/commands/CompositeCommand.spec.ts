// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { command, type Command } from './Command';
import { compositeCommand } from './CompositeCommand';

// #endregion

describe('CompositeCommand', () => {
    describe('register', () => {
        it('registers a child command', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);

            // Act
            composite.register(child);

            // Assert
            expect(composite.has(child)).toBe(true);
            expect(composite.count()).toBe(1);
        });

        it.each([null, undefined])('rejects an absent child: %s', (child) => {
            // Arrange
            const composite = compositeCommand();

            // Act
            const register = (): void => composite.register(child as unknown as Command);

            // Assert
            expect(register).toThrow('ArgumentNullException');
            expect(composite.count()).toBe(0);
        });

        it('rejects registering the same child twice', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);
            composite.register(child);

            // Act
            const registerAgain = (): void => composite.register(child);

            // Assert
            expect(registerAgain).toThrow('InvalidOperationException');
            expect(composite.count()).toBe(1);
        });

        it('keeps every distinct child', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const first = command<number>(() => undefined);
            const second = command<number>(() => undefined);
            const third = command<number>(() => undefined);
            composite.register(first);
            composite.register(second);

            // Act
            composite.register(third);

            // Assert
            expect(composite.count()).toBe(3);
            expect([first, second, third].every((child) => composite.has(child))).toBe(true);
        });
    });

    describe('unregister', () => {
        it('removes a registered child', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);
            composite.register(child);

            // Act
            composite.unregister(child);

            // Assert
            expect(composite.has(child)).toBe(false);
            expect(composite.count()).toBe(0);
        });

        it.each([null, undefined])('rejects an absent child: %s', (child) => {
            // Arrange
            const composite = compositeCommand();

            // Act
            const unregister = (): void => composite.unregister(child as unknown as Command);

            // Assert
            expect(unregister).toThrow('ArgumentNullException');
        });

        it('rejects a child that was never registered', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);

            // Act
            const unregister = (): void => composite.unregister(child);

            // Assert
            expect(unregister).toThrow('InvalidOperationException');
        });
    });

    describe('has', () => {
        it('returns false for an unregistered child', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);

            // Act
            const registered = composite.has(child);

            // Assert
            expect(registered).toBe(false);
        });

        it('returns true for a registered child', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);
            composite.register(child);

            // Act
            const registered = composite.has(child);

            // Assert
            expect(registered).toBe(true);
        });
    });

    describe('clear', () => {
        it('removes every registered child and disables execution', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const first = command<number>(() => undefined);
            const second = command<number>(() => undefined);
            composite.register(first);
            composite.register(second);
            expect(composite.canExecute()).toBe(true);

            // Act
            composite.clear();

            // Assert
            expect(composite.count()).toBe(0);
            expect(composite.has(first)).toBe(false);
            expect(composite.has(second)).toBe(false);
            expect(composite.canExecute()).toBe(false);
        });

        it('accepts an already empty queue', () => {
            // Arrange
            const composite = compositeCommand();

            // Act
            composite.clear();

            // Assert
            expect(composite.count()).toBe(0);
            expect(composite.canExecute()).toBe(false);
        });
    });

    describe('count', () => {
        it('starts at zero', () => {
            // Arrange
            const composite = compositeCommand();

            // Act
            const count = composite.count();

            // Assert
            expect(count).toBe(0);
        });

        it('increases when a child is registered', () => {
            // Arrange
            const composite = compositeCommand<number>();
            composite.register(command<number>(() => undefined));
            expect(composite.count()).toBe(1);

            // Act
            composite.register(command<number>(() => undefined));

            // Assert
            expect(composite.count()).toBe(2);
        });

        it('decreases when a child is removed', () => {
            // Arrange
            const composite = compositeCommand<number>();
            const child = command<number>(() => undefined);
            composite.register(child);
            expect(composite.count()).toBe(1);

            // Act
            composite.unregister(child);

            // Assert
            expect(composite.count()).toBe(0);
        });
    });

    describe('execute', () => {
        it('runs every child in registration order', () => {
            // Arrange
            const order: Array<string> = [];
            const composite = compositeCommand<string>();
            composite.register(command<string>((parameter) => order.push(`first-${parameter}`)));
            composite.register(command<string>((parameter) => order.push(`second-${parameter}`)));
            composite.register(command<string>((parameter) => order.push(`third-${parameter}`)));

            // Act
            composite.execute('go');

            // Assert
            expect(order).toEqual(['first-go', 'second-go', 'third-go']);
        });

        it('passes the same parameter to every child', () => {
            // Arrange
            const first = vi.fn();
            const second = vi.fn();
            const composite = compositeCommand<number>();
            composite.register(command<number>(first));
            composite.register(command<number>(second));

            // Act
            composite.execute(5);

            // Assert
            expect(first).toHaveBeenCalledExactlyOnceWith(5);
            expect(second).toHaveBeenCalledExactlyOnceWith(5);
        });

        it('leaves an empty queue disabled when executed', () => {
            // Arrange
            const composite = compositeCommand<void>();

            // Act
            composite.execute();

            // Assert
            expect(composite.canExecute()).toBe(false);
            expect(composite.count()).toBe(0);
        });

        it('does not run any child while the external gate is false', () => {
            // Arrange
            const handler = vi.fn();
            const composite = compositeCommand<void>(signal(false));
            composite.register(command<void>(handler));

            // Act
            composite.execute();

            // Assert
            expect(handler).not.toHaveBeenCalled();
        });

        it('does not run any child when one child is disabled', () => {
            // Arrange
            const handler = vi.fn();
            const composite = compositeCommand<void>();
            composite.register(command<void>(handler));
            composite.register(command<void>(handler, signal(false)));
            composite.register(command<void>(handler));

            // Act
            composite.execute();

            // Assert
            expect(handler).not.toHaveBeenCalled();
        });

        it('finishes all synchronous handlers before returning', () => {
            // Arrange
            const order: Array<string> = [];
            const composite = compositeCommand<void>();
            composite.register(command<void>(() => order.push('child')));

            // Act
            composite.execute();
            order.push('after-execute');

            // Assert
            expect(order).toEqual(['child', 'after-execute']);
        });

        it('rechecks a later child that an earlier child disables', () => {
            // Arrange
            const gate = signal(true);
            const skipped = vi.fn();
            const completed = vi.fn();
            const composite = compositeCommand<void>();
            composite.register(command<void>(() => gate.set(false)));
            composite.register(command<void>(skipped, gate));
            composite.register(command<void>(completed));

            // Act
            composite.execute();

            // Assert
            expect(skipped).not.toHaveBeenCalled();
            expect(completed).toHaveBeenCalledOnce();
        });

        it('propagates a child failure without starting later children', () => {
            // Arrange
            const failure = new Error('child failed');
            const later = vi.fn();
            const composite = compositeCommand<void>();
            composite.register(
                command<void>(() => {
                    throw failure;
                }),
            );
            composite.register(command<void>(later));

            // Act
            const execute = (): void => composite.execute();

            // Assert
            expect(execute).toThrow(failure);
            expect(later).not.toHaveBeenCalled();
        });
    });

    describe('canExecute', () => {
        it('is false for an empty queue', () => {
            // Arrange
            const composite = compositeCommand();

            // Act
            const allowed = composite.canExecute();

            // Assert
            expect(allowed).toBe(false);
        });

        it('is true when every registered child is executable', () => {
            // Arrange
            const composite = compositeCommand<void>();
            composite.register(command<void>(() => undefined));

            // Act
            const allowed = composite.canExecute();

            // Assert
            expect(allowed).toBe(true);
        });

        it('is false when one registered child is disabled', () => {
            // Arrange
            const composite = compositeCommand<void>();
            composite.register(command<void>(() => undefined));
            composite.register(command<void>(() => undefined, signal(false)));

            // Act
            const allowed = composite.canExecute();

            // Assert
            expect(allowed).toBe(false);
        });

        it('is false when its external gate is false', () => {
            // Arrange
            const composite = compositeCommand<void>(signal(false));
            composite.register(command<void>(() => undefined));

            // Act
            const allowed = composite.canExecute();

            // Assert
            expect(allowed).toBe(false);
        });

        it('becomes executable when its first child is registered', () => {
            // Arrange
            const composite = compositeCommand<void>();
            expect(composite.canExecute()).toBe(false);

            // Act
            composite.register(command<void>(() => undefined));

            // Assert
            expect(composite.canExecute()).toBe(true);
        });

        it('becomes disabled when its last child is removed', () => {
            // Arrange
            const composite = compositeCommand<void>();
            const child = command<void>(() => undefined);
            composite.register(child);
            expect(composite.canExecute()).toBe(true);

            // Act
            composite.unregister(child);

            // Assert
            expect(composite.canExecute()).toBe(false);
        });

        it.each([false, true])('reacts when a child gate becomes %s', (allowed) => {
            // Arrange
            const gate = signal(!allowed);
            const composite = compositeCommand<void>();
            composite.register(command<void>(() => undefined, gate));
            expect(composite.canExecute()).toBe(!allowed);

            // Act
            gate.set(allowed);

            // Assert
            expect(composite.canExecute()).toBe(allowed);
        });

        it('reacts when its external gate changes', () => {
            // Arrange
            const gate = signal(false);
            const composite = compositeCommand<void>(gate);
            composite.register(command<void>(() => undefined));
            expect(composite.canExecute()).toBe(false);

            // Act
            gate.set(true);

            // Assert
            expect(composite.canExecute()).toBe(true);
        });
    });
});
