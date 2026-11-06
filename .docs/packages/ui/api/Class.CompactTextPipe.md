---
title: 'Class: CompactTextPipe'
generated: true
editUrl: false
---
# Class: CompactTextPipe

Defined in: [libs/ui/src/pipes/text/CompactTextPipe.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/CompactTextPipe.ts#L30)

Condenses a markdown block into a single plain-text line for list rows, tooltips and card
subtitles: <code v-pre>{{ note.body &#124; ngpCompactText }}</code>.

The first non-empty line is taken, its heading, list, link and emphasis markers are removed and
the result is cut to a maximum length with a trailing ellipsis. Rendering markdown as HTML is a
different job — use the `markdown` entry point for that.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new CompactTextPipe(): CompactTextPipe;
```

#### Returns

`CompactTextPipe`

## Methods

### transform()

```ts
transform(
   markdown,
   fallback?,
   maximumLength?
): string;
```

Defined in: [libs/ui/src/pipes/text/CompactTextPipe.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/CompactTextPipe.ts#L42)

Condenses `markdown` into a single plain-text line.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `markdown` | `string` \| `null` \| `undefined` | `undefined` | The markdown source. |
| `fallback` | `string` | `''` | The text to condense when the source holds no line (defaults to an empty string). |
| `maximumLength` | `number` | `DEFAULT_MAXIMUM_LENGTH` | The maximum number of characters of the result (defaults to 96). |

#### Returns

`string`

The condensed line.

#### Implementation of

```ts
PipeTransform.transform
```
