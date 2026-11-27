// #region Imports

import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ElementRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollToErrorDirective } from './ScrollToErrorDirective';
import { ScrollToErrorRegistry, type ScrollToErrorState } from './ScrollToErrorRegistry';
import { ScrollToErrorTriggerDirective } from './ScrollToErrorTriggerDirective';

// #endregion

describe('ScrollToErrorDirective', () => {
    const invalidState: ScrollToErrorState = { invalid: signal(true) };
    const validState: ScrollToErrorState = { invalid: signal(false) };
    let container: HTMLElement;
    let control: HTMLElement;
    let directive: ScrollToErrorDirective;
    let form: HTMLFormElement;
    let registry: ScrollToErrorRegistry;
    let scrollDispatcher: {
        getAncestorScrollContainers: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
        container = document.createElement('section');
        form = document.createElement('form');
        control = document.createElement('input');
        control.classList.add('ng-invalid');

        Object.defineProperty(container, 'getBoundingClientRect', {
            value: () => new DOMRect(0, 0, 600, 600),
        });
        Object.defineProperty(container, 'scrollTo', {
            value: vi.fn(),
        });
        Object.defineProperty(control, 'getClientRects', {
            value: () => [new DOMRect(0, 900, 300, 40)],
        });
        Object.defineProperty(control, 'getBoundingClientRect', {
            value: () => new DOMRect(0, 900, 300, 40),
        });
        Object.defineProperty(control, 'focus', {
            value: vi.fn(),
        });

        form.append(control);
        container.append(form);
        document.body.append(container);

        scrollDispatcher = {
            getAncestorScrollContainers: vi.fn(() => [
                {
                    getElementRef: () => new ElementRef(container),
                },
            ]),
        };
        registry = new ScrollToErrorRegistry();

        TestBed.configureTestingModule({
            providers: [
                ScrollToErrorDirective,
                ScrollToErrorRegistry,
                {
                    provide: ElementRef,
                    useValue: new ElementRef(form),
                },
                {
                    provide: ScrollDispatcher,
                    useValue: scrollDispatcher,
                },
                {
                    provide: ScrollToErrorRegistry,
                    useValue: registry,
                },
            ],
        });

        directive = TestBed.inject(ScrollToErrorDirective);
        setState(directive, invalidState);
        directive.ngOnInit();
    });

    afterEach(() => {
        directive.ngOnDestroy();
        container.remove();
        TestBed.resetTestingModule();
    });

    it('should use the registered ancestor scroll container and focus after smooth scrolling', async () => {
        directive.revealFirstInvalidControl();

        expect(scrollDispatcher.getAncestorScrollContainers).toHaveBeenCalledWith(expect.any(ElementRef));
        expect(container.scrollTo).toHaveBeenCalledWith({
            top: 884,
            left: 0,
            behavior: 'smooth',
        });
        expect(control.focus).not.toHaveBeenCalled();

        container.dispatchEvent(new Event('scroll'));
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));

        expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should resolve the validation scope from a trigger outside the form', () => {
        const button = document.createElement('button');
        container.after(button);
        const trigger = TestBed.runInInjectionContext(() => new ScrollToErrorTriggerDirective(registry));
        setTriggerState(trigger, invalidState);

        trigger.onClick();
        TestBed.tick();

        expect(container.scrollTo).toHaveBeenCalledWith({
            top: 884,
            left: 0,
            behavior: 'smooth',
        });

        button.remove();
    });

    it('should request error navigation for repeated trigger clicks', () => {
        // arrange
        const trigger = TestBed.runInInjectionContext(() => new ScrollToErrorTriggerDirective(registry));
        const reveal = vi.spyOn(registry, 'reveal');
        setTriggerState(trigger, invalidState);

        // act
        trigger.onClick();
        TestBed.tick();
        trigger.onClick();
        TestBed.tick();

        // assert
        expect(reveal).toHaveBeenCalledTimes(2);
        expect(reveal).toHaveBeenNthCalledWith(1, invalidState);
        expect(reveal).toHaveBeenNthCalledWith(2, invalidState);
    });

    it('should not scroll or focus a valid validation scope', () => {
        directive.ngOnDestroy();
        setState(directive, validState);
        directive.ngOnInit();
        control.classList.remove('ng-invalid');

        directive.revealFirstInvalidControl();

        expect(container.scrollTo).not.toHaveBeenCalled();
        expect(control.focus).not.toHaveBeenCalled();
    });

    it('should reveal an invalid dynamic control when the root signal form is valid', () => {
        directive.ngOnDestroy();
        setState(directive, validState);
        directive.ngOnInit();

        directive.revealFirstInvalidControl();

        expect(container.scrollTo).toHaveBeenCalledOnce();
    });

    it('should focus the invalid control nested inside an invalid field wrapper', async () => {
        // arrange
        const wrapper = document.createElement('mosaik-form-field');
        wrapper.setAttribute('error', 'Enter a valid email address.');
        control.classList.remove('ng-invalid');
        Object.defineProperty(wrapper, 'getClientRects', {
            value: () => [new DOMRect(0, 880, 320, 80)],
        });
        Object.defineProperty(wrapper, 'focus', {
            value: vi.fn(),
        });
        const focusHost = document.createElement('div');
        focusHost.tabIndex = 0;
        Object.defineProperty(focusHost, 'getClientRects', {
            value: () => [new DOMRect(0, 900, 300, 40)],
        });
        focusHost.attachShadow({ mode: 'open' }).append(control);
        wrapper.append(focusHost);
        form.append(wrapper);

        // act
        directive.revealFirstInvalidControl();
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));

        // assert
        expect(wrapper.focus).not.toHaveBeenCalled();
        expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should reveal a control inside an open shadow root on the validation scope', async () => {
        const host = document.createElement('div');
        control.classList.remove('ng-invalid');
        Object.defineProperty(control, 'invalid', { value: true });
        host.attachShadow({ mode: 'open' }).append(control);
        form.replaceWith(host);
        directive.ngOnDestroy();
        directive = TestBed.runInInjectionContext(() => new ScrollToErrorDirective(new ElementRef(host)));
        setState(directive, invalidState);
        directive.ngOnInit();

        directive.revealFirstInvalidControl();

        expect(container.scrollTo).toHaveBeenCalledWith({ top: 884, left: 0, behavior: 'smooth' });
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));
        expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should choose the first deepest invalid control across nested open shadow roots', async () => {
        const firstHost = document.createElement('div');
        firstHost.setAttribute('aria-invalid', 'true');
        makeVisible(firstHost, 700);
        const nestedHost = document.createElement('div');
        nestedHost.attachShadow({ mode: 'open' }).append(control);
        firstHost.attachShadow({ mode: 'open' }).append(nestedHost);
        const laterControl = document.createElement('input');
        laterControl.setAttribute('aria-invalid', 'true');
        makeVisible(laterControl, 1100);
        const laterHost = document.createElement('div');
        laterHost.attachShadow({ mode: 'open' }).append(laterControl);
        form.append(firstHost, laterHost);

        directive.revealFirstInvalidControl();

        expect(container.scrollTo).toHaveBeenCalledWith({ top: 884, left: 0, behavior: 'smooth' });
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));
        expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
        expect(firstHost.focus).not.toHaveBeenCalled();
        expect(laterControl.focus).not.toHaveBeenCalled();
    });

    it('should focus a native descendant behind non-focusable shadow hosts of an invalid wrapper', async () => {
        const wrapper = document.createElement('div');
        wrapper.setAttribute('aria-invalid', 'true');
        makeVisible(wrapper, 700);
        const nestedHost = document.createElement('div');
        control.classList.remove('ng-invalid');
        nestedHost.attachShadow({ mode: 'open' }).append(control);
        wrapper.attachShadow({ mode: 'open' }).append(nestedHost);
        form.append(wrapper);

        directive.revealFirstInvalidControl();

        expect(container.scrollTo).toHaveBeenCalledWith({ top: 884, left: 0, behavior: 'smooth' });
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));
        expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
        expect(wrapper.focus).not.toHaveBeenCalled();
    });

    it('should scroll the nearest composed ancestor of a slotted invalid control', () => {
        const host = document.createElement('div');
        const shadow = host.attachShadow({ mode: 'open' });
        const innerContainer = document.createElement('section');
        innerContainer.style.overflowY = 'auto';
        Object.defineProperties(innerContainer, {
            scrollHeight: { value: 1000 },
            clientHeight: { value: 400 },
            getBoundingClientRect: { value: () => new DOMRect(0, 0, 600, 400) },
            scrollTo: { value: vi.fn() },
        });
        innerContainer.append(document.createElement('slot'));
        shadow.append(innerContainer);
        host.append(control);
        form.append(host);

        directive.revealFirstInvalidControl();

        expect(innerContainer.scrollTo).toHaveBeenCalledWith({ top: 884, left: 0, behavior: 'smooth' });
        expect(container.scrollTo).not.toHaveBeenCalled();
    });

    it('should keep invalid discovery inside its own scope when unrelated shadow roots contain errors', () => {
        const unrelatedHost = document.createElement('div');
        const unrelatedControl = document.createElement('input');
        unrelatedControl.setAttribute('aria-invalid', 'true');
        makeVisible(unrelatedControl, 900);
        unrelatedHost.attachShadow({ mode: 'open' }).append(unrelatedControl);
        container.before(unrelatedHost);
        control.classList.remove('ng-invalid');

        try {
            directive.revealFirstInvalidControl();

            expect(container.scrollTo).not.toHaveBeenCalled();
            expect(control.focus).not.toHaveBeenCalled();
            expect(unrelatedControl.focus).not.toHaveBeenCalled();
        } finally {
            unrelatedHost.remove();
        }
    });

    it('should not focus a shadow control disconnected while its reveal scroll is pending', async () => {
        const host = document.createElement('div');
        host.attachShadow({ mode: 'open' }).append(control);
        form.append(host);

        directive.revealFirstInvalidControl();
        control.remove();
        container.dispatchEvent(new Event('scrollend'));
        await new Promise((resolve) => setTimeout(resolve, 110));

        expect(container.scrollTo).toHaveBeenCalledOnce();
        expect(control.focus).not.toHaveBeenCalled();
    });

    it('should fall back to the nearest native overflow container', () => {
        scrollDispatcher.getAncestorScrollContainers.mockReturnValue([]);
        form.style.overflowY = 'auto';
        Object.defineProperty(form, 'scrollHeight', { value: 1000 });
        Object.defineProperty(form, 'clientHeight', { value: 400 });
        Object.defineProperty(form, 'getBoundingClientRect', {
            value: () => new DOMRect(0, 0, 600, 400),
        });
        Object.defineProperty(form, 'scrollTo', {
            value: vi.fn(),
        });

        directive.revealFirstInvalidControl();

        expect(form.scrollTo).toHaveBeenCalledWith({
            top: 884,
            left: 0,
            behavior: 'smooth',
        });
        expect(container.scrollTo).not.toHaveBeenCalled();
    });

    it('should smoothly reveal and then focus an invalid control in the viewport', async () => {
        scrollDispatcher.getAncestorScrollContainers.mockReturnValue([]);
        const documentElement = document.documentElement;
        const originalOverflowY = documentElement.style.overflowY;
        const originalScrollHeight = Object.getOwnPropertyDescriptor(documentElement, 'scrollHeight');
        const originalClientHeight = Object.getOwnPropertyDescriptor(documentElement, 'clientHeight');
        const originalScrollTo = Object.getOwnPropertyDescriptor(documentElement, 'scrollTo');
        const documentScrollTo = vi.fn();
        documentElement.style.overflowY = 'auto';
        Object.defineProperty(documentElement, 'scrollHeight', {
            configurable: true,
            value: 2000,
        });
        Object.defineProperty(documentElement, 'clientHeight', {
            configurable: true,
            value: 600,
        });
        Object.defineProperty(documentElement, 'scrollTo', {
            configurable: true,
            value: documentScrollTo,
        });
        Object.defineProperty(control, 'scrollIntoView', {
            value: vi.fn(),
        });

        try {
            directive.revealFirstInvalidControl();

            expect(documentScrollTo).not.toHaveBeenCalled();
            expect(control.scrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
            });
            expect(control.focus).not.toHaveBeenCalled();

            window.dispatchEvent(new Event('scroll'));
            window.dispatchEvent(new Event('scrollend'));
            await new Promise((resolve) => setTimeout(resolve, 110));

            expect(control.focus).toHaveBeenCalledWith({ preventScroll: true });
        } finally {
            documentElement.style.overflowY = originalOverflowY;
            restoreOwnProperty(documentElement, 'scrollHeight', originalScrollHeight);
            restoreOwnProperty(documentElement, 'clientHeight', originalClientHeight);
            restoreOwnProperty(documentElement, 'scrollTo', originalScrollTo);
        }
    });
});

function setState(directive: ScrollToErrorDirective, state: ScrollToErrorState): void {
    Object.defineProperty(directive, 'state', {
        configurable: true,
        value: () => state,
    });
}

function makeVisible(element: HTMLElement, top: number): void {
    Object.defineProperties(element, {
        getClientRects: { value: () => [new DOMRect(0, top, 300, 40)] },
        getBoundingClientRect: { value: () => new DOMRect(0, top, 300, 40) },
        focus: { value: vi.fn() },
    });
}

function setTriggerState(directive: ScrollToErrorTriggerDirective, state: ScrollToErrorState): void {
    Object.defineProperty(directive, 'state', {
        configurable: true,
        value: () => state,
    });
}

function restoreOwnProperty(target: object, propertyKey: PropertyKey, descriptor: PropertyDescriptor | undefined): void {
    if (descriptor) {
        Object.defineProperty(target, propertyKey, descriptor);

        return;
    }

    Reflect.deleteProperty(target, propertyKey);
}
