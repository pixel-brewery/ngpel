/**
 * The string-valued property keys of an internationalization class — the labels an application may
 * translate.
 *
 * @typeParam TIntl The internationalization class.
 * @public
 */
export type IntlLabelKey<TIntl> = {
    [TKey in keyof TIntl]: TIntl[TKey] extends string ? TKey : never;
}[keyof TIntl] &
    string;
