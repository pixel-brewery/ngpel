import { TestBed } from '@angular/core/testing';
import { PopupComponent } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AnchoredPopupDirective } from './AnchoredPopupDirective';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({ PopupComponent: class PopupComponent {} }));

interface IProfileEvent {
    readonly anchor: HTMLElement;
    readonly id: number;
}

describe('AnchoredPopupDirective', () => {
    let directive: AnchoredPopupDirective<IProfileEvent, string>;
    let anchor: HTMLButtonElement;
    let popup: {
        attach: ReturnType<typeof vi.fn<(value?: HTMLElement) => unknown>>;
        open: ReturnType<typeof vi.fn<(value?: HTMLElement) => unknown>>;
        close: ReturnType<typeof vi.fn<(value?: HTMLElement) => unknown>>;
    };
    let load: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        anchor = document.createElement('button');
        document.body.append(anchor);
        popup = {
            attach: vi.fn(),
            open: vi.fn().mockResolvedValue(undefined),
            close: vi.fn().mockResolvedValue(undefined),
        };
        load = vi.fn().mockResolvedValue('current');
        TestBed.configureTestingModule({
            providers: [
                AnchoredPopupDirective,
                { provide: PopupComponent, useValue: { invoke: (method: keyof typeof popup, value?: HTMLElement) => popup[method](value) } },
            ],
        });
        directive = TestBed.inject(AnchoredPopupDirective<IProfileEvent, string>);
        Object.defineProperty(directive, 'load', { value: () => load });
    });

    afterEach(() => {
        anchor.remove();
    });

    it('keeps the preview mounted while closing and opens again without a blank frame', async () => {
        const event = { anchor, id: 1 };
        directive.show(event);
        await vi.waitFor(() => expect(directive.result()).toBe('current'));
        expect(popup.attach).toHaveBeenCalledWith(anchor);

        directive.hide(anchor, true);
        await vi.waitFor(() => expect(popup.close).toHaveBeenCalledOnce());
        expect(directive.current()).toBe(event);
        expect(directive.result()).toBe('current');

        directive.show(event);
        await vi.waitFor(() => expect(popup.open).toHaveBeenCalledTimes(2));
        expect(directive.current()).toBe(event);
    });

    it('ignores an older request after switching anchors', async () => {
        let finishFirst!: (value: string | null) => void;
        load.mockImplementationOnce(() => new Promise<string | null>((resolve) => (finishFirst = resolve)));
        const other = document.createElement('button');
        document.body.append(other);
        try {
            directive.show({ anchor, id: 1 });
            await vi.waitFor(() => expect(load).toHaveBeenCalledOnce());
            directive.show({ anchor: other, id: 2 });
            await vi.waitFor(() => expect(directive.result()).toBe('current'));
            finishFirst('stale');
            await Promise.resolve();
            expect(directive.current()?.id).toBe(2);
            expect(directive.result()).toBe('current');
        } finally {
            other.remove();
        }
    });
});
