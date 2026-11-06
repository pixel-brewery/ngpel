---
title: 'Class: DataTablePreferencesDirective'
generated: true
editUrl: false
---
# Class: DataTablePreferencesDirective

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L28)

Persists column visibility and user-selected widths for a Mosaik data-table.

## Constructors

### Constructor

```ts
new DataTablePreferencesDirective(): DataTablePreferencesDirective;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L57)

Creates a data-table preference directive.

#### Returns

`DataTablePreferencesDirective`

## Properties

### persistColumnWidths

```ts
readonly persistColumnWidths: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L46)

Whether to persist column widths alongside visibility.

***

### preferenceKey

```ts
readonly preferenceKey: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L41)

Stable preference key used to store the table configuration.

## Methods

### onDataTableEditorClosed()

```ts
onDataTableEditorClosed(): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L71)

Captures Mosaik column editor changes after the editor closes.

#### Returns

`void`

***

### onTableColumnResized()

```ts
onTableColumnResized(event): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L80)

Persists the resized width under the column's stable key.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TableColumnResizedEvent` |

#### Returns

`void`
