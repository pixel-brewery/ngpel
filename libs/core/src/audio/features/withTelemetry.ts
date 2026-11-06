// #region Imports

import type { Provider } from '@angular/core';
import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import { type AudioFeatureKind, AudioFeatureKinds } from './AudioFeatureKind';

// #endregion

/**
 * Adds product-owned providers to the recorder composition — a logger, a metrics sink, anything
 * that observes recording without changing it. The feature is multi, so several telemetry
 * contributions compose; each one carries its own id, and a repeated id is reported as a conflict
 * instead of quietly registering the same observer twice.
 *
 * @public
 * @param id Stable id of this contribution, unique among the telemetry features of one
 * composition.
 * @param providers The providers to contribute.
 * @returns A feature for `provideAudioRecorder(...)`.
 *
 * @example
 * ```typescript
 * provideAudioRecorder(
 *     withTelemetry('recording-logger', { provide: RECORDING_LOGGER, useClass: ConsoleRecordingLogger })
 * )
 * ```
 */
export function withTelemetry(id: string, ...providers: ReadonlyArray<Provider>): IFeature<AudioFeatureKind> {
    return createFeature(id, AudioFeatureKinds.Telemetry, [...providers], { multi: true });
}
