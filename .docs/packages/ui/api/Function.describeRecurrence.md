---
title: 'Function: describeRecurrence()'
generated: true
editUrl: false
---
# Function: describeRecurrence()

```ts
function describeRecurrence(
   value,
   labels?,
   locale?
): {
  detail: string;
  head: string;
};
```

Defined in: [libs/ui/src/components/recurrence-editor/describeRecurrence.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/describeRecurrence.ts#L29)

Describes the frequency and end condition for read-only recurrence fields.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | [`IRecurrenceValue`](Interface.IRecurrenceValue) \| `null` \| `undefined` | `undefined` | Recurrence to describe. |
| `labels?` | `Partial`\<[`IRecurrenceSummaryLabels`](Interface.IRecurrenceSummaryLabels)\> | `{}` | Optional application translations for sentence fragments. |
| `locale?` | `string` | `'en'` | Locale for dates, weekdays and time. |

## Returns

```ts
{
  detail: string;
  head: string;
}
```

The recurrence description and a separate end-condition description.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `detail` | `string` | [libs/ui/src/components/recurrence-editor/describeRecurrence.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/describeRecurrence.ts#L33) |
| `head` | `string` | [libs/ui/src/components/recurrence-editor/describeRecurrence.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/describeRecurrence.ts#L33) |
