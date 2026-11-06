// #region Imports

import type { IAiBeamPulseOscillator } from './IAiBeamPulseOscillator';

// #endregion

export function createOscillators(
    spread: number,
    drift: number,
    opacity: number,
    globalHeight: number,
    breatheSpeed: number,
    sizeSpeed: number,
    heightSpeed: number,
): ReadonlyArray<IAiBeamPulseOscillator> {
    return [
        oscillator('--ngp-ai-beam-w1', 1 - spread, 1 + spread * 1.1, sizeSpeed * 0.9),
        oscillator('--ngp-ai-beam-h1', 1 + spread * 0.9, 1 - spread * 0.85, sizeSpeed * 1.26),
        oscillator('--ngp-ai-beam-x1', -drift, drift * 0.9, breatheSpeed * 1.6, 0, 'px'),
        oscillator('--ngp-ai-beam-y1', drift * 0.55, -drift * 0.7, breatheSpeed * 1.6, 0, 'px'),
        oscillator('--ngp-ai-beam-w2', 1 + spread, 1 - spread * 0.85, sizeSpeed * 1.1),
        oscillator('--ngp-ai-beam-h2', 1 - spread * 0.8, 1 + spread * 1.05, sizeSpeed * 0.81),
        oscillator('--ngp-ai-beam-x2', drift * 0.8, -drift * 0.9, breatheSpeed * 1.88, 0, 'px'),
        oscillator('--ngp-ai-beam-y2', -drift, drift * 0.65, breatheSpeed * 1.88, 0, 'px'),
        oscillator('--ngp-ai-beam-w3', 1 - spread * 0.6, 1 + spread * 1.15, sizeSpeed * 0.98),
        oscillator('--ngp-ai-beam-h3', 1 + spread * 0.75, 1 - spread, sizeSpeed * 1.4),
        oscillator('--ngp-ai-beam-x3', -drift * 0.6, drift, breatheSpeed * 1.45, 0, 'px'),
        oscillator('--ngp-ai-beam-y3', -drift * 0.85, drift * 0.45, breatheSpeed * 1.45, 0, 'px'),
        oscillator('--ngp-ai-beam-global-height', 1 - globalHeight, 1 + globalHeight, heightSpeed),
        oscillator('--ngp-ai-beam-opacity-tl', 1 - opacity, 1, breatheSpeed),
        oscillator('--ngp-ai-beam-opacity-tr', 1 - opacity, 1, breatheSpeed * 1.32, breatheSpeed * 0.28),
        oscillator('--ngp-ai-beam-opacity-bl', 1 - opacity, 1, breatheSpeed * 0.84, breatheSpeed * 0.55),
        oscillator('--ngp-ai-beam-opacity-br', 1 - opacity, 1, breatheSpeed * 1.58, breatheSpeed * 0.83),
    ];
}

export function oscillator(property: string, a: number, b: number, period: number, delay = 0, unit: '' | 'px' = ''): IAiBeamPulseOscillator {
    return { property, a, b, period, delay, unit };
}
