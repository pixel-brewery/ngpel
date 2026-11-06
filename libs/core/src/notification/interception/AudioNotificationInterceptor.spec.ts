import { TestBed } from '@angular/core/testing';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { type Signal, signal } from '@angular/core';
import type { INotification } from '../models/INotification';
import { SHORT_DURATION } from '../models/SHORT_DURATION';
import { NotificationType } from '../models/NotificationType';
import { AudioNotificationInterceptor } from './AudioNotificationInterceptor';

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

function createInterceptor(): { interceptor: AudioNotificationInterceptor; play: ReturnType<typeof vi.spyOn> } {
    TestBed.configureTestingModule({ providers: [AudioPlayer, AudioNotificationInterceptor] });

    const play = vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockResolvedValue(undefined);

    return { interceptor: TestBed.inject(AudioNotificationInterceptor), play };
}

describe('AudioNotificationInterceptor', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('plays the sound mapped to the severity of the notification', () => {
        // Arrange
        const { interceptor, play } = createInterceptor();
        interceptor.configure({ options: { volume: 0.4 }, sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        interceptor.push(fakeNotification(NotificationType.Error));

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, { volume: 0.4 });
    });

    it('falls back to the default sound for a severity the table does not name', () => {
        // Arrange
        const { interceptor, play } = createInterceptor();
        interceptor.configure({ defaultSound: '/audio/notify.mp3', sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        interceptor.push(fakeNotification(NotificationType.Success));

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/notify.mp3' }, null);
    });

    it.each([NotificationType.Info, NotificationType.Success, NotificationType.Warning, NotificationType.Error])(
        'stays silent for a rejected %s notification',
        (type) => {
            // Arrange
            const { interceptor, play } = createInterceptor();
            interceptor.configure({ isEnabled: (): boolean => false, sounds: { [type]: `/audio/${type}.mp3` } });

            // Act
            interceptor.push(fakeNotification(type));

            // Assert
            expect(play).not.toHaveBeenCalled();
        },
    );

    it('stays silent while it is disabled', () => {
        // Arrange
        const { interceptor, play } = createInterceptor();
        interceptor.configure({ isDisabled: true, sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        interceptor.push(fakeNotification(NotificationType.Error));

        // Assert
        expect(play).not.toHaveBeenCalled();
    });

    it('stays silent while it is unconfigured', () => {
        // Arrange
        const { interceptor, play } = createInterceptor();

        // Act
        interceptor.push(fakeNotification(NotificationType.Error));

        // Assert
        expect(play).not.toHaveBeenCalled();
    });

    it('stays silent for a severity that has neither a sound nor a default', () => {
        // Arrange
        const { interceptor, play } = createInterceptor();
        interceptor.configure({ sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        interceptor.push(fakeNotification(NotificationType.Info));

        // Assert
        expect(play).not.toHaveBeenCalled();
    });

    it('reports rejected playback on the configured diagnostic channel', async () => {
        // Arrange
        const error = new DOMException('Playback was blocked.', 'NotAllowedError');
        const logger = new RecordingLogger();
        TestBed.configureTestingModule({ providers: [AudioPlayer, AudioNotificationInterceptor] });
        vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockRejectedValue(error);
        const interceptor = TestBed.inject(AudioNotificationInterceptor);
        interceptor.configure({ logger, sounds: { [NotificationType.Info]: '/audio/info.mp3' } });

        // Act
        interceptor.push(fakeNotification(NotificationType.Info));

        // Assert
        await vi.waitFor(() => expect(logger.errors).toEqual([['Notification sound playback failed.', error]]));
    });
});
