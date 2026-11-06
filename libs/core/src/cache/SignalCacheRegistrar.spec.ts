import { describe, expect, it } from 'vitest';
import { SignalCacheChangedReason } from './SignalCacheChangedReason';
import { SignalCacheRegistrar } from './SignalCacheRegistrar';

class TestRegistrar extends SignalCacheRegistrar<string, number> {
    public constructor() {
        super();
    }

    public get size(): number {
        return this.registrations.size;
    }
}

describe('SignalCacheRegistrar', () => {
    it('starts empty with a reset change event', () => {
        // Arrange
        const registrar = new TestRegistrar();

        // Act
        const change = registrar.changed();

        // Assert
        expect(change).toEqual({ reason: SignalCacheChangedReason.Reset, items: [] });
        expect(registrar.size).toBe(0);
    });

    it('registers values and publishes an add change with the current items', () => {
        // Arrange
        const registrar = new TestRegistrar();

        // Act
        const returned = registrar.set('a', 1).set('b', 2);

        // Assert
        expect(returned).toBe(registrar);
        expect(registrar.get('a')).toBe(1);
        expect(registrar.has('b')).toBe(true);
        expect(registrar.changed()).toEqual({ reason: SignalCacheChangedReason.Add, items: [1, 2] });
    });

    it('returns falsy values that were registered', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.set('zero', 0);

        // Act
        const value = registrar.get('zero');

        // Assert
        expect(value).toBe(0);
    });

    it('registers many values at once', () => {
        // Arrange
        const registrar = new TestRegistrar();

        // Act
        registrar.setMany(
            new Map([
                ['a', 1],
                ['b', 2],
            ]),
        );

        // Assert
        expect(registrar.changed().items).toEqual([1, 2]);
    });

    it('removes a single key and publishes a remove change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.setMany(
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
            ]),
        );

        // Act
        registrar.remove('a');

        // Assert
        expect(registrar.has('a')).toBe(false);
        expect(registrar.changed()).toEqual({ reason: SignalCacheChangedReason.Remove, items: [2, 3] });
    });

    it('removes many keys, ignoring unknown ones, and publishes a remove change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.setMany(
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
            ]),
        );
        registrar.remove('a');

        // Act
        registrar.removeMany(['b', 'missing']);

        // Assert
        expect(registrar.changed()).toEqual({ reason: SignalCacheChangedReason.Remove, items: [3] });
    });

    it('clears every registration and publishes a reset change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.set('a', 1);

        // Act
        registrar.clear();

        // Assert
        expect(registrar.has('a')).toBe(false);
        expect(registrar.changed()).toEqual({ reason: SignalCacheChangedReason.Reset, items: [] });
    });

    it('throws for unknown keys with the registration message', () => {
        // Arrange
        const registrar = new TestRegistrar();

        // Act
        const act = () => registrar.get('missing');

        // Assert
        expect(act).toThrowError('No registration found for key: missing');
    });

    it('rejects null keys, values and collections', () => {
        // Arrange
        const registrar = new TestRegistrar();
        const nullKey = null as unknown as string;
        const nullValue = null as unknown as number;
        const nullMap = null as unknown as ReadonlyMap<string, number>;
        const nullKeys = null as unknown as ReadonlyArray<string>;

        // Act
        const acts = [
            () => registrar.get(nullKey),
            () => registrar.set(nullKey, 1),
            () => registrar.set('a', nullValue),
            () => registrar.setMany(new Map([['a', nullValue]])),
            () => registrar.setMany(nullMap),
            () => registrar.remove(nullKey),
            () => registrar.removeMany([nullKey]),
            () => registrar.removeMany(nullKeys),
        ];

        // Assert
        expect(acts[0]).toThrowError('Key cannot be null or undefined.');
        expect(acts[1]).toThrowError('Key cannot be null or undefined.');
        expect(acts[2]).toThrowError('Value cannot be null or undefined.');
        expect(acts[3]).toThrowError('Value cannot be null or undefined.');
        expect(acts[4]).toThrowError('Values cannot be null or undefined.');
        expect(acts[5]).toThrowError('Key cannot be null or undefined.');
        expect(acts[6]).toThrowError('Key cannot be null or undefined.');
        expect(acts[7]).toThrowError('Keys cannot be null or undefined.');
    });
});
