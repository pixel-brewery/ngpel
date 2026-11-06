// #region Imports

import { Directive, input } from '@angular/core';
import type { StopEventPropagationEventName } from './StopEventPropagationEventName';
import { toStopEventPropagationEvents } from './toStopEventPropagationEvents';

// #endregion

/**
 * Stops the propagation of pointer, mouse and keyboard events at the host element, so nested
 * interactive controls (a delete button inside a clickable row, for instance) do not trigger the
 * surrounding handlers.
 *
 * The directive intercepts `click`, `dblclick`, `mousedown`, `mouseup`, `pointerdown`,
 * `pointerup`, `keydown` and `keyup`. The list can be narrowed through the main input, and
 * keyboard events can additionally be filtered by key name through `ngpStopEventPropagationKeys`.
 *
 * @example
 * ```html
 * <!-- Stop every supported event -->
 * <button ngpStopEventPropagation>Delete</button>
 *
 * <!-- Only clicks and Enter/Space activations -->
 * <button [ngpStopEventPropagation]="['click', 'keydown']" [ngpStopEventPropagationKeys]="['enter', 'space']">Delete</button>
 * ```
 *
 * @public
 */
@Directive({
    selector: '[ngpStopEventPropagation]',
    exportAs: 'ngpStopEventPropagation',
    host: {
        '(click)': 'onEvent($event)',
        '(dblclick)': 'onEvent($event)',
        '(mousedown)': 'onEvent($event)',
        '(mouseup)': 'onEvent($event)',
        '(pointerdown)': 'onEvent($event)',
        '(pointerup)': 'onEvent($event)',
        '(keydown)': 'onEvent($event)',
        '(keyup)': 'onEvent($event)',
    },
})
export class StopEventPropagationDirective {
    // #region Properties

    /**
     * `true` (the default and the value of the bare attribute) stops every supported event, `false`
     * disables the directive and an array restricts the interception to the listed events.
     *
     * @public
     * @readonly
     */
    public readonly events = input<boolean | ReadonlyArray<StopEventPropagationEventName>, '' | boolean | ReadonlyArray<StopEventPropagationEventName>>(true, {
        alias: 'ngpStopEventPropagation',
        transform: toStopEventPropagationEvents,
    });

    /**
     * Optional key filter for `keydown`/`keyup`: only keyboard events whose `key` matches one of the
     * listed names (case-insensitive, `'space'` matches the space bar) are stopped. `null` stops
     * every key.
     *
     * @public
     * @readonly
     */
    public readonly keys = input<ReadonlyArray<string> | null>(null, { alias: 'ngpStopEventPropagationKeys' });

    // #endregion

    // #region Methods

    /**
     * Stops the event when it matches the configured events and keys.
     *
     * @protected
     * @param event The intercepted host event.
     */
    protected onEvent(event: Event): void {
        const events = this.events();
        if (events === false) {
            return;
        }

        if (Array.isArray(events) && !events.some((name) => name === event.type)) {
            return;
        }

        if (!this.matchesKeyFilter(event)) {
            return;
        }

        event.stopPropagation();
    }

    private matchesKeyFilter(event: Event): boolean {
        const keys = this.keys();
        if (keys === null || !(event instanceof KeyboardEvent)) {
            return true;
        }

        const key = normalizeKey(event.key);

        return keys.some((candidate) => normalizeKey(candidate) === key);
    }

    // #endregion
}

function normalizeKey(key: string): string {
    const normalized = key.toLowerCase();

    return normalized === ' ' ? 'space' : normalized;
}
