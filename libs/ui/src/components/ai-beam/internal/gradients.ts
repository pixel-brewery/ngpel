// #region Imports

import type { AiBeamPalette } from '../AiBeamPalette';
import type { AiBeamResolvedTheme } from '../AiBeamResolvedTheme';
import {
    COLOR_STOPS,
    LINE_BLOOM_COLORS,
    LINE_COLORS,
    LINE_DARK_GEOMETRY,
    LINE_LIGHT_GEOMETRY,
    LINE_SPIKE_COLORS,
    PULSE_INNER_SIZES,
    PULSE_RING_MAP,
    SMALL_COLORS,
    SMALL_GEOMETRY,
} from './palettes';
import type { IPulseGradient, PulseQuadrant, PulseRegion } from './types';
import { at } from './at';
import { splitPair } from './splitPair';

// #endregion

export function bloomConic(theme: AiBeamResolvedTheme): string {
    const rgb = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    return theme === 'dark'
        ? `conic-gradient(from var(--ngp-ai-beam-angle), transparent 0% 58%, rgba(${rgb}, .03) 62%, rgba(${rgb}, .08) 65%, rgba(${rgb}, .2) 67%, rgba(${rgb}, .45) 69%, rgba(${rgb}, .85) 70% 70.5%, rgba(${rgb}, .45) 71.5%, rgba(${rgb}, .2) 73%, rgba(${rgb}, .08) 75%, rgba(${rgb}, .03) 78%, transparent 82%)`
        : `conic-gradient(from var(--ngp-ai-beam-angle), transparent 0% 58%, rgba(${rgb}, .02) 62%, rgba(${rgb}, .08) 65%, rgba(${rgb}, .2) 67%, rgba(${rgb}, .4) 69%, rgba(${rgb}, .6) 70% 70.5%, rgba(${rgb}, .4) 71.5%, rgba(${rgb}, .2) 73%, rgba(${rgb}, .08) 75%, rgba(${rgb}, .02) 78%, transparent 82%)`;
}

export function colorGradients(palette: AiBeamPalette, inner: boolean): string {
    const opacity = palette === 'mono' ? 0.225 : 0.45;
    return COLOR_STOPS[palette]
        .map((stop) => {
            const size = inner
                ? stop.size
                      .split(' ')
                      .map((value) => `${Math.round(Number.parseInt(value) * 0.9)}px`)
                      .join(' ')
                : stop.size;
            const color = inner ? withAlpha(stop.color, opacity) : stop.color;
            return `radial-gradient(ellipse ${size} at ${stop.position}, ${color}, transparent)`;
        })
        .join(', ');
}

