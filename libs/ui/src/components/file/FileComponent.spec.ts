// #region Imports

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { Size, ThumbnailPreview } from '@pixel-brewery/mosaik-elements-foundation';
import { describe, expect, it, vi } from 'vitest';
import { IconRegistry } from '@pixel-brewery/mosaik-elements-angular';
import { FileComponent } from './FileComponent';
import { FilePresentation } from './FilePresentation';
import type { FilePresentationValue } from './FilePresentationValue';
import { FileState } from './FileState';
import type { FileStateValue } from './FileStateValue';

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
    BoxComponent: class BoxComponent {},
    ButtonComponent: class ButtonComponent {},
    CardComponent: class CardComponent {},
    CardContentComponent: class CardContentComponent {},
    CellComponent: class CellComponent {},
    ChipComponent: class ChipComponent {},
    DividerComponent: class DividerComponent {},
    DropDownButtonComponent: class DropDownButtonComponent {},
    IconComponent: class IconComponent {},
    IconNameDirective: class IconNameDirective {},
    // Stands in for the application registry, which only resolves registered names.
    IconRegistry: class IconRegistry {
        public get(name: string): string {
            const data: Record<string, string> = { document: 'M-doc', table: 'M-table' };
            const value = data[name];
            if (!value) {
                throw new Error(`[IconRegistry]: Icon "${name}" is not registered.`);
            }

            return value;
        }
    },
    ImageComponent: class ImageComponent {},
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    ProgressRingComponent: class ProgressRingComponent {},
    TextComponent: class TextComponent {},
    ThumbnailComponent: class ThumbnailComponent {},
}));

interface IMenuHandle {
    invoke(method: 'close'): void;
}

interface IFileComponentTestApi {
    readonly actionsTestId: Signal<null | string>;
    readonly availableOpenLabel: Signal<null | string>;
    readonly chipIcon: Signal<string | undefined>;
    readonly chipRemoveActionLabel: Signal<string | null>;
    readonly hasActions: Signal<boolean>;
    readonly isBusy: Signal<boolean>;
    readonly isChip: Signal<boolean>;
    readonly isCompact: Signal<boolean>;
    readonly isList: Signal<boolean>;
    readonly isUnavailable: Signal<boolean>;
    readonly maxTextHeight: Signal<null | string>;
    readonly resolvedMaxTextLines: Signal<null | number>;
    readonly resolvedOpenLabel: Signal<null | string>;
    readonly resolvedPreview: Signal<ThumbnailPreview>;
    readonly resolvedProgress: Signal<number>;
    readonly resolvedActionsLabel: Signal<string>;
    readonly resolvedRemoveLabel: Signal<null | string>;
    readonly resolvedRetryLabel: Signal<null | string>;
    readonly resolvedStateLabel: Signal<string>;
    readonly previewActionLabel: Signal<null | string>;
    readonly previewExtensionLabel: Signal<null | string>;
    readonly previewTestId: Signal<null | string>;
    readonly openTestId: Signal<null | string>;
    readonly removeTestId: Signal<null | string>;
    readonly resolvedTestId: Signal<null | string>;

    onOpenActivated(menu: IMenuHandle): void;

    onOpenRequested(): void;

    onPreviewActivated(): void;

    onRemoveActivated(menu: IMenuHandle): void;

    onRemoveRequested(): void;

    onRetryRequested(): void;
}

interface IFileComponentTestConfig {
    readonly description?: null | string;
    readonly disabled?: boolean;
    readonly actionsLabel?: null | string;
    readonly fileName?: string;
    readonly maxTextLines?: null | number;
    readonly openLabel?: null | string;
    readonly presentation?: FilePresentationValue;
    readonly preview?: null | ThumbnailPreview;
    readonly progress?: number;
    readonly removable?: boolean;
    readonly removeLabel?: null | string;
    readonly retryLabel?: null | string;
    readonly size?: Size;
    readonly state?: FileStateValue;
    readonly stateLabel?: null | string;
    readonly testId?: null | string;
}

