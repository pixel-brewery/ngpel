/**
 * Escapes an untrusted value for one HTML attribute of the generated markup. The ampersand is
 * escaped first so the entities produced by the later replacements are not escaped a second time.
 * Elements that treat their `text` attribute as plain content need exactly this single pass,
 * because the HTML parser decodes the attribute once before the element ever sees it.
 *
 * @public
 * @param value The untrusted value that lands in an attribute.
 * @returns The value with `&`, `"`, `'`, `<` and `>` replaced by their entities.
 */
export function escapeMarkdownAttribute(value: string): string {
    return value.replace(/&/gu, '&amp;').replace(/"/gu, '&quot;').replace(/'/gu, '&#39;').replace(/</gu, '&lt;').replace(/>/gu, '&gt;');
}
