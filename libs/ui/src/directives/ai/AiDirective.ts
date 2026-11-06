// #region Imports

import { booleanAttribute, DestroyRef, Directive, effect, ElementRef, inject, input, Renderer2, RendererStyleFlags2, type InputSignal } from '@angular/core';
import type { Variant } from '@pixel-brewery/mosaik-elements-foundation';
import type { AiAttention } from './AiAttention';

// #endregion

/**
 * Inline style state captured before the AI presentation became active.
 */
interface IAiStyleState {
    // #region Properties

    /** The `important` flag the host had set, if any. */
    readonly priority: string;

    /** The value the host had set. */
    readonly value: string;

    // #endregion
}

/**
 * Marks an element as AI-enhanced and applies the configured presentation to it.
 *
 * The directive is element-independent: variant-aware Mosaik controls react to the `variant`
 * attribute, and input controls additionally receive a border color through their design tokens, so
 * an AI-filled field stays visibly marked without focus. Everything the directive touches is
 * captured beforehand and handed back when the presentation is switched off or the host is
 * destroyed, which is what lets the marker stay on an element whose AI provenance changes.
 *
 * @public
 *
 * @example
 * ```html
 * <mosaik-textbox ngpAi [ngpAiEnabled]="isAiFilled()" />
 * <div ngpAi ngpAiAttention="pulse">AI result</div>
 * ```
 */
@Directive({
    selector: '[ngpAi]',
    exportAs: 'ngpAi',
})
export class AiDirective {
    // #region Fields

    /** Mosaik input tokens that keep the AI border visible without focus. */
    private static readonly BORDER_COLOR_PROPERTIES: ReadonlyArray<string> = ['--textbox-border-color', '--select-border-color'];

    private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _renderer: Renderer2 = inject(Renderer2);
    private readonly _initialBorderColors = new Map<string, IAiStyleState>();
    private _initialVariant: string | null = null;
    private _ownsVariant = false;
    private _ownsBorderColors = false;
    private _appliedPulseClass: string | null = null;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `AiDirective` class.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            if (!this.enabled() || !this.presentationEnabled()) {
                this.restorePresentation();

                return;
            }

            this.applyVariant(this.variant());
            this.applyBorderColor(this.borderColor());
            this.applyAttention(this.attention(), this.pulseClass());
        });

        this._destroyRef.onDestroy(() => this.restorePresentation());
    }

    // #endregion

    // #region Properties

    /**
     * Whether the AI presentation is active at all.
     *
     * @public
     * @readonly
     */
    public readonly enabled = input(true, { alias: 'ngpAi', transform: booleanAttribute });

    /**
     * Whether the presentation is currently enabled. This second input lets the marker stay on an
     * element whose AI provenance changes at runtime.
     *
     * @public
     * @readonly
     */
    public readonly presentationEnabled = input(true, { alias: 'ngpAiEnabled', transform: booleanAttribute });

    /**
     * Variant applied to the host while the presentation is active.
     *
     * @public
     * @readonly
     */
    public readonly variant: InputSignal<Variant> = input<Variant>('highlight', { alias: 'ngpAiVariant' });

    /**
     * Color written to the supported Mosaik input border tokens.
     *
     * @public
     * @readonly
     */
    public readonly borderColor = input('var(--mosaik-color-highlight-500)', { alias: 'ngpAiBorderColor' });

    /**
     * Attention treatment applied while the directive is active. Pulse is opt-in.
     *
     * @public
     * @readonly
     */
    public readonly attention: InputSignal<AiAttention> = input<AiAttention>('none', { alias: 'ngpAiAttention' });

    /**
     * Class added for the `pulse` attention treatment. It defaults to the motion-safe Tailwind
     * utility, so reduced-motion preferences are honored where Tailwind is present; supply your own
     * class name in an application that styles the pulse differently.
     *
     * @public
     * @readonly
     */
    public readonly pulseClass = input('motion-safe:animate-pulse', { alias: 'ngpAiPulseClass' });

    // #endregion

    // #region Methods

    /**
     * Applies the configured semantic variant to the host element.
     *
     * @param variant The variant to apply.
     */
    private applyVariant(variant: Variant): void {
        if (!this._ownsVariant) {
            this._initialVariant = this._elementRef.nativeElement.getAttribute('variant');
            this._ownsVariant = true;
        }

        this._renderer.setAttribute(this._elementRef.nativeElement, 'variant', variant);
    }

    /**
     * Writes the configured color to the Mosaik input design tokens.
     *
     * @param borderColor The border color to apply.
     */
    private applyBorderColor(borderColor: string): void {
        const element = this._elementRef.nativeElement;

        if (!this._ownsBorderColors) {
            for (const property of AiDirective.BORDER_COLOR_PROPERTIES) {
                this._initialBorderColors.set(property, {
                    priority: element.style.getPropertyPriority(property),
                    value: element.style.getPropertyValue(property),
                });
            }

            this._ownsBorderColors = true;
        }

        for (const property of AiDirective.BORDER_COLOR_PROPERTIES) {
            this._renderer.setStyle(element, property, borderColor, RendererStyleFlags2.DashCase);
        }
    }

    /**
     * Applies or removes the configured attention treatment.
     *
     * @param attention The attention treatment to apply.
     * @param pulseClass The class that carries the pulse.
     */
    private applyAttention(attention: AiAttention, pulseClass: string): void {
        if (attention !== 'pulse') {
            this.restoreAttention();

            return;
        }

        if (this._appliedPulseClass === pulseClass || this._elementRef.nativeElement.classList.contains(pulseClass)) {
            return;
        }

        this.restoreAttention();
        this._renderer.addClass(this._elementRef.nativeElement, pulseClass);
        this._appliedPulseClass = pulseClass;
    }

    /**
     * Hands every presentation this directive took over back to the host.
     */
    private restorePresentation(): void {
        this.restoreVariant();
        this.restoreBorderColors();
        this.restoreAttention();
    }

    /**
     * Restores the Mosaik border tokens the host had before activation.
     */
    private restoreBorderColors(): void {
        if (!this._ownsBorderColors) {
            return;
        }

        for (const property of AiDirective.BORDER_COLOR_PROPERTIES) {
            const initialStyle = this._initialBorderColors.get(property);

            if (!initialStyle?.value) {
                this._renderer.removeStyle(this._elementRef.nativeElement, property, RendererStyleFlags2.DashCase);
                continue;
            }

            const flags = initialStyle.priority === 'important' ? RendererStyleFlags2.DashCase | RendererStyleFlags2.Important : RendererStyleFlags2.DashCase;
            this._renderer.setStyle(this._elementRef.nativeElement, property, initialStyle.value, flags);
        }

        this._initialBorderColors.clear();
        this._ownsBorderColors = false;
    }

    /**
     * Restores the host's original variant attribute.
     */
    private restoreVariant(): void {
        if (!this._ownsVariant) {
            return;
        }

        if (this._initialVariant === null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'variant');
        } else {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'variant', this._initialVariant);
        }

        this._initialVariant = null;
        this._ownsVariant = false;
    }

    /**
     * Removes the pulse class again, but only the one this directive added itself.
     */
    private restoreAttention(): void {
        if (this._appliedPulseClass === null) {
            return;
        }

        this._renderer.removeClass(this._elementRef.nativeElement, this._appliedPulseClass);
        this._appliedPulseClass = null;
    }

    // #endregion
}
