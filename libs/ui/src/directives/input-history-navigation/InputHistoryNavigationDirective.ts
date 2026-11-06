import { booleanAttribute, Directive, ElementRef, inject, input, output } from '@angular/core';
import { ChatPromptBoxElement } from '@pixel-brewery/mosaik-elements-foundation';

/**
 * Describes the navigation operation that changed the control value.
 *
 * @public
 */
export type InputHistoryNavigationDirection = 'previous' | 'next' | 'restore-draft';

/**
 * Describes a value recalled through input history navigation.
 *
 * @public
 */
export interface IInputHistoryNavigationEvent {
    /**
     * Value written into the editable control.
     *
     * @public
     * @readonly
     */
    readonly value: string;

    /**
     * Navigation operation that produced the value.
     *
     * @public
     * @readonly
     */
    readonly direction: InputHistoryNavigationDirection;

    /**
     * Index in the history collection, or `null` when the original draft was restored.
     *
     * @public
     * @readonly
     */
    readonly historyIndex: number | null;
}

/**
 * Represents one active history navigation session.
 *
 * The history is snapshotted when navigation starts so asynchronous updates,
 * such as adding a newly submitted message, cannot shift the user's position.
 *
 * @internal
 */
interface IInputHistoryNavigationSession {
    /**
     * History entries available for the active navigation session.
     *
     * @internal
     * @readonly
     */
    readonly entries: readonly string[];

    /**
     * Value present before the user entered history navigation.
     *
     * @internal
     * @readonly
     */
    readonly draft: string;

    /**
     * Current entry index inside the session history.
     *
     * @internal
     */
    index: number;
}

/**
 * Adds shell-like submitted-value history navigation to `mosaik-chat-prompt-box` elements.
 *
 * `ArrowUp` recalls older entries and `ArrowDown` recalls newer entries. Once the
 * newest entry is passed, the value that existed before navigation started is restored.
 *
 * By default, navigation starts only while the control is empty. This prevents arrow-key
 * navigation inside an existing multi-line prompt from unexpectedly replacing user input.
 *
 * @example
 * ```html
 * <mosaik-chat-prompt-box
 *     [ngpInputHistoryNavigation]="submittedPrompts()"
 *     [placeholder]="'Type a message...'" />
 * ```
 *
 * @public
 */
@Directive({
    selector: 'mosaik-chat-prompt-box[ngpInputHistoryNavigation]',
    exportAs: 'ngpInputHistoryNavigation',
    host: {
        '(keydown)': 'onKeydown($event)',
        '(input)': 'onInput()',
        '(focusout)': 'onFocusOut()',
    },
})
export class InputHistoryNavigationDirective {
    // #region Fields

    /**
     * Mosaik Chat Prompt Box element enhanced by this directive.
     *
     * @private
     * @readonly
     */
    private readonly _elementRef: ElementRef<ChatPromptBoxElement> = inject(ElementRef);

    /**
     * Active traversal state, if the user is currently recalling submitted values.
     *
     * @private
     */
    private _session: IInputHistoryNavigationSession | null = null;

    /**
     * Guards the synthetic input event generated while a recalled value is written.
     *
     * @private
     */
    private _isApplyingHistoryValue = false;

    // #endregion

    // #region Properties

    /**
     * Previously submitted values ordered from oldest to newest.
     *
     * The directive does not modify this collection. Applications should update the
     * collection immutably after a prompt, command, or query has been submitted.
     *
     * @public
     * @readonly
     */
    public readonly history = input.required<readonly string[]>({
        alias: 'ngpInputHistoryNavigation',
    });

    /**
     * Determines whether keyboard-based history navigation is disabled.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false, {
        alias: 'ngpInputHistoryNavigationDisabled',
        transform: booleanAttribute,
    });

    /**
     * Determines whether a history session may begin only while the control is empty.
     *
     * When disabled, `ArrowUp` can replace an unfinished draft and `ArrowDown` restores it.
     *
     * @public
     * @readonly
     */
    public readonly onlyWhenEmpty = input(true, {
        alias: 'ngpInputHistoryNavigationOnlyWhenEmpty',
        transform: booleanAttribute,
    });

    /**
     * Emits whenever a history value or the captured draft is written into the control.
     *
     * @public
     * @readonly
     */
    public readonly navigated = output<IInputHistoryNavigationEvent>({
        alias: 'ngpInputHistoryNavigated',
    });

    // #endregion

    // #region Methods

    /**
     * Ends the active navigation session without changing the current control value.
     *
     * This can be used after application-level actions such as submitting or clearing
     * the associated prompt.
     *
     * @public
     */
    public reset(): void {
        this._session = null;
    }

