import { describe, expect, it } from 'vitest';
import { AudioInputDeviceError } from './AudioInputDeviceError';

describe('AudioInputDeviceError', () => {
    it('carries a stable category and the original browser failure', () => {
        // Arrange
        const cause = new DOMException('Device in use', 'NotReadableError');

        // Act
        const error = new AudioInputDeviceError('device-busy', 'The microphone is used by another application.', cause);

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('AudioInputDeviceError');
        expect(error.code).toBe('device-busy');
        expect(error.cause).toBe(cause);
    });

    it('omits a cause that was never supplied instead of inventing one', () => {
        // Arrange

        // Act
        const error = new AudioInputDeviceError('unsupported', 'Browser audio-input APIs are unavailable.');

        // Assert
        expect(error.cause).toBeUndefined();
        expect('cause' in error).toBe(false);
    });
});
