// #region Imports

import type { AiBeamPalette } from '../AiBeamPalette';
import type { AiBeamPreset } from '../AiBeamPreset';
import type { AiBeamResolvedTheme } from '../AiBeamResolvedTheme';
import type { IColorStop, ILineBloomStop, ILineSpikeColors, ILineStop, IPulseGradient, IThemeConfig, PulseQuadrant, PulseRegion } from './types';

// #endregion

export const COLOR_STOPS: Readonly<Record<AiBeamPalette, ReadonlyArray<IColorStop>>> = {
    colorful: createStops(
        [
            'rgb(255, 50, 100)',
            'rgb(40, 140, 255)',
            'rgb(50, 200, 80)',
            'rgb(30, 185, 170)',
            'rgb(100, 70, 255)',
            'rgb(40, 140, 255)',
            'rgb(255, 120, 40)',
            'rgb(240, 50, 180)',
            'rgb(180, 40, 240)',
        ],
        ['33% -7.4%', '12% -5%', '2.1% 68.3%', '2.1% 68.3%', '74.4% 100%', '55% 100%', '93.9% 0%', '100% 27.1%', '100% 27.1%'],
        ['70px 40px', '60px 35px', '40px 70px', '20px 35px', '180px 32px', '85px 26px', '74px 32px', '26px 42px', '52px 48px'],
    ),
    mono: createStops(
        [
            'rgb(180, 180, 180)',
            'rgb(140, 140, 140)',
            'rgb(160, 160, 160)',
            'rgb(130, 130, 130)',
            'rgb(170, 170, 170)',
            'rgb(150, 150, 150)',
            'rgb(190, 190, 190)',
            'rgb(145, 145, 145)',
            'rgb(165, 165, 165)',
        ],
        ['33% -7.4%', '12% -5%', '2.1% 68.3%', '2.1% 68.3%', '74.4% 100%', '55% 100%', '93.9% 0%', '100% 27.1%', '100% 27.1%'],
        ['70px 40px', '60px 35px', '40px 70px', '20px 35px', '180px 32px', '85px 26px', '74px 32px', '26px 42px', '52px 48px'],
    ),
    ocean: createStops(
        [
            'rgb(100, 80, 220)',
            'rgb(60, 120, 255)',
            'rgb(80, 100, 200)',
            'rgb(50, 140, 220)',
            'rgb(120, 80, 255)',
            'rgb(70, 130, 255)',
            'rgb(140, 100, 240)',
            'rgb(90, 110, 230)',
            'rgb(130, 70, 255)',
        ],
        ['33% -7.4%', '12% -5%', '2.1% 68.3%', '2.1% 68.3%', '74.4% 100%', '55% 100%', '93.9% 0%', '100% 27.1%', '100% 27.1%'],
        ['70px 40px', '60px 35px', '40px 70px', '20px 35px', '180px 32px', '85px 26px', '74px 32px', '26px 42px', '52px 48px'],
    ),
    sunset: createStops(
        [
            'rgb(255, 80, 50)',
            'rgb(255, 160, 40)',
            'rgb(255, 120, 60)',
            'rgb(255, 200, 50)',
            'rgb(255, 100, 80)',
            'rgb(255, 180, 60)',
            'rgb(255, 60, 60)',
            'rgb(255, 140, 50)',
            'rgb(255, 90, 70)',
        ],
        ['33% -7.4%', '12% -5%', '2.1% 68.3%', '2.1% 68.3%', '74.4% 100%', '55% 100%', '93.9% 0%', '100% 27.1%', '100% 27.1%'],
        ['70px 40px', '60px 35px', '40px 70px', '20px 35px', '180px 32px', '85px 26px', '74px 32px', '26px 42px', '52px 48px'],
    ),
};

export const SMALL_GEOMETRY = {
    positions: ['2% 68%', '2% 68%', '72% -3%', '74% 100%', '100% 27%', '100% 27%', '100% 27%', '100% 27%'],
    sizes: ['9px 18px', '4px 8px', '59px 9px', '42px 7px', '10px 17px', '10px 18px', '5px 10px', '11px 12px'],
} as const;

