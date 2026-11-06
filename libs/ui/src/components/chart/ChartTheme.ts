// #region Imports

import type { ApexOptions, ApexYAxis } from 'apexcharts';
import type { ChartLayout } from './ChartLayout';
import type { IChartOptions } from './IChartOptions';

// #endregion

/**
 * Applies one Mosaik-token chart language across chart types and layouts.
 *
 * @public
 */
export class ChartTheme {
    // #region Fields

    private static readonly _colors: readonly string[] = [
        'var(--mosaik-color-primary-500)',
        'var(--mosaik-color-secondary-500)',
        'var(--mosaik-color-info-500)',
        'var(--mosaik-color-warning-500)',
        'var(--mosaik-color-success-500)',
        'var(--mosaik-color-danger-500)',
        'var(--mosaik-color-primary-300)',
        'var(--mosaik-color-secondary-300)',
        'var(--mosaik-color-info-300)',
        'var(--mosaik-color-warning-300)',
        'var(--mosaik-color-success-300)',
        'var(--mosaik-color-danger-300)',
        'var(--mosaik-color-primary-700)',
        'var(--mosaik-color-secondary-700)',
        'var(--mosaik-color-info-700)',
        'var(--mosaik-color-warning-700)',
        'var(--mosaik-color-success-700)',
        'var(--mosaik-color-danger-700)',
    ];

    // #endregion

    // #region Methods

    /**
     * Adds shared chart defaults without replacing caller-owned data or interactions.
     *
     * @param options - Chart data and optional overrides.
     * @param layout - Standard plot or axis-free compact plot.
     * @returns Options ready for the Mosaik chart component.
     * @public
     */
    public static apply(options: IChartOptions, layout: ChartLayout = 'standard'): IChartOptions {
        const sparkline = layout === 'sparkline';
        const circular = options.display === 'pie' || options.display === 'donut' || options.display === 'polarArea' || options.display === 'radialBar';
        const zoomable = !sparkline && (options.display === 'bar' || options.display === 'line' || options.display === 'area' || options.display === 'scatter');
        const gridPadding = sparkline ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: -4, right: 0, bottom: 0, left: 0 };

