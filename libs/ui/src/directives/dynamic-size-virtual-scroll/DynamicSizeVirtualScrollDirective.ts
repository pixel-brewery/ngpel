// #region Imports

import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, effect, forwardRef, input } from '@angular/core';
import { DynamicSizeVirtualScrollStrategy } from './DynamicSizeVirtualScrollStrategy';

// #endregion

/**
 * Provides dynamic-size virtualization to a CDK viewport.
 *
 * @public
 */
@Directive({
    selector: 'cdk-virtual-scroll-viewport[ngpDynamicSizeVirtualScroll]',
    providers: [
        {
            provide: VIRTUAL_SCROLL_STRATEGY,
            useExisting: forwardRef(() => DynamicSizeVirtualScrollDirective),
        },
    ],
})
export class DynamicSizeVirtualScrollDirective extends DynamicSizeVirtualScrollStrategy {
    // #region Fields

    /**
     * Stable item keys in the same order as the viewport data.
     *
     * @public
     * @readonly
     */
    public readonly keys = input.required<ReadonlyArray<string>>({
        alias: 'ngpDynamicSizeVirtualScroll',
    });

    /**
     * Initial block size used until an item has been measured.
     *
     * @public
     * @readonly
     */
    public readonly estimatedItemSize = input(240, {
        alias: 'ngpDynamicSizeVirtualScrollEstimatedItemSize',
    });

    /**
     * Overscan in pixels rendered before and after the visible viewport.
     *
     * @public
     * @readonly
     */
    public readonly bufferSize = input(720, {
        alias: 'ngpDynamicSizeVirtualScrollBufferSize',
    });

    // #endregion

    // #region Ctor

    /**
     * Constructs the strategy provider and synchronizes its signal inputs.
     *
     * @public
     */
    public constructor() {
        super();
        effect(() => this.update(this.keys(), this.estimatedItemSize(), this.bufferSize()));
    }

    // #endregion
}
