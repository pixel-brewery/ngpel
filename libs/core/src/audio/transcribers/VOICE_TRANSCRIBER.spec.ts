import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { IVoiceTranscriber } from './IVoiceTranscriber';
import { VOICE_TRANSCRIBER } from './VOICE_TRANSCRIBER';

describe('VOICE_TRANSCRIBER', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('resolves a composed transcription strategy', () => {
        // Arrange
        const transcriber: IVoiceTranscriber = { transcribe: () => Promise.resolve('') };
        TestBed.configureTestingModule({ providers: [{ provide: VOICE_TRANSCRIBER, useValue: transcriber }] });

        // Act
        const resolved = TestBed.inject(VOICE_TRANSCRIBER);

        // Assert
        expect(resolved).toBe(transcriber);
    });

    it('has no default strategy and therefore no provider until composed', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const resolve = (): unknown => TestBed.inject(VOICE_TRANSCRIBER);

        // Assert
        expect(resolve).toThrow(/No provider/);
    });
});
