import { ErrorHandler, inject } from '@angular/core';
import { asyncCommand } from '../commands/AsyncCommand';
import { command } from '../commands/Command';
import type { IMentionable } from '../behaviors/IMentionable';
import type { PresenterBehaviorBase } from '../behaviors/PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from '../behaviors/PresenterBehaviorReturn';
import type { IViewItemActionable } from './IViewItemActionable';
import type { IViewItemActionSelection } from './IViewItemActionSelection';
import { ViewItemActionRegistry } from './ViewItemActionRegistry';

/**
 * Adds only generic, registry-backed item actions to a mentionable presenter.
 *
 * @typeParam T - Presenter constructor that supplies the current view items.
 * @param base - Presenter constructor to extend.
 * @returns A presenter constructor with contextual actions.
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ViewItemActionable<T extends PresenterBehaviorBase & (abstract new (...args: any[]) => IMentionable)>(
    base: T,
): PresenterBehaviorReturn<T, IViewItemActionable> {
    abstract class ViewItemActionablePresenter extends base implements IViewItemActionable {
        private readonly _registry = inject(ViewItemActionRegistry);
        private readonly _errorHandler = inject(ErrorHandler);

        public readonly viewItemActions = this._registry.available;
        public readonly openViewItemActionCommand = command<string>((actionId) => {
            const action = this._registry.resolve(actionId);
            if (action?.isAvailable()) action.open?.();
        });
        public readonly executeViewItemActionCommand = asyncCommand<IViewItemActionSelection>(async (selection) => {
            const action = this._registry.resolve(selection.actionId);
            if (!action?.isAvailable()) return;
            if (action.choices) {
                const choice = action.choices().find((item) => item.id === selection.choiceId);
                if (!choice || choice.disabled) return;
            } else if (selection.choiceId !== undefined) {
                return;
            }
            const resource = this.getViewMentionSource()
                ?.items()
                .find((item) => item.resourceId === selection.resourceId);
            if (!resource) return;
            try {
                await action.execute(resource, selection.choiceId);
            } catch (error) {
                this._errorHandler.handleError(error);
            }
        });

        public override initialize(): void {
            super.initialize();
            for (const action of this.viewItemActions()) action.prefetch?.();
        }
    }

    return ViewItemActionablePresenter as PresenterBehaviorReturn<T, IViewItemActionable>;
}
