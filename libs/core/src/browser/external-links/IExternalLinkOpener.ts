/**
 * Port for handing a URL to a new, isolated browsing context from a command context (menus,
 * shortcuts) where no rendered link exists. Rendered links keep using anchors with
 * `target="_blank"`; this port only owns the raw open primitive.
 *
 * @public
 */
export interface IExternalLinkOpener {
    // #region Methods

    /**
     * Opens `url` externally.
     *
     * @param url The absolute URL to open; empty or `undefined` values are ignored.
     */
    open(url: string | undefined): void;

    // #endregion
}
