// #region Imports

import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { afterNextRender, DestroyRef, Directive, ElementRef, HostListener, inject, Injector, input, type OnDestroy, type OnInit } from '@angular/core';
import { debounceTime, fromEvent, race, take, timer } from 'rxjs';
import { type IScrollToErrorTarget, ScrollToErrorRegistry, type ScrollToErrorState } from './ScrollToErrorRegistry';

// #endregion

interface IInvalidControlElement extends HTMLElement {
    readonly invalid: boolean;
}

interface IScrollContainer {
    readonly element: HTMLElement;

    scrollTo(options: ScrollToOptions): void;
}

/**
 * Defines a generic validation scope and reveals its first visible invalid control.
 *
 * Apply the directive to a form or any container that owns the relevant controls. Triggers outside
 * the scope can associate with it through `{@link ScrollToErrorTriggerDirective}` by binding the
 * same root Signal Forms state.
 *
 * @public
 */
@Directive({
    selector: '[ngpScrollToError]',
})
export class ScrollToErrorDirective implements IScrollToErrorTarget, OnDestroy, OnInit {
    // #region Fields

    private readonly _destroyRef: DestroyRef;
    private readonly _elementRef: ElementRef<HTMLElement>;
    private readonly _injector: Injector;
    private readonly _registry: ScrollToErrorRegistry;
    private readonly _scrollDispatcher: ScrollDispatcher;
    private _registeredState?: ScrollToErrorState;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link ScrollToErrorDirective}` class.
     *
     * @param elementRef - Element that scopes invalid-control discovery.
     * @param scrollDispatcher - Dispatcher used to discover registered CDK scroll containers.
     * @param registry - Registry used by triggers outside the validation scope.
     * @param injector - Injector used to schedule post-render work.
     * @param destroyRef - Lifecycle used to dispose one-shot scroll listeners.
     * @public
     */
    public constructor(
        elementRef: ElementRef<HTMLElement> = inject(ElementRef),
        scrollDispatcher: ScrollDispatcher = inject(ScrollDispatcher),
        registry: ScrollToErrorRegistry = inject(ScrollToErrorRegistry),
        injector: Injector = inject(Injector),
        destroyRef: DestroyRef = inject(DestroyRef),
    ) {
        this._destroyRef = destroyRef;
        this._elementRef = elementRef;
        this._injector = injector;
        this._registry = registry;
        this._scrollDispatcher = scrollDispatcher;
    }

    // #endregion

    // #region Properties

    /**
     * Root Signal Forms state associated with this validation scope.
     *
     * @public
     * @readonly
     */
    public readonly state = input.required<ScrollToErrorState>({ alias: 'ngpScrollToError' });

    // #endregion

    // #region Methods

    /**
     * Registers the validation scope after Angular has initialized its required input.
     *
     * @public
     */
    public ngOnInit(): void {
        this._registeredState = this.state();
        this._registry.register(this._registeredState, this);
    }

    /**
     * Removes the validation scope from the cross-DOM trigger registry.
     *
     * @public
     */
    public ngOnDestroy(): void {
        if (this._registeredState) {
            this._registry.unregister(this._registeredState, this);
        }
    }

    /**
     * Supports native form submission when no separate trigger is needed.
     *
     * @public
     */
    @HostListener('submit')
    public onSubmit(): void {
        afterNextRender(() => this.revealFirstInvalidControl(), {
            injector: this._injector,
        });
    }

    /**
     * Reveals and focuses the first visible invalid control in this scope.
     *
     * @public
     */
    public revealFirstInvalidControl(): void {
        const invalidControl = this.findFirstInvalidControl();
        if (!invalidControl) {
            return;
        }

        const scrollContainer = this.findScrollContainer(invalidControl);
        if (!scrollContainer) {
            this.revealInViewport(invalidControl);

            return;
        }

        this.revealInContainer(invalidControl, scrollContainer);
    }

    private findFirstInvalidControl(): HTMLElement | undefined {
        const invalidElements = Array.from(this._elementRef.nativeElement.querySelectorAll<HTMLElement>('*')).filter(
            (element) => this.isVisible(element) && this.isInvalid(element),
        );

        const invalidElement = invalidElements.find((element) => !invalidElements.some((candidate) => candidate !== element && element.contains(candidate)));

        return invalidElement ? (this.findFocusableDescendant(invalidElement) ?? invalidElement) : undefined;
    }

    private findFocusableDescendant(element: HTMLElement): HTMLElement | undefined {
        return Array.from(element.querySelectorAll<HTMLElement>('*')).find((candidate) => this.isVisible(candidate) && candidate.tabIndex >= 0);
    }

    private findScrollContainer(invalidControl: HTMLElement): IScrollContainer | undefined {
        const registeredElements = new Set(
            this._scrollDispatcher.getAncestorScrollContainers(this._elementRef).map((scrollable) => scrollable.getElementRef().nativeElement),
        );

        let candidate: HTMLElement | null = invalidControl.parentElement;
        while (candidate) {
            if (registeredElements.has(candidate) || this.isNativeScrollContainer(candidate)) {
                const element = candidate;

                return {
                    element,
                    scrollTo: (options) => element.scrollTo(options),
                };
            }
            candidate = candidate.parentElement;
        }

        return undefined;
    }

    private focus(control: HTMLElement): void {
        const focusTarget = this.resolveFocusTarget(control);
        if (focusTarget.isConnected) {
            focusTarget.focus({ preventScroll: true });
        }
    }

    private focusAfterScroll(scrollTarget: EventTarget, control: HTMLElement): void {
        const scrollFinished =
            'onscrollend' in scrollTarget
                ? fromEvent(scrollTarget, 'scrollend').pipe(take(1))
                : fromEvent(scrollTarget, 'scroll').pipe(debounceTime(100), take(1));

        race(scrollFinished, timer(1500))
            .pipe(take(1), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.focus(control));
    }

    private isFullyVisible(control: HTMLElement, container: HTMLElement): boolean {
        const controlRect = control.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const gutter = 16;

        return controlRect.top >= containerRect.top + gutter && controlRect.bottom <= containerRect.bottom - gutter;
    }

    private isInvalid(element: HTMLElement): element is IInvalidControlElement {
        return (
            element.classList.contains('ng-invalid') ||
            element.getAttribute('aria-invalid') === 'true' ||
            (element.tagName === 'MOSAIK-FORM-FIELD' && Boolean(element.getAttribute('error')?.trim())) ||
            ('invalid' in element && element.invalid === true)
        );
    }

    private isNativeScrollContainer(element: HTMLElement): boolean {
        const ownerDocument = element.ownerDocument;
        if (element === ownerDocument.documentElement || element === ownerDocument.body || element === ownerDocument.scrollingElement) {
            return false;
        }

        const view = element.ownerDocument.defaultView;
        if (!view || element.scrollHeight <= element.clientHeight) {
            return false;
        }

        return /(auto|scroll|overlay)/u.test(view.getComputedStyle(element).overflowY);
    }

    private isVisible(element: HTMLElement): boolean {
        return element.getClientRects().length > 0;
    }

    private prefersReducedMotion(element: HTMLElement): boolean {
        return element.ownerDocument.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    }

    private resolveFocusTarget(element: HTMLElement): HTMLElement {
        let target = element;
        while (true) {
            const root: HTMLElement | ShadowRoot = target.shadowRoot ?? target;
            const descendant = Array.from(root.querySelectorAll<HTMLElement>('*')).find((candidate) => this.isVisible(candidate) && candidate.tabIndex >= 0);
            if (!descendant) {
                return target;
            }

            target = descendant;
        }
    }

    private revealInContainer(control: HTMLElement, container: IScrollContainer): void {
        if (this.isFullyVisible(control, container.element)) {
            this.focus(control);

            return;
        }

        const behavior: ScrollBehavior = this.prefersReducedMotion(control) ? 'auto' : 'smooth';
        const controlRect = control.getBoundingClientRect();
        const containerRect = container.element.getBoundingClientRect();
        const top = Math.max(controlRect.top - containerRect.top + container.element.scrollTop - 16, 0);

        if (behavior === 'smooth') {
            this.focusAfterScroll(container.element, control);
        }

        container.scrollTo({
            top,
            left: container.element.scrollLeft,
            behavior,
        });

        if (behavior === 'auto') {
            this.focus(control);
        }
    }

    private revealInViewport(control: HTMLElement): void {
        const behavior: ScrollBehavior = this.prefersReducedMotion(control) ? 'auto' : 'smooth';
        const view = control.ownerDocument.defaultView;

        if (behavior === 'smooth' && view) {
            this.focusAfterScroll(view, control);
        }
        control.scrollIntoView({
            behavior,
            block: 'center',
            inline: 'nearest',
        });
        if (behavior === 'auto' || !view) {
            this.focus(control);
        }
    }

    // #endregion
}
