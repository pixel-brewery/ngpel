// #region Imports

import { Observable, Subject, Subscription } from 'rxjs';
import { describe, expect, it } from 'vitest';
import type { DestroyRef } from '@angular/core';
import { ViewPresenter } from './ViewPresenter';

// #endregion

/** A destruction scope the spec drives by hand: it hands out a `DestroyRef` and replays its callbacks. */
interface IFakeDestroyScope {
    readonly destroyRef: DestroyRef;
    destroy(): void;
}

/** Creates a destruction scope for a consumer constructed directly instead of through `TestBed`. */
function createFakeDestroyScope(): IFakeDestroyScope {
    const callbacks: Array<() => void> = [];
    const destroyRef: DestroyRef = {
        destroyed: false,
        onDestroy: (callback: () => void): (() => void) => {
            callbacks.push(callback);

            return (): void => {
                const index = callbacks.indexOf(callback);

                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            };
        },
    };

    return {
        destroyRef,
        destroy: (): void => {
            for (const callback of [...callbacks]) {
                callback();
            }
        },
    };
}

class TestViewPresenter extends ViewPresenter {
    // #region Properties

    public get cancellation(): AbortSignal {
        return this.abortRef.signal;
    }

    // #endregion

    // #region Methods

    public runSubscription(subscription: Subscription): Subscription {
        return this.withLoading(subscription);
    }

    public runStream<T>(stream: Observable<T>): Observable<T> {
        return this.withLoading(stream);
    }

    public runWork<T>(work: () => Promise<T> | T): Promise<T> {
        return this.withLoading(work);
    }

    public enterLoading(): void {
        this.loadingRef.enter();
    }

    public leaveLoading(): void {
        this.loadingRef.leave();
    }

    public setManualLoading(value: boolean): void {
        this.loading(value);
    }

    // #endregion
}

describe('ViewPresenter', () => {
    it('reports itself initialized once the View initialized it', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.initialized()).toBe(true);
        expect(presenter.disposed()).toBe(false);
    });

    it('aborts its cancellation signal and reports itself disposed', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.dispose();

        // Assert
        expect(presenter.disposed()).toBe(true);
        expect(presenter.cancellation.aborted).toBe(true);
    });

    it('disposes itself when its injection scope is destroyed', () => {
        // Arrange
        const scope = createFakeDestroyScope();
        const presenter = new TestViewPresenter(scope.destroyRef);

        // Act
        scope.destroy();

        // Assert
        expect(presenter.disposed()).toBe(true);
        expect(presenter.cancellation.aborted).toBe(true);
    });

    it('unsubscribes a tracked subscription when it is disposed', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        const subscription = presenter.runSubscription(new Subject<number>().subscribe());

        // Act
        presenter.dispose();

        // Assert
        expect(subscription.closed).toBe(true);
        expect(presenter.isLoading()).toBe(false);
    });

    it('keeps loading while a tracked promise is pending', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        const pending = new Promise<void>(() => undefined);

        // Act
        presenter.runWork(() => pending);

        // Assert
        expect(presenter.isLoading()).toBe(true);
    });

    it('leaves the loading state once a tracked promise settled', async () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        let complete: (() => void) | undefined;
        const tracked = presenter.runWork(
            () =>
                new Promise<void>((resolve) => {
                    complete = resolve;
                }),
        );

        // Act
        complete?.();

        // Assert
        await tracked;
        expect(presenter.isLoading()).toBe(false);
    });

    it('does not report loading for a tracked stream nobody subscribed to', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        const source = new Subject<number>();

        // Act
        presenter.runStream(source.asObservable());

        // Assert
        expect(presenter.isLoading()).toBe(false);
    });

    it('leaves the loading state when the subscriber of a tracked stream unsubscribes', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        const subscription = presenter.runStream(new Subject<number>().asObservable()).subscribe();

        // Act
        subscription.unsubscribe();

        // Assert
        expect(presenter.isLoading()).toBe(false);
    });

    it('reports loading for every subscriber of a tracked stream', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        const tracked = presenter.runStream(new Subject<number>().asObservable());

        // Act
        tracked.subscribe();

        // Assert
        expect(presenter.isLoading()).toBe(true);
    });

    it('does not let an unbalanced leave hide a later loading operation', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.leaveLoading();

        // Act
        presenter.enterLoading();

        // Assert
        expect(presenter.isLoading()).toBe(true);
    });

    it('supports the loading method used by existing presenter subclasses', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.setManualLoading(true);

        // Assert
        expect(presenter.isLoading()).toBe(true);
    });

    it('keeps automatic work loading when a manual operation finishes', () => {
        // Arrange
        const presenter = new TestViewPresenter(createFakeDestroyScope().destroyRef);
        presenter.setManualLoading(true);
        const subscription = presenter.runStream(new Subject<void>()).subscribe();

        // Act
        presenter.setManualLoading(false);

        // Assert
        expect(presenter.isLoading()).toBe(true);
        subscription.unsubscribe();
    });
});
