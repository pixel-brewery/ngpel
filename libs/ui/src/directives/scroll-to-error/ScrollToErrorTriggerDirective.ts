// #region Imports

import { afterNextRender, Directive, HostListener, inject, Injector, input } from '@angular/core';
import { ScrollToErrorRegistry, type ScrollToErrorState } from './ScrollToErrorRegistry';

// #endregion

/**
 * Triggers error navigation for a validation scope associated through the same Signal Forms state.
 *
 * The trigger may live outside the validation scope, for example in a projected footer.
 *
 * @public
 */
@Directive({
    selector: '[ngpScrollToErrorTrigger]',
})
export class ScrollToErrorTriggerDirective {
    // #region Fields

    private readonly _injector: Injector;
    private readonly _registry: ScrollToErrorRegistry;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `{@link ScrollToErrorTriggerDirective}` class.
     *
     * @param registry - Registry that resolves the associated validation scope.
     * @param injector - Injector used to schedule post-render work.
     * @public
     */
    public constructor(registry: ScrollToErrorRegistry = inject(ScrollToErrorRegistry), injector: Injector = inject(Injector)) {
        this._injector = injector;
        this._registry = registry;
    }

    // #endregion

    // #region Properties

    /**
     * Root Signal Forms state shared with the target validation scope.
     *
     * @public
     * @readonly
     */
    public readonly state = input.required<ScrollToErrorState>({ alias: 'ngpScrollToErrorTrigger' });

    // #endregion

    // #region Methods

    /**
     * Requests error navigation after the action has run validation and Angular has rendered its result.
     *
     * @public
     */
    @HostListener('click')
    public onClick(): void {
        this.scheduleReveal();
    }

    private scheduleReveal(): void {
        afterNextRender(() => this._registry.reveal(this.state()), {
            injector: this._injector,
        });
    }

    // #endregion
}
