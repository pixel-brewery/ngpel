import { DestroyRef, ErrorHandler, Injectable, inject, signal, type Signal, type WritableSignal } from '@angular/core';
import { EVENT_HUB_RETAINED_KEYS } from './EVENT_HUB_RETAINED_KEYS';

/**
 * Publishes typed frontend events within an Angular environment injector.
 * Use `inject<EventHub<IApplicationEvents>>(EventHub)` to apply the application's event map.
 *
 * @typeParam TEvents - Map of event names to their payload types.
 * @public
 */
@Injectable()
export class EventHub<TEvents extends object = Record<string, unknown>> {
    // #region Fields

    private readonly _lifetime = inject(DestroyRef);
    private readonly _errors = inject(ErrorHandler);
    private readonly _listeners = new Map<string, Map<(payload: unknown) => void, () => void>>();
    private readonly _retained = new Map<string, WritableSignal<unknown>>();

    // #endregion

    // #region Ctor

    /** Initializes explicitly retained keys and binds listener cleanup to the injector lifetime. */
    public constructor() {
        for (const key of inject(EVENT_HUB_RETAINED_KEYS, { optional: true }) ?? []) {
            this._retained.set(key, signal<unknown>(undefined));
        }
        this._lifetime.onDestroy(() => {
            for (const listeners of this._listeners.values()) {
                for (const unsubscribe of listeners.values()) {
                    unsubscribe();
                }
            }
            this._retained.forEach((latest) => latest.set(undefined));
        });
    }

    // #endregion

    // #region Methods

    /** Registers a callback once per event and returns its teardown. The optional owner can also tear it down. */
    public subscribe<TKey extends Extract<keyof TEvents, string>>(event: TKey, callback: (payload: TEvents[TKey]) => void, owner?: DestroyRef): () => void {
        if (this._lifetime.destroyed || owner?.destroyed) {
            return () => undefined;
        }

        const listener = callback as (payload: unknown) => void;
        const listeners = this._listeners.get(event) ?? new Map<(payload: unknown) => void, () => void>();
        const registered = listeners.get(listener);
        if (registered) {
            return registered;
        }

        const unsubscribe = (): void => {
            if (listeners.get(listener) !== unsubscribe) {
                return;
            }
            listeners.delete(listener);
            if (listeners.size === 0) {
                this._listeners.delete(event);
            }
            detachOwner?.();
        };
        this._listeners.set(event, listeners);
        listeners.set(listener, unsubscribe);
        const detachOwner = owner?.onDestroy(unsubscribe);
        return unsubscribe;
    }

    /** Removes a callback registered for the given event. */
    public unsubscribe<TKey extends Extract<keyof TEvents, string>>(event: TKey, callback: (payload: TEvents[TKey]) => void): void {
        this._listeners.get(event)?.get(callback as (payload: unknown) => void)?.();
    }

    /** Delivers an event synchronously and updates the retained value if configured for this key. */
    public publish<TKey extends Extract<keyof TEvents, string>>(event: TKey, payload: TEvents[TKey]): void {
        if (this._lifetime.destroyed) {
            return;
        }

        this._retained.get(event)?.set(payload);
        const listeners = this._listeners.get(event);
        if (!listeners) {
            return;
        }

        const errors: unknown[] = [];
        for (const [listener, unsubscribe] of [...listeners]) {
            if (listeners.get(listener) !== unsubscribe) {
                continue;
            }
            try {
                listener(payload);
            } catch (error) {
                errors.push(error);
            }
        }
        errors.forEach((error) => this._errors.handleError(error));
    }

    /** Reads the latest payload for a key explicitly configured for retention. */
    public last<TKey extends Extract<keyof TEvents, string>>(event: TKey): Signal<TEvents[TKey] | undefined> {
        return this.requireRetained(event).asReadonly() as Signal<TEvents[TKey] | undefined>;
    }

    /** Reads and clears the latest payload for a key explicitly configured for retention. */
    public pop<TKey extends Extract<keyof TEvents, string>>(event: TKey): TEvents[TKey] | undefined {
        const latest = this.requireRetained(event);
        const payload = latest() as TEvents[TKey] | undefined;
        latest.set(undefined);
        return payload;
    }

    private requireRetained(event: string): WritableSignal<unknown> {
        const latest = this._retained.get(event);
        if (!latest) {
            throw new Error(`Event "${event}" is not configured for retention.`);
        }
        return latest;
    }

    // #endregion
}
