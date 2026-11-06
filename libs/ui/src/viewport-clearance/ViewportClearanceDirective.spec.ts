// #region Imports

import { Component, signal, type InputSignal, type InputSignalWithTransform } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ViewportClearanceDirective } from './ViewportClearanceDirective';
import { ViewportClearanceService } from './ViewportClearanceService';

// #endregion

@Component({
    template: `
        @if (visible()) {
            <aside ngpViewportClearance></aside>
        }
    `,
    imports: [ViewportClearanceDirective],
})
class TestHostComponent {
    public readonly visible = signal(true);
}

describe('ViewportClearanceDirective', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('reserves the space between the host and the viewport edge while it is shown', async () => {
        // arrange
        const { directive, fixture, host } = render();
        mockBounds(host, { left: window.innerWidth - 420, top: 0, width: 420, height: 800 });

        // act
        fixture.detectChanges();
        await fixture.whenStable();

        // assert
        expect(TestBed.inject(ViewportClearanceService).right()).toBe(420);
        expect(directive.ngpViewportClearance()).toBe('right');
    });

    it('measures a dock from the bottom viewport edge', async () => {
        // arrange
        const { directive, fixture, host } = render();
        setInput(directive.ngpViewportClearance, 'bottom');
        mockBounds(host, { left: 300, top: window.innerHeight - 84, width: 800, height: 56 });

        // act
        fixture.detectChanges();
        await fixture.whenStable();

        // assert
        expect(TestBed.inject(ViewportClearanceService).bottom()).toBe(84);
        expect(TestBed.inject(ViewportClearanceService).right()).toBe(0);
    });

    it('frees the space while the host is closed and after it is removed', async () => {
        // arrange
        const { directive, fixture, host } = render();
        mockBounds(host, { left: window.innerWidth - 420, top: 0, width: 420, height: 800 });
        fixture.detectChanges();
        await fixture.whenStable();

        // act
        setInput(directive.ngpViewportClearanceDisabled, true);
        fixture.detectChanges();
        await fixture.whenStable();

        // assert
        expect(TestBed.inject(ViewportClearanceService).right()).toBe(0);

        setInput(directive.ngpViewportClearanceDisabled, false);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(TestBed.inject(ViewportClearanceService).right()).toBe(420);

        fixture.componentInstance.visible.set(false);
        fixture.detectChanges();
        expect(TestBed.inject(ViewportClearanceService).right()).toBe(0);
    });
});

function render() {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(ViewportClearanceDirective));
    return {
        directive: element.injector.get(ViewportClearanceDirective),
        fixture,
        host: element.nativeElement as HTMLElement,
    };
}

function mockBounds(host: HTMLElement, bounds: { left: number; top: number; width: number; height: number }): void {
    vi.spyOn(host, 'getBoundingClientRect').mockReturnValue({
        ...bounds,
        x: bounds.left,
        y: bounds.top,
        right: bounds.left + bounds.width,
        bottom: bounds.top + bounds.height,
        toJSON: () => bounds,
    } as DOMRect);
}

function setInput<TValue, TWrite>(input: InputSignal<TValue> | InputSignalWithTransform<TValue, TWrite>, value: TValue): void {
    const node = (input as unknown as { [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: unknown): void } })[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
