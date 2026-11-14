import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { DropDownButtonComponent } from '@pixel-brewery/mosaik-elements-angular';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { IPageToolbarDefaults } from './IPageToolbarDefaults';
import { PageToolbarComponent } from './PageToolbarComponent';
import { providePageToolbarDefaults } from './providePageToolbarDefaults';

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    BreakpointService: class BreakpointService {},
    ButtonComponent: class ButtonComponent {},
    DividerComponent: class DividerComponent {},
    DropDownButtonComponent: class DropDownButtonComponent {},
    IconNameDirective: class IconNameDirective {},
    MenuComponent: class MenuComponent {},
    MenuItemComponent: class MenuItemComponent {},
    ToggleButtonComponent: class ToggleButtonComponent {},
    ToolbarComponent: class ToolbarComponent {},
    TooltipDirective: class TooltipDirective {},
}));

describe('PageToolbarComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('changes the primary label in compact mode while retaining its accessible name', () => {
        const { compact, primary, primaryLabel, render } = createToolbar({ compactPrimaryLabel: 'New' });
        const shortLabel = primary.querySelector('[slot="label"]')?.textContent;
        const accessibleLabel = primary.getAttribute('aria-label');

        compact.set(false);
        render();

        expect(shortLabel).toBe('New');
        expect(accessibleLabel).toBe('Create project');
        expect(primary.querySelector('[slot="label"]')).toBeNull();
        expect(primary.hasAttribute('aria-label')).toBe(false);
        expect(primaryLabel()).toBe('Create project');
    });

    it('preserves the accessible label authored by the host and updates the short label when the language changes', () => {
        const translation = signal('New');
        const { primary, render } = createToolbar({ compactPrimaryLabel: translation }, 'Start a new project');

        translation.set('Neu');
        render();

        expect(primary.querySelector('[slot="label"]')?.textContent).toBe('Neu');
        expect(primary.getAttribute('aria-label')).toBe('Start a new project');
    });

    it('resolves live overflow labels and gives explicit inputs precedence', () => {
        const translation = signal('More actions');
        const { component, moreActionsLabel } = createToolbar({ moreActionsLabel: translation });

        translation.set('Weitere Aktionen');
        const localized = component.moreActionsLabel();
        moreActionsLabel.set('List actions');

        expect(localized).toBe('Weitere Aktionen');
        expect(component.moreActionsLabel()).toBe('List actions');
    });

    it('activates the original enabled action and ignores disabled or removed actions', () => {
        const { component, primary, secondary, secondaryDisabled, removeSecondary, render } = createToolbar();
        const click = vi.fn();
        secondary.addEventListener('click', click);
        const invoke = vi.fn();
        const menu = { invoke } as unknown as DropDownButtonComponent;
        const access = component as unknown as {
            activate(element: HTMLElement, menu: DropDownButtonComponent): void;
            overflowActions(): ReadonlyArray<{ readonly testId: string | null; readonly disabled: boolean }>;
        };
        expect(access.overflowActions()).toEqual([expect.objectContaining({ testId: 'project-export-menu-item', disabled: false })]);
        expect(primary.style.display).not.toBe('none');

        access.activate(secondary, menu);
        secondaryDisabled.set(true);
        expect(access.overflowActions()[0]?.disabled).toBe(true);
        access.activate(secondary, menu);
        removeSecondary();
        render();
        access.activate(secondary, menu);

        expect(click).toHaveBeenCalledTimes(1);
        expect(invoke).toHaveBeenCalledExactlyOnceWith('close');
        expect(access.overflowActions()).toEqual([]);
    });
});

function createToolbar(defaults: IPageToolbarDefaults = {}, accessibleLabel?: string) {
    TestBed.configureTestingModule({ providers: [providePageToolbarDefaults(defaults)] });
    let nextFrame = 0;
    const frames = new Map<number, FrameRequestCallback>();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        const frame = ++nextFrame;
        frames.set(frame, callback);
        return frame;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((frame) => {
        frames.delete(frame);
    });
    const toolbar = document.createElement('mosaik-toolbar');
    const more = document.createElement('mosaik-dropdown-button');
    const primary = document.createElement('mosaik-button');
    primary.slot = 'start';
    if (accessibleLabel) {
        primary.setAttribute('aria-label', accessibleLabel);
    }
    const secondary = document.createElement('mosaik-button');
    secondary.slot = 'start';
    secondary.setAttribute('test-id', 'project-export');
    toolbar.append(primary, secondary, more);

    const primaryLabel = signal('Create project');
    const secondaryDisabled = signal(false);
    const primaryButton = { elementRef: new ElementRef(primary), label: primaryLabel, variant: signal('primary') };
    const secondaryButton = {
        elementRef: new ElementRef(secondary),
        label: signal('Export project'),
        variant: signal('secondary'),
        disabled: secondaryDisabled,
        isBusy: signal(false),
    };
    const buttons = signal([primaryButton, secondaryButton]);
    const compact = signal(true);
    const moreActionsLabel = signal<string | undefined>(undefined);
    const component = TestBed.runInInjectionContext(() => new PageToolbarComponent());
    Object.assign(component, {
        compact,
        _toolbar: signal(new ElementRef(toolbar)),
        _more: signal(new ElementRef(more)),
        _moreActionsLabel: moreActionsLabel,
        _buttons: buttons,
        _toggles: signal([]),
        _dividers: signal([]),
        _commands: signal([]),
        _commandElements: signal([]),
        _tooltips: signal([]),
        _tooltipElements: signal([]),
    });
    const render = (): void => {
        TestBed.tick();
        for (const [frame, callback] of Array.from(frames)) {
            if (frames.delete(frame)) {
                callback(0);
            }
        }
    };
    render();

    return {
        component,
        compact,
        moreActionsLabel,
        primary,
        primaryLabel,
        secondary,
        secondaryDisabled,
        render,
        removeSecondary: (): void => {
            secondary.remove();
            buttons.set([primaryButton]);
        },
    };
}
