// #region Imports

import { NgTemplateOutlet } from '@angular/common';
import {
    afterNextRender,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    DOCUMENT,
    effect,
    ElementRef,
    inject,
    input,
    output,
    signal,
    type InputSignal,
    type OutputEmitterRef,
    type Signal,
    type TemplateRef,
    type WritableSignal,
} from '@angular/core';
import type { AiBeamPalette } from './AiBeamPalette';
import type { AiBeamPreset } from './AiBeamPreset';
import type { AiBeamResolvedTheme } from './AiBeamResolvedTheme';
import type { AiBeamTheme } from './AiBeamTheme';
import { AiBeamPulseDriverService } from './internal/AiBeamPulseDriverService';
import { createAiBeamPulseDriverConfig } from './internal/createAiBeamPulseDriverConfig';
import { createAiBeamVisualConfig } from './internal/createAiBeamVisualConfig';
import type { IAiBeamPulseDriverConfig } from './internal/IAiBeamPulseDriverConfig';
import type { IAiBeamVisualConfig } from './internal/IAiBeamVisualConfig';

// #endregion

type AiBeamPhase = 'inactive' | 'activating' | 'active' | 'deactivating';

interface IAiBeamWindow extends Window {
    readonly IntersectionObserver?: typeof IntersectionObserver;
    readonly MutationObserver?: typeof MutationObserver;
    readonly ResizeObserver?: typeof ResizeObserver;
}

/**
 * Renders an animated border around arbitrary projected content, the visual language products use
 * to mark that something is being produced by an AI.
 *
 * The animation is driven by one shared, frame-rate-capped loop rather than by CSS keyframes per
 * instance, so many beams on one page stay cheap. A beam pauses itself while it is scrolled out of
 * view and renders a static border when the visitor prefers reduced motion.
 *
 * Prefer the {@link AiBeamDirective} shorthand when the beam wraps a single element.
 *
 * @public
 *
 * @example
 * ```html
 * <ngp-ai-beam preset="pulse-outside" palette="ocean" [active]="isThinking()">
 *     <article>…</article>
 * </ngp-ai-beam>
 * ```
 */
