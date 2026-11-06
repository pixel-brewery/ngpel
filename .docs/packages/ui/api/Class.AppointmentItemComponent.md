---
title: 'Class: AppointmentItemComponent'
generated: true
editUrl: false
---
# Class: AppointmentItemComponent

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L43)

The `AppointmentItemComponent` component.

## Constructors

### Constructor

```ts
new AppointmentItemComponent(): AppointmentItemComponent;
```

#### Returns

`AppointmentItemComponent`

## Properties

### date

```ts
readonly date: InputSignal<string | Date | null | undefined>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L90)

The date of the appointment item.

***

### icon

```ts
readonly icon: InputSignal<string | null | undefined>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L82)

The icon name for the appointment item, used for visual indication.

***

### priority

```ts
readonly priority: InputSignal<string>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L74)

The priority label of the appointment item.

***

### showDate

```ts
readonly showDate: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L99)

Controls whether the date part is visible.
When false, a spacer is rendered instead.

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L66)

The title of the appointment item.

***

### variant

```ts
readonly variant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L58)

The variant of the appointment item, affecting its appearance and border color.

## Methods

### borderColorClass()

```ts
protected borderColorClass(): string;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L168)

Returns the Mosaik token utility for the appointment state.

#### Returns

`string`

***

### formatDay()

```ts
protected formatDay(): string;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L111)

Returns the day number of the appointment's due date.

#### Returns

`string`

Day number string.

***

### formatMonthAndWeekday()

```ts
protected formatMonthAndWeekday(): string;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L135)

Returns the short weekday of the appointment's due date.

#### Returns

`string`

Abbreviated weekday string.

***

### formatYear()

```ts
protected formatYear(): string;
```

Defined in: [libs/ui/src/components/appointment-item/AppointmentItemComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/appointment-item/AppointmentItemComponent.ts#L157)

Returns the full year so dates remain unambiguous across year boundaries.

#### Returns

`string`