export const SMALL_COLORS: Readonly<Record<AiBeamPalette, ReadonlyArray<string>>> = {
    colorful: [
        'rgb(50, 200, 80)',
        'rgb(30, 185, 170)',
        'rgb(255, 120, 40)',
        'rgb(100, 70, 255)',
        'rgb(240, 50, 180)',
        'rgb(180, 40, 240)',
        'rgb(40, 140, 255)',
        'rgb(255, 50, 100)',
    ],
    mono: [
        'rgb(160, 160, 160)',
        'rgb(140, 140, 140)',
        'rgb(180, 180, 180)',
        'rgb(150, 150, 150)',
        'rgb(170, 170, 170)',
        'rgb(155, 155, 155)',
        'rgb(145, 145, 145)',
        'rgb(165, 165, 165)',
    ],
    ocean: [
        'rgb(60, 140, 200)',
        'rgb(50, 120, 180)',
        'rgb(100, 80, 220)',
        'rgb(80, 100, 255)',
        'rgb(120, 70, 240)',
        'rgb(90, 80, 220)',
        'rgb(70, 110, 255)',
        'rgb(110, 90, 230)',
    ],
    sunset: [
        'rgb(255, 180, 50)',
        'rgb(255, 150, 40)',
        'rgb(255, 80, 60)',
        'rgb(255, 100, 80)',
        'rgb(255, 60, 80)',
        'rgb(255, 120, 60)',
        'rgb(255, 200, 50)',
        'rgb(255, 90, 70)',
    ],
};

export const LINE_DARK_GEOMETRY: ReadonlyArray<Omit<ILineStop, 'color'>> = [
    { width: 36, height: 36, offsetX: 0, offsetY: 2 },
    { width: 30, height: 32, offsetX: 39, offsetY: 0 },
    { width: 33, height: 28, offsetX: -36, offsetY: 2 },
    { width: 29, height: 34, offsetX: -54, offsetY: 0 },
    { width: 27, height: 30, offsetX: 51, offsetY: -1 },
    { width: 36, height: 24, offsetX: 21, offsetY: 1 },
    { width: 30, height: 22, offsetX: -21, offsetY: 0 },
    { width: 25, height: 28, offsetX: 66, offsetY: 1 },
    { width: 23, height: 30, offsetX: -66, offsetY: -1 },
];

export const LINE_LIGHT_GEOMETRY: ReadonlyArray<Omit<ILineStop, 'color'>> = [
    { width: 45, height: 36, offsetX: 0, offsetY: 2 },
    { width: 35, height: 32, offsetX: 65, offsetY: 0 },
    { width: 40, height: 28, offsetX: -60, offsetY: 2 },
    { width: 35, height: 34, offsetX: -90, offsetY: 0 },
    { width: 38, height: 30, offsetX: 85, offsetY: -1 },
    { width: 50, height: 24, offsetX: 35, offsetY: 1 },
    { width: 40, height: 22, offsetX: -35, offsetY: 0 },
    { width: 35, height: 28, offsetX: 110, offsetY: 1 },
    { width: 30, height: 30, offsetX: -110, offsetY: -1 },
];

