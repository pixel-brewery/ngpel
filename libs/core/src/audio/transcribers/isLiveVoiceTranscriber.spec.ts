import { describe, expect, it } from 'vitest';
import type { ILiveVoiceTranscriber } from './ILiveVoiceTranscriber';
import { isLiveVoiceTranscriber } from './isLiveVoiceTranscriber';
import type { IVoiceTranscriber } from './IVoiceTranscriber';

const liveTranscriber: ILiveVoiceTranscriber = {
    supportsLiveSessions: true,
    cancelSession: () => undefined,
    startSession: () => Promise.resolve(),
    stopSession: () => Promise.resolve(''),
    transcribe: () => Promise.resolve(''),
};

describe('isLiveVoiceTranscriber', () => {
    it('recognizes a strategy that exposes the live-session lifecycle', () => {
        // Arrange

        // Act
        const isLive = isLiveVoiceTranscriber(liveTranscriber);

        // Assert
        expect(isLive).toBe(true);
    });

    it('rejects a recorded-audio strategy so no live session is started on it', () => {
        // Arrange
        const transcriber: IVoiceTranscriber = { transcribe: () => Promise.resolve('') };

        // Act
        const isLive = isLiveVoiceTranscriber(transcriber);

        // Assert
        expect(isLive).toBe(false);
    });

    it.each([null, undefined])('rejects %j so an unbound port is not treated as live', (transcriber) => {
        // Arrange

        // Act
        const isLive = isLiveVoiceTranscriber(transcriber);

        // Assert
        expect(isLive).toBe(false);
    });
});
