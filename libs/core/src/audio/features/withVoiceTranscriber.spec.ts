import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ITranscriptionInput } from '../transcribers/ITranscriptionInput';
import type { IVoiceTranscriber } from '../transcribers/IVoiceTranscriber';
import { VOICE_TRANSCRIBER } from '../transcribers/VOICE_TRANSCRIBER';
import { AudioFeatureKinds } from './AudioFeatureKind';
import { provideAudioRecorder } from './provideAudioRecorder';
import { withLocalTranscriber } from './withLocalTranscriber';
import { withVoiceTranscriber } from './withVoiceTranscriber';

class ApiVoiceTranscriber implements IVoiceTranscriber {
    public transcribe(input: ITranscriptionInput): Promise<string> {
        return Promise.resolve(`transcript of ${input.blob.size} bytes`);
    }
}

describe('withVoiceTranscriber', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('binds the product-owned strategy to the transcriber port', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioRecorder(withVoiceTranscriber(ApiVoiceTranscriber))],
        });

        // Act
        const transcriber = TestBed.inject(VOICE_TRANSCRIBER);

        // Assert
        expect(transcriber).toBeInstanceOf(ApiVoiceTranscriber);
        expect(withVoiceTranscriber(ApiVoiceTranscriber).kind).toBe(AudioFeatureKinds.Transcriber);
    });

    it('conflicts with the local transcriber instead of silently overriding it', () => {
        // Arrange
        const features = [withVoiceTranscriber(ApiVoiceTranscriber), withLocalTranscriber()];

        // Act
        const compose = (): unknown => provideAudioRecorder(...features);

        // Assert
        expect(compose).toThrow(/non-multi kind 'transcriber'/);
    });
});
