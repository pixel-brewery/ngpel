---
title: 'Interface: ICommandItem'
generated: true
editUrl: false
---
# Interface: ICommandItem

Defined in: [search/models/ICommandItem.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L8)

A single executable action offered by the command palette. Features contribute command items
either statically through `withSearchCommands({ commands })` or dynamically through a command
source, and the surface renders them without knowing the feature that owns them.

## Properties

### description?

```ts
readonly description?: string;
```

Defined in: [search/models/ICommandItem.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L25)

Optional description shown as help text and matched with a lower weight than the label.

***

### group?

```ts
readonly group?: string;
```

Defined in: [search/models/ICommandItem.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L35)

Optional category heading used for visual grouping.

***

### icon?

```ts
readonly icon?: string;
```

Defined in: [search/models/ICommandItem.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L30)

Optional icon name. The surface decides which icon set the name is resolved against.

***

### id

```ts
readonly id: string;
```

Defined in: [search/models/ICommandItem.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L14)

Stable identifier of the command. Duplicates are collapsed to the first occurrence.

***

### keywords?

```ts
readonly keywords?: readonly string[];
```

Defined in: [search/models/ICommandItem.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L40)

Optional synonyms that make the command findable under wording it does not display.

***

### label

```ts
readonly label: string;
```

Defined in: [search/models/ICommandItem.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L20)

Display label. Keep it short — it is the primary line of the palette row and the strongest
ranking signal.

***

### shortcutHint?

```ts
readonly shortcutHint?: string;
```

Defined in: [search/models/ICommandItem.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L45)

Optional keyboard shortcut hint. Purely visual — the palette does not bind it.

## Methods

### execute()

```ts
execute(): unknown;
```

Defined in: [search/models/ICommandItem.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/ICommandItem.ts#L55)

Executes the command. The surface awaits the return value, so a promise delays the
selection until the action settled; any returned value is for diagnostics only.

#### Returns

`unknown`
