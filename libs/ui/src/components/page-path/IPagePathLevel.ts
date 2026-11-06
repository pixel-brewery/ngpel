import type { Command } from '@pixel-brewery/ngpel-mvp';

/** One level of a page path. The last level names the current page. @public */
export interface IPagePathLevel {
    /** Display label supplied by the feature. */
    readonly label: string;
    /** Optional navigation command for a parent level. */
    readonly command?: Command<void> | null;
}
