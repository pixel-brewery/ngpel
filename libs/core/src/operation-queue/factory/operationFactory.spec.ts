import { describe, expect, it, vi } from 'vitest';
import { IOperation } from '../interfaces/IOperation';
import { IOperationContext } from '../interfaces/IOperationContext';
import { operation } from './operationFactory';

describe('operation factory', () => {
    it('should return a full IOperation as-is', () => {
        // arrange
        const full: IOperation<string, string> = {
            type: 'my-op',
            payload: 'data',
            label: 'My Op',
            apply: vi.fn(),
            commit: vi.fn().mockResolvedValue('ok'),
            rollback: vi.fn(),
        };

        // act
        const result = operation(full);

        // assert
        expect(result).toBe(full);
    });

    it('should create IOperation from minimal definition with only commit', () => {
        // arrange
        const commitFn = vi.fn().mockResolvedValue(undefined);

        // act
        const result = operation({ commit: commitFn });

        // assert
        expect(result.type).toBe('anonymous');
        expect(result.payload).toBeUndefined();
        expect(result.label).toBe('anonymous');
        expect(result.commit).toBe(commitFn);
        expect(typeof result.apply).toBe('function');
        expect(typeof result.rollback).toBe('function');
    });

    it('should use type as label when label is omitted', () => {
        // arrange & act
        const result = operation({ type: 'save-doc', commit: vi.fn() });

        // assert
        expect(result.label).toBe('save-doc');
    });

    it('should allow explicit label to override type', () => {
        // arrange & act
        const result = operation({ type: 'save-doc', label: 'Save Document', commit: vi.fn() });

        // assert
        expect(result.label).toBe('Save Document');
    });

    it('should forward payload', () => {
        // arrange & act
        const result = operation<{ id: number }, void>({
            payload: { id: 42 },
            commit: vi.fn(),
        });

        // assert
        expect(result.payload).toEqual({ id: 42 });
    });

    it('should forward delayInMilliseconds', () => {
        // arrange & act
        const result = operation({ commit: vi.fn(), delayInMilliseconds: 3000 });

        // assert
        expect(result.delayInMilliseconds).toBe(3000);
    });

    it('should forward mergeKey', () => {
        // arrange & act
        const result = operation({ commit: vi.fn(), mergeKey: 'doc-7' });

        // assert
        expect(result.mergeKey).toBe('doc-7');
    });

    it('should use provided apply over default no-op', () => {
        // arrange
        const applyFn = vi.fn();

        // act
        const result = operation({ apply: applyFn, commit: vi.fn() });

        // assert
        expect(result.apply).toBe(applyFn);
    });

    it('should use provided rollback over default no-op', () => {
        // arrange
        const rollbackFn = vi.fn();

        // act
        const result = operation({ rollback: rollbackFn, commit: vi.fn() });

        // assert
        expect(result.rollback).toBe(rollbackFn);
    });

    it('should forward onCommitted hook', () => {
        // arrange
        const hook = vi.fn();

        // act
        const result = operation({ commit: vi.fn(), onCommitted: hook });

        // assert
        expect(result.onCommitted).toBe(hook);
    });

    it('should forward onFailed hook', () => {
        // arrange
        const hook = vi.fn();

        // act
        const result = operation({ commit: vi.fn(), onFailed: hook });

        // assert
        expect(result.onFailed).toBe(hook);
    });

    it('should forward onRejected hook', () => {
        // arrange
        const hook = vi.fn();

        // act
        const result = operation({ commit: vi.fn(), onRejected: hook });

        // assert
        expect(result.onRejected).toBe(hook);
    });

    it('default apply should be a no-op', () => {
        // arrange
        const result = operation({ commit: vi.fn() });
        const ctx: IOperationContext = { entryId: '1', idempotencyKey: '1', operationType: 'anonymous', requestedAt: 0 };

        // act & assert
        expect(() => result.apply(ctx)).not.toThrow();
    });

    it('default rollback should be a no-op', () => {
        // arrange
        const result = operation({ commit: vi.fn() });
        const ctx: IOperationContext = { entryId: '1', idempotencyKey: '1', operationType: 'anonymous', requestedAt: 0 };

        // act & assert
        expect(() => result.rollback(ctx)).not.toThrow();
    });
});
