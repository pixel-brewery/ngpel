// #region Imports

import type { ChartDisplayType, ChartLegendPosition } from '@pixel-brewery/mosaik-elements-foundation/components/chart';
import type { ApexOptions } from 'apexcharts';

// #endregion

/**
 * Chart inputs shared by Mosaik chart consumers.
 *
 * @public
 */
export interface IChartOptions {
    // #region Properties

    /**
     * Mosaik chart display type.
     *
     * @public
     * @readonly
     */
    readonly display: ChartDisplayType;

    /**
     * Data series rendered by the chart.
     *
     * @public
     * @readonly
     */
    readonly series: ApexOptions['series'];

    /**
     * Labels for charts without an axis.
     *
     * @public
     * @readonly
     */
    readonly labels?: ApexOptions['labels'];

    /**
     * Horizontal axis configuration.
     *
     * @public
     * @readonly
     */
    readonly xAxis?: ApexOptions['xaxis'];

    /**
     * Vertical axis configuration.
     *
     * @public
     * @readonly
     */
    readonly yAxis?: ApexOptions['yaxis'];

    /**
     * Labels drawn on data points.
     *
     * @public
     * @readonly
     */
    readonly dataLabels?: ApexOptions['dataLabels'];

    /**
     * Tooltip behavior and formatting.
     *
     * @public
     * @readonly
     */
    readonly tooltip?: ApexOptions['tooltip'];

    /**
     * Chart-type-specific plot options.
     *
     * @public
     * @readonly
     */
    readonly plotOptions?: ApexOptions['plotOptions'];

    /**
     * Series and segment outlines.
     *
     * @public
     * @readonly
     */
    readonly stroke?: ApexOptions['stroke'];

    /**
     * Whether the chart legend is visible.
     *
     * @public
     * @readonly
     */
    readonly isLegendVisible?: boolean;

    /**
     * Legend placement around the plot.
     *
     * @public
     * @readonly
     */
    readonly legendPosition?: ChartLegendPosition;

    /**
     * Legend labels, markers, and spacing.
     *
     * @public
     * @readonly
     */
    readonly legend?: ApexOptions['legend'];

    /**
     * Placeholder displayed when no series data exists.
     *
     * @public
     * @readonly
     */
    readonly noData?: ApexOptions['noData'];

    /**
     * Ordered series and segment colors.
     *
     * @public
     * @readonly
     */
    readonly colors?: ApexOptions['colors'];

    /**
     * Chart-level sizing and behavior.
     *
     * @public
     * @readonly
     */
    readonly chart?: ApexOptions['chart'];

    /**
     * Plot grid appearance.
     *
     * @public
     * @readonly
     */
    readonly grid?: ApexOptions['grid'];

    /**
     * Color fill for series or segments.
     *
     * @public
     * @readonly
     */
    readonly fill?: ApexOptions['fill'];

    /**
     * Data-point marker appearance.
     *
     * @public
     * @readonly
     */
    readonly markers?: ApexOptions['markers'];

    /**
     * Hover and active visual states.
     *
     * @public
     * @readonly
     */
    readonly states?: ApexOptions['states'];

    /**
     * Whether the horizontal axis is shown.
     *
     * @public
     * @readonly
     */
    readonly isXAxisVisible?: boolean;

    /**
     * Whether the vertical axis is shown.
     *
     * @public
     * @readonly
     */
    readonly isYAxisVisible?: boolean;

    // #endregion
}
