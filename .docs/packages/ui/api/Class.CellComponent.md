---
title: 'Class: CellComponent'
generated: true
editUrl: false
---
# Class: CellComponent

Defined in: [libs/ui/src/components/cell/CellComponent.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/cell/CellComponent.ts#L61)

Presents up to four semantic tracks inside an owning list item: title, description, hints and chips.
The list item remains responsible for click, focus and selection behavior.
Use named projection attributes for rich content and leading/trailing elements. A track can
alternatively use its text input; do not supply both forms for the same track.

## Constructors

### Constructor

```ts
new CellComponent(): CellComponent;
```

#### Returns

`CellComponent`

## Properties

### description

```ts
readonly description: InputSignal<string | null | undefined>;
```

Defined in: [libs/ui/src/components/cell/CellComponent.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/cell/CellComponent.ts#L78)

Plain description for the second track, alternative to the description projection.

***

### hints

```ts
readonly hints: InputSignal<readonly (string | null | undefined)[]>;
```

Defined in: [libs/ui/src/components/cell/CellComponent.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/cell/CellComponent.ts#L86)

Ordered third-track values; absent and empty entries are omitted before separators are placed.

***

### label

```ts
readonly label: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/cell/CellComponent.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/cell/CellComponent.ts#L70)

Plain title for the first track, alternative to the title projection.

***

### visibleHints

```ts
protected readonly visibleHints: Signal<string[]>;
```

Defined in: [libs/ui/src/components/cell/CellComponent.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/cell/CellComponent.ts#L94)

Hints that participate in the rendered sequence.
