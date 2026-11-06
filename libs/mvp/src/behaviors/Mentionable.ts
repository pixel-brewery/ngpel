// #region Imports

import { inject } from '@angular/core';
import type { IViewMentionSource } from '../mentions/IViewMentionSource';
import { ViewMentionRegistry } from '../mentions/ViewMentionRegistry';
import type { IMentionable } from './IMentionable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * Registers a presenter's mention source for the duration of its initialized lifecycle.
 *
 * @public
 * @param base The presenter class to extend.
 * @returns An abstract class that additionally implements {@link IMentionable}.
 */
export function Mentionable<T extends PresenterBehaviorBase>(base: T): PresenterBehaviorReturn<T, IMentionable> {
    abstract class MentionablePresenter extends base implements IMentionable {
        // #region Fields

        private readonly _viewMentionRegistry: ViewMentionRegistry = inject(ViewMentionRegistry);
        private _unregisterViewMentionSource: (() => void) | undefined = undefined;

        // #endregion

        // #region Methods

        /**
         * @inheritdoc
         *
         * @public
         * @abstract
         */
        public abstract getViewMentionSource(): IViewMentionSource | null;

        /**
         * Replaces any earlier registration with the source for the current view.
         *
         * @public
         * @override
         */
        public override initialize(): void {
            super.initialize();
            this._unregisterViewMentionSource?.();

            const source = this.getViewMentionSource();

            this._unregisterViewMentionSource = source ? this._viewMentionRegistry.register(source) : undefined;
        }

        /**
         * Releases the source before disposing the presenter.
         *
         * @public
         * @override
         */
        public override dispose(): void {
            this._unregisterViewMentionSource?.();
            this._unregisterViewMentionSource = undefined;

            super.dispose();
        }

        // #endregion
    }

    return MentionablePresenter as PresenterBehaviorReturn<T, IMentionable>;
}
