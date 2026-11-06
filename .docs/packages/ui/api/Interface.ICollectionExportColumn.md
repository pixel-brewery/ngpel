---
title: 'Interface: ICollectionExportColumn'
generated: true
editUrl: false
---
# Interface: ICollectionExportColumn

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L6)

Export column metadata derived from a collection field.

## Properties

### autoWidth?

```ts
readonly optional autoWidth?: boolean;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L25)

Auto-size column width based on content.

***

### header

```ts
readonly header: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L15)

Translated column header for the export file.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L10)

Field key matching the entity property name.

***

### numFmt?

```ts
readonly optional numFmt?: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L35)

Number format string.

***

### type?

```ts
readonly optional type?: "string" | "number" | "boolean" | "date";
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L20)

Column data type hint.

***

### width?

```ts
readonly optional width?: number;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L30)

Column width in characters.
