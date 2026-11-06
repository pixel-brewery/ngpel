import { describe, expect, it } from 'vitest';
import { isProblemDetail } from './isProblemDetail';

describe('isProblemDetail', () => {
    it('detects a body carrying title and status', () => {
        // Arrange
        const body = { title: 'Not Found', status: 404 };

        // Act
        const result = isProblemDetail(body);

        // Assert
        expect(result).toBe(true);
    });

    it('detects a body carrying title and detail without a status', () => {
        // Arrange
        const body = { title: 'Validation failed', detail: 'Name is required.' };

        // Act
        const result = isProblemDetail(body, 'application/json');

        // Assert
        expect(result).toBe(true);
    });

    it('detects a header-only problem response regardless of the body shape', () => {
        // Arrange
        const body = { message: 'anything' };

        // Act
        const result = isProblemDetail(body, 'Application/Problem+JSON; charset=utf-8');

        // Assert
        expect(result).toBe(true);
    });

    it('rejects primitives, arrays, null bodies and plain payloads', () => {
        // Arrange
        const candidates: Array<unknown> = ['text', 42, null, undefined, [{ title: 'x', status: 1 }], { id: 1 }, { title: 'x' }];

        // Act
        const results = candidates.map((candidate) => isProblemDetail(candidate, 'application/json'));

        // Assert
        expect(results.every((value) => value === false)).toBe(true);
    });

    it('rejects a null body even when the problem media type is declared', () => {
        // Arrange
        const body = null;

        // Act
        const result = isProblemDetail(body, 'application/problem+json');

        // Assert
        expect(result).toBe(false);
    });
});
