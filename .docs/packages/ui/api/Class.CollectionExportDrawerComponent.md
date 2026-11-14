---
title: 'Class: CollectionExportDrawerComponent'
generated: true
editUrl: false
---
# Class: CollectionExportDrawerComponent

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L161)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:218](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L218)

Whether at least one selected column can be deselected.

***

### canSelectAll

```ts
readonly canSelectAll: Signal<boolean>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:223](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L223)

Whether at least one unselected column can be selected.

***

### columns

```ts
readonly columns: Signal<readonly ICollectionExportColumn[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L194)

All available columns for selection.

***

### formatOptions

```ts
readonly formatOptions: Signal<readonly IFormatOption[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L199)

Available format options with display labels.

***

### recordCount

```ts
readonly recordCount: Signal<number | null>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:236](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L236)

The number of matching records supplied by the host, if known.

***

### selectedColumnValues

```ts
protected readonly selectedColumnValues: Signal<readonly string[]>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:244](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L244)

The selected column keys consumed by the chip group.

***

### selectedCount

```ts
readonly selectedCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L228)

The number of selected columns.

***

### selectedFormat

```ts
readonly selectedFormat: Signal<CollectionExportFormat>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L213)

The currently selected format.

***

### totalCount

```ts
readonly totalCount: Signal<number>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L233)

The total number of available columns.

## Accessors

### intl

#### Get Signature

```ts
get intl(): CollectionExportDrawerComponentIntl;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:187](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L187)

Internationalization labels.

##### Returns

[`CollectionExportDrawerComponentIntl`](Class.CollectionExportDrawerComponentIntl)

## Methods

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:255](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L255)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:329](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L329)

Cancels the export and closes the drawer.

#### Returns

`void`

***

### onColumnChecked()

```ts
protected onColumnChecked(key): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L262)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:269](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L269)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:287](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L287)

Deselects all columns.

#### Returns

`void`

***

### onExport()

```ts
protected onExport(): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:301](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L301)

Confirms the export configuration and closes the drawer.

#### Returns

`void`

***

### onFormatChange()

```ts
protected onFormatChange(format): void;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:294](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L294)

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

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts:280](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportDrawerComponent.ts#L280)

Selects all available columns.

#### Returns

`void`
