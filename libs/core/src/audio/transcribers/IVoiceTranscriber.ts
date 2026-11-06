// #region Imports

import type { ITranscriptionInput } from './ITranscriptionInput';

// #endregion

/**
 * Port for converting recorded voice audio to text. Implementations decide where recognition
 * happens — in the browser, on a device, or behind an API of the product's own choosing.
 *
 * @public
 */
export interface IVoiceTranscriber {
    // #region Methods

    /**
     * Transcribes recorded audio into text.
     *
     * @public
     * @param input The recorded audio and its metadata.
     * @returns A promise resolving to the transcribed text.
     */
    transcribe(input: ITranscriptionInput): Promise<string>;

    // #endregion
}