export function lineBloomGradients(palette: AiBeamPalette, theme: AiBeamResolvedTheme): string {
    const isMono = palette === 'mono';
    const sourceSpikes = LINE_BLOOM_COLORS[palette][theme];
    const spikes = isMono
        ? sourceSpikes.map((spike) => ({
              color1: attenuate(spike.color1, 0.14),
              color2: attenuate(spike.color2, 0.098),
          }))
        : sourceSpikes;
    const spikeColors = LINE_SPIKE_COLORS[palette][theme];
    const primary = isMono ? attenuate(spikeColors.primary, 0.14) : spikeColors.primary;
    const primaryMid = isMono ? attenuate(spikeColors.primary, 0.09) : spikeColors.primary;
    const secondary = isMono ? attenuate(spikeColors.secondary, 0.12) : spikeColors.secondary;
    const secondaryMid = isMono ? withAlpha(spikeColors.secondary, 0.06) : withAlpha(spikeColors.secondary, 0.49);
    const thinWidth1 = isMono ? 12 : 0.8;
    const thinWidth2 = isMono ? 14 : 2;
    const thinWidth3 = isMono ? 12 : 1.2;
    const thinWidth4 = isMono ? (theme === 'light' ? 12 : 10) : theme === 'light' ? 1 : 0.6;
    const thinHeight1 = isMono ? 42 : 92;
    const thinHeight2 = isMono ? 38 : 72;
    const thinHeight3 = isMono ? 40 : 85;
    const thinHeight4 = isMono ? 32 : 60;

    const gradients = [
        `radial-gradient(ellipse calc(${thinWidth1}px * var(--ngp-ai-beam-spike)) calc(${thinHeight1}px * var(--ngp-ai-beam-line-height)) at 8% calc(100% - 2px), ${primary}, ${
            theme === 'light' ? (isMono ? attenuate(spikeColors.primary, 0.11) : withAlpha(spikeColors.primary, 0.85)) : primaryMid
        } 30%, transparent 88%)`,
        `radial-gradient(ellipse calc(10px * var(--ngp-ai-beam-spike2)) calc(35px * var(--ngp-ai-beam-line-height)) at 22% calc(100% - 4px), ${secondary}, ${
            theme === 'light' ? (isMono ? attenuate(spikeColors.secondary, 0.09) : withAlpha(spikeColors.secondary, 0.7)) : secondaryMid
        } 50%, transparent 95%)`,
        `radial-gradient(ellipse calc(${thinWidth2}px * (2 - var(--ngp-ai-beam-spike))) calc(${thinHeight2}px * var(--ngp-ai-beam-line-height)) at 36% calc(100% - 3px), ${at(spikes, 0).color1}, ${at(spikes, 0).color2} 40%, transparent 90%)`,
        `radial-gradient(ellipse calc(14px * var(--ngp-ai-beam-spike2)) calc(28px * var(--ngp-ai-beam-line-height)) at 50% calc(100% - 2px), ${at(spikes, 1).color1}, ${at(spikes, 1).color2} 55%, transparent 96%)`,
        `radial-gradient(ellipse calc(${thinWidth3}px * (2 - var(--ngp-ai-beam-spike2))) calc(${thinHeight3}px * var(--ngp-ai-beam-line-height)) at 64% calc(100% - 4px), ${at(spikes, 2).color1}, ${at(spikes, 2).color2} 35%, transparent 89%)`,
        `radial-gradient(ellipse calc(7px * var(--ngp-ai-beam-spike)) calc(45px * var(--ngp-ai-beam-line-height)) at 78% calc(100% - 2px), ${at(spikes, 3).color1}, ${at(spikes, 3).color2} 48%, transparent 94%)`,
        `radial-gradient(ellipse calc(${thinWidth4}px * (2 - var(--ngp-ai-beam-spike))) calc(${thinHeight4}px * var(--ngp-ai-beam-line-height)) at 92% calc(100% - 3px), ${at(spikes, 4).color1}, ${at(spikes, 4).color2} 42%, transparent 91%)`,
    ];

    if (theme === 'light') {
        gradients.push(
            'radial-gradient(ellipse calc(50px * var(--ngp-ai-beam-line-width)) calc(32px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) 100%, rgba(0, 0, 0, .5), rgba(0, 0, 0, .18) 30%, rgba(0, 0, 0, .03) 60%, transparent 85%)',
        );
    } else {
        gradients.push(
            `radial-gradient(ellipse calc(21px * var(--ngp-ai-beam-spike)) calc(15px * var(--ngp-ai-beam-spike2)) at calc(var(--ngp-ai-beam-line-x) * 100%) calc(100% + 1px), ${
                isMono ? 'rgba(255, 255, 255, .5)' : 'rgba(255, 255, 255, 1)'
            }, ${isMono ? 'rgba(255, 255, 255, .45)' : 'rgba(255, 255, 255, .9)'} 20%, ${
                isMono ? 'rgba(255, 255, 255, .25)' : 'rgba(255, 255, 255, .5)'
            } 50%, transparent 100%)`,
            `radial-gradient(ellipse calc(42px * var(--ngp-ai-beam-line-width)) calc(40px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) 100%, ${
                isMono ? 'rgba(255, 255, 255, .15)' : 'rgba(255, 255, 255, .3)'
            }, ${isMono ? 'rgba(255, 255, 255, .06)' : 'rgba(255, 255, 255, .12)'} 25%, ${
                isMono ? 'rgba(255, 255, 255, .015)' : 'rgba(255, 255, 255, .03)'
            } 55%, transparent 80%)`,
        );
    }

    return gradients.join(', ');
}

