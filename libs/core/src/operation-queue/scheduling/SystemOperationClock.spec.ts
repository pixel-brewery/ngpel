import { afterEach, describe, expect, it, vi } from 'vitest';
import { SystemOperationClock } from './SystemOperationClock';

describe('SystemOperationClock', () => {
    // #region Fields

    let clock: SystemOperationClock;

    // #endregion

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // #region Methods

    it('should create an instance', () => {
        // arrange
        // act
        clock = new SystemOperationClock();

        // assert
        expect(clock).toBeInstanceOf(SystemOperationClock);
    });

    it('should return Date.now() as a number', () => {
        // arrange
        vi.spyOn(Date, 'now').mockReturnValue(42);
        clock = new SystemOperationClock();

        // act
        const result = clock.now();

        // assert
        expect(result).toBe(42);
    });

    it('should return a different value when time advances', () => {
        // arrange
        vi.spyOn(Date, 'now').mockReturnValueOnce(100).mockReturnValueOnce(200);
        clock = new SystemOperationClock();

        // act
        const first = clock.now();
        const second = clock.now();

        // assert
        expect(second).toBeGreaterThan(first);
    });

    // #endregion
});
