/**
 * Supported mathematical operations for captcha challenges.
 *
 * @public
 */
export type CaptchaOperator = 'add' | 'subtract' | 'multiply';

/**
 * Default operators used when none specified.
 *
 * @public
 */
export const DEFAULT_CAPTCHA_OPERATORS: ReadonlyArray<CaptchaOperator> = ['add', 'subtract', 'multiply'];
