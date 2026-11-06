// #region Imports

import type { Completion, CompletionContext, CompletionResult, CompletionSource } from '@codemirror/autocomplete';

// #endregion

/**
 * Creates a CodeMirror `CompletionSource` that suggests `{{placeholder}}` tokens.
 * The completions trigger when the user types `{{` or when invoked explicitly.
 *
 * @param placeholders - The list of available placeholder names.
 * @returns A `CompletionSource` providing placeholder completions.
 *
 * @public
 */
export function createPlaceholderCompletions(placeholders: ReadonlyArray<string>): CompletionSource {
    const options: Completion[] = placeholders.map((name) => ({
        label: `{{${name}}}`,
        type: 'variable',
        detail: 'Placeholder',
        boost: 10,
        apply: `{{${name}}}`,
    }));

    return (context: CompletionContext): CompletionResult | null => {
        const before = context.matchBefore(/\{\{?\w*/);

        if (!before && !context.explicit) {
            return null;
        }

        return {
            from: before?.from ?? context.pos,
            options,
            validFor: /^\{\{?\w*\}?\}?$/,
        };
    };
}
