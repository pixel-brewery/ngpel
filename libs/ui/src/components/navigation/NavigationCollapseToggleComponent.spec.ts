import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NavigationCollapseToggleComponent } from './NavigationCollapseToggleComponent';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    FloatingActionButtonComponent: class FloatingActionButtonComponent {},
    IconNameDirective: class IconNameDirective {},
    TooltipDirective: class TooltipDirective {},
}));

describe('NavigationCollapseToggleComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('requests the opposite of the controlled compact state with the platform shortcut', () => {
        // Arrange
        const change = listenForChanges();

        // Act
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, cancelable: true }));

        // Assert
        expect(change).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('cleans up the active hover target when navigation is removed', () => {
        const target = document.createElement('nav');
        const navigation = signal<{ elementRef: ElementRef<HTMLElement> } | null>({ elementRef: new ElementRef(target) });
        const toggle = TestBed.runInInjectionContext(() => new NavigationCollapseToggleComponent());
        Object.assign(toggle, { navigation });
        TestBed.tick();
        target.dispatchEvent(new Event('pointerenter'));
        expect(toggle.revealed()).toBe(true);

        navigation.set(null);
        TestBed.tick();
        target.dispatchEvent(new Event('pointerenter'));

        expect(toggle.revealed()).toBe(false);
    });

    it('leaves a platform shortcut in an editor available to the editor', () => {
        // Arrange
        const change = listenForChanges();
        const editor = document.createElement('input');
        document.body.append(editor);
        const shortcut = new KeyboardEvent('keydown', { key: 'b', ctrlKey: true, bubbles: true, cancelable: true });

        // Act
        editor.dispatchEvent(shortcut);
        editor.remove();

        // Assert
        expect(shortcut.defaultPrevented).toBe(false);
        expect(change).not.toHaveBeenCalled();
    });
});

function listenForChanges(): ReturnType<typeof vi.fn> {
    vi.spyOn(window.navigator, 'platform', 'get').mockReturnValue('Linux');
    const toggle = TestBed.runInInjectionContext(() => new NavigationCollapseToggleComponent());
    Object.assign(toggle, { collapsed: signal(true), shortcutKey: signal('b') });
    const change = vi.fn();
    toggle.collapsedChange.subscribe(change);
    TestBed.tick();
    return change;
}
