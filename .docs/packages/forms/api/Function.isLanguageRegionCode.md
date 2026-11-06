---
title: 'Function: isLanguageRegionCode()'
generated: true
editUrl: false
---
# Function: isLanguageRegionCode()

```ts
function isLanguageRegionCode(value): boolean;
```

Defined in: [validators/isLanguageRegionCode.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/isLanguageRegionCode.ts#L11)

Determines whether text is a normalized language-region code such as `de-DE` (lower-case
language, upper-case region). Surrounding whitespace is ignored.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The text to test. |

## Returns

`boolean`

`true` when the text is a normalized language-region code.
