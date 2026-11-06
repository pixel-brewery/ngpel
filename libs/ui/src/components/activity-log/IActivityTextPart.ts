/** One segment of a changed paragraph. @public */
export interface IActivityTextPart {
    readonly kind: 'same' | 'added' | 'removed';
    readonly text: string;
}
