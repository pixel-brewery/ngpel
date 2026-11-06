/**
 * Locally persisted, successfully tested audio-input selection.
 *
 * Device identifiers and microphone permissions are browser-local, so this preference belongs to
 * the browser profile and deliberately not to a server-side user profile.
 *
 * @public
 */
export interface IAudioInputDevicePreference {
    // #region Properties

    /**
     * Browser-scoped device identifier.
     */
    readonly deviceId: string;

    /**
     * Last known device label, used for recovery messaging when the device disappears.
     */
    readonly label: string;

    /**
     * Preference payload schema version.
     */
    readonly schemaVersion: 1;

    /**
     * ISO timestamp of the last successful voice test.
     */
    readonly testedAt: string;

    // #endregion
}
