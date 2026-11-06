// #region Imports

import type { StopEventPropagationEventName } from './StopEventPropagationEventName';

// #endregion

/**
 * Normalises the value bound to `ngpStopEventPropagation` into the shape the directive evaluates.
 *
 * The bare attribute form (`<button ngpStopEventPropagation>`) reaches the input as the empty
 * string, which is neither `true`, `false` nor a list of event names; it means "stop every
 * supported event" and is therefore mapped onto `true`. Every other value passes through
 * unchanged.
 *
 * Deliberately not part of the published surface: it exists as a separate module so that the
 * normalisation can be exercised directly. As an input transform it is unreachable from a spec,
 * because the specs substitute the input signal itself and the just-in-time compiler never applies
 * a transform in the first place.
 *
 * @param value The bound value; the empty string for the bare attribute.
 * @returns `true` for the bare attribute, the value itself otherwise.
 */
export function toStopEventPropagationEvents(
    value: '' | boolean | ReadonlyArray<StopEventPropagationEventName>,
): boolean | ReadonlyArray<StopEventPropagationEventName> {
    return value === '' ? true : value;
}