export const LINE_COLORS: Readonly<Record<AiBeamPalette, Readonly<Record<AiBeamResolvedTheme, ReadonlyArray<string>>>>> = {
    colorful: {
        dark: [
            'rgb(255, 50, 100)',
            'rgb(40, 180, 220)',
            'rgb(50, 200, 80)',
            'rgb(180, 40, 240)',
            'rgb(255, 160, 30)',
            'rgb(100, 70, 255)',
            'rgb(40, 140, 255)',
            'rgb(240, 50, 180)',
            'rgb(30, 185, 170)',
        ],
        light: [
            'rgb(255, 50, 100)',
            'rgb(40, 140, 255)',
            'rgb(50, 200, 80)',
            'rgb(180, 40, 240)',
            'rgb(30, 185, 170)',
            'rgb(100, 70, 255)',
            'rgb(40, 140, 255)',
            'rgb(255, 120, 40)',
            'rgb(240, 50, 180)',
        ],
    },
    mono: {
        dark: [
            'rgb(200, 200, 200)',
            'rgb(170, 170, 170)',
            'rgb(155, 155, 155)',
            'rgb(185, 185, 185)',
            'rgb(165, 165, 165)',
            'rgb(180, 180, 180)',
            'rgb(160, 160, 160)',
            'rgb(175, 175, 175)',
            'rgb(190, 190, 190)',
        ],
        light: [
            'rgb(100, 100, 100)',
            'rgb(80, 80, 80)',
            'rgb(90, 90, 90)',
            'rgb(70, 70, 70)',
            'rgb(85, 85, 85)',
            'rgb(95, 95, 95)',
            'rgb(75, 75, 75)',
            'rgb(105, 105, 105)',
            'rgb(65, 65, 65)',
        ],
    },
    ocean: {
        dark: [
            'rgb(100, 80, 220)',
            'rgb(60, 120, 255)',
            'rgb(80, 100, 200)',
            'rgb(130, 70, 255)',
            'rgb(70, 130, 255)',
            'rgb(120, 80, 255)',
            'rgb(90, 110, 230)',
            'rgb(110, 90, 240)',
            'rgb(140, 100, 255)',
        ],
        light: [
            'rgb(80, 60, 200)',
            'rgb(50, 100, 220)',
            'rgb(70, 90, 190)',
            'rgb(110, 60, 220)',
            'rgb(60, 110, 230)',
            'rgb(100, 70, 240)',
            'rgb(80, 100, 210)',
            'rgb(90, 80, 225)',
            'rgb(120, 90, 245)',
        ],
    },
    sunset: {
        dark: [
            'rgb(255, 100, 60)',
            'rgb(255, 180, 50)',
            'rgb(255, 140, 70)',
            'rgb(255, 80, 80)',
            'rgb(255, 200, 60)',
            'rgb(255, 120, 50)',
            'rgb(255, 160, 80)',
            'rgb(255, 90, 60)',
            'rgb(255, 70, 70)',
        ],
        light: [
            'rgb(220, 80, 40)',
            'rgb(230, 150, 30)',
            'rgb(210, 110, 50)',
            'rgb(200, 60, 60)',
            'rgb(220, 170, 40)',
            'rgb(210, 100, 30)',
            'rgb(230, 130, 60)',
            'rgb(190, 70, 50)',
            'rgb(180, 50, 50)',
        ],
    },
};

export const LINE_SPIKE_COLORS: Readonly<Record<AiBeamPalette, Readonly<Record<AiBeamResolvedTheme, ILineSpikeColors>>>> = {
    colorful: {
        dark: { primary: 'rgb(255, 60, 80)', secondary: 'rgba(40, 190, 180, 0.98)' },
        light: { primary: 'rgb(200, 30, 60)', secondary: 'rgb(20, 150, 140)' },
    },
    mono: {
        dark: { primary: 'rgb(200, 200, 200)', secondary: 'rgb(170, 170, 170)' },
        light: { primary: 'rgb(80, 80, 80)', secondary: 'rgb(120, 120, 120)' },
    },
    ocean: {
        dark: { primary: 'rgb(100, 120, 255)', secondary: 'rgba(130, 100, 220, 0.98)' },
        light: { primary: 'rgb(60, 60, 180)', secondary: 'rgb(80, 100, 200)' },
    },
    sunset: {
        dark: { primary: 'rgb(255, 140, 80)', secondary: 'rgba(255, 100, 60, 0.98)' },
        light: { primary: 'rgb(200, 80, 40)', secondary: 'rgb(220, 120, 30)' },
    },
};

