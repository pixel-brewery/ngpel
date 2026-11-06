// #region Imports

import type { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { FieldTree } from '@angular/forms/signals';
import { Cancel, DIALOG_REF, DIALOG_REF_DATA } from '@pixel-brewery/mosaik-elements-angular';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IImageMarkupEditorDialogData } from './IImageMarkupEditorDialogData';
import { ImageMarkupEditorDialogComponent } from './ImageMarkupEditorDialogComponent';
import { ImageMarkupSymbol } from './ImageMarkupSymbol';
import type { ImageMarkupSymbolValue } from './ImageMarkupSymbolValue';
import { ImageMarkupTool } from './ImageMarkupTool';
import type { ImageMarkupToolValue } from './ImageMarkupToolValue';

// #endregion

/** Reads the inline `template` of a component source, so a spec can assert on its markup. */
function inlineTemplateOf(fileName: string): string {
    return inlineBlockOf(fileName, 'template');
}

/** Reads the inline `styles` of a component source, so a spec can assert on its stylesheet. */
function inlineStylesOf(fileName: string): string {
    return inlineBlockOf(fileName, 'styles');
}

/** Extracts one backtick-delimited decorator block, resolving the escapes a template literal needs. */
function inlineBlockOf(fileName: string, key: 'styles' | 'template'): string {
    const source = readFileSync(join(import.meta.dirname, fileName), 'utf8');
    const start = source.indexOf(`${key}: \``);

    if (start === -1) {
        throw new Error(`${fileName} has no inline ${key}.`);
    }

    let index = start + key.length + 3;
    let block = '';

    while (index < source.length && source[index] !== '`') {
        if (source[index] === '\\') {
            block += source[index + 1];
            index += 2;
            continue;
        }

        block += source[index];
        index += 1;
    }

    // The block was indented when it moved into the decorator; assertions quote the original markup.
    const lines = block.split('\n');
    const indent = Math.min(...lines.filter((line) => line.trim() !== '').map((line) => line.length - line.trimStart().length));

    return lines
        .map((line) => line.slice(indent))
        .join('\n')
        .trim();
}

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ActionbarComponent: class ActionbarComponent {},
    ActionbarGroupComponent: class ActionbarGroupComponent {},
    ActionbarItemComponent: class ActionbarItemComponent {},
    ActionbarSeparatorComponent: class ActionbarSeparatorComponent {},
    AnimateDirective: class AnimateDirective {},
    ButtonComponent: class ButtonComponent {},
    PressButtonComponent: class PressButtonComponent {},
    Cancel: {
        negative: vi.fn(() => ({ reason: 'negative' })),
        positive: vi.fn((result: File) => ({ reason: 'positive', result })),
    },
    ColorPickerComponent: class ColorPickerComponent {},
    DIALOG_REF: 'DIALOG_REF',
    DIALOG_REF_DATA: 'DIALOG_REF_DATA',
    DialogContentDirective: class DialogContentDirective {},
    DialogFooterDirective: class DialogFooterDirective {},
    DialogHeaderComponent: class DialogHeaderComponent {},
    DialogHeaderDirective: class DialogHeaderDirective {},
    DesignerCanvasComponent: class DesignerCanvasComponent {},
    DesignerComponent: class DesignerComponent {},
    DesignerContentComponent: class DesignerContentComponent {},
    DesignerFrameComponent: class DesignerFrameComponent {},
    DropDownButtonComponent: class DropDownButtonComponent {},
    FormFieldComponent: class FormFieldComponent {},
    FormFieldDirective: class FormFieldDirective {},
    FormFieldStateDirective: class FormFieldStateDirective {},
    IconNameDirective: class IconNameDirective {},
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    NumberBoxComponent: class NumberBoxComponent {},
    SelectComponent: class SelectComponent {},
    SelectItemComponent: class SelectItemComponent {},
    SkeletonComponent: class SkeletonComponent {},
    TextBoxComponent: class TextBoxComponent {},
    TooltipDirective: class TooltipDirective {},
    ToggleButtonComponent: class ToggleButtonComponent {},
}));

