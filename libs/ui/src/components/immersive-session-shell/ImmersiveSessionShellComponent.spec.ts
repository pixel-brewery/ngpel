// #region Imports

import { ElementRef, signal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ImmersiveSessionShellComponent } from './ImmersiveSessionShellComponent';
import type { ImmersiveSessionPhase } from './ImmersiveSessionPhase';
import type { ImmersiveSessionRailState } from './ImmersiveSessionRailState';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    BackdropComponent: class BackdropComponent {},
}));

interface IImmersiveSessionShellComponentTestApi {
    readonly railWidthStyle: Signal<string>;
    readonly effectiveRailState: Signal<ImmersiveSessionRailState>;
    readonly railVisible: Signal<boolean>;
    readonly railAttached: Signal<boolean>;
    readonly preflightVisible: Signal<boolean>;
    readonly idleDetectionEnabled: Signal<boolean>;
    readonly orbPreflightTransform: Signal<string | null>;

    requestOverlayDismissal(event?: Event): void;
    measureOrbAnchor(anchor: HTMLElement, stage: HTMLElement, orb: HTMLElement): void;
}

describe('ImmersiveSessionShellComponent', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
        vi.restoreAllMocks();
    });

    it('should expose business-agnostic layout defaults', () => {
        const component = createComponent();

        expect(component.railOpen()).toBe(true);
        expect(component.railState()).toBeUndefined();
        expect(component.railAriaLabel()).toBeNull();
        expect(component.railWidth()).toBe(384);
        expect(component.modal()).toBe(false);
        expect(component.overlayOpen()).toBe(false);
        expect(component.phase()).toBe('live');
        expect(component.idleEnabled()).toBe(false);
        expect(() => component.ariaLabel()).toThrow();
    });

    it('should normalize numeric rail widths as CSS pixels', () => {
        const component = createComponent();
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        Object.defineProperty(component, 'railWidth', { value: signal(420) });

        expect(api.railWidthStyle()).toBe('420px');
    });

    it('should preserve consumer-provided CSS rail widths', () => {
        const component = createComponent();
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        Object.defineProperty(component, 'railWidth', { value: signal('min(30rem, 40vw)') });

        expect(api.railWidthStyle()).toBe('min(30rem, 40vw)');
    });

    it('keeps an explicitly controlled rail attached while hiding it when closed', () => {
        // Arrange
        const component = createComponent();
        const state = signal<ImmersiveSessionRailState>('preview');
        Object.defineProperty(component, 'railState', { value: state });
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        expect(api.railVisible()).toBe(true);

        // Act
        state.set('closed');

        // Assert
        expect(api.effectiveRailState()).toBe('closed');
        expect(api.railVisible()).toBe(false);
        expect(api.railAttached()).toBe(true);
    });

    it('continues detaching the rail when controlled through the original boolean input', () => {
        // Arrange
        const component = createComponent();
        const open = signal(true);
        Object.defineProperty(component, 'railOpen', { value: open });
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;

        // Act
        open.set(false);

        // Assert
        expect(api.effectiveRailState()).toBe('closed');
        expect(api.railAttached()).toBe(false);
    });

    it('requests dismissal and consumes Escape while the overlay is open', () => {
        // Arrange
        const component = createComponent();
        const dismissed = vi.fn();
        component.overlayDismissed.subscribe(dismissed);
        Object.defineProperty(component, 'overlayOpen', { value: signal(true) });
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        const escape = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });

        // Act
        api.requestOverlayDismissal(escape);

        // Assert
        expect(dismissed).toHaveBeenCalledOnce();
        expect(escape.defaultPrevented).toBe(true);
        expect(component.overlayOpen()).toBe(true);
    });

    it('keeps preparation content and suppresses the live rail before the session', () => {
        // Arrange
        const component = createComponent();
        const phase = signal<ImmersiveSessionPhase>('live');
        Object.defineProperty(component, 'phase', { value: phase });
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;

        // Act
        phase.set('preflight');

        // Assert
        expect(api.preflightVisible()).toBe(true);
        expect(api.railVisible()).toBe(false);
        expect(api.railAttached()).toBe(true);
    });

    it('disables idle detection while a live overlay owns focus', () => {
        // Arrange
        const component = createComponent();
        const overlay = signal(false);
        Object.defineProperty(component, 'overlayOpen', { value: overlay });
        Object.defineProperty(component, 'idleEnabled', { value: signal(true) });
        const api = component as unknown as IImmersiveSessionShellComponentTestApi;
        expect(api.idleDetectionEnabled()).toBe(true);

        // Act
        overlay.set(true);

        // Assert
        expect(api.idleDetectionEnabled()).toBe(false);
    });

    it('aligns one orb with the nested preflight anchor in the stage coordinate space', () => {
        // Arrange
        const api = createComponent() as unknown as IImmersiveSessionShellComponentTestApi;
        const stage = document.createElement('main');
        const details = elementWithOffsets(stage, 340, 0, 760);
        const anchor = elementWithOffsets(details, 0, 70, 114);
        const orb = elementWithOffsets(stage, 549, 138, 342);

        // Act
        api.measureOrbAnchor(anchor, stage, orb);

        // Assert
        expect(api.orbPreflightTransform()).toBe('translate(-323.0px, -182.0px) scale(0.3333)');
    });

    it('clears a measured transform when the anchor has left the stage layout', () => {
        // Arrange
        const api = createComponent() as unknown as IImmersiveSessionShellComponentTestApi;
        const stage = document.createElement('main');
        const anchor = elementWithOffsets(stage, 340, 70, 114);
        const orb = elementWithOffsets(stage, 549, 138, 342);
        api.measureOrbAnchor(anchor, stage, orb);
        const detachedAnchor = elementWithOffsets(null, 340, 70, 114);

        // Act
        api.measureOrbAnchor(detachedAnchor, stage, orb);

        // Assert
        expect(api.orbPreflightTransform()).toBeNull();
    });

    it('releases the application modal layer when the shell stops being modal', () => {
        // Arrange
        const host = document.createElement('ngp-immersive-session-shell');
        const closeLayer = vi.fn();
        const register = vi.fn(() => closeLayer);
        const modal = signal(true);
        const component = createComponent(host);
        Object.assign(component, { modal, registerModalLayer: signal(register) });
        TestBed.tick();
        expect(register).toHaveBeenCalledExactlyOnceWith(host);

        // Act
        modal.set(false);
        TestBed.tick();

        // Assert
        expect(closeLayer).toHaveBeenCalledOnce();
    });
});

function createComponent(host = document.createElement('ngp-immersive-session-shell')): ImmersiveSessionShellComponent {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [{ provide: ElementRef, useValue: new ElementRef(host) }] });

    return TestBed.runInInjectionContext(() => new ImmersiveSessionShellComponent());
}

function elementWithOffsets(parent: HTMLElement | null, left: number, top: number, size: number): HTMLElement {
    const element = document.createElement('div');
    Object.defineProperties(element, {
        offsetParent: { value: parent },
        offsetLeft: { value: left },
        offsetTop: { value: top },
        offsetWidth: { value: size },
        offsetHeight: { value: size },
    });
    return element;
}
