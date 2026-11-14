// #region Imports

import { signal, ɵSIGNAL as SIGNAL, type InputSignal, type Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { command, type Command } from '@pixel-brewery/ngpel-mvp';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AiRailChoiceComponent } from './AiRailChoiceComponent';
import { AiRailChoiceType } from './AiRailChoiceType';
import { AiRailComponent } from './AiRailComponent';
import { AiRailSection } from './AiRailSection';
import type { IAiRailChoiceConfigurationField } from './IAiRailChoiceConfigurationField';

// #endregion

vi.mock('@pixel-brewery/mosaik-elements-angular', () => ({
    AnimateDirective: class AnimateDirective {},
    BadgeComponent: class BadgeComponent {},
    BannerComponent: class BannerComponent {},
    ButtonComponent: class ButtonComponent {},
    CompoundButtonComponent: class CompoundButtonComponent {},
    IconNameDirective: class IconNameDirective {},
    PromptBoxComponent: class PromptBoxComponent {},
    PromptBoxVoiceRecorderToolComponent: class PromptBoxVoiceRecorderToolComponent {},
    SelectComponent: class SelectComponent {},
    SelectItemComponent: class SelectItemComponent {},
    SkeletonComponent: class SkeletonComponent {},
    TextComponent: class TextComponent {},
    TypographyDirective: class TypographyDirective {},
}));

vi.mock('../../directives/voice-recorder/VoiceRecorderDirective', () => ({
    VoiceRecorderDirective: class VoiceRecorderDirective {},
}));
vi.mock('./AiRailComponentIntl', () => ({
    AiRailComponentIntl: class AiRailComponentIntl {
        public readonly backLabel = 'Back';
    },
    provideAiRailComponentIntl: () => [],
}));

interface IAiRailTestApi {
    readonly configurationValues: Signal<Readonly<Record<string, string>>>;
    readonly section: Signal<AiRailSection>;
    readonly selectChoiceCommand: Command<AiRailChoiceComponent>;
    readonly submitConfigurationCommand: Command<void>;
    readonly swapConfigurationCommand: Command<void>;
    changeConfigurationValue(key: string, value: unknown): void;
}

