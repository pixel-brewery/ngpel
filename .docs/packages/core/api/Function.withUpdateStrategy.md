---
title: 'Function: withUpdateStrategy()'
generated: true
editUrl: false
---
# Function: withUpdateStrategy()

```ts
function withUpdateStrategy(id, strategy): IFeature<UpdateFeatureKind>;
```

Defined in: [update/provider/withUpdateStrategy.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/withUpdateStrategy.ts#L20)

Registers an [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy). Strategy features are `multi`: several may be
composed as long as their ids differ, and every event reaches all of them.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Stable feature id, for example `'default'` or `'toast'`. |
| `strategy` | \| [`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy) \| `Type`\<[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy)\> | The strategy class (created through DI) or a ready instance. |

## Returns

[`IFeature`](Interface.IFeature)\<[`UpdateFeatureKind`](TypeAlias.UpdateFeatureKind)\>
