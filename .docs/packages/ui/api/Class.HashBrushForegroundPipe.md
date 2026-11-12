---
title: 'Class: HashBrushForegroundPipe'
generated: true
editUrl: false
---
# Class: HashBrushForegroundPipe

Defined in: [libs/ui/src/pipes/color/HashBrushForegroundPipe.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/HashBrushForegroundPipe.ts#L15)

Picks the readable text colour for a background colour, and pairs with
[HashBrushBackgroundPipe](Class.HashBrushBackgroundPipe): `[style.color]="(tag.name | ngpHashBrushBackground) | ngpHashBrushForeground"`.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new HashBrushForegroundPipe(): HashBrushForegroundPipe;
```

#### Returns

`HashBrushForegroundPipe`

## Methods

### transform()

```ts
transform(backgroundColor): "#000000" | "#ffffff";
```

Defined in: [libs/ui/src/pipes/color/HashBrushForegroundPipe.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/color/HashBrushForegroundPipe.ts#L25)

Picks the text colour for `backgroundColor`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `backgroundColor` | `string` \| `null` \| `undefined` | The background as a `#rgb` or `#rrggbb` string. |

#### Returns

`"#000000"` \| `"#ffffff"`

`#000000` or `#ffffff`.

#### Implementation of

`PipeTransform.transform`
