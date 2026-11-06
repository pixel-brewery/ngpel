---
title: 'Class: WeekStripComponent'
generated: true
editUrl: false
---
# Class: WeekStripComponent

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L75)

Displays one controlled calendar-week row inside a week panel.

## Constructors

### Constructor

```ts
new WeekStripComponent(): WeekStripComponent;
```

#### Returns

`WeekStripComponent`

## Properties

### dateSelected

```ts
readonly dateSelected: OutputEmitterRef<Date>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L148)

Emits the selected calendar date.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L140)

Whether day selection is disabled.

***

### displayDate

```ts
readonly displayDate: InputSignal<Date>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L100)

Date contained by the represented week.

***

### events

```ts
readonly events: InputSignal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L124)

Calendar dates carrying an event marker.

***

### firstDayOfWeek

```ts
readonly firstDayOfWeek: InputSignal<DayOfWeek>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L116)

First day of the represented week.

***

### selectedDate

```ts
readonly selectedDate: InputSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L108)

Currently selected calendar date.

***

### showWeekNumber

```ts
readonly showWeekNumber: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L132)

Indicates whether the week-number column is visible.

***

### weekDates

```ts
protected readonly weekDates: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L156)

Dates contained by the represented week.

***

### weekNumber

```ts
protected readonly weekNumber: Signal<number>;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L164)

ISO week number for the represented week.

## Methods

### formatDateLabel()

```ts
protected formatDateLabel(date): string;
```

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:177](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L177)

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

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L188)

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

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L203)

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

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:214](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L214)

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

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:225](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L225)

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

Defined in: [libs/ui/src/components/week-strip/WeekStripComponent.ts:235](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-strip/WeekStripComponent.ts#L235)

Emits a defensive copy of the selected date.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Selected date. |

#### Returns

`void`