        return {
            ...options,
            colors: options.colors ?? [...ChartTheme._colors],
            chart: {
                background: 'transparent',
                foreColor: 'var(--mosaik-scheme-foreground)',
                fontFamily: 'inherit',
                parentHeightOffset: 0,
                redrawOnParentResize: true,
                redrawOnWindowResize: true,
                toolbar: {
                    show: false,
                    ...(zoomable ? { autoSelected: 'zoom' as const } : {}),
                    tools: {
                        download: !sparkline,
                        selection: false,
                        zoom: zoomable,
                        zoomin: zoomable,
                        zoomout: zoomable,
                        pan: zoomable,
                        reset: zoomable,
                    },
                },
                zoom: {
                    enabled: zoomable,
                    type: 'x',
                    autoScaleYaxis: true,
                    allowMouseWheelZoom: false,
                    pinch: false,
                },
                ...(sparkline ? { sparkline: { enabled: true } } : {}),
                ...(options.chart ?? {}),
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: { enabled: true, delay: 150 },
                    dynamicAnimation: { enabled: true, speed: 350 },
                    ...(options.chart?.animations ?? {}),
                },
                width: options.chart?.width ?? '100%',
                height: options.chart?.height ?? '100%',
            },
            grid: {
                show: !sparkline,
                borderColor: 'color-mix(in srgb, var(--mosaik-scheme-middlelight) 24%, transparent)',
                strokeDashArray: 0,
                position: 'back',
                xaxis: { lines: { show: true } },
                yaxis: { lines: { show: true } },
                ...(options.grid ?? {}),
                padding: { ...gridPadding, ...(options.grid?.padding ?? {}) },
            },
            stroke: options.stroke ?? ChartTheme.createStroke(options.display),
            fill: options.fill ?? ChartTheme.createFill(options.display),
            dataLabels: options.dataLabels ?? { enabled: false },
            legend: {
                fontSize: '12px',
                fontWeight: 500,
                labels: { colors: 'var(--mosaik-scheme-foreground)' },
                markers: { size: 8, strokeWidth: 0 },
                itemMargin: { horizontal: 8, vertical: 4 },
                ...(options.legend ?? {}),
            },
            markers: options.markers ?? {
                size: options.display === 'line' ? 3 : 0,
                strokeWidth: 0,
                hover: { sizeOffset: 3 },
            },
            states: options.states ?? {
                hover: { filter: { type: 'lighten' } },
                active: { filter: { type: 'none' } },
            },
            xAxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                crosshairs: {
                    stroke: {
                        color: 'var(--mosaik-scheme-middlelight)',
                        dashArray: 0,
                        width: 2,
                    },
                },
                ...(options.xAxis ?? {}),
                labels: {
                    offsetY: -12,
                    ...(options.xAxis?.labels ?? {}),
                    style: {
                        colors: 'var(--mosaik-scheme-middlelight)',
                        fontSize: '11px',
                        fontWeight: 500,
                        ...(options.xAxis?.labels?.style ?? {}),
                    },
                },
                tooltip: { enabled: false, ...(options.xAxis?.tooltip ?? {}) },
            },
            yAxis: Array.isArray(options.yAxis) ? options.yAxis.map((axis) => ChartTheme.createYAxis(axis)) : ChartTheme.createYAxis(options.yAxis ?? {}),
            plotOptions: {
                ...(options.plotOptions ?? {}),
                bar: {
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    columnWidth: '52%',
                    barHeight: '64%',
                    ...(options.plotOptions?.bar ?? {}),
                },
            },
            tooltip: options.tooltip ?? {
                followCursor: true,
                theme: 'dark',
                marker: { show: true },
                style: { fontSize: '12px' },
                x: { show: false },
            },
            isXAxisVisible: options.isXAxisVisible ?? (!sparkline && !circular),
            isYAxisVisible: options.isYAxisVisible ?? (!sparkline && !circular),
            isLegendVisible: options.isLegendVisible ?? (!sparkline && (circular || (options.series?.length ?? 0) > 1)),
        };
    }

    /**
     * Builds escaped tooltip markup using the active Mosaik scheme.
     *
     * @param title - Tooltip heading.
     * @param rows - Label and value pairs.
     * @returns Markup for an Apex custom tooltip.
     * @public
     */
    public static createTooltip(title: string, rows: readonly { label: string; value: string }[]): string {
        const content = rows
            .map(
                (row) =>
                    '<div style="display:flex;justify-content:space-between;gap:1.5rem;">' +
                    `<span style="color:var(--mosaik-scheme-middlelight);">${ChartTheme.escapeHtml(row.label)}</span>` +
                    `<strong style="color:var(--mosaik-scheme-foreground);font-weight:600;">${ChartTheme.escapeHtml(row.value)}</strong>` +
                    '</div>',
            )
            .join('');

        return (
            '<div style="min-width:11rem;padding:.625rem .75rem;' +
            'background:color-mix(in srgb,var(--mosaik-scheme-surface) 86%,var(--mosaik-scheme-foreground) 14%);' +
            'border:var(--mosaik-layout-thickness,1px) solid var(--mosaik-scheme-highlight);' +
            'border-radius:var(--mosaik-layout-radius);box-shadow:var(--mosaik-elevation-light);' +
            'font-family:inherit;font-size:.75rem;line-height:1.35;">' +
            `<div style="margin-bottom:.375rem;color:var(--mosaik-scheme-foreground);font-weight:600;">${ChartTheme.escapeHtml(title)}</div>` +
            `<div style="display:grid;gap:.25rem;">${content}</div>` +
            '</div>'
        );
    }

    private static createStroke(display: IChartOptions['display']): ApexOptions['stroke'] {
        if (display === 'pie' || display === 'donut' || display === 'polarArea') {
            return { show: true, colors: ['var(--mosaik-scheme-middlelight)'], width: 1.5 };
        }
        if (display === 'scatter' || display === 'bubble' || display === 'heatmap' || display === 'treemap') {
            return { width: 0 };
        }
        return {
            curve: display === 'line' ? 'straight' : 'smooth',
            lineCap: 'round',
            width: display === 'line' ? 3 : 2,
        };
    }

    private static createFill(display: IChartOptions['display']): ApexOptions['fill'] {
        if (display === 'area' || display === 'rangeArea' || display === 'bar' || display === 'rangeBar') {
            return {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.18,
                    opacityFrom: 0.68,
                    opacityTo: 0.14,
                    stops: [0, 100],
                },
            };
        }
        return { type: 'solid', opacity: 1 };
    }

    private static createYAxis(axis: ApexYAxis): ApexYAxis {
        return {
            ...axis,
            axisBorder: { show: false, ...(axis.axisBorder ?? {}) },
            axisTicks: { show: false, ...(axis.axisTicks ?? {}) },
            labels: {
                ...(axis.labels ?? {}),
                style: {
                    colors: 'var(--mosaik-scheme-middlelight)',
                    fontSize: '11px',
                    fontWeight: 500,
                    ...(axis.labels?.style ?? {}),
                },
            },
        };
    }

    private static escapeHtml(value: string): string {
        return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }

    // #endregion
}
