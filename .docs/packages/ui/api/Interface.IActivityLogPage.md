---
title: 'Interface: IActivityLogPage\<T\>'
generated: true
editUrl: false
---
# Interface: IActivityLogPage\<T\>

Defined in: [libs/ui/src/components/activity-log/IActivityLogPage.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogPage.ts#L2)

One page of entries, ordered newest first by the caller's data source.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Properties

### items

```ts
readonly items: readonly T[];
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogPage.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogPage.ts#L4)

Entries returned for the requested offset.

***

### total

```ts
readonly total: number;
```

Defined in: [libs/ui/src/components/activity-log/IActivityLogPage.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/IActivityLogPage.ts#L6)

Total entries for the current scope.
