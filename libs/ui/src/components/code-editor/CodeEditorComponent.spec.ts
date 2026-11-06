// #region Imports

import { signal, type Signal } from '@angular/core';
import { Marked } from 'marked';
import { describe, expect, it, vi } from 'vitest';
import { CodeEditorComponent } from './CodeEditorComponent';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    ButtonComponent: class ButtonComponent {},
    FORM_STATUS_HOST: Symbol('FORM_STATUS_HOST'),
    IconNameDirective: class IconNameDirective {},
    TextComponent: class TextComponent {},
}));

interface ICodeEditorComponentTestApi {
    readonly language: Signal<'html' | 'markdown' | 'text'>;
    readonly _markdown: Marked;

    buildPreviewDocument(templateContent: string): string;
}

describe('CodeEditorComponent', () => {
    it('should render Markdown as a complete preview document', () => {
        const api = createComponentApi('markdown');

        const document = api.buildPreviewDocument('# ngpel\n\n**Produktbeschreibung**');

        expect(document).toContain('<h1>ngpel</h1>');
        expect(document).toContain('<strong>Produktbeschreibung</strong>');
        expect(document).toContain('<!doctype html>');
    });

    it('should preserve an existing complete HTML document', () => {
        const api = createComponentApi('html');
        const document = '<html><body>Preview</body></html>';

        expect(api.buildPreviewDocument(document)).toBe(document);
    });
});

function createComponentApi(language: 'html' | 'markdown' | 'text'): ICodeEditorComponentTestApi {
    const api = Object.create(CodeEditorComponent.prototype) as ICodeEditorComponentTestApi;

    Object.assign(api, {
        language: signal(language),
        _markdown: new Marked({ breaks: true, gfm: true }),
    });

    return api;
}
