import { TestBed } from '@angular/core/testing';
import { DrawerService } from '@pixel-brewery/mosaik-elements-angular';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { RecurrenceEditorService } from './RecurrenceEditorService';
import { RECURRENCE_DEFAULT_VALUE } from './RecurrenceRule';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ DrawerService: class DrawerService {} }));
vi.mock('./RecurrenceEditorDrawerComponent', () => ({ RecurrenceEditorDrawerComponent: class RecurrenceEditorDrawerComponent {} }));

describe('RecurrenceEditorService', () => {
    it('returns a typed recurrence only for the apply action', async () => {
        // Arrange
        const value = { ...RECURRENCE_DEFAULT_VALUE, recurrenceFrequency: 'DAILY' as const, recurrenceTime: '07:15' };
        TestBed.configureTestingModule({
            providers: [{ provide: DrawerService, useValue: { show: () => ({ closed: of({ reason: 'positive', result: value }) }) } }],
        });

        // Act
        const result = await TestBed.inject(RecurrenceEditorService).open({ value });

        // Assert
        expect(result).toEqual(value);
    });

    it('leaves the caller value alone on dismissal', async () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [{ provide: DrawerService, useValue: { show: () => ({ closed: of({ reason: 'negative' }) }) } }] });

        // Act
        const result = await TestBed.inject(RecurrenceEditorService).open({ value: RECURRENCE_DEFAULT_VALUE });

        // Assert
        expect(result).toBeUndefined();
    });
});
