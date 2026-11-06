import { describe, expect, it } from 'vitest';
import type { IPasswordStrengthConfig } from './IPasswordStrengthConfig';
import { PasswordStrengthService } from './PasswordStrengthService';

const POLICY: IPasswordStrengthConfig = {
    minLength: 8,
    rules: [
        { regex: /[a-z]/, weight: 1 },
        { regex: /[A-Z]/, weight: 1 },
        { regex: /\d/, weight: 1 },
        { regex: /[^\w\s]/, weight: 1 },
    ],
    thresholds: { veryWeak: 0, weak: 0.25, medium: 0.5, strong: 0.75, veryStrong: 1 },
};

describe('PasswordStrengthService', () => {
    it('scores a password matching every rule as VeryStrong', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const score = service.validate('Str0ng!Passphrase');

        // Assert
        expect(score).toBe('VeryStrong');
    });

    it('scores a password matching three of four rules as Strong', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const score = service.validate('Str0ngPassphrase');

        // Assert
        expect(score).toBe('Strong');
    });

    it('scores a password matching half of the rules as Medium', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const score = service.validate('Strongpassphrase');

        // Assert
        expect(score).toBe('Medium');
    });

    it('scores a password matching a single rule as Weak', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const score = service.validate('passphrase');

        // Assert
        expect(score).toBe('Weak');
    });

    it('scores blank input as Blank', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const scores = [service.validate(''), service.validate(null), service.validate(undefined)];

        // Assert
        expect(scores).toEqual(['Blank', 'Blank', 'Blank']);
    });

    it('scores input below the minimum length as VeryWeak regardless of the rules', () => {
        // Arrange
        const service = new PasswordStrengthService(POLICY);

        // Act
        const score = service.validate('Str0ng!');

        // Assert
        expect(score).toBe('VeryWeak');
    });

    it('scores a password matching no rule as VeryWeak', () => {
        // Arrange
        const service = new PasswordStrengthService({ ...POLICY, minLength: undefined });

        // Act
        const score = service.validate('        ');

        // Assert
        expect(score).toBe('VeryWeak');
    });

    it('falls back to VeryWeak when the policy defines no weighted rule', () => {
        // Arrange
        const service = new PasswordStrengthService({ ...POLICY, rules: [] });

        // Act
        const score = service.validate('Str0ng!Passphrase');

        // Assert
        expect(score).toBe('VeryWeak');
    });
});
