// #region Imports

import { diffArrays, diffWordsWithSpace } from 'diff';
import type { ActivityTextParagraph } from './ActivityTextParagraph';
import type { IActivityTextPart } from './IActivityTextPart';

// #endregion

// #region Constants

/** The share of a paragraph that must stay the same to compare it word by word. */
const MINIMUM_SHARED_TEXT = 0.4;

// #endregion

// #region Function

/**
 * Compares two versions of a long text paragraph by paragraph and, within changed paragraphs,
 * word by word.
 *
 * @param before - The text before the change.
 * @param after - The text after the change.
 * @returns The paragraphs of the new text, unchanged ones marked as such.
 *
 * @public
 */
export function diffActivityText(before: string, after: string): ReadonlyArray<ActivityTextParagraph> {
    const paragraphs: ActivityTextParagraph[] = [];
    const changes = diffArrays(toParagraphs(before), toParagraphs(after));

    for (let index = 0; index < changes.length; index++) {
        const change = changes[index];
        if (change === undefined) continue;

        if (!change.added && !change.removed) {
            paragraphs.push(...change.value.map((text) => ({ unchanged: true as const, text })));
            continue;
        }

        const next = changes[index + 1];
        const removed = change.removed ? change.value : [];
        const added = change.removed && next?.added ? next.value : change.added ? change.value : [];

        if (change.removed && next?.added) {
            index++;
        }

        const pairs = Math.max(removed.length, added.length);

        for (let pair = 0; pair < pairs; pair++) {
            paragraphs.push(...compareParagraphs(removed[pair] ?? '', added[pair] ?? ''));
        }
    }

    return paragraphs;
}

// #endregion

// #region Helpers

function toParagraphs(text: string): string[] {
    return text
        .split(/\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph.length > 0);
}

/**
 * Compares a replaced paragraph word by word when enough of it stayed the same; otherwise the
 * paragraphs are unrelated and a word comparison would only interleave noise.
 */
function compareParagraphs(before: string, after: string): ReadonlyArray<ActivityTextParagraph> {
    if (!before || !after) {
        return [{ unchanged: false, parts: [{ kind: before ? 'removed' : 'added', text: before || after }] }];
    }

    const parts = detachWhitespace(
        diffWordsWithSpace(before, after)
            .filter((part) => part.value.length > 0)
            .map((part) => ({
                kind: part.added ? ('added' as const) : part.removed ? ('removed' as const) : ('same' as const),
                text: part.value,
            })),
    );
    const kept = parts.filter((part) => part.kind === 'same').reduce((length, part) => length + part.text.trim().length, 0);

    if (kept / Math.max(before.length, after.length) < MINIMUM_SHARED_TEXT) {
        return [
            { unchanged: false, parts: [{ kind: 'removed', text: before }] },
            { unchanged: false, parts: [{ kind: 'added', text: after }] },
        ];
    }

    return [{ unchanged: false, parts }];
}

/**
 * Leaves the spaces around a changed word unmarked, so that a highlight or strikethrough covers
 * only the words. A removed run of spaces alone is dropped, an added one is shown as plain text.
 */
function detachWhitespace(parts: ReadonlyArray<IActivityTextPart>): IActivityTextPart[] {
    const detached: IActivityTextPart[] = [];
    const append = (part: IActivityTextPart): void => {
        const previous = detached.at(-1);

        if (part.kind === 'same' && previous?.kind === 'same') {
            detached[detached.length - 1] = { kind: 'same', text: previous.text + part.text };
        } else {
            detached.push(part);
        }
    };

    for (const part of parts) {
        const [, leading = '', words = '', trailing = ''] = /^(\s*)([\s\S]*?)(\s*)$/.exec(part.text) ?? [];

        if (part.kind === 'same') {
            append(part);
        } else if (!words) {
            if (part.kind === 'added') {
                append({ kind: 'same', text: part.text });
            }
        } else {
            if (leading) {
                append({ kind: 'same', text: leading });
            }

            append({ kind: part.kind, text: words });

            if (trailing) {
                append({ kind: 'same', text: trailing });
            }
        }
    }

    return detached;
}

// #endregion
