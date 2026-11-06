// #region Imports

import type { AudioInputDeviceErrorCode } from './AudioInputDeviceErrorCode';

// #endregion

/**
 * Typed browser audio-input failure with a stable recovery category. The original browser failure
 * is preserved as the error `cause`.
 *
 * @public
 */
export class AudioInputDeviceError extends Error {
    // #region Fields

    private readonly _code: AudioInputDeviceErrorCode;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AudioInputDeviceError` class.
     *
     * @public
     * @param code Stable recovery category.
     * @param message Human-readable technical description.
     * @param cause Original browser failure, when one exists.
     */
    public constructor(code: AudioInputDeviceErrorCode, message: string, cause?: unknown) {
        super(message, cause === undefined ? undefined : { cause });

        this.name = 'AudioInputDeviceError';
        this._code = code;
    }

    // #endregion

    // #region Properties

    /**
     * Stable recovery category used by consuming interfaces.
     *
     * @public
     * @readonly
     */
    public get code(): AudioInputDeviceErrorCode {
        return this._code;
    }

    // #endregion
}
