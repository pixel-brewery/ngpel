---
title: 'Class: CompoundComponent\<T\>'
generated: true
editUrl: false
---
# Class: CompoundComponent\<T\>

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L324)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:388](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L388)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:781](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L781)

Optional consumer template replacing the built-in add action.

***

### activeIndex

```ts
protected readonly activeIndex: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:849](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L849)

Selected index restricted to the current collection range.

***

### activeItemKey

```ts
protected readonly activeItemKey: Signal<unknown>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:910](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L910)

Identity of the currently active item.

***

### addLabel

```ts
readonly addLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:489](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L489)

Accessible label for the add-item button.

***

### addRequested

```ts
readonly addRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:675](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L675)

Emits when the consumer should add a new item.

***

### addTestId

```ts
readonly addTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:497](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L497)

Optional stable test identifier for the add action.

***

### canAdd

```ts
readonly canAdd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:589](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L589)

Whether the collection exposes its add action.

***

### canDelete

```ts
readonly canDelete: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:592](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L592)

Enables the built-in delete action for a visible item.

***

### canOpenItemsFromList

```ts
readonly canOpenItemsFromList: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:613](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L613)

Whether selecting a list item opens that item in the single view.

***

### canSwitchViewMode

```ts
readonly canSwitchViewMode: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:605](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L605)

Whether the built-in segment for changing the view mode is displayed.

A list item template must also be present. Consumers enabling the switch provide both view labels.

***

### constrainListToSingleViewHeight

```ts
readonly constrainListToSingleViewHeight: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:621](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L621)

Whether the list view uses the active single-item view as its live height boundary.

***

### controlsInHeader

```ts
readonly controlsInHeader: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:411](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L411)

Whether collection navigation and actions are placed beside the heading.

***

### deleteLabel

```ts
readonly deleteLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:500](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L500)

Accessible label of the built-in delete action.

***

### deleteRequested

```ts
readonly deleteRequested: OutputEmitterRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:678](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L678)

Emits the item the consumer should delete. The consumer owns the mutation.

***

### deleteTestId

```ts
readonly deleteTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:503](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L503)

Test identifier of the single-view delete action.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:425](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L425)

Explanatory text displayed below the collection heading.

***

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<CompoundEmptyDirective | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:789](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L789)

Optional consumer template displayed for an empty collection.

***

### hasNext

```ts
protected readonly hasNext: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:865](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L865)

Indicates whether forward navigation is available.

***

### hasPrevious

```ts
protected readonly hasPrevious: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:857](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L857)

Indicates whether backward navigation is available.

***

### hasViewModeSwitch

```ts
protected readonly hasViewModeSwitch: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:826](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L826)

Indicates whether the built-in view-mode segment can be rendered.

***

### initialViewMode

```ts
readonly initialViewMode: InputSignal<
  | CompoundViewModeValue
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:465](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L465)

Optional view mode applied once when the component receives its initial inputs.

Use this input for an uncontrolled starting mode. Use the `viewMode` model instead when the collection owner
controls the mode throughout the component lifetime.

***

### isListView

```ts
protected readonly isListView: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:815](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L815)

Indicates whether the collection currently renders its list view.

A missing list item template fails closed to the existing single view.

***

### isStacked

```ts
protected readonly isStacked: Signal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:818](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L818)

Whether items use independently expandable panels.

***

### itemContext

```ts
protected readonly itemContext: Signal<
  | ICompoundItemContext<T>
| null>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:885](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L885)

Template context for the currently active item.

***

### itemCount

```ts
protected readonly itemCount: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:797](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L797)

Number of items currently available.

***

### itemDeleteTestId

```ts
readonly itemDeleteTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:512](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L512)

Resolves a stable test identifier for a stacked item's delete action.

***

### itemDisabled

```ts
readonly itemDisabled: InputSignal<((item, index) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:595](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L595)

Keeps matching stacked panels closed and uneditable.

***

### itemKey

```ts
readonly itemKey: InputSignal<((item, index) => unknown) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:581](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L581)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:433](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L433)

Ordered items managed by the consumer.

***

### itemStatusTemplate

```ts
protected readonly itemStatusTemplate: Signal<
  | CompoundItemStatusDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:757](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L757)

Optional template for the status shown alongside each stacked panel heading.

***

### itemsTestId

```ts
readonly itemsTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:506](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L506)

Test identifier of the stacked panel group.

***

### itemSummaryTemplate

```ts
protected readonly itemSummaryTemplate: Signal<
  | CompoundItemSummaryDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:754](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L754)

Optional template for each stacked panel heading.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<CompoundItemDirective<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:751](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L751)

Consumer template used to render the active item.

***

### itemTestId

```ts
readonly itemTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:509](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L509)

Resolves a stable test identifier for a stacked item.

***

### layout

```ts
readonly layout: InputSignal<CompoundLayoutValue>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:436](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L436)

The collection layout. The default retains the existing single and list views.

***

