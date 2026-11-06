---
title: 'Interface: ISearchConfig'
generated: true
editUrl: false
---
# Interface: ISearchConfig

Defined in: [search/provider/ISearchConfig.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L6)

Behavioural options of the search engine, published through `SEARCH_CONFIG`.

## Properties

### commandSectionLabelKey?

```ts
readonly optional commandSectionLabelKey?: string;
```

Defined in: [search/provider/ISearchConfig.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L56)

Translation key emitted as `ISearchSection.labelKey` for the command section. Left empty the
section carries no label and the surface supplies its own wording; the package deliberately
ships no translation keys of its own.

***

### delay?

```ts
readonly optional delay?: number;
```

Defined in: [search/provider/ISearchConfig.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L21)

Debounce delay in milliseconds a surface should apply to its input before querying.

#### Default Value

`150`

***

### hotkey?

```ts
readonly optional hotkey?: string;
```

Defined in: [search/provider/ISearchConfig.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L14)

Keyboard gesture that opens the search surface, written as `'<modifier>+...+<key>'` — for
example `'meta+k'`, `'ctrl+k'` or `'/'`. Case-insensitive. When omitted, no global key
listener is installed at all.

***

### maxCommandSuggestions?

```ts
readonly optional maxCommandSuggestions?: number;
```

Defined in: [search/provider/ISearchConfig.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L28)

Maximum number of command suggestions shown before the semantic results.

#### Default Value

`6`

***

### resultGroupOrder?

```ts
readonly optional resultGroupOrder?: "ranked" | "provider";
```

Defined in: [search/provider/ISearchConfig.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L41)

Orders result sections by the registration order of the provider that produced their first
result. The default follows the order in which groups first appear among ranked results.

***

### resultTake?

```ts
readonly optional resultTake?: number;
```

Defined in: [search/provider/ISearchConfig.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L35)

Maximum number of results requested from each active provider.

#### Default Value

`20`

***

### showCommands?

```ts
readonly optional showCommands?: boolean;
```

Defined in: [search/provider/ISearchConfig.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/provider/ISearchConfig.ts#L49)

Whether the session emits the command section. When `false`, commands are suppressed even
though command features are registered.

#### Default Value

`true`
