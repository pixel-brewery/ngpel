---
title: 'Class: ChartTheme'
generated: true
editUrl: false
---
# Class: ChartTheme

Defined in: libs/ui/src/components/chart/ChartTheme.ts:14

Applies one Mosaik-token chart language across chart types and layouts.

## Constructors

### Constructor

```ts
new ChartTheme(): ChartTheme;
```

#### Returns

`ChartTheme`

## Methods

### apply()

```ts
static apply(options, layout?): IChartOptions;
```

Defined in: libs/ui/src/components/chart/ChartTheme.ts:50

Adds shared chart defaults without replacing caller-owned data or interactions.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `options` | [`IChartOptions`](Interface.IChartOptions) | `undefined` | Chart data and optional overrides. |
| `layout` | [`ChartLayout`](TypeAlias.ChartLayout) | `'standard'` | Standard plot or axis-free compact plot. |

#### Returns

[`IChartOptions`](Interface.IChartOptions)

Options ready for the Mosaik chart component.

***

### createTooltip()

```ts
static createTooltip(title, rows): string;
```

Defined in: libs/ui/src/components/chart/ChartTheme.ts:184

Builds escaped tooltip markup using the active Mosaik scheme.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `title` | `string` | Tooltip heading. |
| `rows` | readonly \{ `label`: `string`; `value`: `string`; \}[] | Label and value pairs. |

#### Returns

`string`

Markup for an Apex custom tooltip.