    /**
     * Recalls the previous submitted value.
     *
     * @returns `true` when the keyboard action belongs to history navigation and its
     * browser default should be prevented.
     *
     * @public
     */
    public recallPrevious(): boolean {
        const element = this._elementRef.nativeElement;

        if (!this.canNavigate(element)) {
            return false;
        }

        const currentMessage = this.getMessage(element);

        if (this._session === null) {
            if (this.onlyWhenEmpty() && currentMessage.length > 0) {
                return false;
            }

            const entries = this.createHistorySnapshot();

            if (entries.length === 0) {
                return false;
            }

            this._session = {
                entries,
                draft: currentMessage,
                index: entries.length - 1,
            };

            this.applyValue(this._session.entries[this._session.index] ?? '', 'previous', this._session.index);

            return true;
        }

        if (this._session.index === 0) {
            return true;
        }

        this._session.index -= 1;

        this.applyValue(this._session.entries[this._session.index] ?? '', 'previous', this._session.index);

        return true;
    }

    /**
     * Recalls the next submitted value or restores the captured draft.
     *
     * @returns `true` when the keyboard action belongs to history navigation and its
     * browser default should be prevented.
     *
     * @public
     */
    public recallNext(): boolean {
        const element = this._elementRef.nativeElement;

        if (!this.canNavigate(element) || this._session === null) {
            return false;
        }

        if (this._session.index < this._session.entries.length - 1) {
            this._session.index += 1;

            this.applyValue(this._session.entries[this._session.index] ?? '', 'next', this._session.index);

            return true;
        }

        const draft = this._session.draft;

        this.applyValue(draft, 'restore-draft', null);
        this.reset();

        return true;
    }

    /**
     * Handles keyboard navigation from the directive host element.
     *
     * IME composition and modified arrow-key combinations remain untouched so the
     * directive does not break text composition or native selection shortcuts.
     *
     * @param event - Keyboard event raised by the chat input element.
     *
     * @protected
     */
    protected onKeydown(event: KeyboardEvent): void {
        if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        if (event.key === 'Escape' && this._session !== null) {
            this.reset();

            return;
        }

        const handled = event.key === 'ArrowUp' ? this.recallPrevious() : event.key === 'ArrowDown' ? this.recallNext() : false;

        if (handled) {
            event.preventDefault();
        }
    }

    /**
     * Cancels navigation after genuine user editing.
     *
     * Synthetic input events dispatched by this directive are excluded so repeated
     * `ArrowUp` and `ArrowDown` actions remain part of the same navigation session.
     *
     * @protected
     */
    protected onInput(): void {
        if (!this._isApplyingHistoryValue) {
            this.reset();
        }
    }

    /**
     * Ends navigation once focus leaves the editable control.
     *
     * @protected
     */
    protected onFocusOut(): void {
        this.reset();
    }

    /**
     * Determines whether navigation is currently permitted for the Chat Prompt Box element.
     *
     * @param element - Mosaik Chat Prompt Box element enhanced by the directive.
     *
     * @returns `true` when the element may participate in history navigation.
     *
     * @private
     */
    private canNavigate(element: ChatPromptBoxElement): boolean {
        return !this.disabled() && !element.disabled;
    }

    /**
     * Retrieves the current prompt text from the Chat Prompt Box element.
     *
     * @param element - Mosaik Chat Prompt Box element.
     *
     * @returns Current message string.
     *
     * @private
     */
    private getMessage(element: ChatPromptBoxElement): string {
        return element.value;
    }

    /**
     * Creates stable navigation data from the currently supplied history collection.
     *
     * Empty values are excluded because navigating to a submitted empty entry is
     * indistinguishable from leaving history navigation.
     *
     * @returns Snapshot ordered from oldest to newest.
     *
     * @private
     */
    private createHistorySnapshot(): readonly string[] {
        return this.history().filter((entry) => entry.length > 0);
    }

    /**
     * Writes a recalled value to the Chat Prompt Box element and notifies Angular bindings.
     *
     * A bubbling native `input` event is emitted because Angular form bindings observe
     * native value changes rather than direct JavaScript property assignments alone.
     *
     * @param message - Message to apply to the Chat Prompt Box element.
     * @param direction - Navigation operation responsible for the value.
     * @param historyIndex - Index of the recalled entry, or `null` for the draft.
     *
     * @private
     */
    private applyValue(message: string, direction: InputHistoryNavigationDirection, historyIndex: number | null): void {
        const element = this._elementRef.nativeElement;

        this._isApplyingHistoryValue = true;

        try {
            element.value = message;

            element.dispatchEvent(
                new Event('input', {
                    bubbles: true,
                    composed: true,
                }),
            );
        } finally {
            this._isApplyingHistoryValue = false;
        }

        this.navigated.emit({
            value: message,
            direction,
            historyIndex,
        });
    }

    // #endregion
}
