/**
 * Maps an AI rail's Mosaik Prompt Box submission to its submitted text.
 *
 * @param event - Prompt Box submission event or event detail.
 * @returns Submitted prompt text when present.
 * @public
 */
export function mapAiRailPromptSubmittedEvent(event: unknown): string {
    const detail = getEventDetail(event);
    const directText = getTextValue(detail);

    if (directText !== null) {
        return directText;
    }

    if (!isRecord(detail)) {
        return '';
    }

    return getTextValue(detail['message']) ?? getTextValue(detail['value']) ?? getTextValue(detail['text']) ?? '';
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

function getTextValue(value: unknown): string | null {
    if (typeof value === 'string') {
        return value;
    }

    if (!isRecord(value)) {
        return null;
    }

    const text = value['text'];
    if (typeof text === 'string') {
        return text;
    }

    const nestedValue = value['value'];
    return typeof nestedValue === 'string' ? nestedValue : null;
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
    return typeof value === 'object' && value !== null;
}
