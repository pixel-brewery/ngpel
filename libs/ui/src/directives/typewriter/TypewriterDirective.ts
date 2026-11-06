// #region Imports

import { DestroyRef, Directive, ElementRef, effect, inject, input, signal } from '@angular/core';

// #endregion

const DEFAULT_TYPING_SPEED = 7;
const MAX_TIMER_DURATION = 2_147_483_647;
const NEXT_TEXT_DELAY = 500;

/**
 * An element that renders its text through a `text` property rather than through child nodes, the
 * way the Mosaik text element does.
 */
interface ITextElement extends HTMLElement {
    text?: string;
}

/**
 * Types one or more text values into its host, character by character, and optionally rotates
 * through them.
 *
 * The host keeps a zero-width space in front of the typed text, so an empty phase does not collapse
 * the line height. An element that exposes a `text` property — the Mosaik text element does — is
 * written through that property, every other element through its text content.
 *
 * @public
 *
 * @example
 * ```html
 * <span [ngpTypewriter]="['Search orders', 'Search invoices']" [holdDuration]="2000"></span>
 * ```
 */
@Directive({
    selector: '[ngpTypewriter]',
})
export class TypewriterDirective {
    // #region Fields

    private readonly _elementRef = inject<ElementRef<ITextElement>>(ElementRef);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _text = signal('');
    private readonly _rotatingTexts = signal<ReadonlyArray<string>>([]);
    private _timerId: ReturnType<typeof setTimeout> | undefined;
    private _loopCount = 0;
    private _isDeleting = false;

    // #endregion

    // #region Ctor

    public constructor() {
        effect(() => {
            const values = normalizeTexts(this.text());

            this._rotatingTexts.set(values);
            this.reset();
            this.scheduleTick(0);
        });

        effect(() => {
            const element = this._elementRef.nativeElement;
            const value = `\u200B${this._text()}`;

            if ('text' in element) {
                element.text = value;
            } else {
                element.textContent = value;
            }
        });

        this._destroyRef.onDestroy(() => this.clearTimer());
    }

    // #endregion

    // #region Properties

    /**
     * Text or text values typed in the supplied order. Several values rotate: each one is typed,
     * held and deleted again before the next one starts.
     *
     * @public
     * @readonly
     */
    public readonly text = input.required<string | ReadonlyArray<string>>({ alias: 'ngpTypewriter' });

    /**
     * Number of characters typed per second.
     *
     * @public
     * @readonly
     */
    public readonly typingSpeed = input(DEFAULT_TYPING_SPEED, {
        transform: (value: number | string | null | undefined): number => normalizeTypingSpeed(value),
    });

    /**
     * Time in milliseconds that a completed text remains visible before deletion starts.
     * Omitting the duration leaves the completed text visible.
     *
     * @public
     * @readonly
     */
    public readonly holdDuration = input<number | undefined, number | string | null | undefined>(undefined, {
        transform: (value: number | string | null | undefined): number | undefined => normalizeHoldDuration(value),
    });

    // #endregion

    // #region Methods

    private tick(): void {
        const texts = this._rotatingTexts();

        if (texts.length === 0) {
            this._text.set('');
            this.clearTimer();
            return;
        }

        const fullText = texts[this._loopCount % texts.length] ?? '';
        const currentText = this._text();
        const nextText = this._isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1);

        this._text.set(nextText);

        let delay = 1000 / this.typingSpeed();

        if (this._isDeleting) {
            delay /= 2;
        }

        if (!this._isDeleting && nextText === fullText) {
            const holdDuration = this.holdDuration();

            if (holdDuration === undefined) {
                this.clearTimer();
                return;
            }

            delay = holdDuration;
            this._isDeleting = true;
        } else if (this._isDeleting && nextText === '') {
            this._isDeleting = false;
            this._loopCount++;
            delay = NEXT_TEXT_DELAY;
        }

        this.scheduleTick(delay);
    }

    private scheduleTick(delay: number): void {
        this.clearTimer();
        this._timerId = setTimeout(() => this.tick(), delay);
    }

    private clearTimer(): void {
        if (this._timerId === undefined) {
            return;
        }

        clearTimeout(this._timerId);
        this._timerId = undefined;
    }

    private reset(): void {
        this._loopCount = 0;
        this._isDeleting = false;
        this._text.set('');
    }

    // #endregion
}

function normalizeTypingSpeed(value: number | string | null | undefined): number {
    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TYPING_SPEED;
}

function normalizeHoldDuration(value: number | string | null | undefined): number | undefined {
    if (value === null || value === undefined || value === '') {
        return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed >= 0 ? Math.min(parsed, MAX_TIMER_DURATION) : undefined;
}

function normalizeTexts(value: string | ReadonlyArray<string>): ReadonlyArray<string> {
    const values: ReadonlyArray<unknown> = Array.isArray(value) ? value : [value];

    return values.filter((text): text is string => typeof text === 'string' && text.length > 0);
}
