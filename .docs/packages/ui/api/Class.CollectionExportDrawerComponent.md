---
title: 'Class: CollectionExportDrawerComponent'
generated: true
editUrl: false
---
# Class: CollectionExportDrawerComponent

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L151)

A configurable drawer component for collection data export.
Allows the user to select which columns to include and which
format to export in before triggering the actual download.

## Implements

- `OnDestroy`

## Constructors

### Constructor

```ts
new CollectionExportDrawerComponent(): CollectionExportDrawerComponent;
```

#### Returns

`CollectionExportDrawerComponent`

## Properties

### canDeselectAll

```ts
readonly canDeselectAll: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:208](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L208)

Whether at least one selected column can be deselected.

***

### canSelectAll

```ts
readonly canSelectAll: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L213)

Whether at least one unselected column can be selected.

***

### columns

```ts
readonly columns: Signal<readonly ICollectionExportColumn[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L184)

All available columns for selection.

***

### formatOptions

```ts
readonly formatOptions: Signal<readonly IFormatOption[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L189)

Available format options with display labels.

***

### selectedColumnValues

```ts
protected readonly selectedColumnValues: Signal<readonly string[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L228)

The selected column keys consumed by the chip group.

***

### selectedCount

```ts
readonly selectedCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L218)

The number of selected columns.

***

### selectedFormat

```ts
readonly selectedFormat: Signal<CollectionExportFormat>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L203)

The currently selected format.

***

### totalCount

```ts
readonly totalCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:223](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L223)

The total number of available columns.

## Accessors

### intl

#### Get Signature

```ts
get intl(): CollectionExportDrawerComponentIntl;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:177](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L177)

Internationalization labels.

##### Returns

[`CollectionExportDrawerComponentIntl`](Class.CollectionExportDrawerComponentIntl)

## Methods

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:239](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L239)

Tears down internationalization change subscriptions.

#### Returns

`void`

#### Implementation of

```ts
OnDestroy.ngOnDestroy
```

***

### onCancel()

```ts
protected onCancel(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L313)

Cancels the export and closes the drawer.

#### Returns

`void`

***

### onColumnChecked()

```ts
protected onColumnChecked(key): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:246](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L246)

Adds a checked column to the export selection.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`void`

***

### onColumnUnchecked()

```ts
protected onColumnUnchecked(key): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L253)

Removes an unchecked column from the export selection.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`void`

***

### onDeselectAll()

```ts
protected onDeselectAll(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:271](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L271)

Deselects all columns.

#### Returns

`void`

***

### onExport()

```ts
protected onExport(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L285)

Confirms the export configuration and closes the drawer.

#### Returns

`void`

***

### onFormatChange()

```ts
protected onFormatChange(format): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:278](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L278)

Updates the selected export format.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `format` | [`CollectionExportFormat`](TypeAlias.CollectionExportFormat) |

#### Returns

`void`

***

### onSelectAll()

```ts
protected onSelectAll(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:264](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L264)

Selects all available columns.

#### Returns

`void`
