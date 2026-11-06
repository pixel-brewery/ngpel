// #region Imports

import type { LiveAudioWaveformMode } from './LiveAudioWaveformMode';
import type { LiveAudioWaveformState } from './LiveAudioWaveformState';

// #endregion

/**
 * Internal rendering configuration passed from the public control to its canvas behavior.
 *
 * @internal
 */
export interface ILiveAudioWaveformCanvasConfiguration {
    readonly barColor: null | string;
    readonly barGap: number;
    readonly barHeight: number;
    readonly barRadius: number;
    readonly barWidth: number;
    readonly fadeEdges: boolean;
    readonly fadeWidth: number;
    readonly fftSize: number;
    readonly historySize: number;
    readonly mode: LiveAudioWaveformMode;
    readonly sensitivity: number;
    readonly smoothingTimeConstant: number;
    readonly state: LiveAudioWaveformState;
    readonly updateRate: number;
}
