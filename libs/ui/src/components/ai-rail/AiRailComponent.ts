// #region Imports

import {
    ChangeDetectionStrategy,
    Component,
    computed,
    contentChildren,
    effect,
    inject,
    input,
    signal,
    type InputSignal,
    type Signal,
    type WritableSignal,
} from '@angular/core';
import {
    AnimateDirective,
    BadgeComponent,
    BannerComponent,
    ButtonComponent,
    CompoundButtonComponent,
    IconNameDirective,
    PromptBoxComponent,
    PromptBoxVoiceRecorderToolComponent,
    SelectComponent,
    SelectItemComponent,
    SkeletonComponent,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { CommandDirective } from '@pixel-brewery/ngpel-mvp';
import { command, type Command } from '@pixel-brewery/ngpel-mvp';
import { AiRailComponentIntl, provideAiRailComponentIntl } from './AiRailComponentIntl';
import { TypewriterDirective } from '../../directives/typewriter/TypewriterDirective';
import { VoiceRecorderDirective } from '../../directives/voice-recorder/VoiceRecorderDirective';
import { SectionComponent } from '../section/SectionComponent';
import { SectionContentComponent } from '../section/SectionContentComponent';
import { SectionHeaderComponent } from '../section/SectionHeaderComponent';
import { AiRailChoiceComponent } from './AiRailChoiceComponent';
import type { AiRailBadgeVariant } from './AiRailBadgeVariant';
import { AiRailChoiceType } from './AiRailChoiceType';
import { AiRailSection, type AiRailSection as AiRailSectionValue } from './AiRailSection';
import { mapAiRailPromptSubmittedEvent } from './mapAiRailPromptSubmittedEvent';
import { mapAiRailSelectionChangedEvent } from './mapAiRailSelectionChangedEvent';

// #endregion

/**
 * Renders a declaratively configured, inline AI interaction inside a drawer rail.
 *
 * @public
 */
@Component({
    selector: 'ngp-ai-rail',
    imports: [
        AnimateDirective,
        BadgeComponent,
        BannerComponent,
        ButtonComponent,
        CommandDirective,
        CompoundButtonComponent,
        SectionComponent,
        SectionContentComponent,
        SectionHeaderComponent,
        IconNameDirective,
        PromptBoxComponent,
        PromptBoxVoiceRecorderToolComponent,
        SelectComponent,
        SelectItemComponent,
        SkeletonComponent,
        TextComponent,
        TypewriterDirective,
        VoiceRecorderDirective,
    ],
    template: `
        <div class="flex min-h-0 flex-col gap-4">
            @if (section() === sections.CHOICES) {
                <div class="flex flex-col gap-4" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
                    <ngp-section>
                        <ngp-section-header [header]="header()" [description]="description()" />
                        <ngp-section-content>
                            <div class="flex flex-col gap-3">
                                @for (choice of choices(); track choice.key()) {
                                    <mosaik-compound-button
                                        [attr.test-id]="choice.testId() || null"
                                        [label]="choice.label()"
                                        [subLabel]="choice.description()"
                                        [iconName]="choice.icon()"
                                        [isNavigation]="true"
                                        [appearance]="'solid'"
                                        [horizontalContentAlignment]="'left'"
                                        [disabled]="!canExecuteChoice(choice)"
                                        [ngpCommand]="{ click: selectChoiceCommand }"
                                        [ngpCommandParameter]="choice"
                                    />
                                }
                            </div>

                            <section class="flex flex-col gap-2" [attr.aria-label]="explanationTitle()">
                                <mosaik-text class="font-semibold" [text]="explanationTitle()" [wrap]="true" [readonly]="true" />
                                <ul class="list-disc space-y-2 pl-5">
                                    @for (item of explanationItems(); track item) {
                                        <li>
                                            <mosaik-text class="text-sm" [text]="item" [wrap]="true" [readonly]="true" />
                                        </li>
                                    }
                                </ul>
                            </section>
                        </ngp-section-content>
                    </ngp-section>
                </div>
            } @else if (section() === sections.CONFIGURATION) {
                @if (activeChoice(); as choice) {
                    <div class="flex flex-col gap-4" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
                        <ngp-section>
                            <mosaik-button
                                class="self-start"
                                [label]="backLabel()"
                                [iconName]="'arrowLeft'"
                                [appearance]="'plain'"
                                [ngpCommand]="{ click: backCommand }"
                            />
                            <ngp-section-header [header]="choice.label()" [description]="choice.description()" />
                            <ngp-section-content>
                                <div class="flex flex-col gap-3">
                                    @for (field of choice.configurationFields(); track field.key) {
                                        <mosaik-select
                                            class="w-full"
                                            [attr.test-id]="field.testId || null"
                                            [value]="configurationValues()[field.key]"
                                            [label]="field.label"
                                            [variant]="'primary'"
                                            [disabled]="field.disabled ?? false"
                                            [showFilter]="field.showFilter ?? true"
                                            (selectionChanged)="changeConfigurationValue(field.key, $event)"
                                        >
                                            @for (option of field.options; track option.value) {
                                                <mosaik-select-item [value]="option.value" [label]="option.label" />
                                            }
                                        </mosaik-select>
                                    }
                                </div>
                                <mosaik-button
                                    [attr.test-id]="choice.testId() ? choice.testId() + '-submit' : null"
                                    [label]="choice.configurationSubmitLabel()"
                                    [iconName]="choice.icon()"
                                    [appearance]="'solid'"
                                    [variant]="'highlight'"
                                    [disabled]="!submitConfigurationCommand.canExecute()"
                                    [ngpCommand]="{ click: submitConfigurationCommand }"
                                />
                            </ngp-section-content>
                        </ngp-section>
                    </div>
                }
            } @else if (section() === sections.PROMPT) {
                @if (activeChoice(); as choice) {
                    <div class="flex flex-col gap-4" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
                        <ngp-section>
                            <mosaik-button
                                class="self-start"
                                [label]="backLabel()"
                                [iconName]="'arrowLeft'"
                                [appearance]="'plain'"
                                [ngpCommand]="{ click: backCommand }"
                            />
                            <ngp-section-header [header]="choice.label()" [description]="choice.description()" />
                            <ngp-section-content>
                                <mosaik-prompt-box
                                    [appearance]="'outline'"
                                    [placeholder]="choice.promptPlaceholder()"
                                    [minRows]="5"
                                    [maxRows]="12"
                                    [minlength]="choice.minimumPromptLength()"
                                    [maxlength]="choice.maximumPromptLength()"
                                    [required]="choice.minimumPromptLength() > 0"
                                    [showSubmitButton]="true"
                                    [submitOnEnter]="false"
                                    [autofocus]="true"
                                    [variant]="'highlight'"
                                    [ngpCommand]="{ promptSubmitted: submitPromptCommand }"
                                    [ngpCommandParameterFromEvent]="mapPromptSubmittedEvent"
                                >
                                    <mosaik-prompt-box-voice-recorder-tool ngpVoiceRecorder />
                                </mosaik-prompt-box>
                            </ngp-section-content>
                        </ngp-section>
                    </div>
                }
            } @else if (section() === sections.BUSY) {
                <div class="flex flex-col gap-4" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
                    <ngp-section>
                        <ngp-section-header [header]="activeChoice()?.label() ?? header()" [description]="activeChoice()?.description() ?? description()" />
                        <ngp-section-content>
                            <div class="flex flex-col gap-4" role="status" aria-busy="true" [attr.aria-label]="loadingLabel() || null">
                                <div class="flex flex-col gap-2">
                                    <mosaik-skeleton [height]="'20px'" [width]="'42%'" [shimmer]="true" />
                                    <mosaik-skeleton [height]="'64px'" [width]="'100%'" [shimmer]="true" />
                                    <mosaik-skeleton [height]="'48px'" [width]="'100%'" [shimmer]="true" />
                                </div>
                                <mosaik-text
                                    ngpTypewriter
                                    [text]="$any(waitingPrompts())"
                                    [typingSpeed]="80"
                                    [holdDuration]="60000"
                                    [formatter]="'richtext'"
                                    [wrap]="true"
                                    [readonly]="true"
                                />
                            </div>
                        </ngp-section-content>
                    </ngp-section>
                </div>
            } @else {
                <div class="flex flex-col gap-4" [mosaikAnimate]="'fadeSlideInRight'" [mosaikAnimateOptions]="{ duration: 240 }">
                    <ngp-section>
                        <mosaik-button
                            class="self-start"
                            [label]="backLabel()"
                            [iconName]="'arrowLeft'"
                            [appearance]="'plain'"
                            [size]="'small'"
                            [ngpCommand]="{ click: backCommand }"
                        />
                        <ngp-section-header [header]="activeChoice()?.label() ?? header()" [description]="activeChoice()?.description() ?? description()" />
                        <ngp-section-content>
                            @if (hasResult()) {
                                <div class="flex flex-col gap-4">
                                    <div class="flex flex-wrap items-center gap-2">
                                        @if (statusLabel()) {
                                            <mosaik-badge [label]="statusLabel()" [appearance]="'soft'" [variant]="statusVariant()" />
                                        }
                                        @if (sourceLabel()) {
                                            <mosaik-badge [label]="sourceLabel()" [appearance]="'soft'" [variant]="'neutral'" />
                                        }
                                        <ng-content select="[ngpAiRailSummary]" />
                                    </div>

                                    @if (isOutdated() && outdatedText()) {
                                        <mosaik-banner
                                            [isOpen]="true"
                                            [appearance]="'soft'"
                                            [variant]="'warning'"
                                            [icon]="'warning'"
                                            [iconSize]="'small'"
                                            [header]="outdatedText()"
                                        />
                                    }
                                    @if (isFallback() && fallbackText()) {
                                        <mosaik-banner
                                            [isOpen]="true"
                                            [appearance]="'soft'"
                                            [variant]="'info'"
                                            [icon]="'info'"
                                            [iconSize]="'small'"
                                            [header]="fallbackText()"
                                        />
                                    }
                                    @if (isPartial() && partialText()) {
                                        <mosaik-banner
                                            [isOpen]="true"
                                            [appearance]="'soft'"
                                            [variant]="'warning'"
                                            [icon]="'warning'"
                                            [iconSize]="'small'"
                                            [header]="partialText()"
                                        />
                                    }

                                    <ng-content select="[ngpAiRailResult]" />
                                </div>
                            } @else {
                                <div class="rounded-sm border border-dashed border-(--mosaik-scheme-highlight) p-4">
                                    <mosaik-text class="text-sm" [wrap]="true" [readonly]="true" [text]="emptyText()" />
                                </div>
                            }
                        </ngp-section-content>
                    </ngp-section>
                </div>
            }

            <ng-content select="ngp-ai-rail-choice" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideAiRailComponentIntl({
            backLabel: 'loc.aiRail.backLabel',
        }),
    ],
})
export class AiRailComponent {
    // #region Fields

    private readonly _intl: AiRailComponentIntl = inject(AiRailComponentIntl, { optional: true }) ?? new AiRailComponentIntl();
    private readonly _activeChoice: WritableSignal<AiRailChoiceComponent | null> = signal<AiRailChoiceComponent | null>(null);
    private readonly _configurationValues: WritableSignal<Readonly<Record<string, string>>> = signal({});
    private readonly _requestPending: WritableSignal<boolean> = signal(false);
    private readonly _section: WritableSignal<AiRailSectionValue> = signal<AiRailSectionValue>(AiRailSection.CHOICES);

    // #endregion

    // #region Ctor

    /**
     * Constructs a new AI rail and synchronizes requests with its busy and result sections.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            if (!this._requestPending()) {
                return;
            }

            if (this.loading()) {
                this._section.set(AiRailSection.BUSY);
                return;
            }

            this._requestPending.set(false);
            if (this.hasResult()) {
                this._section.set(AiRailSection.RESULT);
                return;
            }

            this._section.set(
                this._activeChoice()?.type() === AiRailChoiceType.PROMPT
                    ? AiRailSection.PROMPT
                    : this._activeChoice()?.type() === AiRailChoiceType.CONFIGURATION
                      ? AiRailSection.CONFIGURATION
                      : AiRailSection.CHOICES,
            );
        });
    }

    // #endregion

    // #region Properties

    /**
     * Choice section headline.
     *
     * @public
     * @readonly
     */
    public readonly header: InputSignal<string> = input.required<string>();

    /**
     * Choice section description.
     *
     * @public
     * @readonly
     */
    public readonly description: InputSignal<string> = input.required<string>();

    /**
     * Heading for the contextual explanation shown below the available choices.
     *
     * @public
     * @readonly
     */
    public readonly explanationTitle: InputSignal<string> = input.required<string>();

    /**
     * Context-specific explanation points for the AI interaction.
     *
     * @public
     * @readonly
     */
    public readonly explanationItems: InputSignal<ReadonlyArray<string>> = input.required<ReadonlyArray<string>>();

    /**
     * Label of the inline back action.
     *
     * @public
     * @readonly
     */
    public readonly backLabel: InputSignal<string> = input(this._intl.backLabel);

    /**
     * Indicates whether the feature-owned AI operation is running.
     *
     * @public
     * @readonly
     */
    public readonly loading: InputSignal<boolean> = input(false);

    /**
     * Accessible label for the busy section.
     *
     * @public
     * @readonly
     */
    public readonly loadingLabel: InputSignal<string> = input('');

    /**
     * Typewriter messages displayed while waiting.
     *
     * @public
     * @readonly
     */
    public readonly waitingPrompts: InputSignal<ReadonlyArray<string>> = input<ReadonlyArray<string>>([]);

    /**
     * Indicates whether projected result content is available.
     *
     * @public
     * @readonly
     */
    public readonly hasResult: InputSignal<boolean> = input(false);

    /**
     * Result status label.
     *
     * @public
     * @readonly
     */
    public readonly statusLabel: InputSignal<string> = input('');

    /**
     * Result status appearance.
     *
     * @public
     * @readonly
     */
    public readonly statusVariant: InputSignal<AiRailBadgeVariant> = input<AiRailBadgeVariant>('neutral');

    /**
     * Result source label.
     *
     * @public
     * @readonly
     */
    public readonly sourceLabel: InputSignal<string> = input('');

    /**
     * Indicates whether the result no longer matches the current form state.
     *
     * @public
     * @readonly
     */
    public readonly isOutdated: InputSignal<boolean> = input(false);

    /**
     * Text displayed for an outdated result.
     *
     * @public
     * @readonly
     */
    public readonly outdatedText: InputSignal<string> = input('');

    /**
     * Indicates whether the result was produced by a fallback strategy.
     *
     * @public
     * @readonly
     */
    public readonly isFallback: InputSignal<boolean> = input(false);

    /**
     * Text displayed for a fallback result.
     *
     * @public
     * @readonly
     */
    public readonly fallbackText: InputSignal<string> = input('');

    /**
     * Indicates whether only a partial result is available.
     *
     * @public
     * @readonly
     */
    public readonly isPartial: InputSignal<boolean> = input(false);

    /**
     * Text displayed for a partial result.
     *
     * @public
     * @readonly
     */
    public readonly partialText: InputSignal<string> = input('');

    /**
     * Message shown when a completed operation has no result.
     *
     * @public
     * @readonly
     */
    public readonly emptyText: InputSignal<string> = input('');

    /**
     * Declaratively supplied headless choices.
     *
     * @protected
     * @readonly
     */
    protected readonly choices: Signal<ReadonlyArray<AiRailChoiceComponent>> = contentChildren(AiRailChoiceComponent);

    /**
     * Currently selected prompt choice.
     *
     * @protected
     * @readonly
     */
    protected readonly activeChoice: Signal<AiRailChoiceComponent | null> = this._activeChoice.asReadonly();

    /** Current configurable choice values. */
    protected readonly configurationValues: Signal<Readonly<Record<string, string>>> = this._configurationValues.asReadonly();

    /**
     * Current inline rail section.
     *
     * @protected
     * @readonly
     */
    protected readonly section: Signal<AiRailSectionValue> = this._section.asReadonly();

    /**
     * Exposes section constants to the component template.
     *
     * @protected
     * @readonly
     */
    protected readonly sections: typeof AiRailSection = AiRailSection;

    /**
     * Selects a declarative choice.
     *
     * @protected
     * @readonly
     */
    protected readonly selectChoiceCommand: Command<AiRailChoiceComponent> = command<AiRailChoiceComponent>((choice) => {
        this.selectChoice(choice);
    });

    /**
     * Submits the active free-text prompt.
     *
     * @protected
     * @readonly
     */
    protected readonly submitPromptCommand: Command<string> = command<string>(
        (prompt) => {
            this.submitPrompt(prompt);
        },
        computed(() => this._activeChoice()?.executeCommand()?.canExecute() ?? false),
    );

    /** Submits the active configurable choice. */
    protected readonly submitConfigurationCommand: Command<void> = command<void>(
        () => this.submitConfiguration(),
        computed(() => {
            const choice = this._activeChoice();
            return (
                choice?.type() === AiRailChoiceType.CONFIGURATION &&
                choice.configurationFields().every((field) => Boolean(this._configurationValues()[field.key])) &&
                Boolean(choice.configurationExecuteCommand()?.canExecute())
            );
        }),
    );

    /**
     * Returns to the declarative choice list.
     *
     * @protected
     * @readonly
     */
    protected readonly backCommand: Command<void> = command<void>(() => {
        this.showChoices();
    });

    /**
     * Maps Prompt Box events into command parameters.
     *
     * @protected
     * @readonly
     */
    protected readonly mapPromptSubmittedEvent: (event: unknown) => string = mapAiRailPromptSubmittedEvent;

    // #endregion

    // #region Methods

    /** Returns whether one choice currently exposes an executable command. */
    protected canExecuteChoice(choice: AiRailChoiceComponent): boolean {
        return choice.type() === AiRailChoiceType.CONFIGURATION
            ? (choice.configurationExecuteCommand()?.canExecute() ?? false)
            : (choice.executeCommand()?.canExecute() ?? false);
    }

    /** Updates one configurable choice value from a Mosaik selection event. */
    protected changeConfigurationValue(key: string, event: unknown): void {
        const value = mapAiRailSelectionChangedEvent(event);
        if (value === null) {
            return;
        }
        this._configurationValues.update((current) => ({ ...current, [key]: value }));
    }

    private selectChoice(choice: AiRailChoiceComponent): void {
        this._activeChoice.set(choice);
        if (choice.type() === AiRailChoiceType.PROMPT) {
            this._section.set(AiRailSection.PROMPT);
            return;
        }
        if (choice.type() === AiRailChoiceType.CONFIGURATION) {
            this._configurationValues.set(Object.fromEntries(choice.configurationFields().map((field) => [field.key, field.value])));
            this._section.set(AiRailSection.CONFIGURATION);
            return;
        }

        this.executeChoice(choice, '');
    }

    private submitPrompt(prompt: string): void {
        const normalizedPrompt = prompt.trim();
        const choice = this._activeChoice();
        if (!choice || normalizedPrompt.length < choice.minimumPromptLength() || normalizedPrompt.length > choice.maximumPromptLength()) {
            return;
        }

        this.executeChoice(choice, normalizedPrompt);
    }

    private executeChoice(choice: AiRailChoiceComponent, prompt: string): void {
        const executeCommand = choice.executeCommand();
        if (!executeCommand?.canExecute()) {
            return;
        }

        this._requestPending.set(true);
        this._section.set(AiRailSection.BUSY);
        executeCommand.execute(prompt);
    }

    private submitConfiguration(): void {
        const executeCommand = this._activeChoice()?.configurationExecuteCommand();
        if (!executeCommand?.canExecute()) {
            return;
        }
        this._requestPending.set(true);
        this._section.set(AiRailSection.BUSY);
        executeCommand.execute(this._configurationValues());
    }

    private showChoices(): void {
        if (this.loading()) {
            return;
        }

        this._requestPending.set(false);
        this._activeChoice.set(null);
        this._configurationValues.set({});
        this._section.set(AiRailSection.CHOICES);
    }

    // #endregion
}
