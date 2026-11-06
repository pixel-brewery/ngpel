// #region Imports

import type { Provider } from '@angular/core';
import { SCHEDULER_INTL } from '@pixel-brewery/mosaik-elements-angular';
import { SchedulerElementIntl } from '@pixel-brewery/mosaik-elements-foundation';
import type { IntlTranslationMap } from './IntlTranslationMap';
import { translateIntl } from './translateIntl';

// #endregion

/**
 * Provides application-specific internationalization labels
 * for the scheduler component.
 *
 * @param translations - Translation keys used for the scheduler labels.
 *
 * @returns The Angular provider.
 *
 * @public
 */
export function provideSchedulerIntl(translations: IntlTranslationMap<SchedulerElementIntl>): Provider {
    return {
        provide: SCHEDULER_INTL,
        useFactory: (): SchedulerElementIntl => translateIntl(new SchedulerElementIntl('en'), translations),
    };
}
