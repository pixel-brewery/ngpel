/**
 * Port for writing text to the system clipboard. The outcome is reported instead of swallowed:
 * a rejected write is indistinguishable from a successful one to the user, so the caller owns
 * the confirmation it shows.
 *
 * @public
 */
export interface IClipboard {
    // #region Methods

    /**
     * Writes `text` to the clipboard.
     *
     * @param text The text to copy; empty or `undefined` values copy nothing.
     * @returns `true` when the text was written, `false` when there was nothing to write, no
     * clipboard is available or the platform rejected the write.
     */
    writeText(text: string | undefined): Promise<boolean>;

    // #endregion
}
