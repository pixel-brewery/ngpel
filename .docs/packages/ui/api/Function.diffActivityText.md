---
title: 'Function: diffActivityText()'
generated: true
editUrl: false
---
# Function: diffActivityText()

```ts
function diffActivityText(before, after): readonly ActivityTextParagraph[];
```

Defined in: libs/ui/src/components/activity-log/diffActivityText.ts:28

Compares two versions of a long text paragraph by paragraph and, within changed paragraphs,
word by word.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `before` | `string` | The text before the change. |
| `after` | `string` | The text after the change. |

## Returns

readonly [`ActivityTextParagraph`](TypeAlias.ActivityTextParagraph)[]

The paragraphs of the new text, unchanged ones marked as such.
