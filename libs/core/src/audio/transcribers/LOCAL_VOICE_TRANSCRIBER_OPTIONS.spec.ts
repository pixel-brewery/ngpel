import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import type { ILocalVoiceTranscriberOptions } from './ILocalVoiceTranscriberOptions';
import { LOCAL_VOICE_TRANSCRIBER_OPTIONS } from './LOCAL_VOICE_TRANSCRIBER_OPTIONS';

describe('LOCAL_VOICE_TRANSCRIBER_OPTIONS', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('resolves the composed recognition options', () => {
        // Arrange
        const options: ILocalVoiceTranscriberOptions = { language: 'de-DE' };
        TestBed.configureTestingModule({
            providers: [{ provide: LOCAL_VOICE_TRANSCRIBER_OPTIONS, useValue: options }],
        });

        // Act
        const resolved = TestBed.inject(LOCAL_VOICE_TRANSCRIBER_OPTIONS);

        // Assert
        expect(resolved).toBe(options);
    });

    it('has no default options and therefore no provider until composed', () => {
        // Arrange
        TestBed.configureTestingModule({});

        // Act
        const resolve = (): unknown => TestBed.inject(LOCAL_VOICE_TRANSCRIBER_OPTIONS);

        // Assert
        expect(resolve).toThrow(/No provider/);
    });
});
