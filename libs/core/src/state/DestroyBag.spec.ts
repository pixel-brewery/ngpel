import { createEnvironmentInjector, DestroyRef, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { destroyBag } from './DestroyBag';

function createScope(): EnvironmentInjector {
    return createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
}

describe('destroyBag', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('runs callbacks and unsubscribes subscriptions when the injection context is destroyed', () => {
        // Arrange
        const scope = createScope();
        const callback = vi.fn();
        const subscription = { unsubscribe: vi.fn() };
        runInInjectionContext(scope, () => destroyBag(undefined, callback, subscription, null, undefined));

        // Act
        scope.destroy();

        // Assert
        expect(callback).toHaveBeenCalledOnce();
        expect(subscription.unsubscribe).toHaveBeenCalledOnce();
    });

    it('accepts an explicit DestroyRef and registers items added later', () => {
        // Arrange
        const scope = createScope();
        const bag = destroyBag(scope.get(DestroyRef));
        const callback = vi.fn();

        // Act
        bag.add(callback);
        scope.destroy();

        // Assert
        expect(callback).toHaveBeenCalledOnce();
    });

    it('destroys only once when destroy is called repeatedly', () => {
        // Arrange
        const scope = createScope();
        const bag = destroyBag(scope.get(DestroyRef));
        const teardown = vi.fn();
        bag.add(teardown);
        bag.destroy();

        // Act
        bag.destroy();

        // Assert
        expect(teardown).toHaveBeenCalledOnce();
    });

    it('runs items added after destruction immediately', () => {
        // Arrange
        const scope = createScope();
        const bag = destroyBag(scope.get(DestroyRef));
        const late = vi.fn();
        bag.destroy();

        // Act
        bag.add(late);

        // Assert
        expect(late).toHaveBeenCalledOnce();
    });

    it('keeps running the remaining teardown items when one of them throws', () => {
        // Arrange
        const scope = createScope();
        const failing = vi.fn(() => {
            throw new Error('boom');
        });
        const following = vi.fn();
        const bag = destroyBag(scope.get(DestroyRef), failing, following);

        // Act
        const act = () => bag.destroy();

        // Assert
        expect(act).not.toThrow();
        expect(following).toHaveBeenCalledOnce();
    });
});
