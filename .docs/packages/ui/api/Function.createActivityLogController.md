---
title: 'Function: createActivityLogController()'
generated: true
editUrl: false
---
# Function: createActivityLogController()

```ts
function createActivityLogController<T>(options): IActivityLogController<T>;
```

Defined in: [libs/ui/src/components/activity-log/createActivityLogController.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/activity-log/createActivityLogController.ts#L20)

Owns paging and cancellation for one activity view. Create in the host's injection context.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IActivityLogControllerOptions`](Interface.IActivityLogControllerOptions)\<`T`\> | Source, stable identity, and optional reactive scope. |

## Returns

[`IActivityLogController`](Interface.IActivityLogController)\<`T`\>

The log controller.
