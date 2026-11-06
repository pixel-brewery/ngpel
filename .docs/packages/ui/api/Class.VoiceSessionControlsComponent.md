---
title: 'Class: VoiceSessionControlsComponent'
generated: true
editUrl: false
---
# Class: VoiceSessionControlsComponent

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:188](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L188)

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
protected readonly actionSize: Signal<"small" | "large">;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:315](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L315)

***

### assistantActionsDisabled

```ts
protected readonly assistantActionsDisabled: Signal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:316](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L316)

***

### assistantAudioAvailable

```ts
readonly assistantAudioAvailable: InputSignal<boolean | undefined>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L195)

Whether assistant audio actions are available. Providing a value keeps the stop control
mounted between utterances. When omitted, the stop control appears only while speaking.

***

### assistantMuted

```ts
readonly assistantMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:203](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L203)

Indicates whether assistant audio output is currently muted.

***

### assistantMutedChange

```ts
readonly assistantMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:211](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L211)

Emits the requested assistant-audio mute state.

***

### assistantSpeaking

```ts
readonly assistantSpeaking: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L219)

Indicates whether the assistant is currently emitting spoken audio.

***

### assistantStopRequested

```ts
readonly assistantStopRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:227](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L227)

Requests interruption of the assistant's current spoken response.

***

### canEnd

```ts
readonly canEnd: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:238](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L238)

Whether the toolbar offers an end-session action.

***

### canPause

```ts
readonly canPause: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:235](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L235)

Indicates whether pause and resume actions are available.

***

### compact

```ts
readonly compact: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:241](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L241)

Uses compact action sizes and displays the end action as an accessible icon button.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:249](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L249)

Disables every control except while an end request is already busy.

***

### endBusy

```ts
readonly endBusy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L257)

Indicates that an end-session request is currently being processed.

***

### endRequested

```ts
readonly endRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:265](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L265)

Requests the consumer-owned session termination flow.

***

### labels

```ts
readonly labels: InputSignal<IVoiceSessionControlLabels>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L273)

Localized labels and accessible names used by every control.

***

### microphoneMuted

```ts
readonly microphoneMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:281](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L281)

Indicates whether microphone input is currently muted.

***

### microphoneMutedChange

```ts
readonly microphoneMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:289](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L289)

Emits the requested microphone mute state.

***

### paused

```ts
readonly paused: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:297](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L297)

Indicates whether the complete session is paused.

***

### pausedChange

```ts
readonly pausedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L305)

Emits the requested pause state.

***

### showAssistantControl

```ts
readonly showAssistantControl: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:313](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L313)

Indicates whether assistant-audio actions are rendered.

## Methods

### requestAssistantStop()

```ts
protected requestAssistantStop(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:351](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L351)

#### Returns

`void`

***

### requestEnd()

```ts
protected requestEnd(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:357](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L357)

#### Returns

`void`

***

### toggleAssistantMuted()

```ts
protected toggleAssistantMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:327](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L327)

Emits the inverse of the current assistant-audio mute state.

#### Returns

`void`

***

### toggleMicrophoneMuted()

```ts
protected toggleMicrophoneMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:338](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L338)

Emits the inverse of the current microphone mute state.

#### Returns

`void`

***

### togglePaused()

```ts
protected togglePaused(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:347](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L347)

Emits the inverse of the current pause state.

#### Returns

`void`
