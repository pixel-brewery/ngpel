// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { IWidgetData } from '../models/IWidgetData';
import { WIDGET_DATA } from './WIDGET_DATA';

// #endregion

describe('WIDGET_DATA', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('hands the payload a shell bound to the widget view', () => {
        // Arrange
        const data: IWidgetData = { id: 'pipeline', stage: 'qualified' };
        TestBed.configureTestingModule({ providers: [{ provide: WIDGET_DATA, useValue: data }] });

        // Act
        const result = TestBed.inject(WIDGET_DATA);

        // Assert
        expect(result).toEqual(data);
    });

    it('is absent when no shell bound a payload', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const result = TestBed.inject(WIDGET_DATA, null, { optional: true });

        // Assert
        expect(result).toBeNull();
    });
});
