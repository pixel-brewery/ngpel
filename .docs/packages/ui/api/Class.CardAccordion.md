---
title: 'Class: CardAccordion'
generated: true
editUrl: false
---
# Class: CardAccordion

Defined in: libs/ui/src/components/card/CardAccordion.ts:13

Coordinates the expansion of cards within one owning view.

## Constructors

### Constructor

```ts
new CardAccordion(): CardAccordion;
```

#### Returns

`CardAccordion`

## Accessors

### expandedCard

#### Get Signature

```ts
get expandedCard(): Signal<object | null>;
```

Defined in: libs/ui/src/components/card/CardAccordion.ts:42

The currently expanded card, if any.

##### Returns

`Signal`\<`object` \| `null`\>

***

### isExpandable

#### Get Signature

```ts
get isExpandable(): Signal<boolean>;
```

Defined in: libs/ui/src/components/card/CardAccordion.ts:32

Whether cards in this view can be expanded individually.

##### Returns

`Signal`\<`boolean`\>

## Methods

### release()

```ts
release(card): void;
```

Defined in: libs/ui/src/components/card/CardAccordion.ts:81

Clears an active card when it leaves the owning view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `card` | `object` | Card leaving the view. |

#### Returns

`void`

***

### setExpandable()

```ts
setExpandable(value): void;
```

Defined in: libs/ui/src/components/card/CardAccordion.ts:56

Applies the owning view's responsive expansion mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | Whether the cards are expandable. |

#### Returns

`void`

***

### toggle()

```ts
toggle(card): void;
```

Defined in: libs/ui/src/components/card/CardAccordion.ts:71

Opens one card and closes the previous card, or closes the active card.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `card` | `object` | Card whose expansion is toggled. |

#### Returns

`void`
