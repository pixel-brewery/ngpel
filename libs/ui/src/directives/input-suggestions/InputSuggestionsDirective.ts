// #region Imports

import { type ComponentRef, computed, DestroyRef, Directive, ElementRef, ErrorHandler, inject, input, output, signal, ViewContainerRef } from '@angular/core';
import type { ITextSuggestionMenuState } from '../../components/text-suggestions/ITextSuggestionMenuState';
import { TextSuggestionMenuComponent } from '../../components/text-suggestions/TextSuggestionMenuComponent';
import type { InputSuggestionSource } from './InputSuggestionSource';
import type { ITextSuggestionMessages } from './ITextSuggestionMessages';
import type { ITextSuggestionOption } from './ITextSuggestionOption';

// #endregion

interface ISuggestionEditor extends HTMLElement {
    readonly value?: unknown;
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly readonly?: boolean;
}

const EDITOR_ATTRIBUTES = ['role', 'aria-autocomplete', 'aria-haspopup', 'aria-expanded', 'aria-controls', 'aria-activedescendant'] as const;
let nextMenuId = 0;

/**
 * Adds whole-field suggestions to an editable input. Selection emits the original option;
 * the caller owns writing the selected value to its form.
 *
 * @public
 */
@Directive({
    selector: 'input[ngpInputSuggestions],mosaik-textbox[ngpInputSuggestions],mosaik-searchbox[ngpInputSuggestions]',
    exportAs: 'ngpInputSuggestions',
    host: {
        '(input)': 'refresh($event)',
        '(focusin)': 'onFocusIn($event)',
        '(focusout)': 'onFocusOut($event)',
        '(compositionstart)': 'onCompositionStart()',
        '(compositionend)': 'onCompositionEnd($event)',
    },
})
export class InputSuggestionsDirective<TOption extends ITextSuggestionOption = ITextSuggestionOption> {
    // #region Fields

    private readonly _host = inject<ElementRef<ISuggestionEditor>>(ElementRef).nativeElement;
    private readonly _container = inject(ViewContainerRef);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _errorHandler = inject(ErrorHandler);
    private readonly _state = signal<ITextSuggestionMenuState<TOption> | null>(null);
    private readonly _keyListener = (event: KeyboardEvent): void => this.onKeydown(event);
    private _menu: ComponentRef<TextSuggestionMenuComponent> | null = null;
    private _request: AbortController | null = null;
    private _timer: ReturnType<typeof globalThis.setTimeout> | null = null;
    private _editor: ISuggestionEditor | null = null;
    private _originalAria: ReadonlyArray<readonly [string, string | null]> = [];
    private _query = '';
    private _querySource: InputSuggestionSource<TOption> | null = null;
    private _composing = false;

    // #endregion

    // #region Ctor

    /** Listens before the input control can submit or consume an option key. */
    public constructor() {
        this._host.addEventListener('keydown', this._keyListener, true);
        this._destroyRef.onDestroy(() => {
            this._host.removeEventListener('keydown', this._keyListener, true);
            this.cancelRequest();
            this.restoreEditorAria();
            this._menu?.destroy();
        });
    }

    // #endregion

    // #region Properties

    /** Source called for each distinct query after the debounce. */
    public readonly source = input.required<InputSuggestionSource<TOption>>({ alias: 'ngpInputSuggestions' });

    /** Localized listbox and request state labels. */
    public readonly messages = input.required<ITextSuggestionMessages>({ alias: 'ngpInputSuggestionMessages' });

    /** Minimum query length before the source is called. */
    public readonly minimumLength = input(3, { alias: 'ngpInputSuggestionMinimumLength' });

    /** Debounce in milliseconds. */
    public readonly delay = input(300, { alias: 'ngpInputSuggestionDelay' });

    /** Optional attribution displayed beneath results. */
    public readonly attribution = input<string | null>(null, { alias: 'ngpInputSuggestionAttribution' });

    /** Emits the selected result, including any extra data supplied by the source. */
    public readonly selected = output<TOption>({ alias: 'ngpInputSuggestionSelected' });

    /** Whether the listbox is open. */
    public readonly isOpen = computed(() => this._state() !== null);

    /** Stable accessibility ID of the listbox. */
    public readonly menuId = `ngp-input-suggestions-${++nextMenuId}`;

    // #endregion

    // #region Methods

    /** Refreshes results from the current editable value. */
    public refresh(event?: Event): void {
        if (this._destroyRef.destroyed || this._composing || (event && 'isComposing' in event && event.isComposing === true)) {
            return;
        }

        this.connectEditor(event);
        const editor = this._editor ?? this._host;
        const value = editor.value ?? this._host.value;
        const query = typeof value === 'string' ? value.trim().replace(/\s+/gu, ' ') : '';
        const configuredMinimum = this.minimumLength();
        const minimumLength = Number.isFinite(configuredMinimum) ? Math.max(1, configuredMinimum) : 3;

        if (this._host.disabled || editor.disabled || this._host.readonly || editor.readOnly || query.length < minimumLength) {
            this._query = '';
            this.dismiss();
            return;
        }

        const source = this.source();
        if (query === this._query && source === this._querySource) {
            return;
        }

        this._query = query;
        this._querySource = source;
        this.cancelRequest();
        const request = new AbortController();
        this._request = request;
        this.show({ items: [], selectedIndex: 0, loading: true, error: false });

        const delay = this.delay();
        this._timer = globalThis.setTimeout(
            () => {
                this._timer = null;
                void this.load(source, query, request).catch((reason: unknown) => this._errorHandler.handleError(reason));
            },
            Number.isFinite(delay) ? Math.min(2_147_483_647, Math.max(0, delay)) : 300,
        );
    }

