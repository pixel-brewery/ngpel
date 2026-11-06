/**
 * Collects the first rendered element for every declarative tour target value.
 *
 * @param host - Host containing lazy or conditionally rendered tour content.
 * @param attributeName - Data attribute used to identify tour targets.
 * @returns The currently rendered target elements keyed by attribute value.
 * @public
 */
export function resolveDeclarativeTourTargetElements(host: HTMLElement, attributeName: `data-${string}`): ReadonlyMap<string, HTMLElement> {
    const targetElements = new Map<string, HTMLElement>();

    for (const element of host.querySelectorAll<HTMLElement>(`[${attributeName}]`)) {
        for (const key of element.getAttribute(attributeName)?.trim().split(/\s+/u) ?? []) {
            if (key && !targetElements.has(key)) {
                targetElements.set(key, element);
            }
        }
    }

    return targetElements;
}
