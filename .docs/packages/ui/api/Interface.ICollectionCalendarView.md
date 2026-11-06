---
title: 'Interface: ICollectionCalendarView\<TItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionCalendarView\<TItem\>

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarView.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarView.ts#L12)

Runtime calendar projection for a collection view.

## Extends

- `Omit`\<[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig)\<`TItem`, `string`\>, `"type"` \| `"label"` \| `"iconName"` \| `"viewKind"`\>

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |

## Properties

### eventAllDay?

```ts
readonly optional eventAllDay?: (item) => boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L58)

Resolves whether the item is an all-day event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`boolean`

#### Inherited from

```ts
Omit.eventAllDay
```

***

### eventContent?

```ts
readonly optional eventContent?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L43)

Resolves optional content for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

#### Inherited from

```ts
Omit.eventContent
```

***

### eventEnd

```ts
readonly eventEnd: (item) => Date;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L33)

Resolves the end date/time for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`Date`

#### Inherited from

```ts
Omit.eventEnd
```

***

### eventKey

```ts
readonly eventKey: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L23)

Resolves a unique key for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

```ts
Omit.eventKey
```

***

### eventStart

```ts
readonly eventStart: (item) => Date;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L28)

Resolves the start date/time for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`Date`

#### Inherited from

```ts
Omit.eventStart
```

***

### eventStatus?

```ts
readonly optional eventStatus?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L53)

Resolves the event status for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

#### Inherited from

```ts
Omit.eventStatus
```

***

### eventTitle

```ts
readonly eventTitle: (item) => string;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L38)

Resolves the display title for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string`

#### Inherited from

```ts
Omit.eventTitle
```

***

### eventVariant?

```ts
readonly optional eventVariant?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L48)

Resolves the visual variant for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

#### Inherited from

```ts
Omit.eventVariant
```

***

### firstDayOfWeek?

```ts
readonly optional firstDayOfWeek?: DayOfWeek;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L83)

First day of the week.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`firstDayOfWeek`](Interface.ICollectionCalendarViewConfig#firstdayofweek)

***

### hourEnd?

```ts
readonly optional hourEnd?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L73)

Last visible hour in timeGrid view.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`hourEnd`](Interface.ICollectionCalendarViewConfig#hourend)

***

### hourStart?

```ts
readonly optional hourStart?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L68)

First visible hour in timeGrid view.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`hourStart`](Interface.ICollectionCalendarViewConfig#hourstart)

***

### isTodayHighlighted?

```ts
readonly optional isTodayHighlighted?: boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L88)

Whether to highlight the current day.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`isTodayHighlighted`](Interface.ICollectionCalendarViewConfig#istodayhighlighted)

***

### isWeekendHighlighted?

```ts
readonly optional isWeekendHighlighted?: boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L93)

Whether to highlight weekends.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`isWeekendHighlighted`](Interface.ICollectionCalendarViewConfig#isweekendhighlighted)

***

### schedulerView?

```ts
readonly optional schedulerView?: SchedulerView;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L63)

Default scheduler view mode.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`schedulerView`](Interface.ICollectionCalendarViewConfig#schedulerview)

***

### stepMinutes?

```ts
readonly optional stepMinutes?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L78)

Time slot step in minutes.

#### Inherited from

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig).[`stepMinutes`](Interface.ICollectionCalendarViewConfig#stepminutes)

***

### viewIconName?

```ts
readonly optional viewIconName?: string;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarView.ts#L16)

Optional icon name used by feature-specific view toggles.
