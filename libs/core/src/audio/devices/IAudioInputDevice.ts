/**
 * Stable, serializable projection of a browser audio-input device.
 *
 * @public
 */
export interface IAudioInputDevice {
    // #region Properties

    /**
     * Browser-scoped device identifier.
     */
    readonly deviceId: string;

    /**
     * Browser-scoped physical device group identifier, when the browser exposes one.
     */
    readonly groupId: string;

    /**
     * Browser-provided label, which stays empty until microphone permission is granted.
     */
    readonly label: string;

    // #endregion
}
