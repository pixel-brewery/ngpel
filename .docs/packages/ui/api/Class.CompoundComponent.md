---
title: 'Class: CompoundComponent\<T\>'
generated: true
editUrl: false
---
# Class: CompoundComponent\<T\>

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L294)

Renders a collection with single-item, list or stacked editing and consumer-owned actions.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type supplied by the consumer. |

## Implements

- `ITourAccessor`
- `OnInit`

## Constructors

### Constructor

```ts
new CompoundComponent<T>(): CompoundComponent<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:349](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L349)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:713](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L713)

Optional consumer template replacing the built-in add action.

***

### activeIndex

```ts
protected readonly activeIndex: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:781](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L781)

Selected index restricted to the current collection range.

***

### activeItemKey

```ts
protected readonly activeItemKey: Signal<unknown>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:841](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L841)

Identity of the currently active item.

***

### addLabel

```ts
readonly addLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:441](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L441)

Accessible label for the add-item button.

***

### addRequested

```ts
readonly addRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:627](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L627)

Emits when the consumer should add a new item.

***

### addTestId

```ts
readonly addTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:449](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L449)

Optional stable test identifier for the add action.

***

### canAdd

```ts
readonly canAdd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:541](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L541)

Whether the collection exposes its add action.

***

### canDelete

```ts
readonly canDelete: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:544](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L544)

Enables the built-in delete action for a visible item.

***

### canOpenItemsFromList

```ts
readonly canOpenItemsFromList: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:565](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L565)

Whether selecting a list item opens that item in the single view.

***

### canSwitchViewMode

```ts
readonly canSwitchViewMode: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:557](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L557)

Whether the built-in segment for changing the view mode is displayed.

A list item template must also be present. Consumers enabling the switch provide both view labels.

***

### constrainListToSingleViewHeight

```ts
readonly constrainListToSingleViewHeight: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:573](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L573)

Whether the list view uses the active single-item view as its live height boundary.

***

### deleteLabel

```ts
readonly deleteLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:452](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L452)

Accessible label of the built-in delete action.

***

### deleteRequested

```ts
readonly deleteRequested: OutputEmitterRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:630](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L630)

Emits the item the consumer should delete. The consumer owns the mutation.

***

### deleteTestId

```ts
readonly deleteTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:455](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L455)

Test identifier of the single-view delete action.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:377](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L377)

Explanatory text displayed below the collection heading.

***

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<CompoundEmptyDirective | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:721](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L721)

Optional consumer template displayed for an empty collection.

***

### hasNext

```ts
protected readonly hasNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:797](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L797)

Indicates whether forward navigation is available.

***

### hasPrevious

```ts
protected readonly hasPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:789](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L789)

Indicates whether backward navigation is available.

***

### hasViewModeSwitch

```ts
protected readonly hasViewModeSwitch: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:758](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L758)

Indicates whether the built-in view-mode segment can be rendered.

***

### initialViewMode

```ts
readonly initialViewMode: InputSignal<
  | CompoundViewModeValue
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:417](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L417)

Optional view mode applied once when the component receives its initial inputs.

Use this input for an uncontrolled starting mode. Use the `viewMode` model instead when the collection owner
controls the mode throughout the component lifetime.

***

### isListView

```ts
protected readonly isListView: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:747](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L747)

Indicates whether the collection currently renders its list view.

A missing list item template fails closed to the existing single view.

***

### isStacked

```ts
protected readonly isStacked: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:750](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L750)

Whether items use independently expandable panels.

***

### itemContext

```ts
protected readonly itemContext: Signal<
  | ICompoundItemContext<T>
| null>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:817](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L817)

Template context for the currently active item.

***

### itemCount

```ts
protected readonly itemCount: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:729](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L729)

Number of items currently available.

***

### itemDeleteTestId

```ts
readonly itemDeleteTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:464](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L464)

Resolves a stable test identifier for a stacked item's delete action.

***

### itemDisabled

```ts
readonly itemDisabled: InputSignal<((item, index) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:547](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L547)

Keeps matching stacked panels closed and uneditable.

***

### itemKey

```ts
readonly itemKey: InputSignal<((item, index) => unknown) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:533](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L533)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:385](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L385)

Ordered items managed by the consumer.

***

### itemStatusTemplate

```ts
protected readonly itemStatusTemplate: Signal<
  | CompoundItemStatusDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:689](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L689)

Optional template for the status shown alongside each stacked panel heading.

***

### itemsTestId

```ts
readonly itemsTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:458](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L458)

Test identifier of the stacked panel group.

***

### itemSummaryTemplate

```ts
protected readonly itemSummaryTemplate: Signal<
  | CompoundItemSummaryDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:686](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L686)

Optional template for each stacked panel heading.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<CompoundItemDirective<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:683](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L683)

Consumer template used to render the active item.

***

### itemTestId

```ts
readonly itemTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:461](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L461)

Resolves a stable test identifier for a stacked item.

***

### layout

```ts
readonly layout: InputSignal<CompoundLayoutValue>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L388)

The collection layout. The default retains the existing single and list views.

***

### listHeaderTemplate

