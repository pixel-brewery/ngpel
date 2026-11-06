import type { ITextSuggestionOption } from '../../directives/input-suggestions/ITextSuggestionOption';

/** State rendered by the suggestion popup. */
export interface ITextSuggestionMenuState<TOption extends ITextSuggestionOption = ITextSuggestionOption> {
    readonly items: ReadonlyArray<TOption>;
    readonly selectedIndex: number;
    readonly loading: boolean;
    readonly error: boolean;
}
