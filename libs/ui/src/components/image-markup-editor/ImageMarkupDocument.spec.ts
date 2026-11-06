// #region Imports

import { describe, expect, it } from 'vitest';
import type { IImageMarkupOperation } from './IImageMarkupOperation';
import { ImageMarkupDocument } from './ImageMarkupDocument';
import { ImageMarkupTool } from './ImageMarkupTool';

// #endregion

describe('Image markup history', () => {
    it('commits immutable operations and restores them through undo and redo', () => {
        // arrange
        const document = new ImageMarkupDocument();
        document.commit(createOperation(1));

        // act
        const undone = document.undo();

        // assert
        expect(undone).toBe(true);
        expect(document.operations).toEqual([]);
        expect(document.canRedo).toBe(true);

        // arrange
        document.redo();

        // assert
        expect(document.operations).toEqual([createOperation(1)]);
    });

    it('clears all operations as one reversible history step', () => {
        // arrange
        const document = new ImageMarkupDocument();
        document.commit(createOperation(1));
        document.commit(createOperation(2));

        // act
        const changed = document.clear();

        // assert
        expect(changed).toBe(true);
        expect(document.operations).toEqual([]);
        expect(document.undo()).toBe(true);
        expect(document.operations).toHaveLength(2);
    });

    it('invalidates redo history when a different operation is committed', () => {
        // arrange
        const document = new ImageMarkupDocument();
        document.commit(createOperation(1));
        document.undo();

        // act
        document.commit(createOperation(2));

        // assert
        expect(document.canRedo).toBe(false);
        expect(document.operations).toEqual([createOperation(2)]);
    });

    it('stores crop selection as a reversible document change', () => {
        // arrange
        const document = new ImageMarkupDocument();

        // act
        const changed = document.setCropSelection({ left: 10, top: 20, width: 300, height: 200 });

        // assert
        expect(changed).toBe(true);
        expect(document.hasChanges).toBe(true);
        expect(document.cropSelection).toEqual({ left: 10, top: 20, width: 300, height: 200 });
        expect(document.undo()).toBe(true);
        expect(document.cropSelection).toBeNull();
        expect(document.redo()).toBe(true);
        expect(document.cropSelection).toEqual({ left: 10, top: 20, width: 300, height: 200 });
    });

    it('clears markup and crop selection together as one reversible step', () => {
        // arrange
        const document = new ImageMarkupDocument();
        document.commit(createOperation(1));
        document.setCropSelection({ left: 1, top: 2, width: 30, height: 20 });

        // act
        document.clear();

        // assert
        expect(document.operations).toEqual([]);
        expect(document.cropSelection).toBeNull();
        expect(document.undo()).toBe(true);
        expect(document.operations).toEqual([createOperation(1)]);
        expect(document.cropSelection).toEqual({ left: 1, top: 2, width: 30, height: 20 });
    });

    describe('edge cases', () => {
        it('bounds undo snapshots to the configured history limit', () => {
            // arrange
            const document = new ImageMarkupDocument(2);
            document.commit(createOperation(1));
            document.commit(createOperation(2));
            document.commit(createOperation(3));
            document.undo();
            document.undo();

            // act
            const thirdUndo = document.undo();

            // assert
            expect(thirdUndo).toBe(false);
            expect(document.operations).toEqual([createOperation(1)]);
        });

        it('rejects operations without source-image points', () => {
            // arrange
            const document = new ImageMarkupDocument();
            const operation: IImageMarkupOperation = {
                tool: ImageMarkupTool.PEN,
                points: [],
                color: '#000000',
                strokeWidth: 1,
            };

            // act
            const commitInvalidOperation = (): void => document.commit(operation);

            // assert
            expect(commitInvalidOperation).toThrow('Image markup operations require at least one point.');
            expect(document.hasChanges).toBe(false);
        });

        it('rejects crop selections with non-positive dimensions', () => {
            // arrange
            const document = new ImageMarkupDocument();

            // act
            const setInvalidCrop = (): boolean => document.setCropSelection({ left: 0, top: 0, width: 0, height: 10 });

            // assert
            expect(setInvalidCrop).toThrow('Image markup crop selections require finite positive dimensions.');
            expect(document.hasChanges).toBe(false);
        });

        it('leaves an empty document stable for clear, undo, redo, and reset', () => {
            // arrange
            const document = new ImageMarkupDocument(Number.NaN);

            // act
            document.reset();

            // assert
            expect(document.clear()).toBe(false);
            expect(document.undo()).toBe(false);
            expect(document.redo()).toBe(false);
            expect(document.operations).toEqual([]);
        });
    });
});

function createOperation(x: number): IImageMarkupOperation {
    return {
        tool: ImageMarkupTool.PEN,
        points: [{ x, y: x }],
        color: '#ef4444',
        strokeWidth: 4,
    };
}
