// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    input,
    output,
    type InputSignal,
    type OutputEmitterRef,
    type Signal,
} from '@angular/core';
import {
    ButtonComponent,
    DividerComponent,
    DropZoneComponent,
    EmptyStateComponent,
    FilePickerComponent,
    IconNameDirective,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import type { IDropZoneDataEventDetail, IFilesPickedEventDetail, ObjectFit, Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { FileSourceComponent } from '../file-source/FileSourceComponent';
import { FileSourceType } from '../file-source/FileSourceType';
import { FileComponent } from '../file/FileComponent';
import { FilePresentation } from '../file/FilePresentation';
import type { FilePresentationValue } from '../file/FilePresentationValue';
import {
    createFilePreview,
    createFilePreviewFallback,
    matchesFilePreviewMediaKind,
    resolveFileExtensionLabel,
    resolveFilePreviewMediaKind,
} from '../file/FilePreview';
import { FileState } from '../file/FileState';
import { SectionComponent } from '../section/SectionComponent';
import { SectionContentComponent } from '../section/SectionContentComponent';
import { SectionHeaderComponent } from '../section/SectionHeaderComponent';
import { FilesLayout } from './FilesLayout';
import type { FilesLayoutValue } from './FilesLayoutValue';
import type { IFileItem } from './IFileItem';

// #endregion

interface IRenderedFileItem {
    readonly description: null | string;
    readonly file: IFileItem;
    readonly preview: ReturnType<typeof createFilePreviewFallback>;
    readonly testId: null | string;
}

/**
 * Frames a file collection, its semantic layout, and declaratively projected acquisition sources.
 *
 * @public
 */
@Component({
    selector: 'ngp-files',
    imports: [
        ButtonComponent,
        DividerComponent,
        DropZoneComponent,
        EmptyStateComponent,
        FileComponent,
        FilePickerComponent,
        SectionComponent,
        SectionContentComponent,
        SectionHeaderComponent,
        IconNameDirective,
        NgTemplateOutlet,
        TextComponent,
    ],
    template: `
        <ng-template #sourceContent let-source>
            @if (source.type() === sourceTypes.Picker) {
                <mosaik-file-picker
                    part="source-picker"
                    [accept]="pickerAccept(source)"
                    [multiple]="source.multiple()"
                    [directory]="source.directory()"
                    [disabled]="disabled() || source.disabled() || source.busy()"
                    (filesPicked)="onFilesPicked(source, $event)"
                >
                    <mosaik-button
                        part="source-button"
                        [label]="source.label()"
                        [iconName]="source.iconName()"
                        [appearance]="source.appearance()"
                        [variant]="source.variant()"
                        [isBusy]="source.busy()"
                        [disabled]="disabled() || source.disabled() || source.busy()"
                    />
                </mosaik-file-picker>
            } @else {
                <mosaik-button
                    part="source-button"
                    [label]="source.label()"
                    [iconName]="source.iconName()"
                    [appearance]="source.appearance()"
                    [variant]="source.variant()"
                    [isBusy]="source.busy()"
                    [disabled]="disabled() || source.disabled() || source.busy()"
                    (click)="source.request()"
                />
            }
            @if (source.description(); as text) {
                <mosaik-text part="source-description" [text]="text" [wrap]="true" [readonly]="true" />
            }
        </ng-template>

        <ng-template #compactFiles>
            @for (item of renderedFiles(); track item.file.id) {
                <ngp-file
                    part="file"
                    class="min-w-0 max-w-full"
                    [presentation]="filePresentation()"
                    [fileName]="item.file.fileName"
                    [description]="item.description"
                    [preview]="item.preview"
                    [state]="item.file.state ?? fileStates.Normal"
                    [progress]="item.file.progress ?? 0"
                    [stateLabel]="item.file.stateLabel ?? null"
                    [disabled]="disabled() || !!item.file.disabled"
                    [openLabel]="openLabel()"
                    [openDescription]="openDescription()"
                    [openIconName]="openIconName()"
                    [removable]="removable()"
                    [removeLabel]="removeLabel()"
                    [removeDescription]="removeDescription()"
                    [actionsLabel]="actionsLabel()"
                    [removeVariant]="removeVariant()"
                    [retryLabel]="retryLabel()"
                    [testId]="item.testId"
                    [maxTextLines]="maxTextLines()"
                    (openRequested)="requestOpen(item.file)"
                    (removeRequested)="requestRemoval(item.file)"
                    (retryRequested)="requestRetry(item.file)"
                />
            }
        </ng-template>

        <ng-template #filesContent>
            @if (renderedFiles().length > 0) {
                @switch (layout()) {
                    @case (layouts.Gallery) {
                        <div part="gallery" class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,12rem),1fr))] items-stretch gap-3">
                            <ng-container [ngTemplateOutlet]="compactFiles" />
                        </div>
                    }
                    @case (layouts.Inline) {
                        <div part="inline" class="flex min-w-0 flex-wrap items-center gap-2">
                            <ng-container [ngTemplateOutlet]="compactFiles" />
                        </div>
                    }
                    @case (layouts.Preview) {
                        <div part="preview" class="flex w-full flex-col gap-2">
                            @for (item of renderedFiles(); track item.file.id) {
                                <ngp-file
                                    part="file"
                                    class="w-full"
                                    [presentation]="filePresentation()"
                                    [fileName]="item.file.fileName"
                                    [description]="item.description"
                                    [preview]="item.preview"
                                    [previewFit]="previewFit()"
                                    [previewRatio]="resolvedPreviewRatio()"
                                    [state]="item.file.state ?? fileStates.Normal"
                                    [progress]="item.file.progress ?? 0"
                                    [stateLabel]="item.file.stateLabel ?? null"
                                    [disabled]="disabled() || !!item.file.disabled"
                                    [openLabel]="openLabel()"
                                    [openDescription]="openDescription()"
                                    [openIconName]="openIconName()"
                                    [removable]="removable()"
                                    [removeLabel]="removeLabel()"
                                    [removeDescription]="removeDescription()"
                                    [actionsLabel]="actionsLabel()"
                                    [removeVariant]="removeVariant()"
                                    [retryLabel]="retryLabel()"
                                    [testId]="item.testId"
                                    (openRequested)="requestOpen(item.file)"
                                    (removeRequested)="requestRemoval(item.file)"
                                    (retryRequested)="requestRetry(item.file)"
                                />
                            }
                        </div>
                    }
                    @default {
                        <div part="list" class="flex flex-col gap-1">
                            @for (item of renderedFiles(); track item.file.id; let last = $last) {
                                <div part="list-item" [class.py-3]="separateListItems()">
                                    <ngp-file
                                        part="file"
                                        class="w-full"
                                        [presentation]="filePresentation()"
                                        [fileName]="item.file.fileName"
                                        [description]="item.description"
                                        [preview]="item.preview"
                                        [state]="item.file.state ?? fileStates.Normal"
                                        [progress]="item.file.progress ?? 0"
                                        [stateLabel]="item.file.stateLabel ?? null"
                                        [disabled]="disabled() || !!item.file.disabled"
                                        [openLabel]="openLabel()"
                                        [openDescription]="openDescription()"
                                        [openIconName]="openIconName()"
                                        [removable]="removable()"
                                        [removeLabel]="removeLabel()"
                                        [removeDescription]="removeDescription()"
                                        [actionsLabel]="actionsLabel()"
                                        [removeVariant]="removeVariant()"
                                        [retryLabel]="retryLabel()"
                                        [testId]="item.testId"
                                        [maxTextLines]="maxTextLines()"
                                        (openRequested)="requestOpen(item.file)"
                                        (removeRequested)="requestRemoval(item.file)"
                                        (retryRequested)="requestRetry(item.file)"
                                    />
                                </div>
                                @if (separateListItems() && !last) {
                                    <mosaik-divider part="list-divider" />
                                }
                            }
                        </div>
                    }
                }
            } @else {
                <div
                    part="empty"
                    class="flex w-full items-center justify-center"
                    [class.min-h-24]="layout() !== layouts.Preview && layout() !== layouts.Inline"
                    [class.min-h-12]="layout() === layouts.Inline"
                    [style.aspect-ratio]="layout() === layouts.Preview ? resolvedPreviewRatio() : null"
                >
                    <mosaik-empty-state part="empty-state" [iconSize]="'small'" [iconName]="resolvedEmptyIconName()" [header]="emptyMessage() ?? label()">
                        @for (source of sources(); track source.key()) {
                            <div slot="actions" part="source" class="flex min-w-0 flex-col gap-1">
                                <ng-container [ngTemplateOutlet]="sourceContent" [ngTemplateOutletContext]="{ $implicit: source }" />
                            </div>
                        }
                    </mosaik-empty-state>
                </div>
            }
        </ng-template>

        <div part="root" class="flex min-w-0 flex-col gap-4 surface-input" [attr.aria-label]="label()" [attr.role]="'group'">
            <ngp-section>
                <ngp-section-header part="heading" [header]="label()" [description]="description() ?? ''" [disabled]="disabled()" />
                <ngp-section-content>
                    @if (activeDropSource()) {
                        <mosaik-drop-zone
                            part="drop-zone"
                            class="block w-full"
                            [variant]="variant()"
                            [attr.aria-label]="label()"
                            (dropZoneData)="onDropZoneData($event)"
                        >
                            <ng-container [ngTemplateOutlet]="filesContent" />
                        </mosaik-drop-zone>
                    } @else {
                        <div part="files" class="min-w-0">
                            <ng-container [ngTemplateOutlet]="filesContent" />
                        </div>
                    }
                    @if (renderedFiles().length > 0 && sources().length > 0) {
                        <div part="sources" class="flex flex-wrap items-start justify-end gap-2">
                            @for (source of sources(); track source.key()) {
                                <div part="source" class="flex min-w-0 flex-col gap-1">
                                    <ng-container [ngTemplateOutlet]="sourceContent" [ngTemplateOutletContext]="{ $implicit: source }" />
                                </div>
                            }
                        </div>
                    }
                </ngp-section-content>
            </ngp-section>
        </div>

        <ng-content select="ngp-file-source" />
    `,
    styles: `
        :host {
            display: block;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-layout]': 'layout()',
    },
})
export class FilesComponent {
    // #region Fields
    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /** Files rendered inside the container. */
    public readonly files: InputSignal<ReadonlyArray<IFileItem>> = input.required<ReadonlyArray<IFileItem>>();

    /** Visual arrangement used for file items; defaults to the tile gallery. */
    public readonly layout: InputSignal<FilesLayoutValue> = input<FilesLayoutValue>(FilesLayout.Gallery);

    /** User-facing label framing the complete control. */
    public readonly label: InputSignal<string> = input.required<string>();

    /** Optional explanation rendered below the label. */
    public readonly description: InputSignal<null | string> = input<null | string>(null);

    /** Optional text rendered when the collection is empty. */
    public readonly emptyMessage: InputSignal<null | string> = input<null | string>(null);

    /** Optional icon overriding the empty representation's source-derived icon. */
    public readonly emptyIconName: InputSignal<null | string> = input<null | string>(null);

    /** Whether the complete control rejects interactions. */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false);

    /** Whether file sizes are rendered when no item description is supplied. */
    public readonly showFileSize: InputSignal<boolean> = input<boolean>(false);

    /** Whether list items are separated visually. */
    public readonly separateListItems: InputSignal<boolean> = input<boolean>(false);

    /** Unit label appended to rounded file sizes in kilobytes. */
    public readonly fileSizeUnitLabel: InputSignal<string> = input<string>('KB');

    /** Accessible label enabling each file's open action. */
    public readonly openLabel: InputSignal<null | string> = input<null | string>(null);

    /** Optional supporting text for each file's open action. */
    public readonly openDescription = input<string | null>(null);

    /** Icon used by each open action. */
    public readonly openIconName: InputSignal<string> = input<string>('open');

    /** Whether each file may expose a removal action. */
    public readonly removable: InputSignal<boolean> = input<boolean>(false);

    /** Accessible label for each removal action. */
    public readonly removeLabel: InputSignal<null | string> = input<null | string>(null);

    /** Optional supporting text for each file's remove action. */
    public readonly removeDescription = input<string | null>(null);

    /** Accessible label of each file's contextual action menu. */
    public readonly actionsLabel: InputSignal<null | string> = input<null | string>(null);

    /** Prefix of the per-file automation identifiers; disables them when empty. */
    public readonly testIdPrefix: InputSignal<null | string> = input<null | string>(null);

    /** Visual variant used by each removal action. */
    public readonly removeVariant: InputSignal<Variant> = input<Variant>('danger');

    /** Accessible label enabling retry actions for retry-state files. */
    public readonly retryLabel: InputSignal<null | string> = input<null | string>(null);

    /** Image and video fit used by preview layout. */
    public readonly previewFit: InputSignal<ObjectFit> = input<ObjectFit>('contain');

    /** Aspect ratio used by preview layout. */
    public readonly previewRatio: InputSignal<string> = input<string>('16 / 9');

    /** Visual variant used by the framing drop zone. */
    public readonly variant: InputSignal<Variant> = input<Variant>('primary');

    /** Maximum number of copy lines shown per file. */
    public readonly maxTextLines: InputSignal<null | number> = input<null | number>(null);

    /** Emits the stable identifier of a file requested for opening. */
    public readonly openRequested: OutputEmitterRef<IFileItem['id']> = output<IFileItem['id']>();

    /** Emits the stable identifier of a file requested for removal. */
    public readonly removeRequested: OutputEmitterRef<IFileItem['id']> = output<IFileItem['id']>();

    /** Emits the stable identifier of a file requested for retry. */
    public readonly retryRequested: OutputEmitterRef<IFileItem['id']> = output<IFileItem['id']>();

    /** Declaratively supplied headless acquisition sources. */
    protected readonly sources: Signal<ReadonlyArray<FileSourceComponent>> = contentChildren(FileSourceComponent);

    /** Layout constants exposed to the template. */
    protected readonly layouts: typeof FilesLayout = FilesLayout;

    /** Source-type constants exposed to the template. */
    protected readonly sourceTypes: typeof FileSourceType = FileSourceType;

    /** File-state constants exposed to the template. */
    protected readonly fileStates: typeof FileState = FileState;

    /** Presentation derived from the container layout. */
    protected readonly filePresentation: Signal<FilePresentationValue> = computed(() => {
        switch (this.layout()) {
            case FilesLayout.Gallery:
                return FilePresentation.Tile;
            case FilesLayout.Inline:
                return FilePresentation.Chip;
            case FilesLayout.Preview:
                return FilePresentation.Preview;
            default:
                return FilePresentation.List;
        }
    });

    /** Files enriched with stable previews, display descriptions, and automation ids. */
    protected readonly renderedFiles: Signal<ReadonlyArray<IRenderedFileItem>> = computed(() => {
        const prefix = this.testIdPrefix()?.trim();

        return this.files().map((file) => ({
            description: this.resolveDescription(file),
            file,
            preview: this.resolvePreview(file),
            testId: prefix ? `${prefix}-${file.id}` : null,
        }));
    });

    /** Empty-state icon derived from an explicit override or one unambiguous source. */
    protected readonly resolvedEmptyIconName: Signal<string> = computed(() => {
        const explicitIconName = this.emptyIconName()?.trim();
        if (explicitIconName) {
            return explicitIconName;
        }

        const sources = this.sources();
        return sources.length === 1 ? sources[0]?.iconName().trim() || 'attach' : 'attach';
    });

    /** The only picker source eligible for drop routing, or null for ambiguous configuration. */
    protected readonly dropSource: Signal<FileSourceComponent | null> = computed(() => {
        const candidates = this.sources().filter((source) => source.type() === FileSourceType.Picker && source.dropEnabled());

        return candidates.length === 1 ? (candidates[0] ?? null) : null;
    });

    /** The drop source currently able to accept a drop, or null for the non-interactive frame. */
    protected readonly activeDropSource: Signal<FileSourceComponent | null> = computed(() => {
        const source = this.dropSource();

        return source && !this.disabled() && !source.disabled() && !source.busy() ? source : null;
    });

    /** Non-empty aspect ratio used by preview layout and its empty placeholder. */
    protected readonly resolvedPreviewRatio: Signal<string> = computed(() => this.previewRatio().trim() || '16 / 9');

    // #endregion

    // #region Methods

    /** Routes dropped files only when exactly one picker source owns drop acquisition. */
    protected onDropZoneData(event: unknown): void {
        const source = this.activeDropSource();
        if (!source) {
            return;
        }

        const detail = event as Partial<IDropZoneDataEventDetail> | null | undefined;
        this.routeFiles(source, this.toFiles(detail?.files ?? detail?.dataTransfer?.files ?? detail?.data?.files));
    }

    /** Routes files selected by one rendered picker source. */
    protected onFilesPicked(source: FileSourceComponent, event: unknown): void {
        if (this.disabled()) {
            return;
        }

        const detail = event as Partial<IFilesPickedEventDetail> | null | undefined;
        this.routeFiles(source, this.toFiles(detail?.files));
    }

    /** Returns a mutable Mosaik-compatible copy of one source's accepted patterns. */
    protected pickerAccept(source: FileSourceComponent): Array<string> {
        return [...source.accept()];
    }

    /** Emits a stable open request for an interactive available file. */
    protected requestOpen(file: IFileItem): void {
        if (!this.disabled() && !file.disabled && file.state !== FileState.Unavailable && this.openLabel()?.trim()) {
            this.openRequested.emit(file.id);
        }
    }

    /** Emits a stable removal request for an interactive file. */
    protected requestRemoval(file: IFileItem): void {
        if (!this.disabled() && !file.disabled && this.removable() && this.removeLabel()?.trim()) {
            this.removeRequested.emit(file.id);
        }
    }

    /** Emits a stable retry request for an interactive retry-state file. */
    protected requestRetry(file: IFileItem): void {
        if (!this.disabled() && !file.disabled && file.state === FileState.Retry && this.retryLabel()?.trim()) {
            this.retryRequested.emit(file.id);
        }
    }

    private isAccepted(source: FileSourceComponent, file: File): boolean {
        const patterns = source
            .accept()
            .map((pattern) => pattern.trim().toLowerCase())
            .filter((pattern) => pattern.length > 0);
        if (patterns.length === 0) {
            return true;
        }

        const fileName = file.name.toLowerCase();
        const contentType = file.type.toLowerCase();

        return patterns.some((pattern) => {
            if (pattern.startsWith('.')) {
                return fileName.endsWith(pattern);
            }
            if (pattern.endsWith('/*')) {
                const expectedKind = pattern.slice(0, -2);

                return (
                    contentType.startsWith(`${expectedKind}/`) ||
                    matchesFilePreviewMediaKind(
                        expectedKind === 'audio' || expectedKind === 'image' || expectedKind === 'video' ? expectedKind : 'other',
                        fileName,
                    )
                );
            }

            return contentType === pattern;
        });
    }

    private resolveDescription(file: IFileItem): null | string {
        const description = file.description?.trim();
        if (description) {
            return description;
        }
        const extension = resolveFileExtensionLabel(file.fileName);
        const fileSize =
            this.showFileSize() && file.sizeInBytes !== null && file.sizeInBytes !== undefined
                ? `${Math.round(file.sizeInBytes / 1024)} ${this.fileSizeUnitLabel()}`
                : null;

        return [extension, fileSize].filter((value): value is string => !!value).join(' · ') || null;
    }

    private resolvePreview(file: IFileItem): ReturnType<typeof createFilePreviewFallback> {
        if (file.preview) {
            return file.preview;
        }
        if (!file.previewUrl) {
            return createFilePreviewFallback();
        }

        return createFilePreview(resolveFilePreviewMediaKind(file.contentType ?? '', file.fileName), file.previewUrl, file.fileName);
    }

    private routeFiles(source: FileSourceComponent, files: ReadonlyArray<File>): void {
        if (source.type() !== FileSourceType.Picker || source.disabled() || source.busy() || files.length === 0) {
            return;
        }

        const acceptedByPattern = files.filter((file) => this.isAccepted(source, file));
        const accepted = source.multiple() ? acceptedByPattern : acceptedByPattern.slice(0, 1);
        const acceptedSet = new Set(accepted);
        const rejected = files.filter((file) => !acceptedSet.has(file));

        source.selectFiles(accepted);
        source.rejectFiles(rejected);
    }

    private toFiles(value: FileList | ReadonlyArray<File> | null | undefined): ReadonlyArray<File> {
        return value && typeof File !== 'undefined' ? Array.from(value).filter((item): item is File => item instanceof File) : [];
    }

    // #endregion
}
