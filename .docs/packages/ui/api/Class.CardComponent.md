---
title: 'Class: CardComponent'
generated: true
editUrl: false
---
# Class: CardComponent

Defined in: [libs/ui/src/components/card/CardComponent.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L60)

Preserves Mosaik card slots while allowing its body to collapse.

## Constructors

### Constructor

```ts
new CardComponent(destroyRef?): CardComponent;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L77)

Constructs a card and releases its accordion selection when destroyed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `destroyRef?` | `DestroyRef` |

#### Returns

`CardComponent`

## Properties

### effectiveIsExpandable

```ts
readonly effectiveIsExpandable: Signal<boolean>;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L99)

Whether the card shows its expansion control.

***

### hasActions

```ts
readonly hasActions: Signal<boolean>;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L117)

Whether a projected actions slot exists.

***

### hasFooter

```ts
readonly hasFooter: Signal<boolean>;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L125)

Whether a projected footer slot exists.

***

### isExpandable

```ts
readonly isExpandable: InputSignal<boolean | undefined>;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L91)

Overrides the owning view's expansion mode when supplied.

***

### isExpanded

```ts
readonly isExpanded: Signal<boolean>;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L107)

Whether the card body and footer are visible.

## Methods

### toggle()

```ts
toggle(): void;
```

Defined in: [libs/ui/src/components/card/CardComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/card/CardComponent.ts#L136)

Toggles this card's body when expansion is enabled.

#### Returns

`void`
