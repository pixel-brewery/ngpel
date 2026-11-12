---
title: 'Interface: IValueCodec\<TSerialized, T\>'
generated: true
editUrl: false
---
# Interface: IValueCodec\<TSerialized, T\>

Defined in: [storage/codecs/IValueCodec.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/IValueCodec.ts#L14)

Converts between a serialized representation and a typed application value.

`parse()` must return `undefined` for malformed or unsupported serialized values, so persisted
data is never trusted as a type assertion. `serialize()` must throw when an application value
must not be persisted. One contract backs every storage surface of ngpel: `localStorageSignal`
(`TSerialized = string`), the user-preference port (`TSerialized = unknown`) and, through
`fromNullable`, URL parameters (`TSerialized = string | null`).

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tserialized"></a> `TSerialized` | The serialized representation. |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Methods

### parse()

```ts
parse(serializedValue): T | undefined;
```

Defined in: [storage/codecs/IValueCodec.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/IValueCodec.ts#L24)

Parses one serialized value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `serializedValue` | `TSerialized` | The serialized representation. |

#### Returns

`T` \| `undefined`

The typed value, or `undefined` when the representation is malformed or unsupported.

***

### serialize()

```ts
serialize(value): TSerialized;
```

Defined in: [storage/codecs/IValueCodec.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/IValueCodec.ts#L34)

Serializes one typed value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `T` | The typed value. |

#### Returns

`TSerialized`

The serialized representation.

#### Throws

TypeError when the value must not be persisted.
