// #region Imports

import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { ChunkPipe } from './ChunkPipe';

// #endregion

@Component({
    imports: [ChunkPipe],
    template: '{{ (items() | ngpChunk: 2).length }}',
})
class HostComponent {
    public readonly items = signal<ReadonlyArray<string>>(['a', 'b', 'c']);
}

describe('ChunkPipe', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('splits a list into full chunks', () => {
        // Arrange
        const pipe = new ChunkPipe();

        // Act
        const result = pipe.transform([1, 2, 3, 4], 2);

        // Assert
        expect(result).toEqual([
            [1, 2],
            [3, 4],
        ]);
    });

    it('keeps the remainder in a shorter last chunk', () => {
        // Arrange
        const pipe = new ChunkPipe();

        // Act
        const result = pipe.transform(['a', 'b', 'c'], 2);

        // Assert
        expect(result).toEqual([['a', 'b'], ['c']]);
    });

    it.each([null, undefined, []])('returns an empty list for %j', (value) => {
        // Arrange
        const pipe = new ChunkPipe();

        // Act
        const result = pipe.transform(value, 2);

        // Assert
        expect(result).toEqual([]);
    });

    it.each([0, -1, 1.5, Number.NaN])('rejects the chunk size %s', (size) => {
        // Arrange
        const pipe = new ChunkPipe();

        // Act
        const act = (): Array<Array<number>> => pipe.transform([1, 2, 3], size);

        // Assert
        expect(act).toThrow(RangeError);
    });

    it('chunks the list under the ngpChunk name', () => {
        // Arrange
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);

        // Act
        fixture.detectChanges();

        // Assert
        expect((fixture.nativeElement as HTMLElement).textContent?.trim()).toBe('2');
    });
});
