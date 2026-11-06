// #region Imports

import { inject, Injectable, isSignal, signal, type Signal } from '@angular/core';
import { type IReactiveCacheChange, ReactiveCacheRegistrar } from '@pixel-brewery/ngpel-core/rx';
import type { Observable } from 'rxjs';
import type { INotificationInterceptor } from '../interception/INotificationInterceptor';
import type { INotification } from '../models/INotification';
import type { INotificationMessage } from '../models/INotificationMessage';
import type { INotificationOptions } from '../models/INotificationOptions';
import type { ISignalValidationIssueLike } from '../models/ISignalValidationIssueLike';
import { notificationDurationToMilliseconds } from '../models/notificationDurationToMilliseconds';
import type { NotificationText } from '../models/NotificationText';
import { NotificationType } from '../models/NotificationType';
import { SHORT_DURATION } from '../models/SHORT_DURATION';
import { NOTIFICATION_INTERCEPTORS } from '../provider/NOTIFICATION_INTERCEPTORS';

// #endregion

/**
 * The history behind {@link NotificationService}, ordered newest first.
 */
class NotificationCacheRegistrar extends ReactiveCacheRegistrar<string, INotification> {
    // #region Ctor

    /**
     * Constructs a new instance of the `NotificationCacheRegistrar` class.
     *
     * @public
     */
    public constructor() {
        super();
    }

    // #endregion

    // #region Methods

    /**
     * Returns every kept notification, newest first.
     *
     * @public
     */
    public all(): ReadonlyArray<INotification> {
        return Array.from(this.registrations.values()).sort((first, second) => second.timeStamp.getTime() - first.timeStamp.getTime());
    }

    // #endregion
}

/**
 * Raises notifications and fans them out to every composed {@link INotificationInterceptor}.
 *
 * Raising is idempotent within a notification's own lifetime: an identical message pushed again
 * while the first one is still alive returns that first notification instead of raising a second
 * one, which keeps a retry loop from flooding the user. Everything that is not `silent` is kept in
 * a history a product can render through {@link NotificationService.all} and
 * {@link NotificationService.changed}.
 *
 * Register it with `provideNotification()`.
 *
 * @public
 */
@Injectable()
export class NotificationService {
    // #region Fields

    private readonly _interceptors: ReadonlyArray<INotificationInterceptor>;
    private readonly _notifications: NotificationCacheRegistrar;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `NotificationService` class. The sinks are the ones
     * registered on `NOTIFICATION_INTERCEPTORS`, and none when no interceptor feature was composed.
     *
     * @public
     */
    public constructor() {
        this._interceptors = inject(NOTIFICATION_INTERCEPTORS, { optional: true }) ?? [];
        this._notifications = new NotificationCacheRegistrar();
    }

    // #endregion

    // #region Properties

    /**
     * Emits after every change of the notification history.
     *
     * @public
     * @readonly
     */
    public get changed(): Observable<IReactiveCacheChange<INotification>> {
        return this._notifications.changed;
    }

    // #endregion

    // #region Methods

    /**
     * Raises an informational notification.
     *
     * @public
     * @param title Headline of the message.
     * @param content Main text of the message.
     * @param options Lifetime, history and sub-title overrides.
     * @returns The raised notification, or the still-alive identical one.
     */
    public showInfo(title: NotificationText, content: NotificationText, options?: INotificationOptions): INotification {
        return this.push({ ...options, title, content, type: NotificationType.Info });
    }

    /**
     * Raises a warning notification.
     *
     * @public
     * @param title Headline of the message.
     * @param content Main text of the message.
     * @param options Lifetime, history and sub-title overrides.
     * @returns The raised notification, or the still-alive identical one.
     */
    public showWarning(title: NotificationText, content: NotificationText, options?: INotificationOptions): INotification {
        return this.push({ ...options, title, content, type: NotificationType.Warning });
    }

    /**
     * Raises an error notification.
     *
     * @public
     * @param title Headline of the message.
     * @param content Main text of the message.
     * @param options Lifetime, history and sub-title overrides.
     * @returns The raised notification, or the still-alive identical one.
     */
    public showError(title: NotificationText, content: NotificationText, options?: INotificationOptions): INotification {
        return this.push({ ...options, title, content, type: NotificationType.Error });
    }

    /**
     * Raises a success notification.
     *
     * @public
     * @param title Headline of the message.
     * @param content Main text of the message.
     * @param options Lifetime, history and sub-title overrides.
     * @returns The raised notification, or the still-alive identical one.
     */
    public showSuccess(title: NotificationText, content: NotificationText, options?: INotificationOptions): INotification {
        return this.push({ ...options, title, content, type: NotificationType.Success });
    }

