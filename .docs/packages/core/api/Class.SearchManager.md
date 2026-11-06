---
title: 'Class: SearchManager'
generated: true
editUrl: false
---
# Class: SearchManager

Defined in: [search/services/SearchManager.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L28)

Environment-wide owner of the search capability: it holds the registered contributors, the
surface state every search view binds to, and the querying itself. It is headless — it decides
*that* the surface should be open, never *how* it looks.

Exactly one instance exists per application; the per-surface state lives in `SearchSession`.

## Constructors

### Constructor

```ts
new SearchManager(): SearchManager;
```

Defined in: [search/services/SearchManager.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L53)

Constructs a new instance of the `SearchManager` class and binds the configured hotkey.

#### Returns

`SearchManager`

## Accessors

### activeProviderIds

#### Get Signature

```ts
get activeProviderIds(): Signal<readonly string[]>;
```

Defined in: [search/services/SearchManager.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L136)

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

Defined in: [search/services/SearchManager.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L146)

Id of the exclusive provider that currently replaces the ordinary result set, or `null`.

##### Returns

`Signal`\<`string` \| `null`\>

***

### focusRequest

#### Get Signature

```ts
get focusRequest(): Signal<number>;
```

Defined in: [search/services/SearchManager.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L102)

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

Defined in: [search/services/SearchManager.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L91)

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

Defined in: [search/services/SearchManager.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L80)

Indicates whether the result surface should be visible.

##### Returns

`Signal`\<`boolean`\>

***

### isRouteActive

#### Get Signature

```ts
get isRouteActive(): Signal<boolean>;
```

Defined in: [search/services/SearchManager.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L114)

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

Defined in: [search/services/SearchManager.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L125)

All registered providers the current user may access, exclusive ones included. Provider
filters must skip entries whose `isExclusive` is `true`.

##### Returns

readonly [`ISearchProvider`](Interface.ISearchProvider)\<`unknown`\>[]

## Methods

### activateResult()

```ts
activateResult(result): Promise<void>;
```

Defined in: [search/services/SearchManager.ts:389](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L389)

Hands a selected result back to the provider that owns it. The owner is resolved from the
longest registered `'<providerId>:'` prefix of the result id and, failing that, from its
`providerId`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `result` | [`ISearchResult`](Interface.ISearchResult) | The selected result. |

#### Returns

`Promise`\<`void`\>

A promise that settles when the owning provider finished activating.

#### Throws

The provider is unavailable or reported that it could not open the result.

***

### close()

```ts
close(): void;
```

Defined in: [search/services/SearchManager.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L193)

Closes the search surface completely.

#### Returns

`void`

***

### closeResults()

```ts
closeResults(): void;
```

Defined in: [search/services/SearchManager.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L184)

Closes the results popup but keeps the launcher expanded.

#### Returns

`void`

***

### getCommands()

```ts
getCommands(query, signal?): Promise<readonly ICommandItem[]>;
```

Defined in: [search/services/SearchManager.ts:299](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L299)

Queries the static commands and every registered command source. Static commands are matched
against label, description and keywords; sources match on their own terms.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |
| `signal?` | `AbortSignal` | Cancels the request when supplied by the caller. |

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

Defined in: [search/services/SearchManager.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L159)

Opens the search surface and asks it to take the caret.

#### Returns

`void`

***

### openResults()

```ts
openResults(): void;
```

Defined in: [search/services/SearchManager.ts:171](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L171)

Re-opens the results popup of an already expanded launcher. Does nothing otherwise, so a
blurred launcher cannot be re-opened by a late result.

#### Returns

`void`

***

### query()

```ts
query(
   query,
   take?,
   options?
): Promise<readonly (
  | ICommandItem
| ISearchResult<unknown>)[]>;
```

Defined in: [search/services/SearchManager.ts:283](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L283)

Queries commands and semantic results for one query.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |
| `take?` | `number` | Maximum number of results requested from each active provider. |
| `options?` | [`ISearchQueryOptions`](Interface.ISearchQueryOptions) | Optional progressive result delivery and cancellation. |

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
search(
   query,
   take?,
   options?
): Promise<readonly ISearchResult<unknown>[]>;
```

Defined in: [search/services/SearchManager.ts:330](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L330)

Queries the active semantic providers. A provider that rejects is skipped as long as one
provider answered, so a single failing backend cannot empty the surface; results are stamped
with their provider id and deduplicated by result id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The raw query; [SEARCH\_ALL\_QUERY](Variable.SEARCH_ALL_QUERY) asks for the complete catalogue. |
| `take?` | `number` | Maximum number of results requested from each active provider. |
| `options?` | [`ISearchQueryOptions`](Interface.ISearchQueryOptions) | Optional progressive result delivery and cancellation. |

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

Defined in: [search/services/SearchManager.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L257)

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

Defined in: [search/services/SearchManager.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L219)

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

Defined in: [search/services/SearchManager.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L203)

Toggles the search surface.

#### Returns

`void`

***

### toggleActiveProvider()

```ts
toggleActiveProvider(providerId): void;
```

Defined in: [search/services/SearchManager.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchManager.ts#L230)

Adds or removes a provider from the filter. Ids that are unknown, inaccessible or exclusive
are ignored, so a stale filter chip cannot empty the result set.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `providerId` | `string` \| `null` | The provider to toggle, or `null` to clear the filter. |

#### Returns

`void`
