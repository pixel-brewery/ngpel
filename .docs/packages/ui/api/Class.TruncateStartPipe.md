---
title: 'Class: TruncateStartPipe'
generated: true
editUrl: false
---
# Class: TruncateStartPipe

Defined in: [libs/ui/src/pipes/text/TruncateStartPipe.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/TruncateStartPipe.ts#L23)

Shortens text from the front, keeping its end readable: <code v-pre>{{ path &#124; ngpTruncateStart: 30 }}</code>.

File paths, identifiers and URLs carry their distinguishing part at the end, so trimming the
front keeps the value recognisable where a trailing ellipsis would not.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new TruncateStartPipe(): TruncateStartPipe;
```

#### Returns

`TruncateStartPipe`

## Methods

### transform()

```ts
transform(value, maximumLength?): string;
```

Defined in: [libs/ui/src/pipes/text/TruncateStartPipe.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/TruncateStartPipe.ts#L34)

Shortens `value` to `maximumLength` characters, prefixing an ellipsis when it was cut.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | `undefined` | The text to shorten. |
| `maximumLength?` | `number` | `DEFAULT_MAXIMUM_LENGTH` | The maximum number of characters of the result (defaults to 50). |

#### Returns

`string`

The shortened text, or an empty string when there is no text.

#### Implementation of

`PipeTransform.transform`
