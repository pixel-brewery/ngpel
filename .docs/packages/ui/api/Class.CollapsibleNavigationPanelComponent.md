---
title: 'Class: CollapsibleNavigationPanelComponent'
generated: true
editUrl: false
---
# Class: CollapsibleNavigationPanelComponent

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:151

A page-level navigation panel with independent scrolling and a compact rail.
Both navigation views stay mounted. On narrow viewports the expanded panel overlays adjacent content.

## Constructors

### Constructor

```ts
new CollapsibleNavigationPanelComponent(): CollapsibleNavigationPanelComponent;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:164

Moves focus into an expanded overlay when it was opened from outside the panel.

#### Returns

`CollapsibleNavigationPanelComponent`

## Properties

### collapseLabel

```ts
readonly collapseLabel: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:183

Accessible name of the collapse action.

***

### contentId

```ts
readonly contentId: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:179

ID of the navigation content controlled by the toggle.

***

### expanded

```ts
readonly expanded: ModelSignal<boolean>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:185

Whether the navigation is expanded. Can be bound bidirectionally.

***

### expandLabel

```ts
readonly expandLabel: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:181

Accessible name of the expand action.

***

### isOverlayOpen

```ts
readonly isOverlayOpen: Signal<boolean>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:189

Whether the expanded panel overlays adjacent content. Use this to make that content inert.

***

### isOverlayViewport

```ts
protected readonly isOverlayViewport: Signal<boolean>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:191

***

### overlay

```ts
readonly overlay: InputSignal<boolean | null>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:187

Overrides the narrow viewport layout. Leave it unset to follow the application breakpoint.

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:177

Heading and accessible name of the panel.

## Methods

### dismiss()

```ts
protected dismiss(event?): void;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:201

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`

***

### toggleExpanded()

```ts
protected toggleExpanded(): void;
```

Defined in: libs/ui/src/components/navigation/CollapsibleNavigationPanelComponent.ts:197

#### Returns

`void`
