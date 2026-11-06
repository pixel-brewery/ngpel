import { describe, expect, it } from 'vitest';
import { BusyScope } from './BusyScope';

describe('BusyScope', () => {
    it('tracks nested enter/exit per state and aggregates into isBusy and busyRecord', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving'] as const, 'orders');

        // Act
        scope.enter('loading');
        scope.enter('loading');
        scope.exit('loading');

        // Assert
        expect(scope.scopeName).toBe('orders');
        expect(scope.stateNames()).toEqual(['loading', 'saving']);
        expect(scope.busy('loading')()).toBe(true);
        expect(scope.countOf('loading')()).toBe(1);
        expect(scope.busy('saving')()).toBe(false);
        expect(scope.isBusy()).toBe(true);
        expect(scope.busyRecord()).toEqual({ loading: true, saving: false });
    });

    it('never lets a counter drop below zero', () => {
        // Arrange
        const scope = new BusyScope(['loading'] as const);

        // Act
        scope.exit('loading');

        // Assert
        expect(scope.countOf('loading')()).toBe(0);
        expect(scope.isBusy()).toBe(false);
    });

    it('resets a single state', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving'] as const);
        scope.enter('loading');
        scope.enter('saving');

        // Act
        scope.reset('loading');

        // Assert
        expect(scope.busyRecord()).toEqual({ loading: false, saving: true });
        expect(scope.isBusy()).toBe(true);
    });

    it('resets every state when no state is given', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving'] as const);
        scope.enter('loading');
        scope.enter('saving');

        // Act
        scope.reset();

        // Assert
        expect(scope.isBusy()).toBe(false);
        expect(scope.busyRecord()).toEqual({ loading: false, saving: false });
    });

    it('reports any as busy when at least one of the given states is busy', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving', 'deleting'] as const);
        scope.enter('loading');

        // Act
        const anyOfArray = scope.any(['loading', 'saving'])();

        // Assert
        expect(anyOfArray).toBe(true);
    });

    it('aggregates a set of states without a busy member as idle', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving', 'deleting'] as const);
        scope.enter('loading');

        // Act
        const aggregateOfSet = scope.aggregate(new Set(['saving', 'deleting'] as const))();

        // Assert
        expect(aggregateOfSet).toBe(false);
    });

    it('reports all as idle while one of the given states is not busy', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving', 'deleting'] as const);
        scope.enter('loading');

        // Act
        const allOfArray = scope.all(['loading', 'saving'])();

        // Assert
        expect(allOfArray).toBe(false);
    });

    it('reports all as idle for an empty state list', () => {
        // Arrange
        const scope = new BusyScope(['loading', 'saving', 'deleting'] as const);
        scope.enter('loading');

        // Act
        const allOfEmpty = scope.all([])();

        // Assert
        expect(allOfEmpty).toBe(false);
    });

    it('returns the same memoized busy signal for a state', () => {
        // Arrange
        const scope = new BusyScope(['loading'] as const);

        // Act
        const first = scope.busy('loading');
        const second = scope.busy('loading');

        // Assert
        expect(first).toBe(second);
    });

    it('rejects an empty state list', () => {
        // Arrange
        const states: Array<string> = [];

        // Act
        const act = () => new BusyScope(states);

        // Assert
        expect(act).toThrowError('BusyScope requires at least one allowed state.');
    });

    it('rejects a missing state list with the same message', () => {
        // Arrange
        const states = null as unknown as ReadonlyArray<string>;

        // Act
        const act = () => new BusyScope(states);

        // Assert
        expect(act).toThrowError('BusyScope requires at least one allowed state.');
    });

    it('rejects unknown states with a diagnostic message', () => {
        // Arrange
        const scope = new BusyScope<string>(['loading'], 'orders');

        // Act
        const act = () => scope.enter('unknown');

        // Assert
        expect(act).toThrowError("[BusyScope:orders] Invalid state 'unknown'. Allowed: loading");
    });

    it('rejects an unknown state when reading its busy flag', () => {
        // Arrange
        const scope = new BusyScope<string>(['loading'], 'orders');

        // Act
        const act = () => scope.busy('unknown');

        // Assert
        expect(act).toThrowError("[BusyScope:orders] Invalid state 'unknown'. Allowed: loading");
    });
});
