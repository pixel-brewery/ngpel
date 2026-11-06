/**
 * Options controlling a feature's composition behavior.
 *
 * @public
 */
export interface IFeatureOptions {
    // #region Properties

    /**
     * When true, multiple features of the same kind are allowed. Defaults to false.
     */
    readonly multi?: boolean;

    // #endregion
}
