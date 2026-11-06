import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioPlayer } from './AudioPlayer';

interface IFakeAudioElement extends HTMLAudioElement {
    readonly listeners: Map<string, Array<() => void>>;
    emit(event: string): void;
}

function createAudioElement(): IFakeAudioElement {
    const listeners = new Map<string, Array<() => void>>();
    const element = {
        listeners,
        crossOrigin: null,
        currentTime: 0,
        duration: 0,
        error: null,
        loop: false,
        muted: false,
        paused: true,
        preload: '',
        src: '',
        srcObject: null,
        volume: 1,
        addEventListener: vi.fn((event: string, handler: () => void) => {
            listeners.set(event, [...(listeners.get(event) ?? []), handler]);
        }),
        emit(event: string): void {
            for (const handler of listeners.get(event) ?? []) {
                handler();
            }
        },
        load: vi.fn(),
        pause: vi.fn(),
        play: vi.fn().mockResolvedValue(undefined),
        removeEventListener: vi.fn(),
    };

    return element as unknown as IFakeAudioElement;
}

function createMediaStream(): { readonly stopTrack: ReturnType<typeof vi.fn>; readonly stream: MediaStream } {
    const stopTrack = vi.fn();
    const track = { kind: 'audio', stop: stopTrack } as unknown as MediaStreamTrack;

    return {
        stopTrack,
        stream: { getAudioTracks: () => [track], getTracks: () => [track] } as unknown as MediaStream,
    };
}

function createPlayer(): AudioPlayer {
    TestBed.configureTestingModule({ providers: [AudioPlayer] });

    return TestBed.inject(AudioPlayer);
}

