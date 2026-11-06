/**
 * Port for saving in-memory content under an explicit, caller-supplied file name.
 *
 * @public
 */
export interface IFileDownloader {
    // #region Methods

    /**
     * Downloads one blob under the supplied name.
     *
     * @param blob Content to save.
     * @param fileName Name suggested to the browser, including its extension.
     */
    downloadBlobAs(blob: Blob, fileName: string): void;

    // #endregion
}