    /** Closes suggestions and cancels the pending lookup. */
    public dismiss(): void {
        this.cancelRequest();
        this._state.set(null);
        this.synchronizeEditorAria();
        this._menu?.instance.close();
    }

    protected onFocusIn(event: Event): void {
        this.connectEditor(event);
    }

    protected onFocusOut(event: Event): void {
        if ('relatedTarget' in event && event.relatedTarget instanceof Node && this._host.contains(event.relatedTarget)) {
            return;
        }

        this._query = '';
        this.dismiss();
    }

    protected onCompositionStart(): void {
        this._composing = true;
        this.dismiss();
    }

    protected onCompositionEnd(event: Event): void {
        this._composing = false;
        this._query = '';
        this.refresh(event);
    }

    private onKeydown(event: KeyboardEvent): void {
        const state = this._state();

        if (!state || event.isComposing || this._composing || event.defaultPrevented) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.dismiss();
            return;
        }

        if (state.items.length === 0) {
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            event.stopPropagation();
            const delta = event.key === 'ArrowDown' ? 1 : -1;
            const selectedIndex = (state.selectedIndex + delta + state.items.length) % state.items.length;
            this.show({ ...state, selectedIndex });
            this._menu?.instance.optionElement(selectedIndex)?.scrollIntoView?.({ block: 'nearest' });
        } else if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.select(state.selectedIndex);
        }
    }

    private async load(source: InputSuggestionSource<TOption>, query: string, request: AbortController): Promise<void> {
        let items: ReadonlyArray<TOption> = [];
        let error = false;

        try {
            items = await source(query, request.signal);
        } catch {
            error = true;
        }

        if (this._request !== request) {
            return;
        }

        this._request = null;
        if (this.source() === source) {
            this.show({ items: [...items], selectedIndex: 0, loading: false, error });
        } else {
            this.dismiss();
        }
    }

    private show(state: ITextSuggestionMenuState<TOption>): void {
        this._state.set(state);

        if (!this._menu) {
            this._menu = this._container.createComponent(TextSuggestionMenuComponent);
            this._menu.instance.selected.subscribe((index) => this.select(index));
        }

        this._menu.setInput('state', state);
        this._menu.setInput('messages', this.messages());
        this._menu.setInput('attribution', this.attribution());
        this._menu.setInput('menuId', this.menuId);
        this._menu.changeDetectorRef.detectChanges();
        this.synchronizeEditorAria();
        this._menu.instance.open(this._host);
    }

    private select(index: number): void {
        const item = this._state()?.items[index];

        if (item) {
            this._query = '';
            this.dismiss();
            this.selected.emit(item);
        }
    }

    private cancelRequest(): void {
        this._request?.abort();
        this._request = null;

        if (this._timer !== null) {
            globalThis.clearTimeout(this._timer);
            this._timer = null;
        }
    }

    private connectEditor(event?: Event): void {
        const InputElement = this._host.ownerDocument.defaultView?.HTMLInputElement;
        const eventEditor = InputElement ? event?.composedPath().find((part): part is HTMLInputElement => part instanceof InputElement) : undefined;
        const editor = eventEditor ?? this._host.shadowRoot?.querySelector<HTMLInputElement>('input') ?? this._host;

        if (editor !== this._editor) {
            this.restoreEditorAria();
            this._editor = editor;
            this._originalAria = EDITOR_ATTRIBUTES.map((attribute) => [attribute, editor.getAttribute(attribute)]);
        }

        this.synchronizeEditorAria();
    }

    private synchronizeEditorAria(): void {
        const editor = this._editor;
        if (!editor) {
            return;
        }

        const state = this._state();
        editor.setAttribute('role', 'combobox');
        editor.setAttribute('aria-autocomplete', 'list');
        editor.setAttribute('aria-haspopup', 'listbox');
        editor.setAttribute('aria-expanded', String(state !== null));

        if (state) {
            editor.setAttribute('aria-controls', this.menuId);
        } else {
            editor.removeAttribute('aria-controls');
        }

        if (state?.items.length) {
            editor.setAttribute('aria-activedescendant', `${this.menuId}-option-${state.selectedIndex}`);
        } else {
            editor.removeAttribute('aria-activedescendant');
        }

        const listbox = this._menu?.instance.listboxElement();
        if (state && listbox && listbox.getRootNode() !== editor.getRootNode()) {
            // ID references alone do not cross a Mosaik textbox's shadow root.
            if ('ariaControlsElements' in editor) {
                editor.ariaControlsElements = [listbox];
            }
            if ('ariaActiveDescendantElement' in editor) {
                editor.ariaActiveDescendantElement = this._menu?.instance.optionElement(state.selectedIndex) ?? null;
            }
        }
    }

    private restoreEditorAria(): void {
        for (const [attribute, value] of this._originalAria) {
            if (value === null) {
                this._editor?.removeAttribute(attribute);
            } else {
                this._editor?.setAttribute(attribute, value);
            }
        }
    }

    // #endregion
}
