---
title: 'Function: isEmailAddress()'
generated: true
editUrl: false
---
# Function: isEmailAddress()

```ts
function isEmailAddress(value): boolean;
```

Defined in: [text/isEmailAddress.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/text/isEmailAddress.ts#L15)

Determines whether text is a non-empty email address with a qualified domain. Surrounding
whitespace is ignored. Framework-free so pipes and validators can share one definition.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The text to test. |

## Returns

`boolean`

`true` when the text is a syntactically valid email address.
