import { describe, expect, it } from 'vitest';
import { ApiResultError } from './ApiResultError';

describe('ApiResultError', () => {
    it('exposes the problem, the status and uses the detail as message', () => {
        // Arrange
        const problem = { title: 'Not Found', status: 404, detail: 'The user does not exist.', code: 'USER_NOT_FOUND' };

        // Act
        const error = new ApiResultError(problem, 404);

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('ApiResultError');
        expect(error.message).toBe('The user does not exist.');
        expect(error.problem).toBe(problem);
        expect(error.status).toBe(404);
    });

    it('falls back to the title when the problem carries no detail', () => {
        // Arrange
        const problem = { title: 'Forbidden', status: 403 };

        // Act
        const error = new ApiResultError(problem, 403);

        // Assert
        expect(error.message).toBe('Forbidden');
    });
});
