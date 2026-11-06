---
title: 'Function: withDefaultUpdateStrategy()'
generated: true
editUrl: false
---
# Function: withDefaultUpdateStrategy()

```ts
function withDefaultUpdateStrategy(): IFeature<UpdateFeatureKind>;
```

Defined in: [update/provider/withDefaultUpdateStrategy.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/withDefaultUpdateStrategy.ts#L16)

Registers the console-only [DefaultUpdateHandlerStrategy](Class.DefaultUpdateHandlerStrategy). Applied automatically when
`provideUpdate()` receives no strategy feature at all.

## Returns

[`IFeature`](Interface.IFeature)\<[`UpdateFeatureKind`](TypeAlias.UpdateFeatureKind)\>
