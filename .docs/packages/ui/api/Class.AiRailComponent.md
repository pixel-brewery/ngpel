---
title: 'Class: AiRailComponent'
generated: true
editUrl: false
---
# Class: AiRailComponent

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:302](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L302)

Renders a declaratively configured, inline AI interaction inside a drawer rail.

## Constructors

### Constructor

```ts
new AiRailComponent(): AiRailComponent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:320](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L320)

Constructs a new AI rail and synchronizes requests with its busy and result sections.

#### Returns

`AiRailComponent`

## Properties

### activeChoice

```ts
protected readonly activeChoice: Signal<AiRailChoiceComponent | null>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:520](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L520)

Currently selected prompt choice.

***

### backCommand

```ts
protected readonly backCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:608](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L608)

Returns to the declarative choice list.

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:389](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L389)

Label of the inline back action.

***

### choices

```ts
protected readonly choices: Signal<readonly AiRailChoiceComponent[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:512](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L512)

Declaratively supplied headless choices.

***

### configurationValues

```ts
protected readonly configurationValues: Signal<Readonly<Record<string, string>>>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:523](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L523)

Current configurable choice values.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:365](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L365)

Choice section description.

***

### emptyText

```ts
readonly emptyText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:504](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L504)

Message shown when a completed operation has no result.

***

### explanationItems

```ts
readonly explanationItems: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:381](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L381)

Context-specific explanation points for the AI interaction.

***

### explanationTitle

```ts
readonly explanationTitle: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:373](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L373)

Heading for the contextual explanation shown below the available choices.

***

### fallbackText

```ts
readonly fallbackText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:480](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L480)

Text displayed for a fallback result.

***

### hasResult

```ts
readonly hasResult: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:421](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L421)

Indicates whether projected result content is available.

***

### header

```ts
readonly header: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L357)

Choice section headline.

***

### isFallback

```ts
readonly isFallback: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:472](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L472)

Indicates whether the result was produced by a fallback strategy.

***

### isOutdated

```ts
readonly isOutdated: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:453](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L453)

Indicates whether the result no longer matches the current form state.

***

### isPartial

```ts
readonly isPartial: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:488](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L488)

Indicates whether only a partial result is available.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:397](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L397)

Indicates whether the feature-owned AI operation is running.

***

### loadingLabel

```ts
readonly loadingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:405](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L405)

Accessible label for the busy section.

***

### mapPromptSubmittedEvent

```ts
protected readonly mapPromptSubmittedEvent: (event) => string = mapAiRailPromptSubmittedEvent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:618](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L618)

Maps Prompt Box events into command parameters.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `unknown` |

#### Returns

`string`

***

### outdatedTestId

```ts
readonly outdatedTestId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:464](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L464)

Test identifier applied to the outdated-result notice.

***

### outdatedText

```ts
readonly outdatedText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:461](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L461)

Text displayed for an outdated result.

***

### partialText

```ts
readonly partialText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:496](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L496)

Text displayed for a partial result.

***

### section

```ts
protected readonly section: Signal<AiRailSection>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:531](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L531)

Current inline rail section.

***

### sections

```ts
protected readonly sections: {
  BUSY: "BUSY";
  CHOICES: "CHOICES";
  CONFIGURATION: "CONFIGURATION";
  PROMPT: "PROMPT";
  RESULT: "RESULT";
} = AiRailSection;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:539](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L539)

Exposes section constants to the component template.

#### BUSY

```ts
readonly BUSY: "BUSY" = 'BUSY';
```

#### CHOICES

```ts
readonly CHOICES: "CHOICES" = 'CHOICES';
```

#### CONFIGURATION

```ts
readonly CONFIGURATION: "CONFIGURATION" = 'CONFIGURATION';
```

#### PROMPT

```ts
readonly PROMPT: "PROMPT" = 'PROMPT';
```

#### RESULT

```ts
readonly RESULT: "RESULT" = 'RESULT';
```

***

### selectChoiceCommand

```ts
protected readonly selectChoiceCommand: Command<AiRailChoiceComponent>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:547](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L547)

Selects a declarative choice.

***

### sourceLabel

```ts
readonly sourceLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:445](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L445)

Result source label.

***

### statusLabel

```ts
readonly statusLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:429](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L429)

Result status label.

***

### statusVariant

```ts
readonly statusVariant: InputSignal<AiRailBadgeVariant>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:437](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L437)

Result status appearance.

***

### submitConfigurationCommand

```ts
protected readonly submitConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:565](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L565)

Submits the active configurable choice.

***

### submitPromptCommand

```ts
protected readonly submitPromptCommand: Command<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:557](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L557)

Submits the active free-text prompt.

***

### swapConfigurationCommand

```ts
protected readonly swapConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:592](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L592)

Exchanges compatible values without changing the other configuration fields.

***

### waitingPrompts

```ts
readonly waitingPrompts: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:413](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L413)

Typewriter messages displayed while waiting.

## Methods

### canExecuteChoice()

```ts
protected canExecuteChoice(choice): boolean;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:625](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L625)

Returns whether one choice currently exposes an executable command.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `choice` | [`AiRailChoiceComponent`](Class.AiRailChoiceComponent) |

#### Returns

`boolean`

***

### changeConfigurationValue()

```ts
protected changeConfigurationValue(key, event): void;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:632](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L632)

Updates one configurable choice value from a Mosaik selection event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `event` | `unknown` |

#### Returns

`void`
