---
title: 'Class: DataTablePreferencesDirective'
generated: true
editUrl: false
---
# Class: DataTablePreferencesDirective

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L54)

Persists column visibility and widths for a Mosaik data-table, with optional grouping and column pinning.

## Constructors

### Constructor

```ts
new DataTablePreferencesDirective(): DataTablePreferencesDirective;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L90)

Creates a data-table preference directive.

#### Returns

`DataTablePreferencesDirective`

## Properties

### persistColumnWidths

```ts
readonly persistColumnWidths: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:73](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L73)

Whether to persist column widths alongside visibility.

***

### persistLayout

```ts
readonly persistLayout: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L76)

Whether to persist native grouping and column pinning for explicitly defined columns.

***

### preferenceKey

```ts
readonly preferenceKey: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L68)

Stable preference key used to store the table configuration.

***

### singleGroup

```ts
readonly singleGroup: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L79)

Keep the most recently chosen field when the data source supports one grouping level.

## Methods

### onDataTableBeforeGroupByChange()

```ts
onDataTableBeforeGroupByChange(event): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L139)

Normalizes the table's grouping action before it changes native state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` \| `IGroupingChange` |

#### Returns

`void`

***

### onDataTableEditorClosed()

```ts
onDataTableEditorClosed(): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L104)

Captures Mosaik column editor changes after the editor closes.

#### Returns

`void`

***

### onDataTableStateChanged()

```ts
onDataTableStateChanged(event): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L122)

Stores only the preference fields from the native table state.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | \| `Event` \| \{ `state`: `INativeTableLayout`; \} |

#### Returns

`void`

***

### onTableColumnEditorClosed()

```ts
onTableColumnEditorClosed(event): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L113)

Handles the composed column editor event of current Mosaik releases.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onTableColumnResized()

```ts
onTableColumnResized(event): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L154)

Persists the resized width under the column's stable key.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `TableColumnResizedEvent` |

#### Returns

`void`
