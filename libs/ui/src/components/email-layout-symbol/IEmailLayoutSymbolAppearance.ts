/**
 * Presentation-only appearance contract for the compact email-layout symbol.
 *
 * @public
 */
export interface IEmailLayoutSymbolAppearance {
    /**
     * Outer canvas color.
     *
     * @public
     * @readonly
     */
    readonly backgroundColor: string;

    /**
     * Inner message surface color.
     *
     * @public
     * @readonly
     */
    readonly surfaceColor: string;

    /**
     * Main accent color.
     *
     * @public
     * @readonly
     */
    readonly primaryColor: string;

    /**
     * Color rendered on primary surfaces.
     *
     * @public
     * @readonly
     */
    readonly primaryContrastColor: string;

    /**
     * Secondary line and frame color.
     *
     * @public
     * @readonly
     */
    readonly mutedColor: string;

    /**
     * Position of the dominant color accent.
     *
     * @public
     * @readonly
     */
    readonly accentPosition: 'NONE' | 'TOP' | 'BOTTOM' | 'START' | 'END';

    /**
     * Visual alignment of the logo placeholder.
     *
     * @public
     * @readonly
     */
    readonly logoAlignment: 'START' | 'CENTER' | 'END';

    /**
     * Visual alignment of the content lines.
     *
     * @public
     * @readonly
     */
    readonly contentAlignment: 'START' | 'CENTER' | 'END';

    /**
     * Visual alignment of the action placeholder.
     *
     * @public
     * @readonly
     */
    readonly actionAlignment: 'START' | 'CENTER' | 'END' | 'STRETCH';

    /**
     * Footer surface treatment.
     *
     * @public
     * @readonly
     */
    readonly footerTone: 'SURFACE' | 'MUTED' | 'PRIMARY';

    /**
     * Indicates whether the inner message surface has a visible frame.
     *
     * @public
     * @readonly
     */
    readonly framed: boolean;

    /**
     * Indicates whether the symbol uses compact spacing.
     *
     * @public
     * @readonly
     */
    readonly compact: boolean;
}