export const LINE_BLOOM_COLORS: Readonly<Record<AiBeamPalette, Readonly<Record<AiBeamResolvedTheme, ReadonlyArray<ILineBloomStop>>>>> = {
    colorful: {
        dark: [
            { color1: 'rgb(100, 70, 255)', color2: 'rgba(100, 70, 255, 1)' },
            { color1: 'rgba(255, 170, 40, 0.59)', color2: 'rgba(255, 170, 40, 0.29)' },
            { color1: 'rgb(50, 200, 100)', color2: 'rgba(50, 200, 100, 1)' },
            { color1: 'rgba(200, 50, 240, 0.91)', color2: 'rgba(200, 50, 240, 0.45)' },
            { color1: 'rgb(40, 140, 255)', color2: 'rgba(40, 140, 255, 1)' },
        ],
        light: [
            { color1: 'rgb(80, 50, 200)', color2: 'rgba(80, 50, 200, 0.8)' },
            { color1: 'rgba(210, 130, 0, 0.7)', color2: 'rgba(210, 130, 0, 0.46)' },
            { color1: 'rgb(30, 160, 70)', color2: 'rgba(30, 160, 70, 0.82)' },
            { color1: 'rgb(160, 30, 190)', color2: 'rgba(160, 30, 190, 0.7)' },
            { color1: 'rgb(30, 100, 200)', color2: 'rgba(30, 100, 200, 0.78)' },
        ],
    },
    mono: {
        dark: [
            { color1: 'rgb(200, 200, 200)', color2: 'rgba(200, 200, 200, 1)' },
            { color1: 'rgba(180, 180, 180, 0.59)', color2: 'rgba(180, 180, 180, 0.29)' },
            { color1: 'rgb(190, 190, 190)', color2: 'rgba(190, 190, 190, 1)' },
            { color1: 'rgba(170, 170, 170, 0.91)', color2: 'rgba(170, 170, 170, 0.45)' },
            { color1: 'rgb(185, 185, 185)', color2: 'rgba(185, 185, 185, 1)' },
        ],
        light: [
            { color1: 'rgb(80, 80, 80)', color2: 'rgba(80, 80, 80, 0.8)' },
            { color1: 'rgba(100, 100, 100, 0.7)', color2: 'rgba(100, 100, 100, 0.46)' },
            { color1: 'rgb(70, 70, 70)', color2: 'rgba(70, 70, 70, 0.82)' },
            { color1: 'rgb(90, 90, 90)', color2: 'rgba(90, 90, 90, 0.7)' },
            { color1: 'rgb(85, 85, 85)', color2: 'rgba(85, 85, 85, 0.78)' },
        ],
    },
    ocean: {
        dark: [
            { color1: 'rgb(100, 80, 255)', color2: 'rgb(100, 80, 255)' },
            { color1: 'rgba(80, 130, 220, 0.59)', color2: 'rgba(80, 130, 220, 0.29)' },
            { color1: 'rgb(60, 100, 255)', color2: 'rgb(60, 100, 255)' },
            { color1: 'rgba(90, 120, 200, 0.91)', color2: 'rgba(90, 120, 200, 0.45)' },
            { color1: 'rgb(120, 90, 255)', color2: 'rgb(120, 90, 255)' },
        ],
        light: [
            { color1: 'rgb(50, 40, 180)', color2: 'rgba(50, 40, 180, 0.8)' },
            { color1: 'rgba(40, 80, 200, 0.7)', color2: 'rgba(40, 80, 200, 0.46)' },
            { color1: 'rgb(30, 50, 190)', color2: 'rgba(30, 50, 190, 0.82)' },
            { color1: 'rgb(60, 90, 180)', color2: 'rgba(60, 90, 180, 0.7)' },
            { color1: 'rgb(70, 60, 200)', color2: 'rgba(70, 60, 200, 0.78)' },
        ],
    },
    sunset: {
        dark: [
            { color1: 'rgb(255, 100, 80)', color2: 'rgb(255, 100, 80)' },
            { color1: 'rgba(255, 150, 80, 0.59)', color2: 'rgba(255, 150, 80, 0.29)' },
            { color1: 'rgb(255, 80, 60)', color2: 'rgb(255, 80, 60)' },
            { color1: 'rgba(255, 120, 50, 0.91)', color2: 'rgba(255, 120, 50, 0.45)' },
            { color1: 'rgb(255, 140, 70)', color2: 'rgb(255, 140, 70)' },
        ],
        light: [
            { color1: 'rgb(200, 60, 30)', color2: 'rgba(200, 60, 30, 0.8)' },
            { color1: 'rgba(220, 100, 20, 0.7)', color2: 'rgba(220, 100, 20, 0.46)' },
            { color1: 'rgb(180, 40, 20)', color2: 'rgba(180, 40, 20, 0.82)' },
            { color1: 'rgb(210, 80, 10)', color2: 'rgba(210, 80, 10, 0.7)' },
            { color1: 'rgb(190, 70, 30)', color2: 'rgba(190, 70, 30, 0.78)' },
        ],
    },
};

