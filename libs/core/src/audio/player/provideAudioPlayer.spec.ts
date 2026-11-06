import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AudioPlayer } from './AudioPlayer';
import { provideAudioPlayer } from './provideAudioPlayer';

describe('provideAudioPlayer', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers the player for the composition root', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideAudioPlayer()] });

        // Act
        const player = TestBed.inject(AudioPlayer);

        // Assert
        expect(player).toBeInstanceOf(AudioPlayer);
    });

    it('leaves the player unavailable when it is not composed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [] });

        // Act
        const injectPlayer = (): AudioPlayer => TestBed.inject(AudioPlayer);

        // Assert
        expect(injectPlayer).toThrow();
    });
});