export function lineGradients(palette: AiBeamPalette, theme: AiBeamResolvedTheme): string {
    const geometry = theme === 'dark' ? LINE_DARK_GEOMETRY : LINE_LIGHT_GEOMETRY;
    return geometry
        .map((entry, index) => {
            const x = offset(entry.offsetX);
            const y = offset(entry.offsetY);
            return `radial-gradient(ellipse calc(${entry.width}px * var(--ngp-ai-beam-line-width)) calc(${entry.height}px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%${x}) calc(100%${y}), ${LINE_COLORS[palette][theme][index]}, transparent)`;
        })
        .join(', ');
}

export function lineHighlight(theme: AiBeamResolvedTheme): string {
    const rgb = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    return theme === 'dark'
        ? `radial-gradient(ellipse calc(24px * var(--ngp-ai-beam-line-width)) calc(28px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) calc(100% + 2px), rgba(${rgb}, .38), rgba(${rgb}, .12) 30%, transparent 65%)`
        : `radial-gradient(ellipse calc(35px * var(--ngp-ai-beam-line-width)) calc(28px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) calc(100% + 2px), rgba(${rgb}, .6), rgba(${rgb}, .25) 35%, transparent 70%)`;
}

export function lineInnerGradients(palette: AiBeamPalette): string {
    const geometry = [
        [33, 30, 0, 0],
        [24, 26, 39, -3],
        [27, 24, -36, 0],
        [23, 28, -54, -2],
        [24, 24, 51, -1],
        [30, 20, 21, 0],
        [25, 18, -21, -2],
        [21, 24, 66, 0],
        [18, 26, -66, -1],
    ] as const;
    const alphas = [0.48, 0.42, 0.48, 0.42, 0.5, 0.45, 0.4, 0.45, 0.52];
    return geometry
        .map(
            ([width, height, x, y], index) =>
                `radial-gradient(ellipse calc(${width}px * var(--ngp-ai-beam-line-width)) calc(${height}px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%${offset(x)}) calc(100%${offset(y)}), ${withAlpha(at(LINE_COLORS[palette].dark, index), at(alphas, index))}, transparent)`,
        )
        .join(', ');
}

export function offset(value: number): string {
    return value === 0 ? '' : value > 0 ? ` + ${value}px` : ` - ${Math.abs(value)}px`;
}

export function pulseGradient(color: string, width: number, height: number, region: PulseRegion, quadrant: PulseQuadrant, x: string, y: string): string {
    return `radial-gradient(ellipse calc(${width}px * var(--ngp-ai-beam-w${region}) * var(--ngp-ai-beam-glow-scale-x, 1) * var(--ngp-ai-beam-glow-boost, 1)) calc(${height}px * var(--ngp-ai-beam-h${region}) * var(--ngp-ai-beam-global-height) * var(--ngp-ai-beam-glow-scale-y, 1) * var(--ngp-ai-beam-glow-boost, 1)) at calc(${x} + var(--ngp-ai-beam-x${region})) calc(${y} + var(--ngp-ai-beam-y${region})), ${withAlphaVariable(color, quadrant)}, transparent)`;
}

export function pulseInnerGradients(palette: AiBeamPalette, theme: AiBeamResolvedTheme): string {
    const gradients = COLOR_STOPS[palette].map((stop, index) => {
        const [x, y] = splitPair(stop.position);
        const [width, height] = at(PULSE_INNER_SIZES, index);
        const mapping = at(PULSE_RING_MAP, index);

        return pulseGradient(stop.color, width, height, mapping.region, mapping.quadrant, x, y);
    });
    const rgb = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    const alpha = theme === 'dark' ? 0.18 : 0.08;
    gradients.push(
        `radial-gradient(ellipse 60px 60px at 0% 0%, rgba(${rgb}, calc(${alpha} * var(--ngp-ai-beam-opacity-tl))), transparent 70%)`,
        `radial-gradient(ellipse 60px 60px at 100% 0%, rgba(${rgb}, calc(${alpha} * var(--ngp-ai-beam-opacity-tr))), transparent 70%)`,
        `radial-gradient(ellipse 60px 60px at 0% 100%, rgba(${rgb}, calc(${alpha} * var(--ngp-ai-beam-opacity-bl))), transparent 70%)`,
        `radial-gradient(ellipse 60px 60px at 100% 100%, rgba(${rgb}, calc(${alpha} * var(--ngp-ai-beam-opacity-br))), transparent 70%)`,
    );
    return gradients.join(', ');
}

