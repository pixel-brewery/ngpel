// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileSourceComponent } from '../file-source/FileSourceComponent';
import { FileSourceType } from '../file-source/FileSourceType';
import { FilePresentation } from '../file/FilePresentation';
import { FileState } from '../file/FileState';
import { FilesComponent } from './FilesComponent';
import { FilesLayout } from './FilesLayout';
import type { FilesLayoutValue } from './FilesLayoutValue';

// #endregion

/** Reads the inline `template` of a component source, so a spec can assert on its markup. */
function inlineTemplateOf(fileName: string): string {
    return inlineBlockOf(fileName, 'template');
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
    BoxComponent: class BoxComponent {},
    ButtonComponent: class ButtonComponent {},
    CardComponent: class CardComponent {},
    CardContentComponent: class CardContentComponent {},
    CellComponent: class CellComponent {},
    ChipComponent: class ChipComponent {},
    DividerComponent: class DividerComponent {},
    DropDownButtonComponent: class DropDownButtonComponent {},
    DropZoneComponent: class DropZoneComponent {},
    EmptyStateComponent: class EmptyStateComponent {},
    FilePickerComponent: class FilePickerComponent {},
    IconComponent: class IconComponent {},
    IconNameDirective: class IconNameDirective {},
    IconRegistry: class IconRegistry {
        public get(): string {
            return 'M-doc';
        }
    },
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    ProgressRingComponent: class ProgressRingComponent {},
    TextComponent: class TextComponent {},
    ThumbnailComponent: class ThumbnailComponent {},
    TypographyDirective: class TypographyDirective {},
}));

interface IFilesComponentTestApi {
    readonly activeDropSource: Signal<FileSourceComponent | null>;
    readonly dropSource: Signal<FileSourceComponent | null>;
    readonly filePresentation: Signal<string>;
    readonly renderedFiles: Signal<ReadonlyArray<{ readonly description: null | string; readonly testId: null | string }>>;
    readonly resolvedEmptyIconName: Signal<string>;

    onDropZoneData(event: unknown): void;

    onFilesPicked(source: FileSourceComponent, event: unknown): void;

    requestOpen(file: { readonly id: string; readonly state?: 'unavailable' }): void;
}

