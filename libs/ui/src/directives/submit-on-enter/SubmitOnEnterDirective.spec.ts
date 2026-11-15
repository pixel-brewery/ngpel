import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SubmitOnEnterDirective } from './SubmitOnEnterDirective';

@Component({
    imports: [SubmitOnEnterDirective],
    template: `
        <form>
            <input ngpSubmitOnEnter required />
        </form>
    `,
})
class HostComponent {}

describe('SubmitOnEnterDirective', () => {
    afterEach(() => TestBed.resetTestingModule());

    it.each([
        ['Enter', false, 'valid', true, 1],
        ['Enter', false, '', true, 0],
        ['Enter', true, 'composing', false, 0],
        ['Escape', false, 'valid', false, 0],
    ])('forwards %s with composing=%s and value=%j through form validation', (key, isComposing, value, prevented, count) => {
        const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
        fixture.detectChanges();
        const root = fixture.nativeElement as HTMLElement;
        const form = root.querySelector('form')!;
        const input = root.querySelector('input')!;
        const submitted = vi.fn((event: Event) => event.preventDefault());
        form.addEventListener('submit', submitted);
        input.value = value;
        const event = new KeyboardEvent('keydown', { key, isComposing, bubbles: true, cancelable: true });

        input.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(prevented);
        expect(submitted).toHaveBeenCalledTimes(count);
    });
});
