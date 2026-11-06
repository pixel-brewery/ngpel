/**
 * The kind vocabulary of the notification composition root. Both kinds are single: one console sink
 * and one audio sink per composition, so a duplicated `with*` call is rejected instead of quietly
 * doubling every log line or playing a sound twice.
 *
 * @public
 */
export type NotificationFeatureKind = 'notification-audio-interceptor' | 'notification-console-interceptor';
