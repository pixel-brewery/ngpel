---
title: 'Function: withSearchProviders()'
generated: true
editUrl: false
---
# Function: withSearchProviders()

```ts
function withSearchProviders(options): IFeature<SearchFeatureKind>;
```

Defined in: [search/provider/withSearchProviders.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/withSearchProviders.ts#L26)

Declaratively contributes semantic search providers to `provideSearch()`. The feature is
multi-capable: every contributing feature composes one `withSearchProviders()` call.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IWithSearchProvidersOptions`](Interface.IWithSearchProvidersOptions) | The contribution: a stable id plus the provider classes. |

## Returns

[`IFeature`](Interface.IFeature)\<[`SearchFeatureKind`](TypeAlias.SearchFeatureKind)\>

The feature to pass to `provideSearch()`.

## Example

```typescript
provideSearch({}, withSearchProviders({ id: 'crm', providers: [CustomerSearchProvider] }));
```
