/**
 * Severity of a notification. `None` is the neutral grade a message without an explicit type
 * receives, so every interceptor has to answer for it; it is deliberately the empty string, which
 * keeps a missing severity falsy for consumers that only care whether one was stated.
 *
 * @public
 */
export const NotificationType = {
    /**
     * No severity was stated; the message is plain information.
     */
    None: '',

    /**
     * Informational message that needs no reaction.
     */
    Info: 'info',

    /**
     * The operation succeeded, but something deserves attention.
     */
    Warning: 'warning',

    /**
     * The operation failed.
     */
    Error: 'error',

    /**
     * The operation succeeded.
     */
    Success: 'success',
} as const satisfies Record<string, string>;

/**
 * Union of the {@link NotificationType} values.
 *
 * @public
 */
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