@Component({
    selector: 'ngp-ai-beam',
    imports: [NgTemplateOutlet],
    template: `
        @if (contentTemplate(); as template) {
            <ng-container [ngTemplateOutlet]="template" />
        } @else {
            <ng-content />
        }
        <span aria-hidden="true" data-ngp-ai-beam-bloom></span>
    `,
    styles: `
        @property --ngp-ai-beam-angle {
            syntax: '<angle>';
            initial-value: 0deg;
            inherits: true;
        }

        @property --ngp-ai-beam-opacity {
            syntax: '<number>';
            initial-value: 0;
            inherits: true;
        }

        @property --ngp-ai-beam-line-x {
            syntax: '<number>';
            initial-value: 0;
            inherits: true;
        }

        @property --ngp-ai-beam-line-width {
            syntax: '<number>';
            initial-value: 1;
            inherits: true;
        }

        @property --ngp-ai-beam-line-height {
            syntax: '<number>';
            initial-value: 1;
            inherits: true;
        }

        @property --ngp-ai-beam-spike {
            syntax: '<number>';
            initial-value: 1;
            inherits: true;
        }

        @property --ngp-ai-beam-spike2 {
            syntax: '<number>';
            initial-value: 1;
            inherits: true;
        }

        @property --ngp-ai-beam-edge {
            syntax: '<number>';
            initial-value: 1;
            inherits: true;
        }

        :host {
            --ngp-ai-beam-angle: 0deg;
            --ngp-ai-beam-opacity: 0;
            --ngp-ai-beam-line-x: 0;
            --ngp-ai-beam-line-width: 1;
            --ngp-ai-beam-line-height: 1;
            --ngp-ai-beam-spike: 1;
            --ngp-ai-beam-spike2: 1;
            --ngp-ai-beam-edge: 1;
            --ngp-ai-beam-hue: 0deg;
            --ngp-ai-beam-w1: 1;
            --ngp-ai-beam-h1: 1;
            --ngp-ai-beam-x1: 0px;
            --ngp-ai-beam-y1: 0px;
            --ngp-ai-beam-w2: 1;
            --ngp-ai-beam-h2: 1;
            --ngp-ai-beam-x2: 0px;
            --ngp-ai-beam-y2: 0px;
            --ngp-ai-beam-w3: 1;
            --ngp-ai-beam-h3: 1;
            --ngp-ai-beam-x3: 0px;
            --ngp-ai-beam-y3: 0px;
            --ngp-ai-beam-global-height: 1;
            --ngp-ai-beam-opacity-tl: 1;
            --ngp-ai-beam-opacity-tr: 1;
            --ngp-ai-beam-opacity-bl: 1;
            --ngp-ai-beam-opacity-br: 1;

            position: relative;
            display: block;
            overflow: hidden;
            border-radius: var(--ngp-ai-beam-border-radius);
        }

        :host([data-preset='pulse-inner']),
        :host([data-preset='pulse-outside']) {
            isolation: isolate;
        }

        :host([data-preset='pulse-outside']) {
            overflow: visible;
        }

        :host([data-active]:not([data-preset='line']):not([data-preset^='pulse'])) {
            animation:
                ngp-ai-beam-spin var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-fade-in 0.6s ease forwards;
        }

        :host([data-fading]:not([data-preset='line']):not([data-preset^='pulse'])) {
            animation:
                ngp-ai-beam-spin var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-fade-out 0.5s ease forwards;
        }

        :host([data-preset='line'][data-active]) {
            animation:
                ngp-ai-beam-travel var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-edge-fade var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-breathe var(--ngp-ai-beam-line-breathe-duration) ease-in-out infinite,
                ngp-ai-beam-spike var(--ngp-ai-beam-line-spike-duration) ease-in-out infinite,
                ngp-ai-beam-spike2 var(--ngp-ai-beam-line-spike2-duration) ease-in-out infinite,
                ngp-ai-beam-fade-in 0.6s ease forwards;
        }

        :host([data-preset='line'][data-fading]) {
            animation:
                ngp-ai-beam-travel var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-edge-fade var(--ngp-ai-beam-duration) linear infinite,
                ngp-ai-beam-breathe var(--ngp-ai-beam-line-breathe-duration) ease-in-out infinite,
                ngp-ai-beam-spike var(--ngp-ai-beam-line-spike-duration) ease-in-out infinite,
                ngp-ai-beam-spike2 var(--ngp-ai-beam-line-spike2-duration) ease-in-out infinite,
                ngp-ai-beam-fade-out 0.5s ease forwards;
        }

        :host([data-preset^='pulse'][data-active]) {
            animation: ngp-ai-beam-fade-in 0.6s ease forwards;
        }

        :host([data-preset^='pulse'][data-fading]) {
            animation: ngp-ai-beam-fade-out 0.5s ease forwards;
        }

        :host([data-paused]:not([data-preset='line'])) {
            animation-play-state: paused, running;
        }

        :host([data-preset='line'][data-paused]) {
            animation-play-state: paused, paused, paused, paused, paused, running;
        }

        :host([data-paused])::before,
        :host([data-paused])::after,
        :host([data-paused]) [data-ngp-ai-beam-bloom] {
            animation-play-state: paused !important;
        }

        :host([data-active])::before,
        :host([data-active])::after,
        :host([data-fading])::before,
        :host([data-fading])::after {
            position: absolute;
            inset: 0;
            content: '';
            pointer-events: none;
        }

        :host([data-active])::after,
        :host([data-fading])::after {
            z-index: 2;
            padding: var(--ngp-ai-beam-border-width);
            border-radius: max(0px, calc(var(--ngp-ai-beam-border-radius) - var(--ngp-ai-beam-border-width)));
            background: var(--ngp-ai-beam-stroke-background);
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-stroke-opacity) * var(--ngp-ai-beam-strength));
            clip-path: inset(0 round var(--ngp-ai-beam-border-radius));
            mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
        }

        :host([data-preset='sm'])::after {
            mask:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: intersect, exclude;
            -webkit-mask:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: source-in, xor;
        }

        :host([data-preset='md'])::after {
            mask:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: intersect, exclude;
            -webkit-mask:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: source-in, xor;
        }

        :host([data-preset='line'])::after {
            mask:
                radial-gradient(
                    ellipse calc(78px * var(--ngp-ai-beam-line-width)) calc(60px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%)
                        100%,
                    white 0%,
                    rgb(255 255 255 / 50%) 45%,
                    transparent 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: intersect, exclude;
            -webkit-mask:
                radial-gradient(
                    ellipse calc(78px * var(--ngp-ai-beam-line-width)) calc(60px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%)
                        100%,
                    white 0%,
                    rgb(255 255 255 / 50%) 45%,
                    transparent 100%
                ),
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: source-in, xor;
        }

        :host([data-preset^='pulse'])::after {
            border-radius: var(--ngp-ai-beam-border-radius);
        }

        :host([data-active])::before,
        :host([data-fading])::before {
            z-index: 1;
            border-radius: var(--ngp-ai-beam-border-radius);
            background: var(--ngp-ai-beam-inner-background);
            box-shadow: inset 0 0 9px 1px var(--ngp-ai-beam-inner-shadow);
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-inner-opacity) * var(--ngp-ai-beam-strength));
            clip-path: inset(0 round var(--ngp-ai-beam-border-radius));
        }

        :host([data-preset='sm'])::before {
            box-shadow: inset 0 0 5px 1px var(--ngp-ai-beam-inner-shadow);
        }

        :host([data-preset='sm'])::before {
            mask-image: conic-gradient(
                from var(--ngp-ai-beam-angle),
                transparent 0% 22%,
                rgb(255 255 255 / 12%) 28%,
                rgb(255 255 255 / 40%) 36%,
                white 46% 82%,
                rgb(255 255 255 / 40%) 88%,
                rgb(255 255 255 / 12%) 94%,
                transparent 97% 100%
            );
            mask-composite: add;
            -webkit-mask-image: conic-gradient(
                from var(--ngp-ai-beam-angle),
                transparent 0% 22%,
                rgb(255 255 255 / 12%) 28%,
                rgb(255 255 255 / 40%) 36%,
                white 46% 82%,
                rgb(255 255 255 / 40%) 88%,
                rgb(255 255 255 / 12%) 94%,
                transparent 97% 100%
            );
            -webkit-mask-composite: source-over;
        }

        :host([data-preset='md'])::before {
            mask-image:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            mask-composite: intersect, add;
            -webkit-mask-image:
                conic-gradient(
                    from var(--ngp-ai-beam-angle),
                    transparent 0% 30%,
                    rgb(255 255 255 / 10%) 36%,
                    rgb(255 255 255 / 35%) 44%,
                    white 52% 80%,
                    rgb(255 255 255 / 35%) 86%,
                    rgb(255 255 255 / 10%) 92%,
                    transparent 95% 100%
                ),
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            -webkit-mask-composite: source-in, source-over;
        }

        :host([data-preset='line'])::before {
            mask-image:
                radial-gradient(
                    ellipse calc(78px * var(--ngp-ai-beam-line-width)) calc(60px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%)
                        100%,
                    white 0%,
                    rgb(255 255 255 / 50%) 45%,
                    transparent 100%
                ),
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            mask-composite: intersect, add;
            -webkit-mask-image:
                radial-gradient(
                    ellipse calc(78px * var(--ngp-ai-beam-line-width)) calc(60px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%)
                        100%,
                    white 0%,
                    rgb(255 255 255 / 50%) 45%,
                    transparent 100%
                ),
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            -webkit-mask-composite: source-in, source-over;
        }

        :host([data-preset='pulse-inner'])::before {
            mask-image:
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            mask-composite: add;
            -webkit-mask-image:
                linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
                linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
            -webkit-mask-composite: source-over;
        }

        :host([data-preset='sm']:not([data-static]))::before,
        :host([data-preset='sm']:not([data-static]))::after,
        :host([data-preset='md']:not([data-static]))::before,
        :host([data-preset='md']:not([data-static]))::after,
        :host([data-preset='line']:not([data-static]))::before,
        :host([data-preset='line']:not([data-static]))::after {
            animation: ngp-ai-beam-hue-shift 12s ease-in-out infinite;
        }

        :host([data-static])::before,
        :host([data-static])::after {
            filter: brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
        }

        [data-ngp-ai-beam-bloom] {
            position: absolute;
            inset: 0;
            z-index: 3;
            display: none;
            border-radius: var(--ngp-ai-beam-border-radius);
            background: var(--ngp-ai-beam-bloom-background);
            opacity: 0;
            pointer-events: none;
        }

        :host([data-active]) [data-ngp-ai-beam-bloom],
        :host([data-fading]) [data-ngp-ai-beam-bloom] {
            display: block;
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-bloom-opacity) * var(--ngp-ai-beam-strength));
        }

        :host([data-preset='sm']) [data-ngp-ai-beam-bloom],
        :host([data-preset='md']) [data-ngp-ai-beam-bloom] {
            padding: var(--ngp-ai-beam-border-width);
            border-radius: max(0px, calc(var(--ngp-ai-beam-border-radius) - var(--ngp-ai-beam-border-width)));
            filter: blur(8px) brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
            mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
        }

        :host([data-preset='line'])::after,
        :host([data-preset='line'])::before {
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-edge) * var(--ngp-ai-beam-inner-opacity) * var(--ngp-ai-beam-strength));
        }

        :host([data-preset='line'])::after {
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-edge) * var(--ngp-ai-beam-stroke-opacity) * var(--ngp-ai-beam-strength));
        }

        :host([data-preset='line']) [data-ngp-ai-beam-bloom] {
            border-radius: max(0px, calc(var(--ngp-ai-beam-border-radius) - var(--ngp-ai-beam-border-width)));
            mask: radial-gradient(
                ellipse calc(84px * var(--ngp-ai-beam-line-width)) calc(110px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) 100%,
                white 0%,
                rgb(255 255 255 / 50%) 35%,
                transparent 100%
            );
            mask-composite: add;
            -webkit-mask: radial-gradient(
                ellipse calc(84px * var(--ngp-ai-beam-line-width)) calc(110px * var(--ngp-ai-beam-line-height)) at calc(var(--ngp-ai-beam-line-x) * 100%) 100%,
                white 0%,
                rgb(255 255 255 / 50%) 35%,
                transparent 100%
            );
            -webkit-mask-composite: source-over;
            opacity: calc(var(--ngp-ai-beam-opacity) * var(--ngp-ai-beam-edge) * var(--ngp-ai-beam-bloom-opacity) * var(--ngp-ai-beam-strength));
        }

        :host([data-preset='line'][data-palette='mono']) [data-ngp-ai-beam-bloom] {
            filter: blur(6px);
        }

        :host([data-preset='line']:not([data-static])) [data-ngp-ai-beam-bloom] {
            animation: ngp-ai-beam-hue-shift-bloom 8s ease-in-out infinite;
        }

        :host([data-preset='line'][data-static]) [data-ngp-ai-beam-bloom] {
            filter: brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
        }

        :host([data-preset='line'][data-palette='mono']) [data-ngp-ai-beam-bloom] {
            filter: blur(6px) brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
        }

        :host([data-preset='pulse-inner'])::before,
        :host([data-preset='pulse-inner'])::after,
        :host([data-preset='pulse-outside'])::after {
            will-change: opacity, filter;
            filter: hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-hue))) brightness(var(--ngp-ai-beam-brightness))
                saturate(var(--ngp-ai-beam-saturation));
        }

        :host([data-preset='pulse-inner']) [data-ngp-ai-beam-bloom] {
            padding: var(--ngp-ai-beam-border-width);
            will-change: opacity;
            filter: blur(var(--ngp-ai-beam-bloom-blur)) hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-hue)))
                brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
            mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            mask-composite: exclude;
            -webkit-mask:
                linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
        }

        :host([data-preset='pulse-outside'])::before {
            inset: -10px;
            z-index: -1;
            border-radius: calc(var(--ngp-ai-beam-border-radius) + 10px);
            transform: scale(0.95, 0.9);
            will-change: opacity, filter;
            filter: blur(var(--ngp-ai-beam-core-blur)) hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-hue)))
                brightness(var(--ngp-ai-beam-glow-brightness, var(--ngp-ai-beam-brightness)))
                saturate(var(--ngp-ai-beam-glow-saturate, var(--ngp-ai-beam-saturation)));
        }

        :host([data-preset='pulse-inner'][data-static])::before,
        :host([data-preset='pulse-inner'][data-static])::after,
        :host([data-preset='pulse-outside'][data-static])::after {
            filter: brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
        }

        :host([data-preset='pulse-outside']) [data-ngp-ai-beam-bloom] {
            inset: -30px;
            z-index: -1;
            border-radius: calc(var(--ngp-ai-beam-border-radius) + 30px);
            transform: scale(0.95, 0.9);
            will-change: opacity, filter;
            filter: blur(var(--ngp-ai-beam-bloom-blur)) hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-hue)))
                brightness(var(--ngp-ai-beam-glow-brightness, var(--ngp-ai-beam-brightness)))
                saturate(var(--ngp-ai-beam-glow-saturate, var(--ngp-ai-beam-saturation)));
        }

        :host([data-preset='pulse-inner'][data-static]) [data-ngp-ai-beam-bloom] {
            filter: blur(var(--ngp-ai-beam-bloom-blur)) brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
        }

        :host([data-preset='pulse-outside'][data-static])::before {
            filter: blur(var(--ngp-ai-beam-core-blur)) brightness(var(--ngp-ai-beam-glow-brightness, var(--ngp-ai-beam-brightness)))
                saturate(var(--ngp-ai-beam-glow-saturate, var(--ngp-ai-beam-saturation)));
        }

        :host([data-preset='pulse-outside'][data-static]) [data-ngp-ai-beam-bloom] {
            filter: blur(var(--ngp-ai-beam-bloom-blur)) brightness(var(--ngp-ai-beam-glow-brightness, var(--ngp-ai-beam-brightness)))
                saturate(var(--ngp-ai-beam-glow-saturate, var(--ngp-ai-beam-saturation)));
        }

        :host([data-reduced-motion][data-active]) {
            --ngp-ai-beam-opacity: 1;
            animation: none !important;
        }

        :host([data-reduced-motion])::before,
        :host([data-reduced-motion])::after,
        :host([data-reduced-motion]) [data-ngp-ai-beam-bloom] {
            animation: none !important;
        }

        @keyframes ngp-ai-beam-spin {
            to {
                --ngp-ai-beam-angle: 360deg;
            }
        }

        @keyframes ngp-ai-beam-fade-in {
            to {
                --ngp-ai-beam-opacity: 1;
            }
        }

        @keyframes ngp-ai-beam-fade-out {
            from {
                --ngp-ai-beam-opacity: 1;
            }
            to {
                --ngp-ai-beam-opacity: 0;
            }
        }

        @keyframes ngp-ai-beam-hue-shift {
            0%,
            100% {
                filter: hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) - var(--ngp-ai-beam-hue-range))) brightness(var(--ngp-ai-beam-brightness))
                    saturate(var(--ngp-ai-beam-saturation));
            }
            50% {
                filter: hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-hue-range))) brightness(var(--ngp-ai-beam-brightness))
                    saturate(var(--ngp-ai-beam-saturation));
            }
        }

        @keyframes ngp-ai-beam-hue-shift-bloom {
            0%,
            100% {
                filter: blur(8px) hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) - var(--ngp-ai-beam-line-bloom-hue-range)))
                    brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
            }
            50% {
                filter: blur(8px) hue-rotate(calc(var(--ngp-ai-beam-hue-base, 0deg) + var(--ngp-ai-beam-line-bloom-hue-range)))
                    brightness(var(--ngp-ai-beam-brightness)) saturate(var(--ngp-ai-beam-saturation));
            }
        }

        @keyframes ngp-ai-beam-travel {
            0% {
                --ngp-ai-beam-line-x: 0.06;
                --ngp-ai-beam-line-width: 0.5;
            }
            20% {
                --ngp-ai-beam-line-x: 0.25;
                --ngp-ai-beam-line-width: 1.1;
            }
            30% {
                --ngp-ai-beam-line-x: 0.35;
                --ngp-ai-beam-line-width: 1.3;
            }
            40% {
                --ngp-ai-beam-line-x: 0.44;
                --ngp-ai-beam-line-width: 1.45;
            }
            50% {
                --ngp-ai-beam-line-x: 0.5;
                --ngp-ai-beam-line-width: 1.5;
            }
            60% {
                --ngp-ai-beam-line-x: 0.56;
                --ngp-ai-beam-line-width: 1.45;
            }
            70% {
                --ngp-ai-beam-line-x: 0.65;
                --ngp-ai-beam-line-width: 1.3;
            }
            80% {
                --ngp-ai-beam-line-x: 0.75;
                --ngp-ai-beam-line-width: 1.1;
            }
            90% {
                --ngp-ai-beam-line-x: 0.85;
                --ngp-ai-beam-line-width: 0.8;
            }
            100% {
                --ngp-ai-beam-line-x: 0.94;
                --ngp-ai-beam-line-width: 0.5;
            }
        }

        @keyframes ngp-ai-beam-edge-fade {
            0%,
            12.5%,
            87.5%,
            100% {
                --ngp-ai-beam-edge: 0;
            }
            32.5%,
            67.5% {
                --ngp-ai-beam-edge: 1;
            }
        }

        @keyframes ngp-ai-beam-breathe {
            0%,
            100% {
                --ngp-ai-beam-line-height: 0.8;
            }
            25% {
                --ngp-ai-beam-line-height: 1.25;
            }
            55% {
                --ngp-ai-beam-line-height: 0.85;
            }
            80% {
                --ngp-ai-beam-line-height: 1.3;
            }
        }

        @keyframes ngp-ai-beam-spike {
            0%,
            100% {
                --ngp-ai-beam-spike: 0.8;
            }
            25% {
                --ngp-ai-beam-spike: 1.3;
            }
            50% {
                --ngp-ai-beam-spike: 0.9;
            }
            75% {
                --ngp-ai-beam-spike: 1.4;
            }
        }

        @keyframes ngp-ai-beam-spike2 {
            0%,
            100% {
                --ngp-ai-beam-spike2: 1.2;
            }
            25% {
                --ngp-ai-beam-spike2: 0.7;
            }
            50% {
                --ngp-ai-beam-spike2: 1.4;
            }
            75% {
                --ngp-ai-beam-spike2: 0.8;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.data-active]': 'showsActiveLayers() ? "" : null',
        '[attr.data-fading]': 'phase() === "deactivating" ? "" : null',
        '[attr.data-palette]': 'palette()',
        '[attr.data-paused]': 'paused() ? "" : null',
        '[attr.data-preset]': 'preset()',
        '[attr.data-reduced-motion]': 'reducedMotion() ? "" : null',
        '[attr.data-static]': 'resolvedStaticColors() ? "" : null',
        '[attr.data-theme]': 'resolvedTheme()',
        '[style.--ngp-ai-beam-bloom-background]': 'visualConfig().bloomBackground',
        '[style.--ngp-ai-beam-bloom-blur]': 'visualConfig().pulseBloomBlur + "px"',
        '[style.--ngp-ai-beam-bloom-opacity]': 'resolvedBloomOpacity()',
        '[style.--ngp-ai-beam-border-radius]': 'resolvedBorderRadius() + "px"',
        '[style.--ngp-ai-beam-border-width]': 'visualConfig().borderWidth + "px"',
        '[style.--ngp-ai-beam-brightness]': 'resolvedBrightness()',
        '[style.--ngp-ai-beam-core-blur]': 'visualConfig().pulseCoreBlur + "px"',
        '[style.--ngp-ai-beam-duration]': 'resolvedDuration() + "s"',
        '[style.--ngp-ai-beam-glow-scale-x]': 'glowScale().x',
        '[style.--ngp-ai-beam-glow-scale-y]': 'glowScale().y',
        '[style.--ngp-ai-beam-hue-range]': 'resolvedHueRange() + "deg"',
        '[style.--ngp-ai-beam-inner-background]': 'visualConfig().innerBackground',
        '[style.--ngp-ai-beam-inner-opacity]': 'resolvedInnerOpacity()',
        '[style.--ngp-ai-beam-inner-shadow]': 'visualConfig().innerShadow',
        '[style.--ngp-ai-beam-line-breathe-duration]': 'resolvedLineBreatheDuration()',
        '[style.--ngp-ai-beam-line-bloom-hue-range]': 'resolvedLineBloomHueRange()',
        '[style.--ngp-ai-beam-line-spike-duration]': 'resolvedLineSpikeDuration()',
        '[style.--ngp-ai-beam-line-spike2-duration]': 'resolvedLineSpike2Duration()',
        '[style.--ngp-ai-beam-saturation]': 'resolvedSaturation()',
        '[style.--ngp-ai-beam-strength]': 'resolvedStrength()',
        '[style.--ngp-ai-beam-stroke-background]': 'visualConfig().strokeBackground',
        '[style.--ngp-ai-beam-stroke-opacity]': 'resolvedStrokeOpacity()',
        '(animationend)': 'handleAnimationEnd($event)',
    },
})
export class AiBeamComponent {
    // #region Fields

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _driver = inject(AiBeamPulseDriverService);
    private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    private readonly _window: IAiBeamWindow | null;
    private readonly _initialized = signal(false);
    private readonly _autoTheme = signal<AiBeamResolvedTheme>('dark');
    private readonly _contentTemplate = signal<TemplateRef<unknown> | null>(null);
    private readonly _visible = signal(true);
    private readonly _detectedBorderRadius: WritableSignal<number | null> = signal(null);
    private readonly _glowScale = signal({ x: 1, y: 1 });
    private readonly _phase: WritableSignal<AiBeamPhase> = signal('inactive');
    private readonly _reducedMotion = signal(false);
    private _fallbackTimer: number | null = null;
    private _colorSchemeQuery: MediaQueryList | null = null;
    private _intersectionObserver: IntersectionObserver | null = null;
    private _mediaQuery: MediaQueryList | null = null;
    private _mutationObserver: MutationObserver | null = null;
    private _resizeObserver: ResizeObserver | null = null;

    // #endregion

    // #region Ctor

    public constructor() {
        this._window = inject(DOCUMENT).defaultView as IAiBeamWindow | null;

        effect(() => {
            if (this._initialized()) {
                this.synchronizeActive(this.active(), this._phase());
            }
        });
        effect((onCleanup) => {
            const config = this.pulseDriverConfig();
            if (!config || !this._initialized() || !this.showsActiveLayers() || !this._visible() || this._reducedMotion()) {
                return;
            }

            onCleanup(this._driver.register(this._element, config));
        });
        effect(() => {
            void this.preset();
            if (this._initialized()) {
                queueMicrotask(() => this.measureContent());
            }
        });

        afterNextRender(() => this.initialize());
        this._destroyRef.onDestroy(() => this.destroy());
    }

    // #endregion

    // #region Properties

    public readonly activated: OutputEmitterRef<void> = output<void>();
    public readonly active = input(true, { transform: booleanAttribute });
    public readonly bloomOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly borderRadius: InputSignal<number | null> = input<number | null>(null);
    public readonly brightness: InputSignal<number | null> = input<number | null>(null);
    public readonly deactivated: OutputEmitterRef<void> = output<void>();
    public readonly duration: InputSignal<number | null> = input<number | null>(null);
    public readonly hueRange = input(30);
    public readonly innerOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly palette = input<AiBeamPalette>('colorful');
    public readonly preset = input<AiBeamPreset>('md');
    public readonly saturation: InputSignal<number | null> = input<number | null>(null);
    public readonly staticColors = input(false, { transform: booleanAttribute });
    public readonly strength = input(1);
    public readonly strokeOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly theme = input<AiBeamTheme>('dark');

    protected readonly contentTemplate = this._contentTemplate.asReadonly();
    protected readonly glowScale = this._glowScale.asReadonly();
    protected readonly paused = computed(() => this._phase() === 'active' && !this._visible());
    protected readonly phase = this._phase.asReadonly();
    protected readonly reducedMotion = this._reducedMotion.asReadonly();
    protected readonly resolvedBloomOpacity = computed(() => this.normalize(this.bloomOpacity(), this.visualConfig().bloomOpacity, 0, 4));
    protected readonly resolvedBorderRadius = computed(() =>
        this.normalize(this.borderRadius() ?? this._detectedBorderRadius(), this.visualConfig().borderRadius, 0, 4096),
    );
    protected readonly resolvedBrightness = computed(() => this.normalize(this.brightness(), this.visualConfig().brightness, 0, 8));
    protected readonly resolvedDuration = computed(() => this.normalize(this.duration(), this.visualConfig().defaultDuration, 0.05, 3600));
    protected readonly resolvedHueRange = computed(() => Math.min(this.normalize(this.hueRange(), 30, 0, 360), this.preset() === 'line' ? 13 : 360));
    protected readonly resolvedInnerOpacity = computed(
        () => this.normalize(this.innerOpacity(), this.visualConfig().innerOpacity, 0, 4) * this.monoMultiplier(),
    );
    protected readonly resolvedLineBreatheDuration = computed(() => `${(this.resolvedDuration() * 1.3).toFixed(1)}s`);
    protected readonly resolvedLineBloomHueRange = computed(() => `${this.resolvedHueRange() + 10}deg`);
    protected readonly resolvedLineSpikeDuration = computed(() => `${(this.resolvedDuration() * 1.33).toFixed(1)}s`);
    protected readonly resolvedLineSpike2Duration = computed(() => `${(this.resolvedDuration() * 1.7).toFixed(1)}s`);
    protected readonly resolvedSaturation = computed(() => this.normalize(this.saturation(), this.visualConfig().saturation, 0, 8));
    protected readonly resolvedStaticColors = computed(() => this.staticColors() || this.palette() === 'mono');
    protected readonly resolvedStrength = computed(() => this.normalize(this.strength(), 1, 0, 1));
    protected readonly resolvedStrokeOpacity = computed(
        () => this.normalize(this.strokeOpacity(), this.visualConfig().strokeOpacity, 0, 4) * this.monoMultiplier(),
    );
    protected readonly resolvedTheme: Signal<AiBeamResolvedTheme> = computed(() => {
        const theme = this.theme();
        return theme === 'auto' ? this._autoTheme() : theme;
    });
    protected readonly showsActiveLayers = computed(() => this._phase() !== 'inactive');
    protected readonly visualConfig: Signal<IAiBeamVisualConfig> = computed(() =>
        createAiBeamVisualConfig(this.preset(), this.palette(), this.resolvedTheme()),
    );
    private readonly pulseDriverConfig: Signal<IAiBeamPulseDriverConfig | null> = computed(() =>
        createAiBeamPulseDriverConfig(this.preset(), this.resolvedTheme(), this.resolvedDuration(), this.resolvedStaticColors()),
    );

    // #endregion

    // #region Methods

    /**
     * Connects the structural shorthand's embedded template.
     *
     * @param template - Template rendered inside the beam wrapper.
     *
     * @internal
     */
    public setContentTemplate(template: TemplateRef<unknown>): void {
        this._contentTemplate.set(template);
    }

    protected handleAnimationEnd(event: AnimationEvent): void {
        if (event.target !== this._element) {
            return;
        }
        if (event.animationName === 'ngp-ai-beam-fade-in') {
            this.finishActivation();
        } else if (event.animationName === 'ngp-ai-beam-fade-out') {
            this.finishDeactivation();
        }
    }

    private destroy(): void {
        this.clearFallback();
        this._intersectionObserver?.disconnect();
        this._mutationObserver?.disconnect();
        this._resizeObserver?.disconnect();
        if (this._mediaQuery) {
            this._mediaQuery.removeEventListener('change', this.handleMotionPreference);
        }
        if (this._colorSchemeQuery) {
            this._colorSchemeQuery.removeEventListener('change', this.handleColorScheme);
        }
    }

    private finishActivation(): void {
        if (this._phase() !== 'activating') {
            return;
        }
        this.clearFallback();
        this._phase.set('active');
        this.activated.emit();
    }

    private finishDeactivation(): void {
        if (this._phase() !== 'deactivating') {
            return;
        }
        this.clearFallback();
        this._phase.set('inactive');
        this.deactivated.emit();
    }

    private readonly handleMotionPreference = (event: MediaQueryListEvent): void => {
        this._reducedMotion.set(event.matches);
        this.synchronizeActive(this.active(), this._phase());
    };

    private readonly handleColorScheme = (event: MediaQueryListEvent): void => {
        this._autoTheme.set(event.matches ? 'dark' : 'light');
    };

    private initialize(): void {
        this._initialized.set(true);
        this.initializeMotionPreference();
        this.observeVisibility();
        this.observeContent();
        this.measureContent();
        this.synchronizeActive(this.active(), this._phase());
    }

    private initializeMotionPreference(): void {
        this._mediaQuery = this._window?.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null;
        this._reducedMotion.set(this._mediaQuery?.matches ?? false);
        this._mediaQuery?.addEventListener('change', this.handleMotionPreference);
        this._colorSchemeQuery = this._window?.matchMedia?.('(prefers-color-scheme: dark)') ?? null;
        this._autoTheme.set(this._colorSchemeQuery?.matches ? 'dark' : 'light');
        this._colorSchemeQuery?.addEventListener('change', this.handleColorScheme);
    }

    private measureContent(): void {
        const child = this.contentElement();
        if (!child) {
            this._detectedBorderRadius.set(null);
            this._glowScale.set({ x: 1, y: 1 });
            return;
        }

        const radius = Number.parseFloat(this._window?.getComputedStyle(child).borderTopLeftRadius ?? '');
        this._detectedBorderRadius.set(Number.isFinite(radius) && radius > 0 ? radius : null);

        if (this.preset() !== 'pulse-outside') {
            this._glowScale.set({ x: 1, y: 1 });
            return;
        }

        const rectangle = child.getBoundingClientRect();
        if (rectangle.width > 0 && rectangle.height > 0) {
            this._glowScale.set({
                x: Number(this.clamp(rectangle.width / 350, 0.35, 4).toFixed(3)),
                y: Number(this.clamp(rectangle.height / 140, 0.35, 4).toFixed(3)),
            });
        }
    }

    private monoMultiplier(): number {
        return this.palette() === 'mono' ? 0.5 : 1;
    }

    private normalize(value: number | null, fallback: number, minimum: number, maximum: number): number {
        return this.clamp(typeof value === 'number' && Number.isFinite(value) ? value : fallback, minimum, maximum);
    }

    private clamp(value: number, minimum: number, maximum: number): number {
        return Math.max(minimum, Math.min(maximum, value));
    }

    private contentElement(): HTMLElement | null {
        return (Array.from(this._element.children).find((child) => !child.hasAttribute('data-ngp-ai-beam-bloom')) as HTMLElement | undefined) ?? null;
    }

    private observeContent(): void {
        const MutationObserverConstructor = this._window?.MutationObserver;
        const ResizeObserverConstructor = this._window?.ResizeObserver;
        if (MutationObserverConstructor) {
            const observer = new MutationObserverConstructor(() => {
                this.bindResizeObserver();
                this.measureContent();
            });
            observer.observe(this._element, { childList: true, subtree: false });
            const child = this.contentElement();
            if (child) {
                observer.observe(child, { attributes: true, attributeFilter: ['class', 'style'] });
            }
            this._mutationObserver = observer;
        }
        if (ResizeObserverConstructor) {
            this._resizeObserver = new ResizeObserverConstructor(() => this.measureContent());
            this.bindResizeObserver();
        }
    }

    private bindResizeObserver(): void {
        this._resizeObserver?.disconnect();
        const child = this.contentElement();
        if (child) {
            this._resizeObserver?.observe(child);
        }
    }

    private observeVisibility(): void {
        const IntersectionObserverConstructor = this._window?.IntersectionObserver;
        if (!IntersectionObserverConstructor) {
            return;
        }
        const observer = new IntersectionObserverConstructor((entries) => this._visible.set(entries.at(-1)?.isIntersecting ?? true), { rootMargin: '256px' });
        observer.observe(this._element);
        this._intersectionObserver = observer;
    }

    private scheduleFallback(callback: () => void, duration: number): void {
        this.clearFallback();
        if (this._reducedMotion() || !this._window) {
            queueMicrotask(callback);
            return;
        }
        this._fallbackTimer = this._window.setTimeout(callback, duration);
    }

    private clearFallback(): void {
        if (this._fallbackTimer !== null && this._window) {
            this._window.clearTimeout(this._fallbackTimer);
        }
        this._fallbackTimer = null;
    }

    private synchronizeActive(active: boolean, phase: AiBeamPhase): void {
        if (active && phase === 'inactive') {
            this._phase.set('activating');
            this.scheduleFallback(() => this.finishActivation(), 700);
        } else if (!active && (phase === 'active' || phase === 'activating')) {
            this._phase.set('deactivating');
            this.scheduleFallback(() => this.finishDeactivation(), 600);
        }
    }

    // #endregion
}
