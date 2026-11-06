// #region Imports

import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import { command, type Command } from '../commands/Command';
import { DEFAULT_PAGE_SIZE } from './DEFAULT_PAGE_SIZE';
import type { IPageable } from './IPageable';
import type { PresenterBehaviorBase } from './PresenterBehaviorBase';
import type { PresenterBehaviorReturn } from './PresenterBehaviorReturn';

// #endregion

/**
 * Zero-based page index as paginators report it.
 */
interface IPageIndexLike {
    readonly pageIndex: number;
}

/**
 * Custom event carrying a zero-based page index in its `detail`, the shape web-component
 * paginators dispatch.
 */
interface IPageIndexEventLike {
    readonly detail: IPageIndexLike;
}

/**
 * Adds a paging window and a page-change command to a presenter.
 *
 * @remarks
 * The behavior owns `skip`/`take`/`total` and derives the one-based `currentPage` from them;
 * reloading is left to the presenter, which overrides `onPageChanged()`. The command normalises the
 * three shapes a paginator commonly emits without binding the behavior to any UI library.
 *
 * @public
 * @param base The class to extend.
 * @param pageSize Items per page; defaults to {@link DEFAULT_PAGE_SIZE}.
 * @returns An abstract class that additionally implements {@link IPageable}.
 *
 * @example
 * ```typescript
 * class OrderListViewPresenter extends Pageable(ViewPresenter, 50) {
 *     public override onPageChanged(): void {
 *         this.load();
 *     }
 * }
 * ```
 */
export function Pageable<T extends PresenterBehaviorBase>(base: T, pageSize: number = DEFAULT_PAGE_SIZE): PresenterBehaviorReturn<T, IPageable> {
    abstract class PageablePresenter extends base implements IPageable {
        // #region Fields

        private readonly _skip: WritableSignal<number> = signal(0);
        private readonly _take: WritableSignal<number> = signal(pageSize);
        private readonly _total: WritableSignal<number> = signal(0);
        private readonly _currentPage: Signal<number> = computed(() => Math.floor(this._skip() / this._take()) + 1);
        private readonly _pageChangedCommand: Command<unknown> = command<unknown>((page: unknown) => this.changePage(page));

        // #endregion

        // #region Properties

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get skip(): Signal<number> {
            return this._skip.asReadonly();
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get take(): Signal<number> {
            return this._take.asReadonly();
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get total(): Signal<number> {
            return this._total.asReadonly();
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get currentPage(): Signal<number> {
            return this._currentPage;
        }

        /**
         * @inheritdoc
         *
         * @public
         * @readonly
         */
        public get pageChangedCommand(): Command<unknown> {
            return this._pageChangedCommand;
        }

        // #endregion

        // #region Methods

        /**
         * @inheritdoc
         *
         * @public
         * @virtual
         */
        public onPageChanged(): void {
            // No reload by default — override in the concrete presenter.
        }

        /**
         * @inheritdoc
         *
         * @public
         */
        public setTotal(value: number): void {
            this._total.set(value);
        }

        /**
         * @inheritdoc
         *
         * @public
         */
        public resetPage(): void {
            this._skip.set(0);
        }

        /**
         * Moves the paging window when the parameter names a page, and notifies the presenter.
         */
        private changePage(parameter: unknown): void {
            const pageNumber = this.resolvePageNumber(parameter);

            if (pageNumber === undefined) {
                return;
            }

            this._skip.set((pageNumber - 1) * this._take());
            this.onPageChanged();
        }

        /**
         * Normalises the accepted parameter shapes to a one-based page number.
         */
        private resolvePageNumber(parameter: unknown): number | undefined {
            if (this.isPageNumber(parameter)) {
                return parameter;
            }

            if (this.isPageIndexLike(parameter)) {
                return parameter.pageIndex + 1;
            }

            if (this.isPageIndexEventLike(parameter)) {
                return parameter.detail.pageIndex + 1;
            }

            return undefined;
        }

        /**
         * Whether the parameter is a one-based page number.
         */
        private isPageNumber(parameter: unknown): parameter is number {
            return typeof parameter === 'number' && Number.isSafeInteger(parameter) && parameter > 0;
        }

        /**
         * Whether the parameter carries a zero-based page index.
         */
        private isPageIndexLike(parameter: unknown): parameter is IPageIndexLike {
            return typeof parameter === 'object' && parameter !== null && 'pageIndex' in parameter && this.isPageIndex(parameter.pageIndex);
        }

        /**
         * Whether the parameter is an event carrying a zero-based page index in its `detail`.
         */
        private isPageIndexEventLike(parameter: unknown): parameter is IPageIndexEventLike {
            return typeof parameter === 'object' && parameter !== null && 'detail' in parameter && this.isPageIndexLike(parameter.detail);
        }

        /**
         * Whether the value is a zero-based page index.
         */
        private isPageIndex(parameter: unknown): parameter is number {
            return typeof parameter === 'number' && Number.isSafeInteger(parameter) && parameter >= 0;
        }

        // #endregion
    }

    return PageablePresenter as PresenterBehaviorReturn<T, IPageable>;
}
