// #region Imports

import { AUDIO_LEVEL_WORKLET_PROCESSOR_NAME } from './AUDIO_LEVEL_WORKLET_PROCESSOR_NAME';

// #endregion

/**
 * JavaScript source for the level monitor's AudioWorklet module. A host with a restrictive content
 * security policy can write this string to a same-origin asset and load it with its own
 * `AudioLevelWorkletModuleLoader`.
 *
 * @public
 */
export const AUDIO_LEVEL_WORKLET_SOURCE = String.raw`
class NgpAudioLevelProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.samplesPerFrame = options.processorOptions.samplesPerFrame;
        this.sampleCount = 0;
        this.sumOfSquares = 0;
        this.peak = 0;
        this.paused = false;
        this.port.onmessage = ({ data }) => this.onCommand(data);
    }

    onCommand(command) {
        if (command === 'flush') {
            this.paused = true;
            this.emitLevel();
        } else if (command === 'pause' || command === 'resume') {
            this.paused = command === 'pause';
        } else {
            return;
        }

        this.port.postMessage({ type: 'command-completed', command });
    }

    emitLevel() {
        if (this.sampleCount === 0) {
            return;
        }

        this.port.postMessage({
            type: 'level',
            sampleCount: this.sampleCount,
            rms: Math.sqrt(this.sumOfSquares / this.sampleCount),
            peak: this.peak,
        });
        this.sampleCount = 0;
        this.sumOfSquares = 0;
        this.peak = 0;
    }

    process(inputs) {
        const samples = inputs[0]?.[0];
        if (this.paused || !samples) {
            return true;
        }

        for (const sample of samples) {
            const clamped = Math.max(-1, Math.min(1, sample));
            const amplitude = Math.abs(Math.round(clamped * (clamped < 0 ? 32768 : 32767))) / 32768;
            this.sumOfSquares += amplitude * amplitude;
            this.peak = Math.max(this.peak, amplitude);
            this.sampleCount += 1;

            if (this.sampleCount === this.samplesPerFrame) {
                this.emitLevel();
            }
        }

        return true;
    }
}

registerProcessor('${AUDIO_LEVEL_WORKLET_PROCESSOR_NAME}', NgpAudioLevelProcessor);
`;
