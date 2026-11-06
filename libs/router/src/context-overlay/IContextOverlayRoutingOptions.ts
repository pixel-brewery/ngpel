/** Application policies for contextual overlay routing. @public */
export interface IContextOverlayRoutingOptions {
    /** Selects the application paths allowed to host overlay URLs. */
    readonly supportsPath: (path: string) => boolean;
    /** Handles malformed, unregistered, forbidden or failed overlay URLs. */
    readonly onInvalidUrl: (url: string, error: unknown) => void | Promise<unknown>;
}
