import type { CaptchaOperator } from './CaptchaOperator';

/**
 * Represents a generated captcha challenge.
 *
 * @public
 */
export interface ICaptchaChallenge {
    /**
     * Question text displayed to the user.
     *
     * @public
     * @readonly
     */
    readonly question: string;

    /**
     * Correct answer value.
     *
     * @public
     * @readonly
     */
    readonly answer: number;

    /**
     * Answer options displayed as buttons.
     *
     * @public
     * @readonly
     */
    readonly options: ReadonlyArray<number>;

    /**
     * Operator used in this challenge.
     *
     * @public
     * @readonly
     */
    readonly operator: CaptchaOperator;
}
