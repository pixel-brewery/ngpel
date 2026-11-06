// #region Imports

import { Pipe, type PipeTransform } from '@angular/core';

// #endregion

// #region Constants

const DEFAULT_MAXIMUM_LENGTH = 96;
const ELLIPSIS = '…';
const LINE_BREAK_PATTERN = /\r?\n/u;
const HEADING_MARKER_PATTERN = /^#{1,6}\s+/u;
const LIST_MARKER_PATTERN = /^[-*+]\s+/u;
const LINK_PATTERN = /\[(.+?)\]\([^)]*\)/gu;
const EMPHASIS_PATTERN = /[*_`~]/gu;

// #endregion

/**
 * Condenses a markdown block into a single plain-text line for list rows, tooltips and card
 * subtitles: `{{ note.body | ngpCompactText }}`.
 *
 * The first non-empty line is taken, its heading, list, link and emphasis markers are removed and
 * the result is cut to a maximum length with a trailing ellipsis. Rendering markdown as HTML is a
 * different job — use the `markdown` entry point for that.
 *
 * @public
 */
@Pipe({ name: 'ngpCompactText' })
export class CompactTextPipe implements PipeTransform {
    // #region Methods

    /**
     * Condenses `markdown` into a single plain-text line.
     *
     * @public
     * @param markdown The markdown source.
     * @param fallback The text to condense when the source holds no line (defaults to an empty string).
     * @param maximumLength The maximum number of characters of the result (defaults to 96).
     * @returns The condensed line.
     */
    public transform(markdown: null | string | undefined, fallback = '', maximumLength: number = DEFAULT_MAXIMUM_LENGTH): string {
        const line = (markdown ?? '')
            .split(LINE_BREAK_PATTERN)
            .map((candidate) => candidate.trim())
            .find((candidate) => candidate.length > 0);
        const plain = (line ?? fallback)
            .replace(HEADING_MARKER_PATTERN, '')
            .replace(LIST_MARKER_PATTERN, '')
            .replace(LINK_PATTERN, '$1')
            .replace(EMPHASIS_PATTERN, '')
            .trim();
        const limit = Number.isFinite(maximumLength) ? Math.max(0, Math.trunc(maximumLength)) : DEFAULT_MAXIMUM_LENGTH;

        return plain.length > limit ? `${plain.slice(0, Math.max(0, limit - 1)).trimEnd()}${ELLIPSIS}` : plain;
    }

    // #endregion
}
