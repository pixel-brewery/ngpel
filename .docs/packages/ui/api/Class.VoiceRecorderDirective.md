---
title: 'Class: VoiceRecorderDirective'
generated: true
editUrl: false
---
# Class: VoiceRecorderDirective

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:72](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L72)

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

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L98)

Creates the Prompt Box voice bridge and synchronizes Core recorder state with Mosaik.

#### Returns

`VoiceRecorderDirective`

## Properties

### enabled

```ts
readonly enabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L145)

Allows the owning surface to prevent new microphone captures.

***

### failed

```ts
readonly failed: OutputEmitterRef<unknown>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L156)

Emits recorder or transcription failures for application-level feedback.

***

### transcribed

```ts
readonly transcribed: OutputEmitterRef<string>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L148)

Emits the completed transcript after updating the surrounding prompt box when present.

## Accessors

### isAcquiring

#### Get Signature

```ts
get isAcquiring(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L135)

Whether this tool is waiting for access to the microphone.

##### Returns

`Signal`\<`boolean`\>

***

### isActive

#### Get Signature

```ts
get isActive(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:130](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L130)

Whether this tool is acquiring, recording, or transcribing its own audio.

##### Returns

`Signal`\<`boolean`\>

***

### isRecording

#### Get Signature

```ts
get isRecording(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L125)

Indicates whether this Prompt Box currently owns an active recording.

##### Returns

`Signal`\<`boolean`\>

***

### isTranscribing

#### Get Signature

```ts
get isTranscribing(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L140)

Whether this tool is converting a stopped recording to text.

##### Returns

`Signal`\<`boolean`\>

## Methods

### onRecorderCancel()

```ts
protected onRecorderCancel(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:169](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L169)

Cancels the active recording and discards its retained audio.

#### Returns

`Promise`\<`void`\>

***

### onRecorderPause()

```ts
protected onRecorderPause(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L178)

Pauses the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderResume()

```ts
protected onRecorderResume(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L195)

Resumes the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderStart()

```ts
protected onRecorderStart(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:212](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L212)

Starts recording with the last successfully tested browser microphone when available.

#### Returns

`Promise`\<`void`\>

***

### onRecorderStop()

```ts
protected onRecorderStop(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L221)

Stops, transcribes and writes the dictated text into the surrounding Prompt Box.

#### Returns

`Promise`\<`void`\>
