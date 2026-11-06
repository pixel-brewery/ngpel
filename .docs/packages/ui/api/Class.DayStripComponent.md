---
title: 'Class: DayStripComponent'
generated: true
editUrl: false
---
# Class: DayStripComponent

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L44)

Displays a horizontally scrollable day selector.

## Constructors

### Constructor

```ts
new DayStripComponent(): DayStripComponent;
```

#### Returns

`DayStripComponent`

## Properties

### displayDate

```ts
readonly displayDate: InputSignal<Date | "today" | null | undefined>;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L60)

The date that is currently displayed in the strip.

***

### selectedDate

```ts
readonly selectedDate: InputSignal<Date | null>;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L68)

The currently selected date.

***

### selectedDateChanged

```ts
readonly selectedDateChanged: OutputEmitterRef<{
  date: Date;
  sender: DayStripComponent;
}>;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L92)

Emits when a day is selected.

***

### showNavigation

```ts
readonly showNavigation: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L76)

Enables the previous and next navigation buttons.

***

### showToday

```ts
readonly showToday: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L84)

Enables the button that jumps back to today.

## Accessors

### currentDisplayDate

#### Get Signature

```ts
get protected currentDisplayDate(): Date;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L100)

Returns the current date shown by the component.

##### Returns

`Date`

***

### selectedDateValue

#### Get Signature

```ts
get protected selectedDateValue(): Date | null;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L116)

Returns the current selected date.

##### Returns

`Date` \| `null`

***

### today

#### Get Signature

```ts
get protected today(): Date;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L126)

Returns today's date.

##### Returns

`Date`

## Methods

### formatDisplayDate()

```ts
protected formatDisplayDate(date): string;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L156)

Formats the display date using the configured application locale.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`string`

***

### isSameDay()

```ts
protected isSameDay(firstDate, secondDate): boolean;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L139)

Compares two dates by day only.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `firstDate` | `Date` \| `null` \| `undefined` |
| `secondDate` | `Date` \| `null` \| `undefined` |

#### Returns

`boolean`

***

### onDateSelected()

```ts
protected onDateSelected(date): void;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L165)

Selects the provided date and emits the change event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `date` | `Date` |

#### Returns

`void`

***

### onDayChanged()

```ts
protected onDayChanged(direction): void;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L175)

Changes the visible day in the strip.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `direction` | `ScrollDirection` |

#### Returns

`void`

***

### onSwipeLeft()

```ts
protected onSwipeLeft(): void;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:208](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L208)

Navigates one day forward.

#### Returns

`void`

***

### onSwipeRight()

```ts
protected onSwipeRight(): void;
```

Defined in: [libs/ui/src/components/day-strip/DayStripComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/day-strip/DayStripComponent.ts#L199)

Navigates one day backward.

#### Returns

`void`
