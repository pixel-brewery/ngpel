---
title: 'Interface: IRecurrenceSummaryLabels'
generated: true
editUrl: false
---
# Interface: IRecurrenceSummaryLabels

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L4)

Translated sentence fragments used to describe a recurrence.

## Properties

### allDay?

```ts
readonly allDay?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L17)

Optional time description for an all-day recurrence.

***

### atTime

```ts
readonly atTime: (time) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L11)

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

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L13)

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

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L7)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `frequency` | `"DAILY"` \| `"MONTHLY"` \| `"WEEKLY"` \| `"YEARLY"` |
| `interval` | `number` |

#### Returns

`string`

***

### formatDate?

```ts
readonly formatDate?: (date) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L25)

Formats the recurrence's final calendar day.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`string`

***

### formatTime?

```ts
readonly formatTime?: (time) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L23)

Formats a validated local time in HH:mm form.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `time` | `string` |

#### Returns

`string`

***

### joinHead?

```ts
readonly joinHead?: (frequency, details) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L27)

Joins the frequency sentence and the additional descriptions.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `frequency` | `string` |
| `details` | readonly `string`[] |

#### Returns

`string`

***

### joinWeekdays?

```ts
readonly joinWeekdays?: (weekdays) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L21)

Joins the names in a weekly recurrence.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `weekdays` | readonly `string`[] |

#### Returns

`string`

***

### never

```ts
readonly never: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L6)

***

### none

```ts
readonly none: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:5](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L5)

***

### noneDetail?

```ts
readonly noneDetail?: string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L15)

Additional description for a one-off occurrence.

***

### onMonthDay

```ts
readonly onMonthDay: (day) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L9)

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

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L10)

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

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L8)

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

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L12)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `string` |

#### Returns

`string`

***

### weekday?

```ts
readonly weekday?: (weekday) => string;
```

Defined in: [libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/recurrence-editor/IRecurrenceSummaryLabels.ts#L19)

Formats weekday names for the summary.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `weekday` | [`RecurrenceWeekday`](TypeAlias.RecurrenceWeekday) |

#### Returns

`string`
