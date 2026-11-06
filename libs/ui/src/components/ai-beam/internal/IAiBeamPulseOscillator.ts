/**
 * Runtime oscillator consumed by the shared pulse driver.
 *
 * @internal
 */
export interface IAiBeamPulseOscillator {
    readonly a: number;
    readonly b: number;
    readonly delay: number;
    readonly period: number;
    readonly property: string;
    readonly unit: '' | 'px';
}
