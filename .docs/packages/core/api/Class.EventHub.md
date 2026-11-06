---
title: 'Class: EventHub\<TEvents\>'
generated: true
editUrl: false
---
# Class: EventHub\<TEvents\>

Defined in: events/EventHub.ts:12

Publishes typed frontend events within an Angular environment injector.
Use `inject<EventHub<IApplicationEvents>>(EventHub)` to apply the application's event map.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TEvents` *extends* `object` | `Record`\<`string`, `unknown`\> | Map of event names to their payload types. |

## Constructors

### Constructor

```ts
new EventHub<TEvents>(): EventHub<TEvents>;
```

Defined in: events/EventHub.ts:25

Initializes explicitly retained keys and binds listener cleanup to the injector lifetime.

#### Returns

`EventHub`\<`TEvents`\>

## Methods

### last()

```ts
last<TKey>(event): Signal<TEvents[TKey] | undefined>;
```

Defined in: events/EventHub.ts:104

Reads the latest payload for a key explicitly configured for retention.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TKey` |

#### Returns

`Signal`\<`TEvents`\[`TKey`\] \| `undefined`\>

***

### pop()

```ts
pop<TKey>(event): TEvents[TKey] | undefined;
```

Defined in: events/EventHub.ts:109

Reads and clears the latest payload for a key explicitly configured for retention.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TKey` |

#### Returns

`TEvents`\[`TKey`\] \| `undefined`

***

### publish()

```ts
publish<TKey>(event, payload): void;
```

Defined in: events/EventHub.ts:78

Delivers an event synchronously and updates the retained value if configured for this key.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TKey` |
| `payload` | `TEvents`\[`TKey`\] |

#### Returns

`void`

***

### subscribe()

```ts
subscribe<TKey>(
   event,
   callback,
   owner?
): () => void;
```

Defined in: events/EventHub.ts:44

Registers a callback once per event and returns its teardown. The optional owner can also tear it down.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TKey` |
| `callback` | (`payload`) => `void` |
| `owner?` | `DestroyRef` |

#### Returns

() => `void`

***

### unsubscribe()

```ts
unsubscribe<TKey>(event, callback): void;
```

Defined in: events/EventHub.ts:73

Removes a callback registered for the given event.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `string` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TKey` |
| `callback` | (`payload`) => `void` |

#### Returns

`void`
