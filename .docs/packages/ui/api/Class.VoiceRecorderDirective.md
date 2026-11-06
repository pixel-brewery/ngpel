---
title: 'Class: VoiceRecorderDirective'
generated: true
editUrl: false
---
# Class: VoiceRecorderDirective

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L58)

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

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L81)

Creates the Prompt Box voice bridge and synchronizes Core recorder state with Mosaik.

#### Returns

`VoiceRecorderDirective`

## Properties

### failed

```ts
readonly failed: OutputEmitterRef<unknown>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L122)

Emits recorder or transcription failures for application-level feedback.

## Accessors

### isRecording

#### Get Signature

```ts
get isRecording(): Signal<boolean>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L112)

Indicates whether this Prompt Box currently owns an active recording.

##### Returns

`Signal`\<`boolean`\>

## Methods

### onRecorderCancel()

```ts
protected onRecorderCancel(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L135)

Cancels the active recording and discards its retained audio.

#### Returns

`Promise`\<`void`\>

***

### onRecorderPause()

```ts
protected onRecorderPause(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L144)

Pauses the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderResume()

```ts
protected onRecorderResume(): void;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L161)

Resumes the recording owned by this Prompt Box.

#### Returns

`void`

***

### onRecorderStart()

```ts
protected onRecorderStart(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L178)

Starts recording with the last successfully tested browser microphone when available.

#### Returns

`Promise`\<`void`\>

***

### onRecorderStop()

```ts
protected onRecorderStop(): Promise<void>;
```

Defined in: [libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts:187](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/voice-recorder/VoiceRecorderDirective.ts#L187)

Stops, transcribes and writes the dictated text into the surrounding Prompt Box.

#### Returns

`Promise`\<`void`\>