    /**
     * Raises an error notification headed by the first user-facing message a set of Signal Forms
     * validation issues carries, so a submit failure names the actual problem instead of a generic
     * caption. Falls back to `fallbackTitle` when no issue exposes a readable message.
     *
     * @public
     * @param issues The validation issues of the rejected form.
     * @param fallbackTitle Headline used when no issue carries a readable message.
     * @param content Main text of the message.
     * @param options Lifetime, history and sub-title overrides.
     * @returns The raised notification, or the still-alive identical one.
     */
    public showSignalValidationError(
        issues: ReadonlyArray<ISignalValidationIssueLike>,
        fallbackTitle: NotificationText,
        content: NotificationText,
        options?: INotificationOptions,
    ): INotification {
        return this.showError(this.resolveSignalValidationErrorContent(issues) ?? fallbackTitle, content, options);
    }

    /**
     * Materializes a message and hands it to every composed interceptor.
     *
     * @public
     * @virtual
     * @param message The message to raise.
     * @returns The raised notification, or the still-alive identical one, which reached no
     * interceptor a second time.
     */
    public push(message: INotificationMessage): INotification {
        const notification = this.create(message);
        const duplicate = this._notifications
            .all()
            .find(
                (existing) =>
                    existing.type === notification.type &&
                    existing.title() === notification.title() &&
                    existing.body() === notification.body() &&
                    Date.now() - existing.timeStamp.getTime() < existing.duration,
            );

        if (duplicate) {
            return duplicate;
        }

        for (const interceptor of this._interceptors) {
            interceptor.push(notification);
        }

        if (!message.silent) {
            this._notifications.set(notification.id, notification);
        }

        return notification;
    }

    /**
     * Removes one notification from the history, or clears it entirely.
     *
     * @public
     * @param id Identifier of the notification to remove; omit it to clear the history.
     */
    public remove(id?: string): void {
        if (id) {
            this._notifications.remove(id);
        } else {
            this._notifications.clear();
        }
    }

    /**
     * Returns the kept notifications, newest first.
     *
     * @public
     */
    public all(): ReadonlyArray<INotification> {
        return this._notifications.all();
    }

    /**
     * Materializes a message into a notification.
     *
     * @param message The message to materialize.
     * @returns The identified, timestamped notification.
     */
    private create(message: INotificationMessage): INotification {
        return {
            id: this.createId(),
            type: message.type ?? NotificationType.None,
            title: this.toTextSignal(message.title),
            subTitle: this.toTextSignal(message.subTitle),
            body: this.toTextSignal(message.content),
            detail: message.detail ? this.toTextSignal(message.detail) : undefined,
            duration: message.duration ? notificationDurationToMilliseconds(message.duration) : SHORT_DURATION,
            timeStamp: new Date(Date.now()),
        };
    }

    /**
     * Creates the identifier of a notification, falling back to a time and entropy based id where
     * the browser exposes no random UUID, as in an insecure context.
     *
     * @returns The identifier.
     */
    private createId(): string {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return `Notification_${crypto.randomUUID()}`;
        }

        return `Notification_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    }

    /**
     * Finds the first readable message across a set of validation issues.
     *
     * @param issues The validation issues to walk.
     * @returns The first readable message, or `undefined` when there is none.
     */
    private resolveSignalValidationErrorContent(issues: ReadonlyArray<ISignalValidationIssueLike>): NotificationText | undefined {
        for (const issue of issues) {
            for (const error of issue.errors) {
                const content = this.resolveSignalValidationErrorMessage(error);

                if (content) {
                    return content;
                }
            }
        }

        return undefined;
    }

    /**
     * Reads the user-facing message out of one validation error.
     *
     * @param error The validation error to inspect.
     * @returns The message, or `undefined` when the error carries none.
     */
    private resolveSignalValidationErrorMessage(error: unknown): NotificationText | undefined {
        if (typeof error === 'string') {
            return error;
        }

        if (isSignal(error) && typeof error() === 'string') {
            return error as Signal<string>;
        }

        if (typeof error !== 'object' || error === null || !('message' in error)) {
            return undefined;
        }

        const message = (error as { readonly message?: unknown }).message;

        if (typeof message === 'string') {
            return message;
        }

        if (isSignal(message) && typeof message() === 'string') {
            return message as Signal<string>;
        }

        return undefined;
    }

    /**
     * Normalizes a text to a signal, so interceptors read every part the same way.
     *
     * @param value The text of the message.
     * @returns The text as a read-only signal, empty when the message stated none.
     */
    private toTextSignal(value?: NotificationText): Signal<string> {
        if (isSignal(value)) {
            return value;
        }

        return signal(value ?? '').asReadonly();
    }

    // #endregion
}
