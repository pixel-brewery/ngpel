import { describe, expect, it } from 'vitest';
import { AudioRecorderError } from './AudioRecorderError';

describe('AudioRecorderError', () => {
    it('carries a stable category and the original browser failure', () => {
        // Arrange
        const cause = new DOMException('Permission denied', 'NotAllowedError');

        // Act
        const error = new AudioRecorderError('permission-denied', 'The microphone was blocked.', cause);

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('AudioRecorderError');
        expect(error.code).toBe('permission-denied');
        expect(error.message).toBe('The microphone was blocked.');
        expect(error.cause).toBe(cause);
    });

    it('omits a cause that was never supplied instead of inventing one', () => {
        // Arrange

        // Act
        const error = new AudioRecorderError('unsupported', 'This browser cannot record audio.');

        // Assert
        expect(error.cause).toBeUndefined();
        expect('cause' in error).toBe(false);
    });
});