describe('AudioPlayer', () => {
    let element: IFakeAudioElement;
    let revokeObjectURL: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        element = createAudioElement();
        revokeObjectURL = vi.fn();
        vi.spyOn(document, 'createElement').mockReturnValue(element);
        Object.defineProperty(window.URL, 'createObjectURL', {
            configurable: true,
            value: vi.fn(() => 'blob:recorded-audio'),
        });
        Object.defineProperty(window.URL, 'revokeObjectURL', { configurable: true, value: revokeObjectURL });
        vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
        vi.spyOn(window, 'cancelAnimationFrame').mockReturnValue(undefined);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('starts silent, at the beginning, and without a source', () => {
        // Arrange
        const player = createPlayer();

        // Act
        const snapshot = {
            currentTime: player.currentTime(),
            duration: player.duration(),
            error: player.error(),
            isPlaying: player.isPlaying(),
            sourceStream: player.sourceStream(),
            sourceUrl: player.sourceUrl(),
            timeLabel: player.timeLabel(),
            volume: player.volume(),
        };

        // Assert
        expect(snapshot).toEqual({
            currentTime: 0,
            duration: 0,
            error: null,
            isPlaying: false,
            sourceStream: null,
            sourceUrl: null,
            timeLabel: '00:00 / 00:00',
            volume: 1,
        });
    });

    it('attaches a URL source without starting playback', () => {
        // Arrange
        const player = createPlayer();

        // Act
        player.load({ src: 'https://example.test/notification.mp3' });

        // Assert
        expect(element.src).toBe('https://example.test/notification.mp3');
        expect(player.sourceUrl()).toBe('https://example.test/notification.mp3');
        expect(element.load).toHaveBeenCalledOnce();
        expect(element.play).not.toHaveBeenCalled();
    });

    it('publishes an object URL for a retained blob', () => {
        // Arrange
        const player = createPlayer();

        // Act
        player.load({ src: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        expect(player.sourceUrl()).toBe('blob:recorded-audio');
        expect(element.src).toBe('blob:recorded-audio');
    });

    it('reports a missing browser window instead of attaching a blob it cannot address', () => {
        // Arrange
        const detachedDocument = document.implementation.createHTMLDocument('detached');
        vi.spyOn(detachedDocument, 'createElement').mockReturnValue(element);
        TestBed.configureTestingModule({ providers: [AudioPlayer, { provide: DOCUMENT, useValue: detachedDocument }] });
        const player = TestBed.inject(AudioPlayer);

        // Act
        player.load({ src: new Blob(['audio'], { type: 'audio/webm' }) });

        // Assert
        expect(player.error()).toBe('Object URLs are unavailable outside a browser window.');
        expect(player.sourceUrl()).toBeNull();
    });

    it('attaches a live stream through the element instead of an object URL', () => {
        // Arrange
        const player = createPlayer();
        const mediaStream = createMediaStream();

        // Act
        player.load({ src: mediaStream.stream });

        // Assert
        expect(element.srcObject).toBe(mediaStream.stream);
        expect(player.sourceStream()).toBe(mediaStream.stream);
        expect(player.sourceUrl()).toBeNull();
        expect(window.URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('applies the volume, loop and start position of one call', async () => {
        // Arrange
        const player = createPlayer();

        // Act
        await player.play({ src: 'https://example.test/notification.mp3' }, { loop: true, startAt: 30, volume: 0.5 });

        // Assert
        expect(element.volume).toBe(0.5);
        expect(element.loop).toBe(true);
        expect(element.currentTime).toBe(30);
        expect(player.isPlaying()).toBe(true);
    });

    it('ignores the start position of a live stream', async () => {
        // Arrange
        const player = createPlayer();
        const mediaStream = createMediaStream();

        // Act
        await player.play({ src: mediaStream.stream }, { startAt: 30 });

        // Assert
        expect(element.currentTime).toBe(0);
        expect(element.play).toHaveBeenCalledOnce();
    });

    it('publishes the browser message when playback is refused', async () => {
        // Arrange
        const player = createPlayer();

        element.play = vi.fn().mockRejectedValue(new Error('play() failed because the user did not interact first'));

        // Act
        const playback = player.play({ src: 'https://example.test/notification.mp3' });

        // Assert
        await expect(playback).rejects.toThrow('play() failed');
        expect(player.error()).toBe('play() failed because the user did not interact first');
        expect(player.isPlaying()).toBe(false);
    });

    it('pauses without detaching the current source', async () => {
        // Arrange
        const player = createPlayer();
        await player.play({ src: 'https://example.test/notification.mp3' });

        // Act
        player.pause();

        // Assert
        expect(element.pause).toHaveBeenCalledOnce();
        expect(player.isPaused()).toBe(true);
        expect(player.sourceUrl()).toBe('https://example.test/notification.mp3');
    });

    it('rewinds a seekable source on stop', async () => {
        // Arrange
        const player = createPlayer();
        await player.play({ src: 'https://example.test/notification.mp3' });
        element.currentTime = 42;

        // Act
        player.stop();

        // Assert
        expect(element.currentTime).toBe(0);
        expect(player.isPlaying()).toBe(false);
    });

    it('does not rewind a live stream on stop', async () => {
        // Arrange
        const player = createPlayer();
        const mediaStream = createMediaStream();
        await player.play({ src: mediaStream.stream });
        element.currentTime = 42;

        // Act
        player.stop();

        // Assert
        expect(element.currentTime).toBe(42);
        expect(mediaStream.stopTrack).not.toHaveBeenCalled();
    });

    it('clamps a volume outside the supported range', () => {
        // Arrange
        const player = createPlayer();

        // Act
        player.setVolume(5);

        // Assert
        expect(player.volume()).toBe(1);
    });

    it('mutes without losing the configured volume', () => {
        // Arrange
        const player = createPlayer();
        player.setVolume(0.4);

        // Act
        player.setMuted(true);

        // Assert
        expect(player.isMuted()).toBe(true);
        expect(player.volume()).toBe(0.4);
    });

    it('repeats a seekable source when looping is enabled', () => {
        // Arrange
        const player = createPlayer();
        player.load({ src: 'https://example.test/notification.mp3' });

        // Act
        player.setLoop(true);

        // Assert
        expect(player.loop()).toBe(true);
        expect(element.loop).toBe(true);
    });

    it('follows the element through its playback events', () => {
        // Arrange
        const player = createPlayer();
        player.load({ src: 'https://example.test/notification.mp3' });
        element.currentTime = 12;
        Object.defineProperty(element, 'duration', { configurable: true, value: 90 });

        // Act
        element.emit('loadedmetadata');

        // Assert
        expect(player.duration()).toBe(90);
        expect(player.timeLabel()).toBe('00:00 / 01:30');
    });

    it('reports a media error of the element', () => {
        // Arrange
        const player = createPlayer();
        player.load({ src: 'https://example.test/notification.mp3' });
        Object.defineProperty(element, 'error', { configurable: true, value: { code: 4 } as MediaError });

        // Act
        element.emit('error');

        // Assert
        expect(player.error()).toBe('MediaError(4)');
    });

    it('revokes its own object URL on dispose', async () => {
        // Arrange
        const player = createPlayer();
        await player.play({ src: new Blob(['audio'], { type: 'audio/webm' }) });

        // Act
        player.dispose();

        // Assert
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:recorded-audio');
        expect(player.sourceUrl()).toBeNull();
        expect(player.isPlaying()).toBe(false);
    });

    it('releases the element when the owning injector is destroyed', async () => {
        // Arrange
        const player = createPlayer();
        await player.play({ src: 'https://example.test/notification.mp3' });

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(element.pause).toHaveBeenCalled();
        expect(player.sourceUrl()).toBeNull();
    });
});
