/** Layouts available to a compound collection. @public */
export const CompoundLayout = {
    /** Uses the existing single-item and list views. */
    Paged: 'paged',

    /** Gives each item an independently expandable editor. */
    Stacked: 'stacked',
} as const;
