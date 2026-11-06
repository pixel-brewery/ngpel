import type { IResourceNavigationTarget } from './IResourceNavigationTarget';

/** The target and identifier field associated with a registered source. @public */
export interface IResourceNavigationSource {
    /** Destination described by the source row. */
    readonly target: IResourceNavigationTarget;

    /** Field on the source row that identifies the destination resource. */
    readonly idField: string;
}
