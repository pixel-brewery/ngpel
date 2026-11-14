// #region Imports

import { Component, getDebugNode, ɵSIGNAL as SIGNAL, type InputSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreakpointService, SheetComponent, TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import { BehaviorSubject } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { RailComponent } from './RailComponent';
import { RailContentDirective } from './RailContentDirective';

// #endregion

// Mosaik's runtime bundle cannot be loaded outside a browser build, so the controls the rail
// composes are replaced by markup-only stands-in with the same selectors and inputs.
vi.mock('@pixel-brewery/mosaik-elements-angular', async () => {
    const angular = await vi.importActual<typeof import('@angular/core')>('@angular/core');

    class ToggleButtonStub {}
    angular.Component({
        selector: 'mosaik-toggle-button',
        template: '<ng-content />',
        inputs: ['appearance', 'ngpCommand', 'size', 'variant'],
    })(ToggleButtonStub);

    class ButtonStub {}
    angular.Component({ selector: 'mosaik-button', template: '', inputs: ['appearance', 'ngpCommand', 'size'] })(ButtonStub);

    class IconNameStub {}
    angular.Directive({ selector: '[iconName]', inputs: ['iconName'] })(IconNameStub);

    class TooltipStub {}
    angular.Directive({ selector: '[mosaikTooltip]', inputs: ['mosaikTooltip'] })(TooltipStub);

    class SheetStub {
        public readonly elementRef = angular.inject(angular.ElementRef<HTMLElement>);
        public readonly closed = new angular.EventEmitter<void>();
        public readonly closeAttempted = new angular.EventEmitter<void>();

        public invoke(action: 'open' | 'close'): void {
            if (action === 'close') {
                this.closed.emit();
            }
        }
    }
    angular.Component({
        selector: 'mosaik-sheet',
        template: '<ng-content />',
        inputs: ['width', 'height', 'snaps', 'dragMode', 'isModal', 'hasBackdrop', 'closeable', 'pressEscapeToClose', 'clickOutsideToClose'],
        outputs: ['closed', 'closeAttempted'],
    })(SheetStub);

    class SheetContentStub {}
    angular.Component({ selector: 'mosaik-sheet-content', template: '<ng-content />' })(SheetContentStub);

    return {
        BreakpointService: class BreakpointService {},
        ButtonComponent: ButtonStub,
        DialogService: class DialogService {},
        DRAWER_REF: new angular.InjectionToken('DRAWER_REF'),
        GlobalDomRef: class GlobalDomRef {},
        IconNameDirective: IconNameStub,
        provideGlobalDom: () => [],
        SheetComponent: SheetStub,
        SheetContentComponent: SheetContentStub,
        ToastService: class ToastService {},
        ToggleButtonComponent: ToggleButtonStub,
        TooltipDirective: TooltipStub,
        TranslateService: class TranslateService {},
    };
});

@Component({
    imports: [RailComponent, RailContentDirective],
    template: `
        <ngp-rail>
            <div ngpRailContent="ai" test-id="ai-content">AI</div>
            <div ngpRailContent="tour" test-id="tour-content">Tour</div>
        </ngp-rail>
    `,
})
class RailHostComponent {}

describe('RailComponent', () => {
    let rail: RailComponent;
    let host: HTMLElement;
    let detectChanges: () => void;
    let finishSheet: () => void;
    let smallViewport: BehaviorSubject<boolean>;

    beforeEach(() => {
        smallViewport = new BehaviorSubject(false);
        TestBed.configureTestingModule({
            imports: [RailHostComponent],
            providers: [
                { provide: TranslateService, useValue: { translate: (_key: string, fallback: string): string => fallback } },
                { provide: BreakpointService, useValue: { observe: () => smallViewport, isMatched: () => smallViewport.value } },
            ],
        });

        const fixture = TestBed.createComponent(RailHostComponent);
        fixture.detectChanges();
        detectChanges = () => {
            fixture.detectChanges();
            TestBed.tick();
        };
        host = fixture.nativeElement as HTMLElement;
        finishSheet = () => {
            const sheet = host.querySelector('mosaik-sheet')!;
            const component = getDebugNode(sheet)?.injector.get(SheetComponent) as unknown as { closed: { emit(): void } };
            component.closed.emit();
        };
        rail = fixture.debugElement.query(By.directive(RailComponent)).componentInstance as RailComponent;
    });

    it('starts in the action state, with no content selected', () => {
        // Arrange
        // Act
        const activeContentKey = rail.activeContentKey();

        // Assert
        expect(activeContentKey).toBeNull();
    });

    it('registers every independently declared content by its key', () => {
        // Arrange
        // Act
        const registered = ['ai', 'tour', 'settings'].map((key) => rail.hasContent(key));

        // Assert
        expect(registered).toEqual([true, true, false]);
    });

    it('shows exactly the activated content and hides the others', () => {
        // Arrange
        // Act
        rail.activateContent('ai');
        detectChanges();

        // Assert
        expect([
            rail.activeContentKey(),
            (host.querySelector('[test-id="ai-content"]') as HTMLElement).hidden,
            (host.querySelector('[test-id="tour-content"]') as HTMLElement).hidden,
        ]).toEqual(['ai', false, true]);
    });

    it('returns to the action state when the back command runs', () => {
        // Arrange
        rail.activateContent('ai');
        detectChanges();
        const { backCommand } = rail as unknown as { readonly backCommand: { execute(parameter: void): void } };

        // Act
        backCommand.execute(undefined);
        detectChanges();

        // Assert
        expect(rail.activeContentKey()).toBeNull();
    });

    it('uses a sheet in floating mode and clears the active content on close', () => {
        // Arrange
        setSignalInput(rail.floating, true);
        detectChanges();
        rail.activateContent('ai');
        detectChanges();
        const sheet = host.querySelector('mosaik-sheet');
        expect(sheet?.querySelector('[test-id="ai-content"]')).not.toBeNull();

        // Act
        finishSheet();
        detectChanges();

        // Assert
        expect(rail.activeContentKey()).toBeNull();
        expect(host.querySelector('mosaik-sheet')).toBeNull();
    });

    it('keeps existing rails docked on compact screens unless the layout is opted in', () => {
        // Arrange
        smallViewport.next(true);
        rail.activateContent('ai');

        // Act
        detectChanges();

        // Assert
        expect(rail.usesFloatingActions()).toBe(false);
        expect(host.querySelector('[test-id="rail-sheet"]')).toBeNull();
        expect(rail.activeContentKey()).toBe('ai');
    });

    it('closes adaptive rail content before the enclosing drawer can handle Escape', () => {
        // Arrange
        setSignalInput(rail.layout, 'adaptive-drawer');
        smallViewport.next(true);
        detectChanges();
        rail.activateContent('ai');
        detectChanges();
        const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });

        // Act
        window.dispatchEvent(event);
        detectChanges();

        // Assert
        expect(event.defaultPrevented).toBe(true);
        expect(rail.activeContentKey()).toBeNull();
    });

    it('closes adaptive sheet content as it returns to the docked layout', () => {
        // Arrange
        setSignalInput(rail.layout, 'adaptive-drawer');
        smallViewport.next(true);
        detectChanges();
        rail.activateContent('ai');
        detectChanges();
        expect(host.querySelector('[test-id="rail-sheet"] [test-id="ai-content"]')).not.toBeNull();

        // Act
        smallViewport.next(false);
        detectChanges();

        // Assert
        expect(rail.activeContentKey()).toBeNull();
        expect(rail.usesFloatingActions()).toBe(false);
    });
});

function setSignalInput<T>(input: InputSignal<T>, value: T): void {
    const node = (input as unknown as { [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: T): void } })[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
