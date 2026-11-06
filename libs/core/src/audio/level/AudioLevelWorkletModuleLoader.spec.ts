import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioLevelWorkletModuleLoader } from './AudioLevelWorkletModuleLoader';

describe('AudioLevelWorkletModuleLoader', () => {
    const blobUrl = 'blob:audio-level';
    let createObjectURL: ReturnType<typeof vi.fn>;
    let revokeObjectURL: ReturnType<typeof vi.fn>;
    let addModule: ReturnType<typeof vi.fn>;
    let context: AudioContext;
    let loader: AudioLevelWorkletModuleLoader;

    beforeEach(() => {
        createObjectURL = vi.fn().mockReturnValue(blobUrl);
        revokeObjectURL = vi.fn();
        addModule = vi.fn().mockResolvedValue(undefined);
        context = { audioWorklet: { addModule } } as unknown as AudioContext;
        TestBed.configureTestingModule({
            providers: [{ provide: DOCUMENT, useValue: { defaultView: { Blob, URL: { createObjectURL, revokeObjectURL } } } }],
        });
        loader = TestBed.inject(AudioLevelWorkletModuleLoader);
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('loads the worklet from an object URL and revokes it', async () => {
        // Arrange

        // Act
        await loader.load(context);

        // Assert
        expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
        expect(addModule).toHaveBeenCalledWith(blobUrl);
        expect(revokeObjectURL).toHaveBeenCalledWith(blobUrl);
    });

    it('revokes the object URL even if the browser blocks the module', async () => {
        // Arrange
        const denied = new Error('The content security policy blocked the worklet.');
        addModule.mockRejectedValueOnce(denied);

        // Act
        const loading = loader.load(context);

        // Assert
        await expect(loading).rejects.toBe(denied);
        expect(revokeObjectURL).toHaveBeenCalledWith(blobUrl);
    });
});
