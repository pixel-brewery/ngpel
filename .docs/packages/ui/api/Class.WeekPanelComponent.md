---
title: 'Class: WeekPanelComponent'
generated: true
editUrl: false
---
# Class: WeekPanelComponent

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L306)

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

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:548](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L548)

First dates of the weeks revealed by expansion.

The rows remain rendered while collapsed so their height can animate,
but the template keeps them hidden from accessibility and interaction.

***

### canExpand

```ts
protected readonly canExpand: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:474](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L474)

Whether the expansion control is available.

***

### collapseLabel

```ts
readonly collapseLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L450)

Accessible label for collapsing the panel.

***

### compactWeekCount

```ts
readonly compactWeekCount: InputSignal<number>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L354)

Number of weeks shown in the compact or fixed state.

***

### compactWeeks

```ts
protected readonly compactWeeks: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:537](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L537)

First dates of the weeks shown in the compact state.

***

### currentPage

```ts
protected readonly currentPage: Signal<IWeekPanelPage>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L509)

Weeks rendered by the current page.

***

### dateChanged

```ts
readonly dateChanged: OutputEmitterRef<Date>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:466](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L466)

Emits when a date is selected.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:410](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L410)

Whether all calendar interaction is disabled.

***

### displayDate

```ts
readonly displayDate: ModelSignal<Date>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L330)

Date contained by the first visible week.

***

### effectiveExpanded

```ts
protected readonly effectiveExpanded: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:485](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L485)

Effective expanded state after applying configuration.

***

### events

```ts
readonly events: InputSignal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L402)

Calendar dates carrying an event marker.

***

### expandable

```ts
readonly expandable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L370)

Whether the panel can switch between compact and expanded states.

***

### expanded

```ts
readonly expanded: ModelSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L346)

Whether the panel is expanded.

***

### expandedWeekCount

```ts
readonly expandedWeekCount: InputSignal<number>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L362)

Number of weeks shown in the expanded state.

***

### expandLabel

```ts
readonly expandLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:442](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L442)

Accessible label for expanding the panel.

***

### firstDayOfWeek

```ts
readonly firstDayOfWeek: InputSignal<DayOfWeek>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:394](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L394)

First day of every displayed week.

***

### isPaging

```ts
protected readonly isPaging: Signal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:529](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L529)

Whether horizontal week paging is currently in progress.

***

### navigationDirection

```ts
protected readonly navigationDirection: WritableSignal<WeekNavigationDirection | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:493](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L493)

Direction of the active horizontal paging animation.

***

### nextLabel

```ts
readonly nextLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:434](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L434)

Accessible label for next-week navigation.

***

### outgoingDisplayDate

```ts
protected readonly outgoingDisplayDate: WritableSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L501)

Date shown by the outgoing page while horizontal paging is active.

***

### outgoingPage

```ts
protected readonly outgoingPage: Signal<IWeekPanelPage | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L517)

Weeks retained for the outgoing half of a paging animation.

***

### panelLabel

```ts
readonly panelLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:418](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L418)

Accessible label for the complete calendar-week panel.

***

### previousLabel

```ts
readonly previousLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L426)

Accessible label for previous-week navigation.

***

### selectedDate

```ts
readonly selectedDate: ModelSignal<Date | null>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:338](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L338)

Currently selected calendar date.

***

### showNavigation

```ts
readonly showNavigation: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L378)

Whether previous- and next-week navigation is visible.

***

### showWeekNumbers

```ts
readonly showWeekNumbers: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L386)

Whether ISO week numbers are visible.

***

### visibleWeeks

```ts
protected readonly visibleWeeks: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:556](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L556)

First dates of all currently visible weeks.

***

### weekdayDates

```ts
protected readonly weekdayDates: Signal<readonly Date[]>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L568)

Dates used to render the shared weekday heading.

***

### weekNumberLabel

```ts
readonly weekNumberLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:458](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L458)

Label shown above the optional week-number column.

***

### weeksId

```ts
protected readonly weeksId: string;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L315)

## Methods

### formatWeekday()

```ts
protected formatWeekday(date): string;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:581](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L581)

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

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:591](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L591)

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

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:634](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L634)

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

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:619](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L619)

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

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:657](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L657)

Navigates one week forward after a left swipe.

#### Returns

`void`

***

### onSwipeRight()

```ts
protected onSwipeRight(): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:666](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L666)

Navigates one week backward after a right swipe.

#### Returns

`void`

***

### toggleExpanded()

```ts
protected toggleExpanded(): void;
```

Defined in: [libs/ui/src/components/week-panel/WeekPanelComponent.ts:675](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/week-panel/WeekPanelComponent.ts#L675)

Switches between compact and expanded week counts.

#### Returns

`void`
