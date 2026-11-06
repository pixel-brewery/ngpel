// #region Imports

import { ElementRef, type Signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { ImageComponent } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ImagePreviewDirective } from './ImagePreviewDirective';
import { ImagePreviewService } from './ImagePreviewService';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    AvatarComponent: class TestAvatarComponent {},
    ImageComponent: class TestImageComponent {},
}));
vi.mock('./ImagePreviewService', () => ({ ImagePreviewService: class TestImagePreviewService {} }));

function setSignalInput<T>(inputSignal: Signal<T>, value: T): void {
    const node = (
        inputSignal as Signal<T> & {
            [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: T): void };
        }
    )[SIGNAL];
    node.applyValueToInputSignal(node, value);
}

describe('ImagePreviewDirective', () => {
    let imagePreviewService: { open: ReturnType<typeof vi.fn> };

    beforeEach(() => {
        imagePreviewService = { open: vi.fn() };
        TestBed.configureTestingModule({
            providers: [
                ImagePreviewDirective,
                {
                    provide: ElementRef,
                    useValue: new ElementRef(document.createElement('mosaik-image')),
                },
                {
                    provide: ImageComponent,
                    useValue: {
                        alt: () => 'Front view',
                        height: () => '100%',
                        src: () => '/media/product.webp',
                        srcset: () => undefined,
                        width: () => '100%',
                    },
                },
                { provide: ImagePreviewService, useValue: imagePreviewService },
            ],
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        TestBed.resetTestingModule();
    });

    it('does not open a preview while activation is disabled', () => {
        // arrange
        const directive = TestBed.inject(ImagePreviewDirective);
        setSignalInput(directive.previewDisabled, true);

        // act
        directive.open();

        // assert
        expect(imagePreviewService.open).not.toHaveBeenCalled();
    });

    it('opens the represented image when activation is enabled', () => {
        // arrange
        const directive = TestBed.inject(ImagePreviewDirective);

        // act
        directive.open();

        // assert
        expect(imagePreviewService.open).toHaveBeenCalledWith(
            [
                {
                    alt: 'Front view',
                    height: '100%',
                    src: '/media/product.webp',
                    srcset: undefined,
                    width: '100%',
                },
            ],
            {},
        );
    });
});
