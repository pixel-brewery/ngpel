---
title: 'Interface: IDataTableColumnPreference'
generated: true
editUrl: false
---
# Interface: IDataTableColumnPreference

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts#L10)

Persisted visibility, width and pinning of one data-table column.

## Properties

### hidden

```ts
readonly hidden: boolean;
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts#L23)

Whether the column is hidden.

***

### key

```ts
readonly key: string;
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts#L16)

Stable data-table column key.

***

### pinned?

```ts
readonly pinned?: "none" | "left" | "right";
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts#L29)

Pinning chosen in the table when layout persistence is enabled.

***

### width?

```ts
readonly width?: number;
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTableColumnPreference.ts#L26)

Width in CSS pixels after the column was resized.