interface IImageMarkupEditorDialogComponentTestApi {
    readonly activeOption: Signal<ImageMarkupEditorOptionTestValue | null>;
    readonly activeTool: Signal<ImageMarkupToolValue>;
    readonly canvasInteractionMode: Signal<'pan' | 'pointer'>;
    readonly colorOptions: ReadonlyArray<{ readonly value: string }>;
    readonly errorMessage: Signal<string | null>;
    readonly form: FieldTree<IImageMarkupEditorControlsTest>;
    readonly shapeToolsVisible: Signal<boolean>;
    readonly showsToolOptions: Signal<boolean>;
    readonly showsOptionValues: Signal<boolean>;
    readonly strokeWidthOptions: ReadonlyArray<number>;
    readonly supportsStrokeWidth: Signal<boolean>;
    readonly symbolOptions: ReadonlyArray<{ readonly iconName: string; readonly value: ImageMarkupSymbolValue }>;
    apply(): Promise<void>;
    cancel(): void;
    closeTextOption(): void;
    fitImageToView(): void;
    onEditorError(error: Error): void;
    onTextPlacementRejected(): void;
    selectColor(color: string): void;
    selectFontSize(fontSize: number): void;
    selectOption(option: ImageMarkupEditorOptionTestValue): void;
    selectStrokeWidth(strokeWidth: number): void;
    selectSymbol(symbol: ImageMarkupSymbolValue): void;
    selectTool(tool: ImageMarkupToolValue): void;
    toggleShapeTools(): void;
}

interface IImageMarkupEditorControlsTest {
    color: string;
    fontSize: number;
    strokeWidth: number;
    symbol: ImageMarkupSymbolValue;
    text: string;
}

type ImageMarkupEditorOptionTestValue = 'color' | 'font-size' | 'stroke-width' | 'symbol' | 'text';

