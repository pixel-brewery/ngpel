---
title: 'Interface: ISearchProvider\<TData\>'
generated: true
editUrl: false
---
# Interface: ISearchProvider\<TData\>

Defined in: [search/models/ISearchProvider.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L15)

Contract for features that contribute semantic search. A provider searches its own domain
objects and activates a result when the user selects it.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TData` | `unknown` | Type of the opaque payload carried by the results of this provider. |

## Properties

### id

```ts
readonly id: string;
```

Defined in: [search/models/ISearchProvider.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L22)

Unique provider identifier, for example `'crm.customers'`. Prefix the ids of the results it
produces with it (`'crm.customers:42'`) so the manager can route activation back.

***

### isExclusive?

```ts
readonly optional isExclusive?: boolean;
```

Defined in: [search/models/ISearchProvider.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L41)

Marks the provider as exclusive: it is excluded from ordinary searches and from the provider
filter, and is queried only while it is the active exclusive provider. Products use this for
a mode that replaces the ordinary result set, such as an assistant answering the raw query.

#### Default Value

`false`

***

### label

```ts
readonly label: string;
```

Defined in: [search/models/ISearchProvider.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L27)

Human-readable label shown by provider filters.

***

### layout?

```ts
readonly optional layout?: SearchSectionLayout;
```

Defined in: [search/models/ISearchProvider.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L32)

Layout of the result section owned by this provider. Defaults to `'list'`.

## Methods

### activate()

```ts
activate(result): boolean | void | Promise<boolean | void>;
```

Defined in: [search/models/ISearchProvider.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L69)

Activates a result of this provider, for example by navigating to the entity it describes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`ISearchResult`](Interface.ISearchResult)\<`TData`\> | The selected result. |

#### Returns

`boolean` \| `void` \| `Promise`\<`boolean` \| `void`\>

`false` when the result could not be opened. A void return counts as success.

***

### canAccess()?

```ts
optional canAccess(): boolean;
```

Defined in: [search/models/ISearchProvider.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L51)

Determines whether the current user may use this provider. When omitted, the provider is
always accessible. Returning `false` hides it and excludes it from every query.

#### Returns

`boolean`

***

### search()

```ts
search(
   query,
   take?,
   signal?
):
  | readonly ISearchResult<TData>[]
| Promise<readonly ISearchResult<TData>[]>;
```

Defined in: [search/models/ISearchProvider.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchProvider.ts#L61)

Searches for results matching the query. An empty query asks for the provider's default
result set. Implementations may use the signal to stop work when the caller cancels.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The trimmed query, or an empty string for "return everything you have". |
| `take?` | `number` | Maximum number of results the surface will use, when it declared a limit. |
| `signal?` | `AbortSignal` | Cancels the request when supplied by the caller. |

#### Returns

  \| readonly [`ISearchResult`](Interface.ISearchResult)\<`TData`\>[]
  \| `Promise`\<readonly [`ISearchResult`](Interface.ISearchResult)\<`TData`\>[]\>