### level

```ts
readonly level: Signal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:417](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L417)

One-based nesting depth of this collection.

***

### listHeaderTemplate

```ts
protected readonly listHeaderTemplate: Signal<
  | CompoundListHeaderDirective
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:773](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L773)

Optional consumer template rendered in the Mosaik list header slot.

***

### listItemContexts

```ts
protected readonly listItemContexts: Signal<readonly ICompoundItemContext<T>[]>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:918](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L918)

Template contexts for all items displayed in the list view.

***

### listItemDisabled

```ts
readonly listItemDisabled: InputSignal<((item, index) => boolean) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:629](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L629)

Optional resolver that disables individual entries in the list view.

***

### listItemTemplate

```ts
protected readonly listItemTemplate: Signal<
  | CompoundListItemDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:765](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L765)

Optional consumer template used to render each item in the list view.

***

### listItemTestId

```ts
readonly listItemTestId: InputSignal<((item, index) => string | undefined) | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:568](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L568)

Optional resolver for stable, domain-specific list-item test identifiers.

***

### listSelectionMode

```ts
protected readonly listSelectionMode: Signal<"none" | "single">;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:841](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L841)

Mosaik selection mode matching whether list items can open the single view.

***

### listTestId

```ts
readonly listTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L560)

Optional stable test identifier for the list surface.

***

### listViewLabel

```ts
readonly listViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:639](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L639)

Consumer-owned label for the list-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### listViewTestId

```ts
readonly listViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:544](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L544)

Optional stable test identifier for the list-view segment item.

***

### nextLabel

```ts
readonly nextLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:481](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L481)

Accessible label for the next-item button.

***

### nextTestId

```ts
readonly nextTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:528](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L528)

Optional stable test identifier for the next-item action.

***

### positionText

```ts
protected readonly positionText: Signal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:873](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L873)

Human-readable one-based collection position.

***

### previousLabel

```ts
readonly previousLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:473](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L473)

Accessible label for the previous-item button.

***

### previousTestId

```ts
readonly previousTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:520](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L520)

Optional stable test identifier for the previous-item action.

***

### selectedIndex

```ts
readonly selectedIndex: ModelSignal<number>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:444](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L444)

Index of the currently displayed item.

***

### selectLastOnCollectionGrowth

```ts
readonly selectLastOnCollectionGrowth: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:667](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L667)

Whether later collection growth selects the newly appended last item.

The first non-empty collection is treated as hydration and keeps the initial selection.

***

### showNesting

```ts
readonly showNesting: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:414](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L414)

Whether nested collections display a visual nesting indicator.

***

### singleViewLabel

```ts
readonly singleViewLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:649](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L649)

Consumer-owned label for the single-view segment item.

A non-empty label is required when the built-in view-mode switch is enabled.

***

### singleViewTestId

```ts
readonly singleViewTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:552](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L552)

Optional stable test identifier for the single-view segment item.

***

### targets

```ts
readonly targets: WritableSignal<Map<
  | "next"
  | "add"
  | "activeItem"
  | "delete"
  | "expandItem"
  | "previous"
| "singleView", ITourAccessorTarget>>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:687](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L687)

Reactive component capabilities available to an external tour mapping.
No tour identifiers or feature-specific anchors are stored here.

#### Implementation of

`ITourAccessor.targets`

***

### title

```ts
readonly title: InputSignal<string>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:408](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L408)

Heading displayed above the collection item.

***

### viewMode

```ts
readonly viewMode: ModelSignal<CompoundViewModeValue>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:454](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L454)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:805](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L805)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:657](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L657)

Optional accessible label for the view-mode segment.

***

### viewModeSwitchTestId

```ts
readonly viewModeSwitchTestId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:536](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L536)

Optional stable test identifier for the view-mode segment.

## Methods

### isItemDisabled()

```ts
protected isItemDisabled(context): boolean;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1027](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1027)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1032](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1032)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:997](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L997)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:939](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L939)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:981](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L981)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1090](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1090)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1073](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1073)

Emits a delete intent only while the rendered entry is still current.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | \| [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> \| `null` |

#### Returns

`void`

***

### resolveItemDeleteTestId()

```ts
protected resolveItemDeleteTestId(context): string | undefined;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1062](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1062)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1210](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1210)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1008](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1008)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1018](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1018)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:961](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L961)

Selects the item after the current item.

#### Returns

`void`

***

### selectPrevious()

```ts
protected selectPrevious(): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:952](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L952)

Selects the item before the current item.

#### Returns

`void`

***

### selectViewMode()

```ts
protected selectViewMode(viewMode): void;
```

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:971](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L971)

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

Defined in: [libs/ui/src/components/compound/CompoundComponent.ts:1037](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundComponent.ts#L1037)

Updates one panel without closing other editors.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | [`ICompoundItemContext`](Interface.ICompoundItemContext)\<`T`\> |
| `expanded` | `boolean` |

#### Returns

`void`
