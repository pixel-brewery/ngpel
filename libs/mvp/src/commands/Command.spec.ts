// #region Imports

import { signal } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';
import { command } from './Command';

// #endregion

describe('Command', () => {
    it('executes the handler synchronously with its parameter', () => {
        // Arrange
        const handler = vi.fn();
        const action = command<number>(handler);

        // Act
        action.execute(42);

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith(42);
    });

    it('reads a mutable parameter immediately', () => {
        // Arrange
        const received: Array<string> = [];
        const action = command<{ data: string }>((parameter) => received.push(parameter.data));

        // Act
        action.execute({ data: 'original' });

        // Assert
        expect(received).toEqual(['original']);
    });

    it('supports a void parameter', () => {
        // Arrange
        const handler = vi.fn();
        const action = command<void>(handler);

        // Act
        action.execute();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith(undefined);
    });

    it('does not execute while its gate is false', () => {
        // Arrange
        const handler = vi.fn();
        const action = command<string>(handler, signal(false));

        // Act
        action.execute('blocked');

        // Assert
        expect(handler).not.toHaveBeenCalled();
    });

    it('executes while its gate is true', () => {
        // Arrange
        const handler = vi.fn();
        const action = command<string>(handler, signal(true));

        // Act
        action.execute('allowed');

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('allowed');
    });

    it('blocks execution after a previously enabled gate becomes false', () => {
        // Arrange
        const handler = vi.fn();
        const gate = signal(true);
        const action = command<string>(handler, gate);
        action.execute('first');
        gate.set(false);

        // Act
        action.execute('blocked');

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('first');
    });

    it('allows execution again after its gate becomes true', () => {
        // Arrange
        const handler = vi.fn();
        const gate = signal(false);
        const action = command<string>(handler, gate);
        action.execute('blocked');
        gate.set(true);

        // Act
        action.execute('allowed');

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('allowed');
    });

    it('is executable by default', () => {
        // Arrange
        const action = command<void>(() => undefined);

        // Act
        const allowed = action.canExecute();

        // Assert
        expect(allowed).toBe(true);
    });

    it('reflects changes to its gate signal', () => {
        // Arrange
        const gate = signal(false);
        const action = command<void>(() => undefined, gate);
        expect(action.canExecute()).toBe(false);

        // Act
        gate.set(true);

        // Assert
        expect(action.canExecute()).toBe(true);
    });

    it('captures files before the caller clears the input value', async () => {
        // Arrange
        let capturedFiles: Array<string> = [];
        const files = { files: ['photo.jpg', 'document.pdf'] };
        const action = command<{ files: Array<string> }>((parameter) => {
            capturedFiles = [...parameter.files];
        });

        // Act
        action.execute(files);
        files.files.length = 0;
        await Promise.resolve();

        // Assert
        expect(capturedFiles).toEqual(['photo.jpg', 'document.pdf']);
    });

    it('finishes before subsequent synchronous code and microtasks run', async () => {
        // Arrange
        const order: Array<string> = [];
        const action = command<void>(() => order.push('command'));

        // Act
        action.execute();
        order.push('after-execute');
        await Promise.resolve();
        order.push('microtask');

        // Assert
        expect(order).toEqual(['command', 'after-execute', 'microtask']);
    });

    it('supports consecutive executions with different parameters', () => {
        // Arrange
        const handler = vi.fn();
        const action = command<number>(handler);
        action.execute(1);
        action.execute(2);

        // Act
        action.execute(3);

        // Assert
        expect(handler.mock.calls).toEqual([[1], [2], [3]]);
    });

    it('propagates a synchronous handler failure to the caller', () => {
        // Arrange
        const failure = new Error('save failed');
        const action = command<void>(() => {
            throw failure;
        });

        // Act
        const execute = (): void => action.execute();

        // Assert
        expect(execute).toThrow(failure);
    });
});
