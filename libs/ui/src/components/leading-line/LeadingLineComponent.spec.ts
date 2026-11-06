// #region Imports

import { type Signal, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { TestBed } from '@angular/core/testing';
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { LeadingLineComponent } from './LeadingLineComponent';

// #endregion

describe('Leading line', () => {
    it('lightens the line for deeper levels and keeps the last shade instead of fading out', async () => {
        // arrange
        await resolveComponentResources(async (resourceUrl) => readFile(new URL(resourceUrl, import.meta.url), 'utf8'));
        TestBed.configureTestingModule({ imports: [LeadingLineComponent] });
        await TestBed.compileComponents();

        // act
        const colors = [2, 3, 4, 9].map((level) => renderLineColor(level));

        // assert
        expect(new Set(colors.slice(0, 3)).size).toBe(3);
        expect(colors[3]).toBe(colors[2]);
        colors.forEach((color) => expect(color).toMatch(/^var\(--mosaik-color-primary-\d+\)$/));
    });
});

function renderLineColor(level: number): string {
    const fixture = TestBed.createComponent(LeadingLineComponent);
    setSignalInput(fixture.componentInstance.level, level);
    fixture.detectChanges();
    const line = fixture.nativeElement.querySelector('[part="line"]') as HTMLElement;

    return line.style.getPropertyValue('background-color');
}

function setSignalInput<T>(inputSignal: Signal<T>, value: T): void {
    const node = (
        inputSignal as Signal<T> & {
            [SIGNAL]: { applyValueToInputSignal(node: unknown, inputValue: T): void };
        }
    )[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
