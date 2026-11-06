import { ElementRef, signal, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ITextSuggestionMenuState } from '../../components/text-suggestions/ITextSuggestionMenuState';
import type { InputSuggestionSource } from './InputSuggestionSource';
import { InputSuggestionsDirective } from './InputSuggestionsDirective';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    IconNameDirective: class IconNameDirective {},
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    PopupComponent: class PopupComponent {},
    TextComponent: class TextComponent {},
}));

interface ISuggestionLifecycle {
    onCompositionStart(): void;

    onCompositionEnd(event: CompositionEvent): void;
}

const ALPHA = { id: 'alpha', label: 'Alpha', value: 'first value' };
const BETA = { id: 'beta', label: 'Beta', value: 'second value' };
const MESSAGES = { label: 'Suggestions', loading: 'Loading', empty: 'No matches', error: 'Lookup failed' };

describe('InputSuggestionsDirective', () => {
    beforeEach(() => vi.useFakeTimers());

    afterEach(() => {
        TestBed.resetTestingModule();
        vi.useRealTimers();
    });

    it('debounces the whole normalized value and publishes the caller messages and attribution', async () => {
        // Arrange
        const source = vi.fn(() => [ALPHA]);
        const { directive, host, menu, state } = createDirective(source);
        host.value = '  alpha   beta  ';

        // Act
        directive.refresh();
        expect(state()?.loading).toBe(true);
        expect(source).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(300);

        // Assert
        expect(source).toHaveBeenCalledWith('alpha beta', expect.any(AbortSignal));
        expect(state()?.items).toEqual([ALPHA]);
        expect(menu.setInput).toHaveBeenCalledWith('messages', MESSAGES);
        expect(menu.setInput).toHaveBeenCalledWith('attribution', 'Source attribution');
    });

    it('aborts an older lookup and ignores its eventual result', async () => {
        // Arrange
        let completeOlder!: (items: Array<typeof ALPHA>) => void;
        const older = new Promise<Array<typeof ALPHA>>((resolve) => {
            completeOlder = resolve;
        });
        const source = vi.fn<InputSuggestionSource<typeof ALPHA>>().mockReturnValueOnce(older).mockReturnValueOnce([BETA]);
        const { directive, host, state } = createDirective(source);
        host.value = 'alpha';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);

        // Act
        host.value = 'beta';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);
        completeOlder([ALPHA]);
        await Promise.resolve();

        // Assert
        expect(source.mock.calls[0]?.[1].aborted).toBe(true);
        expect(state()?.items).toEqual([BETA]);
    });

    it('navigates options with the editor focused and emits the original typed option', async () => {
        // Arrange
        const { directive, host } = createDirective(() => [ALPHA, BETA]);
        const selected = vi.fn();
        directive.selected.subscribe(selected);
        host.value = 'query';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);
        host.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true }));
        expect(host.getAttribute('aria-activedescendant')).toBe(`${directive.menuId}-option-1`);

        // Act
        const enter = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
        host.dispatchEvent(enter);

        // Assert
        expect(enter.defaultPrevented).toBe(true);
        expect(selected).toHaveBeenCalledWith(BETA);
        expect(host.value).toBe('query');
        expect(host.getAttribute('aria-expanded')).toBe('false');
    });

    it('uses the same selection path for activated menu items', async () => {
        // Arrange
        const { directive, host, activate } = createDirective(() => [ALPHA]);
        const selected = vi.fn();
        directive.selected.subscribe(selected);
        host.value = 'query';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);

        // Act
        activate(0);

        // Assert
        expect(selected).toHaveBeenCalledWith(ALPHA);
        expect(directive.isOpen()).toBe(false);
    });

    it('waits for IME composition to finish before searching', async () => {
        // Arrange
        const source = vi.fn(() => [ALPHA]);
        const { directive, host } = createDirective(source);
        const lifecycle = directive as unknown as ISuggestionLifecycle;
        lifecycle.onCompositionStart();
        host.value = 'さいたま';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);
        expect(source).not.toHaveBeenCalled();

        // Act
        lifecycle.onCompositionEnd(new CompositionEvent('compositionend'));
        await vi.advanceTimersByTimeAsync(300);

        // Assert
        expect(source).toHaveBeenCalledWith('さいたま', expect.any(AbortSignal));
    });

    it('aborts the lookup and restores existing ARIA when its injector is destroyed', async () => {
        // Arrange
        const source = vi.fn<InputSuggestionSource<typeof ALPHA>>().mockReturnValue(new Promise(() => undefined));
        const { directive, host, menu } = createDirective(source);
        host.setAttribute('role', 'searchbox');
        host.value = 'query';
        directive.refresh();
        await vi.advanceTimersByTimeAsync(300);

        // Act
        TestBed.resetTestingModule();

        // Assert
        expect(source.mock.calls[0]?.[1].aborted).toBe(true);
        expect(host.getAttribute('role')).toBe('searchbox');
        expect(host.hasAttribute('aria-expanded')).toBe(false);
        expect(menu.destroy).toHaveBeenCalledOnce();
    });
});

function createDirective(source: InputSuggestionSource<typeof ALPHA>) {
    const host = document.createElement('input');
    let activate!: (index: number) => void;
    let currentState: ITextSuggestionMenuState | undefined;
    const menu = {
        destroy: vi.fn(),
        setInput: vi.fn((name: string, value: unknown) => {
            if (name === 'state') currentState = value as ITextSuggestionMenuState;
        }),
        changeDetectorRef: { detectChanges: vi.fn() },
        instance: {
            selected: { subscribe: (listener: (index: number) => void) => (activate = listener) },
            open: vi.fn(),
            close: vi.fn(),
            listboxElement: vi.fn().mockReturnValue(null),
            optionElement: vi.fn().mockReturnValue(null),
        },
    };
    TestBed.configureTestingModule({
        providers: [
            { provide: ElementRef, useValue: new ElementRef(host) },
            { provide: ViewContainerRef, useValue: { createComponent: () => menu } },
        ],
    });
    const directive = TestBed.runInInjectionContext(() => new InputSuggestionsDirective<typeof ALPHA>());
    Object.defineProperties(directive, {
        source: { value: signal(source) },
        messages: { value: signal(MESSAGES) },
        attribution: { value: signal('Source attribution') },
    });

    return { directive, host, menu, state: () => currentState, activate: (index: number) => activate(index) };
}
