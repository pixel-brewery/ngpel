---
title: 'Class: FilterBarComponent'
generated: true
editUrl: false
---
# Class: FilterBarComponent

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:573](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L573)

A configurable, reusable filter bar for list views.
Renders filter controls from [IFilterDefinition](Interface.IFilterDefinition) items and emits active filter values whenever the Signal Form changes.

## Example

```html
<ngp-filter-bar
    [filters]="presenter.filterDefinitions()"
    (filterChange)="presenter.filterController.applyFilterCommand.execute($event)" />
```

## Implements

- `OnChanges`
- `OnInit`

## Constructors

### Constructor

```ts
new FilterBarComponent(): FilterBarComponent;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:596](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L596)

#### Returns

`FilterBarComponent`

## Properties

### advancedRows

```ts
protected readonly advancedRows: Signal<readonly IAdvancedFilterRow[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:697](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L697)

Rows used by the advanced condition builder.

***

### filterChange

```ts
readonly filterChange: OutputEmitterRef<FilterValues>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:647](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L647)

Emitted whenever any active filter value changes.

***

### filters

```ts
readonly filters: InputSignal<readonly IFilterDefinition[]>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:623](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L623)

The filter definitions to render.

***

### hasActiveFilters

```ts
readonly hasActiveFilters: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:671](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L671)

Whether the filter bar has any active values.

***

### isFilterActive

```ts
readonly isFilterActive: Signal<boolean>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:663](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L663)

Whether the filter bar has any active values.

***

### mode

```ts
protected readonly mode: Signal<FilterBarModeValue>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:689](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L689)

The currently selected filter mode.

***

### persistenceKey

```ts
readonly persistenceKey: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:631](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L631)

Stable preference key used to persist active filter values.

***

### savedFilterCreate

```ts
readonly savedFilterCreate: OutputEmitterRef<ISavedFilterCreateRequest>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:655](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L655)

Emitted after the save-filter drawer was confirmed.

***

### value

```ts
readonly value: InputSignal<FilterValues | undefined>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:639](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L639)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1005](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1005)

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

### filterCondition

#### Get Signature

```ts
get protected filterCondition(): {
  And: "and";
  Or: "or";
};
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:1015](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L1015)

Returns the current filter condition enum for template usage.

##### Returns

```ts
{
  And: "and";
  Or: "or";
}
```

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| `And` | `"and"` | `'and'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L50) |
| `Or` | `"or"` | `'or'` | [libs/ui/src/components/filter-bar/IFilterDefinition.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/IFilterDefinition.ts#L51) |

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:995](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L995)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:679](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L679)

Internationalized labels used by the filter bar.

##### Returns

[`FilterBarComponentIntl`](Class.FilterBarComponentIntl)

## Methods

### advancedField()

```ts
protected advancedField(key): () => FieldState<unknown>;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:760](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L760)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:932](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L932)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:942](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L942)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:953](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L953)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:975](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L975)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:963](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L963)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:985](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L985)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:922](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L922)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:739](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L739)

Returns the field accessor for a dynamic filter key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `string` | Filter definition key. |

#### Returns

() => `FieldState`\<`unknown`\>

***

### ngOnChanges()

```ts
ngOnChanges(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:708](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L708)

Synchronizes dynamic form fields after input changes.

#### Returns

`void`

#### Implementation of

```ts
OnChanges.ngOnChanges
```

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:723](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L723)

Synchronizes dynamic form fields before the first view render.

#### Returns

`void`

#### Implementation of

```ts
OnInit.ngOnInit
```

***

### onAddAdvancedGroup()

```ts
protected onAddAdvancedGroup(groupId): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:862](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L862)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:845](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L845)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:902](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L902)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:830](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L830)

Switches between standard and advanced mode.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `mode` | [`FilterBarModeValue`](TypeAlias.FilterBarModeValue) | Target mode. |

#### Returns

`void`

***

### onRemoveAdvancedNode()

```ts
protected onRemoveAdvancedNode(nodeId): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:876](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L876)

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

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:780](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L780)

Resets all filter values.

#### Returns

`void`

***

### onSaveFilter()

```ts
protected onSaveFilter(): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:794](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L794)

Opens the drawer used to save the current filter values.

#### Returns

`void`

***

### onSetAdvancedGroupCondition()

```ts
protected onSetAdvancedGroupCondition(groupId, condition): void;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:892](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L892)

Updates a group condition.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `groupId` | `string` | Group id. |
| `condition` | [`FilterConditionValue`](TypeAlias.FilterConditionValue) | Target condition. |

#### Returns

`void`

***

### standardFilterTrackKey()

```ts
protected standardFilterTrackKey(filter): string;
```

Defined in: [libs/ui/src/components/filter-bar/FilterBarComponent.ts:912](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/filter-bar/FilterBarComponent.ts#L912)

Returns a standard filter track key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `filter` | [`IFilterDefinition`](Interface.IFilterDefinition) | Filter definition. |

#### Returns

`string`
