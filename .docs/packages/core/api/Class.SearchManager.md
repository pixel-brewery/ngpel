---
title: 'Class: SearchManager'
generated: true
editUrl: false
---
# Class: SearchManager

Defined in: [search/services/SearchManager.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L27)

Environment-wide owner of the search capability: it holds the registered contributors, the
surface state every search view binds to, and the querying itself. It is headless — it decides
*that* the surface should be open, never *how* it looks.

Exactly one instance exists per application; the per-surface state lives in `SearchSession`.

## Constructors

### Constructor

```ts
new SearchManager(): SearchManager;
```

Defined in: [search/services/SearchManager.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L52)

Constructs a new instance of the `SearchManager` class and binds the configured hotkey.

#### Returns

`SearchManager`

## Accessors

### activeProviderIds

#### Get Signature

```ts
get activeProviderIds(): Signal<readonly string[]>;
```

Defined in: [search/services/SearchManager.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L135)

The selected provider ids. An empty selection means "every accessible, non-exclusive
provider".

##### Returns

`Signal`\<readonly `string`[]\>

***

### exclusiveProviderId

#### Get Signature

```ts
get exclusiveProviderId(): Signal<string | null>;
```

Defined in: [search/services/SearchManager.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L145)

Id of the exclusive provider that currently replaces the ordinary result set, or `null`.

##### Returns

`Signal`\<`string` \| `null`\>

***

### focusRequest

#### Get Signature

```ts
get focusRequest(): Signal<number>;
```

Defined in: [search/services/SearchManager.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L101)

Monotonic counter incremented on every `open()`. Surfaces watch it to move the caret into
their input again even when the surface was already open.

##### Returns

`Signal`\<`number`\>

***

### isFocused

#### Get Signature

```ts
get isFocused(): Signal<boolean>;
```

Defined in: [search/services/SearchManager.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L90)

Indicates whether the launcher is in its expanded state. The results popup can be closed
while the launcher stays expanded.

##### Returns

`Signal`\<`boolean`\>

***

### isOpen

#### Get Signature

```ts
get isOpen(): Signal<boolean>;
```

Defined in: [search/services/SearchManager.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L79)

Indicates whether the result surface should be visible.

##### Returns

`Signal`\<`boolean`\>

***

### isRouteActive

#### Get Signature

```ts
get isRouteActive(): Signal<boolean>;
```

Defined in: [search/services/SearchManager.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L113)

Indicates whether a dedicated search route is currently active. The application reports it
through [SearchManager.setRouteActive](#setrouteactive); the engine only carries the flag so that a
launcher can step aside for a full-page surface.

##### Returns

`Signal`\<`boolean`\>

***

### providers

#### Get Signature

```ts
get providers(): readonly ISearchProvider<unknown>[];
```

Defined in: [search/services/SearchManager.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L124)

All registered providers the current user may access, exclusive ones included. Provider
filters must skip entries whose `isExclusive` is `true`.

##### Returns

readonly [`ISearchProvider`](Interface.ISearchProvider)\<`unknown`\>[]

## Methods

### activateResult()

```ts
activateResult(result): Promise<void>;
```

Defined in: [search/services/SearchManager.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L360)

Hands a selected result back to the provider that owns it. The owner is resolved from the
`'<providerId>:'` prefix of the result id and, failing that, from its `providerId`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`ISearchResult`](Interface.ISearchResult) | The selected result. |

#### Returns

`Promise`\<`void`\>

A promise that settles when the owning provider finished activating, or immediately
when no provider owns the result.

***

### close()

```ts
close(): void;
```

Defined in: [search/services/SearchManager.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L192)

Closes the search surface completely.

#### Returns

`void`

***

### closeResults()

```ts
closeResults(): void;
```

Defined in: [search/services/SearchManager.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L183)

Closes the results popup but keeps the launcher expanded.

#### Returns

`void`

***

### getCommands()

```ts
getCommands(query): Promise<readonly ICommandItem[]>;
```

Defined in: [search/services/SearchManager.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L296)

Queries the static commands and every registered command source. Static commands are matched
against label, description and keywords; sources match on their own terms.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |

#### Returns

`Promise`\<readonly [`ICommandItem`](Interface.ICommandItem)[]\>

The matching commands, static ones first.

#### Throws

The error of the first rejecting command source.

***

### open()

```ts
open(): void;
```

Defined in: [search/services/SearchManager.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L158)

Opens the search surface and asks it to take the caret.

#### Returns

`void`

***

### openResults()

```ts
openResults(): void;
```

Defined in: [search/services/SearchManager.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L170)

Re-opens the results popup of an already expanded launcher. Does nothing otherwise, so a
blurred launcher cannot be re-opened by a late result.

#### Returns

`void`

***

### query()

```ts
query(query, take?): Promise<readonly (
  | ICommandItem
| ISearchResult<unknown>)[]>;
```

Defined in: [search/services/SearchManager.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L281)

Queries commands and semantic results for one query.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |
| `take?` | `number` | Maximum number of results requested from each active provider. |

#### Returns

`Promise`\<readonly (
  \| [`ICommandItem`](Interface.ICommandItem)
  \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[]\>

The commands followed by the results.

#### Throws

The first provider error when every active provider failed.

***

### search()

```ts
search(query, take?): Promise<readonly ISearchResult<unknown>[]>;
```

Defined in: [search/services/SearchManager.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L318)

Queries the active semantic providers. A provider that rejects is skipped as long as one
provider answered, so a single failing backend cannot empty the surface; results are stamped
with their provider id and deduplicated by result id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |
| `take?` | `number` | Maximum number of results requested from each active provider. |

#### Returns

`Promise`\<readonly [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>[]\>

The deduplicated results in provider order.

#### Throws

The first provider error when every active provider failed.

***

### setExclusiveProvider()

```ts
setExclusiveProvider(providerId): void;
```

Defined in: [search/services/SearchManager.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L256)

Activates an exclusive provider: while it is set, only that provider is queried and the
ordinary provider filter is bypassed. Ids that are unknown, inaccessible or not marked
`isExclusive` are ignored.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `providerId` | `string` \| `null` | The exclusive provider to activate, or `null` to return to ordinary search. |

#### Returns

`void`

***

### setRouteActive()

```ts
setRouteActive(active): void;
```

Defined in: [search/services/SearchManager.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L218)

Reports whether a dedicated search route is active.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `active` | `boolean` | Whether the route is active. |

#### Returns

`void`

***

### toggle()

```ts
toggle(): void;
```

Defined in: [search/services/SearchManager.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L202)

Toggles the search surface.

#### Returns

`void`

***

### toggleActiveProvider()

```ts
toggleActiveProvider(providerId): void;
```

Defined in: [search/services/SearchManager.ts:229](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L229)

Adds or removes a provider from the filter. Ids that are unknown, inaccessible or exclusive
are ignored, so a stale filter chip cannot empty the result set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `providerId` | `string` \| `null` | The provider to toggle, or `null` to clear the filter. |

#### Returns

`void`
