import { createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AudioNotificationInterceptor } from '../interception/AudioNotificationInterceptor';
import { NotificationType } from '../models/NotificationType';
import { NotificationService } from '../services/NotificationService';
import { NotificationSoundPreviewService } from '../services/NotificationSoundPreviewService';
import { NotificationSoundSettingsService } from '../services/NotificationSoundSettingsService';
import { NotificationKinds } from './NotificationKinds';
import { provideNotification } from './provideNotification';
import { withAudioNotificationInterceptor } from './withAudioNotificationInterceptor';

const SOUNDS = { [NotificationType.Error]: '/audio/alert.mp3', [NotificationType.Info]: '/audio/info.mp3' };

function compose(): ReturnType<typeof vi.spyOn> {
    TestBed.configureTestingModule({ providers: [provideNotification(withAudioNotificationInterceptor({ sounds: SOUNDS }))] });

    return vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockResolvedValue(undefined);
}

describe('withAudioNotificationInterceptor', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('creates a feature of the audio kind', () => {
        // Arrange
        const feature = withAudioNotificationInterceptor({ sounds: SOUNDS });

        // Act
        const kind = feature.kind;

        // Assert
        expect(kind).toBe(NotificationKinds.AudioInterceptor);
        expect(feature.id).toBe('notification-audio-interceptor');
    });

    it('brings the player, the preferences and the preview service along', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideNotification(withAudioNotificationInterceptor({ sounds: SOUNDS }))] });

        // Act
        const registrations = [
            TestBed.inject(AudioPlayer),
            TestBed.inject(NotificationSoundSettingsService),
            TestBed.inject(NotificationSoundPreviewService),
            TestBed.inject(AudioNotificationInterceptor),
        ];

        // Assert
        expect(registrations.map((registration) => registration.constructor.name)).toEqual([
            'AudioPlayer',
            'NotificationSoundSettingsService',
            'NotificationSoundPreviewService',
            'AudioNotificationInterceptor',
        ]);
    });

    it('plays the sound of a raised notification', () => {
        // Arrange
        const play = compose();

        // Act
        TestBed.inject(NotificationService).showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, null);
    });

    it('defaults the gate to the user preferences, so a silenced severity stays silent', () => {
        // Arrange
        const play = compose();
        TestBed.inject(NotificationSoundSettingsService).setEnabled('error', false);

        // Act
        TestBed.inject(NotificationService).showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(play).not.toHaveBeenCalled();
    });

    it('lets an explicit gate win over the user preferences', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideNotification(withAudioNotificationInterceptor({ isEnabled: (): boolean => true, sounds: SOUNDS }))],
        });
        const play = vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockResolvedValue(undefined);
        TestBed.inject(NotificationSoundSettingsService).setEnabled('error', false);

        // Act
        TestBed.inject(NotificationService).showError('Delivery failed.', 'Try again later.');

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, null);
    });

    it('previews the same sound table the interceptor plays from, ignoring the preferences', async () => {
        // Arrange
        const play = compose();
        TestBed.inject(NotificationSoundSettingsService).setEnabled('error', false);

        // Act
        await TestBed.inject(NotificationSoundPreviewService).play(NotificationType.Error);

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, null);
    });

    it('disposes the interceptor with the injector it was composed into', () => {
        // Arrange
        TestBed.configureTestingModule({});
        const injector = createEnvironmentInjector([...withAudioNotificationInterceptor({ sounds: SOUNDS }).provide()], TestBed.inject(EnvironmentInjector));
        const interceptor = injector.get(AudioNotificationInterceptor);
        const dispose = vi.spyOn(interceptor, 'dispose');

        // Act
        injector.destroy();

        // Assert
        expect(dispose).toHaveBeenCalledTimes(1);
    });
});
