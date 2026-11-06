import { describe, expect, it } from 'vitest';
import { toApiSuccess } from './toApiSuccess';

describe('toApiSuccess', () => {
    it('wraps data and status into a success envelope', () => {
        // Arrange
        const data = { id: 1 };

        // Act
        const result = toApiSuccess(data, 201);

        // Assert
        expect(result).toEqual({ success: true, status: 201, data });
    });

    it('accepts nullable data such as an empty response body', () => {
        // Arrange
        const data = null;

        // Act
        const result = toApiSuccess(data, 204);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data).toBeNull();
    });
});
