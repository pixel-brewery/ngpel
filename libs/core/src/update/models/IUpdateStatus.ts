// #region Imports

import type { UpdateStatusKind } from './UpdateStatusKind';

// #endregion

/**
 * Snapshot of the update lifecycle as reported by an {@link IUpdateSource}. Only `kind` is
 * mandatory; sources fill in whatever their platform knows.
 *
 * @public
 */
export interface IUpdateStatus {
    // #region Properties

    /**
     * The lifecycle phase.
     */
    readonly kind: UpdateStatusKind;

    /**
     * Identifier of the running version (a manifest hash or a semantic version).
     */
    readonly currentVersion?: string;

    /**
     * Identifier of the version being downloaded or ready for activation.
     */
    readonly targetVersion?: string;

    /**
     * When the source last completed a check.
     */
    readonly lastCheckedAt?: Date;

    /**
     * Release notes of the target version, when the platform provides them.
     */
    readonly releaseNotes?: string;

    /**
     * Why the source is `disabled` or why the last operation `failed`.
     */
    readonly reason?: string;

    // #endregion
}
