import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioPlayer } from './AudioPlayer';
import { play } from './play';
import { provideAudioPlayer } from './provideAudioPlayer';

describe('play', () => {
    let playSpy: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        playSpy = vi.fn().mockResolvedValue(undefined);
        TestBed.configureTestingModule({
            providers: [provideAudioPlayer(), { provide: AudioPlayer, useValue: { play: playSpy } }],
        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('plays one sound through the player of the current injector', async () => {
        // Arrange
        const source = { src: 'https://example.test/notification.mp3' };

        // Act
        await TestBed.runInInjectionContext(() => play(source, { volume: 0.4 }));

        // Assert
        expect(playSpy).toHaveBeenCalledWith(source, { volume: 0.4 });
    });

    it('fails outside an injection context instead of silently doing nothing', () => {
        // Arrange
        const source = { src: 'https://example.test/notification.mp3' };

        // Act
        const playOutsideInjectionContext = (): Promise<void> => play(source);

        // Assert
        expect(playOutsideInjectionContext).toThrow();
        expect(playSpy).not.toHaveBeenCalled();
    });
});
