// #region Imports

import {
    booleanAttribute,
    ComponentRef,
    Directive,
    effect,
    inject,
    input,
    output,
    TemplateRef,
    ViewContainerRef,
    type InputSignal,
    type OutputEmitterRef,
} from '@angular/core';
import type { AiBeamPalette } from './AiBeamPalette';
import type { AiBeamPreset } from './AiBeamPreset';
import { AiBeamComponent } from './AiBeamComponent';
import type { AiBeamTheme } from './AiBeamTheme';

// #endregion

/**
 * Structural shorthand that wraps its template in an {@link AiBeamComponent}, so a single element
 * gains an AI beam without an extra wrapper in the template.
 *
 * @public
 *
 * @example
 * ```html
 * <article *ngpAiBeam="'pulse-outside'; palette: 'ocean'; active: isThinking()">…</article>
 * ```
 */
@Directive({
    selector: '[ngpAiBeam]',
    exportAs: 'ngpAiBeam',
})
export class AiBeamDirective {
    // #region Fields

    private readonly _componentRef: ComponentRef<AiBeamComponent>;

    // #endregion

    // #region Ctor

    public constructor() {
        const templateRef = inject<TemplateRef<unknown>>(TemplateRef);
        const viewContainerRef = inject(ViewContainerRef);
        this._componentRef = viewContainerRef.createComponent(AiBeamComponent);
        this._componentRef.instance.setContentTemplate(templateRef);

        effect(() => {
            this._componentRef.setInput('preset', this.ngpAiBeam());
            this._componentRef.setInput('palette', this.ngpAiBeamPalette());
            this._componentRef.setInput('theme', this.ngpAiBeamTheme());
            this._componentRef.setInput('active', this.ngpAiBeamActive());
            this._componentRef.setInput('staticColors', this.ngpAiBeamStaticColors());
            this._componentRef.setInput('duration', this.ngpAiBeamDuration());
            this._componentRef.setInput('borderRadius', this.ngpAiBeamBorderRadius());
            this._componentRef.setInput('brightness', this.ngpAiBeamBrightness());
            this._componentRef.setInput('saturation', this.ngpAiBeamSaturation());
            this._componentRef.setInput('hueRange', this.ngpAiBeamHueRange());
            this._componentRef.setInput('strength', this.ngpAiBeamStrength());
            this._componentRef.setInput('strokeOpacity', this.ngpAiBeamStrokeOpacity());
            this._componentRef.setInput('innerOpacity', this.ngpAiBeamInnerOpacity());
            this._componentRef.setInput('bloomOpacity', this.ngpAiBeamBloomOpacity());
        });

        this._componentRef.instance.activated.subscribe(() => this.ngpAiBeamActivated.emit());
        this._componentRef.instance.deactivated.subscribe(() => this.ngpAiBeamDeactivated.emit());
    }

    // #endregion

    // #region Properties

    public readonly ngpAiBeam = input<AiBeamPreset>('md');
    public readonly ngpAiBeamActivated: OutputEmitterRef<void> = output<void>();
    public readonly ngpAiBeamActive = input(true, { transform: booleanAttribute });
    public readonly ngpAiBeamBloomOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamBorderRadius: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamBrightness: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamDeactivated: OutputEmitterRef<void> = output<void>();
    public readonly ngpAiBeamDuration: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamHueRange = input(30);
    public readonly ngpAiBeamInnerOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamPalette = input<AiBeamPalette>('colorful');
    public readonly ngpAiBeamSaturation: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamStaticColors = input(false, { transform: booleanAttribute });
    public readonly ngpAiBeamStrength = input(1);
    public readonly ngpAiBeamStrokeOpacity: InputSignal<number | null> = input<number | null>(null);
    public readonly ngpAiBeamTheme = input<AiBeamTheme>('dark');

    // #endregion
}
