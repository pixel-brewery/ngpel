---
title: 'Class: SignalSubject\<T\>'
generated: true
editUrl: false
---
# Class: SignalSubject\<T\>

Defined in: [signals/SignalSubject.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L15)

Holds its latest value as an Angular signal and synchronously notifies subscribers.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The emitted value type. |

## Constructors

### Constructor

```ts
new SignalSubject<T>(initial?): SignalSubject<T>;
```

Defined in: [signals/SignalSubject.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L31)

Creates a subject with an optional initial value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `initial?` | `T` | The value replayed to new subscribers; `undefined` is not replayed. |

#### Returns

`SignalSubject`\<`T`\>

## Accessors

### value

#### Get Signature

```ts
get value(): T | undefined;
```

Defined in: [signals/SignalSubject.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L45)

The latest emitted value, or `undefined` before the first emission.

##### Returns

`T` \| `undefined`

## Methods

### asReadonly()

```ts
asReadonly(): Signal<T | undefined>;
```

Defined in: [signals/SignalSubject.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L107)

Returns a read-only signal that follows the latest emitted value.

#### Returns

`Signal`\<`T` \| `undefined`\>

The subject's read-only signal.

***

### next()

```ts
next(value): void;
```

Defined in: [signals/SignalSubject.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L59)

Updates the signal and notifies each current subscriber, including for repeated values.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The value to emit. |

#### Returns

`void`

***

### pipe()

```ts
pipe<R>(...operators): SignalSubject<R>;
```

Defined in: [signals/SignalSubject.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L97)

Applies signal operators in order.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-r"></a> `R` | The final value type. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`operators` | [`SignalOperator`](TypeAlias.SignalOperator)\<`any`, `any`\>[] | The transformations to apply. |

#### Returns

`SignalSubject`\<`R`\>

The transformed subject.

***

### subscribe()

```ts
subscribe(callback): () => void;
```

Defined in: [signals/SignalSubject.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/signals/SignalSubject.ts#L74)

Subscribes and immediately replays the latest value when it is defined.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`) => `void` | The observer invoked for each emission. |

#### Returns

A function that removes the observer.

() => `void`
