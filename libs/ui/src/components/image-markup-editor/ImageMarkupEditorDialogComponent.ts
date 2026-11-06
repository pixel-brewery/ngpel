// #region Imports

import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    Injector,
    signal,
    type Signal,
    viewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormField, type FieldTree, form } from '@angular/forms/signals';
import {
    ActionbarComponent,
    ActionbarGroupComponent,
    ActionbarItemComponent,
    ActionbarSeparatorComponent,
    AnimateDirective,
    ButtonComponent,
    Cancel,
    DesignerCanvasComponent,
    DesignerComponent,
    DesignerContentComponent,
    DesignerFrameComponent,
    DIALOG_REF,
    DIALOG_REF_DATA,
    DialogContentDirective,
    DialogFooterDirective,
    DialogHeaderComponent,
    DialogHeaderDirective,
    FormFieldComponent,
    FormFieldDirective,
    FormFieldStateDirective,
    IconNameDirective,
    PressButtonComponent,
    SkeletonComponent,
    TextBoxComponent,
    ToggleButtonComponent,
    TooltipDirective,
    type IDialogRef,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IImageMarkupEditorDialogData } from './IImageMarkupEditorDialogData';
import type { IImageMarkupEditorLabels } from './IImageMarkupEditorLabels';
import { ImageMarkupCanvasDirective } from './ImageMarkupCanvasDirective';
import { ImageMarkupSymbol } from './ImageMarkupSymbol';
import type { ImageMarkupSymbolValue } from './ImageMarkupSymbolValue';
import { ImageMarkupTool } from './ImageMarkupTool';
import type { ImageMarkupToolValue } from './ImageMarkupToolValue';

// #endregion

interface IImageMarkupEditorControls {
    color: string;
    fontSize: number;
    strokeWidth: number;
    symbol: ImageMarkupSymbolValue;
    text: string;
}

interface IImageMarkupColorOption {
    readonly value: string;
}

interface IImageMarkupSymbolOption {
    readonly iconName: string;
    readonly value: ImageMarkupSymbolValue;
}

const ImageMarkupEditorOption = {
    COLOR: 'color',
    FONT_SIZE: 'font-size',
    STROKE_WIDTH: 'stroke-width',
    SYMBOL: 'symbol',
    TEXT: 'text',
} as const;
type ImageMarkupEditorOptionValue = (typeof ImageMarkupEditorOption)[keyof typeof ImageMarkupEditorOption];

const COLOR_OPTIONS: ReadonlyArray<IImageMarkupColorOption> = [
    { value: '#ef4444' },
    { value: '#f97316' },
    { value: '#eab308' },
    { value: '#22c55e' },
    { value: '#0ea5e9' },
    { value: '#8b5cf6' },
    { value: '#ffffff' },
    { value: '#111827' },
];
const FONT_SIZE_OPTIONS: ReadonlyArray<number> = [24, 36, 48, 64, 96, 128];
const STROKE_WIDTH_OPTIONS: ReadonlyArray<number> = [2, 4, 6, 8, 12, 16, 24];
const SYMBOL_OPTIONS: ReadonlyArray<IImageMarkupSymbolOption> = [
    { value: ImageMarkupSymbol.CHECKMARK, iconName: 'checkmark' },
    { value: ImageMarkupSymbol.CROSS, iconName: 'dismiss' },
    { value: ImageMarkupSymbol.EXCLAMATION, iconName: 'warning' },
    { value: ImageMarkupSymbol.QUESTION, iconName: 'bookQuestionMark' },
    { value: ImageMarkupSymbol.STAR, iconName: 'sparkle' },
];

const SHAPE_TOOLS: ReadonlyArray<ImageMarkupToolValue> = [ImageMarkupTool.LINE, ImageMarkupTool.ARROW, ImageMarkupTool.RECTANGLE, ImageMarkupTool.ELLIPSE];
const STROKE_WIDTH_TOOLS: ReadonlyArray<ImageMarkupToolValue> = [
    ImageMarkupTool.PEN,
    ImageMarkupTool.HIGHLIGHTER,
    ImageMarkupTool.ERASER,
    ImageMarkupTool.LINE,
    ImageMarkupTool.ARROW,
    ImageMarkupTool.RECTANGLE,
    ImageMarkupTool.ELLIPSE,
    ImageMarkupTool.SYMBOL,
];
const IMAGE_FIT_PADDING = 32;
const MAXIMUM_FIT_ZOOM = 1;
const MINIMUM_FIT_ZOOM = 0.01;

/**
 * Renders the localized, feature-neutral image markup editor dialog.
 *
 * @public
 */
