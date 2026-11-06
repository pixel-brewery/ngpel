---
title: 'Interface: IFlowColumnExpansionPreference\<TColumnKey\>'
generated: true
editUrl: false
---
# Interface: IFlowColumnExpansionPreference\<TColumnKey\>

Defined in: [libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts#L13)

Persistent expanded state for the columns of one flow board.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TColumnKey` *extends* `string` | `string` |

## Properties

### isColumnExpanded

```ts
readonly isColumnExpanded: (columnKey) => boolean;
```

Defined in: [libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts#L17)

Resolves whether one known column is expanded.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `columnKey` | `TColumnKey` |

#### Returns

`boolean`

***

### onColumnExpansionChanged

```ts
readonly onColumnExpansionChanged: (change) => void;
```

Defined in: [libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/flow/FlowColumnExpansionPreference.ts#L22)

Applies a column expansion change emitted by the board.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `change` | `unknown` |

#### Returns

`void`
