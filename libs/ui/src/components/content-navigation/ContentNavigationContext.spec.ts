// #region Imports

import { describe, expect, it, vi } from 'vitest';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

describe('Content navigation registry', () => {
    describe('destination lifecycle', () => {
        it('publishes destinations by explicit order and removes them idempotently', () => {
            // arrange
            const context = new ContentNavigationContext();
            const unregisterSecond = context.register({ id: 'second', label: 'Second', order: 20 });
            context.register({ id: 'first', label: 'First', order: 10 });

            // act
            unregisterSecond();
            unregisterSecond();

            // assert
            expect(context.items()).toEqual([{ id: 'first', label: 'First', level: 1, order: 10 }]);
        });

        it('rejects duplicate destinations before changing the published outline', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });

            // act
            const duplicateRegistration = (): void => {
                context.register({ id: 'summary', label: 'Another summary' });
            };

            // assert
            expect(duplicateRegistration).toThrow('already registered');
            expect(context.items()).toHaveLength(1);
        });

        it('tracks the active destination and falls back when routed content is removed', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });
            const unregisterSignature = context.register({ id: 'signature', label: 'Signature' });

            // act
            context.activate('signature');
            const activeBeforeRemoval = context.activeItemId();
            unregisterSignature();

            // assert
            expect(activeBeforeRemoval).toBe('signature');
            expect(context.activeItemId()).toBe('summary');
        });

        it('ignores stale observer activations for unregistered destinations', () => {
            // arrange
            const context = new ContentNavigationContext();
            context.register({ id: 'summary', label: 'Summary' });

            // act
            context.activate('removed-section');

            // assert
            expect(context.activeItemId()).toBe('summary');
        });

        it('delegates navigation only to the registered destination owner', () => {
            // arrange
            const context = new ContentNavigationContext();
            const navigateToSummary = vi.fn();
            const navigateToDetails = vi.fn();
            context.register({ id: 'summary', label: 'Summary' }, navigateToSummary);
            context.register({ id: 'details', label: 'Details' }, navigateToDetails);

            // act
            context.navigate('details');

            // assert
            expect(navigateToSummary).not.toHaveBeenCalled();
            expect(navigateToDetails).toHaveBeenCalledOnce();
            expect(context.activeItemId()).toBe('details');
        });

        it.each([
            ['leading', true, false, 'summary'],
            ['trailing', false, true, 'signature'],
        ])('pins the %s boundary destination when section headings cannot reach the tracking band', (_, isAtStart, isAtEnd, id) => {
            // arrange
            const context = createContextWithOverlappingDestinations();

            // act
            context.synchronizeViewport({ direction: 'down', isAtStart, isAtEnd });

            // assert
            expect(context.activeItemId()).toBe(id);
        });

        it.each([
            ['up', 'summary'],
            ['down', 'details'],
        ] as const)('selects the %s destination while overlapping sections cross the tracking band', (direction, id) => {
            // arrange
            const context = createContextWithOverlappingDestinations();

            // act
            context.synchronizeViewport({ direction, isAtEnd: false, isAtStart: false });

            // assert
            expect(context.activeItemId()).toBe(id);
        });
    });

    describe('invalid metadata', () => {
        it.each([
            [{ id: '1-invalid', label: 'Invalid' }, 'anchor IDs'],
            [{ id: 'valid', label: '   ' }, 'labels'],
            [{ id: 'valid', label: 'Valid', level: 0 }, 'levels'],
            [{ id: 'valid', label: 'Valid', order: Number.POSITIVE_INFINITY }, 'ordering values'],
        ])('rejects ambiguous or unsafe navigation metadata', (item, expectedMessage) => {
            // arrange
            const context = new ContentNavigationContext();

            // act
            const registration = (): void => {
                context.register(item);
            };

            // assert
            expect(registration).toThrow(expectedMessage);
            expect(context.items()).toEqual([]);
        });
    });
});

function createContextWithOverlappingDestinations(): ContentNavigationContext {
    const context = new ContentNavigationContext();
    context.register({ id: 'summary', label: 'Summary', order: 10 });
    context.register({ id: 'details', label: 'Details', order: 20 });
    context.register({ id: 'signature', label: 'Signature', order: 30 });
    context.synchronizeIntersection('summary', true, {
        direction: 'down',
        isAtEnd: false,
        isAtStart: false,
    });
    context.synchronizeIntersection('details', true, {
        direction: 'down',
        isAtEnd: false,
        isAtStart: false,
    });

    return context;
}
