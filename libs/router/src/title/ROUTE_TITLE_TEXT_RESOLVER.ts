// #region Imports

import { InjectionToken } from '@angular/core';
import type { IRouteTitleTextResolver } from './IRouteTitleTextResolver';

// #endregion

/**
 * Injection token for the {@link IRouteTitleTextResolver}. Defaults to an identity resolver.
 *
 * @public
 *
 * @example
 * ```typescript
 * { provide: ROUTE_TITLE_TEXT_RESOLVER, useFactory: () => {
 *       const translations = inject(TranslationService);
 *       return { resolve: (text: string): string => translations.translate(text) };
 *   } }
 * ```
 */
export const ROUTE_TITLE_TEXT_RESOLVER = new InjectionToken<IRouteTitleTextResolver>('NGPEL_ROUTE_TITLE_TEXT_RESOLVER', {
    providedIn: 'root',
    factory: (): IRouteTitleTextResolver => ({ resolve: (text: string): string => text }),
});
