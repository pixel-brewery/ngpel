// #region Imports

import { createEnvironmentInjector, EnvironmentInjector, Injector, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { asyncAwaitCommand } from './AsyncAwaitCommand';
import { onAsyncAwaitResult } from './onAsyncAwaitResult';

// #endregion

function flushPromises(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('onAsyncAwaitResult', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('does not call the handler for the initial null result', () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => 'saved');
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));

        // Act
        TestBed.tick();

        // Assert
        expect(handler).not.toHaveBeenCalled();
    });

    it('calls the handler with a successful command result', async () => {
        // Arrange
        const action = asyncAwaitCommand<number, string>(async (parameter) => `saved-${parameter}`);
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        TestBed.tick();

        // Act
        action.execute(7);
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('saved-7');
    });

    it('does not report a failed command as a result', async () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => {
            throw new Error('save failed');
        });
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        TestBed.tick();

        // Act
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).not.toHaveBeenCalled();
        expect(action.error()?.message).toBe('save failed');
    });

    it('observes an existing result when registered outside an injection context with an injector', async () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => 'already saved');
        action.execute();
        await flushPromises();
        const handler = vi.fn();
        const injector = TestBed.inject(Injector);

        // Act
        onAsyncAwaitResult(action, handler, { injector });
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('already saved');
    });

    it('reports a later result from the same command', async () => {
        // Arrange
        const action = asyncAwaitCommand<number, string>(async (parameter) => `saved-${parameter}`);
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        action.execute(1);
        await flushPromises();
        TestBed.tick();

        // Act
        action.execute(2);
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler.mock.calls).toEqual([['saved-1'], ['saved-2']]);
    });

    it('does not report null when a later failure clears the previous result', async () => {
        // Arrange
        const execute = vi.fn<() => Promise<string>>().mockResolvedValueOnce('saved').mockRejectedValueOnce(new Error('next save failed'));
        const action = asyncAwaitCommand<void, string>(execute);
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Act
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('saved');
        expect(action.result()).toBeNull();
    });

    it('does not report an equal result again', async () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => 'saved');
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Act
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('saved');
    });

    it('does not track signals read by the result handler', async () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => 'saved');
        const suffix = signal('first');
        const observed: Array<string> = [];
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, (result) => observed.push(`${result}-${suffix()}`)));
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Act
        suffix.set('second');
        TestBed.tick();

        // Assert
        expect(observed).toEqual(['saved-first']);
    });

    it('stops observing when the returned effect reference is destroyed', async () => {
        // Arrange
        const action = asyncAwaitCommand<number, string>(async (parameter) => `saved-${parameter}`);
        const handler = vi.fn();
        const observer = TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        action.execute(1);
        await flushPromises();
        TestBed.tick();

        // Act
        observer.destroy();
        action.execute(2);
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith('saved-1');
    });

    it('stops observing when the owning injector is destroyed', async () => {
        // Arrange
        const injector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
        const action = asyncAwaitCommand<void, string>(async () => 'saved');
        const handler = vi.fn();
        onAsyncAwaitResult(action, handler, { injector });
        TestBed.tick();

        // Act
        injector.destroy();
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).not.toHaveBeenCalled();
    });

    it.each([0, false, '', undefined])('reports a non-null falsy result: %s', async (result) => {
        // Arrange
        const action = asyncAwaitCommand<void, unknown>(async () => result);
        const handler = vi.fn();
        TestBed.runInInjectionContext(() => onAsyncAwaitResult(action, handler));
        TestBed.tick();

        // Act
        action.execute();
        await flushPromises();
        TestBed.tick();

        // Assert
        expect(handler).toHaveBeenCalledExactlyOnceWith(result);
    });

    it('requires an injection context when no injector is supplied', () => {
        // Arrange
        const action = asyncAwaitCommand<void, string>(async () => 'saved');

        // Act
        const observe = (): void => {
            onAsyncAwaitResult(action, () => undefined);
        };

        // Assert
        expect(observe).toThrow(/injection context/);
    });
});
