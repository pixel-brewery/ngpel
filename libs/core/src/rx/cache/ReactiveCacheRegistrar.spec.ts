import { describe, expect, it } from 'vitest';
import type { IReactiveCacheChange } from './IReactiveCacheChange';
import { ReactiveCacheChangedReason } from './ReactiveCacheChangedReason';
import { ReactiveCacheRegistrar } from './ReactiveCacheRegistrar';

class TestRegistrar extends ReactiveCacheRegistrar<string, number> {
    public constructor() {
        super();
    }

    public get size(): number {
        return this.registrations.size;
    }
}

function record(registrar: TestRegistrar): Array<IReactiveCacheChange<number>> {
    const changes: Array<IReactiveCacheChange<number>> = [];
    registrar.changed.subscribe((change) => changes.push(change));

    return changes;
}

describe('ReactiveCacheRegistrar', () => {
    it('registers values and emits an add change with the current items', () => {
        // Arrange
        const registrar = new TestRegistrar();
        const changes = record(registrar);

        // Act
        const returned = registrar.set('a', 1).set('b', 2);

        // Assert
        expect(returned).toBe(registrar);
        expect(registrar.get('a')).toBe(1);
        expect(registrar.has('b')).toBe(true);
        expect(registrar.size).toBe(2);
        expect(changes).toEqual([
            { reason: ReactiveCacheChangedReason.Add, items: [1] },
            { reason: ReactiveCacheChangedReason.Add, items: [1, 2] },
        ]);
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

    it('registers many values with a single change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        const changes = record(registrar);

        // Act
        registrar.setMany(
            new Map([
                ['a', 1],
                ['b', 2],
            ]),
        );

        // Assert
        expect(changes).toEqual([{ reason: ReactiveCacheChangedReason.Add, items: [1, 2] }]);
    });

    it('removes a single key and emits a remove change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.setMany(
            new Map([
                ['a', 1],
                ['b', 2],
                ['c', 3],
            ]),
        );
        const changes = record(registrar);

        // Act
        registrar.remove('a');

        // Assert
        expect(registrar.has('a')).toBe(false);
        expect(changes).toEqual([{ reason: ReactiveCacheChangedReason.Remove, items: [2, 3] }]);
    });

    it('removes many keys, ignoring unknown ones, and emits a single remove change', () => {
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
        const changes = record(registrar);

        // Act
        registrar.removeMany(['b', 'missing']);

        // Assert
        expect(changes).toEqual([{ reason: ReactiveCacheChangedReason.Remove, items: [3] }]);
    });

    it('clears every registration and emits a reset change', () => {
        // Arrange
        const registrar = new TestRegistrar();
        registrar.set('a', 1);
        const changes = record(registrar);

        // Act
        registrar.clear();

        // Assert
        expect(registrar.has('a')).toBe(false);
        expect(changes).toEqual([{ reason: ReactiveCacheChangedReason.Reset, items: [] }]);
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
            () => registrar.setMany(new Map([[nullKey, 1]])),
            () => registrar.setMany(nullMap),
            () => registrar.remove(nullKey),
            () => registrar.removeMany([nullKey]),
            () => registrar.removeMany(nullKeys),
        ];

        // Assert
        expect(acts[0]).toThrowError('Key cannot be null or undefined.');
        expect(acts[1]).toThrowError('Key cannot be null or undefined.');
        expect(acts[2]).toThrowError('Value cannot be null or undefined.');
        expect(acts[3]).toThrowError('Key cannot be null or undefined.');
        expect(acts[4]).toThrowError('Values cannot be null or undefined.');
        expect(acts[5]).toThrowError('Key cannot be null or undefined.');
        expect(acts[6]).toThrowError('Key cannot be null or undefined.');
        expect(acts[7]).toThrowError('Keys cannot be null or undefined.');
    });
});
