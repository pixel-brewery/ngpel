---
title: 'Interface: ICollectionExportDrawerData'
generated: true
editUrl: false
---
# Interface: ICollectionExportDrawerData

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts#L19)

Input data for the collection export dialog.

## Properties

### availableFormats?

```ts
readonly optional availableFormats?: readonly CollectionExportFormat[];
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts#L33)

Available export formats.

#### Default

```ts
['xlsx', 'csv', 'ods']
```

***

### columns

```ts
readonly columns: readonly ICollectionExportColumn[];
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts#L23)

All exportable columns with their metadata.

***

### defaultFormat?

```ts
readonly optional defaultFormat?: CollectionExportFormat;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts#L40)

The default format to select.

#### Default

```ts
'xlsx'
```

***

### recordCount?

```ts
readonly optional recordCount?: number;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerData.ts#L26)

Number of records that match the current filter, when known.
