---
title: 'Interface: IWithSearchProvidersOptions'
generated: true
editUrl: false
---
# Interface: IWithSearchProvidersOptions

Defined in: [search/provider/IWithSearchProvidersOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchProvidersOptions.ts#L13)

Options for contributing semantic search providers through `withSearchProviders()`.

## Properties

### id

```ts
readonly id: string;
```

Defined in: [search/provider/IWithSearchProvidersOptions.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchProvidersOptions.ts#L19)

Stable unique id of this contribution (unique among all provider features).

***

### providers

```ts
readonly providers: readonly Type<ISearchProvider<unknown>>[];
```

Defined in: [search/provider/IWithSearchProvidersOptions.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/IWithSearchProvidersOptions.ts#L25)

Injectable provider classes. Each class is registered as itself and as a search provider, so
it can inject services and be injected in turn.
