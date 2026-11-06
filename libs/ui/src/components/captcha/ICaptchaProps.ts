import type { ICaptchaChallenge } from './ICaptchaChallenge';

/**
 * Captcha component state.
 *
 * @public
 */
export type CaptchaState = 'idle' | 'verified' | 'invalid';

/**
 * Public captcha component state contract.
 *
 * @public
 */
export interface ICaptchaProps {
    /**
     * Current captcha challenge.
     *
     * @public
     * @readonly
     */
    readonly challenge: ICaptchaChallenge | null;

    /**
     * Current component state.
     *
     * @public
     * @readonly
     */
    readonly state: CaptchaState;

    /**
     * Indicates whether the captcha has been verified.
     *
     * @public
     * @readonly
     */
    readonly verified: boolean;

    /**
     * Indicates whether the last answer was invalid.
     *
     * @public
     * @readonly
     */
    readonly invalid: boolean;
}
