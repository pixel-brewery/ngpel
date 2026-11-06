import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { AudioFeatureKinds } from './AudioFeatureKind';
import { provideAudioRecorder } from './provideAudioRecorder';
import { withTelemetry } from './withTelemetry';

const RECORDING_LOGGER = new InjectionToken<string>('RECORDING_LOGGER');
const RECORDING_METRICS = new InjectionToken<string>('RECORDING_METRICS');

describe('withTelemetry', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('contributes its providers to the recorder composition', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [provideAudioRecorder(withTelemetry('logger', { provide: RECORDING_LOGGER, useValue: 'console' }))],
        });

        // Act
        const logger = TestBed.inject(RECORDING_LOGGER);

        // Assert
        expect(logger).toBe('console');
    });

    it('composes several observers of one recorder', () => {
        // Arrange
        TestBed.configureTestingModule({
            providers: [
                provideAudioRecorder(
                    withTelemetry('logger', { provide: RECORDING_LOGGER, useValue: 'console' }),
                    withTelemetry('metrics', { provide: RECORDING_METRICS, useValue: 'histogram' }),
                ),
            ],
        });

        // Act
        const metrics = TestBed.inject(RECORDING_METRICS);

        // Assert
        expect(metrics).toBe('histogram');
        expect(TestBed.inject(RECORDING_LOGGER)).toBe('console');
    });

    it('reports a repeated id instead of registering the same observer twice', () => {
        // Arrange
        const features = [
            withTelemetry('logger', { provide: RECORDING_LOGGER, useValue: 'console' }),
            withTelemetry('logger', { provide: RECORDING_METRICS, useValue: 'histogram' }),
        ];

        // Act
        const compose = (): unknown => provideAudioRecorder(...features);

        // Assert
        expect(compose).toThrow(/duplicate id 'logger'/);
        expect(features[0]?.kind).toBe(AudioFeatureKinds.Telemetry);
        expect(features[0]?.options.multi).toBe(true);
    });
});
