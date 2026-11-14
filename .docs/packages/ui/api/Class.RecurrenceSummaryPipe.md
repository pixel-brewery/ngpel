---
title: 'Class: RecurrenceSummaryPipe'
generated: true
editUrl: false
---
# Class: RecurrenceSummaryPipe

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceSummaryPipe.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceSummaryPipe.ts#L8)

Renders a localized description of the recurrence in a read-only view.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new RecurrenceSummaryPipe(): RecurrenceSummaryPipe;
```

#### Returns

`RecurrenceSummaryPipe`

## Methods

### transform()

```ts
transform(
   value,
   part?,
   labels?,
   locale?
): string;
```

Defined in: [libs/ui/src/components/recurrence-editor/RecurrenceSummaryPipe.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/RecurrenceSummaryPipe.ts#L25)

Formats one part of the recurrence description.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `value` | [`IRecurrenceValue`](Interface.IRecurrenceValue) \| `null` \| `undefined` | `undefined` | Recurrence to describe. |
| `part?` | `"detail"` \| `"head"` \| `"full"` | `'full'` | Which part of the description to render. |
| `labels?` | `Partial`\<[`IRecurrenceSummaryLabels`](Interface.IRecurrenceSummaryLabels)\> | `undefined` | Optional application translations. |
| `locale?` | `string` | `...` | Locale override for calendar display. |

#### Returns

`string`

The description text.

#### Implementation of

`PipeTransform.transform`
