---
title: 'Class: JsonUserPreferenceCodec\<T\>'
generated: true
editUrl: false
---
# Class: JsonUserPreferenceCodec\<T\>

Defined in: [storage/preferences/JsonUserPreferenceCodec.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/JsonUserPreferenceCodec.ts#L14)

JSON preference codec with caller-provided runtime validation. The value is stored as-is; the
adapter performs the JSON round trip.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The preference value type. |

## Implements

- [`IUserPreferenceCodec`](TypeAlias.IUserPreferenceCodec)\<`T`\>

## Constructors

### Constructor

```ts
new JsonUserPreferenceCodec<T>(isValue): JsonUserPreferenceCodec<T>;
```

Defined in: [storage/preferences/JsonUserPreferenceCodec.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/JsonUserPreferenceCodec.ts#L29)

Constructs a new instance of the `JsonUserPreferenceCodec` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `isValue` | (`value`) => `value is T` | Runtime type guard for parsed payloads. |

#### Returns

`JsonUserPreferenceCodec`\<`T`\>

## Methods

### parse()

```ts
parse(value): T | undefined;
```

Defined in: [storage/preferences/JsonUserPreferenceCodec.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/JsonUserPreferenceCodec.ts#L44)

Validates an unknown preference payload.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | Persisted payload. |

#### Returns

`T` \| `undefined`

The payload when it passes the guard, otherwise `undefined`.

#### Implementation of

`IUserPreferenceCodec.parse`

***

### serialize()

```ts
serialize(value): unknown;
```

Defined in: [storage/preferences/JsonUserPreferenceCodec.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/preferences/JsonUserPreferenceCodec.ts#L55)

Serializes a typed preference value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | Preference value. |

#### Returns

`unknown`

The value unchanged.

#### Implementation of

`IUserPreferenceCodec.serialize`
