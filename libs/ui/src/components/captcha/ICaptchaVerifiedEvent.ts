import type { ICaptchaChallenge } from './ICaptchaChallenge';

/**
 * Payload emitted when captcha verification succeeds.
 *
 * @public
 */
export interface ICaptchaVerifiedEvent {
    /**
     * Selected answer value.
     *
     * @public
     * @readonly
     */
    readonly answer: number;

    /**
     * The challenge that was solved.
     *
     * @public
     * @readonly
     */
    readonly challenge: ICaptchaChallenge;
}
