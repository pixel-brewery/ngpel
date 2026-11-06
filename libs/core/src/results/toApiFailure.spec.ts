import { describe, expect, it } from 'vitest';
import { toApiFailure } from './toApiFailure';

describe('toApiFailure', () => {
    it('carries a problem detail body over including extension members', () => {
        // Arrange
        const body = { type: 'about:blank', title: 'Not Found', status: 404, detail: 'No such user.', code: 'USER_NOT_FOUND', traceId: 'abc' };

        // Act
        const failure = toApiFailure({ status: 404, statusText: 'Not Found', message: 'Http failure', body });

        // Assert
        expect(failure).toEqual({ success: false, status: 404, problem: body });
    });

    it('backfills a missing status and title from the response when the header declares a problem', () => {
        // Arrange
        const body = { detail: 'Quota exceeded.' };

        // Act
        const failure = toApiFailure({ status: 429, statusText: 'Too Many Requests', body, contentType: 'application/problem+json' });

        // Assert
        expect(failure.problem).toEqual({ title: 'Too Many Requests', status: 429, detail: 'Quota exceeded.' });
    });

    it('builds a problem from status text and message for non-problem bodies', () => {
        // Arrange
        const source = { status: 502, statusText: 'Bad Gateway', message: 'Http failure response', body: '<html></html>' };

        // Act
        const failure = toApiFailure(source);

        // Assert
        expect(failure).toEqual({ success: false, status: 502, problem: { title: 'Bad Gateway', status: 502, detail: 'Http failure response' } });
    });

    it('uses a neutral title and omits the detail when the transport provides neither', () => {
        // Arrange
        const source = { status: 0, statusText: '' };

        // Act
        const failure = toApiFailure(source);

        // Assert
        expect(failure.problem).toEqual({ title: 'Unknown Error', status: 0 });
    });
});