```ts
protected readonly listHeaderTemplate: Signal<
  | CompoundListHeaderDirective
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:705](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L705)

Optional consumer template rendered in the Mosaik list header slot.

***

### listItemContexts

```ts
protected readonly listItemContexts: Signal<readonly ICompoundItemContext<T>[]>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:849](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L849)

Template contexts for all items displayed in the list view.

***

### listItemDisabled

```ts
readonly listItemDisabled: InputSignal<((item, index) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:581](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L581)

Optional resolver that disables individual entries in the list view.

***

### listItemTemplate

```ts
protected readonly listItemTemplate: Signal<
  | CompoundListItemDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:697](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L697)

Optional consumer template used to render each item in the list view.

***

### listItemTestId

```ts
readonly listItemTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:520](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L520)

Optional resolver for stable, domain-specific list-item test identifiers.

***

### listSelectionMode

```ts
protected readonly listSelectionMode: Signal<"none" | "single">;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:773](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L773)

Mosaik selection mode matching whether list items can open the single view.

***

### listTestId

```ts
readonly listTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:512](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L512)

Optional stable test identifier for the list surface.

***

### listViewLabel

```ts
readonly listViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:591](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L591)

Consumer-owned label for the list-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### listViewTestId

```ts
readonly listViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:496](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L496)

Optional stable test identifier for the list-view segment item.

***

### nextLabel

```ts
readonly nextLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:433](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L433)

Accessible label for the next-item button.

***

### nextTestId

```ts
readonly nextTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L480)

Optional stable test identifier for the next-item action.

***

### positionText

```ts
protected readonly positionText: Signal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:805](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L805)

Human-readable one-based collection position.

***

### previousLabel

```ts
readonly previousLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:425](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L425)

Accessible label for the previous-item button.

***

### previousTestId

```ts
readonly previousTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L472)

Optional stable test identifier for the previous-item action.

***

### selectedIndex

```ts
readonly selectedIndex: ModelSignal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:396](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L396)

Index of the currently displayed item.

***

### selectLastOnCollectionGrowth

```ts
readonly selectLastOnCollectionGrowth: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:619](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L619)

Whether later collection growth selects the newly appended last item.

The first non-empty collection is treated as hydration and keeps the initial selection.

***

### singleViewLabel

```ts
readonly singleViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:601](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L601)

Consumer-owned label for the single-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### singleViewTestId

```ts
readonly singleViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:504](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L504)

Optional stable test identifier for the single-view segment item.

***

### targets

```ts
readonly targets: WritableSignal<Map<"next" | "add" | "activeItem" | "previous" | "singleView", ITourAccessorTarget>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:639](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L639)

Reactive component capabilities available to an external tour mapping.
No tour identifiers or feature-specific anchors are stored here.

#### Implementation of

`ITourAccessor.targets`

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:369](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L369)

Heading displayed above the collection item.

***

### viewMode

```ts
readonly viewMode: ModelSignal<CompoundViewModeValue>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:406](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L406)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:737](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L737)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:609](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L609)

Optional accessible label for the view-mode segment.

***

### viewModeSwitchTestId

```ts
readonly viewModeSwitchTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:488](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L488)

Optional stable test identifier for the view-mode segment.

## Methods

### isItemDisabled()

```ts
protected isItemDisabled(context): boolean;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:957](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L957)

Whether the consumer has disabled editing for this stacked item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |

#### Returns

`boolean`

***

### isItemExpanded()

```ts
protected isItemExpanded(context): boolean;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:962](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L962)

Whether this stacked panel is open.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |

#### Returns

`boolean`

***

### isListItemDisabled()

```ts
protected isListItemDisabled(context): boolean;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:927](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L927)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:869](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L869)

Applies the optional uncontrolled starting mode after Angular initializes the component inputs.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

***

### openItemFromList()

```ts
protected openItemFromList(context): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:911](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L911)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1012](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1012)

Requests a new item from the collection owner.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event?` | `Event` |

#### Returns

`void`

***

### requestDelete()

```ts
protected requestDelete(context): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:999](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L999)

Emits a delete intent only while the rendered entry is still current.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |

#### Returns

`void`

***

### resolveItemDeleteTestId()

```ts
protected resolveItemDeleteTestId(context): string | undefined;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:992](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L992)

Resolves the optional test identifier for a stacked delete action.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |

#### Returns

`string` \| `undefined`

***

### resolveItemKey()

```ts
protected resolveItemKey(context): unknown;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1110)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:938](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L938)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:948](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L948)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:891](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L891)

Selects the item after the current item.

#### Returns

`void`

***

### selectPrevious()

```ts
protected selectPrevious(): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:882](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L882)

Selects the item before the current item.

#### Returns

`void`

***

### selectViewMode()

```ts
protected selectViewMode(viewMode): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:901](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L901)

Changes the currently rendered collection view.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewMode` | [`CompoundViewModeValue`](TypeAlias.CompoundViewModeValue) | View mode requested by the built-in segment. |

#### Returns

`void`

***

### setItemExpanded()

```ts
protected setItemExpanded(context, expanded): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:967](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L967)

Updates one panel without closing other editors.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |
| `expanded` | `boolean` |

#### Returns

`void`
