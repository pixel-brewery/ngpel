// #region Imports

import { Component, type Signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PointerIdleDirective } from './PointerIdleDirective';

// #endregion

@Component({
    template: `
        <section ngpPointerIdle>
            <div [attr.data-ngp-part]="'stage'">
                <button type="button" [attr.data-ngp-part]="'stage-action'">Stage</button>
            </div>
            <footer part="hold">
                <button type="button" [attr.data-ngp-part]="'hold-action'">Hold</button>
            </footer>
        </section>
    `,
    imports: [PointerIdleDirective],
})
class TestHostComponent {}

interface IPointerIdleHarness {
    readonly directive: PointerIdleDirective;
    readonly fixture: ComponentFixture<TestHostComponent>;
    query(testId: string): HTMLElement;
}

describe('PointerIdleDirective', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        Reflect.deleteProperty(document.defaultView as Window, 'matchMedia');
        vi.useRealTimers();
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('reports the host idle after the inactivity timeout', () => {
        // arrange
        const harness = createHarness();

        // act
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(true);
    });

    it('returns to active on pointer movement and restarts the inactivity period', () => {
        // arrange
        const harness = createHarness();
        vi.advanceTimersByTime(3000);

        // act
        harness.query('stage').dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));

        // assert
        expect(harness.directive.isIdle()).toBe(false);
        vi.advanceTimersByTime(2999);
        expect(harness.directive.isIdle()).toBe(false);
        vi.advanceTimersByTime(1);
        expect(harness.directive.isIdle()).toBe(true);
    });

    it('returns to active on keyboard input', () => {
        // arrange
        const harness = createHarness();
        vi.advanceTimersByTime(3000);

        // act
        harness.query('stage-action').dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }));

        // assert
        expect(harness.directive.isIdle()).toBe(false);
    });

    it('reports the host active immediately and permanently while disabled', () => {
        // arrange
        const harness = createHarness();
        vi.advanceTimersByTime(3000);

        // act
        setSignalInput(harness.directive.disabled, true);
        harness.fixture.detectChanges();

        // assert
        expect(harness.directive.isIdle()).toBe(false);
        vi.advanceTimersByTime(60_000);
        expect(harness.directive.isIdle()).toBe(false);
    });

    it('starts a fresh inactivity period when detection is enabled again', () => {
        // arrange
        const harness = createHarness();
        setSignalInput(harness.directive.disabled, true);
        harness.fixture.detectChanges();

        // act
        setSignalInput(harness.directive.disabled, false);
        harness.fixture.detectChanges();
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(true);
    });

    it('stays active while the pointer rests on a hold region', () => {
        // arrange
        const harness = createHarness();
        harness.query('hold-action').dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));

        // act
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(false);
    });

    it('becomes idle once the pointer has left the hold region for the inactivity timeout', () => {
        // arrange
        const harness = createHarness();
        harness.query('hold-action').dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        vi.advanceTimersByTime(3000);

        // act
        harness.query('stage').dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(true);
    });

    it('stays active while a hold region contains visible keyboard focus', () => {
        // arrange
        const harness = createHarness();
        const holdAction = harness.query('hold-action');
        holdAction.focus();
        vi.spyOn(holdAction, 'matches').mockImplementation((selector: string) => selector === ':focus-visible');

        // act
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(false);
    });

    it('does not treat pointer focus inside a hold region as a reason to stay active', () => {
        // arrange
        const harness = createHarness();
        const holdAction = harness.query('hold-action');
        holdAction.focus();
        vi.spyOn(holdAction, 'matches').mockImplementation(
            (selector: string) => selector !== ':focus-visible' && Element.prototype.matches.call(holdAction, selector),
        );

        // act
        vi.advanceTimersByTime(3000);

        // assert
        expect(harness.directive.isIdle()).toBe(true);
    });

    it('never reports idle on devices without hover', () => {
        // arrange
        Object.defineProperty(document.defaultView as Window, 'matchMedia', {
            configurable: true,
            value: (query: string) => ({ matches: query === '(hover: none)' }),
        });
        const harness = createHarness();

        // act
        vi.advanceTimersByTime(60_000);

        // assert
        expect(harness.directive.isIdle()).toBe(false);
        expect(vi.getTimerCount()).toBe(0);
    });

    it('releases its timer and listeners when destroyed', () => {
        // arrange
        const harness = createHarness();
        const stage = harness.query('stage');

        // act
        harness.fixture.destroy();

        // assert
        expect(vi.getTimerCount()).toBe(0);
        stage.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
        expect(vi.getTimerCount()).toBe(0);
    });
});

function createHarness(): IPointerIdleHarness {
    const fixture = TestBed.createComponent(TestHostComponent);
    const directive = fixture.debugElement.query(By.directive(PointerIdleDirective)).injector.get(PointerIdleDirective);
    setSignalInput(directive.hold, '[part=hold]');
    fixture.detectChanges();

    return {
        directive,
        fixture,
        query: (part: string) => fixture.nativeElement.querySelector(`[data-ngp-part="${part}"]`) as HTMLElement,
    };
}

function setSignalInput<TValue>(inputSignal: Signal<TValue>, value: TValue): void {
    const node = (
        inputSignal as Signal<TValue> & {
            [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: TValue): void };
        }
    )[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