@Component({
    selector: 'ngp-image-markup-editor-dialog',
    imports: [
        ActionbarComponent,
        ActionbarGroupComponent,
        ActionbarItemComponent,
        ActionbarSeparatorComponent,
        AnimateDirective,
        ButtonComponent,
        PressButtonComponent,
        DesignerCanvasComponent,
        DesignerComponent,
        DesignerContentComponent,
        DesignerFrameComponent,
        DialogContentDirective,
        DialogFooterDirective,
        DialogHeaderComponent,
        DialogHeaderDirective,
        FormField,
        FormFieldComponent,
        FormFieldDirective,
        FormFieldStateDirective,
        IconNameDirective,
        ImageMarkupCanvasDirective,
        SkeletonComponent,
        TextBoxComponent,
        TooltipDirective,
        ToggleButtonComponent,
    ],
    template: `
        <ng-template mosaikDialogHeader>
            <mosaik-dialog-header [text]="labels.title" [subText]="labels.description" />
        </ng-template>

        <ng-template mosaikDialogContent>
            <div part="root" class="absolute inset-0 flex min-h-0 flex-col overflow-hidden">
                <div part="canvas-surface" class="relative flex min-h-0 flex-1 overflow-hidden bg-(--mosaik-scheme-surface)">
                    @if (canvas()?.isLoading()) {
                        <mosaik-skeleton class="absolute inset-2 z-20" [height]="'100%'" [width]="'100%'" [shimmer]="true" />
                    }

                    <mosaik-designer
                        class="min-h-0 min-w-0"
                        [frameSize]="{ width: canvas()?.viewportWidth() || 1024, height: canvas()?.viewportHeight() || 768 }"
                        [mode]="'none'"
                    >
                        <mosaik-designer-content class="min-h-0 min-w-0">
                            <mosaik-designer-canvas class="min-h-0 min-w-0" [interactionMode]="canvasInteractionMode()" [minZoom]="0.01" [maxZoom]="8">
                                <mosaik-designer-frame class="block">
                                    <div
                                        class="relative block overflow-hidden shadow-md"
                                        [style.width.px]="canvas()?.viewportWidth() || null"
                                        [style.height.px]="canvas()?.viewportHeight() || null"
                                    >
                                        <div
                                            class="absolute"
                                            [style.left.px]="-(canvas()?.viewportLeft() || 0)"
                                            [style.top.px]="-(canvas()?.viewportTop() || 0)"
                                        >
                                            <canvas
                                                ngpImageMarkupCanvas
                                                part="canvas"
                                                class="block bg-(--mosaik-scheme-background)"
                                                tabindex="0"
                                                role="img"
                                                [attr.aria-label]="labels.canvasLabel"
                                                [class.cursor-crosshair]="activeTool() !== availableTools.PAN"
                                                [class.cursor-grab]="activeTool() === availableTools.PAN"
                                                [class.invisible]="!canvas()?.isReady()"
                                                [sourceUrl]="previewUrl"
                                                [outputFileName]="outputFileName"
                                                [maximumSourcePixels]="maximumSourcePixels"
                                                [historyLimit]="historyLimit"
                                                [tool]="activeTool()"
                                                [color]="form.color().value()"
                                                [strokeWidth]="form.strokeWidth().value()"
                                                [fontSize]="form.fontSize().value()"
                                                [text]="form.text().value()"
                                                [symbol]="form.symbol().value()"
                                                (editorError)="onEditorError($event)"
                                                (sourceReady)="onSourceReady()"
                                                (textPlacementRejected)="onTextPlacementRejected()"
                                                (viewportChanged)="onViewportChanged()"
                                            ></canvas>

                                            @if (activeTool() === availableTools.CROP && canvas()?.cropPreviewSelection(); as selection) {
                                                <div
                                                    class="pointer-events-none absolute border-2 border-(--mosaik-scheme-primary) shadow-[0_0_0_9999px_rgb(0_0_0/0.38)]"
                                                    [style.left.px]="selection.left"
                                                    [style.top.px]="selection.top"
                                                    [style.width.px]="selection.width"
                                                    [style.height.px]="selection.height"
                                                ></div>
                                            }
                                        </div>
                                    </div>
                                </mosaik-designer-frame>
                            </mosaik-designer-canvas>
                        </mosaik-designer-content>

                        <div
                            slot="after-content"
                            part="toolbars"
                            class="pointer-events-none absolute bottom-4 left-1/2 z-30 flex max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center gap-2"
                        >
                            @for (contextKey of optionValuesAnimationKeys(); track contextKey) {
                                @if (showsOptionValues()) {
                                    <div
                                        part="tool-option-values"
                                        class="pointer-events-auto max-w-full overflow-x-auto rounded-xl bg-(--mosaik-scheme-surface) shadow-xl backdrop-blur-md scrollbar-thin"
                                        [mosaikAnimate]="'fadeSlideInBottom'"
                                        [mosaikAnimateOptions]="{ duration: 160 }"
                                    >
                                        <mosaik-actionbar
                                            style="--actionbar-min-height: 60px"
                                            [orientation]="'horizontal'"
                                            [overflow]="'visible'"
                                            [attr.aria-label]="labels.tools"
                                        >
                                            @switch (activeOption()) {
                                                @case (availableOptions.COLOR) {
                                                    <mosaik-actionbar-group>
                                                        @for (colorOption of colorOptions; track colorOption.value) {
                                                            <mosaik-actionbar-item [selected]="form.color().value() === colorOption.value">
                                                                <mosaik-toggle-button
                                                                    [appearance]="'plain'"
                                                                    [variant]="'neutral'"
                                                                    [isChecked]="form.color().value() === colorOption.value"
                                                                    [attr.aria-label]="labels.color + ': ' + colorOption.value"
                                                                    [mosaikTooltip]="labels.color + ': ' + colorOption.value"
                                                                    (click)="selectColor(colorOption.value)"
                                                                >
                                                                    <span
                                                                        slot="icon"
                                                                        class="block size-5 rounded-full border border-(--mosaik-scheme-highlight)"
                                                                        [style.background-color]="colorOption.value"
                                                                    ></span>
                                                                </mosaik-toggle-button>
                                                            </mosaik-actionbar-item>
                                                        }
                                                    </mosaik-actionbar-group>
                                                }
                                                @case (availableOptions.STROKE_WIDTH) {
                                                    <mosaik-actionbar-group>
                                                        @for (strokeWidth of strokeWidthOptions; track strokeWidth) {
                                                            <mosaik-actionbar-item [selected]="form.strokeWidth().value() === strokeWidth">
                                                                <mosaik-toggle-button
                                                                    class="min-w-[40px]"
                                                                    style="height: 40px"
                                                                    [label]="strokeWidth.toString()"
                                                                    [appearance]="'plain'"
                                                                    [variant]="'neutral'"
                                                                    [isChecked]="form.strokeWidth().value() === strokeWidth"
                                                                    [horizontalContentAlignment]="'center'"
                                                                    [verticalContentAlignment]="'center'"
                                                                    [attr.aria-label]="labels.strokeWidth + ': ' + strokeWidth"
                                                                    [mosaikTooltip]="labels.strokeWidth + ': ' + strokeWidth"
                                                                    (click)="selectStrokeWidth(strokeWidth)"
                                                                />
                                                            </mosaik-actionbar-item>
                                                        }
                                                    </mosaik-actionbar-group>
                                                }
                                                @case (availableOptions.FONT_SIZE) {
                                                    <mosaik-actionbar-group>
                                                        @for (fontSize of fontSizeOptions; track fontSize) {
                                                            <mosaik-actionbar-item [selected]="form.fontSize().value() === fontSize">
                                                                <mosaik-toggle-button
                                                                    class="min-w-[40px]"
                                                                    style="height: 40px"
                                                                    [label]="fontSize.toString()"
                                                                    [appearance]="'plain'"
                                                                    [variant]="'neutral'"
                                                                    [isChecked]="form.fontSize().value() === fontSize"
                                                                    [horizontalContentAlignment]="'center'"
                                                                    [verticalContentAlignment]="'center'"
                                                                    [attr.aria-label]="labels.fontSize + ': ' + fontSize"
                                                                    [mosaikTooltip]="labels.fontSize + ': ' + fontSize"
                                                                    (click)="selectFontSize(fontSize)"
                                                                />
                                                            </mosaik-actionbar-item>
                                                        }
                                                    </mosaik-actionbar-group>
                                                }
                                                @case (availableOptions.TEXT) {
                                                    <mosaik-actionbar-group>
                                                        <mosaik-actionbar-item [grow]="true">
                                                            <mosaik-form-field class="w-80 max-w-[72vw]" [fieldState]="form.text()">
                                                                <mosaik-textbox
                                                                    [formField]="form.text"
                                                                    [label]="labels.text"
                                                                    [placeholder]="labels.textPlaceholder"
                                                                    [multiline]="true"
                                                                    [multilineRows]="2"
                                                                    [multilineMaxRows]="4"
                                                                    [variant]="'primary'"
                                                                    (focusout)="closeTextOption()"
                                                                />
                                                            </mosaik-form-field>
                                                        </mosaik-actionbar-item>
                                                    </mosaik-actionbar-group>
                                                }
                                                @case (availableOptions.SYMBOL) {
                                                    <mosaik-actionbar-group>
                                                        @for (symbolOption of symbolOptions; track symbolOption.value) {
                                                            <mosaik-actionbar-item [selected]="form.symbol().value() === symbolOption.value">
                                                                <mosaik-toggle-button
                                                                    [iconName]="symbolOption.iconName"
                                                                    [appearance]="'plain'"
                                                                    [variant]="'neutral'"
                                                                    [isChecked]="form.symbol().value() === symbolOption.value"
                                                                    [attr.aria-label]="getSymbolLabel(symbolOption.value)"
                                                                    [mosaikTooltip]="getSymbolLabel(symbolOption.value)"
                                                                    (click)="selectSymbol(symbolOption.value)"
                                                                />
                                                            </mosaik-actionbar-item>
                                                        }
                                                    </mosaik-actionbar-group>
                                                }
                                            }
                                        </mosaik-actionbar>
                                    </div>
                                }
                            }
                            @for (contextTool of toolOptionsAnimationKeys(); track contextTool) {
                                @if (contextTool === availableTools.PAN) {
                                    <div
                                        part="tool-options"
                                        class="pointer-events-auto max-w-full overflow-x-auto rounded-xl bg-(--mosaik-scheme-surface) shadow-xl backdrop-blur-md scrollbar-thin"
                                        [mosaikAnimate]="'fadeSlideInBottom'"
                                        [mosaikAnimateOptions]="{ duration: 160 }"
                                    >
                                        <mosaik-actionbar [orientation]="'horizontal'" [overflow]="'visible'" [attr.aria-label]="labels.tools">
                                            <mosaik-actionbar-group>
                                                <mosaik-actionbar-item>
                                                    <mosaik-button
                                                        [iconName]="'zoomOut'"
                                                        [appearance]="'plain'"
                                                        [attr.aria-label]="labels.zoomOut"
                                                        [mosaikTooltip]="labels.zoomOut"
                                                        (click)="zoomOut()"
                                                    />
                                                </mosaik-actionbar-item>
                                                <mosaik-actionbar-item>
                                                    <mosaik-button
                                                        [iconName]="'arrowReset'"
                                                        [appearance]="'plain'"
                                                        [attr.aria-label]="labels.resetView"
                                                        [mosaikTooltip]="labels.resetView"
                                                        (click)="resetView()"
                                                    />
                                                </mosaik-actionbar-item>
                                                <mosaik-actionbar-item>
                                                    <mosaik-button
                                                        [iconName]="'zoomIn'"
                                                        [appearance]="'plain'"
                                                        [attr.aria-label]="labels.zoomIn"
                                                        [mosaikTooltip]="labels.zoomIn"
                                                        (click)="zoomIn()"
                                                    />
                                                </mosaik-actionbar-item>
                                            </mosaik-actionbar-group>
                                        </mosaik-actionbar>
                                    </div>
                                } @else if (showsToolOptions()) {
                                    <div
                                        part="tool-options"
                                        class="pointer-events-auto max-w-full overflow-x-auto rounded-xl bg-(--mosaik-scheme-surface) shadow-xl backdrop-blur-md scrollbar-thin"
                                        [mosaikAnimate]="'fadeSlideInBottom'"
                                        [mosaikAnimateOptions]="{ duration: 160 }"
                                    >
                                        <mosaik-actionbar [orientation]="'horizontal'" [overflow]="'visible'" [attr.aria-label]="labels.tools">
                                            @if (activeTool() === availableTools.TEXT || activeTool() === availableTools.SYMBOL) {
                                                <mosaik-actionbar-group>
                                                    @if (activeTool() === availableTools.TEXT) {
                                                        <mosaik-actionbar-item [selected]="activeOption() === availableOptions.TEXT">
                                                            <mosaik-toggle-button
                                                                [iconName]="'typography'"
                                                                [appearance]="'plain'"
                                                                [variant]="'neutral'"
                                                                [isChecked]="activeOption() === availableOptions.TEXT"
                                                                [attr.aria-label]="labels.text"
                                                                [mosaikTooltip]="labels.text"
                                                                (click)="selectOption(availableOptions.TEXT)"
                                                            />
                                                        </mosaik-actionbar-item>
                                                    } @else {
                                                        <mosaik-actionbar-item [selected]="activeOption() === availableOptions.SYMBOL">
                                                            <mosaik-toggle-button
                                                                [iconName]="'emoji'"
                                                                [appearance]="'plain'"
                                                                [variant]="'neutral'"
                                                                [isChecked]="activeOption() === availableOptions.SYMBOL"
                                                                [attr.aria-label]="labels.symbolType"
                                                                [mosaikTooltip]="labels.symbolType"
                                                                (click)="selectOption(availableOptions.SYMBOL)"
                                                            />
                                                        </mosaik-actionbar-item>
                                                    }
                                                    <mosaik-actionbar-item [selected]="activeOption() === availableOptions.FONT_SIZE">
                                                        <mosaik-toggle-button
                                                            [iconName]="'textHeader1'"
                                                            [appearance]="'plain'"
                                                            [variant]="'neutral'"
                                                            [isChecked]="activeOption() === availableOptions.FONT_SIZE"
                                                            [attr.aria-label]="labels.fontSize"
                                                            [mosaikTooltip]="labels.fontSize"
                                                            (click)="selectOption(availableOptions.FONT_SIZE)"
                                                        />
                                                    </mosaik-actionbar-item>
                                                </mosaik-actionbar-group>
                                                <mosaik-actionbar-separator />
                                            }

                                            <mosaik-actionbar-group>
                                                @if (supportsColor()) {
                                                    <mosaik-actionbar-item [selected]="activeOption() === availableOptions.COLOR">
                                                        <mosaik-toggle-button
                                                            [iconName]="'color'"
                                                            [appearance]="'plain'"
                                                            [variant]="'neutral'"
                                                            [isChecked]="activeOption() === availableOptions.COLOR"
                                                            [attr.aria-label]="labels.color"
                                                            [mosaikTooltip]="labels.color"
                                                            (click)="selectOption(availableOptions.COLOR)"
                                                        />
                                                    </mosaik-actionbar-item>
                                                }
                                                @if (supportsStrokeWidth()) {
                                                    <mosaik-actionbar-item [selected]="activeOption() === availableOptions.STROKE_WIDTH">
                                                        <mosaik-toggle-button
                                                            [iconName]="'lineThickness'"
                                                            [appearance]="'plain'"
                                                            [variant]="'neutral'"
                                                            [isChecked]="activeOption() === availableOptions.STROKE_WIDTH"
                                                            [attr.aria-label]="labels.strokeWidth"
                                                            [mosaikTooltip]="labels.strokeWidth"
                                                            (click)="selectOption(availableOptions.STROKE_WIDTH)"
                                                        />
                                                    </mosaik-actionbar-item>
                                                }
                                            </mosaik-actionbar-group>
                                        </mosaik-actionbar>
                                    </div>
                                }
                            }
                            @if (shapeToolsVisible()) {
                                <div
                                    part="shape-tools"
                                    class="pointer-events-auto max-w-full overflow-x-auto rounded-xl bg-(--mosaik-scheme-surface) shadow-xl backdrop-blur-md scrollbar-thin"
                                    [mosaikAnimate]="'fadeSlideInBottom'"
                                    [mosaikAnimateOptions]="{ duration: 160 }"
                                >
                                    <mosaik-actionbar [orientation]="'horizontal'" [overflow]="'visible'" [attr.aria-label]="labels.shapes">
                                        <mosaik-actionbar-group>
                                            <mosaik-actionbar-item [selected]="activeTool() === availableTools.LINE">
                                                <mosaik-toggle-button
                                                    [iconName]="'lineHorizontal1'"
                                                    [appearance]="'plain'"
                                                    [variant]="'neutral'"
                                                    [isChecked]="activeTool() === availableTools.LINE"
                                                    [attr.aria-label]="labels.line"
                                                    [mosaikTooltip]="labels.line"
                                                    (click)="selectTool(availableTools.LINE)"
                                                />
                                            </mosaik-actionbar-item>
                                            <mosaik-actionbar-item [selected]="activeTool() === availableTools.ARROW">
                                                <mosaik-toggle-button
                                                    [iconName]="'arrowRight'"
                                                    [appearance]="'plain'"
                                                    [variant]="'neutral'"
                                                    [isChecked]="activeTool() === availableTools.ARROW"
                                                    [attr.aria-label]="labels.arrow"
                                                    [mosaikTooltip]="labels.arrow"
                                                    (click)="selectTool(availableTools.ARROW)"
                                                />
                                            </mosaik-actionbar-item>
                                            <mosaik-actionbar-item [selected]="activeTool() === availableTools.RECTANGLE">
                                                <mosaik-toggle-button
                                                    [iconName]="'rectangle'"
                                                    [appearance]="'plain'"
                                                    [variant]="'neutral'"
                                                    [isChecked]="activeTool() === availableTools.RECTANGLE"
                                                    [attr.aria-label]="labels.rectangle"
                                                    [mosaikTooltip]="labels.rectangle"
                                                    (click)="selectTool(availableTools.RECTANGLE)"
                                                />
                                            </mosaik-actionbar-item>
                                            <mosaik-actionbar-item [selected]="activeTool() === availableTools.ELLIPSE">
                                                <mosaik-toggle-button
                                                    [iconName]="'circle'"
                                                    [appearance]="'plain'"
                                                    [variant]="'neutral'"
                                                    [isChecked]="activeTool() === availableTools.ELLIPSE"
                                                    [attr.aria-label]="labels.ellipse"
                                                    [mosaikTooltip]="labels.ellipse"
                                                    (click)="selectTool(availableTools.ELLIPSE)"
                                                />
                                            </mosaik-actionbar-item>
                                        </mosaik-actionbar-group>
                                    </mosaik-actionbar>
                                </div>
                            }

                            <div
                                part="actionbar"
                                class="pointer-events-auto max-w-full overflow-x-auto rounded-xl bg-(--mosaik-scheme-surface) shadow-xl backdrop-blur-md scrollbar-thin"
                            >
                                <mosaik-actionbar [orientation]="'horizontal'" [overflow]="'visible'" [attr.aria-label]="labels.tools">
                                    <mosaik-actionbar-group>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.PAN">
                                            <mosaik-toggle-button
                                                [iconName]="'hand'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.PAN"
                                                [attr.aria-label]="labels.pan"
                                                [mosaikTooltip]="labels.pan"
                                                (click)="selectTool(availableTools.PAN)"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.CROP">
                                            <mosaik-toggle-button
                                                [iconName]="'crop'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.CROP"
                                                [attr.aria-label]="labels.crop"
                                                [mosaikTooltip]="labels.crop"
                                                (click)="selectTool(availableTools.CROP)"
                                            />
                                        </mosaik-actionbar-item>
                                    </mosaik-actionbar-group>

                                    <mosaik-actionbar-separator />

                                    <mosaik-actionbar-group>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.PEN">
                                            <mosaik-toggle-button
                                                [iconName]="'inking'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.PEN"
                                                [attr.aria-label]="labels.pen"
                                                [mosaikTooltip]="labels.pen"
                                                (click)="selectTool(availableTools.PEN)"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.HIGHLIGHTER">
                                            <mosaik-toggle-button
                                                [iconName]="'highlight'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.HIGHLIGHTER"
                                                [attr.aria-label]="labels.highlighter"
                                                [mosaikTooltip]="labels.highlighter"
                                                (click)="selectTool(availableTools.HIGHLIGHTER)"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.ERASER">
                                            <mosaik-toggle-button
                                                [iconName]="'eraser'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.ERASER"
                                                [attr.aria-label]="labels.eraser"
                                                [mosaikTooltip]="labels.eraser"
                                                (click)="selectTool(availableTools.ERASER)"
                                            />
                                        </mosaik-actionbar-item>
                                    </mosaik-actionbar-group>

                                    <mosaik-actionbar-separator />

                                    <mosaik-actionbar-group>
                                        <mosaik-actionbar-item [selected]="shapeToolsVisible() || isShapeTool()">
                                            <mosaik-toggle-button
                                                [iconName]="'symbols'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="shapeToolsVisible()"
                                                [attr.aria-label]="labels.shapes"
                                                [mosaikTooltip]="labels.shapes"
                                                (click)="toggleShapeTools()"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.TEXT">
                                            <mosaik-toggle-button
                                                [iconName]="'typography'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.TEXT"
                                                [attr.aria-label]="labels.text"
                                                [mosaikTooltip]="labels.text"
                                                (click)="selectTool(availableTools.TEXT)"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [selected]="activeTool() === availableTools.SYMBOL">
                                            <mosaik-toggle-button
                                                [iconName]="'emoji'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [isChecked]="activeTool() === availableTools.SYMBOL"
                                                [attr.aria-label]="labels.symbol"
                                                [mosaikTooltip]="labels.symbol"
                                                (click)="selectTool(availableTools.SYMBOL)"
                                            />
                                        </mosaik-actionbar-item>
                                    </mosaik-actionbar-group>

                                    <mosaik-actionbar-separator />

                                    <mosaik-actionbar-group>
                                        <mosaik-actionbar-item [disabled]="!canvas()?.canUndo()">
                                            <mosaik-button
                                                [iconName]="'arrowUndo'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [disabled]="!canvas()?.canUndo()"
                                                [attr.aria-label]="labels.undo"
                                                [mosaikTooltip]="labels.undo"
                                                (click)="undo()"
                                            />
                                        </mosaik-actionbar-item>
                                        <mosaik-actionbar-item [disabled]="!canvas()?.canRedo()">
                                            <mosaik-button
                                                [iconName]="'arrowRedo'"
                                                [appearance]="'plain'"
                                                [variant]="'neutral'"
                                                [disabled]="!canvas()?.canRedo()"
                                                [attr.aria-label]="labels.redo"
                                                [mosaikTooltip]="labels.redo"
                                                (click)="redo()"
                                            />
                                        </mosaik-actionbar-item>
                                    </mosaik-actionbar-group>
                                    <mosaik-actionbar-separator />
                                    <mosaik-actionbar-group>
                                        <mosaik-actionbar-item [disabled]="!canvas()?.hasChanges()">
                                            <mosaik-press-button
                                                [iconName]="'delete'"
                                                [appearance]="'plain'"
                                                [variant]="'danger'"
                                                [disabled]="!canvas()?.hasChanges()"
                                                [attr.aria-label]="labels.clear"
                                                [mosaikTooltip]="labels.clear"
                                                (pressed)="clear()"
                                            />
                                        </mosaik-actionbar-item>
                                    </mosaik-actionbar-group>
                                </mosaik-actionbar>
                            </div>
                        </div>
                    </mosaik-designer>
                </div>

                @if (errorMessage(); as message) {
                    <p part="error" class="m-0 text-sm text-(--mosaik-scheme-error)" role="alert">{{ message }}</p>
                }
            </div>
        </ng-template>

        <ng-template mosaikDialogFooter>
            <div part="footer" class="flex w-full items-center justify-end gap-2">
                <mosaik-button [label]="labels.cancel" [appearance]="'plain'" [mosaikTooltip]="labels.cancel" (click)="cancel()" />
                <mosaik-button
                    [label]="labels.apply"
                    [appearance]="'solid'"
                    [variant]="'primary'"
                    [isBusy]="isExporting()"
                    [mosaikTooltip]="labels.apply"
                    (click)="apply()"
                />
            </div>
        </ng-template>
    `,
    styles: `
        ngp-image-markup-editor-dialog {
            display: block;
        }

        mosaik-dialog-content:has(> ngp-image-markup-editor-dialog)::part(scroll) {
            height: 100%;
            min-height: 0;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ImageMarkupEditorDialogComponent {
    // #region Fields

    private readonly _data: IImageMarkupEditorDialogData = inject(DIALOG_REF_DATA) as IImageMarkupEditorDialogData;
    private readonly _dialogRef: IDialogRef<IImageMarkupEditorDialogData, File> = inject(DIALOG_REF) as IDialogRef<IImageMarkupEditorDialogData, File>;
    private readonly _injector = inject(Injector);
    private readonly _activeTool = signal<ImageMarkupToolValue>(ImageMarkupTool.PAN);
    private readonly _activeOption = signal<ImageMarkupEditorOptionValue | null>(null);
    private readonly _errorMessage = signal<string | null>(null);
    private readonly _isExporting = signal(false);
    private readonly _shapeToolsVisible = signal(false);
    private readonly _form: FieldTree<IImageMarkupEditorControls> = form(
        signal<IImageMarkupEditorControls>({
            color: '#ef4444',
            strokeWidth: 6,
            fontSize: 36,
            text: '',
            symbol: ImageMarkupSymbol.CHECKMARK,
        }),
    );
    private readonly _canvasInteractionMode = computed(() => (this._activeTool() === ImageMarkupTool.PAN ? ('pan' as const) : ('pointer' as const)));
    private readonly _isShapeTool = computed(() => this.isShapeToolValue(this._activeTool()));
    private readonly _showsToolOptions = computed(
        () => this._activeTool() !== ImageMarkupTool.CROP && this._activeTool() !== ImageMarkupTool.PAN && (!this._shapeToolsVisible() || this._isShapeTool()),
    );
    private readonly _showsOptionValues = computed(() => {
        const activeOption = this._activeOption();

        return this._showsToolOptions() && activeOption !== null && this.isOptionSupported(activeOption);
    });
    private readonly _supportsColor = computed(
        () => this._activeTool() !== ImageMarkupTool.CROP && this._activeTool() !== ImageMarkupTool.PAN && this._activeTool() !== ImageMarkupTool.ERASER,
    );
    private readonly _supportsFontSize = computed(() => this._activeTool() === ImageMarkupTool.TEXT || this._activeTool() === ImageMarkupTool.SYMBOL);
    private readonly _supportsStrokeWidth = computed(() => STROKE_WIDTH_TOOLS.includes(this._activeTool()));
    private readonly _optionValuesAnimationKeys = computed<ReadonlyArray<string>>(() => [`${this._activeTool()}:${this._activeOption() ?? 'none'}`]);
    private readonly _toolOptionsAnimationKeys = computed<ReadonlyArray<ImageMarkupToolValue>>(() => [this._activeTool()]);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Canvas directive owning the editor document and renderer.
     *
     * @protected
     * @readonly
     */
    protected readonly canvas = viewChild(ImageMarkupCanvasDirective);

    /**
     * Mosaik drawing-board canvas owning pan and zoom interaction.
     *
     * @protected
     * @readonly
     */
    protected readonly designerCanvas = viewChild(DesignerCanvasComponent);

    /**
     * Tool constants available to the template.
     *
     * @protected
     * @readonly
     */
    protected readonly availableTools = ImageMarkupTool;

    /**
     * Symbol constants available to the template.
     *
     * @protected
     * @readonly
     */
    protected readonly availableSymbols = ImageMarkupSymbol;

    /**
     * Contextual option constants available to the template.
     *
     * @protected
     * @readonly
     */
    protected readonly availableOptions = ImageMarkupEditorOption;

    /**
     * Fixed drawing colors available to the editor.
     *
     * @protected
     * @readonly
     */
    protected readonly colorOptions = COLOR_OPTIONS;

    /**
     * Fixed text and symbol sizes available to the editor.
     *
     * @protected
     * @readonly
     */
    protected readonly fontSizeOptions = FONT_SIZE_OPTIONS;

    /**
     * Fixed drawing widths available to the editor.
     *
     * @protected
     * @readonly
     */
    protected readonly strokeWidthOptions = STROKE_WIDTH_OPTIONS;

    /**
     * Fixed symbols available to the editor.
     *
     * @protected
     * @readonly
     */
    protected readonly symbolOptions = SYMBOL_OPTIONS;

    /**
     * Current editor tool.
     *
     * @protected
     * @readonly
     */
    protected readonly activeTool: Signal<ImageMarkupToolValue> = this._activeTool.asReadonly();

    /**
     * Current contextual option level.
     *
     * @protected
     * @readonly
     */
    protected readonly activeOption: Signal<ImageMarkupEditorOptionValue | null> = this._activeOption.asReadonly();

    /**
     * Interaction mode delegated to the Mosaik designer canvas.
     *
     * @protected
     * @readonly
     */
    protected readonly canvasInteractionMode = this._canvasInteractionMode;

    /**
     * Indicates whether a shape tool is selected.
     *
     * @protected
     * @readonly
     */
    protected readonly isShapeTool = this._isShapeTool;

    /**
     * Indicates whether the first contextual shape-tool level is visible.
     *
     * @protected
     * @readonly
     */
    protected readonly shapeToolsVisible: Signal<boolean> = this._shapeToolsVisible.asReadonly();

    /**
     * Indicates whether the contextual action bar is visible.
     *
     * @protected
     * @readonly
     */
    protected readonly showsToolOptions = this._showsToolOptions;

    /**
     * Indicates whether the selected option's fixed value palette is visible.
     *
     * @protected
     * @readonly
     */
    protected readonly showsOptionValues = this._showsOptionValues;

    /**
     * Recreates a value palette when its owning tool or option changes.
     *
     * @protected
     * @readonly
     */
    protected readonly optionValuesAnimationKeys = this._optionValuesAnimationKeys;

    /**
     * Recreates contextual tool options when the active tool changes.
     *
     * @protected
     * @readonly
     */
    protected readonly toolOptionsAnimationKeys = this._toolOptionsAnimationKeys;

    /**
     * Indicates whether the active tool accepts a color.
     *
     * @protected
     * @readonly
     */
    protected readonly supportsColor = this._supportsColor;

    /**
     * Indicates whether the active tool accepts text or symbol sizing.
     *
     * @protected
     * @readonly
     */
    protected readonly supportsFontSize = this._supportsFontSize;

    /**
     * Indicates whether the active tool accepts a stroke width.
     *
     * @protected
     * @readonly
     */
    protected readonly supportsStrokeWidth = this._supportsStrokeWidth;

    /**
     * Current localized error message.
     *
     * @protected
     * @readonly
     */
    protected readonly errorMessage: Signal<string | null> = this._errorMessage.asReadonly();

    /**
     * Indicates whether PNG export is running.
     *
     * @protected
     * @readonly
     */
    protected readonly isExporting: Signal<boolean> = this._isExporting.asReadonly();

    /**
     * Localized editor labels.
     *
     * @protected
     * @readonly
     */
    protected readonly labels: IImageMarkupEditorLabels = this._data.labels;

    /**
     * Source image browser URL.
     *
     * @protected
     * @readonly
     */
    protected readonly previewUrl: string = this._data.previewUrl;

    /**
     * PNG output file name.
     *
     * @protected
     * @readonly
     */
    protected readonly outputFileName: string = this._data.outputFileName;

    /**
     * Maximum accepted source-image pixels.
     *
     * @protected
     * @readonly
     */
    protected readonly maximumSourcePixels: number = this._data.maximumSourcePixels;

    /**
     * Maximum undo history depth.
     *
     * @protected
     * @readonly
     */
    protected readonly historyLimit: number = this._data.historyLimit;

    /**
     * Signal form containing neutral editor controls.
     *
     * @protected
     * @readonly
     */
    protected get form(): FieldTree<IImageMarkupEditorControls> {
        return this._form;
    }

    // #endregion

    // #region Methods

    protected selectTool(tool: ImageMarkupToolValue): void {
        this._activeTool.set(tool);
        this._activeOption.set(null);
        this._shapeToolsVisible.set(this.isShapeToolValue(tool));
        this._errorMessage.set(null);
    }

    protected toggleShapeTools(): void {
        if (!this.isShapeToolValue(this._activeTool())) {
            this._activeOption.set(null);
        }
        this._shapeToolsVisible.update((isVisible) => !isVisible);
        this._errorMessage.set(null);
    }

    protected selectOption(option: ImageMarkupEditorOptionValue): void {
        if (!this.isOptionSupported(option)) {
            return;
        }

        this._activeOption.update((activeOption) => (activeOption === option ? null : option));
        this._errorMessage.set(null);
    }

    protected selectColor(color: string): void {
        if (!this._supportsColor() || !COLOR_OPTIONS.some((option) => option.value === color)) {
            return;
        }

        this._form.color().value.set(color);
        this._activeOption.set(null);
        this._errorMessage.set(null);
    }

    protected selectStrokeWidth(strokeWidth: number): void {
        if (!this._supportsStrokeWidth() || !STROKE_WIDTH_OPTIONS.includes(strokeWidth)) {
            return;
        }

        this._form.strokeWidth().value.set(strokeWidth);
        this._activeOption.set(null);
        this._errorMessage.set(null);
    }

    protected selectFontSize(fontSize: number): void {
        if (!this._supportsFontSize() || !FONT_SIZE_OPTIONS.includes(fontSize)) {
            return;
        }

        this._form.fontSize().value.set(fontSize);
        this._activeOption.set(null);
        this._errorMessage.set(null);
    }

    protected selectSymbol(symbol: ImageMarkupSymbolValue): void {
        if (this._activeTool() !== ImageMarkupTool.SYMBOL || !SYMBOL_OPTIONS.some((option) => option.value === symbol)) {
            return;
        }

        this._form.symbol().value.set(symbol);
        this._activeOption.set(null);
        this._errorMessage.set(null);
    }

    protected closeTextOption(): void {
        if (this._activeOption() !== ImageMarkupEditorOption.TEXT || this._form.text().value().trim().length === 0) {
            return;
        }

        this._activeOption.set(null);
    }

    protected getSymbolLabel(symbol: ImageMarkupSymbolValue): string {
        switch (symbol) {
            case ImageMarkupSymbol.CROSS:
                return this.labels.cross;
            case ImageMarkupSymbol.EXCLAMATION:
                return this.labels.exclamation;
            case ImageMarkupSymbol.QUESTION:
                return this.labels.question;
            case ImageMarkupSymbol.STAR:
                return this.labels.star;
            case ImageMarkupSymbol.CHECKMARK:
            default:
                return this.labels.checkmark;
        }
    }

    protected zoomIn(): void {
        this.designerCanvas()?.invoke('zoomIn');
    }

    protected zoomOut(): void {
        this.designerCanvas()?.invoke('zoomOut');
    }

    protected resetView(): void {
        this.fitImageToView();
    }

    protected onSourceReady(): void {
        this.scheduleImageFit();
    }

    protected onViewportChanged(): void {
        this.scheduleImageFit();
    }

    protected fitImageToView(): void {
        const canvas = this.canvas();
        const designerCanvas = this.designerCanvas();
        if (!canvas?.isReady() || !designerCanvas) {
            return;
        }

        const viewport = designerCanvas.elementRef.nativeElement;
        const zoom = this.calculateFitZoom(viewport.clientWidth, viewport.clientHeight, canvas.viewportWidth(), canvas.viewportHeight());
        if (zoom === null) {
            return;
        }

        designerCanvas.invoke('fitToFrame');
        designerCanvas.invoke('setZoom', zoom);
    }

    protected undo(): void {
        this.canvas()?.undo();
        this._errorMessage.set(null);
    }

    protected redo(): void {
        this.canvas()?.redo();
        this._errorMessage.set(null);
    }

    protected clear(): void {
        this.canvas()?.clear();
        this._errorMessage.set(null);
    }

    protected cancel(): void {
        this._dialogRef.close(Cancel.negative());
    }

    protected async apply(): Promise<void> {
        if (this._isExporting()) {
            return;
        }

        this._isExporting.set(true);
        this._errorMessage.set(null);
        try {
            const canvas = this.canvas();
            if (!canvas) {
                throw new Error('The image markup canvas is unavailable.');
            }
            const file = await canvas.exportFile();
            this._dialogRef.close(Cancel.positive(file));
        } catch {
            this._errorMessage.set(this.labels.exportError);
        } finally {
            this._isExporting.set(false);
        }
    }

    protected onEditorError(error: Error): void {
        this._errorMessage.set(error.message === 'IMAGE_MARKUP_SOURCE_TOO_LARGE' ? this.labels.sourceTooLarge : this.labels.loadError);
    }

    protected onTextPlacementRejected(): void {
        this._errorMessage.set(this.labels.textRequired);
    }

    private scheduleImageFit(): void {
        afterNextRender(() => this.fitImageToView(), { injector: this._injector });
    }

    private isOptionSupported(option: ImageMarkupEditorOptionValue): boolean {
        switch (option) {
            case ImageMarkupEditorOption.COLOR:
                return this._supportsColor();
            case ImageMarkupEditorOption.FONT_SIZE:
                return this._supportsFontSize();
            case ImageMarkupEditorOption.STROKE_WIDTH:
                return this._supportsStrokeWidth();
            case ImageMarkupEditorOption.SYMBOL:
                return this._activeTool() === ImageMarkupTool.SYMBOL;
            case ImageMarkupEditorOption.TEXT:
                return this._activeTool() === ImageMarkupTool.TEXT;
            default:
                return false;
        }
    }

    private isShapeToolValue(tool: ImageMarkupToolValue): boolean {
        return SHAPE_TOOLS.includes(tool);
    }

    private calculateFitZoom(viewportWidth: number, viewportHeight: number, frameWidth: number, frameHeight: number): number | null {
        if (viewportWidth <= 0 || viewportHeight <= 0 || frameWidth <= 0 || frameHeight <= 0) {
            return null;
        }

        const availableWidth = Math.max(1, viewportWidth - IMAGE_FIT_PADDING);
        const availableHeight = Math.max(1, viewportHeight - IMAGE_FIT_PADDING);
        const fittedZoom = Math.min(MAXIMUM_FIT_ZOOM, availableWidth / frameWidth, availableHeight / frameHeight);

        return Math.max(MINIMUM_FIT_ZOOM, fittedZoom);
    }

    // #endregion
}
