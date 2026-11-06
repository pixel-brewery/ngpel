---
title: 'Class: SearchSession'
generated: true
editUrl: false
---
# Class: SearchSession

Defined in: [search/services/SearchSession.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L27)

View-independent state of one search surface: the query, the ranked sections, the active item
and the loading and error flags. It is deliberately not provided by `provideSearch()` — every
surface lists it in its own providers, so a launcher and a full-page surface keep separate state
while sharing the one [SearchManager](Class.SearchManager).

## Constructors

### Constructor

```ts
new SearchSession(): SearchSession;
```

Defined in: [search/services/SearchSession.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L57)

Constructs a new instance of the `SearchSession` class.

#### Returns

`SearchSession`

## Accessors

### activeItemId

#### Get Signature

```ts
get activeItemId(): Signal<string | null>;
```

Defined in: [search/services/SearchSession.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L117)

Id of the active item, or `null` while nothing is selectable.

##### Returns

`Signal`\<`string` \| `null`\>

***

### delay

#### Get Signature

```ts
get delay(): number;
```

Defined in: [search/services/SearchSession.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L158)

The configured input debounce in milliseconds.

##### Returns

`number`

***

### error

#### Get Signature

```ts
get error(): Signal<unknown>;
```

Defined in: [search/services/SearchSession.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L148)

The error of the last query, or `null` when it succeeded.

##### Returns

`Signal`\<`unknown`\>

***

### hasSearched

#### Get Signature

```ts
get hasSearched(): Signal<boolean>;
```

Defined in: [search/services/SearchSession.ts:128](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L128)

Indicates whether a non-empty query has been answered. Surfaces use it to tell "no results"
from "nothing typed yet".

##### Returns

`Signal`\<`boolean`\>

***

### isLoading

#### Get Signature

```ts
get isLoading(): Signal<boolean>;
```

Defined in: [search/services/SearchSession.ts:138](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L138)

Indicates whether a query is in flight.

##### Returns

`Signal`\<`boolean`\>

***

### items

#### Get Signature

```ts
get items(): Signal<readonly (
  | ICommandItem
| ISearchResult<unknown>)[]>;
```

Defined in: [search/services/SearchSession.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L107)

The selectable items of all sections in display order — the keyboard navigation order.

##### Returns

`Signal`\<readonly (
  \| [`ICommandItem`](Interface.ICommandItem)
  \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\>)[]\>

***

### query

#### Get Signature

```ts
get query(): Signal<string>;
```

Defined in: [search/services/SearchSession.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L87)

The current, trimmed query.

##### Returns

`Signal`\<`string`\>

***

### sections

#### Get Signature

```ts
get sections(): Signal<readonly ISearchSection[]>;
```

Defined in: [search/services/SearchSession.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L97)

The sections to render, commands first and one section per result group.

##### Returns

`Signal`\<readonly [`ISearchSection`](Interface.ISearchSection)[]\>

## Methods

### clear()

```ts
clear(): void;
```

Defined in: [search/services/SearchSession.ts:269](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L269)

Clears the query and returns to suggestion mode. A query in flight is discarded.

#### Returns

`void`

***

### initialize()

```ts
initialize(): Promise<void>;
```

Defined in: [search/services/SearchSession.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L172)

Loads the command catalogue shown before the user types. Repeated calls are ignored, so a
surface may call it on every open.

#### Returns

`Promise`\<`void`\>

***

### moveNext()

```ts
moveNext(): void;
```

Defined in: [search/services/SearchSession.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L285)

Moves the selection to the next item and wraps around at the end.

#### Returns

`void`

***

### movePrevious()

```ts
movePrevious(): void;
```

Defined in: [search/services/SearchSession.ts:302](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L302)

Moves the selection to the previous item and wraps around at the start.

#### Returns

`void`

***

### refreshResults()

```ts
refreshResults(): Promise<void>;
```

Defined in: [search/services/SearchSession.ts:243](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L243)

Re-runs the current query, for example after the provider filter changed. Does nothing while
the session is in suggestion mode.

#### Returns

`Promise`\<`void`\>

***

### select()

```ts
select(item): Promise<void>;
```

Defined in: [search/services/SearchSession.ts:335](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L335)

Selects an explicit item: commands execute, results are handed to their provider.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | \| [`ICommandItem`](Interface.ICommandItem) \| [`ISearchResult`](Interface.ISearchResult)\<`unknown`\> | The item to select. |

#### Returns

`Promise`\<`void`\>

***

### selectActive()

```ts
selectActive(): Promise<void>;
```

Defined in: [search/services/SearchSession.ts:319](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L319)

Selects the active item, if there is one.

#### Returns

`Promise`\<`void`\>

***

### setQueryText()

```ts
setQueryText(value): void;
```

Defined in: [search/services/SearchSession.ts:260](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L260)

Shows a query text without searching for it. Surfaces use it while an exclusive provider owns
the input, where the query is submitted explicitly instead of on every keystroke.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The text to display. |

#### Returns

`void`

***

### updateQuery()

```ts
updateQuery(value): Promise<void>;
```

Defined in: [search/services/SearchSession.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/services/SearchSession.ts#L190)

Runs a query and publishes its ranked commands and results. Answers of superseded queries are
discarded, so a slow provider cannot overwrite the result of a later keystroke.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` | The raw query; an empty one returns the session to suggestion mode. |

#### Returns

`Promise`\<`void`\>
