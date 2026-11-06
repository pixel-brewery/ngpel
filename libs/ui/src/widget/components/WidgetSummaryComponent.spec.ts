// #region Imports

import { type Signal, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { WidgetSummaryComponent } from './WidgetSummaryComponent';

// #endregion

/**
 * Replaces the signal inputs of a directive or component instance with signals the spec owns.
 *
 * The just-in-time compiler never sees an `input()` initialiser, so a template binding reports
 * `NG0303` and the value never reaches the directive. Substituting the field with a signal the spec
 * owns feeds exactly the reads the directive performs. Call it directly after
 * `TestBed.createComponent(...)` and before the first change detection. Because the class field is
 * replaced, an input `alias` or `transform` is no longer exercised — cover a transform by testing
 * its own module.
 */
function applySignalInputs<TTarget extends object>(
    target: TTarget,
    inputs: { readonly [TKey in keyof TTarget]?: TTarget[TKey] extends Signal<infer TValue> ? Signal<TValue> : never },
): void {
    for (const name of Object.keys(inputs) as Array<keyof TTarget & string>) {
        Object.defineProperty(target, name, { configurable: true, value: inputs[name] });
    }
}

describe('WidgetSummaryComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('renders the value, its unit, its label and an optional hint', () => {
        // Arrange
        const fixture = createFixture({ label: 'Open tickets', value: '42', unit: 'today', hint: 'Out of 70', compact: false });

        // Act
        fixture.detectChanges();

        // Assert
        const host = fixture.nativeElement as HTMLElement;
        expect(host.querySelector('.ngp-widget-summary__number')?.textContent?.trim()).toBe('42');
        expect(host.querySelector('.ngp-widget-summary__unit')?.textContent?.trim()).toBe('today');
        expect(host.querySelector('.ngp-widget-summary__label')?.textContent?.trim()).toBe('Open tickets');
        expect(host.querySelector('dd.ngp-widget-summary__hint')?.textContent?.trim()).toBe('Out of 70');
    });

    it('omits the unit and hint elements when those values are absent', () => {
        // Arrange
        const fixture = createFixture({ label: 'Open tickets', value: '42', unit: undefined, compact: false });

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).querySelector('.ngp-widget-summary__unit, .ngp-widget-summary__hint')).toBeNull();
    });

    it('marks the host compact so the smaller scale applies', () => {
        // Arrange
        const fixture = createFixture({ label: 'Open tickets', value: '42', unit: undefined, compact: true });

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).classList.contains('ngp-widget-summary--compact')).toBe(true);
    });

    it('leaves the host at the full scale by default', () => {
        // Arrange
        const fixture = createFixture({ label: 'Open tickets', value: '42', unit: undefined, compact: false });

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).classList.contains('ngp-widget-summary--compact')).toBe(false);
    });
});

function createFixture(inputs: {
    readonly label: string;
    readonly value: string;
    readonly unit: string | undefined;
    readonly hint?: string;
    readonly compact: boolean;
}): ComponentFixture<WidgetSummaryComponent> {
    TestBed.configureTestingModule({ imports: [WidgetSummaryComponent] });

    const fixture = TestBed.createComponent(WidgetSummaryComponent);
    applySignalInputs(fixture.componentInstance, {
        label: signal(inputs.label),
        value: signal(inputs.value),
        unit: signal(inputs.unit),
        hint: signal(inputs.hint),
        compact: signal(inputs.compact),
    });

    return fixture;
}
