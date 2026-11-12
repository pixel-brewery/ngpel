---
title: 'Function: buildFilterDefinitions()'
generated: true
editUrl: false
---
# Function: buildFilterDefinitions()

```ts
function buildFilterDefinitions<T>(columns, bindings): readonly IFilterDefinition[];
```

Defined in: [libs/ui/src/components/filter-bar/toFilterDefinitions.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/toFilterDefinitions.ts#L28)

Builds filter definitions by resolving [IFilterColumnBinding](Interface.IFilterColumnBinding) entries
against column definitions. The column's `title` is used as the filter label.

Bindings whose `columnKey` does not match any column are silently skipped.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The entity type whose keys constrain the allowed filter bindings. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `columns` | readonly \{ `key`: `string`; `title?`: `string`; \}[] | The column definitions array (must have `key` and `title`). |
| `bindings` | readonly [`IFilterColumnBinding`](Interface.IFilterColumnBinding)\<`T`\>[] | Filter bindings that reference columns by key. |

## Returns

readonly [`IFilterDefinition`](Interface.IFilterDefinition)[]

An array of filter definitions ready for the FilterBarComponent.

## Example

```typescript
const filters = buildFilterDefinitions<ICustomerResponse>(this._columnDefinitions, [
    { columnKey: 'firstName', type: 'text' },
    { columnKey: 'status',    type: 'select', options: [...] },
]);
```
