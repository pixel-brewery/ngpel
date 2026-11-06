// #region Imports

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    forwardRef,
    inject,
    type InjectionToken,
    input,
    OnDestroy,
    output,
    signal,
    type Signal,
    viewChild,
    ViewEncapsulation,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ButtonComponent, IconNameDirective, TextComponent } from '@pixel-brewery/mosaik-elements-angular';
import { FORM_STATUS_HOST } from '@pixel-brewery/mosaik-elements-angular';
import { CodeEditorComponentIntl, provideCodeEditorComponentIntl } from './CodeEditorComponentIntl';
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap, type CompletionSource } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { markdown } from '@codemirror/lang-markdown';
import { bracketMatching, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import {
    drawSelection,
    dropCursor,
    EditorView,
    type EditorViewConfig,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    rectangularSelection,
    tooltips,
} from '@codemirror/view';
import { classHighlighter } from '@lezer/highlight';
import { Marked } from 'marked';
import { createPlaceholderCompletions } from './placeholderCompletions';

// #endregion

/**
 * Typed reference to Mosaik's internal FORM_STATUS_HOST InjectionToken.
 *
 * @internal
 */
const MOSAIK_FORM_STATUS_HOST = FORM_STATUS_HOST as InjectionToken<ControlValueAccessor>;

/**
 * A consolidated code editor component built on CodeMirror 6.
 * Follows the Mosaik code-editor pattern with compartment-based extension management.
 * Supports placeholder autocompletion for template variables (e.g. `{{firstName}}`).
 *
 * @public
 */
@Component({
    selector: 'ngp-code-editor',
    template: `
        <div class="ngp-code-editor__container relative flex h-full w-full flex-col">
            <div
                class="flex h-8 shrink-0 items-center justify-end gap-1 border-b border-(--ngp-code-editor-border-color) bg-(--ngp-code-editor-background) px-1 py-0.5"
                aria-label="Code editor tools"
            >
                @if (canPreview()) {
                    <mosaik-button
                        [iconName]="'eye'"
                        [appearance]="'plain'"
                        [size]="'small'"
                        [type]="'button'"
                        [attr.aria-pressed]="isPreviewOpen()"
                        [attr.aria-label]="isPreviewOpen() ? _intl.previewHideLabel : _intl.previewShowLabel"
                        [attr.title]="isPreviewOpen() ? _intl.previewHideLabel : _intl.previewShowLabel"
                        (click)="onPreviewButtonClick()"
                    />
                }
                <mosaik-button
                    [iconName]="isMaximized() ? 'fullScreenMinimize' : 'fullScreenMaximize'"
                    [appearance]="'plain'"
                    [size]="'small'"
                    [type]="'button'"
                    [attr.aria-pressed]="isMaximized()"
                    [attr.aria-label]="isMaximized() ? _intl.editorMinimizeLabel : _intl.editorMaximizeLabel"
                    [attr.title]="isMaximized() ? _intl.editorMinimizeLabel : _intl.editorMaximizeLabel"
                    (click)="onMaximizeButtonClick()"
                />
            </div>
            <div class="ngp-code-editor__editor min-h-0 w-full max-w-full flex-1" #editorHost></div>

            @if (isPreviewOpen()) {
                <div class="absolute inset-x-0 bottom-0 top-8 z-30 flex flex-col bg-(--ngp-code-editor-background)">
                    <div
                        class="flex h-8 shrink-0 items-center justify-between border-b border-(--ngp-code-editor-border-color) bg-(--ngp-code-editor-background) px-2 py-0.5"
                    >
                        <mosaik-text [text]="previewTitle()" />
                        <mosaik-button
                            [iconName]="'dismiss'"
                            [appearance]="'plain'"
                            [size]="'small'"
                            [type]="'button'"
                            [attr.aria-label]="_intl.previewCloseLabel"
                            [attr.title]="_intl.previewCloseLabel"
                            (click)="onClosePreviewButtonClick()"
                        />
                    </div>
                    <iframe
                        class="min-h-0 w-full flex-1 border-0 bg-white"
                        [title]="previewTitle()"
                        loading="eager"
                        referrerpolicy="no-referrer"
                        sandbox="allow-downloads allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-top-navigation-by-user-activation"
                        [srcdoc]="previewDocument()"
                    ></iframe>
                </div>
            }
        </div>
    `,
    styles: `
        /* CodeMirror's style-mod rules are not mounted in this app shell, so the editor
           wrapper provides the required base layout and token classes explicitly. */
        ngp-code-editor {
            --ngp-code-editor-background: var(--mosaik-scheme-surface, var(--mosaik-scheme-surface, #fdfdfc));
            --ngp-code-editor-border-color: var(--mosaik-scheme-middlelight, var(--mosaik-scheme-middlelight, #b9b6b3));
            --ngp-code-editor-color: var(--mosaik-scheme-foreground, var(--mosaik-scheme-foreground, #373737));
            --ngp-code-editor-gutter-background: color-mix(in srgb, var(--ngp-code-editor-background) 90%, var(--ngp-code-editor-border-color));
            --ngp-code-editor-height: 16rem;
            --ngp-code-editor-highlight: var(--mosaik-scheme-selection, var(--mosaik-scheme-selection, #d6d3d0));
            --ngp-code-editor-radius: var(--mosaik-layout-radius, var(--mosaik-layout-radius, 6px));
            --ngp-code-editor-toolbar-height: 2rem;

            background: var(--ngp-code-editor-background);
            border: 1px solid var(--ngp-code-editor-border-color);
            border-radius: var(--ngp-code-editor-radius);
            box-sizing: border-box;
            color: var(--ngp-code-editor-color);
            display: block;
            overflow: hidden;
            width: 100%;
            height: var(--ngp-code-editor-height);

            &.ngp-code-editor--overlay {
                bottom: var(--ngp-code-editor-overlay-bottom, 0);
                height: auto;
                left: var(--ngp-code-editor-overlay-left, 0);
                position: absolute;
                right: var(--ngp-code-editor-overlay-right, 0);
                top: var(--ngp-code-editor-overlay-top, 0);
                width: auto;
                z-index: 1100;
            }

            &:focus-within {
                border-color: var(--mosaik-color-primary-500, var(--mosaik-color-primary-500, #b41f1f));
                box-shadow: 0 0 0 2px color-mix(in srgb, var(--mosaik-color-primary-500, var(--mosaik-color-primary-500, #b41f1f)) 18%, transparent);
            }

            .ngp-code-editor__editor {
                > .cm-editor {
                    background: var(--ngp-code-editor-background);
                    box-sizing: border-box;
                    color: var(--ngp-code-editor-color);
                    display: flex !important;
                    flex-direction: column;
                    font: var(--mosaik-typography-body2, var(--mosaik-typography-body2, 400 13px/18px Inter, sans-serif));
                    height: 100%;
                    max-width: 100%;
                    outline: none;
                    position: relative !important;
                    width: 100%;

                    .cm-scroller {
                        display: flex !important;
                        align-items: flex-start !important;
                        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
                        font-size: 13px;
                        height: 100%;
                        line-height: 1.45;
                        overflow: auto;
                        overflow-anchor: none;
                        position: relative;
                        z-index: 0;
                    }

                    .cm-content {
                        box-sizing: border-box;
                        caret-color: transparent !important;
                        display: block;
                        flex-grow: 2;
                        flex-shrink: 0;
                        margin: 0;
                        max-width: 100%;
                        min-height: 100%;
                        outline: none;
                        padding: var(--mosaik-layout-space, 6px) 0;
                        white-space: pre;
                        word-wrap: normal;
                    }

                    .cm-content[contenteditable='true'] {
                        -webkit-user-modify: read-write-plaintext-only;
                    }

                    .cm-lineWrapping {
                        flex-shrink: 1;
                        overflow-wrap: anywhere;
                        white-space: break-spaces;
                        word-break: break-word;
                    }

                    .cm-line {
                        caret-color: transparent !important;
                        display: block;
                        padding: 0 8px;

                        &::selection,
                        & ::selection {
                            background-color: transparent !important;
                        }
                    }

                    .cm-layer {
                        contain: size style;
                        left: 0;
                        position: absolute;
                        top: 0;
                        user-select: none;
                    }

                    .cm-layer > * {
                        position: absolute;
                    }

                    .cm-selectionBackground {
                        background: color-mix(in srgb, var(--ngp-code-editor-highlight) 60%, transparent);
                    }

                    &.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground,
                    &:focus-within > .cm-scroller > .cm-selectionLayer .cm-selectionBackground {
                        background: color-mix(in srgb, var(--ngp-code-editor-highlight) 82%, transparent);
                    }

                    .cm-cursorLayer {
                        pointer-events: none;
                    }

                    &.cm-focused > .cm-scroller > .cm-cursorLayer,
                    &:focus-within > .cm-scroller > .cm-cursorLayer {
                        animation: steps(1) ngp-code-editor-blink 1.2s infinite;
                    }

                    .cm-cursor,
                    .cm-dropCursor {
                        border-left: 1.2px solid var(--ngp-code-editor-color);
                        margin-left: -0.6px;
                        pointer-events: none;
                    }

                    .cm-cursor {
                        display: none;
                    }

                    &.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor,
                    &:focus-within > .cm-scroller > .cm-cursorLayer .cm-cursor {
                        display: block;
                    }

                    .cm-activeLine {
                        background: color-mix(in srgb, var(--ngp-code-editor-highlight) 30%, transparent);
                    }

                    .cm-gutters {
                        background: var(--ngp-code-editor-gutter-background);
                        border-right: 1px solid var(--ngp-code-editor-border-color);
                        box-sizing: border-box;
                        color: var(--mosaik-scheme-lowlight, var(--mosaik-scheme-lowlight, #93908d));
                        display: flex;
                        flex-shrink: 0;
                        height: 100%;
                        z-index: 200;
                    }

                    .cm-gutter {
                        box-sizing: border-box;
                        display: flex !important;
                        flex-direction: column;
                        flex-shrink: 0;
                        min-height: 100%;
                        overflow: hidden;
                    }

                    .cm-gutterElement {
                        box-sizing: border-box;
                    }

                    .cm-lineNumbers .cm-gutterElement {
                        min-width: 28px;
                        padding: 0 6px 0 8px;
                        text-align: right;
                        white-space: nowrap;
                    }

                    .cm-foldGutter .cm-gutterElement {
                        color: var(--mosaik-scheme-lowlight, var(--mosaik-scheme-lowlight, #93908d));
                        cursor: pointer;
                        min-width: 16px;
                        padding: 0 4px;
                        text-align: center;
                    }

                    .cm-activeLineGutter {
                        background: color-mix(in srgb, var(--ngp-code-editor-highlight) 44%, transparent);
                    }

                    .cm-placeholder {
                        color: var(--mosaik-scheme-lowlight, var(--mosaik-scheme-lowlight, #93908d));
                        display: inline-block;
                        user-select: none;
                        vertical-align: top;
                    }

                    .cm-tooltip {
                        background: var(--ngp-code-editor-background);
                        border: 1px solid var(--ngp-code-editor-border-color);
                        border-radius: var(--ngp-code-editor-radius);
                        box-shadow: 0 8px 24px color-mix(in srgb, var(--mosaik-color-neutral-900, #0d0d0d) 16%, transparent);
                        color: var(--ngp-code-editor-color);
                    }

                    .cm-tooltip-autocomplete ul {
                        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
                        list-style: none;
                        margin: 0;
                        max-height: 15rem;
                        overflow-y: auto;
                        padding: 4px;
                    }

                    .cm-tooltip-autocomplete li {
                        border-radius: 4px;
                        padding: 2px 8px;
                    }

                    .cm-tooltip-autocomplete li[aria-selected] {
                        background: color-mix(in srgb, var(--ngp-code-editor-highlight) 70%, transparent);
                    }

                    .tok-comment,
                    .tok-meta,
                    .tok-punctuation {
                        color: var(--mosaik-scheme-lowlight, var(--mosaik-scheme-lowlight, #93908d));
                    }

                    .tok-keyword,
                    .tok-typeName,
                    .tok-className,
                    .tok-macroName,
                    .tok-propertyName,
                    .tok-labelName {
                        color: var(--mosaik-color-info-600, var(--mosaik-color-info-600, #054da7));
                    }

                    .tok-atom,
                    .tok-bool,
                    .tok-literal,
                    .tok-number {
                        color: var(--mosaik-color-warning-600, var(--mosaik-color-warning-600, #7d4e00));
                    }

                    .tok-string,
                    .tok-string2,
                    .tok-url {
                        color: var(--mosaik-color-success-600, var(--mosaik-color-success-600, #0f5d26));
                    }

                    .tok-variableName,
                    .tok-variableName2 {
                        color: var(--mosaik-color-highlight-600, var(--mosaik-color-highlight-600, #5f35ae));
                    }

                    .tok-invalid,
                    .tok-deleted {
                        color: var(--mosaik-color-danger-600, var(--mosaik-color-danger-600, #a10e25));
                    }

                    .tok-inserted {
                        color: var(--mosaik-color-success-600, var(--mosaik-color-success-600, #0f5d26));
                    }

                    .tok-heading,
                    .tok-strong {
                        font-weight: 700;
                    }

                    .tok-emphasis {
                        font-style: italic;
                    }
                }
            }
        }

        @keyframes ngp-code-editor-blink {
            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, IconNameDirective, TextComponent],
    host: {
        '[class.ngp-code-editor--maximized]': 'isMaximized()',
        '[class.ngp-code-editor--overlay]': 'isOverlayOpen()',
        '[class.ngp-code-editor--preview-open]': 'isPreviewOpen()',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CodeEditorComponent),
            multi: true,
        },
        {
            provide: MOSAIK_FORM_STATUS_HOST,
            useExisting: forwardRef(() => CodeEditorComponent),
        },
        provideCodeEditorComponentIntl({
            previewShowLabel: 'loc.codeEditor.preview.show',
            previewHideLabel: 'loc.codeEditor.preview.hide',
            previewCloseLabel: 'loc.codeEditor.preview.close',
            editorMaximizeLabel: 'loc.codeEditor.editor.maximize',
            editorMinimizeLabel: 'loc.codeEditor.editor.minimize',
        }),
    ],
})
export class CodeEditorComponent implements ControlValueAccessor, OnDestroy {
    // #region Fields

    protected readonly _intl: CodeEditorComponentIntl = inject(CodeEditorComponentIntl, { optional: true }) ?? new CodeEditorComponentIntl();
    private readonly _hostElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    private readonly _domSanitizer: DomSanitizer = inject(DomSanitizer);
    private readonly _editorHost = viewChild<ElementRef<HTMLDivElement>>('editorHost');
    private readonly _languageCompartment = new Compartment();
    private readonly _readonlyCompartment = new Compartment();
    private readonly _autocompleteCompartment = new Compartment();
    private readonly _markdown = new Marked({ breaks: true, gfm: true });
    private readonly _isMaximized = signal<boolean>(false);
    private readonly _isPreviewOpen = signal<boolean>(false);
    private readonly _valueSignal = signal<string>('');
    private _overlayElement: HTMLElement | undefined;
    private _overlayOffsetParentElement: HTMLElement | undefined;
    private _overlayResizeObserver: ResizeObserver | undefined;
    private _editor: EditorView | undefined;
    private _value = '';
    private _onChange: ((value: string) => void) | undefined;
    private _onTouched: (() => void) | undefined;

    // #endregion

    // #region Ctor

    public constructor() {
        effect(() => {
            const host = this._editorHost();
            if (host && !this._editor) {
                this._editor = new EditorView(this.buildEditorConfig(host.nativeElement));
                this.initialized.emit(this._editor);

                if (this._value && this._editor.state.doc.length === 0) {
                    this._editor.dispatch({
                        changes: { from: 0, to: 0, insert: this._value },
                    });
                }
            }
        });

        effect(() => {
            const placeholderList = this.placeholders();
            if (this._editor) {
                this._editor.dispatch({
                    effects: this._autocompleteCompartment.reconfigure(this.buildAutocompleteExtension(placeholderList)),
                });
            }
        });

        effect(() => {
            const lang = this.language();
            if (this._editor) {
                this._editor.dispatch({
                    effects: this._languageCompartment.reconfigure(this.buildLanguageExtension(lang)),
                });
            }
        });

        effect(() => {
            const isReadonly = this.readonly();
            if (this._editor) {
                this._editor.dispatch({
                    effects: this._readonlyCompartment.reconfigure([EditorState.readOnly.of(isReadonly), EditorView.editable.of(!isReadonly)]),
                });
            }
        });
    }

    // #endregion

    // #region Properties

    /**
     * Whether the editor is read-only.
     *
     * @public
     * @readonly
     */
    public readonly readonly = input<boolean>(false);

    /**
     * The language mode for syntax highlighting.
     * Supports HTML, Markdown and plain text.
     *
     * @public
     * @readonly
     */
    public readonly language = input<'html' | 'markdown' | 'text'>('html');

    /**
     * Tooltip positioning strategy.
     *
     * @public
     * @readonly
     */
    public readonly tooltipPosition = input<'fixed' | 'absolute'>('absolute');

    /**
     * List of placeholder names available for autocompletion.
     * These will be offered as `{{placeholderName}}` completions.
     *
     * @public
     * @readonly
     */
    public readonly placeholders = input<ReadonlyArray<string>>([]);

    /**
     * Whether a rendered preview is available for the active language.
     *
     * @public
     * @readonly
     */
    public readonly canPreview: Signal<boolean> = computed(() => this.language() === 'html' || this.language() === 'markdown');

    /**
     * Accessible title for the active preview mode.
     *
     * @public
     * @readonly
     */
    public readonly previewTitle: Signal<string> = computed(() => (this.language() === 'markdown' ? 'Markdown Preview' : 'HTML Preview'));

    /**
     * Whether the editor is expanded over the drawer content area.
     *
     * @public
     * @readonly
     */
    public readonly isMaximized: Signal<boolean> = this._isMaximized.asReadonly();

    /**
     * Whether the rendered preview overlay is open.
     *
     * @public
     * @readonly
     */
    public readonly isPreviewOpen: Signal<boolean> = this._isPreviewOpen.asReadonly();

    /**
     * Whether any drawer-sized overlay mode is active.
     *
     * @public
     * @readonly
     */
    public readonly isOverlayOpen: Signal<boolean> = computed(() => this._isMaximized() || this._isPreviewOpen());

    /**
     * Current editor document rendered inside the preview iframe.
     *
     * @public
     * @readonly
     */
    public readonly previewDocument: Signal<SafeHtml> = computed(() =>
        this._domSanitizer.bypassSecurityTrustHtml(this.buildPreviewDocument(this._valueSignal())),
    );

    /**
     * Emits the `EditorView` instance once the editor is initialized.
     *
     * @public
     * @readonly
     */
    public readonly initialized = output<EditorView>();

    // #endregion

    // #region Methods

    public ngOnDestroy(): void {
        this._editor?.destroy();
        this.releaseOverlayBounds();
    }

    public writeValue(value: unknown): void {
        const nextValue = value === null || value === undefined ? '' : String(value);

        if (this._value === nextValue) {
            return;
        }

        this._value = nextValue;
        this._valueSignal.set(nextValue);

        if (!this._editor) {
            return;
        }

        this._editor.dispatch({
            changes: {
                from: 0,
                to: this._editor.state.doc.length,
                insert: nextValue,
            },
        });
    }

    public registerOnChange(fn: (value: string) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        if (this._editor) {
            this._editor.dispatch({
                effects: this._readonlyCompartment.reconfigure([EditorState.readOnly.of(isDisabled), EditorView.editable.of(!isDisabled)]),
            });
        }
    }

    /**
     * Focuses the editor.
     *
     * @public
     */
    public focus(): void {
        this._editor?.focus();
    }

    /**
     * Toggles the drawer-sized editor mode.
     *
     * @protected
     */
    protected onMaximizeButtonClick(): void {
        const nextValue = !this._isMaximized();
        this._isMaximized.set(nextValue);

        if (nextValue) {
            this.updateOverlayBounds();
        }

        this.releaseOverlayBoundsIfClosed();

        this.requestEditorMeasure();
    }

    /**
     * Opens or closes the rendered preview overlay.
     *
     * @protected
     */
    protected onPreviewButtonClick(): void {
        if (!this.canPreview()) {
            return;
        }

        const nextValue = !this._isPreviewOpen();
        this._isPreviewOpen.set(nextValue);

        if (nextValue) {
            this.updateOverlayBounds();
        }

        this.releaseOverlayBoundsIfClosed();

        this.requestEditorMeasure();
    }

    /**
     * Closes the rendered preview overlay.
     *
     * @protected
     */
    protected onClosePreviewButtonClick(): void {
        this._isPreviewOpen.set(false);
        this.releaseOverlayBoundsIfClosed();
        this.requestEditorMeasure();
    }

    private buildEditorConfig(parent: HTMLElement): EditorViewConfig {
        return {
            doc: this._value ?? '',
            parent,
            extensions: [
                ...this.buildBasicSetup(),
                this._languageCompartment.of(this.buildLanguageExtension(this.language())),
                this._readonlyCompartment.of([EditorState.readOnly.of(this.readonly()), EditorView.editable.of(!this.readonly())]),
                this._autocompleteCompartment.of(this.buildAutocompleteExtension(this.placeholders())),
                tooltips({ position: this.tooltipPosition() }),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        const newValue = update.state.doc.toString();
                        this._value = newValue;
                        this._valueSignal.set(newValue);
                        this._onChange?.(newValue);
                    }
                }),
                EditorView.domEventHandlers({
                    blur: () => {
                        this._onTouched?.();
                    },
                }),
            ],
        };
    }

    private buildBasicSetup(): Extension[] {
        return [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            history(),
            foldGutter(),
            drawSelection(),
            dropCursor(),
            EditorState.allowMultipleSelections.of(true),
            indentOnInput(),
            syntaxHighlighting(classHighlighter, { fallback: true }),
            bracketMatching(),
            closeBrackets(),
            rectangularSelection(),
            highlightActiveLine(),
            highlightSelectionMatches(),
            keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap]),
        ];
    }

    private buildAutocompleteExtension(placeholderList: ReadonlyArray<string>): Extension {
        if (placeholderList.length === 0) {
            return autocompletion();
        }

        const completionSources: CompletionSource[] = [createPlaceholderCompletions(placeholderList)];

        return autocompletion({ override: completionSources });
    }

    private buildLanguageExtension(language: 'html' | 'markdown' | 'text'): Extension {
        if (language === 'html') {
            return html();
        }
        if (language === 'markdown') {
            return markdown();
        }
        return [];
    }

    private buildPreviewDocument(templateContent: string): string {
        const trimmedTemplateContent = templateContent.trim();

        if (trimmedTemplateContent.length === 0) {
            return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body></body></html>';
        }

        if (this.language() === 'html' && this.isCompleteHtmlDocument(trimmedTemplateContent)) {
            return trimmedTemplateContent;
        }

        const body = this.language() === 'markdown' ? (this._markdown.parse(trimmedTemplateContent, { async: false }) as string) : trimmedTemplateContent;

        return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{box-sizing:border-box;margin:0;padding:1rem;color:#202124;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.55}img{max-width:100%;height:auto}pre{overflow:auto;padding:.75rem;border-radius:.375rem;background:#f5f5f5}code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace}table{border-collapse:collapse}th,td{padding:.5rem;border:1px solid #ddd}blockquote{margin-inline:0;padding-left:1rem;border-left:3px solid #ccc;color:#5f6368}</style></head><body>${body}</body></html>`;
    }

    private isCompleteHtmlDocument(templateContent: string): boolean {
        return /<html(?:\s|>)/iu.test(templateContent);
    }

    private requestEditorMeasure(): void {
        this._editor?.requestMeasure();
    }

    private releaseOverlayBounds(): void {
        const hostElement = this._hostElement.nativeElement;

        hostElement.style.removeProperty('--ngp-code-editor-overlay-top');
        hostElement.style.removeProperty('--ngp-code-editor-overlay-left');
        hostElement.style.removeProperty('--ngp-code-editor-overlay-right');
        hostElement.style.removeProperty('--ngp-code-editor-overlay-bottom');

        this.releaseOverlayResizeObserver();
    }

    private releaseOverlayBoundsIfClosed(): void {
        if (this._isMaximized() || this._isPreviewOpen()) {
            return;
        }

        this.releaseOverlayBounds();
    }

    private releaseOverlayResizeObserver(): void {
        this._overlayResizeObserver?.disconnect();
        this._overlayResizeObserver = undefined;
        this._overlayElement = undefined;
        this._overlayOffsetParentElement = undefined;
    }

    private requestOverlayUpdate(): void {
        if (!this._isMaximized() && !this._isPreviewOpen()) {
            return;
        }

        this.updateOverlayBounds();
        this.requestEditorMeasure();
    }

    private observeOverlayBounds(overlayElement: HTMLElement, offsetParentElement: HTMLElement): void {
        if (this._overlayElement === overlayElement && this._overlayOffsetParentElement === offsetParentElement) {
            return;
        }

        this.releaseOverlayResizeObserver();
        this._overlayElement = overlayElement;
        this._overlayOffsetParentElement = offsetParentElement;

        if (typeof ResizeObserver === 'undefined') {
            return;
        }

        this._overlayResizeObserver = new ResizeObserver(() => {
            this.requestOverlayUpdate();
        });

        this._overlayResizeObserver.observe(overlayElement);

        if (offsetParentElement !== overlayElement) {
            this._overlayResizeObserver.observe(offsetParentElement);
        }
    }

    private updateOverlayBounds(): void {
        const hostElement = this._hostElement.nativeElement;
        const closestOverlayElement = hostElement.closest('mosaik-drawer-content');
        const overlayElement = closestOverlayElement instanceof HTMLElement ? closestOverlayElement : hostElement.parentElement;
        const offsetParentElement = hostElement.offsetParent instanceof HTMLElement ? hostElement.offsetParent : hostElement.parentElement;

        if (!overlayElement || !offsetParentElement) {
            return;
        }

        const overlayBounds = overlayElement.getBoundingClientRect();
        const offsetParentBounds = offsetParentElement.getBoundingClientRect();
        const overlayTop = overlayBounds.top - offsetParentBounds.top;
        const overlayLeft = overlayBounds.left - offsetParentBounds.left;
        const overlayRight = offsetParentBounds.right - overlayBounds.right;
        const overlayBottom = offsetParentBounds.bottom - overlayBounds.bottom;

        hostElement.style.setProperty('--ngp-code-editor-overlay-top', `${overlayTop}px`);
        hostElement.style.setProperty('--ngp-code-editor-overlay-left', `${overlayLeft}px`);
        hostElement.style.setProperty('--ngp-code-editor-overlay-right', `${overlayRight}px`);
        hostElement.style.setProperty('--ngp-code-editor-overlay-bottom', `${overlayBottom}px`);

        this.observeOverlayBounds(overlayElement, offsetParentElement);
    }

    // #endregion
}
