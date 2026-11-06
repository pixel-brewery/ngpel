// #region Imports

import { Directive, ElementRef, inject, input, output } from '@angular/core';

import type { IWidgetGridResizePreview } from '../models/IWidgetGridResizePreview';

// #endregion

/** Current size and bounds used by one widget resize gesture. */
export interface IWidgetGridResizeConfiguration {
    readonly columnSpan: number;
    readonly rowSpan: number;
    readonly minColumnSpan: number;
    readonly maxColumnSpan: number;
    readonly minRowSpan: number;
    readonly maxRowSpan: number;
}

/** Measured distance between two adjacent snap lines on the canvas. */
export interface IWidgetGridResizeSteps {
    readonly column: number;
    readonly row: number;
}

/** Physical edge or corner controlled by one resize adornment. */
export type WidgetGridResizeDirection = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left';

interface IWidgetGridResizeDirectionVector {
    readonly column: -1 | 0 | 1;
    readonly row: -1 | 0 | 1;
}

const WIDGET_GRID_RESIZE_DIRECTION_VECTORS: Record<WidgetGridResizeDirection, IWidgetGridResizeDirectionVector> = {
    'top-left': { column: -1, row: -1 },
    top: { column: 0, row: -1 },
    'top-right': { column: 1, row: -1 },
    right: { column: 1, row: 0 },
    'bottom-right': { column: 1, row: 1 },
    bottom: { column: 0, row: 1 },
    'bottom-left': { column: -1, row: 1 },
    left: { column: -1, row: 0 },
};

/**
 * Converts a pointer resize gesture into column/row spans snapped to the visible grid.
 *
 * Angular CDK intentionally has no resize primitive. Drag/drop remains CDK-owned;
 * this directive owns only pointer capture and the deterministic resize gesture.
 *
 * @public
 */
@Directive({
    selector: '[ngpWidgetGridResize]',
    host: {
        class: 'widget-grid-resize-handle',
        '(pointerdown)': 'onPointerDown($event)',
        '(pointermove)': 'onPointerMove($event)',
        '(pointerup)': 'onPointerUp($event)',
        '(pointercancel)': 'onPointerCancel($event)',
    },
})
export class WidgetGridResizeDirective {
    // #region Fields

    private readonly _element: ElementRef<HTMLElement> = inject(ElementRef);
    private _pointerId: number | undefined;
    private _startX = 0;
    private _startY = 0;
    private _steps: IWidgetGridResizeSteps = { column: 1, row: 1 };
    private _lastPreview: IWidgetGridResizePreview | null = null;

    // #endregion

    // #region Ctor

    // #endregion

    // #region Properties

    /** Current widget spans and constraints. */
    public readonly configuration = input.required<IWidgetGridResizeConfiguration>({
        alias: 'ngpWidgetGridResize',
    });

    /** Grid axis controlled by this adornment. */
    public readonly direction = input<WidgetGridResizeDirection>('bottom-right', {
        alias: 'widgetGridResizeDirection',
    });

    /** Emits a snapped target throughout the gesture and `null` after it ends. */
    public readonly previewChange = output<IWidgetGridResizePreview | null>({
        alias: 'widgetGridResizePreview',
    });

    /** Emits the final snapped size after a completed gesture. */
    public readonly resized = output<IWidgetGridResizePreview>({ alias: 'widgetGridResized' });

    // #endregion

    // #region Methods

    /** Starts a touch-, pen-, or mouse-based resize gesture. */
    protected onPointerDown(event: PointerEvent): void {
        if (event.button !== 0 || this._pointerId !== undefined) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        this._pointerId = event.pointerId;
        this._startX = event.clientX;
        this._startY = event.clientY;
        this._steps = resolveGridSteps(this._element.nativeElement);
        this._lastPreview = {
            columnSpan: this.configuration().columnSpan,
            rowSpan: this.configuration().rowSpan,
        };
        this._element.nativeElement.setPointerCapture(event.pointerId);
        this.previewChange.emit(this._lastPreview);
    }

    /** Updates the live target after crossing a visible snap line. */
    protected onPointerMove(event: PointerEvent): void {
        if (event.pointerId !== this._pointerId) {
            return;
        }

        event.preventDefault();
        const preview = resolveWidgetGridResizePreview(
            this.configuration(),
            event.clientX - this._startX,
            event.clientY - this._startY,
            this._steps,
            this.direction(),
        );

        if (preview.columnSpan === this._lastPreview?.columnSpan && preview.rowSpan === this._lastPreview?.rowSpan) {
            return;
        }

        this._lastPreview = preview;
        this.previewChange.emit(preview);
    }

    /** Commits the last snapped target. */
    protected onPointerUp(event: PointerEvent): void {
        if (event.pointerId !== this._pointerId) {
            return;
        }

        event.preventDefault();
        const preview = this._lastPreview;
        this.finishGesture(event.pointerId);

        if (preview) {
            this.resized.emit(preview);
        }
    }

    /** Cancels a resize without changing the layout. */
    protected onPointerCancel(event: PointerEvent): void {
        if (event.pointerId === this._pointerId) {
            this.finishGesture(event.pointerId);
        }
    }

    private finishGesture(pointerId: number): void {
        if (this._element.nativeElement.hasPointerCapture(pointerId)) {
            this._element.nativeElement.releasePointerCapture(pointerId);
        }

        this._pointerId = undefined;
        this._lastPreview = null;
        this.previewChange.emit(null);
    }

    // #endregion
}

/** Resolves one resize target using the same measured steps as the visible canvas grid. */
export function resolveWidgetGridResizePreview(
    configuration: IWidgetGridResizeConfiguration,
    distanceX: number,
    distanceY: number,
    steps: IWidgetGridResizeSteps,
    direction: WidgetGridResizeDirection = 'bottom-right',
): IWidgetGridResizePreview {
    const vector = WIDGET_GRID_RESIZE_DIRECTION_VECTORS[direction];
    const columnDistance = distanceX * vector.column;
    const rowDistance = distanceY * vector.row;

    return {
        columnSpan: clamp(
            configuration.columnSpan + Math.round(columnDistance / Math.max(1, steps.column)),
            configuration.minColumnSpan,
            configuration.maxColumnSpan,
        ),
        rowSpan: clamp(configuration.rowSpan + Math.round(rowDistance / Math.max(1, steps.row)), configuration.minRowSpan, configuration.maxRowSpan),
    };
}

function resolveGridSteps(handle: HTMLElement): IWidgetGridResizeSteps {
    const grid = handle.closest<HTMLElement>('[data-widget-grid-items]');

    if (!grid) {
        return { column: 1, row: 1 };
    }

    const style = getComputedStyle(grid);
    const columnTracks = style.gridTemplateColumns
        .split(' ')
        .map((value) => Number.parseFloat(value))
        .filter(Number.isFinite);
    const columnGap = Number.parseFloat(style.columnGap) || 0;
    const rowGap = Number.parseFloat(style.rowGap) || 0;
    const rowHeight = Number.parseFloat(style.gridAutoRows) || 112;

    return {
        column: (columnTracks[0] ?? grid.getBoundingClientRect().width) + columnGap,
        row: rowHeight + rowGap,
    };
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
