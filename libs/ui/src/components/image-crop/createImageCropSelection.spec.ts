// #region Imports

import { describe, expect, it } from 'vitest';
import { createImageCropSelection } from './createImageCropSelection';

// #endregion

describe('image crop selection normalization', () => {
    it('preserves a drag from the upper-left to the lower-right', () => {
        // arrange
        const origin = { x: 10, y: 20 };
        const current = { x: 42, y: 64 };

        // act
        const selection = createImageCropSelection(origin, current);

        // assert
        expect(selection).toEqual({
            left: 10,
            top: 20,
            width: 32,
            height: 44,
        });
    });

    describe('edge cases', () => {
        it('normalizes a reverse drag without negative dimensions', () => {
            // arrange
            const origin = { x: 42, y: 64 };
            const current = { x: 10, y: 20 };

            // act
            const selection = createImageCropSelection(origin, current);

            // assert
            expect(selection).toEqual({
                left: 10,
                top: 20,
                width: 32,
                height: 44,
            });
        });

        it('returns an empty rectangle when the pointer does not move', () => {
            // arrange
            const point = { x: 12, y: 24 };

            // act
            const selection = createImageCropSelection(point, point);

            // assert
            expect(selection).toEqual({
                left: 12,
                top: 24,
                width: 0,
                height: 0,
            });
        });
    });
});
