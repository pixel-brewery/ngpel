---
title: 'Class: FilterBarComponent'
generated: true
editUrl: false
---
# Class: FilterBarComponent

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:702](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L702)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:731](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L731)

#### Returns

`FilterBarComponent`

## Properties

### advancedRows

```ts
protected readonly advancedRows: Signal<readonly IAdvancedFilterRow[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:839](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L839)

Rows used by the advanced condition builder.

***

### filterChange

```ts
readonly filterChange: OutputEmitterRef<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:789](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L789)

Emitted whenever any active filter value changes.

***

### filters

```ts
readonly filters: InputSignal<readonly IFilterDefinition[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:762](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L762)

The filter definitions to render.

***

### hasActiveFilters

```ts
readonly hasActiveFilters: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:813](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L813)

Whether the filter bar has any active values.

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:805](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L805)

Whether the filter bar has any active values.

***

### mode

```ts
protected readonly mode: Signal<FilterBarModeValue>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:831](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L831)

The currently selected filter mode.

***

### persistenceKey

```ts
readonly persistenceKey: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:770](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L770)

Stable preference key used to persist active filter values.

***

### savedFilterCreate

```ts
readonly savedFilterCreate: OutputEmitterRef<ISavedFilterCreateRequest>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:797](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L797)

Emitted after the save-filter drawer was confirmed.

***

### saveFilterPresentation

```ts
readonly saveFilterPresentation: InputSignal<"drawer" | "dialog">;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:773](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L773)

Chooses the overlay used to name a saved filter.

***

### sheetHeight

```ts
protected readonly sheetHeight: WritableSignal<string | null>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:710](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L710)

***

### value

```ts
readonly value: InputSignal<FilterValues | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:781](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L781)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1228](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1228)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1218](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1218)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:821](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L821)

Internationalized labels used by the filter bar.

##### Returns

[`FilterBarComponentIntl`](Class.FilterBarComponentIntl)

## Methods

### advancedField()

```ts
protected advancedField(key): () => FieldState<unknown>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:965](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L965)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1155)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1165)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1176](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1176)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1198](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1198)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1186](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1186)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1208](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1208)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1145)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:913](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L913)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:845](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L845)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:884](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L884)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:898](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L898)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:935](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L935)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1085](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1085)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1068](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1068)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1125)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1053](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1053)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:953](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L953)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1099](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1099)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:985](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L985)

Resets all filter values.

#### Returns

`void`

***

### onSaveFilter()

```ts
protected onSaveFilter(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1008](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1008)

Opens the overlay used to save the current filter values.

#### Returns

`void`

***

### onSetAdvancedGroupCondition()

```ts
protected onSetAdvancedGroupCondition(groupId, condition): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1115)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:941](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L941)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:929](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L929)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1135)

Returns a standard filter track key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filter` | [`IFilterDefinition`](Interface.IFilterDefinition) | Filter definition. |

#### Returns

`string`
