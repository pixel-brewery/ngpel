// #region Imports

import { describe, expect, it, vi } from 'vitest';
import { SignalSubject } from './SignalSubject';
import { map } from './operators/map';

// #endregion

describe('SignalSubject', () => {
    it('emits projected values', () => {
        // Arrange
        const values: Array<number> = [];
        const source = new SignalSubject<number>();
        const mapped = source.pipe<number>(map((value: number): number => value * 2));
        mapped.subscribe((value) => values.push(value));

        // Act
        source.next(1);
        source.next(3);

        // Assert
        expect(values).toEqual([2, 6]);
    });

    it('exposes underlying signal updates', () => {
        // Arrange
        const subject = new SignalSubject<number>();
        const value = subject.asReadonly();
        subject.next(4);

        // Act
        subject.next(7);

        // Assert
        expect(value()).toBe(7);
        expect(subject.value).toBe(7);
    });

    it('replays its initial value to a new subscriber', () => {
        // Arrange
        const subject = new SignalSubject(4);
        const observer = vi.fn();

        // Act
        subject.subscribe(observer);

        // Assert
        expect(observer).toHaveBeenCalledExactlyOnceWith(4);
    });

    it('does not replay an undefined current value', () => {
        // Arrange
        const subject = new SignalSubject<number>();
        const observer = vi.fn();

        // Act
        subject.subscribe(observer);

        // Assert
        expect(observer).not.toHaveBeenCalled();
        expect(subject.asReadonly()()).toBeUndefined();
    });

    it('stops notifying an unsubscribed observer', () => {
        // Arrange
        const subject = new SignalSubject<number>();
        const observer = vi.fn();
        const unsubscribe = subject.subscribe(observer);
        unsubscribe();

        // Act
        subject.next(3);

        // Assert
        expect(observer).not.toHaveBeenCalled();
    });

    it('notifies subscribers for a repeated value', () => {
        // Arrange
        const subject = new SignalSubject(4);
        const observer = vi.fn();
        subject.subscribe(observer);
        observer.mockClear();

        // Act
        subject.next(4);

        // Assert
        expect(observer).toHaveBeenCalledExactlyOnceWith(4);
    });

    it('emits undefined to current subscribers', () => {
        // Arrange
        const subject = new SignalSubject<number | undefined>(4);
        const observer = vi.fn();
        subject.subscribe(observer);
        observer.mockClear();

        // Act
        subject.next(undefined);

        // Assert
        expect(observer).toHaveBeenCalledExactlyOnceWith(undefined);
        expect(subject.value).toBeUndefined();
    });
});
