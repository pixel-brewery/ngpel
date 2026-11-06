/**
 * Receives the serialized value another signal instance wrote to the same key.
 */
type SameDocumentSubscriber = (serializedValue: string | null) => void;

/**
 * Shares storage changes between separate signal instances of one document. The browser's
 * `storage` event intentionally only informs other documents, so same-document coordination
 * must happen inside the abstraction.
 */
class SameDocumentChannel {
    // #region Fields

    private readonly _subscribersByStorage = new WeakMap<Storage, Map<string, Set<SameDocumentSubscriber>>>();

    // #endregion

    // #region Methods

    /**
     * Registers a subscriber for one key of one storage area.
     *
     * @internal
     * @param storage The storage area the key belongs to.
     * @param key The storage key to observe.
     * @param subscriber The subscriber to notify on same-document writes.
     * @returns The function that unregisters the subscriber again.
     */
    public subscribe(storage: Storage, key: string, subscriber: SameDocumentSubscriber): () => void {
        let subscribersByKey = this._subscribersByStorage.get(storage);

        if (subscribersByKey === undefined) {
            subscribersByKey = new Map<string, Set<SameDocumentSubscriber>>();
            this._subscribersByStorage.set(storage, subscribersByKey);
        }

        let subscribers = subscribersByKey.get(key);

        if (subscribers === undefined) {
            subscribers = new Set<SameDocumentSubscriber>();
            subscribersByKey.set(key, subscribers);
        }

        subscribers.add(subscriber);

        return (): void => {
            const currentSubscribersByKey = this._subscribersByStorage.get(storage);
            const currentSubscribers = currentSubscribersByKey?.get(key);

            currentSubscribers?.delete(subscriber);

            if (currentSubscribers?.size === 0) {
                currentSubscribersByKey?.delete(key);
            }

            if (currentSubscribersByKey?.size === 0) {
                this._subscribersByStorage.delete(storage);
            }
        };
    }

    /**
     * Notifies every subscriber of the key except the one that caused the write.
     *
     * @internal
     * @param storage The storage area the key belongs to.
     * @param key The storage key that changed.
     * @param serializedValue The written value, or `null` when the key was removed.
     * @param source The subscriber that caused the write and must not be notified.
     */
    public publish(storage: Storage, key: string, serializedValue: string | null, source: SameDocumentSubscriber): void {
        const subscribers = this._subscribersByStorage.get(storage)?.get(key);

        if (subscribers === undefined) {
            return;
        }

        for (const subscriber of subscribers) {
            if (subscriber !== source) {
                subscriber(serializedValue);
            }
        }
    }

    // #endregion
}

let channel: SameDocumentChannel | undefined;

/**
 * Returns the lazily created channel shared by every `localStorageSignal` of this document.
 *
 * @internal
 */
export function sameDocumentChannel(): SameDocumentChannel {
    channel ??= new SameDocumentChannel();

    return channel;
}
