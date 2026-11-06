---
title: 'Class: CollectionExportService'
generated: true
editUrl: false
---
# Class: CollectionExportService

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportService.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportService.ts#L20)

Service that opens a configurable collection export drawer.
Feature presenters inject this service and call [open](#open) instead
of wiring the drawer themselves.

## Constructors

### Constructor

```ts
new CollectionExportService(): CollectionExportService;
```

#### Returns

`CollectionExportService`

## Methods

### open()

```ts
open(data): Promise<
  | ICollectionExportDrawerResult
| undefined>;
```

Defined in: [libs/ui/src/collection-view/exporting/CollectionExportService.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/CollectionExportService.ts#L38)

Opens the export configuration drawer and returns the user's
selection. Resolves to `undefined` when the user cancels.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ICollectionExportDrawerData`](Interface.ICollectionExportDrawerData) | Column metadata and format options for the drawer. |

#### Returns

`Promise`\<
  \| [`ICollectionExportDrawerResult`](Interface.ICollectionExportDrawerResult)
  \| `undefined`\>

The selected columns and format, or `undefined` on cancel.
