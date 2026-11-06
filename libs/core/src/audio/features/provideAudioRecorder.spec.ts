import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AudioRecorder } from '../recorder/AudioRecorder';
import { provideAudioRecorder } from './provideAudioRecorder';
import { withLocalTranscriber } from './withLocalTranscriber';
import { withVoiceTranscriber } from './withVoiceTranscriber';
import type { IVoiceTranscriber } from '../transcribers/IVoiceTranscriber';

class ApiVoiceTranscriber implements IVoiceTranscriber {
    public transcribe(): Promise<string> {
        return Promise.resolve('');
    }
}

describe('provideAudioRecorder', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers the recorder for the composition root', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [provideAudioRecorder()] });

        // Act
        const recorder = TestBed.inject(AudioRecorder);

        // Assert
        expect(recorder).toBeInstanceOf(AudioRecorder);
    });

    it('rejects two competing transcription strategies at composition time', () => {
        // Arrange
        const features = [withLocalTranscriber(), withVoiceTranscriber(ApiVoiceTranscriber)];

        // Act
        const compose = (): unknown => provideAudioRecorder(...features);

        // Assert
        expect(compose).toThrow(/non-multi kind 'transcriber'/);
    });
});
