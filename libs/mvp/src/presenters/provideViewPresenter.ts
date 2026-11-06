// #region Imports

import type { Provider, Type } from '@angular/core';
import type { IViewPresenter } from './IViewPresenter';
import { VIEW_PRESENTER } from './VIEW_PRESENTER';

// #endregion

/**
 * Binds a concrete presenter to {@link VIEW_PRESENTER} for one View.
 *
 * @remarks
 * Belongs in the `providers` of the component that extends {@link View}, so every instance of that
 * component owns its presenter and disposes it with its own injector. The presenter type must carry
 * its own `@Injectable()`; Angular refuses to instantiate a class that only inherits the decorator.
 *
 * @public
 * @param presenter The presenter type instantiated for the View.
 * @returns The providers to place on the View component.
 *
 * @example
 * ```typescript
 * @Component({ selector: 'ngp-orders', template: '', providers: [provideViewPresenter(OrderViewPresenter)] })
 * class OrderView extends View<OrderViewPresenter> {}
 * ```
 */
export function provideViewPresenter(presenter: Type<IViewPresenter>): Array<Provider> {
    return [{ provide: VIEW_PRESENTER, useClass: presenter }];
}
