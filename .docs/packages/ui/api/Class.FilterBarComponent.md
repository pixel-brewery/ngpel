---
title: 'Class: FilterBarComponent'
generated: true
editUrl: false
---
# Class: FilterBarComponent

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:701](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L701)

A configurable, reusable filter bar for list views.
Renders filter controls from [IFilterDefinition](Interface.IFilterDefinition) items and emits active filter values whenever the Signal Form changes.

## Example

```html
<ngp-filter-bar
    [filters]="presenter.filterDefinitions()"
    (filterChange)="presenter.filterController.applyFilterCommand.execute($event)" />
```

## Implements

- `AfterViewInit`
- `OnChanges`
- `OnInit`

## Constructors

### Constructor

```ts
new FilterBarComponent(): FilterBarComponent;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:730](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L730)

#### Returns

`FilterBarComponent`

## Properties

### advancedRows

```ts
protected readonly advancedRows: Signal<readonly IAdvancedFilterRow[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:838](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L838)

Rows used by the advanced condition builder.

***

### filterChange

```ts
readonly filterChange: OutputEmitterRef<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:788](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L788)

Emitted whenever any active filter value changes.

***

### filters

```ts
readonly filters: InputSignal<readonly IFilterDefinition[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:761](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L761)

The filter definitions to render.

***

### hasActiveFilters

```ts
readonly hasActiveFilters: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:812](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L812)

Whether the filter bar has any active values.

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:804](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L804)

Whether the filter bar has any active values.

***

### mode

```ts
protected readonly mode: Signal<FilterBarModeValue>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:830](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L830)

The currently selected filter mode.

***

### persistenceKey

```ts
readonly persistenceKey: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:769](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L769)

Stable preference key used to persist active filter values.

***

### savedFilterCreate

```ts
readonly savedFilterCreate: OutputEmitterRef<ISavedFilterCreateRequest>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:796](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L796)

Emitted after the save-filter drawer was confirmed.

***

### saveFilterPresentation

```ts
readonly saveFilterPresentation: InputSignal<"drawer" | "dialog">;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:772](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L772)

Chooses the overlay used to name a saved filter.

***

### sheetHeight

```ts
protected readonly sheetHeight: WritableSignal<string | null>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:709](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L709)

***

### value

```ts
readonly value: InputSignal<FilterValues | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:780](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L780)

Externally controlled filter values, for example when applying a saved filter.

## Accessors

### filterBarMode

#### Get Signature

```ts
get protected filterBarMode(): {
  Advanced: "advanced";
  Standard: "standard";
};
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1227](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1227)

Returns the current filter bar mode enum for template usage.

##### Returns

```ts
{
  Advanced: "advanced";
  Standard: "standard";
}
```

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| `Advanced` | `"advanced"` | `'advanced'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L34) |
| `Standard` | `"standard"` | `'standard'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L33) |

***

### filterType

#### Get Signature

```ts
get protected filterType(): {
  Boolean: "boolean";
  Date: "date";
  DateRange: "date-range";
  MultiSelect: "multi-select";
  Number: "number";
  Select: "select";
  Text: "text";
};
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1217)

Returns the current filter type enum for template usage.

##### Returns

```ts
{
  Boolean: "boolean";
  Date: "date";
  DateRange: "date-range";
  MultiSelect: "multi-select";
  Number: "number";
  Select: "select";
  Text: "text";
}
```

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| `Boolean` | `"boolean"` | `'boolean'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L17) |
| `Date` | `"date"` | `'date'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L15) |
| `DateRange` | `"date-range"` | `'date-range'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L16) |
| `MultiSelect` | `"multi-select"` | `'multi-select'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L14) |
| `Number` | `"number"` | `'number'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L12) |
| `Select` | `"select"` | `'select'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L13) |
| `Text` | `"text"` | `'text'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L11) |

***

### intl

#### Get Signature

```ts
get intl(): FilterBarComponentIntl;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:820](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L820)

Internationalized labels used by the filter bar.

##### Returns

[`FilterBarComponentIntl`](Class.FilterBarComponentIntl)

## Methods

### advancedField()

```ts
protected advancedField(key): () => FieldState<unknown>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:964](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L964)

Returns the advanced form field accessor for a dynamic control key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Advanced control key. |

#### Returns

() => `FieldState`\<`unknown`\>

***

### advancedGroup()

```ts
protected advancedGroup(node): IAdvancedFilterGroup | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1154)

Returns a typed group node when applicable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | [`AdvancedFilterNode`](TypeAlias.AdvancedFilterNode) | Advanced filter node. |

#### Returns

[`IAdvancedFilterGroup`](Interface.IAdvancedFilterGroup) \| `undefined`

***

### advancedRule()

```ts
protected advancedRule(node): IAdvancedFilterRule | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1164](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1164)

Returns a typed rule node when applicable.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | [`AdvancedFilterNode`](TypeAlias.AdvancedFilterNode) | Advanced filter node. |

#### Returns

[`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) \| `undefined`

***

### advancedRuleControlKey()

```ts
protected advancedRuleControlKey(rule, kind): string;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1175)

Returns an advanced rule control key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rule` | [`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) | Advanced rule. |
| `kind` | `AdvancedRuleControlKind` | Control kind. |

