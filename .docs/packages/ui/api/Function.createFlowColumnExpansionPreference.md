---
title: 'Function: createFlowColumnExpansionPreference()'
generated: true
editUrl: false
---
# Function: createFlowColumnExpansionPreference()

```ts
function createFlowColumnExpansionPreference<TColumnKey>(storageKey, columnKeys): IFlowColumnExpansionPreference<TColumnKey>;
```

Defined in: [libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts#L42)

Creates a local-storage-backed flow-column expansion preference.

Collapsed keys are persisted instead of expanded keys so newly introduced
columns remain expanded by default.

## Type Parameters

| Type Parameter |
| ------ |
| `TColumnKey` *extends* `string` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `storageKey` | `string` | Stable local-storage key for this board. |
| `columnKeys` | readonly `TColumnKey`[] | Complete ordered set of supported column keys. |

## Returns

[`IFlowColumnExpansionPreference`](Interface.IFlowColumnExpansionPreference)\<`TColumnKey`\>

Persistent column expansion state.
