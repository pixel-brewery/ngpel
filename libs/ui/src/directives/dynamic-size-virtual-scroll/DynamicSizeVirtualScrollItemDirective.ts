// #region Imports

import { Directive, input } from '@angular/core';

// #endregion

/**
 * Marks one rendered item so the dynamic virtual-scroll strategy can measure it by stable key.
 *
 * @public
 */
@Directive({
    selector: '[ngpDynamicSizeVirtualScrollItem]',
    host: {
        '[attr.data-ngp-virtual-scroll-index]': 'index()',
        '[attr.data-ngp-virtual-scroll-key]': 'key()',
    },
})
export class DynamicSizeVirtualScrollItemDirective {
    // #region Fields

    /**
     * Stable identity of the rendered item.
     *
     * @public
     * @readonly
     */
    public readonly key = input.required<string>({
        alias: 'ngpDynamicSizeVirtualScrollItem',
    });

    /**
     * Logical item index in the complete data source.
     *
     * @public
     * @readonly
     */
    public readonly index = input.required<number>({
        alias: 'ngpDynamicSizeVirtualScrollIndex',
    });

    // #endregion
}
