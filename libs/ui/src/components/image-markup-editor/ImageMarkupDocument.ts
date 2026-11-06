// #region Imports

import type { IImageMarkupOperation } from './IImageMarkupOperation';
import type { IImageMarkupCropSelection } from './IImageMarkupCropSelection';

// #endregion

interface IImageMarkupSnapshot {
    readonly cropSelection: IImageMarkupCropSelection | null;
    readonly operations: ReadonlyArray<IImageMarkupOperation>;
}

/**
 * Framework-neutral immutable history for raster image markup operations.
 *
 * @public
 */
export class ImageMarkupDocument {
    // #region Fields

    private readonly _historyLimit: number;
    private _cropSelection: IImageMarkupCropSelection | null = null;
    private _operations: ReadonlyArray<IImageMarkupOperation> = [];
    private _past: Array<IImageMarkupSnapshot> = [];
    private _future: Array<IImageMarkupSnapshot> = [];

    // #endregion

    // #region Ctor

    /**
     * Creates an empty image markup history.
     *
     * @param historyLimit - Maximum number of undo snapshots retained.
     * @public
     */
    public constructor(historyLimit = 100) {
        this._historyLimit = Number.isFinite(historyLimit) ? Math.max(1, Math.round(historyLimit)) : 100;
    }

    // #endregion

    // #region Properties

    /**
     * Current immutable operation sequence.
     *
     * @public
     * @readonly
     */
    public get operations(): ReadonlyArray<IImageMarkupOperation> {
        return this._operations;
    }

    /**
     * Current crop rectangle, or `null` when the full source image is retained.
     *
     * @public
     * @readonly
     */
    public get cropSelection(): IImageMarkupCropSelection | null {
        return this._cropSelection;
    }

    /**
     * Indicates whether an undo snapshot exists.
     *
     * @public
     * @readonly
     */
    public get canUndo(): boolean {
        return this._past.length > 0;
    }

    /**
     * Indicates whether a redo snapshot exists.
     *
     * @public
     * @readonly
     */
    public get canRedo(): boolean {
        return this._future.length > 0;
    }

    /**
     * Indicates whether the document contains crop or markup edits.
     *
     * @public
     * @readonly
     */
    public get hasChanges(): boolean {
        return this._operations.length > 0 || this._cropSelection !== null;
    }

    // #endregion

    // #region Methods

    /**
     * Commits one immutable markup operation and invalidates redo history.
     *
     * @param operation - Operation to append.
     * @public
     */
    public commit(operation: IImageMarkupOperation): void {
        if (operation.points.length === 0) {
            throw new Error('Image markup operations require at least one point.');
        }

        this.pushPast();
        this._operations = [...this._operations, this.cloneOperation(operation)];
        this._future = [];
    }

    /**
     * Replaces the optional crop rectangle as one reversible history step.
     *
     * @param selection - Source-image rectangle, or `null` to keep the complete image.
     * @returns Whether the document changed.
     * @public
     */
    public setCropSelection(selection: IImageMarkupCropSelection | null): boolean {
        const next = selection ? this.cloneCropSelection(selection) : null;
        if (this.cropSelectionsEqual(this._cropSelection, next)) {
            return false;
        }

        this.pushPast();
        this._cropSelection = next;
        this._future = [];

        return true;
    }

    /**
     * Removes all crop and markup edits while retaining an undo snapshot.
     *
     * @returns Whether the document changed.
     * @public
     */
    public clear(): boolean {
        if (!this.hasChanges) {
            return false;
        }

        this.pushPast();
        this._operations = [];
        this._cropSelection = null;
        this._future = [];

        return true;
    }

    /**
     * Restores the previous immutable snapshot.
     *
     * @returns Whether a snapshot was restored.
     * @public
     */
    public undo(): boolean {
        const previous = this._past.pop();
        if (!previous) {
            return false;
        }

        this._future.push(this.createSnapshot());
        this.restoreSnapshot(previous);

        return true;
    }

    /**
     * Reapplies the next immutable snapshot.
     *
     * @returns Whether a snapshot was reapplied.
     * @public
     */
    public redo(): boolean {
        const next = this._future.pop();
        if (!next) {
            return false;
        }

        this.pushPast();
        this.restoreSnapshot(next);

        return true;
    }

    /**
     * Discards all edits and history for a new source image.
     *
     * @public
     */
    public reset(): void {
        this._operations = [];
        this._cropSelection = null;
        this._past = [];
        this._future = [];
    }

    private pushPast(): void {
        this._past.push(this.createSnapshot());
        if (this._past.length > this._historyLimit) {
            this._past.splice(0, this._past.length - this._historyLimit);
        }
    }

    private createSnapshot(): IImageMarkupSnapshot {
        return {
            cropSelection: this._cropSelection ? this.cloneCropSelection(this._cropSelection) : null,
            operations: this._operations.map((operation) => this.cloneOperation(operation)),
        };
    }

    private restoreSnapshot(snapshot: IImageMarkupSnapshot): void {
        this._cropSelection = snapshot.cropSelection ? this.cloneCropSelection(snapshot.cropSelection) : null;
        this._operations = snapshot.operations.map((operation) => this.cloneOperation(operation));
    }

    private cloneCropSelection(selection: IImageMarkupCropSelection): IImageMarkupCropSelection {
        if (
            !Number.isFinite(selection.left) ||
            !Number.isFinite(selection.top) ||
            !Number.isFinite(selection.width) ||
            !Number.isFinite(selection.height) ||
            selection.left < 0 ||
            selection.top < 0 ||
            selection.width <= 0 ||
            selection.height <= 0
        ) {
            throw new Error('Image markup crop selections require finite positive dimensions.');
        }

        return {
            left: selection.left,
            top: selection.top,
            width: selection.width,
            height: selection.height,
        };
    }

    private cropSelectionsEqual(left: IImageMarkupCropSelection | null, right: IImageMarkupCropSelection | null): boolean {
        return (
            left === right ||
            (left !== null &&
                right !== null &&
                left.left === right.left &&
                left.top === right.top &&
                left.width === right.width &&
                left.height === right.height)
        );
    }

    private cloneOperation(operation: IImageMarkupOperation): IImageMarkupOperation {
        return {
            ...operation,
            points: operation.points.map((point) => ({ x: point.x, y: point.y })),
        };
    }

    // #endregion
}
