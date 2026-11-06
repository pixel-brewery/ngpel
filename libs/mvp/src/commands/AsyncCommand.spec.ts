// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { asyncCommand } from './AsyncCommand';

// #endregion

function flushPromises(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('AsyncCommand', () => {
    it('starts its handler synchronously', () => {
        // Arrange
        const handler = vi.fn().mockResolvedValue(undefined);
        const action = asyncCommand<number>(handler);

        // Act
        action.execute(42);

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith(42);
    });

    it('passes the parameter to its asynchronous handler', async () => {
        // Arrange
        const received: Array<number> = [];
        const action = asyncCommand<number>(async (parameter) => {
            received.push(parameter);
        });

        // Act
        action.execute(99);
        await flushPromises();

        // Assert
        expect(received).toEqual([99]);
    });

    it('does not execute while its external gate is false', async () => {
        // Arrange
        const handler = vi.fn().mockResolvedValue(undefined);
        const action = asyncCommand<string>(handler, signal(false));

        // Act
        action.execute('blocked');
        await flushPromises();

        // Assert
        expect(handler).not.toHaveBeenCalled();
        expect(action.isExecuting()).toBe(false);
    });

    it('rejects another execution while the first promise is pending', async () => {
        // Arrange
        let finish = (): void => undefined;
        const pending = new Promise<void>((resolve) => {
            finish = resolve;
        });
        const handler = vi.fn(() => pending);
        const action = asyncCommand<void>(handler);
        action.execute();

        // Act
        action.execute();

        // Assert
        expect(handler).toHaveBeenCalledOnce();
        expect(action.canExecute()).toBe(false);
        finish();
        await flushPromises();
        expect(action.canExecute()).toBe(true);
    });

    it('is not executing initially', () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined);

        // Act
        const executing = action.isExecuting();

        // Assert
        expect(executing).toBe(false);
    });

    it('reports executing before the returned promise settles', async () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined);

        // Act
        action.execute();

        // Assert
        expect(action.isExecuting()).toBe(true);
        await flushPromises();
    });

    it('stops reporting executing after success', async () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.isExecuting()).toBe(false);
    });

    it('consumes a rejected promise and stops reporting executing', async () => {
        // Arrange
        const action = asyncCommand<void>(async () => {
            throw new Error('save failed');
        });

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.isExecuting()).toBe(false);
    });

    it('is executable by default', () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined);

        // Act
        const allowed = action.canExecute();

        // Assert
        expect(allowed).toBe(true);
    });

    it('is not executable while its external gate is false', () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined, signal(false));

        // Act
        const allowed = action.canExecute();

        // Assert
        expect(allowed).toBe(false);
    });

    it('blocks its gate while executing even when the external gate is true', async () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined, signal(true));

        // Act
        action.execute();

        // Assert
        expect(action.canExecute()).toBe(false);
        await flushPromises();
    });

    it('is executable again after its promise completes', async () => {
        // Arrange
        const action = asyncCommand<void>(async () => undefined);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.canExecute()).toBe(true);
    });

    it('enters its loading ref synchronously', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(async () => undefined, undefined, loadingRef);

        // Act
        action.execute();

        // Assert
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).not.toHaveBeenCalled();
        await flushPromises();
    });

    it('leaves its loading ref after success', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(async () => undefined, undefined, loadingRef);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('leaves its loading ref after a rejected promise', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(
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
        const action = asyncCommand<void>(async () => undefined, undefined, { loadingRef });

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('reads a mutable parameter before the caller clears it', async () => {
        // Arrange
        let capturedName: string | undefined;
        const parameter = { name: 'document.pdf' };
        const action = asyncCommand<{ name: string }>(async (value) => {
            capturedName = value.name;
        });

        // Act
        action.execute(parameter);
        parameter.name = '';
        await flushPromises();

        // Assert
        expect(capturedName).toBe('document.pdf');
    });

    it('starts its handler before subsequent synchronous code runs', async () => {
        // Arrange
        const order: Array<string> = [];
        const action = asyncCommand<void>(async () => {
            order.push('handler');
        });

        // Act
        action.execute();
        order.push('after-execute');

        // Assert
        expect(order).toEqual(['handler', 'after-execute']);
        await flushPromises();
    });

    it('unwinds its executing state and loading ref after a synchronous throw', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(
            () => {
                throw new Error('synchronous failure');
            },
            undefined,
            loadingRef,
        );

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(action.isExecuting()).toBe(false);
        expect(action.canExecute()).toBe(true);
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('does not touch the loading ref when the gate blocks execution', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(async () => undefined, signal(false), loadingRef);

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).not.toHaveBeenCalled();
        expect(loadingRef.leave).not.toHaveBeenCalled();
    });

    it('does not enter the loading ref a second time for a concurrent execution', async () => {
        // Arrange
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(async () => undefined, undefined, loadingRef);
        action.execute();

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(loadingRef.enter).toHaveBeenCalledOnce();
        expect(loadingRef.leave).toHaveBeenCalledOnce();
    });

    it('keeps the external gate effective when an execution completes', async () => {
        // Arrange
        const gate = signal(true);
        const action = asyncCommand<void>(async () => undefined, gate);
        action.execute();

        // Act
        gate.set(false);
        await flushPromises();

        // Assert
        expect(action.isExecuting()).toBe(false);
        expect(action.canExecute()).toBe(false);
    });

    it('can execute again after recovering from a failed handler', async () => {
        // Arrange
        const handler = vi.fn<() => Promise<void>>().mockRejectedValueOnce(new Error('first failure')).mockResolvedValueOnce(undefined);
        const loadingRef = { enter: vi.fn(), leave: vi.fn() };
        const action = asyncCommand<void>(handler, undefined, loadingRef);
        action.execute();
        await flushPromises();

        // Act
        action.execute();
        await flushPromises();

        // Assert
        expect(handler).toHaveBeenCalledTimes(2);
        expect(action.isExecuting()).toBe(false);
        expect(loadingRef.enter).toHaveBeenCalledTimes(2);
        expect(loadingRef.leave).toHaveBeenCalledTimes(2);
    });
});
