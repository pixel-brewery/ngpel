/**
 * Keeps navigable targets to http(s). Everything else - `javascript:`, malformed hrefs, relative
 * paths that mean nothing in a packaged renderer - resolves to `null` so the caller keeps the link
 * text inert instead of turning it into a navigation.
 *
 * @internal
 * @param href The raw href of a link or image token.
 * @returns The normalized absolute URL, or `null` when the target is not http(s).
 */
export function cleanExternalUrl(href: string): string | null {
    try {
        const url = new URL(href.replaceAll('&amp;', '&'));

        return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
    } catch {
        return null;
    }
}
