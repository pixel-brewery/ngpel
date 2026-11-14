---
title: 'Class: WeekStripComponent'
generated: true
editUrl: false
---
# Class: WeekStripComponent

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L135)

Displays one controlled calendar-week row inside a week panel.

## Constructors

### Constructor

```ts
new WeekStripComponent(): WeekStripComponent;
```

#### Returns

`WeekStripComponent`

## Properties

### compactDays

```ts
readonly compactDays: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L161)

Uses a compact day cell with fixed rows for month, date and event marker.

***

### dateKey

```ts
protected readonly dateKey: (value) => string | undefined = toCalendarDate;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L163)

Formats the local calendar day shown by a date control as `YYYY-MM-DD`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `Date` | Date from the control. |

#### Returns

`string` \| `undefined`

The calendar day or `undefined` for an invalid date.

***

### dateSelected

```ts
readonly dateSelected: OutputEmitterRef<Date>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L219)

Emits the selected calendar date.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:211](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L211)

Whether day selection is disabled.

***

### displayDate

```ts
readonly displayDate: InputSignal<Date>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:171](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L171)

Date contained by the represented week.

***

### events

```ts
readonly events: InputSignal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L195)

Calendar dates carrying an event marker.

***

### firstDayOfWeek

```ts
readonly firstDayOfWeek: InputSignal<DayOfWeek>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:187](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L187)

First day of the represented week.

***

### locale

```ts
readonly locale: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L158)

Overrides the locale used for day and month names.

***

### selectedDate

```ts
readonly selectedDate: InputSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L179)

Currently selected calendar date.

***

### showWeekNumber

```ts
readonly showWeekNumber: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L203)

Indicates whether the week-number column is visible.

***

### weekDates

```ts
protected readonly weekDates: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:227](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L227)

Dates contained by the represented week.

***

### weekNumber

```ts
protected readonly weekNumber: Signal<number>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:235](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L235)

ISO week number for the represented week.

## Methods

### formatDateLabel()

```ts
protected formatDateLabel(date): string;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:248](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L248)

Formats a complete accessible date label.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date to format. |

#### Returns

`string`

Localized accessible label.

***

### formatMonthLabel()

```ts
protected formatMonthLabel(date): string;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:259](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L259)

Formats the month label shown at a month boundary.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date to format. |

#### Returns

`string`

Localized short month or an empty label.

***

### isEventDate()

```ts
protected isEventDate(date): boolean;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:274](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L274)

Indicates whether the provided date carries an event marker.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date to inspect. |

#### Returns

`boolean`

Whether the exact calendar day is marked.

***

### isSelectedDate()

```ts
protected isSelectedDate(date): boolean;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L285)

Indicates whether the provided date is selected.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date to inspect. |

#### Returns

`boolean`

Whether the date is selected.

***

### isToday()

```ts
protected isToday(date): boolean;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L296)

Indicates whether the provided date is today.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date to inspect. |

#### Returns

`boolean`

Whether the date is today.

***

### onDateSelected()

```ts
protected onDateSelected(date): void;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L306)

Emits a defensive copy of the selected date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Selected date. |

#### Returns

`void`
