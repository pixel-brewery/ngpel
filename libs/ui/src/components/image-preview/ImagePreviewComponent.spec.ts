// #region Imports

import { TestBed } from '@angular/core/testing';
import { DIALOG_REF, DIALOG_REF_DATA } from '@pixel-brewery/mosaik-elements-angular';
import { describe, expect, it, vi } from 'vitest';
import { ImagePreviewComponent } from './ImagePreviewComponent';
import type { IImagePreviewData } from './ImagePreviewData';
import { ImagePreviewState } from './ImagePreviewState';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    Cancel: {
        negative: vi.fn(() => ({ reason: 'negative' })),
    },
    DIALOG_REF: 'DIALOG_REF',
    DIALOG_REF_DATA: 'DIALOG_REF_DATA',
    IconNameDirective: class IconNameDirective {},
}));

const PREVIEW_DATA_BASE: Omit<IImagePreviewData, 'state'> = {
    config: {
        backdropClosable: true,
        closeOnNavigation: true,
        direction: 'ltr',
        keyboard: true,
        maxZoom: 2,
        minimumVisibleSize: 64,
        minZoom: 1,
        rotation: 0,
        zoom: 1,
        zoomStep: 0.5,
    },
    images: [
        { alt: 'First', src: '/first.png' },
        { alt: 'Second', src: '/second.png' },
    ],
    index: 0,
    labels: {
        close: 'Close',
        next: 'Next',
        previous: 'Previous',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        viewer: 'Viewer',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
    },
};
interface IImagePreviewComponentTestApi {
    rotateRight(): void;

    zoomIn(): void;

    zoomOut(): void;
}

describe('ImagePreviewComponent', () => {
    it('should navigate within image bounds and reset the transform', () => {
        // arrange
        const component = createComponent();
        const api = component as unknown as IImagePreviewComponentTestApi;
        api.zoomIn();
        api.rotateRight();

        // act
        component.next();

        // assert
        expect(component.currentImage()).toEqual({ alt: 'Second', src: '/second.png' });
        expect(component.transform()).toBe('scale3d(1, 1, 1) rotate(0deg)');
        expect(component.canGoNext()).toBe(false);
        expect(component.canGoPrevious()).toBe(true);
    });

    it('should clamp direct selection to the available image range', () => {
        // arrange
        const component = createComponent();

        // act
        component.select(99);

        // assert
        expect(component.currentImage().src).toBe('/second.png');
    });

    it('should clamp zoom actions to configured bounds', () => {
        // arrange
        const component = createComponent();
        const api = component as unknown as IImagePreviewComponentTestApi;

        // act
        api.zoomOut();
        api.zoomIn();
        api.zoomIn();
        api.zoomIn();

        // assert
        expect(component.canZoomIn()).toBe(false);
        expect(component.canZoomOut()).toBe(true);
        expect(component.transform()).toContain('scale3d(2, 2, 1)');
    });
});

/**
 * Creates the component inside an Angular injection context.
 *
 * @returns Initialized component instance.
 * @private
 */
function createComponent(): ImagePreviewComponent {
    TestBed.resetTestingModule();
    const previewData: IImagePreviewData = {
        ...PREVIEW_DATA_BASE,
        state: new ImagePreviewState(PREVIEW_DATA_BASE),
    };
    TestBed.configureTestingModule({
        providers: [
            { provide: DIALOG_REF_DATA, useValue: previewData },
            { provide: DIALOG_REF, useValue: { close: vi.fn() } },
        ],
    });

    return TestBed.runInInjectionContext(() => new ImagePreviewComponent());
}
