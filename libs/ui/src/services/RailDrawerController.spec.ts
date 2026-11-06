// #region Imports

import { describe, expect, it } from 'vitest';
import { RailDrawerController } from './RailDrawerController';

// #endregion

describe('RailDrawerController', () => {
    it('expands the rail and restores the original drawer width', () => {
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1_440 });
        const drawer = document.createElement('div') as unknown as HTMLElement & { innerOffsetWidth(): number };
        const rail = document.createElement('mosaik-drawer-rail');
        drawer.append(rail);
        drawer.innerOffsetWidth = () => 720;
        const widths: Array<number | string | undefined> = [];
        const controller = new RailDrawerController({
            element: drawer,
            readWidth: () => '720px',
            setWidth: (width) => widths.push(width),
        });

        controller.open();
        controller.close();

        expect(controller.isOpen()).toBe(false);
        expect(widths).toEqual(['1080px', '720px']);
        expect(rail.style.getPropertyValue('--drawer-rail-width')).toBe('');
    });

    it('uses the responsive rail width without enlarging an already full-width drawer', () => {
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
        const drawer = document.createElement('div') as unknown as HTMLElement & { innerOffsetWidth(): number };
        const rail = document.createElement('mosaik-drawer-rail');
        drawer.append(rail);
        drawer.innerOffsetWidth = () => 390;
        const widths: Array<number | string | undefined> = [];
        const controller = new RailDrawerController({
            element: drawer,
            readWidth: () => '100%',
            setWidth: (width) => widths.push(width),
        });

        controller.open();

        expect(controller.isOpen()).toBe(true);
        expect(rail.style.getPropertyValue('--drawer-rail-width')).toBe('175px');
        expect(widths).toEqual([]);
    });
});