describe('AiRailComponent configuration', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('submits the exchanged live selections and retains unrelated configuration', () => {
        const context = createConfiguration();
        context.api.changeConfigurationValue('targetLocale', { newValue: { value: 'nl' } });

        context.api.swapConfigurationCommand.execute();
        context.api.submitConfigurationCommand.execute();

        expect(context.execute).toHaveBeenCalledExactlyOnceWith({
            sourceLocale: 'nl',
            targetLocale: 'de',
            tone: 'formal',
        });
        expect(context.api.section()).toBe(AiRailSection.BUSY);
    });

    it('returns both fields to their original values after exchanging twice', () => {
        const context = createConfiguration();
        const initialValues = context.api.configurationValues();

        context.api.swapConfigurationCommand.execute();
        context.api.swapConfigurationCommand.execute();

        expect(context.api.configurationValues()).toEqual(initialValues);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it.each(['sourceLocale', 'targetLocale'])('preserves a disabled %s field during exchange', (disabledKey) => {
        const context = createConfiguration();
        setSignalInput(
            context.choice.configurationFields,
            context.choice.configurationFields().map((field) => ({ ...field, disabled: field.key === disabledKey })),
        );
        const initialValues = context.api.configurationValues();

        context.api.swapConfigurationCommand.execute();
        context.api.changeConfigurationValue(disabledKey, 'nl');

        expect(context.api.swapConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.configurationValues()).toBe(initialValues);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it('rejects an exchange when the destination field does not support the source selection', () => {
        const context = createConfiguration();
        setSignalInput(
            context.choice.configurationFields,
            context.choice.configurationFields().map((field) => ({
                ...field,
                options: field.key === 'targetLocale' ? [{ label: 'English', value: 'en' }] : field.options,
            })),
        );
        const initialValues = context.api.configurationValues();

        context.api.swapConfigurationCommand.execute();

        expect(context.api.swapConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.configurationValues()).toBe(initialValues);
    });

    it('rejects stale configured values and unknown selection events', () => {
        const context = createConfiguration();
        context.api.changeConfigurationValue('sourceLocale', 'unsupported');
        context.api.changeConfigurationValue('unknown', 'de');
        setSignalInput(
            context.choice.configurationFields,
            context.choice.configurationFields().map((field) => ({
                ...field,
                options: field.options.filter((option) => option.value !== 'de'),
            })),
        );

        context.api.swapConfigurationCommand.execute();
        context.api.submitConfigurationCommand.execute();

        expect(context.api.configurationValues()).toEqual({ sourceLocale: 'de', targetLocale: 'en', tone: 'formal' });
        expect(context.api.swapConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.submitConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.section()).toBe(AiRailSection.CONFIGURATION);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it('requires different source and target selections before requesting AI', () => {
        const context = createConfiguration();
        context.api.changeConfigurationValue('targetLocale', 'de');

        context.api.submitConfigurationCommand.execute();

        expect(context.api.submitConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.section()).toBe(AiRailSection.CONFIGURATION);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it('blocks editing, exchange, and submission when the feature command loses permission', () => {
        const context = createConfiguration();
        const initialValues = context.api.configurationValues();
        context.allowed.set(false);

        context.api.changeConfigurationValue('sourceLocale', 'nl');
        context.api.swapConfigurationCommand.execute();
        context.api.submitConfigurationCommand.execute();

        expect(context.api.swapConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.submitConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.configurationValues()).toBe(initialValues);
        expect(context.api.section()).toBe(AiRailSection.CONFIGURATION);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it('blocks editing, exchange, and duplicate submission while the request is pending', () => {
        const context = createConfiguration();
        context.api.submitConfigurationCommand.execute();
        const submittedValues = context.api.configurationValues();

        context.api.changeConfigurationValue('sourceLocale', 'nl');
        context.api.swapConfigurationCommand.execute();
        context.api.submitConfigurationCommand.execute();

        expect(context.api.configurationValues()).toBe(submittedValues);
        expect(context.execute).toHaveBeenCalledTimes(1);
    });

    it('blocks editing, exchange, and submission while the feature is loading', () => {
        const context = createConfiguration();
        const initialValues = context.api.configurationValues();
        setSignalInput(context.component.loading, true);

        context.api.changeConfigurationValue('sourceLocale', 'nl');
        context.api.swapConfigurationCommand.execute();
        context.api.submitConfigurationCommand.execute();

        expect(context.api.swapConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.submitConfigurationCommand.canExecute()).toBe(false);
        expect(context.api.configurationValues()).toBe(initialValues);
        expect(context.execute).not.toHaveBeenCalled();
    });

    it('allows equal exchange fields by default', () => {
        const context = createConfiguration();
        setSignalInput(context.choice.configurationRequireDistinctSwapValues, false);
        context.api.changeConfigurationValue('targetLocale', 'de');

        context.api.submitConfigurationCommand.execute();

        expect(context.execute).toHaveBeenCalledExactlyOnceWith({ sourceLocale: 'de', targetLocale: 'de', tone: 'formal' });
    });

    it('preserves configurable actions without an exchange pair', () => {
        const context = createConfiguration();
        setSignalInput(context.choice.configurationSwapFields, null);
        setSignalInput(context.choice.configurationRequireDistinctSwapValues, false);
        context.api.changeConfigurationValue('targetLocale', 'de');

        context.api.submitConfigurationCommand.execute();

        expect(context.execute).toHaveBeenCalledExactlyOnceWith({
            sourceLocale: 'de',
            targetLocale: 'de',
            tone: 'formal',
        });
    });
});

function createConfiguration() {
    const component = TestBed.runInInjectionContext(() => new AiRailComponent());
    const choice = TestBed.runInInjectionContext(() => new AiRailChoiceComponent());
    const api = component as unknown as IAiRailTestApi;
    const execute = vi.fn<(values: Readonly<Record<string, string>>) => void>();
    const allowed = signal(true);
    const languageOptions = [
        { label: 'German', value: 'de' },
        { label: 'English', value: 'en' },
        { label: 'Dutch', value: 'nl' },
    ];
    const fields: ReadonlyArray<IAiRailChoiceConfigurationField> = [
        { key: 'sourceLocale', label: 'Source language', value: 'de', options: languageOptions },
        { key: 'targetLocale', label: 'Target language', value: 'en', options: languageOptions },
        { key: 'tone', label: 'Tone', value: 'formal', options: [{ label: 'Formal', value: 'formal' }] },
    ];
    setSignalInput(choice.key, 'translation');
    setSignalInput(choice.type, AiRailChoiceType.CONFIGURATION);
    setSignalInput(choice.configurationFields, fields);
    setSignalInput(choice.configurationSwapFields, ['sourceLocale', 'targetLocale']);
    setSignalInput(choice.configurationRequireDistinctSwapValues, true);
    setSignalInput(choice.configurationExecuteCommand, command(execute, allowed));
    api.selectChoiceCommand.execute(choice);
    return { component, choice, api, execute, allowed };
}

function setSignalInput<TValue>(input: InputSignal<TValue>, value: TValue): void {
    const node = input[SIGNAL];
    node.applyValueToInputSignal(node, value);
}