describe('FilesComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should use the tile gallery as its default layout', () => {
        // arrange
        const { api, component } = createComponent();

        // act
        const layout = component.layout();
        const presentation = api.filePresentation();

        // assert
        expect(layout).toBe(FilesLayout.Gallery);
        expect(presentation).toBe(FilePresentation.Tile);
    });

    it.each([
        [FilesLayout.List, FilePresentation.List],
        [FilesLayout.Gallery, FilePresentation.Tile],
        [FilesLayout.Inline, FilePresentation.Chip],
        [FilesLayout.Preview, FilePresentation.Preview],
    ] as const)('should map %s layout to %s file presentation', (layout, presentation) => {
        // arrange
        const { api } = createComponent({ layout });

        // act
        const result = api.filePresentation();

        // assert
        expect(result).toBe(presentation);
    });

    it('should identify a file by type and size when no explicit description exists', () => {
        // arrange
        const { api } = createComponent({
            files: [{ id: 1, fileName: 'Angebot Änderung.pdf', sizeInBytes: 251_904 }],
            showFileSize: true,
        });

        // act
        const [renderedFile] = api.renderedFiles();

        // assert
        expect(renderedFile?.description).toBe('PDF · 246 KB');
    });

    it('should filter one picker selection and enforce its single-file contract', () => {
        // arrange
        const source = createSource({ accept: ['image/*'], multiple: false });
        const { api } = createComponent({ sources: [source] });
        const selectedEmitter = vi.spyOn(source.filesSelected, 'emit');
        const rejectedEmitter = vi.spyOn(source.filesRejected, 'emit');
        const first = new File(['first'], 'first.png', { type: 'image/png' });
        const second = new File(['second'], 'second.jpg', { type: 'image/jpeg' });
        const text = new File(['text'], 'notes.txt', { type: 'text/plain' });

        // act
        api.onFilesPicked(source, { files: [first, second, text] });

        // assert
        expect(selectedEmitter).toHaveBeenCalledWith([first]);
        expect(rejectedEmitter).toHaveBeenCalledWith([second, text]);
    });

    it('should accept a wildcard media source by file extension when the browser omits its MIME type', () => {
        // arrange
        const source = createSource({ accept: ['image/*'], multiple: true });
        const { api } = createComponent({ sources: [source] });
        const selectedEmitter = vi.spyOn(source.filesSelected, 'emit');
        const file = new File(['image'], 'poster.png');

        // act
        api.onFilesPicked(source, { files: [file] });

        // assert
        expect(selectedEmitter).toHaveBeenCalledWith([file]);
    });

    it('should accept an ambiguous media extension for every matching wildcard when the MIME type is absent', () => {
        // arrange
        const source = createSource({ accept: ['audio/*'], multiple: true });
        const { api } = createComponent({ sources: [source] });
        const selectedEmitter = vi.spyOn(source.filesSelected, 'emit');
        const file = new File(['audio'], 'recording.ogg');

        // act
        api.onFilesPicked(source, { files: [file] });

        // assert
        expect(selectedEmitter).toHaveBeenCalledWith([file]);
    });

    it('should route drops only to one unambiguous drop-enabled picker source', () => {
        // arrange
        const source = createSource({ dropEnabled: true });
        const { api } = createComponent({ sources: [source] });
        const emitter = vi.spyOn(source.filesSelected, 'emit');
        const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });

        // act
        api.onDropZoneData({ files: [file] });

        // assert
        expect(api.dropSource()).toBe(source);
        expect(api.activeDropSource()).toBe(source);
        expect(emitter).toHaveBeenCalledWith([file]);
    });

    it('should use a non-interactive frame while the configured drop source is unavailable', () => {
        // arrange
        const source = createSource({ dropEnabled: true, disabled: true });
        const { api } = createComponent({ sources: [source] });

        // act
        const result = api.activeDropSource();

        // assert
        expect(api.dropSource()).toBe(source);
        expect(result).toBeNull();
    });

    it('should derive the empty-state icon from one unambiguous source', () => {
        // arrange
        const source = createSource({ iconName: 'image' });
        const { api } = createComponent({ sources: [source] });

        // act
        const result = api.resolvedEmptyIconName();

        // assert
        expect(result).toBe('image');
    });

    it('should prefer an explicit empty-state icon over the source icon', () => {
        // arrange
        const source = createSource({ iconName: 'image' });
        const { api } = createComponent({ emptyIconName: 'document', sources: [source] });

        // act
        const result = api.resolvedEmptyIconName();

        // assert
        expect(result).toBe('document');
    });

    it('should reject ambiguous drop ownership without selecting an arbitrary source', () => {
        // arrange
        const first = createSource({ dropEnabled: true });
        const second = createSource({ dropEnabled: true });
        const { api } = createComponent({ sources: [first, second] });
        const firstEmitter = vi.spyOn(first.filesSelected, 'emit');
        const secondEmitter = vi.spyOn(second.filesSelected, 'emit');

        // act
        api.onDropZoneData({ files: [new File(['content'], 'document.pdf')] });

        // assert
        expect(api.dropSource()).toBeNull();
        expect(firstEmitter).not.toHaveBeenCalled();
        expect(secondEmitter).not.toHaveBeenCalled();
    });

    it('should suppress open requests for unavailable files', () => {
        // arrange
        const { api, component } = createComponent({ openLabel: 'Open' });
        const emitter = vi.spyOn(component.openRequested, 'emit');

        // act
        api.requestOpen({ id: 'broken', state: FileState.Unavailable });

        // assert
        expect(emitter).not.toHaveBeenCalled();
    });
});

describe('FilesComponent automation identifiers', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should derive a stable per-file identifier from the configured prefix', () => {
        // arrange
        const { api } = createComponent({
            files: [
                { id: 13, fileName: 'drawing.png' },
                { id: 'local-1', fileName: 'Demodatei.docx' },
            ],
            testIdPrefix: 'lead-attachment',
        });

        // act
        const identifiers = api.renderedFiles().map((item) => item.testId);

        // assert
        expect(identifiers).toEqual(['lead-attachment-13', 'lead-attachment-local-1']);
    });

    it('should bind no identifier when no prefix is configured', () => {
        // arrange
        const { api } = createComponent({ files: [{ id: 13, fileName: 'drawing.png' }] });

        // act
        const identifiers = api.renderedFiles().map((item) => item.testId);

        // assert
        expect(identifiers).toEqual([null]);
    });
});

