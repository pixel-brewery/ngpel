import type { Signal } from '@angular/core';
import type { AsyncCommand } from '../commands/AsyncCommand';
import type { Command } from '../commands/Command';
import type { IViewItemAction } from './IViewItemAction';
import type { IViewItemActionSelection } from './IViewItemActionSelection';

/**
 * Presenter-facing contract for registered contextual item actions.
 *
 * @public
 */
export interface IViewItemActionable {
    readonly viewItemActions: Signal<ReadonlyArray<IViewItemAction>>;
    readonly openViewItemActionCommand: Command<string>;
    readonly executeViewItemActionCommand: AsyncCommand<IViewItemActionSelection>;
}
