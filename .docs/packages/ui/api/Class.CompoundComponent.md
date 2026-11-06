---
title: 'Class: CompoundComponent\<T\>'
generated: true
editUrl: false
---
# Class: CompoundComponent\<T\>

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:224](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L224)

Renders one item of a collection at a time with generic navigation and creation controls.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Collection item type supplied by the consumer. |

## Implements

- `ITourAccessor`
- `OnInit`

## Constructors

### Constructor

```ts
new CompoundComponent<T>(): CompoundComponent<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:277](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L277)

Constructs the component and keeps its selection valid as the collection changes.

#### Returns

`CompoundComponent`\<`T`\>

## Properties

### actionsTemplate

```ts
protected readonly actionsTemplate: Signal<
  | CompoundActionsDirective
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:604](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L604)

Optional consumer template replacing the built-in add action.

***

### activeIndex

```ts
protected readonly activeIndex: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:668](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L668)

Selected index restricted to the current collection range.

***

### activeItemKey

```ts
protected readonly activeItemKey: Signal<unknown>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:724](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L724)

Identity of the currently active item.

***

### addLabel

```ts
readonly addLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L362)

Accessible label for the add-item button.

***

### addRequested

```ts
readonly addRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:527](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L527)

Emits when the consumer should add a new item.

***

### addTestId

```ts
readonly addTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L370)

Optional stable test identifier for the add action.

***

### canAdd

```ts
readonly canAdd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:447](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L447)

Whether the collection exposes its add action.

***

### canOpenItemsFromList

```ts
readonly canOpenItemsFromList: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:465](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L465)

Whether selecting a list item opens that item in the single view.

***

### canSwitchViewMode

```ts
readonly canSwitchViewMode: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:457](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L457)

Whether the built-in segment for changing the view mode is displayed.

A list item template must also be present. Consumers enabling the switch provide both view labels.

***

### constrainListToSingleViewHeight

```ts
readonly constrainListToSingleViewHeight: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:473](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L473)

Whether the list view uses the active single-item view as its live height boundary.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:301](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L301)

Explanatory text displayed below the collection heading.

***

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<CompoundEmptyDirective | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:612](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L612)

Optional consumer template displayed for an empty collection.

***

### hasNext

```ts
protected readonly hasNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:684](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L684)

Indicates whether forward navigation is available.

***

### hasPrevious

```ts
protected readonly hasPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:676](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L676)

Indicates whether backward navigation is available.

***

### hasViewModeSwitch

```ts
protected readonly hasViewModeSwitch: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:646](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L646)

Indicates whether the built-in view-mode segment can be rendered.

***

### initialViewMode

```ts
readonly initialViewMode: InputSignal<
  | CompoundViewModeValue
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:338](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L338)

Optional view mode applied once when the component receives its initial inputs.

Use this input for an uncontrolled starting mode. Use the `viewMode` model instead when the collection owner
controls the mode throughout the component lifetime.

***

### isListView

```ts
protected readonly isListView: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:638](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L638)

Indicates whether the collection currently renders its list view.

A missing list item template fails closed to the existing single view.

***

### itemContext

```ts
protected readonly itemContext: Signal<
  | ICompoundItemContext<T>
| null>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:700](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L700)

Template context for the currently active item.

***

### itemCount

```ts
protected readonly itemCount: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:620](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L620)

Number of items currently available.

***

### itemKey

```ts
readonly itemKey: InputSignal<((item, index) => unknown) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:439](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L439)

Optional resolver for the identity of an item.

The projected item view is destroyed and recreated whenever this identity changes, so a
control that caches its rendered value cannot carry it over to a different item. Supply a
resolver whenever an item keeps its position while its identity changes, such as after a
removal. Without a resolver the position itself is the identity.

***

### items

```ts
readonly items: InputSignal<readonly T[]>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:309](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L309)

Ordered items managed by the consumer.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<CompoundItemDirective<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:580](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L580)

Consumer template used to render the active item.

***

### listHeaderTemplate

```ts
protected readonly listHeaderTemplate: Signal<
  | CompoundListHeaderDirective
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:596](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L596)

Optional consumer template rendered in the Mosaik list header slot.

***

### listItemContexts

```ts
protected readonly listItemContexts: Signal<readonly ICompoundItemContext<T>[]>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:732](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L732)

Template contexts for all items displayed in the list view.

***

### listItemDisabled

```ts
readonly listItemDisabled: InputSignal<((item, index) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:481](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L481)

Optional resolver that disables individual entries in the list view.

***

### listItemTemplate

```ts
protected readonly listItemTemplate: Signal<
  | CompoundListItemDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:588](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L588)

Optional consumer template used to render each item in the list view.

***

### listItemTestId

```ts
readonly listItemTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L426)

Optional resolver for stable, domain-specific list-item test identifiers.

***

### listSelectionMode

```ts
protected readonly listSelectionMode: Signal<"single" | "none">;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:660](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L660)

