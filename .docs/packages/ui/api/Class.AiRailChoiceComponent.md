---
title: 'Class: AiRailChoiceComponent'
generated: true
editUrl: false
---
# Class: AiRailChoiceComponent

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L20)

Declares one headless interaction choice consumed and rendered by an AI rail.

## Constructors

### Constructor

```ts
new AiRailChoiceComponent(): AiRailChoiceComponent;
```

#### Returns

`AiRailChoiceComponent`

## Properties

### configurationExecuteCommand

```ts
readonly configurationExecuteCommand: InputSignal<Command<Readonly<Record<string, string>>> | undefined>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:113](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L113)

Feature-owned operation executed with the selected configuration values.

***

### configurationFields

```ts
readonly configurationFields: InputSignal<readonly IAiRailChoiceConfigurationField[]>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L91)

Select fields rendered before a configurable choice executes.

***

### configurationSubmitLabel

```ts
readonly configurationSubmitLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L96)

Label of the configurable choice submit action.

***

### configurationSwapFields

```ts
readonly configurationSwapFields: InputSignal<readonly [string, string] | null>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:99](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L99)

Pair of configuration fields whose values the user can exchange.

***

### configurationSwapLabel

```ts
readonly configurationSwapLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:102](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L102)

Accessible label for the exchange action.

***

### description

```ts
readonly description: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L56)

Supporting choice description.

***

### executeCommand

```ts
readonly executeCommand: InputSignal<Command<string> | undefined>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L110)

Feature-owned operation executed by the rail.

***

### icon

```ts
readonly icon: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:64](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L64)

Mosaik icon name rendered for the choice.

***

### key

```ts
readonly key: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L29)

Stable identifier of the choice.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L48)

Primary choice label.

***

### maximumPromptLength

```ts
readonly maximumPromptLength: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:88](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L88)

Maximum prompt length accepted by the feature contract.

***

### minimumPromptLength

```ts
readonly minimumPromptLength: InputSignal<number>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L80)

Minimum trimmed prompt length required before execution.

***

### promptPlaceholder

```ts
readonly promptPlaceholder: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L72)

Placeholder displayed when the choice opens the prompt section.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L32)

Stable browser-automation contract for the rendered choice.

***

### type

```ts
readonly type: InputSignal<AiRailChoiceType>;
```

Defined in: [libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/ai-rail/AiRailChoiceComponent.ts#L40)

Determines whether the choice requests a prompt before execution.
