/**
 * Decides whether the application may present toast notifications. Cross-package contract used by
 * notification interceptors, update strategies and drawers alike; the product supplies the policy.
 *
 * @public
 */
export interface IToastVisibility {
    // #region Methods

    /**
     * Returns `true` when a toast may be shown right now.
     */
    canShow(): boolean;

    // #endregion
}
