/** One reusable select field shown before a configurable AI rail action executes. */
export interface IAiRailChoiceConfigurationField {
    readonly key: string;
    readonly label: string;
    readonly value: string;
    readonly options: ReadonlyArray<{
        readonly label: string;
        readonly value: string;
    }>;
    readonly disabled?: boolean;
    readonly showFilter?: boolean;
    readonly testId?: string;
}
