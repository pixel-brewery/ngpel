// #region Imports

import type { Provider } from '@angular/core';
import { CalendarElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the calendar component.
 *
 * @param translations - Translation keys used for the calendar labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideCalendarIntl(translations: IntlTranslationMap<CalendarElementIntl>): Provider {
    return {
        provide: CalendarElementIntl,
        useFactory: (locale: string): CalendarElementIntl => translateIntl(new CalendarElementIntl(locale), translations),
        deps: ['en'],
    };
}
