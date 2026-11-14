// #region Imports

import { afterEach, describe, expect, it } from 'vitest';
import { RailDrawerController } from './RailDrawerController';

// #endregion

interface IBounds {
    readonly top: number;
    readonly bottom: number;
    readonly left?: number;
    readonly right?: number;
}

interface IFloatingDrawer {
    readonly content: HTMLElement;
    readonly controller: RailDrawerController;
    readonly layer: HTMLElement;
    readonly rail: HTMLElement;
    readonly widths: Array<number | string | undefined>;
}

/** Drawer body of 384 x 800 px whose footer takes the last 60 px. */
const DRAWER_BOTTOM = 800;
const CONTENT_BOUNDS: IBounds = { top: 56, bottom: 734 };

function place<T extends HTMLElement>(element: T, bounds: IBounds): T {
    const left = bounds.left ?? 0;
    const right = bounds.right ?? 384;
    element.getBoundingClientRect = (): DOMRect =>
        ({
            top: bounds.top,
            bottom: bounds.bottom,
            left,
            right,
            width: right - left,
            height: bounds.bottom - bounds.top,
        }) as DOMRect;

    return element;
}

function createFloatingDrawer(): IFloatingDrawer {
    const drawer = document.createElement('div') as unknown as HTMLElement & { innerOffsetWidth(): number };
    const content = place(document.createElement('mosaik-drawer-content'), CONTENT_BOUNDS);
    const rail = place(document.createElement('mosaik-drawer-rail'), { top: 0, bottom: DRAWER_BOTTOM, left: 384 });
    const layer = place(document.createElement('div'), { top: 680, bottom: 724, left: 250, right: 366 });
    content.style.marginBottom = '6px';
    drawer.append(content, rail);
    drawer.innerOffsetWidth = () => 384;
    document.body.append(drawer);
    const widths: Array<number | string | undefined> = [];

    return {
        content,
        controller: new RailDrawerController({
            element: drawer,
            readWidth: () => '100%',
            setWidth: (width) => widths.push(width),
        }),
        layer,
        rail,
        widths,
    };
}

/** Lets the mutation observer report and the scheduled arrangement frame run. */
async function nextArrangement(): Promise<void> {
    await Promise.resolve();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

describe('RailDrawerController', () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

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

    it('gives the rail column back while floating and never expands the drawer', () => {
        const { controller, layer, rail, widths } = createFloatingDrawer();

        controller.float(layer);
        controller.open();

        expect(controller.isOpen()).toBe(false);
        expect(rail.style.getPropertyValue('--drawer-rail-width')).toBe('0px');
        expect(widths).toEqual([]);

        controller.dock();
        controller.open();

        expect(controller.isOpen()).toBe(true);
        expect(rail.style.getPropertyValue('--drawer-rail-width')).not.toBe('0px');
        expect(rail.style.getPropertyValue('overflow')).toBe('');
    });

    it('anchors the floating layer above the drawer footer and releases it when docking', () => {
        const { controller, layer } = createFloatingDrawer();

        controller.float(layer);

        expect(layer.style.getPropertyValue('--rail-floating-offset')).toBe('60px');

        controller.dock();

        expect(layer.style.getPropertyValue('--rail-floating-offset')).toBe('');
    });

    it('restores the drawer rail style set by the host when leaving floating mode', () => {
        // Arrange
        const { controller, layer, rail } = createFloatingDrawer();
        rail.style.setProperty('--drawer-rail-padding-right', '8px', 'important');
        controller.float(layer);

        // Act
        controller.dock();

        // Assert
        expect(rail.style.getPropertyValue('--drawer-rail-padding-right')).toBe('8px');
        expect(rail.style.getPropertyPriority('--drawer-rail-padding-right')).toBe('important');
    });

    it('reserves scroll room in the outermost scroll container beneath the floating layer', () => {
        const { content, controller, layer } = createFloatingDrawer();
        const wrapper = place(document.createElement('div'), CONTENT_BOUNDS);
        const tabs = place(document.createElement('div'), { top: 56, bottom: 104 });
        const pane = place(document.createElement('form'), { top: 104, bottom: 734 });
        const nestedList = place(document.createElement('div'), { top: 600, bottom: 720 });
        wrapper.style.overflow = 'hidden';
        tabs.style.overflowY = 'auto';
        pane.style.overflowY = 'auto';
        pane.style.paddingBottom = '8px';
        nestedList.style.overflowY = 'auto';
        pane.append(nestedList);
        wrapper.append(tabs, pane);
        content.append(wrapper);

        controller.float(layer);

        // 54 px from the layer's upper edge to the end of the pane plus the 16 px the layer
        // keeps from the footer.
        expect(pane.style.paddingBottom).toBe('70px');
        expect(tabs.style.paddingBottom).toBe('');
        expect(nestedList.style.paddingBottom).toBe('');
        expect(content.style.paddingBottom).toBe('');

        controller.dock();

        expect(pane.style.paddingBottom).toBe('8px');
    });

    it('reserves the room in the drawer content when that is what scrolls', () => {
        const { content, controller, layer } = createFloatingDrawer();
        const form = place(document.createElement('div'), { top: 56, bottom: 1_400 });
        const nestedList = place(document.createElement('div'), { top: 600, bottom: 720 });
        nestedList.style.overflowY = 'auto';
        form.append(nestedList);
        content.append(form);
        Object.defineProperties(content, {
            clientHeight: { configurable: true, value: 678 },
            scrollHeight: { configurable: true, value: 1_344 },
        });

        controller.float(layer);

        expect(content.style.paddingBottom).toBe('70px');
        expect(nestedList.style.paddingBottom).toBe('');
    });

    it('moves the reserved room to the scroll container that replaces a loading skeleton', async () => {
        const { content, controller, layer } = createFloatingDrawer();
        const skeleton = place(document.createElement('div'), CONTENT_BOUNDS);
        content.append(skeleton);

        controller.float(layer);

        expect(content.style.paddingBottom).toBe('70px');

        const pane = place(document.createElement('form'), CONTENT_BOUNDS);
        pane.style.overflowY = 'auto';
        skeleton.replaceWith(pane);
        await nextArrangement();

        expect(content.style.paddingBottom).toBe('');
        expect(pane.style.paddingBottom).toBe('70px');
    });

    it('reserves nothing while the floating layer holds no action', () => {
        const { content, controller, layer } = createFloatingDrawer();
        place(layer, { top: 724, bottom: 724, left: 366, right: 366 });

        controller.float(layer);

        expect(content.style.paddingBottom).toBe('');
    });
});
