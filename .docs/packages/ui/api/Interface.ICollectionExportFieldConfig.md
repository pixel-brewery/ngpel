---
title: 'Interface: ICollectionExportFieldConfig'
generated: true
editUrl: false
---
# Interface: ICollectionExportFieldConfig

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFieldConfig.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFieldConfig.ts#L12)

Export behavior for a collection field.

## Extends

- `Partial`\<`Omit`\<[`ICollectionExportColumn`](Interface.ICollectionExportColumn), `"key"` \| `"header"`\>\>

## Properties

### autoWidth?

```ts
readonly optional autoWidth?: boolean;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L25)

Auto-size column width based on content.

#### Inherited from

[`ICollectionExportColumn`](Interface.ICollectionExportColumn).[`autoWidth`](Interface.ICollectionExportColumn#autowidth)

***

### enabled?

```ts
readonly optional enabled?: boolean;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFieldConfig.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFieldConfig.ts#L16)

Whether this field participates in exports.

***

### numFmt?

```ts
readonly optional numFmt?: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L35)

Number format string.

#### Inherited from

[`ICollectionExportColumn`](Interface.ICollectionExportColumn).[`numFmt`](Interface.ICollectionExportColumn#numfmt)

***

### type?

```ts
readonly optional type?: "string" | "number" | "boolean" | "date";
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L20)

Column data type hint.

#### Inherited from

[`ICollectionExportColumn`](Interface.ICollectionExportColumn).[`type`](Interface.ICollectionExportColumn#type)

***

### width?

```ts
readonly optional width?: number;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportColumn.ts#L30)

Column width in characters.

#### Inherited from

[`ICollectionExportColumn`](Interface.ICollectionExportColumn).[`width`](Interface.ICollectionExportColumn#width)
