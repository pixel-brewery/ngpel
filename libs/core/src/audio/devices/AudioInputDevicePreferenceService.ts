// #region Imports

import { inject, Injectable, type Signal, signal } from '@angular/core';
import { type IUserPreferenceStorage, JsonUserPreferenceCodec, USER_PREFERENCE_STORAGE } from '@pixel-brewery/ngpel-core/storage';
import { AUDIO_INPUT_DEVICE_PREFERENCE_KEY } from './AUDIO_INPUT_DEVICE_PREFERENCE_KEY';
import type { IAudioInputDevicePreference } from './IAudioInputDevicePreference';

// #endregion

/**
 * Validates an unknown stored payload, so a preference written by an older schema — or by an
 * unrelated key collision — is ignored instead of restoring a broken selection.
 *
 * @param value Unknown deserialized value.
 * @returns `true` when the value is a valid preference.
 */
function isAudioInputDevicePreference(value: unknown): value is IAudioInputDevicePreference {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const preference = value as Record<string, unknown>;

    return (
        preference['schemaVersion'] === 1 &&
        typeof preference['deviceId'] === 'string' &&
        preference['deviceId'].trim().length > 0 &&
        typeof preference['label'] === 'string' &&
        typeof preference['testedAt'] === 'string' &&
        Number.isFinite(Date.parse(preference['testedAt']))
    );
}

const AUDIO_INPUT_DEVICE_PREFERENCE_CODEC = new JsonUserPreferenceCodec<IAudioInputDevicePreference>(isAudioInputDevicePreference);

/**
 * Persists the verified microphone selection for the current browser profile.
 *
 * The value is written through the {@link USER_PREFERENCE_STORAGE} port of
 * `@pixel-brewery/ngpel-core/storage` under the key of
 * {@link AUDIO_INPUT_DEVICE_PREFERENCE_KEY}, so the product decides both where preferences live
 * and under which key this one is stored.
 *
 * @public
 */
@Injectable()
export class AudioInputDevicePreferenceService {
    // #region Fields

    private readonly _key: string = inject(AUDIO_INPUT_DEVICE_PREFERENCE_KEY);
    private readonly _storage: IUserPreferenceStorage = inject(USER_PREFERENCE_STORAGE);
    private readonly _preference = signal<IAudioInputDevicePreference | null>(this._storage.read(this._key, AUDIO_INPUT_DEVICE_PREFERENCE_CODEC) ?? null);

    // #endregion

    // #region Properties

    /**
     * Last successfully tested microphone preference of this browser profile.
     *
     * @public
     * @readonly
     */
    public get preference(): Signal<IAudioInputDevicePreference | null> {
        return this._preference.asReadonly();
    }

    // #endregion

    // #region Methods

    /**
     * Removes the stored microphone preference.
     *
     * @public
     */
    public clear(): void {
        this._storage.remove(this._key);
        this._preference.set(null);
    }

    /**
     * Stores a microphone after a successful voice test.
     *
     * @public
     * @param deviceId Browser-scoped device identifier.
     * @param label Last known browser device label.
     * @param testedAt Timestamp of the successful test.
     */
    public save(deviceId: string, label: string, testedAt: Date = new Date()): void {
        const preference: IAudioInputDevicePreference = {
            deviceId: deviceId.trim(),
            label: label.trim(),
            schemaVersion: 1,
            testedAt: testedAt.toISOString(),
        };

        this._storage.write(this._key, preference, AUDIO_INPUT_DEVICE_PREFERENCE_CODEC);
        this._preference.set(preference);
    }

    // #endregion
}
