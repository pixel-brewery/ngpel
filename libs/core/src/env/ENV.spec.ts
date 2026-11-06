import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ENV } from './ENV';

describe('ENV', () => {
    it('resolves the environment record provided at the composition root', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [{ provide: ENV, useValue: { API_URL: 'https://api.example.org' } }] });

        // Act
        const env = TestBed.inject(ENV);

        // Assert
        expect(env['API_URL']).toBe('https://api.example.org');
    });

    it('has no default value and therefore resolves to the provided fallback', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const env = TestBed.inject(ENV, null);

        // Assert
        expect(env).toBeNull();
    });
});
