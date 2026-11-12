---
title: 'Class: BytesPipe'
generated: true
editUrl: false
---
# Class: BytesPipe

Defined in: [libs/ui/src/pipes/bytes/BytesPipe.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/bytes/BytesPipe.ts#L18)

Renders a byte count as a human readable size: <code v-pre>{{ file.size &#124; ngpBytes }}</code>.

Delegates to [byteSize](Function.byteSize); the text for an unknown size comes from
[BYTES\_FALLBACK\_TEXT](Variable.BYTES_FALLBACK_TEXT).

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new BytesPipe(): BytesPipe;
```

#### Returns

`BytesPipe`

## Methods

### transform()

```ts
transform(value): string;
```

Defined in: [libs/ui/src/pipes/bytes/BytesPipe.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/bytes/BytesPipe.ts#L34)

Formats `value` as a human readable size.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` \| `null` \| `undefined` | The number of bytes. |

#### Returns

`string`

The formatted size, or the configured fallback for an unknown size.

#### Implementation of

`PipeTransform.transform`
