---
title: 'Class: VoiceRecorderDirective'
generated: true
editUrl: false
---
# Class: VoiceRecorderDirective

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L71)

Connects the Mosaik prompt box voice controls to the audio recorder and transcriber of `ngpel-core`.

The directive keeps ownership of the recording in the core services while Mosaik renders the controls.
A completed transcription is appended to the surrounding Prompt Box and announced through
its normal input event so existing value accessors and listeners observe the dictated text.

## Example

```html
<mosaik-prompt-box>
    <mosaik-prompt-box-voice-recorder-tool ngpVoiceRecorder />
</mosaik-prompt-box>
```

## Constructors

### Constructor

```ts
new VoiceRecorderDirective(): VoiceRecorderDirective;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L97)

Creates the Prompt Box voice bridge and synchronizes Core recorder state with Mosaik.

#### Returns

`VoiceRecorderDirective`

## Properties

### enabled

```ts
readonly enabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L144)

Allows the owning surface to prevent new microphone captures.

***

### failed

```ts
readonly failed: OutputEmitterRef<unknown>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L155)

Emits recorder or transcription failures for application-level feedback.

***

### transcribed

```ts
readonly transcribed: OutputEmitterRef<string>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L147)

Emits the completed transcript after updating the surrounding prompt box when present.

## Accessors

### isAcquiring

#### Get Signature

```ts
get isAcquiring(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L134)

Whether this tool is waiting for access to the microphone.

##### Returns

`Signal`\<`boolean`\>

***

### isActive

#### Get Signature

```ts
get isActive(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:129](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L129)

Whether this tool is acquiring, recording, or transcribing its own audio.

##### Returns

`Signal`\<`boolean`\>

***

### isRecording

#### Get Signature

```ts
get isRecording(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L124)

Indicates whether this Prompt Box currently owns an active recording.

##### Returns

`Signal`\<`boolean`\>

***

### isTranscribing

#### Get Signature

```ts
get isTranscribing(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L139)

Whether this tool is converting a stopped recording to text.

##### Returns

`Signal`\<`boolean`\>

## Methods

### onRecorderCancel()

```ts
protected onRecorderCancel(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L168)

Cancels the active recording and discards its retained audio.

#### Returns

`Promise`\<`void`\>

***

### onRecorderPause()

```ts
protected onRecorderPause(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:177](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L177)

Pauses the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderResume()

```ts
protected onRecorderResume(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L194)

Resumes the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderStart()

```ts
protected onRecorderStart(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:211](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L211)

Starts recording with the last successfully tested browser microphone when available.

#### Returns

`Promise`\<`void`\>

***

### onRecorderStop()

```ts
protected onRecorderStop(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:220](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L220)

Stops, transcribes and writes the dictated text into the surrounding Prompt Box.

#### Returns

`Promise`\<`void`\>
