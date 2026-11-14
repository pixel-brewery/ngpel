import type { Provider } from '@angular/core';
import type { IPageToolbarDefaults } from './IPageToolbarDefaults';
import { PAGE_TOOLBAR_DEFAULTS } from './PAGE_TOOLBAR_DEFAULTS';

/**
 * Supplies application defaults for page toolbars. Individual toolbar inputs take precedence.
 *
 * @param defaults - Default controls and labels, or a factory that resolves them in the application injector.
 * @returns Angular provider for page toolbars.
 * @public
 */
export function providePageToolbarDefaults(defaults: IPageToolbarDefaults | (() => IPageToolbarDefaults)): Provider {
    return {
        provide: PAGE_TOOLBAR_DEFAULTS,
        useFactory: () => (typeof defaults === 'function' ? defaults() : defaults),
    };
}
