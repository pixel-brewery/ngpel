// #region Imports

import { CdkDrag, CdkDragEnd, CdkDragHandle } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, computed, input, output, type InputSignal, type OutputEmitterRef, type Signal } from '@angular/core';
import { DialogComponent } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Position and size configuration for the floating host.
 *
 * @public
 */
export interface IFloatingHostPosition {
    /**
     * The X coordinate (left) in pixels.
     *
     * @public
     */
    readonly x: number;

    /**
     * The Y coordinate (top) in pixels.
     *
     * @public
     */
    readonly y: number;

    /**
     * The width in pixels.
     *
     * @public
     */
    readonly width: number;

    /**
     * The height in pixels.
     *
     * @public
     */
    readonly height: number;
}

/**
 * Default position for floating host.
 *
 * @internal
 */
const DEFAULT_POSITION: IFloatingHostPosition = {
    x: 100,
    y: 100,
    width: 400,
    height: 500,
};

/**
 * Generic floating host container that can be positioned anywhere on screen.
 * Supports drag-to-move and resize functionality.
 * Use content projection for header and body content.
 *
 * @public
 */
@Component({
    selector: 'ngp-floating-host',
    template: `
        <mosaik-dialog
            cdkDrag
            cdkDragBoundary="body"
            (cdkDragEnded)="onDragEnded($event)"
            [isOpen]="true"
            [isDraggable]="false"
            [hasBackdrop]="false"
            [closeable]="false"
            [pressEscapeToClose]="false"
            [clickOutsideToClose]="false"
            [width]="'100%'"
            [height]="'100%'"
        >
            <div slot="header" class="floating-host-header" cdkDragHandle>
                <ng-content select="[floatingHostHeader]" />
            </div>
            <div slot="content" class="floating-host-content">
                <div class="floating-host-body">
                    <ng-content />
                </div>
                @if (showResizeHandle()) {
                    <div class="floating-host-resize" (mousedown)="onResizeStart($event)"></div>
                }
            </div>
        </mosaik-dialog>
    `,
    styleUrls: ['./FloatingHostComponent.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CdkDrag, CdkDragHandle, DialogComponent],
    host: {
        '[style.left.px]': 'position().x',
        '[style.top.px]': 'position().y',
        '[style.width.px]': 'position().width',
        '[style.height.px]': 'position().height',
        '[style.min-width.px]': 'minWidth()',
        '[style.min-height.px]': 'minHeight()',
    },
})
export class FloatingHostComponent {
    // #region Fields

    private _isResizing = false;
    private _resizeStartPos: { x: number; y: number } = { x: 0, y: 0 };
    private _resizeStartSize: { width: number; height: number } = { width: 0, height: 0 };

    // #endregion

    // #region Properties

    /**
     * The current position and size of the floating host.
     *
     * @public
     */
    public readonly position: InputSignal<IFloatingHostPosition> = input(DEFAULT_POSITION);

    /**
     * Minimum width constraint in pixels.
     *
     * @public
     */
    public readonly minWidth: InputSignal<number> = input(320);

    /**
     * Minimum height constraint in pixels.
     *
     * @public
     */
    public readonly minHeight: InputSignal<number> = input(400);

    /**
     * Whether the resize handle is visible.
     *
     * @public
     */
    public readonly resizable: InputSignal<boolean> = input(true);

    /**
     * Emits when the position or size changes due to drag or resize.
     *
     * @public
     */
    public readonly positionChange: OutputEmitterRef<IFloatingHostPosition> = output();

    /**
     * Whether the resize handle should be shown.
     *
     * @protected
     * @readonly
     */
    protected readonly showResizeHandle: Signal<boolean> = computed(() => this.resizable());

    // #endregion

    // #region Methods

    /**
     * Handles drag end to emit the new position.
     *
     * @param event - The drag end event.
     * @protected
     */
    protected onDragEnded(event: CdkDragEnd): void {
        const element = event.source.element.nativeElement;
        const rect = element.getBoundingClientRect();
        const currentPos = this.position();

        this.positionChange.emit({
            x: rect.left,
            y: rect.top,
            width: currentPos.width,
            height: currentPos.height,
        });

        // Reset transform since we're using absolute positioning
        event.source.reset();
    }

    /**
     * Handles resize start from the resize handle.
     *
     * @param event - The mouse down event.
     * @protected
     */
    protected onResizeStart(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();

        this._isResizing = true;
        this._resizeStartPos = { x: event.clientX, y: event.clientY };
        const currentPos = this.position();
        this._resizeStartSize = {
            width: currentPos.width,
            height: currentPos.height,
        };

        const onMouseMove = (moveEvent: MouseEvent): void => {
            if (!this._isResizing) {
                return;
            }

            const deltaX = moveEvent.clientX - this._resizeStartPos.x;
            const deltaY = moveEvent.clientY - this._resizeStartPos.y;

            const minW = this.minWidth();
            const minH = this.minHeight();
            const newWidth = Math.max(minW, this._resizeStartSize.width + deltaX);
            const newHeight = Math.max(minH, this._resizeStartSize.height + deltaY);

            this.positionChange.emit({
                x: currentPos.x,
                y: currentPos.y,
                width: newWidth,
                height: newHeight,
            });
        };

        const onMouseUp = (): void => {
            this._isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    // #endregion
}
