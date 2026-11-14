---
title: 'Interface: ICollectionField\<TItem\>'
generated: true
editUrl: false
---
# Interface: ICollectionField\<TItem\>

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L16)

Field metadata used as the source for table columns, filters, and exports.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-titem"></a> `TItem` |

## Properties

### export?

```ts
readonly export?:
  | false
  | ICollectionExportFieldConfig;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L57)

Optional export projection. Set enabled=false to exclude the field from exports.

***

### filter?

```ts
readonly filter?: {
  integer?: boolean;
  options?:   | readonly IFilterOption[]
     | (() => readonly IFilterOption[]);
  placeholder?: string;
  type: FilterTypeValue;
};
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L40)

Optional filter projection. Omit to exclude the field from filters.

#### integer?

```ts
readonly integer?: boolean;
```

Restricts numeric input to whole numbers.

#### options?

```ts
readonly options?:
  | readonly IFilterOption[]
  | (() => readonly IFilterOption[]);
```

Static choices or choices read from signals as they become available.

#### placeholder?

```ts
readonly placeholder?: string;
```

#### type

```ts
readonly type: FilterTypeValue;
```

***

### key

```ts
readonly key: keyof TItem & string;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L20)

Stable field key.

***

### pathFn?

```ts
readonly pathFn?: PathFn<TItem>;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L30)

Optional member path or value getter used by table projections.

***

### sortFn?

```ts
readonly sortFn?: SortCompareFn<TItem>;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L35)

Optional sort callback used by table projections.

***

### table?

```ts
readonly table?:
  | false
| Partial<Omit<IDataTableColumnDefinition<TItem>, "key" | "title">>;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L52)

Optional table projection. Set to false to exclude the field from the table.

***

### title

```ts
readonly title: string;
```

Defined in: [libs/ui/src/collection-view/fields/ICollectionField.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/collection-view/fields/ICollectionField.ts#L25)

Display title used for column headers, filters, and exports.
