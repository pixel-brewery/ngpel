---
title: 'Class: CollectionListComponent\<T\>'
generated: true
editUrl: false
---
# Class: CollectionListComponent\<T\>

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L88)

Renders a collection heading and menus above caller-templated rows in one scrolling region.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Collection item type. |

## Constructors

### Constructor

```ts
new CollectionListComponent<T>(): CollectionListComponent<T>;
```

#### Returns

`CollectionListComponent`\<`T`\>

## Properties

### emptyTemplate

```ts
protected readonly emptyTemplate: Signal<TemplateRef<unknown> | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L178)

Caller-provided empty-state template.

***

### heading

```ts
readonly heading: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:119](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L119)

Summary heading displayed above the collection.

***

### headingIcon

```ts
readonly headingIcon: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L127)

Optional resolved Mosaik icon data displayed before the heading.

***

### headingIconVariant

```ts
readonly headingIconVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L135)

Visual variant of the optional heading icon.

***

### itemKey

```ts
readonly itemKey: InputSignal<(item) => string | number>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L111)

Resolves the stable key used to track each item.

***

### items

```ts
readonly items: InputSignal<readonly T[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L103)

Ordered collection items.

***

### itemTemplate

```ts
protected readonly itemTemplate: Signal<
  | TemplateRef<ICollectionListItemContext<T>>
| undefined>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:167](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L167)

Caller-provided row template.

***

### listLabel

```ts
readonly listLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L151)

Accessible name of the scrolling result list.

***

### menuOptionActivated

```ts
readonly menuOptionActivated: OutputEmitterRef<ICollectionListMenuSelection>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L159)

Emits the menu and option identifiers activated by the user.

***

### menus

```ts
readonly menus: InputSignal<readonly ICollectionListMenu[]>;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L143)

Menus displayed beside the collection heading.

## Methods

### onMenuOptionActivated()

```ts
protected onMenuOptionActivated(
   menuId,
   optionId,
   menuButton
): void;
```

Defined in: [libs/ui/src/components/collection-list/CollectionListComponent.ts:192](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/collection-list/CollectionListComponent.ts#L192)

Emits one menu selection and closes its dropdown.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `menuId` | `string` | Identifier of the owning menu. |
| `optionId` | `string` | Identifier of the activated option. |
| `menuButton` | `DropDownButtonComponent` | Dropdown button that owns the activated option. |

#### Returns

`void`
