/**
 * Resolves a root-relative backend media path against an API origin while preserving
 * browser-local and absolute URLs. Only single-leading-slash paths are prefixed: absolute
 * (`https://`), protocol-relative (`//cdn`), `data:` and `blob:` URLs and empty values pass
 * through unchanged, and an empty origin keeps the path relative (local proxies).
 *
 * @public
 * @param origin The API origin, with or without trailing slashes.
 * @param url Media URL returned by an API or created locally for a preview.
 * @returns The resolved URL, or `''` for `null`/`undefined`.
 */
export function resolveMediaUrl(origin: string, url: null | string | undefined): string {
    if (!url || !url.startsWith('/') || url.startsWith('//')) {
        return url ?? '';
    }

    const root = origin.replace(/\/+$/u, '');

    return root ? `${root}${url}` : url;
}
