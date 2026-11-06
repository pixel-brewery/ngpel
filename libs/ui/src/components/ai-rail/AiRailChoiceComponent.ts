// #region Imports

import { ChangeDetectionStrategy, Component, input, type InputSignal } from '@angular/core';
import type { Command } from '@pixel-brewery/ngpel-mvp';
import { AiRailChoiceType, type AiRailChoiceType as AiRailChoiceTypeValue } from './AiRailChoiceType';
import type { IAiRailChoiceConfigurationField } from './IAiRailChoiceConfigurationField';

// #endregion

/**
 * Declares one headless interaction choice consumed and rendered by an AI rail.
 *
 * @public
 */
@Component({
    selector: 'ngp-ai-rail-choice',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiRailChoiceComponent {
    // #region Properties

    /**
     * Stable identifier of the choice.
     *
     * @public
     * @readonly
     */
    public readonly key: InputSignal<string> = input.required<string>();

    /** Stable browser-automation contract for the rendered choice. */
    public readonly testId: InputSignal<string> = input('');

    /**
     * Determines whether the choice requests a prompt before execution.
     *
     * @public
     * @readonly
     */
    public readonly type: InputSignal<AiRailChoiceTypeValue> = input<AiRailChoiceTypeValue>(AiRailChoiceType.PROMPT);

    /**
     * Primary choice label.
     *
     * @public
     * @readonly
     */
    public readonly label: InputSignal<string> = input.required<string>();

    /**
     * Supporting choice description.
     *
     * @public
     * @readonly
     */
    public readonly description: InputSignal<string> = input.required<string>();

    /**
     * Mosaik icon name rendered for the choice.
     *
     * @public
     * @readonly
     */
    public readonly icon: InputSignal<string> = input('sparkle');

    /**
     * Placeholder displayed when the choice opens the prompt section.
     *
     * @public
     * @readonly
     */
    public readonly promptPlaceholder: InputSignal<string> = input('');

    /**
     * Minimum trimmed prompt length required before execution.
     *
     * @public
     * @readonly
     */
    public readonly minimumPromptLength: InputSignal<number> = input(3);

    /**
     * Maximum prompt length accepted by the feature contract.
     *
     * @public
     * @readonly
     */
    public readonly maximumPromptLength: InputSignal<number> = input(10_000);

    /** Select fields rendered before a configurable choice executes. */
    public readonly configurationFields: InputSignal<ReadonlyArray<IAiRailChoiceConfigurationField>> = input<ReadonlyArray<IAiRailChoiceConfigurationField>>(
        [],
    );

    /** Label of the configurable choice submit action. */
    public readonly configurationSubmitLabel: InputSignal<string> = input('Run');

    /** Pair of configuration fields whose values the user can exchange. */
    public readonly configurationSwapFields = input<readonly [string, string] | null>(null);

    /** Accessible label for the exchange action. */
    public readonly configurationSwapLabel = input('Swap values');

    /**
     * Feature-owned operation executed by the rail.
     *
     * @public
     * @readonly
     */
    public readonly executeCommand: InputSignal<Command<string> | undefined> = input<Command<string>>();

    /** Feature-owned operation executed with the selected configuration values. */
    public readonly configurationExecuteCommand: InputSignal<Command<Readonly<Record<string, string>>> | undefined> =
        input<Command<Readonly<Record<string, string>>>>();

    // #endregion
}
