// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output, type InputSignal, type OutputEmitterRef, type Signal } from '@angular/core';
import {
    BoxComponent,
    ButtonComponent,
    CardComponent,
    CardContentComponent,
    CellComponent,
    DividerComponent,
    DropDownButtonComponent,
    IconComponent,
    IconNameDirective,
    IconRegistry,
    MenuComponent,
    MenuItemComponent,
    ProgressRingComponent,
    TextComponent,
    ThumbnailComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import type { ImageFit, Size, ThumbnailPreview, Variant } from '@pixel-brewery/mosaik-elements-foundation';
import { HoverRevealForDirective } from '../../directives/hover-reveal-for/HoverRevealForDirective';
import { StopEventPropagationDirective } from '../../directives/stop-event-propagation/StopEventPropagationDirective';
import { createFilePreviewFallback, resolveFileExtensionLabel, resolveFileIconName } from './FilePreview';
import { FilePresentation } from './FilePresentation';
import type { FilePresentationValue } from './FilePresentationValue';
import { FileState } from './FileState';
import type { FileStateValue } from './FileStateValue';

// #endregion

/**
 * Line budget applied to gallery tiles that do not request an explicit limit.
 *
 * Tiles share one grid row, so an unbounded file name staggers every neighbour.
 */
const TILE_TEXT_LINE_LIMIT = 2;

/**
 * Displays one file as a Mosaik-based list row, gallery tile, or full-width preview.
 *
 * @public
 */
@Component({
    selector: 'ngp-file',
    imports: [
        BoxComponent,
        ButtonComponent,
        CardComponent,
        CardContentComponent,
        CellComponent,
        DividerComponent,
        DropDownButtonComponent,
        HoverRevealForDirective,
        IconComponent,
        IconNameDirective,
        MenuComponent,
        MenuItemComponent,
        NgTemplateOutlet,
        ProgressRingComponent,
        StopEventPropagationDirective,
        TextComponent,
        ThumbnailComponent,
    ],
    template: `
        <ng-template #visual>
            <div
                part="visual"
                class="relative shrink-0 overflow-hidden"
                [attr.slot]="!previewActionLabel() && isList() ? 'start' : null"
                [class.h-8]="isList() && isCompact()"
                [class.w-8]="isList() && isCompact()"
                [class.h-10]="isList() && !isCompact() && !isLarge()"
                [class.w-10]="isList() && !isCompact() && !isLarge()"
                [class.h-12]="isList() && isLarge()"
                [class.w-12]="isList() && isLarge()"
                [class.h-20]="isTile() && !isLarge()"
                [class.h-24]="isTile() && isLarge()"
                [class.w-full]="!isList()"
                [style.aspect-ratio]="isPreview() ? resolvedPreviewRatio() : null"
            >
                <mosaik-thumbnail
                    part="preview"
                    class="block h-full w-full"
                    [preview]="resolvedPreview()"
                    [fit]="resolvedPreviewFit()"
                    [disabled]="disabled()"
                />
                @if (state() !== fileState.Normal) {
                    <mosaik-box
                        part="status-overlay"
                        class="absolute inset-0"
                        [highlighted]="true"
                        [cornered]="true"
                        [fit]="'both'"
                        [inset]="['none']"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        [attr.aria-label]="resolvedStateLabel()"
                    >
                        <div part="status-content" class="flex h-full w-full items-center justify-center">
                            @switch (state()) {
                                @case (fileState.Progress) {
                                    <mosaik-progress-ring
                                        part="progress"
                                        [min]="0"
                                        [max]="1"
                                        [value]="resolvedProgress()"
                                        [isIndeterminate]="false"
                                        [variant]="statusVariant()"
                                        [radius]="isCompact() ? '6px' : '10px'"
                                        [thickness]="'2px'"
                                    />
                                }
                                @case (fileState.Loading) {
                                    <mosaik-progress-ring
                                        part="loader"
                                        [isIndeterminate]="true"
                                        [variant]="statusVariant()"
                                        [radius]="isCompact() ? '6px' : '10px'"
                                        [thickness]="'2px'"
                                    />
                                }
                                @case (fileState.Error) {
                                    <mosaik-icon part="error" [icon]="'errorCircle'" [variant]="'danger'" [size]="actionSize()" aria-hidden="true" />
                                }
                                @case (fileState.Unavailable) {
                                    <mosaik-icon part="unavailable" [icon]="'errorCircle'" [variant]="'danger'" [size]="actionSize()" aria-hidden="true" />
                                }
                                @case (fileState.Retry) {
                                    @if (resolvedRetryLabel(); as label) {
                                        <mosaik-button
                                            part="retry-button"
                                            [iconName]="'sync'"
                                            [appearance]="'plain'"
                                            [variant]="'primary'"
                                            [size]="actionSize()"
                                            [disabled]="disabled()"
                                            [attr.inert]="disabled() ? '' : null"
                                            [attr.title]="label"
                                            (click)="onRetryRequested()"
                                        >
                                            <span slot="label" class="sr-only">{{ label }}</span>
                                        </mosaik-button>
                                    }
                                }
                            }
                        </div>
                    </mosaik-box>
                }
            </div>
        </ng-template>

        <ng-template #previewSurface>
            @if (previewActionLabel(); as label) {
                <button
                    part="preview-button"
                    type="button"
                    class="flex min-w-0"
                    [class.w-full]="!isList()"
                    [class.shrink-0]="isList()"
                    [attr.slot]="isList() ? 'start' : null"
                    [attr.aria-label]="label"
                    [attr.title]="label"
                    [attr.test-id]="previewTestId()"
                    [disabled]="disabled()"
                    (click)="onPreviewActivated()"
                >
                    <ng-container [ngTemplateOutlet]="visual" />
                </button>
            } @else {
                <ng-container [ngTemplateOutlet]="visual" />
            }
        </ng-template>

        <ng-template #fileNameText>
            <mosaik-text
                part="name"
                class="min-w-0 w-full"
                [class.overflow-hidden]="resolvedMaxTextLines() !== null"
                [style.max-height]="maxTextHeight()"
                [text]="fileName()"
                [wrap]="true"
                [maxLines]="resolvedMaxTextLines()"
                [disabled]="disabled()"
            />
        </ng-template>

        <ng-template #copy>
            <div part="copy" class="flex min-w-0 flex-col gap-0.5">
                @if (isUnavailable()) {
                    <del part="unavailable-name"><ng-container [ngTemplateOutlet]="fileNameText" /></del>
                } @else {
                    <ng-container [ngTemplateOutlet]="fileNameText" />
                }
                @if (description(); as description) {
                    <mosaik-text
                        part="description"
                        class="min-w-0 w-full"
                        [class.overflow-hidden]="resolvedMaxTextLines() !== null"
                        [style.max-height]="maxTextHeight()"
                        [text]="description"
                        [wrap]="true"
                        [maxLines]="resolvedMaxTextLines()"
                        [readonly]="true"
                        [disabled]="disabled()"
                        [variant]="state() === fileState.Error ? 'danger' : 'default'"
                    />
                }
            </div>
        </ng-template>

        <!--
            The contextual actions stay collapsed until the surrounding file is hovered or receives
            keyboard focus. Tiles and previews anchor the trigger in their own top-right corner; the
            list row uses its trailing slot, which is the same corner of a single-line presentation.
        -->
        <ng-template #actions let-host>
            @if (hasActions()) {
                <mosaik-dropdown-button
                    #actionsMenu
                    part="actions"
                    class="ngp-hover-reveal"
                    [class.absolute]="!isList()"
                    [class.top-1]="!isList()"
                    [class.right-1]="!isList()"
                    [class.z-10]="!isList()"
                    [attr.slot]="isList() ? 'end' : null"
                    [caretVisible]="false"
                    [iconName]="'moreHorizontal'"
                    [appearance]="'solid'"
                    [variant]="'neutral'"
                    [size]="actionSize()"
                    [dropDownPlacement]="'bottom-end'"
                    [dropDownMaxWidth]="'320px'"
                    [disabled]="disabled()"
                    [attr.inert]="disabled() ? '' : null"
                    [attr.aria-label]="resolvedActionsLabel()"
                    [attr.title]="resolvedActionsLabel()"
                    [attr.test-id]="actionsTestId()"
                    [ngpHoverRevealFor]="host"
                    [ngpStopEventPropagation]="true"
                >
                    <span slot="label" class="sr-only">{{ resolvedActionsLabel() }}</span>
                    <mosaik-menu>
                        @if (availableOpenLabel(); as label) {
                            <mosaik-menu-item
                                part="open-action"
                                [label]="label"
                                [iconName]="openIconName()"
                                [appearance]="'plain'"
                                [attr.test-id]="openTestId()"
                                (activated)="onOpenActivated(actionsMenu)"
                            />
                        }
                        @if (removable() && resolvedRemoveLabel(); as label) {
                            @if (availableOpenLabel()) {
                                <mosaik-divider />
                            }
                            <mosaik-menu-item
                                part="remove-action"
                                [label]="label"
                                [iconName]="'delete'"
                                [appearance]="'plain'"
                                [variant]="removeVariant()"
                                [attr.test-id]="removeTestId()"
                                (activated)="onRemoveActivated(actionsMenu)"
                            />
                        }
                    </mosaik-menu>
                </mosaik-dropdown-button>
            }
        </ng-template>

        @if (isList()) {
            <mosaik-cell #root part="root" class="w-full" [disabled]="disabled()" [attr.test-id]="resolvedTestId()">
                <ng-container [ngTemplateOutlet]="previewSurface" />
                <div part="cell-copy" slot="label" class="min-w-0">
                    <ng-container [ngTemplateOutlet]="copy" />
                </div>
                <ng-container [ngTemplateOutlet]="actions" [ngTemplateOutletContext]="{ $implicit: root }" />
            </mosaik-cell>
        } @else {
            <mosaik-card
                #root
                part="root"
                class="flex-1"
                [class.min-w-20]="isTile()"
                [class.w-full]="isTile() || isPreview()"
                [appearance]="'plain'"
                [attr.test-id]="resolvedTestId()"
            >
                <mosaik-card-content part="card-content" class="relative flex min-w-0 flex-col gap-2 p-0">
                    <ng-container [ngTemplateOutlet]="previewSurface" />
                    @if (!isPreview()) {
                        <ng-container [ngTemplateOutlet]="copy" />
                    }
                    <ng-container [ngTemplateOutlet]="actions" [ngTemplateOutletContext]="{ $implicit: root }" />
                </mosaik-card-content>
            </mosaik-card>
        }
    `,
    styles: `
        @use '@pixel-brewery/mosaik-themes/scss' as themes;

        :host {
            @include themes.joy-style();

            display: block;
        }

        [part='name'],
        [part='description'] {
            overflow-wrap: break-word;
        }

        // The preview is an interactive surface, not a control with its own chrome, so the
        // button box is reset and only its focus indicator remains visible.
        [part='preview-button'] {
            appearance: none;
            background: none;
            border: 0;
            border-radius: var(--border-radius, 0.5rem);
            color: inherit;
            cursor: pointer;
            font: inherit;
            padding: 0;
            text-align: inherit;

            &:focus-visible {
                outline: 2px solid currentcolor;
                outline-offset: 2px;
            }

            &[disabled] {
                cursor: default;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-busy]': 'isBusy() ? true : null',
        '[attr.data-presentation]': 'presentation()',
        '[attr.data-size]': 'size()',
        '[attr.data-state]': 'state()',
    },
})
export class FileComponent {
    // #region Fields

    /**
     * Resolves an icon family name to the path data the Mosaik thumbnail renders.
     *
     * @private
     * @readonly
     */
    private readonly _iconRegistry: IconRegistry = inject(IconRegistry);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /**
     * Primary file name.
     *
     * @public
     * @readonly
     */
    public readonly fileName: InputSignal<string> = input.required<string>();

    /**
     * Optional file metadata or status description.
     *
     * @public
     * @readonly
     */
    public readonly description: InputSignal<null | string> = input<null | string>(null);

    /**
     * Mosaik thumbnail preview rendered for the file.
     *
     * @public
     * @readonly
     */
    public readonly preview: InputSignal<null | ThumbnailPreview> = input<null | ThumbnailPreview>(null);

    /**
     * Semantic presentation used for the file.
     *
     * @public
     * @readonly
     */
    public readonly presentation: InputSignal<FilePresentationValue> = input<FilePresentationValue>(FilePresentation.Tile);

    /**
     * Image and video fit used by the full-width preview presentation.
     *
     * @public
     * @readonly
     */
    public readonly previewFit: InputSignal<ImageFit> = input<ImageFit>('contain');

    /**
     * Aspect ratio used by the full-width preview presentation.
     *
     * @public
     * @readonly
     */
    public readonly previewRatio: InputSignal<string> = input<string>('16 / 9');

    /**
     * Mosaik size used for the preview and actions.
     *
     * @public
     * @readonly
     */
    public readonly size: InputSignal<Size> = input<Size>('large');

    /**
     * Current visual file state.
     *
     * @public
     * @readonly
     */
    public readonly state: InputSignal<FileStateValue> = input<FileStateValue>(FileState.Normal);

    /**
     * Determinate upload progress between zero and one.
     *
     * @public
     * @readonly
     */
    public readonly progress: InputSignal<number> = input<number>(0);

    /**
     * Accessible label announced for the current state.
     *
     * @public
     * @readonly
     */
    public readonly stateLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Maximum number of rendered lines per text field, or no limit when null.
     *
     * @public
     * @readonly
     */
    public readonly maxTextLines: InputSignal<null | number> = input<null | number>(null);

    /**
     * Indicates whether file interactions are disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled: InputSignal<boolean> = input<boolean>(false);

    /**
     * Accessible label enabling the optional open action when non-empty.
     *
     * @public
     * @readonly
     */
    public readonly openLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Mosaik icon used by the optional open action.
     *
     * @public
     * @readonly
     */
    public readonly openIconName: InputSignal<string> = input<string>('open');

    /**
     * Indicates whether a removal action is available.
     *
     * @public
     * @readonly
     */
    public readonly removable: InputSignal<boolean> = input<boolean>(false);

    /**
     * Accessible label for the optional removal action.
     *
     * @public
     * @readonly
     */
    public readonly removeLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Accessible label of the contextual action menu; falls back to the file name.
     *
     * @public
     * @readonly
     */
    public readonly actionsLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Stable automation identifier bound to the card and its actions.
     *
     * @public
     * @readonly
     */
    public readonly testId: InputSignal<null | string> = input<null | string>(null);

    /**
     * Mosaik variant used by the optional removal action.
     *
     * @public
     * @readonly
     */
    public readonly removeVariant: InputSignal<Variant> = input<Variant>('danger');

    /**
     * Accessible label enabling the retry action in retry state when non-empty.
     *
     * @public
     * @readonly
     */
    public readonly retryLabel: InputSignal<null | string> = input<null | string>(null);

    /**
     * Emits when the user requests the file to be opened.
     *
     * @public
     * @readonly
     */
    public readonly openRequested: OutputEmitterRef<void> = output<void>();

    /**
     * Emits when the user requests removal of the file.
     *
     * @public
     * @readonly
     */
    public readonly removeRequested: OutputEmitterRef<void> = output<void>();

    /**
     * Emits when the user requests another upload attempt.
     *
     * @public
     * @readonly
     */
    public readonly retryRequested: OutputEmitterRef<void> = output<void>();

    /**
     * File-state constants exposed to the template.
     *
     * @protected
     * @readonly
     */
    protected readonly fileState: typeof FileState = FileState;

    /**
     * Indicates whether the component renders its list-row presentation.
     *
     * @protected
     * @readonly
     */
    protected readonly isList: Signal<boolean> = computed(() => this.presentation() === FilePresentation.List);

    /**
     * Indicates whether the component renders its full-width preview presentation.
     *
     * @protected
     * @readonly
     */
    protected readonly isPreview: Signal<boolean> = computed(() => this.presentation() === FilePresentation.Preview);

    /**
     * Indicates whether the component renders its compact gallery-tile presentation.
     *
     * @protected
     * @readonly
     */
    protected readonly isTile: Signal<boolean> = computed(() => this.presentation() === FilePresentation.Tile);

    /**
     * Indicates whether the current Mosaik size uses the compact preview preset.
     *
     * @protected
     * @readonly
     */
    protected readonly isCompact: Signal<boolean> = computed(() => {
        const size = this.size();

        return size === 'tiny' || size === 'small';
    });

    /**
     * Indicates whether the current Mosaik size uses the large preview preset.
     *
     * @protected
     * @readonly
     */
    protected readonly isLarge: Signal<boolean> = computed(() => {
        const size = this.size();

        return size === 'large' || size === 'giant';
    });

    /**
     * Mosaik action-button size derived from the file size.
     *
     * @protected
     * @readonly
     */
    protected readonly actionSize: Signal<Size> = computed(() => (this.isCompact() ? 'tiny' : 'small'));

    /**
     * Upper-case file extension shown beside the icon of a file without a visual frame.
     *
     * A browser renders images and video itself; audio and every other format share a
     * family icon, so the extension is what actually tells them apart. A list row is too
     * small to carry it.
     *
     * @protected
     * @readonly
     */
    protected readonly previewExtensionLabel: Signal<null | string> = computed(() =>
        this.isList() ? null : resolveFileExtensionLabel(this.fileName()) || null,
    );

    /**
     * Preview handed to the Mosaik thumbnail.
     *
     * Audio and unrenderable formats gain the family icon and the extension label unless
     * the caller already supplied its own; a supplied preview is never overridden.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedPreview: Signal<ThumbnailPreview> = computed(() => {
        const preview = this.preview() ?? createFilePreviewFallback();
        if (preview.type !== 'other' && preview.type !== 'audio') {
            return preview;
        }

        const label = preview.label ?? this.previewExtensionLabel() ?? undefined;

        // Audio keeps Mosaik's play icon unless the caller replaces it; every other
        // format needs the icon of its document family.
        return preview.type === 'audio' ? { ...preview, label } : { ...preview, icon: preview.icon ?? this.resolveFamilyIconData(), label };
    });

    /**
     * Media fit derived from the semantic presentation.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedPreviewFit: Signal<ImageFit> = computed(() => (this.isPreview() ? this.previewFit() : 'cover'));

    /**
     * Non-empty aspect ratio used by the preview surface.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedPreviewRatio: Signal<string> = computed(() => this.previewRatio().trim() || '16 / 9');

    /**
     * Positive integral line limit accepted by the Mosaik text control.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedMaxTextLines: Signal<null | number> = computed(() => {
        const maxTextLines = this.maxTextLines();
        if (maxTextLines === null || !Number.isFinite(maxTextLines)) {
            return this.isTile() ? TILE_TEXT_LINE_LIMIT : null;
        }

        return Math.max(1, Math.floor(maxTextLines));
    });

    /**
     * Host-level fallback for Mosaik themes that do not apply their internal line clamp.
     *
     * @protected
     * @readonly
     */
    protected readonly maxTextHeight: Signal<null | string> = computed(() => {
        const maxTextLines = this.resolvedMaxTextLines();

        return maxTextLines === null ? null : `calc(${maxTextLines} * 1lh)`;
    });

    /**
     * Upload progress clamped to the supported zero-to-one range.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedProgress: Signal<number> = computed(() => {
        const progress = this.progress();

        return Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
    });

    /**
     * Indicates whether assistive technologies should treat the file as busy.
     *
     * @protected
     * @readonly
     */
    protected readonly isBusy: Signal<boolean> = computed(() => this.state() === FileState.Loading || this.state() === FileState.Progress);

    /**
     * Indicates that the represented file cannot currently be accessed.
     *
     * @protected
     * @readonly
     */
    protected readonly isUnavailable: Signal<boolean> = computed(() => this.state() === FileState.Unavailable);

    /**
     * Accessible status text with a deterministic file-name fallback.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedStateLabel: Signal<string> = computed(() => this.stateLabel()?.trim() || this.description()?.trim() || this.fileName());

    /**
     * Optional open-action label normalized for fail-closed rendering.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedOpenLabel: Signal<null | string> = computed(() => this.openLabel()?.trim() || null);

    /**
     * Open-action label exposed only while the represented file is available.
     *
     * @protected
     * @readonly
     */
    protected readonly availableOpenLabel: Signal<null | string> = computed(() => (this.isUnavailable() ? null : this.resolvedOpenLabel()));

    /**
     * Optional removal label normalized for fail-closed rendering.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedRemoveLabel: Signal<null | string> = computed(() => this.removeLabel()?.trim() || null);

    /**
     * Indicates whether at least one contextual action is currently offered.
     *
     * @protected
     * @readonly
     */
    protected readonly hasActions: Signal<boolean> = computed(
        () => this.availableOpenLabel() !== null || (this.removable() && this.resolvedRemoveLabel() !== null),
    );

    /**
     * Accessible name of the action menu, naming the file when no label is supplied.
     *
     * The menu is the only route to the offered actions, so a missing label must never
     * hide it; the file name keeps the trigger announceable in that case.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedActionsLabel: Signal<string> = computed(() => this.actionsLabel()?.trim() || this.fileName());

    /**
     * Accessible name of the preview surface, naming the action and the file.
     *
     * @protected
     * @readonly
     */
    protected readonly previewActionLabel: Signal<null | string> = computed(() => {
        const label = this.availableOpenLabel();

        return label === null ? null : `${label}: ${this.fileName()}`;
    });

    /**
     * Automation identifier normalized for fail-closed rendering.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedTestId: Signal<null | string> = computed(() => this.testId()?.trim() || null);

    /**
     * Automation identifier of the preview surface.
     *
     * @protected
     * @readonly
     */
    protected readonly previewTestId: Signal<null | string> = computed(() => this.suffixTestId('preview'));

    /**
     * Automation identifier of the open action.
     *
     * @protected
     * @readonly
     */
    protected readonly openTestId: Signal<null | string> = computed(() => this.suffixTestId('open'));

    /**
     * Automation identifier of the removal action.
     *
     * @protected
     * @readonly
     */
    protected readonly removeTestId: Signal<null | string> = computed(() => this.suffixTestId('remove'));

    /**
     * Automation identifier of the contextual action menu.
     *
     * @protected
     * @readonly
     */
    protected readonly actionsTestId: Signal<null | string> = computed(() => this.suffixTestId('actions'));

    /**
     * Optional retry label normalized for fail-closed rendering.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedRetryLabel: Signal<null | string> = computed(() => this.retryLabel()?.trim() || null);

    /**
     * Variant used for error copy and status visuals.
     *
     * @protected
     * @readonly
     */
    protected readonly statusVariant: Signal<Variant> = computed(() => (this.state() === FileState.Error || this.isUnavailable() ? 'danger' : 'primary'));

    // #endregion

    // #region Methods

    /**
     * Emits an open request when the action is enabled.
     *
     * @protected
     */
    protected onOpenRequested(): void {
        if (!this.disabled() && this.availableOpenLabel()) {
            this.openRequested.emit();
        }
    }

    /**
     * Emits an open request for the activated preview surface.
     *
     * The preview never removes anything, so selecting the card cannot destroy data.
     *
     * @protected
     */
    protected onPreviewActivated(): void {
        this.onOpenRequested();
    }

    /**
     * Emits an open request and closes the contextual menu it was selected in.
     *
     * @protected
     */
    protected onOpenActivated(menu: DropDownButtonComponent): void {
        menu.invoke('close');
        this.onOpenRequested();
    }

    /**
     * Emits a removal request and closes the contextual menu it was selected in.
     *
     * @protected
     */
    protected onRemoveActivated(menu: DropDownButtonComponent): void {
        menu.invoke('close');
        this.onRemoveRequested();
    }

    /**
     * Emits a removal request when the action is enabled.
     *
     * @protected
     */
    protected onRemoveRequested(): void {
        if (!this.disabled() && this.removable() && this.resolvedRemoveLabel()) {
            this.removeRequested.emit();
        }
    }

    /**
     * Emits a retry request only from the retry state.
     *
     * @protected
     */
    protected onRetryRequested(): void {
        if (!this.disabled() && this.state() === FileState.Retry && this.resolvedRetryLabel()) {
            this.retryRequested.emit();
        }
    }

    /**
     * Returns the icon data of the file's document family, or nothing when the icon is
     * not registered in the consuming application.
     *
     * @private
     */
    private resolveFamilyIconData(): string | undefined {
        try {
            return this._iconRegistry.get(resolveFileIconName(this.fileName()));
        } catch {
            return undefined;
        }
    }

    /**
     * Derives one action-scoped automation identifier.
     *
     * @private
     */
    private suffixTestId(suffix: string): null | string {
        const testId = this.testId()?.trim();

        return testId ? `${testId}-${suffix}` : null;
    }

    // #endregion
}
