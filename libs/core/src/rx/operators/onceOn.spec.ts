import { EMPTY, of, Subject, take, throwError } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { onceOn } from './onceOn';

describe('onceOn', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('forwards every value of the source through one subscription', () => {
        // Arrange
        const source = of(1, 2);
        const next = vi.fn();

        // Act
        const subscription = onceOn(source, next);

        // Assert
        expect(next.mock.calls).toEqual([[1], [2]]);
        expect(subscription.closed).toBe(true);
    });

    it('keeps observing a source after its first value', () => {
        // Arrange
        const source = new Subject<number>();
        const subscription = onceOn(source, vi.fn<(value: number) => void>());

        // Act
        source.next(1);

        // Assert
        expect(subscription.closed).toBe(false);
        expect(source.observed).toBe(true);
        subscription.unsubscribe();
    });

    it('completes a partial observer when the source completes', () => {
        // Arrange
        const source = new Subject<string>();
        const observer = { next: vi.fn(), complete: vi.fn(), error: vi.fn() };
        onceOn(source, observer);
        source.next('first');

        // Act
        source.complete();

        // Assert
        expect(observer.next).toHaveBeenCalledExactlyOnceWith('first');
        expect(observer.complete).toHaveBeenCalledOnce();
        expect(observer.error).not.toHaveBeenCalled();
    });

    it('preserves the original observable handle used by legacy callers', () => {
        // Arrange
        const source = EMPTY;

        // Act
        const handle: { observable: typeof source } = onceOn(source, () => undefined);

        // Assert
        expect(handle.observable).toBe(source);
    });

    it('supports explicitly observing only the first value', () => {
        // Arrange
        const next = vi.fn();

        // Act
        const subscription = onceOn(of(1, 2).pipe(take(1)), next);

        // Assert
        expect(next).toHaveBeenCalledExactlyOnceWith(1);
        expect(subscription.closed).toBe(true);
    });

    it('forwards errors to the observer without emitting a value', () => {
        // Arrange
        const failure = new Error('boom');
        const observer = { next: vi.fn(), error: vi.fn() };

        // Act
        onceOn(
            throwError(() => failure),
            observer,
        );

        // Assert
        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.error).toHaveBeenCalledExactlyOnceWith(failure);
    });

    it('completes without a value when the source completes empty', () => {
        // Arrange
        const observer = { next: vi.fn(), complete: vi.fn() };

        // Act
        const subscription = onceOn(EMPTY, observer);

        // Assert
        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.complete).toHaveBeenCalledOnce();
        expect(subscription.closed).toBe(true);
    });

    it('lets the caller cancel the wait before a value arrives', () => {
        // Arrange
        const source = new Subject<number>();
        const next = vi.fn();
        const subscription = onceOn(source, next);

        // Act
        subscription.unsubscribe();
        source.next(1);

        // Assert
        expect(next).not.toHaveBeenCalled();
        expect(source.observed).toBe(false);
    });
});
