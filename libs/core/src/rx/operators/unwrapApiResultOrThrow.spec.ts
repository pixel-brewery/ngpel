import { ApiResultError, toApiFailure, toApiSuccess, type IApiResult } from '@pixel-brewery/ngpel-core';
import { firstValueFrom, of, throwError } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { unwrapApiResultOrThrow } from './unwrapApiResultOrThrow';

describe('unwrapApiResultOrThrow', () => {
    it('emits the original data on success', async () => {
        // Arrange
        const data = { id: 42 };
        const source = of(toApiSuccess(data, 201));

        // Act
        const result = await firstValueFrom(source.pipe(unwrapApiResultOrThrow()));

        // Assert
        expect(result).toBe(data);
    });

    it('preserves the problem detail and transport status in an ApiResultError', async () => {
        // Arrange
        const problem = { title: 'Conflict', status: 409, detail: 'The record was updated.', code: 'VERSION_CONFLICT' };
        const source = of<IApiResult<number>>({ success: false, status: 422, problem });

        // Act
        const error = await firstValueFrom(source.pipe(unwrapApiResultOrThrow())).catch((error: unknown) => error);

        // Assert
        expect(error).toBeInstanceOf(ApiResultError);
        expect(error).toMatchObject({ message: problem.detail, status: 422 });
        expect((error as ApiResultError).problem).toBe(problem);
    });

    it('uses the problem title when the API failure has no detail', async () => {
        // Arrange
        const source = of(toApiFailure({ status: 503, statusText: 'Service Unavailable' }));

        // Act and assert
        await expect(firstValueFrom(source.pipe(unwrapApiResultOrThrow()))).rejects.toThrow('Service Unavailable');
    });

    it('passes through source errors', async () => {
        // Arrange
        const error = new Error('Transport failed');
        const source = throwError(() => error);

        // Act and assert
        await expect(firstValueFrom(source.pipe(unwrapApiResultOrThrow()))).rejects.toBe(error);
    });
});
