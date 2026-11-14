---
title: 'Class: CollectionListComponent\<T\>'
generated: true
editUrl: false
---
# Class: CollectionListComponent\<T\>

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L233)

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

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:303](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L303)

Renders full-width Mosaik rows and holds the footer inside the list.

***

### contextMenu

```ts
readonly contextMenu: InputSignal<
  | ContextMenuComponent<T>
| undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:312](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L312)

Adds an actions button and right-click handling to each managed row.

***

### contextMenuLabel

```ts
readonly contextMenuLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L315)

Label for each visible context-menu trigger.

***

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:348](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L348)

Caller-provided empty-state template.

***

### heading

```ts
readonly heading: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:265](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L265)

Summary heading displayed above the collection.

***

### headingIcon

```ts
readonly headingIcon: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L273)

Optional resolved Mosaik icon data displayed before the heading.

***

### headingIconVariant

```ts
readonly headingIconVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L281)

Visual variant of the optional heading icon.

***

### isLoading

```ts
readonly isLoading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:300](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L300)

Replaces rows with loading placeholders and marks the list as busy.

***

### itemActivated

```ts
readonly itemActivated: OutputEmitterRef<T>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L318)

Emits the item activated in managed-row mode.

***

### itemKey

```ts
readonly itemKey: InputSignal<(item) => string | number>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L257)

Resolves the stable key used to track each item.

***

### items

```ts
readonly items: InputSignal<readonly T[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L249)

Ordered collection items.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<
  | TemplateRef<ICollectionListItemContext<T>>
| undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L337)

Caller-provided row template.

***

### itemTestIdPrefix

```ts
readonly itemTestIdPrefix: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:306](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L306)

Prefix for test identifiers on managed rows and their actions.

***

### listLabel

```ts
readonly listLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:297](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L297)

Accessible name of the scrolling result list.

***

### managedRows

```ts
protected readonly managedRows: Signal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:321](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L321)

Supplying a context menu opts into the managed Mosaik row contract.

***

### menuOptionActivated

```ts
readonly menuOptionActivated: OutputEmitterRef<ICollectionListMenuSelection>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L329)

Emits the menu and option identifiers activated by the user.

***

### menus

```ts
readonly menus: InputSignal<readonly ICollectionListMenu[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:289](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L289)

Menus displayed beside the collection heading.

***

### placeholders

```ts
protected readonly placeholders: Signal<number[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:235](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L235)

***

### useManagedRows

```ts
readonly useManagedRows: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:309](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L309)

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

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L362)

Emits one menu selection and closes its dropdown.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `menuId` | `string` | Identifier of the owning menu. |
| `optionId` | `string` | Identifier of the activated option. |
| `menuButton` | `DropDownButtonComponent` | Dropdown button that owns the activated option. |

#### Returns

`void`
