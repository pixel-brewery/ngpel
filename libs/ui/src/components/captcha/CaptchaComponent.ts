// #region Imports

import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, inject, input, model, OnInit, output, signal } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnimateDirective, ButtonComponent, ErrorStateComponent, SuccessStateComponent, TextComponent } from '@pixel-brewery/mosaik-elements-angular';
import { CaptchaComponentIntl, provideCaptchaComponentIntl } from './CaptchaComponentIntl';
import type { CaptchaOperator } from './CaptchaOperator';
import { DEFAULT_CAPTCHA_OPERATORS } from './CaptchaOperator';
import type { ICaptchaChallenge } from './ICaptchaChallenge';
import type { ICaptchaInvalidEvent } from './ICaptchaInvalidEvent';
import type { CaptchaState } from './ICaptchaProps';
import type { ICaptchaVerifiedEvent } from './ICaptchaVerifiedEvent';

// #endregion

/**
 * Captcha component rendering a generated question with three answer options.
 *
 * @public
 */
@Component({
    selector: 'ngp-captcha',
    imports: [TextComponent, ButtonComponent, AnimateDirective, ErrorStateComponent, SuccessStateComponent],
    providers: [
        provideCaptchaComponentIntl({
            questionAdd: 'loc.captcha.question.add',
            questionSubtract: 'loc.captcha.question.subtract',
            questionMultiply: 'loc.captcha.question.multiply',
            verifiedMessage: 'loc.captcha.message.verified',
            invalidMessage: 'loc.captcha.message.invalid',
            retryLabel: 'loc.captcha.action.retry',
        }),
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CaptchaComponent),
            multi: true,
        },
    ],
    template: `
        @switch (state) {
            @case ('idle') {
                @if (challenge; as currentChallenge) {
                    @if (label()) {
                        <mosaik-text part="label" [text]="label()" [wrap]="true" />
                    }
                    <div part="challenge" class="flex flex-col gap-4" [mosaikAnimate]="'fadeIn'" [mosaikAnimateOptions]="{ duration: 200 }">
                        <mosaik-text part="question" [text]="currentChallenge.question" />
                        <div part="options" class="flex flex-row gap-2">
                            @for (option of currentChallenge.options; track option + ':' + $index) {
                                <mosaik-button
                                    part="button"
                                    class="flex-1"
                                    [label]="option.toString()"
                                    [value]="option"
                                    [variant]="'primary'"
                                    [disabled]="disabled()"
                                    [attr.aria-disabled]="disabled()"
                                    (click)="validate(option)"
                                />
                            }
                        </div>
                    </div>
                }
            }
            @case ('verified') {
                <div part="verified" class="text-(--mosaik-success-500)" [mosaikAnimate]="'fadeIn'" [mosaikAnimateOptions]="{ duration: 200 }">
                    <mosaik-success-state [header]="intl.verifiedMessage" [iconSize]="'small'" />
                </div>
            }
            @case ('invalid') {
                <div
                    part="invalid"
                    class="flex flex-col gap-4 text-(--mosaik-danger-500)"
                    [mosaikAnimate]="'fadeIn'"
                    [mosaikAnimateOptions]="{ duration: 200 }"
                >
                    <mosaik-error-state [header]="intl.invalidMessage" [iconSize]="'small'">
                        <mosaik-button
                            slot="actions"
                            part="retry-button"
                            class="self-center"
                            [label]="intl.retryLabel"
                            [appearance]="'solid'"
                            [variant]="'primary'"
                            [disabled]="disabled()"
                            (click)="retry()"
                        />
                    </mosaik-error-state>
                </div>
            }
        }
    `,
    styles: `
        :host {
            display: block;
        }

        :host [part='question'] {
            font-weight: bold;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.aria-disabled]': 'disabled()',
    },
})
export class CaptchaComponent implements OnInit, ControlValueAccessor {
    // #region Fields

    private readonly _intl: CaptchaComponentIntl = inject(CaptchaComponentIntl);
    private readonly _challenge = signal<ICaptchaChallenge | null>(null);
    private readonly _state = signal<CaptchaState>('idle');
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onChange: (value: number | null) => void = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private _onTouched: () => void = () => {};
    private readonly _instanceId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `CaptchaComponent` class.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const challenge = this._challenge();
            if (challenge) {
                this.challengeChange.emit(challenge);
            }
        });
    }

    // #endregion

    // #region Properties

    /**
     * Emitted when verification succeeds.
     *
     * @public
     * @readonly
     */
    public readonly verifiedEvent = output<ICaptchaVerifiedEvent>();

    /**
     * Emitted when verification fails.
     *
     * @public
     * @readonly
     */
    public readonly invalidEvent = output<ICaptchaInvalidEvent>();

    /** Emitted after the user requests a fresh security question. */
    public readonly retryEvent = output<void>();

    /**
     * Emitted when a new challenge is generated.
     *
     * @public
     * @readonly
     */
    public readonly challengeChange = output<ICaptchaChallenge>();

    /**
     * Emitted when verified state changes.
     *
     * @public
     * @readonly
     */
    public readonly verifiedChange = output<boolean>();

    /**
     * Selected answer value for Signal Forms integration.
     *
     * @public
     * @readonly
     */
    public readonly value = model<number | null>(null);

    /**
     * Unique identifier for the component.
     *
     * @public
     * @readonly
     */
    public readonly id = input<string | null>(null);

    /**
     * Optional label text displayed above the captcha.
     *
     * @public
     * @readonly
     */
    public readonly label = input('');

    /**
     * Disables answer selection.
     *
     * @public
     * @readonly
     */
    public readonly disabled = input(false);

    /**
     * Marks control as readonly.
     *
     * @public
     * @readonly
     */
    public readonly readonly = input(false);

    /**
     * Minimum number for challenge operands.
     *
     * @public
     * @readonly
     */
    public readonly minValue = input(1);

    /**
     * Maximum number for challenge operands.
     *
     * @public
     * @readonly
     */
    public readonly maxValue = input(9);

    /**
     * Operators to use for challenges.
     *
     * @public
     * @readonly
     */
    public readonly operators = input<ReadonlyArray<CaptchaOperator>>(DEFAULT_CAPTCHA_OPERATORS);

    /**
     * Resolved unique identifier.
     *
     * @protected
     * @readonly
     */
    protected readonly resolvedId = computed(() => {
        const explicitId = this.id();
        return explicitId?.trim() ? explicitId : `captcha-${this._instanceId}`;
    });

    /**
     * Current captcha challenge.
     *
     * @public
     * @readonly
     */
    public get challenge(): ICaptchaChallenge | null {
        return this._challenge();
    }

    /**
     * Current component state.
     *
     * @public
     * @readonly
     */
    public get state(): CaptchaState {
        return this._state();
    }

    /**
     * Indicates whether the captcha has been verified.
     *
     * @public
     * @readonly
     */
    public get verified(): boolean {
        return this._state() === 'verified';
    }

    /**
     * Indicates whether the last answer was invalid.
     *
     * @public
     * @readonly
     */
    public get isInvalidAnswer(): boolean {
        return this._state() === 'invalid';
    }

    /**
     * Internationalization labels used by the captcha.
     *
     * @public
     * @readonly
     */
    public get intl(): CaptchaComponentIntl {
        return this._intl;
    }

    // #endregion

    // #region Methods

    /**
     * Validates selected answer and emits result.
     *
     * @public
     * @param answer - Selected answer option.
     */
    public validate(answer: number): void {
        if (this.disabled() || this.readonly()) {
            return;
        }

        const currentChallenge = this._challenge();
        if (!currentChallenge) {
            return;
        }

        const isValid = answer === currentChallenge.answer;

        if (isValid) {
            this.value.set(answer);
            this._onChange(answer);
            this._onTouched();
            this._state.set('verified');
            this.verifiedChange.emit(true);
            this.verifiedEvent.emit({
                answer,
                challenge: currentChallenge,
            });
        } else {
            this._state.set('invalid');
            this._onTouched();
            this.verifiedChange.emit(false);
            this.invalidEvent.emit({
                answer,
                challenge: currentChallenge,
            });
        }
    }

    /**
     * Generates a new challenge and resets the state.
     *
     * @public
     */
    public retry(): void {
        if (this.disabled()) {
            return;
        }

        this.generateCaptcha();
        this._state.set('idle');
        this.value.set(null);
        this._onChange(null);
        this.retryEvent.emit();
    }

    /**
     * Initializes the first captcha challenge.
     *
     * @internal
     */
    public ngOnInit(): void {
        this.generateCaptcha();
    }

    private generateCaptcha(): void {
        const minVal = Math.min(this.minValue(), this.maxValue());
        const maxVal = Math.max(this.minValue(), this.maxValue());
        const operator = this.randomOperator();

        const left = this.randomInt(minVal, maxVal);
        const right = this.randomInt(minVal, maxVal);

        const challenge = this.createChallenge(left, right, operator);
        this._challenge.set(challenge);
    }

    private createChallenge(left: number, right: number, operator: CaptchaOperator): ICaptchaChallenge {
        let question: string;
        let answer: number;

        switch (operator) {
            case 'subtract': {
                let greater = Math.max(left, right);
                const smaller = Math.min(left, right);

                // Ensure answer is never 0 (required() validator treats 0 as falsy)
                if (greater === smaller) {
                    greater = smaller + 1;
                }

                question = this.intl.questionSubtract.replace('{0}', greater.toString()).replace('{1}', smaller.toString());
                answer = greater - smaller;
                break;
            }
            case 'multiply':
                question = this.intl.questionMultiply.replace('{0}', left.toString()).replace('{1}', right.toString());
                answer = left * right;
                break;
            case 'add':
            default:
                question = this.intl.questionAdd.replace('{0}', left.toString()).replace('{1}', right.toString());
                answer = left + right;
                break;
        }

        return {
            question,
            answer,
            options: this.generateOptions(answer),
            operator,
        };
    }

    private generateOptions(correctAnswer: number): ReadonlyArray<number> {
        const options = new Set<number>();
        options.add(correctAnswer);

        while (options.size < 3) {
            const offset = this.randomInt(-2, 2);
            const wrongAnswer = correctAnswer + (offset === 0 ? 1 : offset);
            if (wrongAnswer >= 0) {
                options.add(wrongAnswer);
            }
        }

        return Array.from(options).sort(() => Math.random() - 0.5);
    }

    private randomOperator(): CaptchaOperator {
        const availableOperators = this.operators().length > 0 ? this.operators() : DEFAULT_CAPTCHA_OPERATORS;
        return availableOperators[this.randomInt(0, availableOperators.length - 1)] ?? 'add';
    }

    private randomInt(minValue: number, maxValue: number): number {
        const normalizedMin = Math.ceil(minValue);
        const normalizedMax = Math.floor(maxValue);
        return Math.floor(Math.random() * (normalizedMax - normalizedMin + 1)) + normalizedMin;
    }

    /**
     * Writes a new value from the form model.
     *
     * @param value - The value to write.
     * @public
     */
    public writeValue(value: number | null): void {
        this.value.set(value);
        if (value !== null) {
            this._state.set('verified');
        } else {
            this._state.set('idle');
        }
    }

    /**
     * Registers a callback for value changes.
     *
     * @param fn - The callback function.
     * @public
     */
    public registerOnChange(fn: (value: number | null) => void): void {
        this._onChange = fn;
    }

    /**
     * Registers a callback for touch events.
     *
     * @param fn - The callback function.
     * @public
     */
    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    // #endregion
}
