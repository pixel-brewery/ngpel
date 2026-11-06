import type { IContextOverlayState } from './IContextOverlayState';

/** Interactive close across the heterogeneous registry of overlay targets. @public */
export interface IContextOverlayOutcome {
    /** Address of the closed surface. */
    readonly state: IContextOverlayState;
    /** Surface-specific result, if one was supplied. */
    readonly result: unknown;
}
