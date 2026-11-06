// #region Imports

import { inject } from '@angular/core';
import { TranslateService } from '@pixel-brewery/mosaik-elements-angular';
import type { IntlLabelKey } from './IntlLabelKey';
import type { IntlTranslationMap } from './IntlTranslationMap';

// #endregion

/**
 * Replaces the labels of an internationalization instance with the application's translations,
 * resolved through Mosaik's translate service.
 *
 * A label the map does not mention keeps the built-in English default, so an application translates
 * as much or as little as it wants — and an application that composes ngpel without Mosaik keeps
 * every default, because the translate service is resolved optionally. Call it from the
 * `useFactory` of the provider that supplies the internationalization class, which is where an
 * injection context exists.
 *
 * @typeParam TIntl The internationalization class.
 * @public
 * @param intl The instance to translate.
 * @param translations The label-to-translation-key map.
 * @returns The same instance, with its translated labels applied.
 *
 * @example
 * ```typescript
 * provideRailComponentIntl({ backLabel: 'navigation.back' });
 * ```
 */
export function translateIntl<TIntl extends object>(intl: TIntl, translations: IntlTranslationMap<TIntl>): TIntl {
    const translateService = inject(TranslateService, { optional: true });

    if (translateService === null) {
        return intl;
    }

    for (const key of Object.keys(translations) as Array<IntlLabelKey<TIntl>>) {
        const translationKey = translations[key];

        if (!translationKey) {
            continue;
        }

        Object.defineProperty(intl, key, {
            configurable: true,
            enumerable: true,
            value: translateService.translate(translationKey),
            writable: true,
        });
    }

    return intl;
}
