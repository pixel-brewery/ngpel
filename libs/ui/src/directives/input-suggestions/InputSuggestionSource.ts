import type { ITextSuggestionOption } from './ITextSuggestionOption';

/**
 * Supplies options for a normalized whole-field query. The signal is aborted when the query is
 * replaced, the suggestions close, or the owning directive is destroyed.
 *
 * @public
 */
export type InputSuggestionSource<TOption extends ITextSuggestionOption = ITextSuggestionOption> = (
    query: string,
    signal: AbortSignal,
) => Promise<ReadonlyArray<TOption>> | ReadonlyArray<TOption>;
