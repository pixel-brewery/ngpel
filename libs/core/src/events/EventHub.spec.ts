import { createEnvironmentInjector, DestroyRef, EnvironmentInjector, ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { EventHub } from './EventHub';
import { provideEventHub } from './provideEventHub';

interface ITestEvents {
    readonly updated: { readonly id: string };
    readonly ready: boolean;
}

describe('EventHub', () => {
    it('delivers a topic to its listeners and isolates failures', () => {
        // Arrange
        const failure = new Error('Broken listener');
        const handleError = vi.fn();
        TestBed.configureTestingModule({ providers: [provideEventHub<ITestEvents>(), { provide: ErrorHandler, useValue: { handleError } }] });
        const hub = TestBed.inject<EventHub<ITestEvents>>(EventHub);
        const listener = vi.fn();
        const other = vi.fn();
        hub.subscribe('updated', () => {
            throw failure;
        });
        hub.subscribe('updated', listener);
        hub.subscribe('ready', other);

        // Act
        hub.publish('updated', { id: 'alpha' });

        // Assert
        expect(listener).toHaveBeenCalledExactlyOnceWith({ id: 'alpha' });
        expect(other).not.toHaveBeenCalled();
        expect(handleError).toHaveBeenCalledExactlyOnceWith(failure);
    });

    it('removes listeners when their owning injector is destroyed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideEventHub<ITestEvents>()] });
        const hub = TestBed.inject<EventHub<ITestEvents>>(EventHub);
        const owner = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
        const listener = vi.fn();
        hub.subscribe('ready', listener, owner.get(DestroyRef));
        owner.destroy();

        // Act
        hub.publish('ready', true);

        // Assert
        expect(listener).not.toHaveBeenCalled();
    });

    it('scopes subscriptions to their configured environment injector', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideEventHub<ITestEvents>()] });
        const root = TestBed.inject<EventHub<ITestEvents>>(EventHub);
        const environment = createEnvironmentInjector([provideEventHub<ITestEvents>()], TestBed.inject(EnvironmentInjector));
        const child = environment.get<EventHub<ITestEvents>>(EventHub);
        const listener = vi.fn();
        child.subscribe('ready', listener);

        try {
            // Act
            root.publish('ready', true);

            // Assert
            expect(listener).not.toHaveBeenCalled();
        } finally {
            environment.destroy();
        }
    });

    it('clears the last payload for an explicitly retained event when consumed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideEventHub<ITestEvents>('updated')] });
        const hub = TestBed.inject<EventHub<ITestEvents>>(EventHub);
        const last = hub.last('updated');
        hub.publish('updated', { id: 'alpha' });
        hub.publish('updated', { id: 'beta' });

        // Act
        const value = hub.pop('updated');

        // Assert
        expect(value).toEqual({ id: 'beta' });
        expect(last()).toBeUndefined();
    });
});
