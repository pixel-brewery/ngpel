// #region Imports

import { type CreateEffectOptions, type EffectRef, effect, untracked } from '@angular/core';
import type { AsyncAwaitCommand } from './AsyncAwaitCommand';

// #endregion

/**
 * Invokes `handler` whenever `command` produces a new non-`null` result.
 *
 * @remarks
 * Creates an Angular `effect`, so it must be called inside an injection context (a constructor or a
 * provider factory) unless `options.injector` is supplied. The handler runs untracked; the returned
 * {@link EffectRef} stops the observation. Results that are strictly equal to the previous one are not
 * re-reported, because the underlying signal does not notify for equal values.
 *
 * @public
 * @typeParam R The result type of the command.
 * @param command The command whose results are observed.
 * @param handler Invoked with every new result.
 * @param options Optional effect options; pass `injector` to call this outside an injection context.
 * @returns The effect reference controlling the observation.
 */
export function onAsyncAwaitResult<R>(
    command: AsyncAwaitCommand<unknown, R>,
    handler: (result: R) => void,
    options?: Pick<CreateEffectOptions, 'injector'>,
): EffectRef {
    return effect(() => {
        const result = command.result();

        if (result !== null) {
            untracked(() => handler(result));
        }
    }, options);
}
