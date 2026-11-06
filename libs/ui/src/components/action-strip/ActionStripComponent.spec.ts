import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopupComponent } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ActionStripComponent } from './ActionStripComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class MenuStub {}
    class PopupStub {
        public readonly closed = new angular.EventEmitter<void>();
        public readonly invoke = vi.fn().mockResolvedValue(undefined);
        public readonly setInput = vi.fn();
    }

    return {
        MenuComponent: angular.Component({ selector: 'mosaik-menu', template: '<ng-content />' })(MenuStub),
        PopupComponent: angular.Component({
            selector: 'mosaik-popup',
            template: '<ng-content />',
            inputs: [
                'trigger',
                'placement',
                'placements',
                'distance',
                'skidding',
                'interactive',
                'flip',
                'shift',
                'trapFocus',
                'closeOnScroll',
                'hasBackdrop',
                'pressEscapeToClose',
                'clickOutsideToClose',
            ],
            outputs: ['closed'],
        })(PopupStub),
    };
});

interface IPopupHost extends HTMLElement {
    shiftBoundary: ReadonlyArray<Element> | null;
    shiftPadding: number;
}

interface IPopupStub {
    readonly invoke: ReturnType<typeof vi.fn>;
    readonly setInput: ReturnType<typeof vi.fn>;
}

function setUp(): {
    component: ActionStripComponent<number>;
    popup: IPopupStub;
    popupHost: IPopupHost;
    surface: HTMLElement;
} {
    const fixture = TestBed.createComponent(ActionStripComponent<number>);
    fixture.detectChanges();
    const popupElement = fixture.debugElement.query(By.directive(PopupComponent));
    const popup = popupElement.componentInstance as IPopupStub;
    const popupHost = Object.assign(popupElement.nativeElement as HTMLElement, { shiftBoundary: null, shiftPadding: 0 });
    const surface = popupHost.querySelector<HTMLElement>('[part="surface"]')!;
    Object.defineProperty(fixture.componentInstance, '_popup', { value: signal(popup) });
    Object.defineProperty(fixture.componentInstance, '_popupHost', { value: signal(new ElementRef(popupHost)) });
    Object.defineProperty(fixture.componentInstance, '_surface', { value: signal(new ElementRef(surface)) });
    return { component: fixture.componentInstance, popup, popupHost, surface };
}

describe(ActionStripComponent.name, () => {
    afterEach(() => TestBed.resetTestingModule());

    it('hosts declarative actions in a horizontal semantic menu', () => {
        // Arrange
        const fixture = TestBed.createComponent(ActionStripComponent);

        // Act
        fixture.detectChanges();

        // Assert
        const menu = (fixture.nativeElement as HTMLElement).querySelector('mosaik-menu');
        expect(menu?.getAttribute('role')).toBe('menu');
        expect(menu?.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('positions the strip inside its item and constrains it to every clipping ancestor', async () => {
        // Arrange
        const { component, popup, popupHost } = setUp();
        const origin = document.createElement('div');
        const boundaries = [document.createElement('section'), document.createElement('article')];
        vi.spyOn(origin, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 20, 100, 40));

        // Act
        await component.show({ boundaries, context: 7, origin });

        // Assert
        expect(popup.invoke.mock.calls).toEqual([['attach', origin], ['open']]);
        expect(popup.setInput.mock.calls).toEqual([
            ['distance', -36],
            ['skidding', -4],
        ]);
        expect(popupHost.shiftBoundary).toEqual(boundaries);
        expect(popupHost.shiftPadding).toBe(4);
    });

    it('reattaches the open strip and clears the previous item boundaries', async () => {
        // Arrange
        const { component, popup, popupHost } = setUp();
        const firstOrigin = document.createElement('div');
        const secondOrigin = document.createElement('div');
        await component.show({ boundaries: [document.createElement('section')], context: 1, origin: firstOrigin });

        // Act
        await component.show({ boundaries: [], context: 2, origin: secondOrigin });

        // Assert
        expect(popup.invoke.mock.calls).toEqual([['attach', firstOrigin], ['open'], ['attach', secondOrigin]]);
        expect(popupHost.shiftBoundary).toBeNull();
    });

    it('keeps the surface open when the pointer enters a submenu across a shadow root', () => {
        // Arrange
        const { component, surface } = setUp();
        const submenuOwner = document.createElement('mosaik-menu-item');
        const submenuItem = document.createElement('mosaik-menu-item');
        submenuOwner.attachShadow({ mode: 'open' }).append(submenuItem);
        surface.append(submenuOwner);
        const scheduleHide = vi.spyOn(component, 'scheduleHide');
        const handlers = component as unknown as { onSurfaceLeave(event: MouseEvent): void };

        // Act
        handlers.onSurfaceLeave(new MouseEvent('pointerleave', { relatedTarget: submenuItem }));

        // Assert
        expect(scheduleHide).not.toHaveBeenCalled();
    });

    it.each([
        { menuMode: 'popover', closeCalls: 0 },
        { menuMode: null, closeCalls: 1 },
    ])('closes $closeCalls times after a menu item with mode $menuMode activates', async ({ menuMode, closeCalls }) => {
        // Arrange
        const { component, popup, surface } = setUp();
        const item = document.createElement('mosaik-menu-item');
        if (menuMode !== null) {
            item.setAttribute('menu-mode', menuMode);
        }
        surface.append(item);
        await component.show({ boundaries: [], context: 1, origin: document.createElement('div') });

        // Act
        item.dispatchEvent(new Event('activated', { bubbles: true }));
        await Promise.resolve();

        // Assert
        expect(popup.invoke.mock.calls.filter(([method]) => method === 'close')).toHaveLength(closeCalls);
    });
});
