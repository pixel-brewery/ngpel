---
title: 'Class: AiRailComponent'
generated: true
editUrl: false
---
# Class: AiRailComponent

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:300](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L300)

Renders a declaratively configured, inline AI interaction inside a drawer rail.

## Constructors

### Constructor

```ts
new AiRailComponent(): AiRailComponent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:318](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L318)

Constructs a new AI rail and synchronizes requests with its busy and result sections.

#### Returns

`AiRailComponent`

## Properties

### activeChoice

```ts
protected readonly activeChoice: Signal<AiRailChoiceComponent | null>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:515](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L515)

Currently selected prompt choice.

***

### backCommand

```ts
protected readonly backCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:589](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L589)

Returns to the declarative choice list.

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:387](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L387)

Label of the inline back action.

***

### choices

```ts
protected readonly choices: Signal<readonly AiRailChoiceComponent[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:507](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L507)

Declaratively supplied headless choices.

***

### configurationValues

```ts
protected readonly configurationValues: Signal<Readonly<Record<string, string>>>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:518](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L518)

Current configurable choice values.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:363](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L363)

Choice section description.

***

### emptyText

```ts
readonly emptyText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:499](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L499)

Message shown when a completed operation has no result.

***

### explanationItems

```ts
readonly explanationItems: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:379](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L379)

Context-specific explanation points for the AI interaction.

***

### explanationTitle

```ts
readonly explanationTitle: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:371](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L371)

Heading for the contextual explanation shown below the available choices.

***

### fallbackText

```ts
readonly fallbackText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:475](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L475)

Text displayed for a fallback result.

***

### hasResult

```ts
readonly hasResult: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:419](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L419)

Indicates whether projected result content is available.

***

### header

```ts
readonly header: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:355](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L355)

Choice section headline.

***

### isFallback

```ts
readonly isFallback: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:467](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L467)

Indicates whether the result was produced by a fallback strategy.

***

### isOutdated

```ts
readonly isOutdated: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:451](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L451)

Indicates whether the result no longer matches the current form state.

***

### isPartial

```ts
readonly isPartial: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:483](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L483)

Indicates whether only a partial result is available.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:395](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L395)

Indicates whether the feature-owned AI operation is running.

***

### loadingLabel

```ts
readonly loadingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:403](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L403)

Accessible label for the busy section.

***

### mapPromptSubmittedEvent

```ts
protected readonly mapPromptSubmittedEvent: (event) => string = mapAiRailPromptSubmittedEvent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:599](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L599)

Maps Prompt Box events into command parameters.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `unknown` |

#### Returns

`string`

***

### outdatedText

```ts
readonly outdatedText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:459](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L459)

Text displayed for an outdated result.

***

### partialText

```ts
readonly partialText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:491](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L491)

Text displayed for a partial result.

***

### section

```ts
protected readonly section: Signal<AiRailSection>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:526](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L526)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:534](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L534)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:542](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L542)

Selects a declarative choice.

***

### sourceLabel

```ts
readonly sourceLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:443](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L443)

Result source label.

***

### statusLabel

```ts
readonly statusLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:427](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L427)

Result status label.

***

### statusVariant

```ts
readonly statusVariant: InputSignal<AiRailBadgeVariant>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:435](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L435)

Result status appearance.

***

### submitConfigurationCommand

```ts
protected readonly submitConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:560](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L560)

Submits the active configurable choice.

***

### submitPromptCommand

```ts
protected readonly submitPromptCommand: Command<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:552](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L552)

Submits the active free-text prompt.

***

### swapConfigurationCommand

```ts
protected readonly swapConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:573](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L573)

Exchanges compatible values without changing the other configuration fields.

***

### waitingPrompts

```ts
readonly waitingPrompts: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:411](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L411)

Typewriter messages displayed while waiting.

## Methods

### canExecuteChoice()

```ts
protected canExecuteChoice(choice): boolean;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:606](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L606)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:613](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L613)

Updates one configurable choice value from a Mosaik selection event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `event` | `unknown` |

#### Returns

`void`
