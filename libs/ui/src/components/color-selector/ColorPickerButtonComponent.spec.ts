import { TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ColorPickerButtonComponent } from './ColorPickerButtonComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ ColorPickerComponent: class ColorPickerComponent {} }));

class ColorPickerButtonProbe extends ColorPickerButtonComponent {
    public chooseColor(value: unknown): void {
        this.onColorChange(value);
    }
}

describe('ColorPickerButtonComponent', () => {
    it.each([
        ['#123abc', '#123ABC'],
        ['#a4fF', '#AA44FF'],
        ['rgb(34 102 68)', '#226644'],
    ])('normalizes the selected opaque color %s', (value, expected) => {
        // arrange
        const button = TestBed.runInInjectionContext(() => new ColorPickerButtonProbe());
        const selected = vi.fn();
        button.colorChange.subscribe(selected);

        // act
        button.chooseColor(value);

        // assert
        expect(selected).toHaveBeenCalledExactlyOnceWith(expected);
    });

    it.each([null, '#12', '#123ABC80', 'rgb(23 90 120 / 0.5)', 'not-a-color'])('ignores an invalid or transparent color %s', (value) => {
        // arrange
        const button = TestBed.runInInjectionContext(() => new ColorPickerButtonProbe());
        const selected = vi.fn();
        button.colorChange.subscribe(selected);

        // act
        button.chooseColor(value);

        // assert
        expect(selected).not.toHaveBeenCalled();
    });

    it('ignores color changes while disabled', () => {
        // arrange
        const button = TestBed.runInInjectionContext(() => new ColorPickerButtonProbe());
        vi.spyOn(button, 'disabled').mockReturnValue(true);
        const selected = vi.fn();
        button.colorChange.subscribe(selected);

        // act
        button.chooseColor('#123ABC');

        // assert
        expect(selected).not.toHaveBeenCalled();
    });
});
