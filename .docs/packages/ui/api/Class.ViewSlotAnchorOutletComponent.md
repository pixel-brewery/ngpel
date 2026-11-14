---
title: 'Class: ViewSlotAnchorOutletComponent\<TSelection\>'
generated: true
editUrl: false
---
# Class: ViewSlotAnchorOutletComponent\<TSelection\>

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L64)

Renders active Mosaik view-slot entries with stable DOM anchors.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| <a id="type-parameter-tselection"></a> `TSelection` | `unknown` |

## Constructors

### Constructor

```ts
new ViewSlotAnchorOutletComponent<TSelection>(registry?, parentInjector?): ViewSlotAnchorOutletComponent<TSelection>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:83](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L83)

Constructs a new instance of the `ViewSlotAnchorOutletComponent` class.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `registry?` | `ViewSlotRegistry` |
| `parentInjector?` | `Injector` |

#### Returns

`ViewSlotAnchorOutletComponent`\<`TSelection`\>

## Properties

### activeViewId

```ts
readonly activeViewId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L135)

Active view ID that should be scrolled into view.

***

### anchorRequest

```ts
readonly anchorRequest: InputSignal<number>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L168)

Monotonic request marker used to re-scroll the same active view.

***

### displayedViews

```ts
readonly displayedViews: Signal<IViewSlotDefinition<TSelection>[]>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L184)

Views that should actually be rendered.

***

### fillItems

```ts
readonly fillItems: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:160](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L160)

Indicates whether each rendered view should fill the available outlet height.

***

### hasViews

```ts
readonly hasViews: Signal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:208](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L208)

Indicates whether the active slot contains visible views.

***

### isLoading

```ts
readonly isLoading: Signal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L192)

Indicates whether a lazy view component is loading.

***

### loadingViewId

```ts
readonly loadingViewId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:200](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L200)

Identifier of a pending view, or null when all views have finished loading.

***

### selection

```ts
readonly selection: InputSignal<TSelection | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L127)

Selection forwarded to registered view-slot activation predicates.

***

### slot

```ts
readonly slot: InputSignal<string>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L119)

Slot identifier whose active views should be rendered.

***

### views

```ts
readonly views: Signal<IViewSlotDefinition<TSelection>[]>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L176)

Active view definitions in the current slot.

***

### visibleViewId

```ts
readonly visibleViewId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L144)

When set, only the view with this ID is rendered.
All other views remain in the slot registry but are hidden.

***

### visibleViewIds

```ts
readonly visibleViewIds: InputSignal<ReadonlySet<string> | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L152)

When set, only views whose IDs belong to this set are rendered.

## Methods

### getComponent()

```ts
getComponent(viewId): Type<unknown> | null;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L255)

Gets the loaded Angular component for a view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewId` | `string` | View identifier inside the slot. |

#### Returns

`Type`\<`unknown`\> \| `null`

Component type when loaded; otherwise `null`.

***

### getInjectorForView()

```ts
getInjectorForView(viewId): Injector;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L221)

Gets a stable injector for the rendered view component.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewId` | `string` | View identifier inside the slot. |

#### Returns

`Injector`

Injector carrying the Mosaik view-slot context.
