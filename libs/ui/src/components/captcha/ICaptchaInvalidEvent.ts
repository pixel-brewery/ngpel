import type { ICaptchaChallenge } from './ICaptchaChallenge';

/**
 * Payload emitted when captcha verification fails.
 *
 * @public
 */
export interface ICaptchaInvalidEvent {
    /**
     * Selected (wrong) answer value.
     *
     * @public
     * @readonly
     */
    readonly answer: number;

    /**
     * The challenge that was attempted.
     *
     * @public
     * @readonly
     */
    readonly challenge: ICaptchaChallenge;
}
