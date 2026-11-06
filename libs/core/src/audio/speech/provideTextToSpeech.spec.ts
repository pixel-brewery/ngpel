import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { provideTextToSpeech } from './provideTextToSpeech';
import { TextToSpeechService } from './TextToSpeechService';

describe('provideTextToSpeech', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('registers the synthesis service for the composition root', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideTextToSpeech(), { provide: DOCUMENT, useValue: { defaultView: null } }],
        });

        // Act
        const service = TestBed.inject(TextToSpeechService);

        // Assert
        expect(service).toBeInstanceOf(TextToSpeechService);
    });

    it('leaves the service unavailable when it is not composed', () => {
        // Arrange
        TestBed.configureTestingModule({ providers: [] });

        // Act
        const resolve = (): unknown => TestBed.inject(TextToSpeechService);

        // Assert
        expect(resolve).toThrow();
    });
});
