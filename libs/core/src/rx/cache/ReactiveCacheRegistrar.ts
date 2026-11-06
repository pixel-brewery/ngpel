// #region Imports

import { type Observable, Subject } from 'rxjs';
import type { IReactiveCacheChange } from './IReactiveCacheChange';
import { ReactiveCacheChangedReason } from './ReactiveCacheChangedReason';

// #endregion

/**
 * An in-memory key/value registry with observable change notification. Subclass it to build
 * product registries whose consumers react through RxJS streams.
 *
 * @public
 */
export abstract class ReactiveCacheRegistrar<TKey, TValue> {
    // #region Fields

    private readonly _cache: Map<TKey, TValue>;
    private readonly _changedSubject: Subject<IReactiveCacheChange<TValue>>;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `ReactiveCacheRegistrar` class.
     */
    protected constructor() {
        this._cache = new Map<TKey, TValue>();
        this._changedSubject = new Subject<IReactiveCacheChange<TValue>>();
    }

    // #endregion

    // #region Properties

    /**
     * Emits after every change, carrying the reason and the current items.
     *
     * @public
     */
    public get changed(): Observable<IReactiveCacheChange<TValue>> {
        return this._changedSubject.asObservable();
    }

    /**
     * The current registrations.
     */
    protected get registrations(): ReadonlyMap<TKey, TValue> {
        return this._cache;
    }

    // #endregion

    // #region Methods

    /**
     * Returns the value registered under `key`.
     *
     * @public
     * @throws Error if the key is null or undefined, or if no registration exists for the key.
     */
    public get(key: TKey): TValue {
        this.ensureKey(key);

        const value = this._cache.get(key);
        if (value !== undefined) {
            return value;
        }

        throw new Error(`No registration found for key: ${String(key)}`);
    }

    /**
     * Returns whether a registration exists for `key`.
     *
     * @public
     */
    public has(key: TKey): boolean {
        return this._cache.has(key);
    }

    /**
     * Registers `value` under `key`, replacing an existing registration.
     *
     * @public
     * @throws Error if the key or value is null or undefined.
     */
    public set(key: TKey, value: TValue): this {
        this.ensureKey(key);
        this.ensureValue(value);

        this._cache.set(key, value);
        this.notifyChanged(ReactiveCacheChangedReason.Add);

        return this;
    }

    /**
     * Registers every entry of `values`.
     *
     * @public
     * @throws Error if the map itself or any of its keys or values is null or undefined.
     */
    public setMany(values: ReadonlyMap<TKey, TValue>): this {
        if (values === null || values === undefined) {
            throw new Error('Values cannot be null or undefined.');
        }

        values.forEach((value, key) => {
            this.ensureKey(key);
            this.ensureValue(value);
            this._cache.set(key, value);
        });
        this.notifyChanged(ReactiveCacheChangedReason.Add);

        return this;
    }

    /**
     * Removes the registration under `key`.
     *
     * @public
     * @throws Error if the key is null or undefined.
     */
    public remove(key: TKey): this {
        this.ensureKey(key);

        this._cache.delete(key);
        this.notifyChanged(ReactiveCacheChangedReason.Remove);

        return this;
    }

    /**
     * Removes the registrations under every key of `keys`.
     *
     * @public
     * @throws Error if the array itself or any of its keys is null or undefined.
     */
    public removeMany(keys: ReadonlyArray<TKey>): this {
        if (keys === null || keys === undefined) {
            throw new Error('Keys cannot be null or undefined.');
        }

        for (const key of keys) {
            this.ensureKey(key);
            this._cache.delete(key);
        }
        this.notifyChanged(ReactiveCacheChangedReason.Remove);

        return this;
    }

    /**
     * Removes every registration.
     *
     * @public
     */
    public clear(): this {
        this._cache.clear();
        this.notifyChanged(ReactiveCacheChangedReason.Reset);

        return this;
    }

    /**
     * Publishes a change event carrying the current items.
     */
    protected notifyChanged(reason: ReactiveCacheChangedReason): void {
        this._changedSubject.next({ reason, items: Array.from(this._cache.values()) });
    }

    private ensureKey(key: TKey): void {
        if (key === null || key === undefined) {
            throw new Error('Key cannot be null or undefined.');
        }
    }

    private ensureValue(value: TValue): void {
        if (value === null || value === undefined) {
            throw new Error('Value cannot be null or undefined.');
        }
    }

    // #endregion
}
