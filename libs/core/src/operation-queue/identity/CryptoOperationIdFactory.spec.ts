import { afterEach, describe, expect, it, vi } from 'vitest';
import { CryptoOperationIdFactory } from './CryptoOperationIdFactory';

describe('CryptoOperationIdFactory', () => {
    // #region Fields

    let factory: CryptoOperationIdFactory;

    // #endregion

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // #region Methods

    it('should create an instance', () => {
        // arrange
        // act
        factory = new CryptoOperationIdFactory();

        // assert
        expect(factory).toBeInstanceOf(CryptoOperationIdFactory);
    });

    it('should return a UUID string when crypto.randomUUID is available', () => {
        // arrange
        const fakeUuid = '550e8400-e29b-41d4-a716-446655440000';
        vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(fakeUuid);
        factory = new CryptoOperationIdFactory();

        // act
        const result = factory.create();

        // assert
        expect(result).toBe(fakeUuid);
    });

    it('should return a fallback string when crypto.randomUUID is unavailable', () => {
        // arrange
        const cryptoRef = globalThis.crypto;
        Object.defineProperty(globalThis, 'crypto', { value: undefined, configurable: true });
        vi.spyOn(Date, 'now').mockReturnValue(1234567890);
        vi.spyOn(Math, 'random').mockReturnValue(0.123456789);
        factory = new CryptoOperationIdFactory();

        // act
        const result = factory.create();

        // assert
        expect(result).toMatch(/^operation-1234567890-.+$/);

        // cleanup
        Object.defineProperty(globalThis, 'crypto', { value: cryptoRef, configurable: true });
    });

    it('should return unique values on successive calls', () => {
        // arrange
        vi.spyOn(globalThis.crypto, 'randomUUID')
            .mockReturnValueOnce('550e8400-e29b-41d4-a716-446655440000')
            .mockReturnValueOnce('550e8400-e29b-41d4-a716-446655440001');
        factory = new CryptoOperationIdFactory();

        // act
        const first = factory.create();
        const second = factory.create();

        // assert
        expect(first).not.toBe(second);
    });

    // #endregion
});
