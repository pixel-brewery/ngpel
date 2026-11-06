import type { ContextOverlayLoader } from './ContextOverlayLoader';
import type { IContextOverlayState } from './IContextOverlayState';

/**
 * A feature-owned target addressable above the current page.
 *
 * @public
 * @typeParam TResult The close result delivered back to this target.
 */
export interface IContextOverlayTarget<TResult = unknown> {
    /** Unique key written into the URL. */
    readonly key: string;
    /** Checks whether the requested resource and mode may be opened. */
    readonly canOpen: (state: IContextOverlayState) => boolean;
    /** Validates the address synchronously and prepares the loader without mounting anything. */
    readonly prepare: (state: IContextOverlayState, transient?: unknown) => ContextOverlayLoader<TResult>;
    /** Receives an interactive close result. Route-driven closes do not call it. */
    readonly onClosed?: (result: TResult | undefined, state: IContextOverlayState) => void;
}