describe('FileComponent', () => {
    it('should expose tile, large, and normal defaults', () => {
        // arrange
        const { api, component } = createComponent();

        // act
        const defaults = {
            presentation: component.presentation(),
            preview: api.resolvedPreview(),
            size: component.size(),
            state: component.state(),
        };

        // assert
        expect(defaults).toEqual({
            presentation: FilePresentation.Tile,
            preview: { type: 'other', icon: 'M-doc', label: 'PNG' },
            size: 'large',
            state: FileState.Normal,
        });
    });

    it('should derive the compact list presentation from semantic values', () => {
        // arrange
        const { api } = createComponent({ presentation: FilePresentation.List, size: 'small' });

        // act
        const presentation = { compact: api.isCompact(), list: api.isList() };

        // assert
        expect(presentation).toEqual({ compact: true, list: true });
    });

    it.each([
        [Number.NaN, 0],
        [Number.NEGATIVE_INFINITY, 0],
        [-0.25, 0],
        [0.6, 0.6],
        [1.5, 1],
    ])('should clamp progress %s to %s', (progress, expectedProgress) => {
        // arrange
        const { api } = createComponent({ progress });

        // act
        const resolvedProgress = api.resolvedProgress();

        // assert
        expect(resolvedProgress).toBe(expectedProgress);
    });

    it.each([
        [null, null, null],
        [Number.NaN, null, null],
        [-2, 1, 'calc(1 * 1lh)'],
        [2.8, 2, 'calc(2 * 1lh)'],
    ] as const)('should normalize line limit %s to %s', (maxTextLines, expectedLines, expectedHeight) => {
        // arrange
        const { api } = createComponent({ maxTextLines, presentation: FilePresentation.List });

        // act
        const lineLimit = { height: api.maxTextHeight(), lines: api.resolvedMaxTextLines() };

        // assert
        expect(lineLimit).toEqual({ height: expectedHeight, lines: expectedLines });
    });

    it('should name a non-renderable file by its family icon and extension on a tile', () => {
        // arrange
        const { api } = createComponent({ fileName: 'Kalkulation.xlsx', presentation: FilePresentation.Tile });

        // act
        const preview = api.resolvedPreview();

        // assert
        expect(preview).toEqual({ type: 'other', icon: 'M-table', label: 'XLSX' });
    });

    it('should keep an audio preview on the platform play icon and add its extension', () => {
        // arrange
        const { api } = createComponent({
            fileName: 'Interview.mp3',
            preview: { type: 'audio', url: 'blob:interview' },
        });

        // act
        const preview = api.resolvedPreview();

        // assert
        expect(preview).toEqual({ type: 'audio', url: 'blob:interview', label: 'MP3' });
    });

    it('should never override an icon or label a caller supplied itself', () => {
        // arrange
        const { api } = createComponent({
            fileName: 'Kalkulation.xlsx',
            preview: { type: 'other', icon: 'M-custom', label: 'Tabelle' },
        });

        // act
        const preview = api.resolvedPreview();

        // assert
        expect(preview).toEqual({ type: 'other', icon: 'M-custom', label: 'Tabelle' });
    });

    it('should render a fallback without an icon when the application registers none', () => {
        // arrange
        const { api } = createComponent({ fileName: 'Anlagen.zip', presentation: FilePresentation.Tile });

        // act
        const preview = api.resolvedPreview();

        // assert
        expect(preview).toEqual({ type: 'other', icon: undefined, label: 'ZIP' });
    });

    it('should omit the extension label where a list row has no room for it', () => {
        // arrange
        const { api } = createComponent({ fileName: 'Demodatei.docx', presentation: FilePresentation.List });

        // act
        const extension = api.previewExtensionLabel();

        // assert
        expect(extension).toBeNull();
    });

    it('should hand an image preview to the thumbnail untouched', () => {
        // arrange
        const { api } = createComponent({
            fileName: 'roof.png',
            preview: { type: 'image', url: 'blob:roof', alt: 'roof.png' },
        });

        // act
        const preview = api.resolvedPreview();

        // assert
        expect(preview).toEqual({ type: 'image', url: 'blob:roof', alt: 'roof.png' });
    });

    it('should clamp an unbounded gallery tile to its shared row height', () => {
        // arrange
        const { api } = createComponent({ maxTextLines: null, presentation: FilePresentation.Tile });

        // act
        const lineLimit = { height: api.maxTextHeight(), lines: api.resolvedMaxTextLines() };

        // assert
        expect(lineLimit).toEqual({ height: 'calc(2 * 1lh)', lines: 2 });
    });

    it.each([
        [FileState.Normal, false],
        [FileState.Error, false],
        [FileState.Retry, false],
        [FileState.Unavailable, false],
        [FileState.Loading, true],
        [FileState.Progress, true],
    ] as const)('should expose busy state for %s as %s', (state, expectedBusy) => {
        // arrange
        const { api } = createComponent({ state });

        // act
        const isBusy = api.isBusy();

        // assert
        expect(isBusy).toBe(expectedBusy);
    });

    it('should normalize action labels and fall back to the file name for status announcements', () => {
        // arrange
        const { api } = createComponent({
            fileName: 'manual.pdf',
            openLabel: '  Open  ',
            removeLabel: ' ',
            retryLabel: ' Retry ',
        });

        // act
        const labels = {
            open: api.resolvedOpenLabel(),
            remove: api.resolvedRemoveLabel(),
            retry: api.resolvedRetryLabel(),
            state: api.resolvedStateLabel(),
        };

        // assert
        expect(labels).toEqual({ open: 'Open', remove: null, retry: 'Retry', state: 'manual.pdf' });
    });

    it('should name the action menu after the file when no explicit label is supplied', () => {
        // arrange
        const { api } = createComponent({ actionsLabel: '  ', fileName: 'manual.pdf' });

        // act
        const label = api.resolvedActionsLabel();

        // assert
        expect(label).toBe('manual.pdf');
    });

    it.each([
        [{ openLabel: 'Open file' }, true],
        [{ removable: true, removeLabel: 'Remove file' }, true],
        [{ removable: false, removeLabel: 'Remove file' }, false],
        [{}, false],
    ] as const)('should offer the action menu for %o as %s', (config, expectedActions) => {
        // arrange
        const { api } = createComponent(config);

        // act
        const hasActions = api.hasActions();

        // assert
        expect(hasActions).toBe(expectedActions);
    });

    it('should close the action menu before emitting the selected request', () => {
        // arrange
        const order: Array<string> = [];
        const menu = { invoke: () => order.push('close') };
        const { api, component } = createComponent({
            openLabel: 'Open file',
            removable: true,
            removeLabel: 'Remove file',
        });
        component.openRequested.subscribe(() => order.push('open'));
        component.removeRequested.subscribe(() => order.push('remove'));

        // act
        api.onOpenActivated(menu);
        api.onRemoveActivated(menu);

        // assert
        expect(order).toEqual(['close', 'open', 'close', 'remove']);
    });

    it('should emit open requests only for an enabled labelled action', () => {
        // arrange
        const { api, component } = createComponent({ openLabel: 'Open file' });
        const emitter = vi.spyOn(component.openRequested, 'emit');

        // act
        api.onOpenRequested();

        // assert
        expect(emitter).toHaveBeenCalledOnce();
    });

    it('uses a named chip action and still refuses opening an unavailable file', () => {
        // Arrange
        const { api, component } = createComponent({
            fileName: 'schedule.xlsx',
            openLabel: 'Open',
            presentation: FilePresentation.Chip,
            removable: true,
            removeLabel: 'Remove',
            state: FileState.Unavailable,
        });
        const opened = vi.spyOn(component.openRequested, 'emit');

        // Act
        api.onOpenRequested();

        // Assert
        expect(api.isChip()).toBe(true);
        expect(api.chipIcon()).toBe('M-table');
        expect(api.chipRemoveActionLabel()).toBe('Remove: schedule.xlsx');
        expect(opened).not.toHaveBeenCalled();
    });

    it('should ignore removal requests when the action is not removable', () => {
        // arrange
        const { api, component } = createComponent({ removable: false, removeLabel: 'Remove file' });
        const emitter = vi.spyOn(component.removeRequested, 'emit');

        // act
        api.onRemoveRequested();

        // assert
        expect(emitter).not.toHaveBeenCalled();
    });

    it('should emit retry requests only from retry state', () => {
        // arrange
        const { api, component } = createComponent({ retryLabel: 'Retry upload', state: FileState.Retry });
        const emitter = vi.spyOn(component.retryRequested, 'emit');

        // act
        api.onRetryRequested();

        // assert
        expect(emitter).toHaveBeenCalledOnce();
    });

    it('should suppress every action while disabled', () => {
        // arrange
        const { api, component } = createComponent({
            disabled: true,
            openLabel: 'Open file',
            removable: true,
            removeLabel: 'Remove file',
            retryLabel: 'Retry upload',
            state: FileState.Retry,
        });
        const openEmitter = vi.spyOn(component.openRequested, 'emit');
        const removeEmitter = vi.spyOn(component.removeRequested, 'emit');
        const retryEmitter = vi.spyOn(component.retryRequested, 'emit');

        // act
        api.onOpenRequested();
        api.onRemoveRequested();
        api.onRetryRequested();

        // assert
        expect(openEmitter).not.toHaveBeenCalled();
        expect(removeEmitter).not.toHaveBeenCalled();
        expect(retryEmitter).not.toHaveBeenCalled();
    });

    it('should open the file when its preview surface is activated', () => {
        // arrange
        const { api, component } = createComponent({ fileName: 'Demodatei.docx', openLabel: 'Open file' });
        const openEmitter = vi.spyOn(component.openRequested, 'emit');
        const removeEmitter = vi.spyOn(component.removeRequested, 'emit');

        // act
        api.onPreviewActivated();

        // assert
        expect(openEmitter).toHaveBeenCalledOnce();
        expect(removeEmitter).not.toHaveBeenCalled();
    });

    it('should name the preview surface after the action and the file', () => {
        // arrange
        const { api } = createComponent({ fileName: 'Demodatei.docx', openLabel: 'Open file' });

        // act
        const label = api.previewActionLabel();

        // assert
        expect(label).toBe('Open file: Demodatei.docx');
    });

    it('should expose no preview action for an unopenable file', () => {
        // arrange
        const { api, component } = createComponent({ openLabel: null });
        const openEmitter = vi.spyOn(component.openRequested, 'emit');

        // act
        api.onPreviewActivated();

        // assert
        expect(api.previewActionLabel()).toBeNull();
        expect(openEmitter).not.toHaveBeenCalled();
    });

    it('should derive one automation identifier per action', () => {
        // arrange
        const { api } = createComponent({ testId: 'lead-attachment-13' });

        // act
        const identifiers = {
            open: api.openTestId(),
            preview: api.previewTestId(),
            remove: api.removeTestId(),
            root: api.resolvedTestId(),
        };

        // assert
        expect(identifiers).toEqual({
            open: 'lead-attachment-13-open',
            preview: 'lead-attachment-13-preview',
            remove: 'lead-attachment-13-remove',
            root: 'lead-attachment-13',
        });
    });

    it('should bind no automation identifier when none is supplied', () => {
        // arrange
        const { api } = createComponent({ testId: '  ' });

        // assert
        expect([api.resolvedTestId(), api.previewTestId(), api.openTestId(), api.removeTestId()]).toEqual([null, null, null, null]);
    });

    it('should suppress opening but preserve removal for an unavailable file', () => {
        // arrange
        const { api, component } = createComponent({
            openLabel: 'Open file',
            removable: true,
            removeLabel: 'Remove file',
            state: FileState.Unavailable,
        });
        const openEmitter = vi.spyOn(component.openRequested, 'emit');
        const removeEmitter = vi.spyOn(component.removeRequested, 'emit');

        // act
        api.onOpenRequested();
        api.onRemoveRequested();

        // assert
        expect(api.isUnavailable()).toBe(true);
        expect(api.availableOpenLabel()).toBeNull();
        expect(openEmitter).not.toHaveBeenCalled();
        expect(removeEmitter).toHaveBeenCalledOnce();
    });
});