export const PULSE_RING_MAP: ReadonlyArray<{ readonly quadrant: PulseQuadrant; readonly region: PulseRegion }> = [
    { region: 1, quadrant: 'tl' },
    { region: 2, quadrant: 'tl' },
    { region: 3, quadrant: 'bl' },
    { region: 1, quadrant: 'bl' },
    { region: 2, quadrant: 'br' },
    { region: 3, quadrant: 'br' },
    { region: 1, quadrant: 'tr' },
    { region: 2, quadrant: 'tr' },
    { region: 3, quadrant: 'tr' },
];

export const PULSE_INNER_SIZES: ReadonlyArray<readonly [number, number]> = [
    [65, 35],
    [55, 30],
    [35, 65],
    [15, 30],
    [173, 28],
    [80, 22],
    [69, 28],
    [22, 38],
    [47, 44],
];

export const PULSE_INNER_BLOOM: ReadonlyArray<IPulseGradient> = [
    { colorIndex: 0, region: 1, quadrant: 'tl', width: 84, height: 48 },
    { colorIndex: 1, region: 2, quadrant: 'tl', width: 72, height: 42 },
    { colorIndex: 2, region: 3, quadrant: 'bl', width: 48, height: 84 },
    { colorIndex: 4, region: 2, quadrant: 'br', width: 216, height: 38 },
    { colorIndex: 5, region: 3, quadrant: 'br', width: 102, height: 31 },
    { colorIndex: 6, region: 1, quadrant: 'tr', width: 89, height: 38 },
    { colorIndex: 8, region: 3, quadrant: 'tr', width: 62, height: 58 },
];

export const PULSE_OUTER_CORE: ReadonlyArray<IPulseGradient> = [
    { colorIndex: 0, region: 1, quadrant: 'tl', width: 80, height: 19, x: '27%', y: '0%' },
    { colorIndex: 6, region: 2, quadrant: 'tr', width: 74, height: 11, x: '73%', y: '-1%' },
    { colorIndex: 7, region: 3, quadrant: 'tr', width: 15, height: 44, x: '100%', y: '33%' },
    { colorIndex: 8, region: 1, quadrant: 'br', width: 19, height: 38, x: '101%', y: '72%' },
    { colorIndex: 4, region: 2, quadrant: 'br', width: 84, height: 13, x: '67%', y: '100%' },
    { colorIndex: 1, region: 3, quadrant: 'bl', width: 60, height: 21, x: '24%', y: '101%' },
    { colorIndex: 2, region: 1, quadrant: 'bl', width: 17, height: 40, x: '0%', y: '60%' },
    { colorIndex: 3, region: 2, quadrant: 'tl', width: 13, height: 32, x: '-1%', y: '28%' },
];

