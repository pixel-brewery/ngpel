/**
 * How long a notification stays relevant. Interceptors that render transient user interface use it
 * as their timeout, and {@link NotificationService} uses it as the window within which an identical
 * message is deduplicated instead of raised twice.
 *
 * @public
 */
export type NotificationDuration = 'short' | 'long';
