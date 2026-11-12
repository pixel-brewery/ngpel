---
title: 'Interface: IActivityLogController\<T\>'
generated: true
editUrl: false
---
# Interface: IActivityLogController\<T\>

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L6)

State and actions of an activity log whose data source is supplied by its host.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Properties

### entries

```ts
readonly entries: Signal<readonly T[]>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L8)

Entries loaded for the active scope.

***

### hasMore

```ts
readonly hasMore: Signal<boolean>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L14)

Whether another page can be requested.

***

### loadMoreCommand

```ts
readonly loadMoreCommand: Command<void>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L18)

Requests the next page.

***

### moreState

```ts
readonly moreState: Signal<ActivityLogState>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L12)

Additional page request state, independent of visible entries.

***

### reloadCommand

```ts
readonly reloadCommand: Command<void>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L16)

Loads the first page again.

***

### state

```ts
readonly state: Signal<ActivityLogState>;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L10)

Initial request state.

## Methods

### ensureLoaded()

```ts
ensureLoaded(): void;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L22)

Loads the first page on initial display.

#### Returns

`void`

***

### itemKey()

```ts
itemKey(item): string | number;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L20)

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

Defined in: [libs/ui/src/components/activity-log/IActivityLogController.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogController.ts#L24)

Adds newly recorded entries while retaining previously loaded pages.

#### Returns

`void`
