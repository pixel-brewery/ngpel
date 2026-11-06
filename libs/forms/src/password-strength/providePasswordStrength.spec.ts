import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import type { IPasswordStrengthConfig } from './IPasswordStrengthConfig';
import { PasswordStrengthService } from './PasswordStrengthService';
import { providePasswordStrength } from './providePasswordStrength';

const POLICY: IPasswordStrengthConfig = {
    minLength: 8,
    rules: [
        { regex: /[a-z]/, weight: 1 },
        { regex: /[A-Z]/, weight: 1 },
    ],
    thresholds: { veryWeak: 0, weak: 0.25, medium: 0.5, strong: 0.75, veryStrong: 1 },
};

describe('providePasswordStrength', () => {
    it('registers a service configured with the supplied policy', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [providePasswordStrength(POLICY)] });

        // Act
        const score = TestBed.inject(PasswordStrengthService).validate('Passphrase');

        // Assert
        expect(score).toBe('VeryStrong');
    });

    it('registers the service as a singleton', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [providePasswordStrength(POLICY)] });

        // Act
        const instances = [TestBed.inject(PasswordStrengthService), TestBed.inject(PasswordStrengthService)];

        // Assert
        expect(instances[0]).toBe(instances[1]);
    });

    it('leaves the service unavailable when the providers are not registered', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [] });

        // Act
        const resolve = (): PasswordStrengthService => TestBed.inject(PasswordStrengthService);

        // Assert
        expect(resolve).toThrow();
    });
});
