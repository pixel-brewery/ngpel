---
title: 'Interface: ICollectionTablePageQuery'
generated: true
editUrl: false
---
# Interface: ICollectionTablePageQuery

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L2)

A grouped collection request, independent of the source transport.

## Properties

### groupBy?

```ts
readonly groupBy?: readonly string[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L4)

Grouped column keys ordered from outermost to innermost.

***

### groupPath?

```ts
readonly groupPath?: readonly unknown[];
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L6)

Values of the requested leaf group, ordered to match the grouped columns.

***

### groupsOnly?

```ts
readonly groupsOnly?: boolean;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L8)

Whether to return the group counts for the full filtered collection.

***

### sortBy?

```ts
readonly sortBy?: string;
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:9](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L9)

***

### sortDirection

```ts
readonly sortDirection: "asc" | "desc";
```

Defined in: [libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/views/table/ICollectionTablePageQuery.ts#L10)
