// #region Imports

import { DOCUMENT, Inject, Injectable } from '@angular/core';
import type { IAiBeamPulseDriverConfig } from './IAiBeamPulseDriverConfig';

// #endregion

interface IPulseInstance {
    readonly config: IAiBeamPulseDriverConfig;
    readonly element: HTMLElement;
}

/**
 * Drives every visible pulse beam from one frame-rate-capped animation loop.
 *
 * @internal
 */
@Injectable({ providedIn: 'root' })
export class AiBeamPulseDriverService {
    // #region Fields

    private static readonly FRAME_INTERVAL = 1000 / 30 - 2;
    private static readonly TWO_PI = Math.PI * 2;
    private readonly _instances = new Set<IPulseInstance>();
    private readonly _window: Window | null;
    private _animationFrameId: number | null = null;
    private _lastFrame = 0;

    // #endregion

    // #region Ctor

    public constructor(@Inject(DOCUMENT) document: Document) {
        this._window = document.defaultView;
    }

    // #endregion

    // #region Methods

    public register(element: HTMLElement, config: IAiBeamPulseDriverConfig): () => void {
        const instance = { element, config };
        this._instances.add(instance);
        this.start();

        return (): void => {
            this._instances.delete(instance);
            this.stopIfIdle();
        };
    }

    private frame(timestamp: number): void {
        if (!this._window) {
            return;
        }

        this._animationFrameId = this._window.requestAnimationFrame((nextTimestamp) => this.frame(nextTimestamp));
        if (timestamp - this._lastFrame < AiBeamPulseDriverService.FRAME_INTERVAL) {
            return;
        }

        this._lastFrame = timestamp;
        const seconds = timestamp / 1000;

        for (const { element, config } of this._instances) {
            for (const oscillator of config.oscillators) {
                const phase = (seconds - oscillator.delay) / oscillator.period;
                const factor = (1 - Math.cos(AiBeamPulseDriverService.TWO_PI * phase)) / 2;
                const value = oscillator.a + (oscillator.b - oscillator.a) * factor;
                element.style.setProperty(oscillator.property, oscillator.unit === 'px' ? `${value.toFixed(2)}px` : value.toFixed(4));
            }

            if (config.hue) {
                element.style.setProperty('--ngp-ai-beam-hue', `${(((seconds / config.hue.period) % 1) * config.hue.range).toFixed(2)}deg`);
            }
        }
    }

    private start(): void {
        if (!this._window || this._animationFrameId !== null) {
            return;
        }

        this._lastFrame = 0;
        this._animationFrameId = this._window.requestAnimationFrame((timestamp) => this.frame(timestamp));
    }

    private stopIfIdle(): void {
        if (!this._window || this._instances.size > 0 || this._animationFrameId === null) {
            return;
        }

        this._window.cancelAnimationFrame(this._animationFrameId);
        this._animationFrameId = null;
    }

    // #endregion
}
