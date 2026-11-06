---
title: 'Interface: IRecurrenceSummaryLabels'
generated: true
editUrl: false
---
# Interface: IRecurrenceSummaryLabels

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:4

Translated sentence fragments used to describe a recurrence.

## Properties

### atTime

```ts
readonly atTime: (time) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:11

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `time` | `string` |

#### Returns

`string`

***

### count

```ts
readonly count: (occurrences) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:13

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `occurrences` | `number` |

#### Returns

`string`

***

### every

```ts
readonly every: (frequency, interval) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:7

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `frequency` | `"DAILY"` \| `"MONTHLY"` \| `"WEEKLY"` \| `"YEARLY"` |
| `interval` | `number` |

#### Returns

`string`

***

### never

```ts
readonly never: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:6

***

### none

```ts
readonly none: string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:5

***

### onMonthDay

```ts
readonly onMonthDay: (day) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:9

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `day` | `number` |

#### Returns

`string`

***

### onOrdinalWeekday

```ts
readonly onOrdinalWeekday: (ordinal, weekday) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:10

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ordinal` | `string` |
| `weekday` | `string` |

#### Returns

`string`

***

### onWeekdays

```ts
readonly onWeekdays: (weekdays) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:8

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `weekdays` | `string` |

#### Returns

`string`

***

### until

```ts
readonly until: (date) => string;
```

Defined in: libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:12

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` |

#### Returns

`string`
