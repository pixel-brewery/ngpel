---
title: 'Class: CollectionListComponent\<T\>'
generated: true
editUrl: false
---
# Class: CollectionListComponent\<T\>

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:177](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L177)

Renders a collection heading and menus above caller-templated rows in one scrolling region.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type. |

## Constructors

### Constructor

```ts
new CollectionListComponent<T>(): CollectionListComponent<T>;
```

#### Returns

`CollectionListComponent`\<`T`\>

## Properties

### contextMenu

```ts
readonly contextMenu: InputSignal<
  | ContextMenuComponent<T>
| undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:250](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L250)

Adds an actions button and right-click handling to each managed row.

***

### contextMenuLabel

```ts
readonly contextMenuLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L253)

Label for each visible context-menu trigger.

***

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L286)

Caller-provided empty-state template.

***

### heading

```ts
readonly heading: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:209](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L209)

Summary heading displayed above the collection.

***

### headingIcon

```ts
readonly headingIcon: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L217)

Optional resolved Mosaik icon data displayed before the heading.

***

### headingIconVariant

```ts
readonly headingIconVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:225](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L225)

Visual variant of the optional heading icon.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:244](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L244)

Replaces rows with loading placeholders and marks the list as busy.

***

### itemActivated

```ts
readonly itemActivated: OutputEmitterRef<T>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L256)

Emits the item activated in managed-row mode.

***

### itemKey

```ts
readonly itemKey: InputSignal<(item) => string | number>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:201](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L201)

Resolves the stable key used to track each item.

***

### items

```ts
readonly items: InputSignal<readonly T[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L193)

Ordered collection items.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<
  | TemplateRef<ICollectionListItemContext<T>>
| undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:275](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L275)

Caller-provided row template.

***

### listLabel

```ts
readonly listLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:241](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L241)

Accessible name of the scrolling result list.

***

### managedRows

```ts
protected readonly managedRows: Signal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:259](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L259)

Supplying a context menu opts into the managed Mosaik row contract.

***

### menuOptionActivated

```ts
readonly menuOptionActivated: OutputEmitterRef<ICollectionListMenuSelection>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:267](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L267)

Emits the menu and option identifiers activated by the user.

***

### menus

```ts
readonly menus: InputSignal<readonly ICollectionListMenu[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L233)

Menus displayed beside the collection heading.

***

### placeholders

```ts
protected readonly placeholders: number[];
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L179)

***

### useManagedRows

```ts
readonly useManagedRows: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:247](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L247)

Gives each item a Mosaik row. Project its contents rather than a list item when enabled.

## Methods

### onMenuOptionActivated()

```ts
protected onMenuOptionActivated(
   menuId,
   optionId,
   menuButton
): void;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:300](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L300)

Emits one menu selection and closes its dropdown.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `menuId` | `string` | Identifier of the owning menu. |
| `optionId` | `string` | Identifier of the activated option. |
| `menuButton` | `DropDownButtonComponent` | Dropdown button that owns the activated option. |

#### Returns

`void`
