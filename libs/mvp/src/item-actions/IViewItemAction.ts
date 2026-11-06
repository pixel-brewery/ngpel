import type { Signal } from '@angular/core';
import type { IViewMentionOption } from '../mentions/IViewMentionOption';
import type { IViewItemActionChoice } from './IViewItemActionChoice';

/**
 * A feature-owned action for an item supplied by the current view.
 *
 * @public
 */
export interface IViewItemAction {
    readonly id: string;
    readonly order: number;
    readonly labelKey: string;
    readonly descriptionKey?: string;
    readonly iconName: string;
    readonly isAvailable: Signal<boolean>;
    readonly choices?: Signal<ReadonlyArray<IViewItemActionChoice>>;
    open?(): void;
    prefetch?(): void;
    execute(resource: IViewMentionOption, choiceId?: string): void | Promise<void>;
}
