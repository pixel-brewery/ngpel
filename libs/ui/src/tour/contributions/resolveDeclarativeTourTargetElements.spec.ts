// #region Imports

import { describe, expect, it } from 'vitest';
import { resolveDeclarativeTourTargetElements } from './resolveDeclarativeTourTargetElements';

// #endregion

describe('resolveDeclarativeTourTargetElements', () => {
    it('discovers detailed targets and keeps the first rendered element per key', () => {
        // arrange
        const host = document.createElement('section');
        const monthlyRevenue = createTarget('monthlyRevenue');
        const firstChart = createTarget('chart');
        const duplicateChart = createTarget('chart');
        const detailHandle = createTarget('detailAction detailOpenAction');
        const blank = createTarget('   ');
        host.append(monthlyRevenue, firstChart, duplicateChart, detailHandle, blank);

        // act
        const targets = resolveDeclarativeTourTargetElements(host, 'data-widget-tour-target');

        // assert
        expect(Array.from(targets.keys())).toEqual(['monthlyRevenue', 'chart', 'detailAction', 'detailOpenAction']);
        expect(targets.get('monthlyRevenue')).toBe(monthlyRevenue);
        expect(targets.get('chart')).toBe(firstChart);
        expect(targets.get('detailAction')).toBe(detailHandle);
        expect(targets.get('detailOpenAction')).toBe(detailHandle);
    });
});

function createTarget(value: string): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('data-widget-tour-target', value);

    return element;
}