describe('FilesComponent template', () => {
    const template = inlineTemplateOf('FilesComponent.ts');

    it('should own the frame, all layouts, file rendering, and declarative sources', () => {
        // arrange
        const expected = [
            'surface-input',
            '<mosaik-drop-zone',
            '<mosaik-file-picker',
            '<ngp-file',
            '<ng-content select="ngp-file-source"',
            'layouts.Gallery',
            'layouts.Preview',
        ];

        // act
        const missing = expected.filter((value) => !template.includes(value));

        // assert
        expect(missing).toEqual([]);
        expect(template).not.toContain('<mosaik-card');
        expect(template).not.toContain('mosaik-filebox');
        expect(template).not.toContain('mosaik-file-upload');
        expect(template).not.toContain('<input');
    });

    it('should forward the action-menu label and the automation identifier in every layout', () => {
        // act
        const actionsLabelBindings = template.match(/\[actionsLabel\]="actionsLabel\(\)"/g)?.length ?? 0;
        const testIdBindings = template.match(/\[testId\]="item\.testId"/g)?.length ?? 0;

        // assert
        expect(actionsLabelBindings).toBe(3);
        expect(testIdBindings).toBe(3);
    });

    it('should project sources into the empty-state action slot and move them below populated files', () => {
        // arrange
        const emptyState = template.slice(template.indexOf('<mosaik-empty-state'), template.indexOf('</mosaik-empty-state>'));

        // act
        const populatedSources = template.indexOf('@if (renderedFiles().length > 0 && sources().length > 0)');

        // assert
        expect(emptyState).toContain('[iconName]="resolvedEmptyIconName()"');
        expect(emptyState).toContain('slot="actions"');
        expect(emptyState).toContain('[ngTemplateOutlet]="sourceContent"');
        expect(populatedSources).toBeGreaterThan(template.indexOf('</mosaik-empty-state>'));
    });
});

function createComponent(
    config: Partial<{
        emptyIconName: null | string;
        files: ReadonlyArray<{
            readonly id: number | string;
            readonly fileName: string;
            readonly sizeInBytes?: number;
        }>;
        layout: FilesLayoutValue;
        openLabel: null | string;
        showFileSize: boolean;
        sources: ReadonlyArray<FileSourceComponent>;
        testIdPrefix: null | string;
    }> = {},
): { readonly api: IFilesComponentTestApi; readonly component: FilesComponent } {
    const component = TestBed.runInInjectionContext(() => new FilesComponent());

    Object.defineProperties(component, {
        disabled: { value: signal(false) },
        emptyIconName: { value: signal(config.emptyIconName ?? null) },
        files: { value: signal(config.files ?? []) },
        label: { value: signal('Files') },
        openLabel: { value: signal(config.openLabel ?? null) },
        showFileSize: { value: signal(config.showFileSize ?? false) },
        sources: { value: signal(config.sources ?? []) },
        testIdPrefix: { value: signal(config.testIdPrefix ?? null) },
    });

    if (config.layout !== undefined) {
        Object.defineProperty(component, 'layout', { value: signal(config.layout) });
    }

    return { api: component as unknown as IFilesComponentTestApi, component };
}

function createSource(
    config: Partial<{
        accept: ReadonlyArray<string>;
        disabled: boolean;
        dropEnabled: boolean;
        iconName: string;
        multiple: boolean;
    }> = {},
): FileSourceComponent {
    const component = TestBed.runInInjectionContext(() => new FileSourceComponent());

    Object.defineProperties(component, {
        accept: { value: signal(config.accept ?? []) },
        busy: { value: signal(false) },
        disabled: { value: signal(config.disabled ?? false) },
        dropEnabled: { value: signal(config.dropEnabled ?? false) },
        iconName: { value: signal(config.iconName ?? 'attach') },
        multiple: { value: signal(config.multiple ?? true) },
        type: { value: signal(FileSourceType.Picker) },
    });

    return component;
}
