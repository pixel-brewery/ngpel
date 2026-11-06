---
title: 'Interface: ISearchResult\<TData\>'
generated: true
editUrl: false
---
# Interface: ISearchResult\<TData\>

Defined in: [search/models/ISearchResult.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L13)

A semantic search result produced by a search provider.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TData` | `unknown` | Type of the opaque payload the owning provider needs to activate the result. |

## Properties

### data?

```ts
readonly optional data?: ReadonlyDeep<TData>;
```

Defined in: [search/models/ISearchResult.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L64)

Optional payload handed back to the owning provider on activation. It is deeply readonly:
the result travels through ranking, grouping and rendering, and none of those may mutate it.

***

### description?

```ts
readonly optional description?: string;
```

Defined in: [search/models/ISearchResult.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L43)

Optional second line of descriptive text.

***

### group?

```ts
readonly optional group?: string;
```

Defined in: [search/models/ISearchResult.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L53)

Optional group heading. Results without a group are grouped by their provider id.

***

### icon?

```ts
readonly optional icon?: string;
```

Defined in: [search/models/ISearchResult.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L48)

Optional icon name. The surface decides which icon set the name is resolved against.

***

### id

```ts
readonly id: string;
```

Defined in: [search/models/ISearchResult.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L22)

Stable identifier of the result. Namespace it with the owning provider id
(`'<providerId>:<entityId>'`) — the manager resolves the activating provider from that
prefix before it falls back to [ISearchResult.providerId](#providerid). Results that share an id
are collapsed to the first occurrence.

***

### keywords?

```ts
readonly optional keywords?: readonly string[];
```

Defined in: [search/models/ISearchResult.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L58)

Optional synonyms that make the result findable under wording it does not display.

***

### label

```ts
readonly label: string;
```

Defined in: [search/models/ISearchResult.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L38)

Primary label text and the strongest ranking signal.

***

### providerId?

```ts
readonly optional providerId?: string;
```

Defined in: [search/models/ISearchResult.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L28)

Identifier of the provider that produced the result. The manager fills it in when the
provider left it empty, so consumers can rely on it.

***

### rendererId?

```ts
readonly optional rendererId?: string;
```

Defined in: [search/models/ISearchResult.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ISearchResult.ts#L33)

Optional renderer key selecting a registered renderer component. Defaults to the provider id.
