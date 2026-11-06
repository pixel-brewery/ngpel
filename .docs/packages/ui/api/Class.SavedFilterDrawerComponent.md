---
title: 'Class: SavedFilterDrawerComponent'
generated: true
editUrl: false
---
# Class: SavedFilterDrawerComponent

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:240](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L240)

Drawer used to name and review a saved filter.

## Constructors

### Constructor

```ts
new SavedFilterDrawerComponent(): SavedFilterDrawerComponent;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L261)

#### Returns

`SavedFilterDrawerComponent`

## Properties

### summaryItems

```ts
readonly summaryItems: Signal<readonly ISavedFilterSummaryItem[]>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L315)

Summary items for the filter definition.

## Accessors

### form

#### Get Signature

```ts
get form(): FieldTree<ISavedFilterDrawerFormData>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L305)

Signal form fields.

##### Returns

`FieldTree`\<`ISavedFilterDrawerFormData`\>

***

### intl

#### Get Signature

```ts
get intl(): FilterBarComponentIntl;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L296)

Internationalized labels.

##### Returns

[`FilterBarComponentIntl`](Class.FilterBarComponentIntl)

## Methods

### isOrCondition()

```ts
isOrCondition(condition): boolean;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:379](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L379)

Returns whether a condition is an OR group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `condition` | [`FilterConditionValue`](TypeAlias.FilterConditionValue) \| `undefined` | Filter condition. |

#### Returns

`boolean`

***

### onCancel()

```ts
onCancel(): void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L328)

Closes the drawer without saving.

#### Returns

`void`

***

### onSave()

```ts
onSave(): void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L337)

Confirms the saved filter name.

#### Returns

`void`

***

### summaryIndent()

```ts
summaryIndent(item): string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:369](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L369)

Returns the CSS indentation for one summary item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | [`ISavedFilterSummaryItem`](Interface.ISavedFilterSummaryItem) | Summary item. |

#### Returns

`string`
