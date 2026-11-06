// #region Imports

import { IOperationIdFactory } from './interfaces/IOperationIdFactory';

// #endregion

/**
 * Generates operation IDs using the Web Crypto API with a {@link Math.random} fallback.
 *
 * @public
 */
export class CryptoOperationIdFactory implements IOperationIdFactory {
    // #region Methods

    /**
     * Creates a new unique identifier.
     *
     * @returns A UUID v4 string or a pseudo-random fallback.
     * @public
     */
    public create(): string {
        const cryptoReference: Crypto | undefined = globalThis.crypto;

        if (cryptoReference?.randomUUID) {
            return cryptoReference.randomUUID();
        }

        return `operation-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    // #endregion
}
