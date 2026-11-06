/**
 * Resolves the string value selected by a Mosaik selector.
 *
 * Mosaik's Angular wrapper emits the custom-event detail directly, while raw
 * element listeners receive the same detail below `event.detail`. Direct
 * string values and native target values remain supported for command and
 * test callers.
 *
 * @param event - Angular output detail, raw selection event, or direct value.
 *
 * @returns The selected string value, or `null` for unsupported payloads.
 *
 * @public
 */
export function resolveMosaikSelectionValue(event: unknown): string | null {
    if (typeof event === 'string') {
        return event;
    }
    const candidate = record(event);
    const detail = record(candidate['detail']);
    const newValue = candidate['newValue'] ?? detail['newValue'];
    if (typeof newValue === 'string') {
        return newValue;
    }
    const selection = record(newValue);
    if (typeof selection['value'] === 'string') {
        return selection['value'];
    }
    const target = record(candidate['target']);
    return typeof target['value'] === 'string' ? target['value'] : null;
}

function record(value: unknown): Readonly<Record<string, unknown>> {
    return typeof value === 'object' && value !== null ? (value as Readonly<Record<string, unknown>>) : {};
}
