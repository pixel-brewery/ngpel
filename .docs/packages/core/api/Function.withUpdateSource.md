---
title: 'Function: withUpdateSource()'
generated: true
editUrl: false
---
# Function: withUpdateSource()

```ts
function withUpdateSource(id, source): IFeature<UpdateFeatureKind>;
```

Defined in: [update/provider/withUpdateSource.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/withUpdateSource.ts#L20)

Registers the [IUpdateSource](Interface.IUpdateSource) the manager listens to. Only one source feature may be
composed; the feature kernel rejects a second one.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Stable feature id, for example `'serviceWorker'` or `'electron'`. |
| `source` | \| [`IUpdateSource`](Interface.IUpdateSource) \| `Type`\<[`IUpdateSource`](Interface.IUpdateSource)\> | The source class (created through DI) or a ready instance. |

## Returns

[`IFeature`](Interface.IFeature)\<[`UpdateFeatureKind`](TypeAlias.UpdateFeatureKind)\>
