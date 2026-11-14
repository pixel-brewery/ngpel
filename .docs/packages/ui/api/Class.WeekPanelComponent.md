---
title: 'Class: WeekPanelComponent'
generated: true
editUrl: false
---
# Class: WeekPanelComponent

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:310](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L310)

## Constructors

### Constructor

```ts
new WeekPanelComponent(): WeekPanelComponent;
```

#### Returns

`WeekPanelComponent`

## Properties

### additionalWeeks

```ts
protected readonly additionalWeeks: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:558](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L558)

First dates of the weeks revealed by expansion.

The rows remain rendered while collapsed so their height can animate,
but the template keeps them hidden from accessibility and interaction.

***

### canExpand

```ts
protected readonly canExpand: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:484](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L484)

Whether the expansion control is available.

***

### collapseLabel

```ts
readonly collapseLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:460](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L460)

Accessible label for collapsing the panel.

***

### compactDays

```ts
readonly compactDays: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:332](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L332)

Uses the compact day cells in each displayed week.

***

### compactWeekCount

```ts
readonly compactWeekCount: InputSignal<number>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:364](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L364)

Number of weeks shown in the compact or fixed state.

***

### compactWeeks

```ts
protected readonly compactWeeks: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:547](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L547)

First dates of the weeks shown in the compact state.

***

### currentPage

```ts
protected readonly currentPage: Signal<IWeekPanelPage>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:519](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L519)

Weeks rendered by the current page.

***

### dateChanged

```ts
readonly dateChanged: OutputEmitterRef<Date>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:476](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L476)

Emits when a date is selected.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:420](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L420)

Whether all calendar interaction is disabled.

***

### displayDate

```ts
readonly displayDate: ModelSignal<Date>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L340)

Date contained by the first visible week.

***

### effectiveExpanded

```ts
protected readonly effectiveExpanded: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:495](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L495)

Effective expanded state after applying configuration.

***

### events

```ts
readonly events: InputSignal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:412](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L412)

Calendar dates carrying an event marker.

***

### expandable

```ts
readonly expandable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:380](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L380)

Whether the panel can switch between compact and expanded states.

***

### expanded

```ts
readonly expanded: ModelSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:356](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L356)

Whether the panel is expanded.

***

### expandedWeekCount

```ts
readonly expandedWeekCount: InputSignal<number>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:372](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L372)

Number of weeks shown in the expanded state.

***

### expandLabel

```ts
readonly expandLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:452](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L452)

Accessible label for expanding the panel.

***

### firstDayOfWeek

```ts
readonly firstDayOfWeek: InputSignal<DayOfWeek>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:404](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L404)

First day of every displayed week.

***

### isPaging

```ts
protected readonly isPaging: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:539](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L539)

Whether horizontal week paging is currently in progress.

***

### locale

```ts
readonly locale: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L329)

Overrides the locale used for the week and day names.

***

### navigationDirection

```ts
protected readonly navigationDirection: WritableSignal<WeekNavigationDirection | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:503](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L503)

Direction of the active horizontal paging animation.

***

### nextLabel

```ts
readonly nextLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:444](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L444)

Accessible label for next-week navigation.

***

### outgoingDisplayDate

```ts
protected readonly outgoingDisplayDate: WritableSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:511](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L511)

Date shown by the outgoing page while horizontal paging is active.

***

### outgoingPage

```ts
protected readonly outgoingPage: Signal<IWeekPanelPage | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:527](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L527)

Weeks retained for the outgoing half of a paging animation.

***

### panelLabel

```ts
readonly panelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:428](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L428)

Accessible label for the complete calendar-week panel.

***

### previousLabel

```ts
readonly previousLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:436](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L436)

Accessible label for previous-week navigation.

***

### selectedDate

```ts
readonly selectedDate: ModelSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L348)

Currently selected calendar date.

***

### showNavigation

```ts
readonly showNavigation: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L388)

Whether previous- and next-week navigation is visible.

***

### showWeekNumbers

```ts
readonly showWeekNumbers: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:396](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L396)

Whether ISO week numbers are visible.

***

### visibleWeeks

```ts
protected readonly visibleWeeks: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:566](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L566)

First dates of all currently visible weeks.

***

### weekdayDates

```ts
protected readonly weekdayDates: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:578](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L578)

Dates used to render the shared weekday heading.

***

### weekNumberLabel

```ts
readonly weekNumberLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:468](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L468)

Label shown above the optional week-number column.

***

### weeksId

```ts
protected readonly weeksId: string;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L319)

## Methods

### formatWeekday()

```ts
protected formatWeekday(date): string;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:591](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L591)

Formats a localized short weekday heading.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Date defining the weekday. |

#### Returns

`string`

Localized weekday heading.

***

### navigate()

```ts
protected navigate(direction): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:601](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L601)

Navigates by the number of calendar weeks currently visible.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `direction` | `WeekNavigationDirection` | Navigation direction. |

#### Returns

`void`

***

### onDateSelected()

```ts
protected onDateSelected(date): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:644](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L644)

Selects a date and publishes the panel's date-change contract.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `date` | `Date` | Selected date. |

#### Returns

`void`

***

### onPagingAnimationEnd()

```ts
protected onPagingAnimationEnd(event): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:629](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L629)

Releases the outgoing page after its horizontal paging animation.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `AnimationEvent` | Animation event emitted by the outgoing page itself. |

#### Returns

`void`

***

### onSwipeLeft()

```ts
protected onSwipeLeft(): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:667](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L667)

Navigates one week forward after a left swipe.

#### Returns

`void`

***

### onSwipeRight()

```ts
protected onSwipeRight(): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:676](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L676)

Navigates one week backward after a right swipe.

#### Returns

`void`

***

### toggleExpanded()

```ts
protected toggleExpanded(): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:685](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L685)

Switches between compact and expanded week counts.

#### Returns

`void`
