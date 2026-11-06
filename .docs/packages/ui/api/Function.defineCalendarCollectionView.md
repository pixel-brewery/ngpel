---
title: 'Function: defineCalendarCollectionView()'
generated: true
editUrl: false
---
# Function: defineCalendarCollectionView()

```ts
function defineCalendarCollectionView<TItem, TView>(config): ICollectionCalendarViewConfig<TItem, TView>;
```

Defined in: [libs/ui/src/collection-view/views/calendar/defineCalendarCollectionView.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/calendar/defineCalendarCollectionView.ts#L16)

Defines a calendar collection view with full type inference.

## Type Parameters

| Type Parameter |
| ------ |
| `TItem` |
| `TView` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | `Omit`\<[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig)\<`TItem`, `TView`\>, `"viewKind"`\> | The calendar view configuration. |

## Returns

[`ICollectionCalendarViewConfig`](Interface.ICollectionCalendarViewConfig)\<`TItem`, `TView`\>

The calendar view configuration.
