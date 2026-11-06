import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PopupComponent } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContextMenuComponent } from './ContextMenuComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class PopupStub {
        public readonly opened = new angular.EventEmitter<void>();
        public readonly closed = new angular.EventEmitter<void>();
        public readonly invoke = vi.fn(async (method: string): Promise<void> => {
            if (method === 'close') {
                this.closed.emit();
            }
        });
        public readonly setInput = vi.fn();
    }

    return {
        PopupComponent: angular.Component({
            selector: 'mosaik-popup',
            template: '<ng-content />',
            inputs: [
                'trigger',
                'placement',
                'placements',
                'interactive',
                'flip',
                'shift',
                'trapFocus',
                'closeOnScroll',
                'hasBackdrop',
                'pressEscapeToClose',
                'clickOutsideToClose',
            ],
            outputs: ['opened', 'closed'],
        })(PopupStub),
    };
});

interface IPopupFixture {
    invoke: ReturnType<typeof vi.fn<(method: string, origin?: HTMLElement) => Promise<void>>>;
    readonly setInput: ReturnType<typeof vi.fn>;
}

function setUp(): { component: ContextMenuComponent<number>; popup: IPopupFixture; origin: HTMLElement } {
    const fixture = TestBed.createComponent(ContextMenuComponent<number>);
    fixture.detectChanges();
    const popup = fixture.debugElement.query(By.directive(PopupComponent)).componentInstance as IPopupFixture;
    Object.defineProperty(fixture.componentInstance, '_popup', { value: signal(popup) });
    const origin = document.createElement('div');
    document.body.append(origin);
    origin.dataset['ngpContextOrigin'] = '';

    return { component: fixture.componentInstance, popup, origin };
}

describe(ContextMenuComponent.name, () => {
    afterEach(() => {
        document.querySelectorAll('[data-ngp-context-origin]').forEach((origin) => origin.remove());
        TestBed.resetTestingModule();
    });

    it('anchors the popup on the origin with offsets from its bottom left corner', async () => {
        // Arrange
        const { component, popup, origin } = setUp();
        vi.spyOn(origin, 'getBoundingClientRect').mockReturnValue(new DOMRect(10, 40, 100, 30));

        // Act
        await component.open({ context: 0, origin, clientX: 34, clientY: 95 });

        // Assert
        expect(component.isOpen()).toBe(true);
        expect(popup.invoke).toHaveBeenNthCalledWith(1, 'attach', origin);
        expect(popup.setInput.mock.calls).toEqual([
            ['distance', 25],
            ['skidding', 24],
        ]);
    });

    it('discards an opening superseded while another item is still visible', async () => {
        // Arrange
        const { component, popup, origin } = setUp();
        await component.open({ context: 1, origin, clientX: 10, clientY: 10 });
        const latest = origin.cloneNode() as HTMLElement;
        document.body.append(latest);

        // Act
        await Promise.all([
            component.open({ context: 2, origin, clientX: 20, clientY: 20 }),
            component.open({ context: 3, origin: latest, clientX: 30, clientY: 30 }),
        ]);

        // Assert
        expect(popup.invoke.mock.calls).toEqual([['attach', origin], ['open'], ['close'], ['attach', latest], ['open']]);
    });

    it('does not open a queued menu after the caller closes it', async () => {
        // Arrange
        const { component, popup, origin } = setUp();
        const opening = component.open({ context: 1, origin, clientX: 10, clientY: 10 });

        // Act
        await component.close();
        await opening;

        // Assert
        expect(component.isOpen()).toBe(false);
        expect(popup.invoke).not.toHaveBeenCalled();
    });

    it('keeps the outer popup open when a submenu trigger activates', async () => {
        // Arrange
        const { component, popup, origin } = setUp();
        await component.open({ context: 1, origin, clientX: 10, clientY: 10 });
        const parent = Object.assign(document.createElement('mosaik-menu-item'), { menuMode: 'popover' });
        const event = new Event('activated');
        vi.spyOn(event, 'composedPath').mockReturnValue([parent]);

        // Act
        (component as unknown as { onItemActivated(event: Event): void }).onItemActivated(event);
        await Promise.resolve();

        // Assert
        expect(component.isOpen()).toBe(true);
        expect(popup.invoke).not.toHaveBeenCalledWith('close');
    });
});
