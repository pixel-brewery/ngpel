// #region Imports

import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FilePreviewPipe } from './FilePreviewPipe';

// #endregion

describe('FilePreviewPipe', () => {
    let createObjectUrl: ReturnType<typeof vi.fn>;
    let originalCreateObjectUrl: PropertyDescriptor | undefined;
    let originalRevokeObjectUrl: PropertyDescriptor | undefined;
    let revokeObjectUrl: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        originalCreateObjectUrl = Object.getOwnPropertyDescriptor(window.URL, 'createObjectURL');
        originalRevokeObjectUrl = Object.getOwnPropertyDescriptor(window.URL, 'revokeObjectURL');
        createObjectUrl = vi.fn(() => 'blob:preview');
        revokeObjectUrl = vi.fn();
        Object.defineProperty(window.URL, 'createObjectURL', { configurable: true, value: createObjectUrl });
        Object.defineProperty(window.URL, 'revokeObjectURL', { configurable: true, value: revokeObjectUrl });
    });

    afterEach(() => {
        restoreProperty(window.URL, 'createObjectURL', originalCreateObjectUrl);
        restoreProperty(window.URL, 'revokeObjectURL', originalRevokeObjectUrl);
        vi.restoreAllMocks();
    });

    it('should create an image preview from a browser file', () => {
        // arrange
        const pipe = createPipe();
        const file = new File(['image'], 'photo.png', { type: 'image/png' });

        // act
        const preview = pipe.transform(file);

        // assert
        expect(preview).toEqual({ type: 'image', url: 'blob:preview', alt: 'photo.png' });
        expect(createObjectUrl).toHaveBeenCalledWith(file);
    });

    it('should infer previewable media from the extension when the MIME type is absent', () => {
        // arrange
        const pipe = createPipe();
        const file = new File(['video'], 'clip.WEBM');

        // act
        const preview = pipe.transform(file);

        // assert
        expect(preview).toEqual({ type: 'video', url: 'blob:preview' });
    });

    it('should not allocate object URLs for files without a media preview', () => {
        // arrange
        const pipe = createPipe();
        const file = new File(['document'], 'manual.pdf', { type: 'application/pdf' });

        // act
        const preview = pipe.transform(file);

        // assert
        expect(preview).toEqual({ type: 'other' });
        expect(createObjectUrl).not.toHaveBeenCalled();
    });

    it('should revoke the previous preview before creating a replacement', () => {
        // arrange
        const pipe = createPipe();
        pipe.transform(new File(['first'], 'first.png', { type: 'image/png' }));

        // act
        pipe.transform(new File(['second'], 'second.png', { type: 'image/png' }));

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledOnce();
        expect(revokeObjectUrl).toHaveBeenCalledWith('blob:preview');
    });

    it('should revoke the active preview when destroyed', () => {
        // arrange
        const pipe = createPipe();
        pipe.transform(new File(['image'], 'photo.png', { type: 'image/png' }));

        // act
        pipe.ngOnDestroy();

        // assert
        expect(revokeObjectUrl).toHaveBeenCalledWith('blob:preview');
    });

    it('should fall back without leaking when object URL creation fails', () => {
        // arrange
        const pipe = createPipe();
        createObjectUrl.mockImplementation(() => {
            throw new Error('Object URLs are unavailable.');
        });

        // act
        const preview = pipe.transform(new File(['image'], 'photo.png', { type: 'image/png' }));

        // assert
        expect(preview).toEqual({ type: 'other' });
        expect(revokeObjectUrl).not.toHaveBeenCalled();
    });
});

function createPipe(): FilePreviewPipe {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    return TestBed.runInInjectionContext(() => new FilePreviewPipe());
}

function restoreProperty(target: typeof URL, property: 'createObjectURL' | 'revokeObjectURL', descriptor?: PropertyDescriptor): void {
    if (descriptor) {
        Object.defineProperty(target, property, descriptor);
        return;
    }

    Reflect.deleteProperty(target, property);
}