export function pulseRingGradients(palette: AiBeamPalette): string {
    return COLOR_STOPS[palette]
        .map((stop, index) => {
            const [x, y] = splitPair(stop.position);
            const [width, height] = splitPair(stop.size).map(Number.parseFloat) as [number, number];
            const mapping = at(PULSE_RING_MAP, index);

            return pulseGradient(stop.color, width, height, mapping.region, mapping.quadrant, x, y);
        })
        .join(', ');
}

export function pulseStaticGradients(table: ReadonlyArray<IPulseGradient>, palette: AiBeamPalette, alpha: number): string {
    return table
        .map((entry) => {
            const stop = at(COLOR_STOPS[palette], entry.colorIndex);
            const [defaultX, defaultY] = splitPair(stop.position);
            return `radial-gradient(ellipse calc(${entry.width}px * var(--ngp-ai-beam-glow-scale-x, 1) * var(--ngp-ai-beam-glow-boost, 1)) calc(${entry.height}px * var(--ngp-ai-beam-glow-scale-y, 1) * var(--ngp-ai-beam-glow-boost, 1)) at ${entry.x ?? defaultX} ${entry.y ?? defaultY}, ${withAlpha(stop.color, alpha)}, transparent)`;
        })
        .join(', ');
}

export function pulseTableGradients(table: ReadonlyArray<IPulseGradient>, palette: AiBeamPalette): string {
    return table
        .map((entry) => {
            const stop = at(COLOR_STOPS[palette], entry.colorIndex);
            const [defaultX, defaultY] = splitPair(stop.position);
            return pulseGradient(stop.color, entry.width, entry.height, entry.region, entry.quadrant, entry.x ?? defaultX, entry.y ?? defaultY);
        })
        .join(', ');
}

export function smallGradients(palette: AiBeamPalette, inner: boolean): string {
    const alphas = palette === 'mono' ? [0.25, 0.22, 0.17, 0.17, 0.15, 0.2, 0.15, 0.15] : [0.5, 0.45, 0.35, 0.35, 0.3, 0.4, 0.3, 0.3];
    return SMALL_COLORS[palette]
        .map((color, index) => {
            const renderedColor = inner ? withAlpha(color, at(alphas, index)) : color;
            return `radial-gradient(ellipse ${SMALL_GEOMETRY.sizes[index]} at ${SMALL_GEOMETRY.positions[index]}, ${renderedColor}, transparent)`;
        })
        .join(', ');
}

export function whiteConic(theme: AiBeamResolvedTheme): string {
    const rgb = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
    return theme === 'dark'
        ? `conic-gradient(from var(--ngp-ai-beam-angle), transparent 0% 54%, rgba(${rgb}, .1) 57%, rgba(${rgb}, .3) 60%, rgba(${rgb}, .6) 63%, rgba(${rgb}, .75) 66%, rgba(${rgb}, .6) 69%, rgba(${rgb}, .3) 72%, rgba(${rgb}, .1) 75%, transparent 78% 100%)`
        : `conic-gradient(from var(--ngp-ai-beam-angle), transparent 0% 54%, rgba(${rgb}, .08) 57%, rgba(${rgb}, .2) 60%, rgba(${rgb}, .4) 63%, rgba(${rgb}, .55) 66%, rgba(${rgb}, .4) 69%, rgba(${rgb}, .2) 72%, rgba(${rgb}, .08) 75%, transparent 78% 100%)`;
}

export function withAlpha(color: string, alpha: number): string {
    const channels = color.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
    return channels ? `rgba(${channels[1]}, ${channels[2]}, ${channels[3]}, ${alpha})` : color;
}

export function attenuate(color: string, factor: number): string {
    const match = color.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/);
    if (!match) {
        return color;
    }
    const alpha = Number.parseFloat(match[4] ?? '1') * factor;
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha.toFixed(2)})`;
}

export function withAlphaVariable(color: string, quadrant: PulseQuadrant): string {
    return color.replace('rgb(', 'rgba(').replace(')', `, var(--ngp-ai-beam-opacity-${quadrant}))`);
}
