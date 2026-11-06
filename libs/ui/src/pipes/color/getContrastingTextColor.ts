// #region Constants

const SHORT_HEX_PATTERN = /^#?([0-9a-f])([0-9a-f])([0-9a-f])$/iu;
const LONG_HEX_PATTERN = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/iu;
const BLACK = '#000000';
const WHITE = '#ffffff';
const BRIGHTNESS_THRESHOLD = 128;

// #endregion

/**
 * Picks the text colour that stays readable on a background colour, using the YIQ brightness of the
 * background: dark text on a light ground, light text on a dark one.
 *
 * @public
 * @param backgroundColor The background as a `#rgb` or `#rrggbb` string.
 * @returns `#000000` or `#ffffff`; an unparsable background yields `#000000`.
 */
export function getContrastingTextColor(backgroundColor: string): '#000000' | '#ffffff' {
    const channels = parseHexChannels(backgroundColor);
    if (channels === null) {
        return BLACK;
    }

    const [red, green, blue] = channels;
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness >= BRIGHTNESS_THRESHOLD ? BLACK : WHITE;
}

/**
 * Parses a hexadecimal colour into its three channels.
 *
 * @param value The colour as a `#rgb` or `#rrggbb` string.
 * @returns The red, green and blue channels, or `null` when the colour cannot be parsed.
 */
function parseHexChannels(value: string): [number, number, number] | null {
    const text = value.trim();
    const match = LONG_HEX_PATTERN.exec(text) ?? SHORT_HEX_PATTERN.exec(text);
    const [red, green, blue] = match?.slice(1) ?? [];
    if (red === undefined || green === undefined || blue === undefined) {
        return null;
    }

    return [toChannel(red), toChannel(green), toChannel(blue)];
}

/**
 * Converts one or two hexadecimal digits to a colour channel.
 *
 * @param digits The hexadecimal digits of the channel.
 * @returns The channel between 0 and 255.
 */
function toChannel(digits: string): number {
    return Number.parseInt(digits.length === 1 ? `${digits}${digits}` : digits, 16);
}
