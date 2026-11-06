/**
 * Presentation-only appearance contract for the compact document-layout symbol.
 *
 * @public
 */
export interface IDocumentLayoutSymbolAppearance {
    /**
     * Paper color.
     *
     * @public
     * @readonly
     */
    readonly surfaceColor: string;

    /**
     * Main brand color.
     *
     * @public
     * @readonly
     */
    readonly primaryColor: string;

    /**
     * Secondary highlight color.
     *
     * @public
     * @readonly
     */
    readonly accentColor: string;

    /**
     * Secondary line color.
     *
     * @public
     * @readonly
     */
    readonly mutedColor: string;

    /**
     * Header composition used by the symbol.
     *
     * @public
     * @readonly
     */
    readonly headerStyle: 'CLASSIC' | 'SPLIT' | 'CENTERED' | 'SIDE' | 'MINIMAL';

    /**
     * Logo placeholder position.
     *
     * @public
     * @readonly
     */
    readonly logoPlacement: 'START' | 'CENTER' | 'END' | 'FOOTER' | 'NONE';

    /**
     * Number of party columns represented by the symbol.
     *
     * @public
     * @readonly
     */
    readonly partyColumns: 1 | 2;

    /**
     * Line-item representation.
     *
     * @public
     * @readonly
     */
    readonly itemStyle: 'ROWS' | 'COMPACT_ROWS' | 'CARDS';

    /**
     * Totals placeholder alignment.
     *
     * @public
     * @readonly
     */
    readonly totalsAlignment: 'START' | 'END' | 'STRETCH';

    /**
     * Footer composition.
     *
     * @public
     * @readonly
     */
    readonly footerStyle: 'PLAIN' | 'COLUMNS' | 'BAND';

    /**
     * Indicates whether an address line is represented below the header.
     *
     * @public
     * @readonly
     */
    readonly showAddressLine: boolean;

    /**
     * Indicates whether a page-number marker is represented in the footer.
     *
     * @public
     * @readonly
     */
    readonly showPageNumber: boolean;
}
