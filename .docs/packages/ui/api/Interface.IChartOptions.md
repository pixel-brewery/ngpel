---
title: 'Interface: IChartOptions'
generated: true
editUrl: false
---
# Interface: IChartOptions

Defined in: libs/ui/src/components/chart/IChartOptions.ts:13

Chart inputs shared by Mosaik chart consumers.

## Properties

### chart?

```ts
readonly optional chart?: ApexChart;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:134

Chart-level sizing and behavior.

***

### colors?

```ts
readonly optional colors?: (string | ((opts) => string))[];
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:126

Ordered series and segment colors.

***

### dataLabels?

```ts
readonly optional dataLabels?: ApexDataLabels;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:62

Labels drawn on data points.

***

### display

```ts
readonly display: ChartDisplayType;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:22

Mosaik chart display type.

***

### fill?

```ts
readonly optional fill?: ApexFill;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:150

Color fill for series or segments.

***

### grid?

```ts
readonly optional grid?: ApexGrid;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:142

Plot grid appearance.

***

### isLegendVisible?

```ts
readonly optional isLegendVisible?: boolean;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:94

Whether the chart legend is visible.

***

### isXAxisVisible?

```ts
readonly optional isXAxisVisible?: boolean;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:174

Whether the horizontal axis is shown.

***

### isYAxisVisible?

```ts
readonly optional isYAxisVisible?: boolean;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:182

Whether the vertical axis is shown.

***

### labels?

```ts
readonly optional labels?: string[];
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:38

Labels for charts without an axis.

***

### legend?

```ts
readonly optional legend?: ApexLegend;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:110

Legend labels, markers, and spacing.

***

### legendPosition?

```ts
readonly optional legendPosition?: ChartLegendPosition;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:102

Legend placement around the plot.

***

### markers?

```ts
readonly optional markers?: ApexMarkers;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:158

Data-point marker appearance.

***

### noData?

```ts
readonly optional noData?: ApexNoData;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:118

Placeholder displayed when no series data exists.

***

### plotOptions?

```ts
readonly optional plotOptions?: ApexPlotOptions;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:78

Chart-type-specific plot options.

***

### series

```ts
readonly series: ApexNonAxisChartSeries | undefined;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:30

Data series rendered by the chart.

***

### states?

```ts
readonly optional states?: ApexStates;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:166

Hover and active visual states.

***

### stroke?

```ts
readonly optional stroke?: ApexStroke;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:86

Series and segment outlines.

***

### tooltip?

```ts
readonly optional tooltip?: ApexTooltip;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:70

Tooltip behavior and formatting.

***

### xAxis?

```ts
readonly optional xAxis?: ApexXAxis;
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:46

Horizontal axis configuration.

***

### yAxis?

```ts
readonly optional yAxis?: ApexYAxis | ApexYAxis[];
```

Defined in: libs/ui/src/components/chart/IChartOptions.ts:54

Vertical axis configuration.
