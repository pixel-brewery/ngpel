import type { IViewPresenter } from './IViewPresenter';

let disposingPresenters: WeakSet<IViewPresenter> | undefined;

/** Runs managed teardown once across the View and the presenter's injection scope. */
export function disposeViewPresenter(presenter: IViewPresenter): void {
    if (disposingPresenters?.has(presenter) || presenter.disposed()) {
        return;
    }

    (disposingPresenters ??= new WeakSet()).add(presenter);
    presenter.dispose();
}
