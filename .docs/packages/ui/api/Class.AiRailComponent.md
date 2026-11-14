---
title: 'Class: AiRailComponent'
generated: true
editUrl: false
---
# Class: AiRailComponent

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:299](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L299)

Renders a declaratively configured, inline AI interaction inside a drawer rail.

## Constructors

### Constructor

```ts
new AiRailComponent(): AiRailComponent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:317](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L317)

Constructs a new AI rail and synchronizes requests with its busy and result sections.

#### Returns

`AiRailComponent`

## Properties

### activeChoice

```ts
protected readonly activeChoice: Signal<AiRailChoiceComponent | null>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:514](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L514)

Currently selected prompt choice.

***

### backCommand

```ts
protected readonly backCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:588](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L588)

Returns to the declarative choice list.

***

### backLabel

```ts
readonly backLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:386](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L386)

Label of the inline back action.

***

### choices

```ts
protected readonly choices: Signal<readonly AiRailChoiceComponent[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:506](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L506)

Declaratively supplied headless choices.

***

### configurationValues

```ts
protected readonly configurationValues: Signal<Readonly<Record<string, string>>>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:517](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L517)

Current configurable choice values.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:362](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L362)

Choice section description.

***

### emptyText

```ts
readonly emptyText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:498](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L498)

Message shown when a completed operation has no result.

***

### explanationItems

```ts
readonly explanationItems: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:378](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L378)

Context-specific explanation points for the AI interaction.

***

### explanationTitle

```ts
readonly explanationTitle: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:370](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L370)

Heading for the contextual explanation shown below the available choices.

***

### fallbackText

```ts
readonly fallbackText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:474](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L474)

Text displayed for a fallback result.

***

### hasResult

```ts
readonly hasResult: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:418](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L418)

Indicates whether projected result content is available.

***

### header

```ts
readonly header: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:354](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L354)

Choice section headline.

***

### isFallback

```ts
readonly isFallback: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:466](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L466)

Indicates whether the result was produced by a fallback strategy.

***

### isOutdated

```ts
readonly isOutdated: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L450)

Indicates whether the result no longer matches the current form state.

***

### isPartial

```ts
readonly isPartial: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:482](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L482)

Indicates whether only a partial result is available.

***

### loading

```ts
readonly loading: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:394](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L394)

Indicates whether the feature-owned AI operation is running.

***

### loadingLabel

```ts
readonly loadingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L402)

Accessible label for the busy section.

***

### mapPromptSubmittedEvent

```ts
protected readonly mapPromptSubmittedEvent: (event) => string = mapAiRailPromptSubmittedEvent;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:598](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L598)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:458](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L458)

Text displayed for an outdated result.

***

### partialText

```ts
readonly partialText: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:490](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L490)

Text displayed for a partial result.

***

### section

```ts
protected readonly section: Signal<AiRailSection>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:525](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L525)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:533](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L533)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:541](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L541)

Selects a declarative choice.

***

### sourceLabel

```ts
readonly sourceLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:442](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L442)

Result source label.

***

### statusLabel

```ts
readonly statusLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L426)

Result status label.

***

### statusVariant

```ts
readonly statusVariant: InputSignal<AiRailBadgeVariant>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:434](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L434)

Result status appearance.

***

### submitConfigurationCommand

```ts
protected readonly submitConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:559](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L559)

Submits the active configurable choice.

***

### submitPromptCommand

```ts
protected readonly submitPromptCommand: Command<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:551](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L551)

Submits the active free-text prompt.

***

### swapConfigurationCommand

```ts
protected readonly swapConfigurationCommand: Command<void>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:572](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L572)

Exchanges compatible values without changing the other configuration fields.

***

### waitingPrompts

```ts
readonly waitingPrompts: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:410](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L410)

Typewriter messages displayed while waiting.

## Methods

### canExecuteChoice()

```ts
protected canExecuteChoice(choice): boolean;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:605](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L605)

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

Defined in: [libs/ui/src/components/ai-rail/AiRailComponent.ts:612](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailComponent.ts#L612)

Updates one configurable choice value from a Mosaik selection event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `string` |
| `event` | `unknown` |

#### Returns

`void`
