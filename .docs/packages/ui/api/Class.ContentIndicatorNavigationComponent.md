---
title: 'Class: ContentIndicatorNavigationComponent'
generated: true
editUrl: false
---
# Class: ContentIndicatorNavigationComponent

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:66](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L66)

Renders registered content destinations as a compact Mosaik position indicator.

## Constructors

### Constructor

```ts
new ContentIndicatorNavigationComponent(): ContentIndicatorNavigationComponent;
```

#### Returns

`ContentIndicatorNavigationComponent`

## Properties

### activeIndex

```ts
protected readonly activeIndex: Signal<number>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L115)

Zero-based indicator position of the destination represented by the viewport.

***

### contentNavigation

```ts
protected readonly contentNavigation: ContentNavigationContext;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L99)

Content navigation state shared with the registered destinations.

***

### items

```ts
protected readonly items: Signal<readonly IContentNavigationItem[]>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L107)

Registered destinations in their deterministic display order.

***

### itemTestIdPrefix

```ts
readonly itemTestIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L91)

Optional domain-specific prefix for interactive destination test identifiers.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L75)

Accessible name of the section navigation.

***

### orientation

```ts
readonly orientation: InputSignal<"horizontal" | "vertical">;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L83)

Direction in which registered destinations are displayed.

## Methods

### navigate()

```ts
protected navigate(id): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L139)

Navigates to a registered destination through its owning anchor.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Registered destination identifier. |

#### Returns

`void`

***

### resolveItemTestId()

```ts
protected resolveItemTestId(item): string | null;
```

Defined in: [libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts:150](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentIndicatorNavigationComponent.ts#L150)

Resolves a consumer-owned automation identifier for one destination.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | [`IContentNavigationItem`](Interface.IContentNavigationItem) | Registered destination metadata. |

#### Returns

`string` \| `null`

Stable test identifier or `null` when no prefix was supplied.
