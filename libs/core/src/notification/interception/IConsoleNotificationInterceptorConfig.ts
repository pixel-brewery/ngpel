/**
 * Options of the {@link ConsoleNotificationInterceptor}.
 *
 * @public
 */
export interface IConsoleNotificationInterceptorConfig {
    // #region Properties

    /**
     * When `true` the interceptor stays registered but writes nothing, so a production build can
     * silence it without changing the composition.
     */
    readonly isDisabled?: boolean;

    /**
     * Diagnostic channel to write to; defaults to the global console.
     */
    readonly logger?: Pick<Console, 'error' | 'info' | 'log' | 'warn'>;

    // #endregion
}
