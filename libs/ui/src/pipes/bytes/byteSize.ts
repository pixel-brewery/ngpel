// #region Constants

const UNITS: ReadonlyArray<string> = ['B', 'KB', 'MB', 'GB', 'TB'];
const STEP = 1024;
const COMPACT_THRESHOLD = 10;

// #endregion

/**
 * Formats a byte count as a human readable size.
 *
 * Storage allowances are published in gigabytes while consumption is measured in bytes, so a fixed
 * unit would either drown small values in zeroes or truncate large ones. The unit is therefore
 * chosen per value and the precision shrinks as the number grows: `1536` becomes `1.5 KB`,
 * `52428800` becomes `50 MB`.
 *
 * Exported as a function as well as through {@link BytesPipe}, so text assembled outside a template
 * states a size exactly the way the templates do.
 *
 * @public
 * @param value The number of bytes.
 * @param fallback The text for an unknown size, that is `null`, `undefined` or a non-finite number
 * (defaults to `0 B`).
 * @param locale The locale for number formatting. Omitting it preserves the plain decimal representation.
 * @returns The formatted size.
 */
export function byteSize(value: null | number | undefined, fallback = '0 B', locale?: string): string {
    if (value === null || value === undefined || !Number.isFinite(value)) {
        return fallback;
    }

    if (value <= 0) {
        return '0 B';
    }

    let size = value;
    let unitIndex = 0;

    while (size >= STEP && unitIndex < UNITS.length - 1) {
        size /= STEP;
        unitIndex++;
    }

    const fractionDigits = unitIndex > 0 && size < COMPACT_THRESHOLD ? 1 : 0;

    const amount = locale
        ? new Intl.NumberFormat(locale, { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(size)
        : size.toFixed(fractionDigits);

    return `${amount} ${UNITS[unitIndex] ?? 'B'}`;
}
