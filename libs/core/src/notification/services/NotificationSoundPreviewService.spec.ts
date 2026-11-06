import { TestBed } from '@angular/core/testing';
import { AudioPlayer } from '@pixel-brewery/ngpel-core/audio';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NotificationType } from '../models/NotificationType';
import { NotificationSoundPreviewService } from './NotificationSoundPreviewService';

function createService(): { service: NotificationSoundPreviewService; play: ReturnType<typeof vi.spyOn> } {
    TestBed.configureTestingModule({ providers: [AudioPlayer, NotificationSoundPreviewService] });

    const play = vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockResolvedValue(undefined);

    return { service: TestBed.inject(NotificationSoundPreviewService), play };
}

describe('NotificationSoundPreviewService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('plays the sound mapped to the previewed severity', async () => {
        // Arrange
        const { service, play } = createService();
        service.configure({ options: { volume: 0.4 }, sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        await service.play(NotificationType.Error);

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/alert.mp3' }, { volume: 0.4 });
    });

    it('falls back to the default sound for a severity the table does not name', async () => {
        // Arrange
        const { service, play } = createService();
        service.configure({ defaultSound: '/audio/notify.mp3', sounds: {} });

        // Act
        await service.play(NotificationType.Info);

        // Assert
        expect(play).toHaveBeenCalledWith({ src: '/audio/notify.mp3' }, null);
    });

    it('stays silent while it is unconfigured', async () => {
        // Arrange
        const { service, play } = createService();

        // Act
        await service.play(NotificationType.Error);

        // Assert
        expect(play).not.toHaveBeenCalled();
    });

    it('reports a refused preview to the caller instead of swallowing it', async () => {
        // Arrange
        const error = new DOMException('Playback was blocked.', 'NotAllowedError');
        TestBed.configureTestingModule({ providers: [AudioPlayer, NotificationSoundPreviewService] });
        vi.spyOn(TestBed.inject(AudioPlayer), 'play').mockRejectedValue(error);
        const service = TestBed.inject(NotificationSoundPreviewService);
        service.configure({ sounds: { [NotificationType.Error]: '/audio/alert.mp3' } });

        // Act
        const preview = service.play(NotificationType.Error);

        // Assert
        await expect(preview).rejects.toBe(error);
    });
});
