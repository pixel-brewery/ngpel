import { TestBed } from '@angular/core/testing';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NotificationType } from '../models/NotificationType';
import { NotificationService } from '../services/NotificationService';
import { NOTIFICATION_INTERCEPTORS } from './NOTIFICATION_INTERCEPTORS';
import { provideNotification } from './provideNotification';
import { withAudioNotificationInterceptor } from './withAudioNotificationInterceptor';
import { withConsoleNotificationInterceptor } from './withConsoleNotificationInterceptor';

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

describe('provideNotification', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('registers the service without any sink when no feature is composed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideNotification()] });

        // Act
        const service = TestBed.inject(NotificationService);

        // Assert
        expect(service).toBeInstanceOf(NotificationService);
        expect(TestBed.inject(NOTIFICATION_INTERCEPTORS, null, { optional: true })).toBeNull();
    });

    it('composes the console and the audio sink into one pipeline', () => {
        // Arrange
        const logger = new RecordingLogger();
        TestBed.configureTestingModule({
            providers: [
                provideNotification(
                    withConsoleNotificationInterceptor({ logger }),
                    withAudioNotificationInterceptor({ sounds: { [NotificationType.Error]: '/audio/alert.mp3' } }),
                ),
            ],
        });
        const play = vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockResolvedValue(undefined);

        // Act
        TestBed.inject(NotificationService).showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(logger.errors).toEqual([['Delivery failed.\nTry again later.']]);
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, null);
    });

    it('rejects two sinks of the same kind', () => {
        // Arrange
        const first = withConsoleNotificationInterceptor();
        const second = withConsoleNotificationInterceptor();

        // Act
        const compose = (): unknown => provideNotification(first, second);

        // Assert
        expect(compose).toThrow(/non-multi kind 'notification-console-interceptor'/);
    });
});
