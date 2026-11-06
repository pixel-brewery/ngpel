// #region Imports

import type { IntlLabelKey } from './IntlLabelKey';

// #endregion

/**
 * Maps the labels of an internationalization class onto the application's own translation keys.
 * Every key must name an existing string property of the class, so a renamed label breaks the build
 * instead of silently falling back to English.
 *
 * @typeParam TIntl The internationalization class.
 * @public
 */
export type IntlTranslationMap<TIntl> = Partial<Record<IntlLabelKey<TIntl>, string>>;
