// #region Imports

import { Observable, Subject, throwError } from 'rxjs';
import { describe, expect, it } from 'vitest';
import type { DestroyRef } from '@angular/core';
import { ViewPresenter } from '../presenters/ViewPresenter';
import { Hydratable } from './Hydratable';
import type { HydrationOperation } from './HydrationOperation';

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

class EmptyHydrationPresenter extends Hydratable(ViewPresenter) {}

class StreamHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Fields

    private readonly _hydration: Subject<void> = new Subject<void>();

    // #endregion

    // #region Properties

    public get hydration(): Subject<void> {
        return this._hydration;
    }

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return this._hydration.asObservable();
    }

    // #endregion
}

class CancelledHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Methods

    public override onHydrate(): HydrationOperation {
        return new Observable<unknown>((subscriber) => {
            subscriber.unsubscribe();
        });
    }

    // #endregion
}

class PromiseHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Fields

    private readonly _resolvers: Array<() => void> = [];

    // #endregion

    // #region Properties

    public get resolvers(): ReadonlyArray<() => void> {
        return this._resolvers;
    }

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return new Promise<void>((resolve) => {
            this._resolvers.push(resolve);
        });
    }

    // #endregion
}

class FailingHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Fields

    private _hydrationError: unknown = undefined;

    // #endregion

    // #region Properties

    public get hydrationError(): unknown {
        return this._hydrationError;
    }

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        throw new Error('Hydration failed');
    }

    public override onHydrationError(error: unknown): void {
        this._hydrationError = error;
    }

    // #endregion
}

class RejectingHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Fields

    private _hydrationError: unknown = undefined;

    // #endregion

    // #region Properties

    public get hydrationError(): unknown {
        return this._hydrationError;
    }

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return Promise.reject(new Error('Hydration rejected'));
    }

    public override onHydrationError(error: unknown): void {
        this._hydrationError = error;
    }

    // #endregion
}

class ErroringStreamHydrationPresenter extends Hydratable(ViewPresenter) {
    // #region Fields

    private _hydrationError: unknown = undefined;
    private _hydratingWhenReported: boolean | undefined = undefined;

    // #endregion

    // #region Properties

    public get hydrationError(): unknown {
        return this._hydrationError;
    }

    public get hydratingWhenReported(): boolean | undefined {
        return this._hydratingWhenReported;
    }

    // #endregion

    // #region Methods

    public override onHydrate(): HydrationOperation {
        return throwError(() => new Error('Hydration stream failed'));
    }

    public override onHydrationError(error: unknown): void {
        this._hydrationError = error;
        this._hydratingWhenReported = this.isHydrating();
    }

    // #endregion
}

async function flushMicrotasks(): Promise<void> {
    await Promise.resolve();
    await Promise.resolve();
}

describe('Hydratable presenter behavior', () => {
    it('hydrates before the presenter is initialized', () => {
        // Arrange
        const presenter = new EmptyHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        const actual = presenter.isHydrating();

        // Assert
        expect(actual).toBe(true);
    });

    it('finishes an empty hydration only after the View could observe the state', async () => {
        // Arrange
        const presenter = new EmptyHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isHydrating()).toBe(true);
        await flushMicrotasks();
        expect(presenter.isHydrating()).toBe(false);
    });

    it('keeps hydrating while the hydration stream has not completed', () => {
        // Arrange
        const presenter = new StreamHydrationPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();

        // Act
        presenter.hydration.next();

        // Assert
        expect(presenter.isHydrating()).toBe(true);
    });

    it('leaves hydration when the hydration stream completes', () => {
        // Arrange
        const presenter = new StreamHydrationPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();

        // Act
        presenter.hydration.complete();

        // Assert
        expect(presenter.isHydrating()).toBe(false);
    });

    it('leaves hydration when the hydration stream is torn down without completing', () => {
        // Arrange
        const presenter = new CancelledHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isHydrating()).toBe(false);
    });

    it('leaves hydration when a hydration promise resolves', async () => {
        // Arrange
        const presenter = new PromiseHydrationPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();

        // Act
        presenter.resolvers[0]?.();

        // Assert
        await flushMicrotasks();
        expect(presenter.isHydrating()).toBe(false);
    });

    it('ignores the completion of a superseded hydration', async () => {
        // Arrange
        const presenter = new PromiseHydrationPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();
        presenter.initialize();

        // Act
        presenter.resolvers[0]?.();

        // Assert
        await flushMicrotasks();
        expect(presenter.isHydrating()).toBe(true);
    });

    it('leaves hydration and reports an error thrown while starting it', () => {
        // Arrange
        const presenter = new FailingHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.isHydrating()).toBe(false);
        expect(presenter.hydrationError).toEqual(new Error('Hydration failed'));
    });

    it('leaves hydration before it reports an error the hydration stream raised', () => {
        // Arrange
        const presenter = new ErroringStreamHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        expect(presenter.hydrationError).toEqual(new Error('Hydration stream failed'));
        expect(presenter.hydratingWhenReported).toBe(false);
        expect(presenter.isHydrating()).toBe(false);
    });

    it('leaves hydration and reports a rejected hydration promise', async () => {
        // Arrange
        const presenter = new RejectingHydrationPresenter(createFakeDestroyScope().destroyRef);

        // Act
        presenter.initialize();

        // Assert
        await flushMicrotasks();
        expect(presenter.isHydrating()).toBe(false);
        expect(presenter.hydrationError).toEqual(new Error('Hydration rejected'));
    });

    it('leaves hydration when the presenter is disposed while it is still running', () => {
        // Arrange
        const presenter = new StreamHydrationPresenter(createFakeDestroyScope().destroyRef);
        presenter.initialize();

        // Act
        presenter.dispose();

        // Assert
        expect(presenter.isHydrating()).toBe(false);
        expect(presenter.disposed()).toBe(true);
    });

    it('rethrows a hydration error no presenter handled', () => {
        // Arrange
        const presenter = new EmptyHydrationPresenter(createFakeDestroyScope().destroyRef);
        const error = new Error('Unhandled');

        // Act
        const report = (): void => presenter.onHydrationError(error);

        // Assert
        expect(report).toThrow(error);
    });
});
