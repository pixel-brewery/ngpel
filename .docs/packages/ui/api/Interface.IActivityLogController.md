---
title: 'Interface: IActivityLogController\<T\>'
generated: true
editUrl: false
---
# Interface: IActivityLogController\<T\>

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:6

State and actions of an activity log whose data source is supplied by its host.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Properties

### entries

```ts
readonly entries: Signal<readonly T[]>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:8

Entries loaded for the active scope.

***

### hasMore

```ts
readonly hasMore: Signal<boolean>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:14

Whether another page can be requested.

***

### loadMoreCommand

```ts
readonly loadMoreCommand: Command<void>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:18

Requests the next page.

***

### moreState

```ts
readonly moreState: Signal<ActivityLogState>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:12

Additional page request state, independent of visible entries.

***

### reloadCommand

```ts
readonly reloadCommand: Command<void>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:16

Loads the first page again.

***

### state

```ts
readonly state: Signal<ActivityLogState>;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:10

Initial request state.

## Methods

### ensureLoaded()

```ts
ensureLoaded(): void;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:22

Loads the first page on initial display.

#### Returns

`void`

***

### itemKey()

```ts
itemKey(item): string | number;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:20

Resolves the stable entry key for rendering.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `item` | `T` |

#### Returns

`string` \| `number`

***

### refresh()

```ts
refresh(): void;
```

Defined in: libs/ui/src/components/activity-log/IActivityLogController.ts:24

Adds newly recorded entries while retaining previously loaded pages.

#### Returns

`void`
