export interface IColorStop {
    readonly color: string;
    readonly position: string;
    readonly size: string;
}

export interface ILineStop {
    readonly color: string;
    readonly height: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly width: number;
}

export interface ILineBloomStop {
    readonly color1: string;
    readonly color2: string;
}

export interface ILineSpikeColors {
    readonly primary: string;
    readonly secondary: string;
}

export interface IPulseGradient {
    readonly colorIndex: number;
    readonly height: number;
    readonly quadrant: PulseQuadrant;
    readonly region: PulseRegion;
    readonly width: number;
    readonly x?: string;
    readonly y?: string;
}

export interface IThemeConfig {
    readonly bloomOpacity: number;
    readonly brightness: number;
    readonly innerOpacity: number;
    readonly innerShadow: string;
    readonly saturation: number;
    readonly strokeOpacity: number;
}

export type PulseQuadrant = 'tl' | 'tr' | 'bl' | 'br';

export type PulseRegion = 1 | 2 | 3;
