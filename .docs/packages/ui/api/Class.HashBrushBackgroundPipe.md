---
title: 'Class: HashBrushBackgroundPipe'
generated: true
editUrl: false
---
# Class: HashBrushBackgroundPipe

Defined in: [libs/ui/src/pipes/color/HashBrushBackgroundPipe.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/HashBrushBackgroundPipe.ts#L17)

Derives a stable background colour from a value, which gives avatars, tags and legend swatches a
recognisable tint without storing one: `[style.background-color]="tag.name | ngpHashBrushBackground"`.

The value is lower-cased and trimmed before hashing, so `Andre` and ` andre ` share a colour.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new HashBrushBackgroundPipe(): HashBrushBackgroundPipe;
```

#### Returns

`HashBrushBackgroundPipe`

## Methods

### transform()

```ts
transform(value): string;
```

Defined in: [libs/ui/src/pipes/color/HashBrushBackgroundPipe.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/HashBrushBackgroundPipe.ts#L27)

Derives the background colour of `value`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | \| \{ `toString`: `string`; \} \| `null` \| `undefined` | The value to derive the colour from. |

#### Returns

`string`

The colour as a `#rrggbb` string.

#### Implementation of

```ts
PipeTransform.transform
```
