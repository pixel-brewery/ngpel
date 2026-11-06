import { describe, expect, it } from 'vitest';
import { isEmailAddress } from './isEmailAddress';

describe('isEmailAddress', () => {
    it('accepts addresses with a qualified domain, sub-addressing and surrounding whitespace', () => {
        // Arrange
        const candidates = [
            'person@example.org',
            'person+invoices@example.org',
            '  person@sub.example.co.uk  ',
            'user@xn--80ak6aa92e.example',
            'person@café.de',
        ];

        // Act
        const results = candidates.map((candidate) => isEmailAddress(candidate));

        // Assert
        expect(results.every((value) => value)).toBe(true);
    });

    it('rejects unqualified domains, consecutive dots, leading hyphens and empty text', () => {
        // Arrange
        const candidates = [
            'person@localhost',
            'info@example...',
            'person..invoices@example.org',
            'person@example..org',
            'person@-example.org',
            '',
            'no-at-sign',
        ];

        // Act
        const results = candidates.map((candidate) => isEmailAddress(candidate));

        // Assert
        expect(results.every((value) => value === false)).toBe(true);
    });
});
