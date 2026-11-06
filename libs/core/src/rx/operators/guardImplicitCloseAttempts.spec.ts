import { Subject } from 'rxjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { guardImplicitCloseAttempts } from './guardImplicitCloseAttempts';
import type { IPreventableCloseAttempt } from './IPreventableCloseAttempt';

function createRef() {
    const closeAttempted = new Subject<IPreventableCloseAttempt>();

    return {
        closeAttempted,
        ref: { closeAttempted: closeAttempted.asObservable(), requestAttention: vi.fn().mockResolvedValue(true) },
    };
}

describe('guardImplicitCloseAttempts', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('lets implicit close attempts pass when the guard predicate is false', () => {
        // Arrange
        const { closeAttempted, ref } = createRef();
        const attempt = { preventClose: vi.fn() };
        const onPreventClose = vi.fn();
        const subscription = guardImplicitCloseAttempts(ref, () => false, onPreventClose);

        // Act
        closeAttempted.next(attempt);

        // Assert
        expect(attempt.preventClose).not.toHaveBeenCalled();
        expect(ref.requestAttention).not.toHaveBeenCalled();
        expect(onPreventClose).not.toHaveBeenCalled();
        subscription.unsubscribe();
    });

    it('prevents implicit close attempts and requests attention when the guard predicate is true', () => {
        // Arrange
        const { closeAttempted, ref } = createRef();
        const attempt = { preventClose: vi.fn() };
        const onPreventClose = vi.fn();
        const subscription = guardImplicitCloseAttempts(ref, () => true, onPreventClose);

        // Act
        closeAttempted.next(attempt);

        // Assert
        expect(attempt.preventClose).toHaveBeenCalledOnce();
        expect(ref.requestAttention).toHaveBeenCalledOnce();
        expect(onPreventClose).toHaveBeenCalledExactlyOnceWith(attempt);
        subscription.unsubscribe();
    });

    it('works without a callback and stops guarding once unsubscribed', () => {
        // Arrange
        const { closeAttempted, ref } = createRef();
        const attempt = { preventClose: vi.fn() };
        const subscription = guardImplicitCloseAttempts(ref, () => true);

        // Act
        subscription.unsubscribe();
        closeAttempted.next(attempt);

        // Assert
        expect(attempt.preventClose).not.toHaveBeenCalled();
        expect(ref.requestAttention).not.toHaveBeenCalled();
    });
});
