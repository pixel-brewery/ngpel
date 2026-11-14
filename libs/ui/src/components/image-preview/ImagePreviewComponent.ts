// #region Imports

import { StopEventPropagationDirective } from '../../directives/stop-event-propagation/StopEventPropagationDirective';
import { CdkDrag, CdkDragHandle, type CdkDragEnd, type CdkDragStart, type Point } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, effect, ElementRef, HostListener, inject, viewChild, type Signal } from '@angular/core';
import {
    ButtonComponent,
    Cancel,
    DIALOG_REF,
    DIALOG_REF_DATA,
    IconNameDirective,
    VideoComponent,
    type IDialogRef,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IImagePreviewImage } from './IImagePreviewImage';
import type { IImagePreviewData } from './ImagePreviewData';
import { ImagePreviewDialogSurfaceDirective } from './ImagePreviewDialogSurfaceDirective';

// #endregion

/**
 * Renders a keyboard-accessible overlay for zoomable images and playable videos.
 *
 * @public
 */
@Component({
    selector: 'ngp-image-preview',
    imports: [ButtonComponent, CdkDrag, CdkDragHandle, IconNameDirective, StopEventPropagationDirective, VideoComponent],
    hostDirectives: [ImagePreviewDialogSurfaceDirective],
    template: `
        <section
            #viewerElement
            part="viewer"
            class="fixed inset-0 flex h-dvh w-dvw items-center justify-center overflow-hidden bg-black/85"
            role="dialog"
            aria-modal="true"
            tabindex="-1"
            [attr.aria-label]="labels.viewer"
            (click)="closeFromBackdrop()"
            (keydown.escape)="close()"
        >
            <div
                part="toolbar"
                class="pointer-events-auto absolute inset-x-0 top-0 z-20 flex justify-end gap-2 p-3"
                role="toolbar"
                [ngpStopEventPropagation]="['click']"
            >
                @if (currentImage().mediaKind !== 'video') {
                    <mosaik-button
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [attr.aria-label]="labels.zoomOut"
                        [attr.title]="labels.zoomOut"
                        [disabled]="!canZoomOut()"
                        [iconName]="'zoomOut'"
                        (click)="zoomOut()"
                    />
                    <mosaik-button
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [attr.aria-label]="labels.zoomIn"
                        [attr.title]="labels.zoomIn"
                        [disabled]="!canZoomIn()"
                        [iconName]="'zoomIn'"
                        (click)="zoomIn()"
                    />
                    <mosaik-button
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [attr.aria-label]="labels.rotateLeft"
                        [attr.title]="labels.rotateLeft"
                        [iconName]="'arrowRotateCounterclockwise'"
                        (click)="rotateLeft()"
                    />
                    <mosaik-button
                        [appearance]="'solid'"
                        [variant]="'tertiary'"
                        [attr.aria-label]="labels.rotateRight"
                        [attr.title]="labels.rotateRight"
                        [iconName]="'arrowRotateClockwise'"
                        (click)="rotateRight()"
                    />
                }
                <mosaik-button
                    [appearance]="'solid'"
                    [variant]="'tertiary'"
                    [attr.test-id]="'media-preview-close'"
                    [attr.aria-label]="labels.close"
                    [attr.title]="labels.close"
                    [iconName]="'dismiss'"
                    (click)="close()"
                />
            </div>

            @if (currentImage().mediaKind === 'video') {
                <div
                    part="video-stage"
                    class="pointer-events-auto aspect-video w-[min(90vw,72rem)] max-h-[calc(100dvh-5rem)]"
                    [ngpStopEventPropagation]="['click']"
                >
                    <mosaik-video
                        part="video"
                        [attr.test-id]="'media-preview-video'"
                        class="block h-full w-full"
                        [src]="currentImage().src"
                        [poster]="currentImage().poster ?? undefined"
                        [fit]="'contain'"
                        [ratio]="'16/9'"
                        [showControls]="true"
                        [width]="'100%'"
                        [height]="'100%'"
                        [attr.aria-label]="currentImage().alt ?? labels.viewer"
                    />
                </div>
            } @else {
                <div
                    part="image-stage"
                    class="pointer-events-auto max-h-[calc(100%-5rem)] max-w-[calc(100%-3rem)]"
                    cdkDrag
                    [cdkDragFreeDragPosition]="position()"
                    [ngpStopEventPropagation]="['click']"
                    (cdkDragEnded)="onDragEnded($event)"
                    (cdkDragStarted)="onDragStarted($event)"
                >
                    <img
                        #imageElement
                        part="image"
                        class="block max-h-[calc(100vh-5rem)] max-w-[calc(100vw-3rem)] cursor-grab touch-none object-contain select-none active:cursor-grabbing"
                        cdkDragHandle
                        draggable="false"
                        [attr.alt]="currentImage().alt ?? ''"
                        [attr.height]="currentImage().height ?? null"
                        [attr.src]="currentImage().src"
                        [attr.srcset]="currentImage().srcset ?? null"
                        [attr.width]="currentImage().width ?? null"
                        [style.transform]="transform()"
                    />
                </div>
            }
            @if (canGoPrevious()) {
                <mosaik-button
                    part="previous"
                    class="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2"
                    [appearance]="'soft'"
                    [attr.aria-label]="labels.previous"
                    [attr.title]="labels.previous"
                    [iconName]="'chevronLeft'"
                    [variant]="'tertiary'"
                    (click)="$event.stopPropagation(); previous()"
                />
            }
            @if (canGoNext()) {
                <mosaik-button
                    part="next"
                    class="pointer-events-auto absolute right-3 top-1/2 z-20 -translate-y-1/2"
                    [appearance]="'soft'"
                    [attr.aria-label]="labels.next"
                    [attr.title]="labels.next"
                    [iconName]="'chevronRight'"
                    [variant]="'tertiary'"
                    (click)="$event.stopPropagation(); next()"
                />
            }
        </section>
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fixed inset-0 block h-dvh w-dvw',
    },
})
export class ImagePreviewComponent {
    // #region Fields

    private readonly _data = inject(DIALOG_REF_DATA) as IImagePreviewData;
    private readonly _dialogRef = inject(DIALOG_REF) as IDialogRef<IImagePreviewData>;
    private readonly _imageElement = viewChild<ElementRef<HTMLImageElement>>('imageElement');
    private readonly _videoComponent = viewChild(VideoComponent);
    private readonly _viewerElement = viewChild.required<ElementRef<HTMLElement>>('viewerElement');
    private _positionBeforeDrag: Point = { x: 0, y: 0 };

    // #endregion

    // #region Ctor

    public constructor() {
        effect((onCleanup) => {
            const media = this._data.state.currentImage();
            const component = this._videoComponent();
            if (media.mediaKind !== 'video' || !component) return;

            let cancelled = false;
            let player: HTMLVideoElement | null = null;
            onCleanup(() => {
                cancelled = true;
                player?.pause();
            });

            void (async () => {
                const element = component.elementRef.nativeElement;
                await element.updateComplete;
                if (cancelled) return;

                player = element.shadowRoot?.querySelector<HTMLVideoElement>('video[part="video"]') ?? null;
                if (!player) return;
                this.attachCaptions(player, media);

                if (!cancelled) void component.play().catch(() => undefined);
            })();
        });
    }

    // #endregion

    // #region Properties

    /**
     * Indicates whether another image follows the current image.
     *
     * @public
     * @readonly
     */
    public readonly canGoNext = this._data.state.canGoNext;

    /**
     * Indicates whether another image precedes the current image.
     *
     * @public
     * @readonly
     */
    public readonly canGoPrevious = this._data.state.canGoPrevious;

    /**
     * Indicates whether the image can be enlarged.
     *
     * @public
     * @readonly
     */
    public readonly canZoomIn = this._data.state.canZoomIn;

    /**
     * Indicates whether the image can be reduced.
     *
     * @public
     * @readonly
     */
    public readonly canZoomOut = this._data.state.canZoomOut;

    /**
     * Currently rendered image.
     *
     * @public
     * @readonly
     */
    public readonly currentImage: Signal<IImagePreviewImage> = this._data.state.currentImage;

    /**
     * Resolved preview labels.
     *
     * @public
     * @readonly
     */
    public readonly labels = this._data.labels;

    /**
     * Current free-drag position.
     *
     * @public
     * @readonly
     */
    public readonly position: Signal<Point> = this._data.state.position;

    /**
     * CSS transform applied to the current image.
     *
     * @public
     * @readonly
     */
    public readonly transform = this._data.state.transform;

    // #endregion

    // #region Methods

    /**
     * Selects the next image when available.
     *
     * @public
     */
    public next(): void {
        this._data.state.next();
    }

    /**
     * Selects the previous image when available.
     *
     * @public
     */
    public previous(): void {
        this._data.state.previous();
    }

    /**
     * Selects an image by its zero-based index.
     *
     * @param index - Requested image index.
     * @public
     */
    public select(index: number): void {
        this._data.state.select(index);
    }

    /**
     * Closes the preview explicitly.
     *
     * @protected
     */
    protected close(): void {
        this._dialogRef.close(Cancel.negative());
    }

    /**
     * Closes the preview when the backdrop itself was activated.
     *
     * @param event - Pointer event raised by the viewer surface.
     * @protected
     */
    protected closeFromBackdrop(): void {
        if (this._data.config.backdropClosable) {
            this.close();
        }
    }

    /**
     * Handles image navigation keys inside the active preview.
     *
     * @param event - Keyboard event raised inside the preview.
     * @protected
     */
    @HostListener('keydown', ['$event'])
    protected handleKeydown(event: KeyboardEvent): void {
        if (!this._data.config.keyboard) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            event.stopPropagation();
            this.previous();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            event.stopPropagation();
            this.next();
        }
    }

    /**
     * Stores the final free-drag position.
     *
     * @param event - Completed CDK drag event.
     * @protected
     */
    protected onDragEnded(event: CdkDragEnd): void {
        const imageElement = this._imageElement();
        if (!imageElement) {
            return;
        }

        const imageBounds = imageElement.nativeElement.getBoundingClientRect();
        const viewerBounds = this._viewerElement().nativeElement.getBoundingClientRect();
        const visibleWidth = Math.min(imageBounds.right, viewerBounds.right) - Math.max(imageBounds.left, viewerBounds.left);
        const visibleHeight = Math.min(imageBounds.bottom, viewerBounds.bottom) - Math.max(imageBounds.top, viewerBounds.top);
        const minimumVisibleWidth = Math.min(this._data.config.minimumVisibleSize, imageBounds.width);
        const minimumVisibleHeight = Math.min(this._data.config.minimumVisibleSize, imageBounds.height);
        const imageRemainsVisible = visibleWidth >= minimumVisibleWidth && visibleHeight >= minimumVisibleHeight;

        if (imageRemainsVisible) {
            this._data.state.setPosition(event.source.getFreeDragPosition());
        } else {
            event.source.setFreeDragPosition(this._positionBeforeDrag);
            this._data.state.setPosition(this._positionBeforeDrag);
        }
    }

    /**
     * Remembers the last valid position before a drag begins.
     *
     * @param event - Started CDK drag event.
     * @protected
     */
    protected onDragStarted(event: CdkDragStart): void {
        this._positionBeforeDrag = event.source.getFreeDragPosition();
    }

    /**
     * Rotates the image counter-clockwise.
     *
     * @protected
     */
    protected rotateLeft(): void {
        this._data.state.rotateLeft();
    }

    /**
     * Rotates the image clockwise.
     *
     * @protected
     */
    protected rotateRight(): void {
        this._data.state.rotateRight();
    }

    /**
     * Enlarges the image by the configured step.
     *
     * @protected
     */
    protected zoomIn(): void {
        this._data.state.zoomIn();
    }

    /**
     * Reduces the image by the configured step.
     *
     * @protected
     */
    protected zoomOut(): void {
        this._data.state.zoomOut();
    }

    private attachCaptions(player: HTMLVideoElement, media: IImagePreviewImage): void {
        player.querySelector('track[data-preview-captions]')?.remove();
        if (!media.captions) return;

        // Mosaik Video owns the player but does not yet expose a captions input.
        player.crossOrigin = 'anonymous';
        const track = player.ownerDocument.createElement('track');
        track.dataset['previewCaptions'] = '';
        track.kind = 'captions';
        track.src = media.captions.src;
        track.srclang = media.captions.language;
        track.label = media.captions.label;
        track.default = true;
        player.append(track);
        player.load();
    }

    // #endregion
}
