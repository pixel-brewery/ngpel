---
title: 'Function: provideSearch()'
generated: true
editUrl: false
---
# Function: provideSearch()

```ts
function provideSearch(config, ...features): EnvironmentProviders;
```

Defined in: [search/provider/provideSearch.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/provideSearch.ts#L44)

Composition root of the search capability. It publishes the configuration, registers the
[SearchManager](Class.SearchManager) together with the default ranking, and composes the commands, providers and
renderers contributed by features. The manager is created eagerly so that a configured hotkey is
bound before the first surface exists.

`SearchSession` is deliberately not provided here: every surface declares it in its own
providers so that two surfaces keep separate state. Applications replace the ranking by
providing their own [SearchRankingStrategy](Class.SearchRankingStrategy) after this call.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | [`ISearchConfig`](Interface.ISearchConfig) | Behavioural options of the engine. Pass `{}` to accept every default. |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<[`SearchFeatureKind`](TypeAlias.SearchFeatureKind)\>[] | The contributions: `withSearchCommands()`, `withSearchProviders()` and `withSearchRenderers()`. |

## Returns

`EnvironmentProviders`

Environment providers for the application composition root.

## Throws

Error when two contributions of the same kind share an id.

## Example

```typescript
export const appConfig: ApplicationConfig = {
    providers: [
        provideSearch(
            { hotkey: 'meta+k', resultTake: 10 },
            withSearchCommands({ id: 'settings', sources: [SettingsCommandSource] }),
            withSearchProviders({ id: 'crm', providers: [CustomerSearchProvider] })
        )
    ]
};
```