export const PULSE_OUTER_BLOOM: ReadonlyArray<IPulseGradient> = [
    { colorIndex: 0, region: 1, quadrant: 'tl', width: 110, height: 30, x: '27%', y: '3%' },
    { colorIndex: 6, region: 2, quadrant: 'tr', width: 100, height: 20, x: '73%', y: '1%' },
    { colorIndex: 7, region: 3, quadrant: 'tr', width: 26, height: 62, x: '100%', y: '33%' },
    { colorIndex: 8, region: 1, quadrant: 'br', width: 30, height: 56, x: '101%', y: '72%' },
    { colorIndex: 4, region: 2, quadrant: 'br', width: 120, height: 22, x: '67%', y: '99%' },
    { colorIndex: 1, region: 3, quadrant: 'bl', width: 88, height: 32, x: '24%', y: '99%' },
    { colorIndex: 2, region: 1, quadrant: 'bl', width: 28, height: 58, x: '0%', y: '60%' },
];

export const THEME_CONFIG: Readonly<Record<AiBeamPreset, Readonly<Record<AiBeamResolvedTheme, IThemeConfig>>>> = {
    sm: {
        dark: {
            strokeOpacity: 0.46,
            innerOpacity: 0.24,
            bloomOpacity: 0.38,
            innerShadow: 'rgba(255, 255, 255, 0.3)',
            saturation: 1.2,
            brightness: 1.3,
        },
        light: {
            strokeOpacity: 0.12,
            innerOpacity: 0.3,
            bloomOpacity: 0.16,
            innerShadow: 'rgba(0, 0, 0, 0.14)',
            saturation: 1.8,
            brightness: 1.3,
        },
    },
    md: {
        dark: {
            strokeOpacity: 0.26,
            innerOpacity: 0.42,
            bloomOpacity: 0.24,
            innerShadow: 'rgba(255, 255, 255, 0.27)',
            saturation: 1.2,
            brightness: 1.3,
        },
        light: {
            strokeOpacity: 0.12,
            innerOpacity: 0.26,
            bloomOpacity: 0.34,
            innerShadow: 'rgba(0, 0, 0, 0.14)',
            saturation: 1.5,
            brightness: 1.3,
        },
    },
    line: {
        dark: {
            strokeOpacity: 1.14,
            innerOpacity: 0.7,
            bloomOpacity: 0.8,
            innerShadow: 'rgba(255, 255, 255, 0.1)',
            saturation: 1.2,
            brightness: 1.3,
        },
        light: {
            strokeOpacity: 0.16,
            innerOpacity: 0.32,
            bloomOpacity: 0.3,
            innerShadow: 'rgba(0, 0, 0, 0.14)',
            saturation: 1.95,
            brightness: 1.3,
        },
    },
    'pulse-outside': {
        dark: {
            strokeOpacity: 0.94,
            innerOpacity: 0.34,
            bloomOpacity: 0.3,
            innerShadow: 'transparent',
            saturation: 1.2,
            brightness: 1.9,
        },
        light: {
            strokeOpacity: 1.96,
            innerOpacity: 1.04,
            bloomOpacity: 0.42,
            innerShadow: 'transparent',
            saturation: 0.6,
            brightness: 1.7,
        },
    },
    'pulse-inner': {
        dark: {
            strokeOpacity: 1.54,
            innerOpacity: 0.44,
            bloomOpacity: 0.66,
            innerShadow: 'transparent',
            saturation: 1.2,
            brightness: 0.75,
        },
        light: {
            strokeOpacity: 0.32,
            innerOpacity: 0.4,
            bloomOpacity: 0.8,
            innerShadow: 'transparent',
            saturation: 0.75,
            brightness: 1.3,
        },
    },
};

export function createStops(colors: ReadonlyArray<string>, positions: ReadonlyArray<string>, sizes: ReadonlyArray<string>): ReadonlyArray<IColorStop> {
    return colors.map((color, index) => ({ color, position: positions[index] ?? '0 0', size: sizes[index] ?? '0 0' }));
}
