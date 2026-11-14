---
title: 'Class: SavedFilterDrawerComponent'
generated: true
editUrl: false
---
# Class: SavedFilterDrawerComponent

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L281)

Drawer used to name and review a saved filter.

## Constructors

### Constructor

```ts
new SavedFilterDrawerComponent(): SavedFilterDrawerComponent;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:303](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L303)

#### Returns

`SavedFilterDrawerComponent`

## Properties

### isDialog

```ts
protected readonly isDialog: boolean;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L285)

***

### summaryItems

```ts
readonly summaryItems: Signal<readonly ISavedFilterSummaryItem[]>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L357)

Summary items for the filter definition.

## Accessors

### form

#### Get Signature

```ts
get form(): FieldTree<ISavedFilterDrawerFormData>;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:347](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L347)

Signal form fields.

##### Returns

`FieldTree`\<`ISavedFilterDrawerFormData`\>

***

### intl

#### Get Signature

```ts
get intl(): FilterBarComponentIntl;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:338](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L338)

Internationalized labels.

##### Returns

[`FilterBarComponentIntl`](Class.FilterBarComponentIntl)

## Methods

### isOrCondition()

```ts
isOrCondition(condition): boolean;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:421](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L421)

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

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L370)

Closes the drawer without saving.

#### Returns

`void`

***

### onSave()

```ts
onSave(): void;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:379](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L379)

Confirms the saved filter name.

#### Returns

`void`

***

### summaryIndent()

```ts
summaryIndent(item): string;
```

Defined in: [libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts:411](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/saved-filters/SavedFilterDrawerComponent.ts#L411)

Returns the CSS indentation for one summary item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | [`ISavedFilterSummaryItem`](Interface.ISavedFilterSummaryItem) | Summary item. |

#### Returns

`string`
