---
title: 'Class: ChunkPipe'
generated: true
editUrl: false
---
# Class: ChunkPipe

Defined in: [libs/ui/src/pipes/collections/ChunkPipe.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/collections/ChunkPipe.ts#L14)

Splits a list into rows of a fixed length, which is what a template needs to lay a flat
collection out as a grid: `@for (row of items() | ngpChunk: 3; track $index)`.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new ChunkPipe(): ChunkPipe;
```

#### Returns

`ChunkPipe`

## Methods

### transform()

```ts
transform<TItem>(value, size): TItem[][];
```

Defined in: [libs/ui/src/pipes/collections/ChunkPipe.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/collections/ChunkPipe.ts#L26)

Splits `value` into chunks of `size` items; the last chunk holds the remainder.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | readonly `TItem`[] \| `null` \| `undefined` | The list to split. |
| `size` | `number` | The number of items per chunk; must be a positive integer. |

#### Returns

`TItem`[][]

The chunks, or an empty list when there is no value.

#### Throws

RangeError When `size` is not a positive integer.

#### Implementation of

`PipeTransform.transform`