describe('Image markup editor dialog', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('selects every drawing tool without leaking domain-specific state', () => {
        // arrange
        const { api } = createComponent();

        // act
        api.selectTool(ImageMarkupTool.ARROW);

        // assert
        expect(api.activeTool()).toBe(ImageMarkupTool.ARROW);
    });

    it('starts with the pan tool and delegates movement to the Mosaik canvas', () => {
        // arrange
        const { api } = createComponent();

        // act
        const activeTool = api.activeTool();

        // assert
        expect(activeTool).toBe(ImageMarkupTool.PAN);
        expect(api.canvasInteractionMode()).toBe('pan');
    });

    it('offers only fixed actionbar choices for colors, widths, sizes, and symbols', () => {
        // arrange
        const { api } = createComponent();
        const template = inlineTemplateOf('ImageMarkupEditorDialogComponent.ts');

        // act
        const strokeWidths = api.strokeWidthOptions;
        const colorPaletteStart = template.indexOf('@case (availableOptions.COLOR)');
        const strokeWidthPaletteStart = template.indexOf('@case (availableOptions.STROKE_WIDTH)');
        const fontSizePaletteStart = template.indexOf('@case (availableOptions.FONT_SIZE)');

        // assert
        expect(strokeWidths).toEqual([2, 4, 6, 8, 12, 16, 24]);
        expect(api.colorOptions).toHaveLength(8);
        expect(api.symbolOptions.map((option) => option.value)).toEqual([
            ImageMarkupSymbol.CHECKMARK,
            ImageMarkupSymbol.CROSS,
            ImageMarkupSymbol.EXCLAMATION,
            ImageMarkupSymbol.QUESTION,
            ImageMarkupSymbol.STAR,
        ]);
        expect(template).toContain('part="tool-option-values"');
        expect(template).toContain('[mosaikAnimate]="\'fadeSlideInBottom\'"');
        expect(template).not.toContain('<mosaik-color-picker');
        expect(template).not.toContain('<mosaik-numberbox');
        expect(template).not.toContain('<mosaik-select');
        expect(template).not.toContain('<mosaik-dropdown-button');
        expect(colorPaletteStart).toBeGreaterThanOrEqual(0);
        expect(strokeWidthPaletteStart).toBeGreaterThan(colorPaletteStart);
        expect(fontSizePaletteStart).toBeGreaterThan(strokeWidthPaletteStart);
        expect(template.slice(colorPaletteStart, strokeWidthPaletteStart)).not.toContain('strokeWidthOption.value.toString()');
        expect(template.slice(strokeWidthPaletteStart, fontSizePaletteStart)).toContain('[label]="strokeWidth.toString()"');
        expect(template.slice(strokeWidthPaletteStart, fontSizePaletteStart)).not.toContain('slot="icon"');
        expect(template).toContain('style="--actionbar-min-height: 60px"');
        expect(template.match(/class="min-w-\[40px\]"/g)).toHaveLength(2);
        expect(template.match(/style="height: 40px"/g)).toHaveLength(2);
        expect(template.match(/\[horizontalContentAlignment\]="'center'"/g)).toHaveLength(2);
        expect(template.match(/\[verticalContentAlignment\]="'center'"/g)).toHaveLength(2);
    });

    it('uses the Mosaik tooltip on every editor action', () => {
        const template = inlineTemplateOf('ImageMarkupEditorDialogComponent.ts');
        const actionCount = template.match(/<mosaik-(?:button|press-button|toggle-button)\b/g)?.length ?? 0;
        const tooltipCount = template.match(/\[mosaikTooltip\]=/g)?.length ?? 0;

        expect(actionCount).toBeGreaterThan(0);
        expect(tooltipCount).toBe(actionCount);
        expect(template).not.toContain('[attr.title]');
    });

    it('keeps value palettes closed when a drawing tool is selected', () => {
        // arrange
        const { api } = createComponent();

        // act
        api.selectTool(ImageMarkupTool.SYMBOL);

        // assert
        expect(api.activeOption()).toBeNull();
        expect(api.showsOptionValues()).toBe(false);
        expect(api.supportsStrokeWidth()).toBe(true);
    });

    it('opens a supported value palette only after its option toggle is selected', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);

        // act
        api.selectOption('color');

        // assert
        expect(api.activeOption()).toBe('color');
        expect(api.showsOptionValues()).toBe(true);
    });

    it('closes an open value palette when its active option toggle is selected again', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);
        api.selectOption('color');

        // act
        api.selectOption('color');

        // assert
        expect(api.activeOption()).toBeNull();
        expect(api.showsOptionValues()).toBe(false);
    });

    it('switches directly between supported value palettes', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);
        api.selectOption('color');

        // act
        api.selectOption('stroke-width');

        // assert
        expect(api.activeOption()).toBe('stroke-width');
        expect(api.showsOptionValues()).toBe(true);
    });

    it('closes the color palette after a predefined color is selected', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);
        api.selectOption('color');

        // act
        api.selectColor('#22c55e');

        // assert
        expect(api.form.color().value()).toBe('#22c55e');
        expect(api.activeOption()).toBeNull();
        expect(api.showsOptionValues()).toBe(false);
    });

    it('applies one of the predefined symbol stroke widths', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.SYMBOL);
        api.selectOption('stroke-width');

        // act
        api.selectStrokeWidth(24);

        // assert
        expect(api.form.strokeWidth().value()).toBe(24);
        expect(api.activeOption()).toBeNull();
        expect(api.showsOptionValues()).toBe(false);
    });

    it('closes the font-size palette after a predefined size is selected', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.TEXT);
        api.selectOption('font-size');

        // act
        api.selectFontSize(64);

        // assert
        expect(api.form.fontSize().value()).toBe(64);
        expect(api.activeOption()).toBeNull();
    });

    it('closes the symbol palette after a predefined symbol is selected', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.SYMBOL);
        api.selectOption('symbol');

        // act
        api.selectSymbol(ImageMarkupSymbol.STAR);

        // assert
        expect(api.form.symbol().value()).toBe(ImageMarkupSymbol.STAR);
        expect(api.activeOption()).toBeNull();
    });

    it('closes the text entry palette after entered text loses focus', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.TEXT);
        api.selectOption('text');
        api.form.text().value.set('Important note');

        // act
        api.closeTextOption();

        // assert
        expect(api.activeOption()).toBeNull();
    });

    it('keeps empty text entry visible after it loses focus', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.TEXT);
        api.selectOption('text');

        // act
        api.closeTextOption();

        // assert
        expect(api.activeOption()).toBe('text');
    });

    it('ignores stroke widths outside the predefined actionbar palette', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);

        // act
        api.selectStrokeWidth(5);

        // assert
        expect(api.form.strokeWidth().value()).toBe(6);
    });

    it('projects the centered toolbar overlay into the designer extension slot', () => {
        const template = inlineTemplateOf('ImageMarkupEditorDialogComponent.ts');
        const designerStart = template.indexOf('<mosaik-designer');
        const toolbarStart = template.indexOf('part="toolbars"');
        const designerEnd = template.indexOf('</mosaik-designer>', toolbarStart);
        const footerStart = template.indexOf('<ng-template mosaikDialogFooter>');

        expect(designerStart).toBeGreaterThanOrEqual(0);
        expect(toolbarStart).toBeGreaterThan(designerStart);
        expect(designerEnd).toBeGreaterThan(toolbarStart);
        expect(footerStart).toBeGreaterThan(designerEnd);
        expect(template.slice(designerStart, designerEnd)).toContain('slot="after-content"');
        expect(template).toContain('(sourceReady)="onSourceReady()"');
        expect(template).toContain('(viewportChanged)="onViewportChanged()"');
        expect(template).toContain('canvas()?.cropPreviewSelection()');
        expect(template).toContain('[style.width.px]="canvas()?.viewportWidth() || null"');
        expect(template).toContain('[style.left.px]="-(canvas()?.viewportLeft() || 0)"');
        expect(template).not.toContain('canvas()?.cropSelection(); as selection');
        expect(template).toContain('[minZoom]="0.01"');
        expect(template).toContain('(focusout)="closeTextOption()"');
        expect(template).not.toContain('(blur)="closeTextOption()"');
        expect(template).toContain('class="absolute inset-0 flex min-h-0 flex-col overflow-hidden"');
        expect(template).not.toContain('class="flex h-full min-h-0 flex-1 flex-col overflow-hidden"');
    });

    it('fills the Mosaik dialog scroll part without making the dialog fullscreen', () => {
        const style = inlineStylesOf('ImageMarkupEditorDialogComponent.ts');

        expect(style).toContain('mosaik-dialog-content:has(> ngp-image-markup-editor-dialog)::part(scroll)');
        expect(style).toContain('height: 100%');
        expect(style).toContain('min-height: 0');
    });

    it('fits a large source image into the available Mosaik canvas without upscaling', () => {
        // arrange
        const { api } = createComponent();
        const invoke = vi.fn();
        Object.defineProperty(api, 'canvas', {
            value: () => ({
                isReady: () => true,
                viewportWidth: () => 1920,
                viewportHeight: () => 1080,
            }),
        });
        Object.defineProperty(api, 'designerCanvas', {
            value: () => ({
                elementRef: { nativeElement: { clientWidth: 1000, clientHeight: 600 } },
                invoke,
            }),
        });

        // act
        api.fitImageToView();

        // assert
        expect(invoke).toHaveBeenNthCalledWith(1, 'fitToFrame');
        expect(invoke).toHaveBeenNthCalledWith(2, 'setZoom', 968 / 1920);
    });

    it('reveals shape tools before showing the selected shape options as the next actionbar level', () => {
        // arrange
        const { api } = createComponent();

        // act
        api.toggleShapeTools();

        // assert
        expect(api.shapeToolsVisible()).toBe(true);
        expect(api.showsToolOptions()).toBe(false);
    });

    it('shows the selected shape options without opening a value palette', () => {
        // arrange
        const { api } = createComponent();
        api.toggleShapeTools();

        // act
        api.selectTool(ImageMarkupTool.LINE);

        // assert
        expect(api.shapeToolsVisible()).toBe(true);
        expect(api.showsToolOptions()).toBe(true);
        expect(api.activeOption()).toBeNull();
        expect(api.showsOptionValues()).toBe(false);
    });

    it('closes the shape level when its active toggle is selected again', () => {
        // arrange
        const { api } = createComponent();
        api.toggleShapeTools();

        // act
        api.toggleShapeTools();

        // assert
        expect(api.shapeToolsVisible()).toBe(false);
        expect(api.showsToolOptions()).toBe(false);
    });

    it('restores the active pen options after the shape level is closed', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.PEN);
        api.toggleShapeTools();

        // act
        api.toggleShapeTools();

        // assert
        expect(api.activeTool()).toBe(ImageMarkupTool.PEN);
        expect(api.shapeToolsVisible()).toBe(false);
        expect(api.showsToolOptions()).toBe(true);
        expect(api.activeOption()).toBeNull();
    });

    it('closes the nested shape level when another primary tool is selected', () => {
        // arrange
        const { api } = createComponent();
        api.selectTool(ImageMarkupTool.RECTANGLE);

        // act
        api.selectTool(ImageMarkupTool.HIGHLIGHTER);

        // assert
        expect(api.shapeToolsVisible()).toBe(false);
        expect(api.showsToolOptions()).toBe(true);
    });

    it('closes negatively when editing is cancelled', () => {
        // arrange
        const { api, close } = createComponent();

        // act
        api.cancel();

        // assert
        expect(close).toHaveBeenCalledWith(Cancel.negative());
    });

    describe('error handling', () => {
        it('maps oversized source errors to the configured safe message', () => {
            // arrange
            const { api } = createComponent();

            // act
            api.onEditorError(new Error('IMAGE_MARKUP_SOURCE_TOO_LARGE'));

            // assert
            expect(api.errorMessage()).toBe('Source too large');
        });

        it('shows a localized instruction when text placement has no content', () => {
            // arrange
            const { api } = createComponent();

            // act
            api.onTextPlacementRejected();

            // assert
            expect(api.errorMessage()).toBe('Enter text');
        });

        it('keeps the dialog open and reports export failure when no canvas exists', async () => {
            // arrange
            const { api, close } = createComponent();

            // act
            await api.apply();

            // assert
            expect(close).not.toHaveBeenCalled();
            expect(api.errorMessage()).toBe('Export failed');
        });
    });
});

