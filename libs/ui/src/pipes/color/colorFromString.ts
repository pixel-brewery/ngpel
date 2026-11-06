// #region Constants

const FNV_OFFSET_BASIS = 0x811c9dc5;
const FNV_PRIME = 0x01000193;
const HUE_RANGE = 360;
const SATURATION_BASE = 60;
const SATURATION_RANGE = 20;
const LIGHTNESS_BASE = 50;
const LIGHTNESS_RANGE = 10;

// #endregion

/**
 * Derives a stable colour from text, so the same tenant, tag or user always shows the same tint
 * without anybody storing a colour for it.
 *
 * The text is hashed with FNV-1a and the hash is spread over the full hue circle at a mid
 * saturation and lightness, which keeps every generated colour legible next to its neighbours.
 *
 * @public
 * @param value The text to derive the colour from.
 * @returns The colour as a `#rrggbb` string.
 */
export function colorFromString(value: string): string {
    const hash = hash32(value);
    const hue = hash % HUE_RANGE;
    const saturation = SATURATION_BASE + ((hash >>> 8) % SATURATION_RANGE);
    const lightness = LIGHTNESS_BASE + ((hash >>> 16) % LIGHTNESS_RANGE);

    return hslToHex(hue, saturation, lightness);
}

/**
 * Hashes text with the 32-bit FNV-1a algorithm.
 *
 * @param value The text to hash.
 * @returns The unsigned 32-bit hash.
 */
function hash32(value: string): number {
    let hash = FNV_OFFSET_BASIS;
    for (let index = 0; index < value.length; index++) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, FNV_PRIME);
    }

    return hash >>> 0;
}

/**
 * Converts an HSL triple to its `#rrggbb` representation.
 *
 * @param hue The hue in degrees, between 0 and 359.
 * @param saturation The saturation in percent.
 * @param lightness The lightness in percent.
 * @returns The colour as a `#rrggbb` string.
 */
function hslToHex(hue: number, saturation: number, lightness: number): string {
    const normalizedSaturation = saturation / 100;
    const normalizedLightness = lightness / 100;
    const chroma = (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
    const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
    const offset = normalizedLightness - chroma / 2;
    let red = 0;
    let green = 0;
    let blue = 0;

    if (hue < 60) {
        red = chroma;
        green = secondary;
    } else if (hue < 120) {
        red = secondary;
        green = chroma;
    } else if (hue < 180) {
        green = chroma;
        blue = secondary;
    } else if (hue < 240) {
        green = secondary;
        blue = chroma;
    } else if (hue < 300) {
        red = secondary;
        blue = chroma;
    } else {
        red = chroma;
        blue = secondary;
    }

    return `#${toHexByte(red + offset)}${toHexByte(green + offset)}${toHexByte(blue + offset)}`;
}

/**
 * Converts a normalised colour channel to a two-digit hexadecimal byte.
 *
 * @param channel The channel between 0 and 1.
 * @returns The two-digit hexadecimal representation.
 */
function toHexByte(channel: number): string {
    return Math.round(channel * 255)
        .toString(16)
        .padStart(2, '0');
}
