import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { IToastVisibility } from './IToastVisibility';
import { TOAST_VISIBILITY } from './TOAST_VISIBILITY';

describe('TOAST_VISIBILITY', () => {
    it('allows toasts by default without any provider', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const policy = TestBed.inject(TOAST_VISIBILITY);

        // Assert
        expect(policy.canShow()).toBe(true);
    });

    it('is replaced by a product policy', () => {
        // Arrange
        const silent: IToastVisibility = { canShow: () => false };
        TestBed.configureTestingModule({ providers: [{ provide: TOAST_VISIBILITY, useValue: silent }] });

        // Act
        const policy = TestBed.inject(TOAST_VISIBILITY);

        // Assert
        expect(policy).toBe(silent);
        expect(policy.canShow()).toBe(false);
    });
});
