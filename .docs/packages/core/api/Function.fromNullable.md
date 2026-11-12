---
title: 'Function: fromNullable()'
generated: true
editUrl: false
---
# Function: fromNullable()

```ts
function fromNullable<TSerialized, T>(codec): IValueCodec<TSerialized | null, T>;
```

Defined in: [storage/codecs/fromNullable.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/storage/codecs/fromNullable.ts#L18)

Lifts a codec so that it also accepts `null` as an absent serialized value. This lets the same
validators that back Web Storage (`string`) serve URL parameters (`string | null`) without a
second codec set.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-tserialized"></a> `TSerialized` | The serialized representation of the inner codec. |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `codec` | [`IValueCodec`](Interface.IValueCodec)\<`TSerialized`, `T`\> | The codec over non-null serialized values. |

## Returns

[`IValueCodec`](Interface.IValueCodec)\<`TSerialized` \| `null`, `T`\>

A frozen codec whose `parse(null)` yields `undefined`.
