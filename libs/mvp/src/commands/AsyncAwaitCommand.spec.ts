// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { asyncAwaitCommand } from './AsyncAwaitCommand';

// #endregion

function flushPromises(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('AsyncAwaitCommand', () => {
    describe('execute', () => {
        it('starts its handler synchronously', async () => {
            // Arrange
            const handler = vi.fn().mockResolvedValue('ready');
            const action = asyncAwaitCommand<number, string>(handler);

            // Act
            action.execute(1);

            // Assert
            expect(handler).toHaveBeenCalledExactlyOnceWith(1);
            await flushPromises();
        });

        it('passes its parameter to the asynchronous handler', async () => {
            // Arrange
            const received: Array<number> = [];
            const action = asyncAwaitCommand<number, string>(async (parameter) => {
                received.push(parameter);
                return 'ready';
            });

            // Act
            action.execute(42);
            await flushPromises();

            // Assert
            expect(received).toEqual([42]);
        });

        it('does not execute while its external gate is false', async () => {
            // Arrange
            const handler = vi.fn().mockResolvedValue('ready');
            const action = asyncAwaitCommand<string, string>(handler, signal(false));

            // Act
            action.execute('blocked');
            await flushPromises();

            // Assert
            expect(handler).not.toHaveBeenCalled();
        });

        it('does not start another execution while the first is pending', async () => {
            // Arrange
            const handler = vi.fn().mockResolvedValue('first');
            const action = asyncAwaitCommand<void, string>(handler);
            action.execute();

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(handler).toHaveBeenCalledOnce();
            expect(action.result()).toBe('first');
        });
    });

    describe('result', () => {
        it('is null initially', () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            const result = action.result();

            // Assert
            expect(result).toBeNull();
        });

        it('contains the value returned by a successful handler', async () => {
            // Arrange
            const action = asyncAwaitCommand<number, string>(async (parameter) => `value-${parameter}`);

            // Act
            action.execute(7);
            await flushPromises();

            // Assert
            expect(action.result()).toBe('value-7');
        });

        it('retains the result across reads', async () => {
            // Arrange
            const action = asyncAwaitCommand<number, string>(async (parameter) => `value-${parameter}`);
            action.execute(1);
            await flushPromises();
            expect(action.result()).toBe('value-1');

            // Act
            const result = action.result();

            // Assert
            expect(result).toBe('value-1');
        });

        it('is null after a rejected promise', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => {
                throw new Error('save failed');
            });

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.result()).toBeNull();
        });

        it('clears the previous result when the next execution fails', async () => {
            // Arrange
            const handler = vi.fn<() => Promise<string>>().mockResolvedValueOnce('saved').mockRejectedValueOnce(new Error('next save failed'));
            const action = asyncAwaitCommand<void, string>(handler);
            action.execute();
            await flushPromises();
            expect(action.result()).toBe('saved');

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.result()).toBeNull();
        });
    });

    describe('error', () => {
        it('is null initially', () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            const error = action.error();

            // Assert
            expect(error).toBeNull();
        });

        it('preserves the Error rejected by the handler', async () => {
            // Arrange
            const failure = new Error('save failed');
            const action = asyncAwaitCommand<void, string>(async () => {
                throw failure;
            });

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.error()).toBe(failure);
        });

        it('wraps a non-Error rejection in an Error', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(() => Promise.reject('string-error'));

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.error()).toBeInstanceOf(Error);
            expect(action.error()?.message).toBe('string-error');
        });

        it('clears a previous error after a later successful execution', async () => {
            // Arrange
            const handler = vi.fn<() => Promise<string>>().mockRejectedValueOnce(new Error('first save failed')).mockResolvedValueOnce('saved');
            const action = asyncAwaitCommand<void, string>(handler);
            action.execute();
            await flushPromises();
            expect(action.error()).toBeInstanceOf(Error);

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.error()).toBeNull();
            expect(action.result()).toBe('saved');
        });
    });

    describe('isExecuting', () => {
        it('is false initially', () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            const executing = action.isExecuting();

            // Assert
            expect(executing).toBe(false);
        });

        it('is true before the returned promise settles', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            action.execute();

            // Assert
            expect(action.isExecuting()).toBe(true);
            await flushPromises();
        });

        it('is false after success', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'saved');

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.isExecuting()).toBe(false);
        });

        it('is false after a rejected promise', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => {
                throw new Error('save failed');
            });

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(action.isExecuting()).toBe(false);
        });
    });

    describe('canExecute', () => {
        it('is true by default', () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            const allowed = action.canExecute();

            // Assert
            expect(allowed).toBe(true);
        });

        it('reflects changes to the external gate', () => {
            // Arrange
            const gate = signal(false);
            const action = asyncAwaitCommand<void, string>(async () => 'ready', gate);
            expect(action.canExecute()).toBe(false);

            // Act
            gate.set(true);

            // Assert
            expect(action.canExecute()).toBe(true);
        });

        it('is false while executing', async () => {
            // Arrange
            const action = asyncAwaitCommand<void, string>(async () => 'ready');

            // Act
            action.execute();

            // Assert
            expect(action.canExecute()).toBe(false);
            await flushPromises();
        });
    });

    describe('loadingRef', () => {
        it('enters synchronously when execution starts', async () => {
            // Arrange
            const loadingRef = { enter: vi.fn(), leave: vi.fn() };
            const action = asyncAwaitCommand<void, string>(async () => 'saved', undefined, loadingRef);

            // Act
            action.execute();

            // Assert
            expect(loadingRef.enter).toHaveBeenCalledOnce();
            expect(loadingRef.leave).not.toHaveBeenCalled();
            await flushPromises();
        });

        it('leaves after success', async () => {
            // Arrange
            const loadingRef = { enter: vi.fn(), leave: vi.fn() };
            const action = asyncAwaitCommand<void, string>(async () => 'saved', undefined, loadingRef);

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(loadingRef.enter).toHaveBeenCalledOnce();
            expect(loadingRef.leave).toHaveBeenCalledOnce();
        });

        it('leaves after a rejected promise', async () => {
            // Arrange
            const loadingRef = { enter: vi.fn(), leave: vi.fn() };
            const action = asyncAwaitCommand<void, string>(
                async () => {
                    throw new Error('save failed');
                },
                undefined,
                loadingRef,
            );

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(loadingRef.leave).toHaveBeenCalledOnce();
            expect(action.canExecute()).toBe(true);
        });

        it('accepts an owner exposing the loading ref', async () => {
            // Arrange
            const loadingRef = { enter: vi.fn(), leave: vi.fn() };
            const action = asyncAwaitCommand<void, string>(async () => 'saved', undefined, { loadingRef });

            // Act
            action.execute();
            await flushPromises();

            // Assert
            expect(loadingRef.enter).toHaveBeenCalledOnce();
            expect(loadingRef.leave).toHaveBeenCalledOnce();
        });
    });

    describe('synchronous execution', () => {
        it('starts the handler before subsequent synchronous code runs', async () => {
            // Arrange
            const order: Array<string> = [];
            const action = asyncAwaitCommand<void, string>(async () => {
                order.push('handler');
                return 'saved';
            });

            // Act
            action.execute();
            order.push('after-execute');

            // Assert
            expect(order).toEqual(['handler', 'after-execute']);
            await flushPromises();
        });

        it('reads a mutable parameter before the caller clears it', async () => {
            // Arrange
            let capturedName: string | undefined;
            const parameter = { name: 'report.pdf' };
            const action = asyncAwaitCommand<{ name: string }, string>(async (value) => {
                capturedName = value.name;
                return value.name;
            });

            // Act
            action.execute(parameter);
            parameter.name = '';
            await flushPromises();

            // Assert
            expect(capturedName).toBe('report.pdf');
            expect(action.result()).toBe('report.pdf');
        });
    });

    it('reports a synchronous handler throw and unwinds loading and executing state', async () => {
        // Arrange
        const failure = new Error('synchronous failure');
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncAwaitCommand<void, string>(
            () => {
                throw failure;
            },
            undefined,
            loadingRef,
        );

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.error()).toBe(failure);
        expect(action.result()).toBeNull();
        expect(action.isExecuting()).toBe(false);
        expect(action.canExecute()).toBe(true);
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('does not touch the loading ref when the gate blocks execution', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncAwaitCommand<void, string>(async () => 'saved', signal(false), loadingRef);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).not.toHaveBeenCalled();
        expect(loadingRef.leave).not.toHaveBeenCalled();
        expect(action.result()).toBeNull();
    });

    it('does not enter the loading ref again for a concurrent execution', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncAwaitCommand<void, string>(async () => 'saved', undefined, loadingRef);
        action.execute();

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('keeps the external gate effective after an execution completes', async () => {
        // Arrange
        const gate = signal(true);
        const action = asyncAwaitCommand<void, string>(async () => 'saved', gate);
        action.execute();

        // Act
        gate.set(false);
        await flushPromises();

        // Assert
        expect(action.isExecuting()).toBe(false);
        expect(action.canExecute()).toBe(false);
        expect(action.result()).toBe('saved');
    });

    it('retains the previous result while the next execution is pending', async () => {
        // Arrange
        const handler = vi.fn<() => Promise<string>>().mockResolvedValueOnce('first').mockResolvedValueOnce('second');
        const action = asyncAwaitCommand<void, string>(handler);
        action.execute();
        await flushPromises();

        // Act
        action.execute();

        // Assert
        expect(action.result()).toBe('first');
        expect(action.isExecuting()).toBe(true);
        await flushPromises();
    });

    it('retains the previous error until the next execution succeeds', async () => {
        // Arrange
        const failure = new Error('first save failed');
        const handler = vi.fn<() => Promise<string>>().mockRejectedValueOnce(failure).mockResolvedValueOnce('saved');
        const action = asyncAwaitCommand<void, string>(handler);
        action.execute();
        await flushPromises();

        // Act
        action.execute();

        // Assert
        expect(action.error()).toBe(failure);
        expect(action.isExecuting()).toBe(true);
        await flushPromises();
    });

    it.each([0, false, '', undefined])('preserves a falsy successful result: %s', async (result) => {
        // Arrange
        const action = asyncAwaitCommand<void, unknown>(async () => result);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.result()).toBe(result);
        expect(action.error()).toBeNull();
    });
});
