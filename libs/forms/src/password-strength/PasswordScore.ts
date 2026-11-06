/**
 * Discrete password strength levels, ordered from weakest to strongest.
 *
 * @public
 */
export const PasswordScore = {
    Blank: 0,
    VeryWeak: 1,
    Weak: 2,
    Medium: 3,
    Strong: 4,
    VeryStrong: 5,
} as const;

/**
 * Union of the strength level names: `'Blank' | 'VeryWeak' | 'Weak' | 'Medium' | 'Strong' | 'VeryStrong'`.
 *
 * @public
 */
export type PasswordScore = keyof typeof PasswordScore;
