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

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:82](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L82)

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

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L134)

Active view ID that should be scrolled into view.

***

### anchorRequest

```ts
readonly anchorRequest: InputSignal<number>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L167)

Monotonic request marker used to re-scroll the same active view.

***

### displayedViews

```ts
readonly displayedViews: Signal<IViewSlotDefinition<TSelection>[]>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L183)

Views that should actually be rendered.

***

### fillItems

```ts
readonly fillItems: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L159)

Indicates whether each rendered view should fill the available outlet height.

***

### hasViews

```ts
readonly hasViews: Signal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L207)

Indicates whether the active slot contains visible views.

***

### isLoading

```ts
readonly isLoading: Signal<boolean>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L191)

Indicates whether a lazy view component is loading.

***

### loadingViewId

```ts
readonly loadingViewId: Signal<string | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L199)

Identifier of the view currently loading.

***

### selection

```ts
readonly selection: InputSignal<TSelection | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:126](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L126)

Selection forwarded to registered view-slot activation predicates.

***

### slot

```ts
readonly slot: InputSignal<string>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:118](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L118)

Slot identifier whose active views should be rendered.

***

### views

```ts
readonly views: Signal<IViewSlotDefinition<TSelection>[]>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L175)

Active view definitions in the current slot.

***

### visibleViewId

```ts
readonly visibleViewId: InputSignal<string | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L143)

When set, only the view with this ID is rendered.
All other views remain in the slot registry but are hidden.

***

### visibleViewIds

```ts
readonly visibleViewIds: InputSignal<ReadonlySet<string> | null>;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L151)

When set, only views whose IDs belong to this set are rendered.

## Methods

### getComponent()

```ts
getComponent(viewId): Type<unknown> | null;
```

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:254](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L254)

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

Defined in: [libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts:220](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/view-slot-anchor-outlet/ViewSlotAnchorOutletComponent.ts#L220)

Gets a stable injector for the rendered view component.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewId` | `string` | View identifier inside the slot. |

#### Returns

`Injector`

Injector carrying the Mosaik view-slot context.
