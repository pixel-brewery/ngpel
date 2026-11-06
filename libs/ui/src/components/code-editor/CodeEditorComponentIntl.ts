// #region Imports

import { Provider } from '@angular/core';
import type { IntlTranslationMap } from '../../intl/IntlTranslationMap';
import { translateIntl } from '../../intl/translateIntl';
import { Subject } from 'rxjs';

// #endregion

/**
 * Internationalization labels for the code editor component.
 *
 * @public
 */
export class CodeEditorComponentIntl {
    // #region Fields

    private readonly _changes: Subject<void>;
    private _previewShowLabel: string;
    private _previewHideLabel: string;
    private _previewCloseLabel: string;
    private _editorMaximizeLabel: string;
    private _editorMinimizeLabel: string;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link CodeEditorComponentIntl}` class.
     *
     * @public
     */
    public constructor() {
        this._changes = new Subject();
        this._previewShowLabel = 'Show preview';
        this._previewHideLabel = 'Hide preview';
        this._previewCloseLabel = 'Close preview';
        this._editorMaximizeLabel = 'Maximize editor';
        this._editorMinimizeLabel = 'Minimize editor';
    }

    // #endregion

    // #region Properties

    /**
     * Emits when any label changes.
     *
     * @public
     * @readonly
     */
    public get changes(): Subject<void> {
        return this._changes;
    }

    /**
     * Label for showing the preview panel.
     *
     * @public
     */
    public get previewShowLabel(): string {
        return this._previewShowLabel;
    }

    /**
     * Label for hiding the preview panel.
     *
     * @public
     */
    public get previewHideLabel(): string {
        return this._previewHideLabel;
    }

    /**
     * Label for closing the preview panel.
     *
     * @public
     */
    public get previewCloseLabel(): string {
        return this._previewCloseLabel;
    }

    /**
     * Label for maximizing the editor.
     *
     * @public
     */
    public get editorMaximizeLabel(): string {
        return this._editorMaximizeLabel;
    }

    /**
     * Label for minimizing the editor.
     *
     * @public
     */
    public get editorMinimizeLabel(): string {
        return this._editorMinimizeLabel;
    }

    // #endregion
}

/**
 * Provides application-specific internationalization labels
 * for the code editor component.
 *
 * @param translations - Translation keys used for the code editor labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideCodeEditorComponentIntl(translations: IntlTranslationMap<CodeEditorComponentIntl>): Provider {
    return {
        provide: CodeEditorComponentIntl,
        useFactory: (): CodeEditorComponentIntl => translateIntl(new CodeEditorComponentIntl(), translations),
    };
}
