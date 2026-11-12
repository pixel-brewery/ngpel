---
title: 'Interface: ICollectionCalendarViewConfig\<TItem, TView\>'
generated: true
editUrl: false
---
# Interface: ICollectionCalendarViewConfig\<TItem, TView\>

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L14)

Configuration for the calendar projection of a collection view.

## Extends

- [`ICollectionViewDefinition`](Interface.ICollectionViewDefinition)\<`TView`\>

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |
| <a id="type-parameter-tview"></a> `TView` *extends* `string` |

## Properties

### eventAllDay?

```ts
readonly eventAllDay?: (item) => boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L58)

Resolves whether the item is an all-day event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`boolean`

***

### eventContent?

```ts
readonly eventContent?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L43)

Resolves optional content for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

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

***

### eventStatus?

```ts
readonly eventStatus?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L53)

Resolves the event status for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

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

***

### eventVariant?

```ts
readonly eventVariant?: (item) => string | undefined;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L48)

Resolves the visual variant for the scheduler event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `TItem` |

#### Returns

`string` \| `undefined`

***

### firstDayOfWeek?

```ts
readonly firstDayOfWeek?: DayOfWeek;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L83)

First day of the week.

***

### hourEnd?

```ts
readonly hourEnd?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L73)

Last visible hour in timeGrid view.

***

### hourStart?

```ts
readonly hourStart?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L68)

First visible hour in timeGrid view.

***

### iconName?

```ts
readonly iconName?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L20)

Optional icon name used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`iconName`](Interface.ICollectionViewDefinition#iconname)

***

### isTodayHighlighted?

```ts
readonly isTodayHighlighted?: boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L88)

Whether to highlight the current day.

***

### isWeekendHighlighted?

```ts
readonly isWeekendHighlighted?: boolean;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L93)

Whether to highlight weekends.

***

### label?

```ts
readonly label?: string;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L15)

Optional display label used by feature-specific toggles.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`label`](Interface.ICollectionViewDefinition#label)

***

### schedulerView?

```ts
readonly schedulerView?: SchedulerView;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L63)

Default scheduler view mode.

***

### stepMinutes?

```ts
readonly stepMinutes?: number;
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L78)

Time slot step in minutes.

***

### type

```ts
readonly type: TView;
```

Defined in: [libs/ui/src/collection-view/core/ICollectionViewDefinition.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/core/ICollectionViewDefinition.ts#L10)

Stable view type key.

#### Inherited from

[`ICollectionViewDefinition`](Interface.ICollectionViewDefinition).[`type`](Interface.ICollectionViewDefinition#type)

***

### viewKind

```ts
readonly viewKind: "calendar";
```

Defined in: [libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/ICollectionCalendarViewConfig.ts#L18)

Discriminator used by the collection-view factory.
