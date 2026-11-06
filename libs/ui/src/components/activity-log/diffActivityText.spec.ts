// cspell:words Absatz Aufträge durchgeführt Hinweis Kunden Rechnungen Rückruf Termin vereinbart vormittags zusenden
// #region Imports

import { describe, expect, it } from 'vitest';
import { diffActivityText } from './diffActivityText';

// #endregion

describe('diffActivityText', () => {
    it('keeps unchanged paragraphs whole and compares changed paragraphs word by word', () => {
        // arrange
        const before = 'Rückruf bitte nur vormittags.\nVor-Ort-Termin am 18.09. vereinbart.';
        const after = 'Rückruf bitte nur vormittags.\nVor-Ort-Termin am 18.09. durchgeführt.';

        // act
        const paragraphs = diffActivityText(before, after);

        // assert
        expect(paragraphs).toEqual([
            { unchanged: true, text: 'Rückruf bitte nur vormittags.' },
            {
                unchanged: false,
                parts: [
                    { kind: 'same', text: 'Vor-Ort-Termin am 18.09. ' },
                    { kind: 'removed', text: 'vereinbart' },
                    { kind: 'added', text: 'durchgeführt' },
                    { kind: 'same', text: '.' },
                ],
            },
        ]);
    });

    it('marks only the changed words and leaves the spaces around them unmarked', () => {
        // arrange
        const before = 'Import der Aufträge und Rechnungen';
        const after = 'Import der Aufträge und Kunden';

        // act
        const appended = diffActivityText('Import der Aufträge', 'Import der Aufträge und Kunden');
        const replaced = diffActivityText(before, after);

        // assert
        expect(appended).toEqual([
            {
                unchanged: false,
                parts: [
                    { kind: 'same', text: 'Import der Aufträge ' },
                    { kind: 'added', text: 'und Kunden' },
                ],
            },
        ]);
        expect(replaced).toEqual([
            {
                unchanged: false,
                parts: [
                    { kind: 'same', text: 'Import der Aufträge und ' },
                    { kind: 'removed', text: 'Rechnungen' },
                    { kind: 'added', text: 'Kunden' },
                ],
            },
        ]);
    });

    it('shows an unrelated replacement as a removed and an added paragraph instead of interleaving words', () => {
        // arrange
        const before = 'Erster Absatz.\nAlter Hinweis.';
        const after = 'Erster Absatz.';

        // act
        const paragraphs = diffActivityText(before, `${after}\nAngebot bis 05.10. zusenden.`);
        const shortened = diffActivityText(before, after);

        // assert
        expect(paragraphs.slice(1)).toEqual([
            { unchanged: false, parts: [{ kind: 'removed', text: 'Alter Hinweis.' }] },
            { unchanged: false, parts: [{ kind: 'added', text: 'Angebot bis 05.10. zusenden.' }] },
        ]);
        expect(shortened[1]).toEqual({ unchanged: false, parts: [{ kind: 'removed', text: 'Alter Hinweis.' }] });
    });
});