function createComponent(): {
    readonly api: IImageMarkupEditorDialogComponentTestApi;
    readonly close: ReturnType<typeof vi.fn>;
} {
    const close = vi.fn();
    const data: IImageMarkupEditorDialogData = {
        labels: {
            title: 'Edit',
            description: 'Markup',
            canvasLabel: 'Canvas',
            cancel: 'Cancel',
            apply: 'Apply',
            undo: 'Undo',
            redo: 'Redo',
            clear: 'Clear',
            tools: 'Tools',
            pan: 'Move canvas',
            crop: 'Crop',
            pen: 'Pen',
            highlighter: 'Highlighter',
            eraser: 'Eraser',
            shapes: 'Shapes',
            line: 'Line',
            arrow: 'Arrow',
            rectangle: 'Rectangle',
            ellipse: 'Ellipse',
            text: 'Text',
            symbol: 'Symbol',
            color: 'Color',
            strokeWidth: 'Width',
            fontSize: 'Font size',
            textPlaceholder: 'Text',
            symbolType: 'Symbol',
            checkmark: 'Checkmark',
            cross: 'Cross',
            exclamation: 'Exclamation',
            question: 'Question',
            star: 'Star',
            zoomIn: 'Zoom in',
            zoomOut: 'Zoom out',
            resetView: 'Reset view',
            textRequired: 'Enter text',
            loadError: 'Load failed',
            exportError: 'Export failed',
            sourceTooLarge: 'Source too large',
        },
        previewUrl: 'blob:source',
        outputFileName: 'edited.png',
        maximumSourcePixels: 40_000_000,
        historyLimit: 100,
    };
    TestBed.configureTestingModule({
        providers: [
            { provide: DIALOG_REF_DATA, useValue: data },
            { provide: DIALOG_REF, useValue: { close } },
        ],
    });
    const component = TestBed.runInInjectionContext(() => new ImageMarkupEditorDialogComponent());

    return {
        api: component as unknown as IImageMarkupEditorDialogComponentTestApi,
        close,
    };
}
