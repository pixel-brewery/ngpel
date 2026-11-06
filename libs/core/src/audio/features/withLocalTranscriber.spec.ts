import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from '../transcribers/LOCAL_VOICE_TRANSCRIBER_OPTIONS';
import { LocalVoiceTranscriber } from '../transcribers/LocalVoiceTranscriber';
import { VOICE_TRANSCRIBER } from '../transcribers/VOICE_TRANSCRIBER';
import { provideAudioRecorder } from './provideAudioRecorder';
import { withLocalTranscriber } from './withLocalTranscriber';

describe('withLocalTranscriber', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('binds the browser strategy and its options to the transcriber port', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioRecorder(withLocalTranscriber({ language: 'de-DE' }))],
        });

        // Act
        const transcriber = TestBed.inject(VOICE_TRANSCRIBER);

        // Assert
        expect(transcriber).toBeInstanceOf(LocalVoiceTranscriber);
        expect(TestBed.inject(LOCAL_VOICE_TRANSCRIBER_OPTIONS)).toEqual({ language: 'de-DE' });
    });

    it('leaves the port unbound while the recorder is composed without it', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioRecorder(), { provide: DOCUMENT, useValue: { defaultView: null } }],
        });

        // Act
        const resolve = (): unknown => TestBed.inject(VOICE_TRANSCRIBER);

        // Assert
        expect(resolve).toThrow(/No provider/);
    });
});
