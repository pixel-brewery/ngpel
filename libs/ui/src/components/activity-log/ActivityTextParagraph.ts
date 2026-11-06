import type { IActivityTextPart } from './IActivityTextPart';

/** Paragraph from a text comparison. @public */
export type ActivityTextParagraph =
    { readonly unchanged: true; readonly text: string } | { readonly unchanged: false; readonly parts: ReadonlyArray<IActivityTextPart> };
