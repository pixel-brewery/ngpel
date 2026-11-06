import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BusyScope } from './BusyScope';
import { BusyScopeService } from './BusyScopeService';

describe('BusyScopeService', () => {
    it('is provided in root and creates named scopes', () => {
        // Arrange
        const service = TestBed.inject(BusyScopeService);

        // Act
        const scope = service.create(['loading'] as const, { name: 'orders' });

        // Assert
        expect(scope).toBeInstanceOf(BusyScope);
        expect(scope.scopeName).toBe('orders');
        expect(scope.stateNames()).toEqual(['loading']);
    });

    it('falls back to the default scope name when no options are given', () => {
        // Arrange
        const service = new BusyScopeService();

        // Act
        const scope = service.create(['loading'] as const);

        // Assert
        expect(scope.scopeName).toBe('scope');
    });
});