Mosaik selection mode matching whether list items can open the single view.

***

### listTestId

```ts
readonly listTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:418](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L418)

Optional stable test identifier for the list surface.

***

### listViewLabel

```ts
readonly listViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:491](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L491)

Consumer-owned label for the list-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### listViewTestId

```ts
readonly listViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L402)

Optional stable test identifier for the list-view segment item.

***

### nextLabel

```ts
readonly nextLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L354)

Accessible label for the next-item button.

***

### nextTestId

```ts
readonly nextTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L386)

Optional stable test identifier for the next-item action.

***

### positionText

```ts
protected readonly positionText: Signal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:692](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L692)

Human-readable one-based collection position.

***

### previousLabel

```ts
readonly previousLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L346)

Accessible label for the previous-item button.

***

### previousTestId

```ts
readonly previousTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L378)

Optional stable test identifier for the previous-item action.

***

### selectedIndex

```ts
readonly selectedIndex: ModelSignal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L317)

Index of the currently displayed item.

***

### selectLastOnCollectionGrowth

```ts
readonly selectLastOnCollectionGrowth: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:519](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L519)

Whether later collection growth selects the newly appended last item.

The first non-empty collection is treated as hydration and keeps the initial selection.

***

### singleViewLabel

```ts
readonly singleViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:501](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L501)

Consumer-owned label for the single-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### singleViewTestId

```ts
readonly singleViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:410](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L410)

Optional stable test identifier for the single-view segment item.

***

### targets

```ts
readonly targets: WritableSignal<Map<"next" | "add" | "activeItem" | "previous" | "singleView", ITourAccessorTarget>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:536](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L536)

Reactive component capabilities available to an external tour mapping.
No tour identifiers or feature-specific anchors are stored here.

#### Implementation of

```ts
ITourAccessor.targets
```

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:293](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L293)

Heading displayed above the collection item.

***

### viewMode

```ts
readonly viewMode: ModelSignal<CompoundViewModeValue>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L327)

Current collection view mode.

Bind this model two-way when the collection owner needs to observe or control view changes.

***

### viewModes

```ts
protected readonly viewModes: {
  List: "list";
  Single: "single";
} = CompoundViewMode;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:628](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L628)

View-mode values available to the component template.

#### List

```ts
readonly List: "list" = 'list';
```

#### Single

```ts
readonly Single: "single" = 'single';
```

***

### viewModeSwitchLabel

```ts
readonly viewModeSwitchLabel: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L509)

Optional accessible label for the view-mode segment.

***

### viewModeSwitchTestId

```ts
readonly viewModeSwitchTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:394](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L394)

Optional stable test identifier for the view-mode segment.

## Methods

### isListItemDisabled()

```ts
protected isListItemDisabled(context): boolean;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:810](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L810)

Resolves whether a list item is unavailable for opening.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> | Template context of the list item. |

#### Returns

`boolean`

Whether the list item is disabled.

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:752](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L752)

Applies the optional uncontrolled starting mode after Angular initializes the component inputs.

#### Returns

`void`

#### Implementation of

```ts
OnInit.ngOnInit
```

***

### openItemFromList()

```ts
protected openItemFromList(context): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:794](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L794)

Opens a list item in the existing single-item view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> | Template context of the selected list item. |

#### Returns

`void`

***

### requestAdd()

```ts
protected requestAdd(event?): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:844](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L844)

Requests a new item from the collection owner.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`

***

### resolveItemKey()

```ts
protected resolveItemKey(context): unknown;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:921](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L921)

Resolves the identity that keeps the projected item view alive.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | \| [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> \| `null` | Template context of the active item, or `null` for an empty collection. |

#### Returns

`unknown`

The consumer-resolved identity, or the active position when none is supplied.

***

### resolveListItemTestId()

```ts
protected resolveListItemTestId(context): string | undefined;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:821](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L821)

Resolves the optional stable test identifier of a list item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> | Template context of the list item. |

#### Returns

`string` \| `undefined`

The consumer-provided test identifier.

***

### selectFromIndicator()

```ts
protected selectFromIndicator(event): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:831](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L831)

Selects an item requested through the Mosaik indicator.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `unknown` | Indicator event or event detail containing the selected index. |

#### Returns

`void`

***

### selectNext()

```ts
protected selectNext(): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:774](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L774)

Selects the item after the current item.

#### Returns

`void`

***

### selectPrevious()

```ts
protected selectPrevious(): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:765](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L765)

Selects the item before the current item.

#### Returns

`void`

***

### selectViewMode()

```ts
protected selectViewMode(viewMode): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:784](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L784)

Changes the currently rendered collection view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewMode` | [`CompoundViewModeValue`](TypeAlias.CompoundViewModeValue) | View mode requested by the built-in segment. |

#### Returns

`void`
