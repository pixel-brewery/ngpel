---
title: 'Interface: ICollectionExportFilter'
generated: true
editUrl: false
---
# Interface: ICollectionExportFilter

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts#L6)

Export filter metadata derived from active collection filters.

## Properties

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts#L10)

Field key to filter on.

***

### operator

```ts
readonly operator: "eq" | "neq" | "contains" | "startsWith" | "gt" | "gte" | "lt" | "lte";
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts#L15)

Filter operator.

***

### value

```ts
readonly value: string;
```

Defined in: [libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/exporting/ICollectionExportFilter.ts#L20)

Filter value coerced for backend export APIs.
