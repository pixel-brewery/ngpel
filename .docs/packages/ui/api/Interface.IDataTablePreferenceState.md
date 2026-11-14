---
title: 'Interface: IDataTablePreferenceState'
generated: true
editUrl: false
---
# Interface: IDataTablePreferenceState

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts#L12)

Persisted state for a Mosaik data-table.

## Properties

### columns

```ts
readonly columns: readonly IDataTableColumnPreference[];
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts#L25)

Persisted column preferences.

***

### groupBy?

```ts
readonly groupBy?: readonly string[];
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts#L28)

Column keys used for grouping, from outermost to innermost.

***

### version

```ts
readonly version: 1;
```

Defined in: [libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/data-table-preferences/IDataTablePreferenceState.ts#L18)

Schema version of the persisted state.