#### Returns

`string`

***

### advancedRuleFilter()

```ts
protected advancedRuleFilter(rule): IFilterDefinition | undefined;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1197)

Returns the selected filter definition for a rule.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rule` | [`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) | Advanced rule. |

#### Returns

[`IFilterDefinition`](Interface.IFilterDefinition) \| `undefined`

***

### advancedRuleOperatorOptions()

```ts
protected advancedRuleOperatorOptions(rule): readonly IFilterOperatorOption[];
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1185](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1185)

Returns available operator options for a rule.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rule` | [`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) | Advanced rule. |

#### Returns

readonly `IFilterOperatorOption`[]

***

### advancedRuleRequiresValue()

```ts
protected advancedRuleRequiresValue(rule): boolean;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1207](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1207)

Returns whether a rule needs a value control.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rule` | [`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) | Advanced rule. |

#### Returns

`boolean`

***

### canRemoveAdvancedRow()

```ts
protected canRemoveAdvancedRow(row): boolean;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1144)

Returns whether a flattened advanced row can be removed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `row` | [`IAdvancedFilterRow`](Interface.IAdvancedFilterRow) | Advanced filter row. |

#### Returns

`boolean`

***

### field()

```ts
protected field(key): () => FieldState<unknown>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:912](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L912)

Returns the field accessor for a dynamic filter key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Filter definition key. |

#### Returns

() => `FieldState`\<`unknown`\>

***

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:844](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L844)

A callback method that is invoked immediately after
Angular has completed initialization of a component's view.
It is invoked only once when the view is instantiated.

#### Returns

`void`

#### Implementation of

`AfterViewInit.ngAfterViewInit`

***

### ngOnChanges()

```ts
ngOnChanges(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:883](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L883)

Synchronizes dynamic form fields after input changes.

#### Returns

`void`

#### Implementation of

`OnChanges.ngOnChanges`

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:897](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L897)

Synchronizes dynamic form fields before the first view render.

#### Returns

`void`

#### Implementation of

`OnInit.ngOnInit`

***

### numberValue()

```ts
protected numberValue(field): number | null;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:934](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L934)

Reads a controlled numeric field without treating an empty value as zero.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `field` | () => `FieldState`\<`unknown`\> |

#### Returns

`number` \| `null`

***

### onAddAdvancedGroup()

```ts
protected onAddAdvancedGroup(groupId): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1084](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1084)

Adds a nested group to an advanced group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `groupId` | `string` | Target group id. |

#### Returns

`void`

***

### onAddAdvancedRule()

```ts
protected onAddAdvancedRule(groupId): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1067](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1067)

Adds a rule to an advanced group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `groupId` | `string` | Target group id. |

#### Returns

`void`

***

### onAdvancedRuleFieldChanged()

```ts
protected onAdvancedRuleFieldChanged(rule): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1124)

Normalizes rule operator/value after the field select changes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rule` | [`IAdvancedFilterRule`](Interface.IAdvancedFilterRule) | Changed rule. |

#### Returns

`void`

***

### onModeChanged()

```ts
protected onModeChanged(mode): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1052](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1052)

Switches between standard and advanced mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | [`FilterBarModeValue`](TypeAlias.FilterBarModeValue) | Target mode. |

#### Returns

`void`

***

### onNumberInput()

```ts
protected onNumberInput(
   field,
   value,
   integer?
): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:952](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L952)

Updates the controlled value only for a valid number or explicit clear.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `field` | () => `FieldState`\<`unknown`\> | `undefined` |
| `value` | `unknown` | `undefined` |
| `integer?` | `boolean` | `false` |

#### Returns

`void`

***

### onRemoveAdvancedNode()

```ts
protected onRemoveAdvancedNode(nodeId): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1098](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1098)

Removes a rule or group.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `nodeId` | `string` | Node id to remove. |

#### Returns

`void`

***

### onReset()

```ts
protected onReset(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:984](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L984)

Resets all filter values.

#### Returns

`void`

***

### onSaveFilter()

```ts
protected onSaveFilter(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1007](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1007)

Opens the overlay used to save the current filter values.

#### Returns

`void`

***

### onSetAdvancedGroupCondition()

```ts
protected onSetAdvancedGroupCondition(groupId, condition): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1114)

Updates a group condition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `groupId` | `string` | Group id. |
| `condition` | [`FilterConditionValue`](TypeAlias.FilterConditionValue) | Target condition. |

#### Returns

`void`

***

### restoreEmptyNumber()

```ts
protected restoreEmptyNumber(numberBox, field): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:940](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L940)

Restores an empty display after the initial Mosaik update.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `numberBox` | `NumberBoxComponent` |
| `field` | () => `FieldState`\<`unknown`\> |

#### Returns

`void`

***

### selectionValue()

```ts
protected selectionValue(key): string | null;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:928](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L928)

Reads the controlled select value, keeping an empty selection separate from a filter option.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |

#### Returns

`string` \| `null`

***

### standardFilterTrackKey()

```ts
protected standardFilterTrackKey(filter): string;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1134)

Returns a standard filter track key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filter` | [`IFilterDefinition`](Interface.IFilterDefinition) | Filter definition. |

#### Returns

`string`
