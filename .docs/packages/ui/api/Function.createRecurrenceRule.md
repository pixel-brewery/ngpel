---
title: 'Function: createRecurrenceRule()'
generated: true
editUrl: false
---
# Function: createRecurrenceRule()

```ts
function createRecurrenceRule(value, options?): string | null;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceRule.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceRule.ts#L90)

Serializes the editable recurrence. Applications that store the end separately can keep the
default behavior. Set `includeUntil` for a self-contained RFC 5545 rule.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | [`IRecurrenceValue`](Interface.IRecurrenceValue) |
| `options?` | \{ `includeUntil?`: `boolean`; \} |
| `options.includeUntil?` | `boolean` |

## Returns

`string` \| `null`
