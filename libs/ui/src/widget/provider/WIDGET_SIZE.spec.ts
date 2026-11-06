// #region Imports

import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { WIDGET_SIZE } from './WIDGET_SIZE';

// #endregion

describe('WIDGET_SIZE', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('publishes the size a shell binds', () => {
        // Arrange
        const size = signal({ columnSpan: 2, rowSpan: 3 });
        TestBed.configureTestingModule({ providers: [{ provide: WIDGET_SIZE, useValue: size }] });

        // Act
        const result = TestBed.inject(WIDGET_SIZE);

        // Assert
        expect(result()).toEqual({ columnSpan: 2, rowSpan: 3 });
    });

    it('is absent when no shell publishes a size', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const result = TestBed.inject(WIDGET_SIZE, null, { optional: true });

        // Assert
        expect(result).toBeNull();
    });
});
