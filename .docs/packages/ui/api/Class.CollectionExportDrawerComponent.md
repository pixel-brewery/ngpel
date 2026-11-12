---
title: 'Class: CollectionExportDrawerComponent'
generated: true
editUrl: false
---
# Class: CollectionExportDrawerComponent

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L155)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:212](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L212)

Whether at least one selected column can be deselected.

***

### canSelectAll

```ts
readonly canSelectAll: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L217)

Whether at least one unselected column can be selected.

***

### columns

```ts
readonly columns: Signal<readonly ICollectionExportColumn[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L188)

All available columns for selection.

***

### formatOptions

```ts
readonly formatOptions: Signal<readonly IFormatOption[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:193](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L193)

Available format options with display labels.

***

### recordCount

```ts
readonly recordCount: Signal<number | null>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:230](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L230)

The number of matching records supplied by the host, if known.

***

### selectedColumnValues

```ts
protected readonly selectedColumnValues: Signal<readonly string[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L238)

The selected column keys consumed by the chip group.

***

### selectedCount

```ts
readonly selectedCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:222](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L222)

The number of selected columns.

***

### selectedFormat

```ts
readonly selectedFormat: Signal<CollectionExportFormat>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L207)

The currently selected format.

***

### totalCount

```ts
readonly totalCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:227](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L227)

The total number of available columns.

## Accessors

### intl

#### Get Signature

```ts
get intl(): CollectionExportDrawerComponentIntl;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L181)

Internationalization labels.

##### Returns

[`CollectionExportDrawerComponentIntl`](Class.CollectionExportDrawerComponentIntl)

## Methods

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L249)

Tears down internationalization change subscriptions.

#### Returns

`void`

#### Implementation of

`OnDestroy.ngOnDestroy`

***

### onCancel()

```ts
protected onCancel(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:323](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L323)

Cancels the export and closes the drawer.

#### Returns

`void`

***

### onColumnChecked()

```ts
protected onColumnChecked(key): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:256](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L256)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:263](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L263)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L281)

Deselects all columns.

#### Returns

`void`

***

### onExport()

```ts
protected onExport(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:295](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L295)

Confirms the export configuration and closes the drawer.

#### Returns

`void`

***

### onFormatChange()

```ts
protected onFormatChange(format): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:288](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L288)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:274](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L274)

Selects all available columns.

#### Returns

`void`
