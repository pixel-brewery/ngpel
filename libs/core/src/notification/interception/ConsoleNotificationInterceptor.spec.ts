import { afterEach, describe, expect, it, vi } from 'vitest';
import { type Signal, signal } from '@angular/core';
import type { INotification } from '../models/INotification';
import { SHORT_DURATION } from '../models/SHORT_DURATION';
import { NotificationType } from '../models/NotificationType';
import { ConsoleNotificationInterceptor } from './ConsoleNotificationInterceptor';

/** Recording console surface: keeps the arguments of every call instead of silencing the real console. */
class RecordingLogger implements Pick<Console, 'error' | 'info' | 'log' | 'warn'> {
    public readonly errors: Array<ReadonlyArray<unknown>> = [];
    public readonly infos: Array<ReadonlyArray<unknown>> = [];
    public readonly logs: Array<ReadonlyArray<unknown>> = [];
    public readonly warns: Array<ReadonlyArray<unknown>> = [];

    public error(...data: Array<unknown>): void {
        this.errors.push(data);
    }

    public info(...data: Array<unknown>): void {
        this.infos.push(data);
    }

    public log(...data: Array<unknown>): void {
        this.logs.push(data);
    }

    public warn(...data: Array<unknown>): void {
        this.warns.push(data);
    }
}

/** Optional overrides for {@link fakeNotification}. */
interface IFakeNotificationOptions {
    readonly id?: string;
    readonly title?: string;
    readonly subTitle?: string;
    readonly body?: string;
    readonly detail?: string;
    readonly duration?: number;
    readonly timeStamp?: Date;
}

/** Builds a raised notification without going through `NotificationService`; every text becomes a read-only signal. */
function fakeNotification(type: NotificationType, options: IFakeNotificationOptions = {}): INotification {
    const toTextSignal = (value: string): Signal<string> => signal(value).asReadonly();

    return {
        id: options.id ?? 'notification-id',
        type,
        title: toTextSignal(options.title ?? 'Headline'),
        subTitle: toTextSignal(options.subTitle ?? ''),
        body: toTextSignal(options.body ?? 'The operation completed.'),
        detail: options.detail === undefined ? undefined : toTextSignal(options.detail),
        duration: options.duration ?? SHORT_DURATION,
        timeStamp: options.timeStamp ?? new Date('2026-09-02T10:00:00.000Z'),
    };
}

describe('ConsoleNotificationInterceptor', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it.each([
        [NotificationType.Info, 'infos'],
        [NotificationType.Warning, 'warns'],
        [NotificationType.Error, 'errors'],
        [NotificationType.Success, 'logs'],
        [NotificationType.None, 'logs'],
    ] as const)('writes a %s notification on the matching console level', (type, bucket) => {
        // Arrange
        const logger = new RecordingLogger();
        const interceptor = new ConsoleNotificationInterceptor();
        interceptor.configure({ logger });

        // Act
        interceptor.push(fakeNotification(type, { title: 'Delivery', body: 'It went through.' }));

        // Assert
        expect(logger[bucket]).toEqual([['Delivery\nIt went through.']]);
    });

    it('joins every part that carries text, skipping the ones that do not', () => {
        // Arrange
        const logger = new RecordingLogger();
        const interceptor = new ConsoleNotificationInterceptor();
        interceptor.configure({ logger });

        // Act
        interceptor.push(fakeNotification(NotificationType.Error, { title: 'Delivery failed.', subTitle: '', body: 'Try again later.', detail: 'trace-42' }));

        // Assert
        expect(logger.errors).toEqual([['Delivery failed.\nTry again later.\ntrace-42']]);
    });

    it('writes nothing while it is disabled', () => {
        // Arrange
        const logger = new RecordingLogger();
        const interceptor = new ConsoleNotificationInterceptor();
        interceptor.configure({ isDisabled: true, logger });

        // Act
        interceptor.push(fakeNotification(NotificationType.Error));

        // Assert
        expect(logger.errors).toEqual([]);
    });

    it('falls back to the global console while it is unconfigured', () => {
        // Arrange
        const consoleInfo = vi.spyOn(console, 'info').mockImplementation(() => undefined);
        const interceptor = new ConsoleNotificationInterceptor();

        // Act
        interceptor.push(fakeNotification(NotificationType.Info, { title: 'Headline', body: 'Body' }));

        // Assert
        expect(consoleInfo).toHaveBeenCalledWith('Headline\nBody');
    });
});
