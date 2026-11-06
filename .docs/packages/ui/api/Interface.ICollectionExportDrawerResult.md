---
title: 'Interface: ICollectionExportDrawerResult'
generated: true
editUrl: false
---
# Interface: ICollectionExportDrawerResult

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts#L13)

Result returned by the collection export drawer on confirmation.

## Properties

### columns

```ts
readonly columns: readonly ICollectionExportColumn[];
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts#L17)

The columns selected by the user.

***

### format

```ts
readonly format: CollectionExportFormat;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportDrawerResult.ts#L22)

The export format chosen by the user.
