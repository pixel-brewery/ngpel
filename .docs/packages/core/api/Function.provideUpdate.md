---
title: 'Function: provideUpdate()'
generated: true
editUrl: false
---
# Function: provideUpdate()

```ts
function provideUpdate(config?, ...features): EnvironmentProviders;
```

Defined in: [update/provider/provideUpdate.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/provideUpdate.ts#L37)

Root environment provider of the update lifecycle: composes the source and strategy features,
creates the [UpdateManager](Class.UpdateManager) eagerly and disposes it with the environment injector. Without
a strategy feature the console-only default is registered; a source feature is mandatory and
missing one fails fast when the manager is created.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config?` | [`IUpdateConfig`](Interface.IUpdateConfig) | Optional lifecycle options and text overrides. |
| ...`features?` | readonly [`IFeature`](Interface.IFeature)\<[`UpdateFeatureKind`](TypeAlias.UpdateFeatureKind)\>[] | `withUpdateSource()` / `withServiceWorkerUpdateSource()` plus any `withUpdateStrategy()`. |

## Returns

`EnvironmentProviders`
