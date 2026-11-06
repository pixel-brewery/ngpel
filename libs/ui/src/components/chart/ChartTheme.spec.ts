import { describe, expect, it } from 'vitest';
import { ChartTheme } from './ChartTheme';

describe('ChartTheme toolbox interactions', () => {
    it('configures range zoom, pan and reset for the Mosaik toolbox without hijacking page scrolling', () => {
        const options = ChartTheme.apply({ display: 'area', series: [{ name: 'Orders', data: [1, 2, 3] }] });

        expect(options.chart?.toolbar?.show).toBe(false);
        expect(options.chart?.toolbar?.tools).toMatchObject({
            download: true,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
        });
        expect(options.chart?.zoom).toMatchObject({
            enabled: true,
            type: 'x',
            allowMouseWheelZoom: false,
            pinch: false,
        });
    });

    it('keeps non-axis charts exportable without offering unsupported range controls', () => {
        const options = ChartTheme.apply({ display: 'pie', series: [2, 3] });

        expect(options.chart?.toolbar?.show).toBe(false);
        expect(options.chart?.toolbar?.tools).toMatchObject({ download: true, zoom: false, pan: false });
        expect(options.chart?.zoom?.enabled).toBe(false);
    });

    it('keeps compact dashboard charts free of a toolbar', () => {
        const options = ChartTheme.apply({ display: 'area', series: [{ name: 'Orders', data: [1, 2, 3] }] }, 'sparkline');

        expect(options.chart?.toolbar?.show).toBe(false);
        expect(options.chart?.zoom?.enabled).toBe(false);
    });
});

describe('ChartTheme data and tooltips', () => {
    it('preserves series identity and caller settings when applying chart defaults', () => {
        // arrange
        const series = [{ name: 'Messages', data: [{ x: 'Monday', y: 4 }] }];
        const colors = ['#aabbcc'];
        const formatter = (value: number): string => String(value);

        // act
        const options = ChartTheme.apply({ display: 'heatmap', series, colors, yAxis: { labels: { formatter } } });

        // assert
        expect(options.series).toBe(series);
        expect(options.colors).toBe(colors);
        expect(options.yAxis).toMatchObject({ labels: { formatter } });
    });

    it('escapes the title, label and value before giving HTML to the chart', () => {
        // act
        const tooltip = ChartTheme.createTooltip('<Peak>', [{ label: 'A & B', value: '"42"' }]);

        // assert
        expect(tooltip).toContain('&lt;Peak&gt;');
        expect(tooltip).toContain('A &amp; B');
        expect(tooltip).toContain('&quot;42&quot;');
        expect(tooltip).not.toContain('<Peak>');
    });
});