describe('FileComponent template', () => {
    const template = inlineTemplateOf('FileComponent.ts');
    const stylesheet = inlineStylesOf('FileComponent.ts');

    it('should compose every semantic presentation and visual state from Mosaik controls', () => {
        // arrange
        const requiredControls = [
            '<mosaik-box',
            '<mosaik-button',
            '<mosaik-card',
            '<mosaik-cell',
            '<mosaik-icon',
            '<mosaik-progress-ring',
            '<mosaik-text',
            '<mosaik-thumbnail',
        ];

        // act
        const missingControls = requiredControls.filter((control) => !template.includes(control));

        // assert
        expect(missingControls).toEqual([]);
        expect(template).not.toContain('<img');
        // Media rendering belongs to the platform thumbnail, not to a local switch.
        expect(template).not.toContain('<mosaik-image');
        expect(template).not.toContain('<mosaik-video');
        expect(template).toContain('[preview]="resolvedPreview()"');
        expect(template).toContain('[fit]="resolvedPreviewFit()"');
        // The preview is the only hand-authored element: it must be a real button so
        // assistive technologies and the keyboard can open the file.
        expect(template.match(/<button/g)?.length ?? 0).toBe(1);
        expect(template).toContain('part="preview-button"');
        expect(template).toContain('(click)="onPreviewActivated()"');
    });

    it('should offer every file action through one hover-revealed menu in the trailing corner', () => {
        // arrange
        const actions = template.slice(template.indexOf('<ng-template #actions let-host>'), template.indexOf('@if (isList())'));

        // act
        const menuItems = actions.match(/<mosaik-menu-item/g)?.length ?? 0;

        // assert
        expect(actions).toContain('<mosaik-dropdown-button');
        expect(actions).toContain('class="ngp-hover-reveal"');
        expect(actions).toContain('[ngpHoverRevealFor]="host"');
        expect(actions).toContain('[ngpStopEventPropagation]="true"');
        expect(actions).toContain('[iconName]="\'moreHorizontal\'"');
        expect(actions).toContain('[class.top-1]="!isList()"');
        expect(actions).toContain('[class.right-1]="!isList()"');
        expect(actions).toContain('[attr.slot]="isList() ? \'end\' : null"');
        expect(menuItems).toBe(2);
        expect(actions).toContain('(activated)="onOpenActivated(actionsMenu)"');
        expect(actions).toContain('(activated)="onRemoveActivated(actionsMenu)"');
        expect(actions).toContain('[variant]="removeVariant()"');
        // Press-and-hold confirmation belongs to destructive controls outside menus only.
        expect(template).not.toContain('<mosaik-press-button');
        expect(template).not.toContain('holdToRemoveLabel');
        expect(stylesheet).not.toContain("[part='actions']");
    });

    it('should anchor the action menu to its own file card and list row', () => {
        // act
        const hostBindings = template.match(/\[ngTemplateOutletContext\]="\{ \$implicit: root \}"/g)?.length ?? 0;
        const cardOpening = template.match(/<mosaik-card\s+#root[^>]*>/u)?.[0];

        // assert
        expect(hostBindings).toBe(2);
        expect(template).toContain('<mosaik-cell #root part="root"');
        // The card carries no chrome and no inset of its own: the thumbnail surface is the
        // only visible boundary, and the tile content reaches its outer edge.
        expect(template.replace(/\s+/gu, ' ')).toContain('<mosaik-card #root part="root"');
        expect(cardOpening).toContain('[appearance]="\'plain\'"');
        expect(template).toContain('class="relative flex min-w-0 flex-col gap-2 p-0"');
    });

    it('should bind an automation identifier to the card and to every action', () => {
        // arrange
        const expected = [
            '[attr.test-id]="resolvedTestId()"',
            '[attr.test-id]="previewTestId()"',
            '[attr.test-id]="openTestId()"',
            '[attr.test-id]="removeTestId()"',
            '[attr.test-id]="actionsTestId()"',
        ];

        // act
        const missing = expected.filter((binding) => !template.includes(binding));

        // assert
        expect(missing).toEqual([]);
    });

    it('should provide labelled retry, open, and remove actions without hard-coded user copy', () => {
        // arrange
        const actionLabels = ['resolvedRetryLabel()', 'availableOpenLabel()', 'resolvedRemoveLabel()'];

        // act
        const missingLabels = actionLabels.filter((label) => !template.includes(label));
        const labelledButtonCount = template.match(/<span slot="label" class="sr-only">{{ label }}<\/span>/g)?.length ?? 0;

        // assert
        expect(missingLabels).toEqual([]);
        expect(labelledButtonCount).toBe(1);
        expect(template).toContain('<span slot="label" class="sr-only">{{ resolvedActionsLabel() }}</span>');
        expect(template).toContain('[label]="label"');
        expect(template.match(/\[attr\.inert\]=/g)?.length ?? 0).toBe(2);
        expect(template).toContain('@if (hasActions())');
        expect(template).toContain('fileState.Unavailable');
        expect(template).toContain('<del part="unavailable-name">');
        expect(template.match(/class="min-w-0 w-full"/g)?.length ?? 0).toBe(2);
        expect(stylesheet).toContain("[part='name']");
        expect(stylesheet).toContain("[part='description']");
        expect(stylesheet).toContain('overflow-wrap: break-word');
        expect(template).not.toContain('>Retry<');
        expect(template).not.toContain('>Remove<');
    });
});

function createComponent(config: IFileComponentTestConfig = {}): {
    readonly api: IFileComponentTestApi;
    readonly component: FileComponent;
} {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [IconRegistry] });
    const component = TestBed.runInInjectionContext(() => new FileComponent());

    Object.defineProperties(component, {
        description: { value: signal(config.description ?? null) },
        disabled: { value: signal(config.disabled ?? false) },
        actionsLabel: { value: signal(config.actionsLabel ?? null) },
        fileName: { value: signal(config.fileName ?? 'file.png') },
        maxTextLines: { value: signal(config.maxTextLines ?? null) },
        openLabel: { value: signal(config.openLabel ?? null) },
        presentation: { value: signal(config.presentation ?? FilePresentation.Tile) },
        preview: { value: signal(config.preview ?? null) },
        progress: { value: signal(config.progress ?? 0) },
        removable: { value: signal(config.removable ?? false) },
        removeLabel: { value: signal(config.removeLabel ?? null) },
        retryLabel: { value: signal(config.retryLabel ?? null) },
        size: { value: signal(config.size ?? 'large') },
        state: { value: signal(config.state ?? FileState.Normal) },
        stateLabel: { value: signal(config.stateLabel ?? null) },
        testId: { value: signal(config.testId ?? null) },
    });

    return { api: component as unknown as IFileComponentTestApi, component };
}
