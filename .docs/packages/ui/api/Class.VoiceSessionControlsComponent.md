---
title: 'Class: VoiceSessionControlsComponent'
generated: true
editUrl: false
---
# Class: VoiceSessionControlsComponent

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:172](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L172)

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

### assistantMuted

```ts
readonly assistantMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L181)

Indicates whether assistant audio output is currently muted.

***

### assistantMutedChange

```ts
readonly assistantMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L189)

Emits the requested assistant-audio mute state.

***

### assistantSpeaking

```ts
readonly assistantSpeaking: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L197)

Indicates whether the assistant is currently emitting spoken audio.

***

### assistantStopRequested

```ts
readonly assistantStopRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:205](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L205)

Requests interruption of the assistant's current spoken response.

***

### canPause

```ts
readonly canPause: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L213)

Indicates whether pause and resume actions are available.

***

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L221)

Disables every control except while an end request is already busy.

***

### endBusy

```ts
readonly endBusy: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:229](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L229)

Indicates that an end-session request is currently being processed.

***

### endRequested

```ts
readonly endRequested: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:237](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L237)

Requests the consumer-owned session termination flow.

***

### labels

```ts
readonly labels: InputSignal<IVoiceSessionControlLabels>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:245](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L245)

Localized labels and accessible names used by every control.

***

### microphoneMuted

```ts
readonly microphoneMuted: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:253](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L253)

Indicates whether microphone input is currently muted.

***

### microphoneMutedChange

```ts
readonly microphoneMutedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:261](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L261)

Emits the requested microphone mute state.

***

### paused

```ts
readonly paused: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:269](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L269)

Indicates whether the complete session is paused.

***

### pausedChange

```ts
readonly pausedChange: OutputEmitterRef<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:277](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L277)

Emits the requested pause state.

***

### showAssistantControl

```ts
readonly showAssistantControl: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:285](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L285)

Indicates whether assistant-audio actions are rendered.

## Methods

### toggleAssistantMuted()

```ts
protected toggleAssistantMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L296)

Emits the inverse of the current assistant-audio mute state.

#### Returns

`void`

***

### toggleMicrophoneMuted()

```ts
protected toggleMicrophoneMuted(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:305](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L305)

Emits the inverse of the current microphone mute state.

#### Returns

`void`

***

### togglePaused()

```ts
protected togglePaused(): void;
```

Defined in: [libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts:314](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/voice-session-controls/VoiceSessionControlsComponent.ts#L314)

Emits the inverse of the current pause state.

#### Returns

`void`
