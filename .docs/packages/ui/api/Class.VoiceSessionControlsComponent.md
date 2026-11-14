---
title: 'Class: VoiceSessionControlsComponent'
generated: true
editUrl: false
---
# Class: VoiceSessionControlsComponent

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L281)

Renders externally controlled actions for a long-running voice session.

The component does not mutate audio, transport or session state. It emits the
user's requested state transitions and waits for the consumer to update its inputs.

## Constructors

### Constructor

```ts
new VoiceSessionControlsComponent(): VoiceSessionControlsComponent;
```

#### Returns

`VoiceSessionControlsComponent`

## Properties

### actionSize

```ts
protected readonly actionSize: Signal<"small" | "large" | undefined>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:427](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L427)

***

### assistantActionsDisabled

```ts
protected readonly assistantActionsDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:428](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L428)

***

### assistantAudioAvailable

```ts
readonly assistantAudioAvailable: InputSignal<boolean | undefined>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:288](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L288)

Whether assistant audio actions are available. Providing a value keeps the stop control
mounted between utterances. When omitted, the stop control appears only while speaking.

***

### assistantMuted

```ts
readonly assistantMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L296)

Indicates whether assistant audio output is currently muted.

***

### assistantMutedChange

```ts
readonly assistantMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:304](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L304)

Emits the requested assistant-audio mute state.

***

### assistantMuteIconNames

```ts
readonly assistantMuteIconNames: InputSignal<readonly [string, string]>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:346](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L346)

Icon names for the assistant-audio control when unmuted and muted, respectively.

***

### assistantSpeaking

```ts
readonly assistantSpeaking: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:312](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L312)

Indicates whether the assistant is currently emitting spoken audio.

***

### assistantStopAppearance

```ts
readonly assistantStopAppearance: InputSignal<Appearance>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:352](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L352)

Appearance of the action that interrupts spoken output.

***

### assistantStopIconName

```ts
readonly assistantStopIconName: InputSignal<string>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:349](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L349)

Icon shown on the action that interrupts spoken output.

***

### assistantStopRequested

```ts
readonly assistantStopRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:320](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L320)

Requests interruption of the assistant's current spoken response.

***

### canEnd

```ts
readonly canEnd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:331](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L331)

Whether the toolbar offers an end-session action.

***

### canPause

```ts
readonly canPause: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:328](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L328)

Indicates whether pause and resume actions are available.

***

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:334](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L334)

Uses compact action sizes and displays the end action as an accessible icon button.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:360](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L360)

Disables every control except while an end request is already busy.

***

### endActivation

```ts
readonly endActivation: InputSignal<"click" | "hold">;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:340](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L340)

How the user activates the end action. Use click when the host already confirms ending.

***

### endBusy

```ts
readonly endBusy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:368](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L368)

Indicates that an end-session request is currently being processed.

***

### endRequested

```ts
readonly endRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:376](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L376)

Requests the consumer-owned session termination flow.

***

### inactiveVariant

```ts
readonly inactiveVariant: InputSignal<Variant>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:343](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L343)

Visual variant of toggle actions when they are inactive.

***

### inline

```ts
protected readonly inline: Signal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:426](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L426)

***

### labels

```ts
readonly labels: InputSignal<IVoiceSessionControlLabels>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:384](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L384)

Localized labels and accessible names used by every control.

***

### layout

```ts
readonly layout: InputSignal<"inline" | "panel">;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:337](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L337)

Renders a self-contained panel or inline controls for an existing host surface.

***

### microphoneMuted

```ts
readonly microphoneMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:392](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L392)

Indicates whether microphone input is currently muted.

***

### microphoneMutedChange

```ts
readonly microphoneMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:400](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L400)

Emits the requested microphone mute state.

***

### paused

```ts
readonly paused: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:408](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L408)

Indicates whether the complete session is paused.

***

### pausedChange

```ts
readonly pausedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:416](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L416)

Emits the requested pause state.

***

### showAssistantControl

```ts
readonly showAssistantControl: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:424](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L424)

Indicates whether assistant-audio actions are rendered.

## Methods

### requestAssistantStop()

```ts
protected requestAssistantStop(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:463](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L463)

#### Returns

`void`

***

### requestEnd()

```ts
protected requestEnd(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:469](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L469)

#### Returns

`void`

***

### toggleAssistantMuted()

```ts
protected toggleAssistantMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:439](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L439)

Emits the inverse of the current assistant-audio mute state.

#### Returns

`void`

***

### toggleMicrophoneMuted()

```ts
protected toggleMicrophoneMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:450](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L450)

Emits the inverse of the current microphone mute state.

#### Returns

`void`

***

### togglePaused()

```ts
protected togglePaused(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:459](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L459)

Emits the inverse of the current pause state.

#### Returns

`void`
