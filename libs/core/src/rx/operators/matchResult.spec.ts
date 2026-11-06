import type { IApiResult } from '@pixel-brewery/ngpel-core';
import { from, toArray } from 'rxjs';
import { describe, expect, it } from 'vitest';
import { matchResult } from './matchResult';

describe('matchResult', () => {
    it('routes success and failure results to the matching handler', () => {
        // Arrange
        const results: Array<IApiResult<string>> = [
            { success: true, status: 200, data: 'ok' },
            { success: false, status: 404, problem: { title: 'Not Found', status: 404 } },
        ];
        const emitted: Array<string> = [];

        // Act
        from(results)
            .pipe(
                matchResult<string, string>({
                    onSuccess: (result) => `success:${result.data}`,
                    onError: (result) => `error:${result.problem.title}`,
                }),
                toArray(),
            )
            .subscribe((values) => emitted.push(...values.map((value) => String(value))));

        // Assert
        expect(emitted).toEqual(['success:ok', 'error:Not Found']);
    });

    it('emits undefined for branches without a handler', () => {
        // Arrange
        const results: Array<IApiResult<number>> = [
            { success: true, status: 200, data: 1 },
            { success: false, status: 500, problem: { title: 'Server Error', status: 500 } },
        ];
        let emitted: Array<number | void> = [];

        // Act
        from(results)
            .pipe(matchResult<number, number>({ onSuccess: (result) => result.data }), toArray())
            .subscribe((values) => (emitted = values));

        // Assert
        expect(emitted).toEqual([1, undefined]);
    });
});
