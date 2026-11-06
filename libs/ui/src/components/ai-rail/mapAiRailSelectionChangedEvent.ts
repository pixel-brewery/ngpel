/**
 * Maps the selection a Mosaik select of an AI rail reports to the value of the selected item.
 *
 * @param event - Select `selectionChanged` event or event detail.
 * @returns Value of the selected item when it is text.
 * @public
 */
export function mapAiRailSelectionChangedEvent(event: unknown): string | null {
    const detail = getEventDetail(event);
    const selection = isRecord(detail) ? detail['newValue'] : undefined;
    const value = isRecord(selection) ? selection['value'] : selection;

    return typeof value === 'string' ? value : null;
}

function getEventDetail(event: unknown): unknown {
    if (typeof CustomEvent !== 'undefined' && event instanceof CustomEvent) {
        return event.detail;
    }

    if (isRecord(event) && 'detail' in event) {
        return event['detail'];
    }

    return event;
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
    return typeof value === 'object' && value !== null;
}
