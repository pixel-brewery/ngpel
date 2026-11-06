import { describe, expect, it } from 'vitest';
import { LocalStorageUnavailableError } from './LocalStorageUnavailableError';

describe('LocalStorageUnavailableError', () => {
    it('describes the failed operation and exposes key and operation', () => {
        // Arrange
        const key = 'nav.open';

        // Act
        const error = new LocalStorageUnavailableError(key, 'write');

        // Assert
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe('LocalStorageUnavailableError');
        expect(error.key).toBe('nav.open');
        expect(error.operation).toBe('write');
        expect(error.message).toBe('Cannot write storage key "nav.open" because browser storage is unavailable in the current execution context.');
    });

    it('keeps the operation verb in the message for reads and removals', () => {
        // Arrange
        const operations = ['read', 'remove'] as const;

        // Act
        const messages = operations.map((operation) => new LocalStorageUnavailableError('k', operation).message);

        // Assert
        expect(messages[0]).toContain('Cannot read storage key "k"');
        expect(messages[1]).toContain('Cannot remove storage key "k"');
    });
});
