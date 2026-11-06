---
title: 'Function: withSearchRenderers()'
generated: true
editUrl: false
---
# Function: withSearchRenderers()

```ts
function withSearchRenderers(options): IFeature<SearchFeatureKind>;
```

Defined in: [search/provider/withSearchRenderers.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/withSearchRenderers.ts#L24)

Declaratively contributes result renderer components to `provideSearch()`. The feature is
multi-capable: every contributing feature composes one `withSearchRenderers()` call.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithSearchRenderersOptions`](Interface.IWithSearchRenderersOptions) | The contribution: a stable id plus the renderer entries. |

## Returns

[`IFeature`](Interface.IFeature)\<[`SearchFeatureKind`](TypeAlias.SearchFeatureKind)\>

The feature to pass to `provideSearch()`.

## Example

```typescript
provideSearch({}, withSearchRenderers({ id: 'crm', entries: [{ id: 'crm.customers', component: CustomerResultView }] }));
```
