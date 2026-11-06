// #region Imports

import { Component, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { afterEach, describe, expect, it } from 'vitest';
import type { IWidgetSize } from '../models/IWidgetSize';
import { WIDGET_SIZE } from '../provider/WIDGET_SIZE';
import { WidgetViewDirective } from './WidgetViewDirective';

// #endregion

@Component({
    imports: [WidgetViewDirective],
    template: '<div ngpWidgetView>content</div>',
})
class HostComponent {}

describe('WidgetViewDirective', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('reports the size the surrounding shell publishes', () => {
        // Arrange
        const directive = createDirective(signal<IWidgetSize>({ columnSpan: 2, rowSpan: 3 }));

        // Act
        const result = directive.size();

        // Assert
        expect(result).toEqual({ columnSpan: 2, rowSpan: 3 });
    });

    it('matches a template condition against the published size', () => {
        // Arrange
        const directive = createDirective(signal<IWidgetSize>({ columnSpan: 2, rowSpan: 3 }));

        // Act
        const result = directive.matches({ columns: { min: 3 } });

        // Assert
        expect(result).toBe(false);
    });

    it('renders unconstrained when no shell publishes a size', () => {
        // Arrange
        const directive = createDirective(undefined);

        // Act
        const result = directive.matches({ columns: { min: 6 } });

        // Assert
        expect(result).toBe(true);
        expect(directive.size().columnSpan).toBe(Number.MAX_SAFE_INTEGER);
    });
});

function createDirective(size: (() => IWidgetSize) | undefined): WidgetViewDirective {
    TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: size === undefined ? [] : [{ provide: WIDGET_SIZE, useValue: size }],
    });

    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    return fixture.debugElement.query(By.directive(WidgetViewDirective)).injector.get(WidgetViewDirective);
}
