import { runInNewContext } from 'node:vm';
import { describe, expect, it, vi } from 'vitest';
import { AUDIO_LEVEL_WORKLET_PROCESSOR_NAME } from './AUDIO_LEVEL_WORKLET_PROCESSOR_NAME';
import { AUDIO_LEVEL_WORKLET_SOURCE } from './AUDIO_LEVEL_WORKLET_SOURCE';

class FakeAudioWorkletProcessor {
    public readonly port = {
        onmessage: null as ((event: { data: string }) => void) | null,
        postMessage: vi.fn(),
    };
}

interface ILevelProcessor extends FakeAudioWorkletProcessor {
    process(inputs: Float32Array[][]): boolean;
}

type LevelProcessorConstructor = new (options: { processorOptions: { samplesPerFrame: number } }) => ILevelProcessor;

function createProcessor(samplesPerFrame: number): ILevelProcessor {
    const registerProcessor = vi.fn<(name: string, processor: LevelProcessorConstructor) => void>();
    runInNewContext(AUDIO_LEVEL_WORKLET_SOURCE, {
        AudioWorkletProcessor: FakeAudioWorkletProcessor,
        registerProcessor,
    });

    const [name, Processor] = registerProcessor.mock.calls[0]!;
    expect(name).toBe(AUDIO_LEVEL_WORKLET_PROCESSOR_NAME);

    return new Processor({ processorOptions: { samplesPerFrame } });
}

describe('AUDIO_LEVEL_WORKLET_SOURCE', () => {
    it('measures sample-aligned windows across render quanta and flushes the remaining samples', () => {
        // Arrange
        const processor = createProcessor(480);
        const samples = new Float32Array(128).fill(0.5);

        // Act
        for (let quantum = 0; quantum < 4; quantum += 1) {
            processor.process([[samples]]);
        }
        processor.port.onmessage?.({ data: 'flush' });

        // Assert
        expect(processor.port.postMessage.mock.calls).toEqual([
            [{ type: 'level', sampleCount: 480, rms: 0.5, peak: 0.5 }],
            [{ type: 'level', sampleCount: 32, rms: 0.5, peak: 0.5 }],
            [{ type: 'command-completed', command: 'flush' }],
        ]);
    });

    it('excludes samples from paused quanta without losing the partial measurement', () => {
        // Arrange
        const processor = createProcessor(4);
        processor.process([[new Float32Array([0.25, -0.25, 0.25])]]);
        processor.port.onmessage?.({ data: 'pause' });

        // Act
        processor.process([[new Float32Array([1, -1, 1, -1])]]);
        processor.port.onmessage?.({ data: 'resume' });
        processor.process([[new Float32Array([-0.25])]]);

        // Assert
        expect(processor.port.postMessage.mock.calls).toEqual([
            [{ type: 'command-completed', command: 'pause' }],
            [{ type: 'command-completed', command: 'resume' }],
            [{ type: 'level', sampleCount: 4, rms: 0.25, peak: 0.25 }],
        ]);
    });
});
