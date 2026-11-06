---
title: 'Class: DataTablePreferencesDirective'
generated: true
editUrl: false
---
# Class: DataTablePreferencesDirective

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L28)

Persists user-visible column configuration for a Mosaik data-table.

## Constructors

### Constructor

```ts
new DataTablePreferencesDirective(): DataTablePreferencesDirective;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L53)

Creates a data-table preference directive.

#### Returns

`DataTablePreferencesDirective`

## Properties

### preferenceKey

```ts
readonly preferenceKey: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L40)

Stable preference key used to store the table configuration.

## Methods

### onDataTableEditorClosed()

```ts
onDataTableEditorClosed(): void;
```

Defined in: [libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/DataTablePreferencesDirective.ts#L67)

Captures Mosaik column editor changes after the editor closes.

#### Returns

`void`
