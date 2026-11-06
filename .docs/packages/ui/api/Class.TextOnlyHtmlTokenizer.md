---
title: 'Class: TextOnlyHtmlTokenizer'
generated: true
editUrl: false
---
# Class: TextOnlyHtmlTokenizer

Defined in: [libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts#L16)

Drops raw HTML tokens so embedded markup falls back to plain text. The pipeline renders content
that nobody in the consuming application authored, and the elements the default renderer emits
put their `text` on screen through `unsafeHTML`. Refusing the tokens is what keeps that path
inert; escaping the Markdown source instead would corrupt code fences, where the escapes are
literal content.

## Extends

- `_Tokenizer`

## Constructors

### Constructor

```ts
new TextOnlyHtmlTokenizer(options?): TextOnlyHtmlTokenizer;
```

Defined in: node\_modules/marked/lib/marked.d.ts:352

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options?` | `MarkedOptions`\<`string`, `string`\> |

#### Returns

`TextOnlyHtmlTokenizer`

#### Inherited from

```ts
Tokenizer.constructor
```

## Methods

### html()

```ts
html(): undefined;
```

Defined in: [libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts#L25)

Refuses block-level HTML so it is lexed as paragraph text instead.

#### Returns

`undefined`

Always `undefined`.

#### Overrides

```ts
Tokenizer.html
```

***

### tag()

```ts
tag(): undefined;
```

Defined in: [libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/markdown/rendering/TextOnlyHtmlTokenizer.ts#L35)

Refuses inline HTML tags so they are lexed as inline text instead.

#### Returns

`undefined`

Always `undefined`.

#### Overrides

```ts
Tokenizer.tag
```
