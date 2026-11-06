/**
 * The installed version is in a broken state that cannot be repaired without a full reload.
 *
 * @public
 */
export interface IUpdateUnrecoverableEvent {
    // #region Properties

    /**
     * Discriminator.
     */
    readonly type: 'unrecoverable';

    /**
     * Why the installed version can no longer be used.
     */
    readonly reason: string;

    // #endregion
}
