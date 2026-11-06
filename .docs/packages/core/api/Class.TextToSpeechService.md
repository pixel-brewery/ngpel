---
title: 'Class: TextToSpeechService'
generated: true
editUrl: false
---
# Class: TextToSpeechService

Defined in: [audio/speech/TextToSpeechService.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L26)

Reads text aloud through the Web Speech API.

The synthesizer is reached through the injected `DOCUMENT`, and the voice list is followed with
an event listener rather than by assigning `speechSynthesis.onvoiceschanged`, so the service
never silences another listener on the page. Speech and listener stop when the owning injector
is destroyed. Outside a browser the service stays inert and reports `isSupported()` as `false`.

## Constructors

### Constructor

```ts
new TextToSpeechService(): TextToSpeechService;
```

Defined in: [audio/speech/TextToSpeechService.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L48)

Constructs a new instance of the `TextToSpeechService` class and starts following the
browser voice list, which several browsers publish asynchronously.

#### Returns

`TextToSpeechService`

## Accessors

### error

#### Get Signature

```ts
get error(): Signal<string | null>;
```

Defined in: [audio/speech/TextToSpeechService.ts:74](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L74)

Last synthesis failure message.

##### Returns

`Signal`\<`string` \| `null`\>

***

### isPaused

#### Get Signature

```ts
get isPaused(): Signal<boolean>;
```

Defined in: [audio/speech/TextToSpeechService.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L84)

Indicates whether synthesis is paused.

##### Returns

`Signal`\<`boolean`\>

***

### isSpeaking

#### Get Signature

```ts
get isSpeaking(): Signal<boolean>;
```

Defined in: [audio/speech/TextToSpeechService.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L94)

Indicates whether text is currently being spoken.

##### Returns

`Signal`\<`boolean`\>

***

### isSupported

#### Get Signature

```ts
get isSupported(): Signal<boolean>;
```

Defined in: [audio/speech/TextToSpeechService.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L104)

Indicates whether the browser supports speech synthesis.

##### Returns

`Signal`\<`boolean`\>

***

### voices

#### Get Signature

```ts
get voices(): Signal<readonly SpeechSynthesisVoice[]>;
```

Defined in: [audio/speech/TextToSpeechService.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L114)

Voices the browser currently offers.

##### Returns

`Signal`\<readonly `SpeechSynthesisVoice`[]\>

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [audio/speech/TextToSpeechService.ts:262](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L262)

Stops speech and the voice-list subscription.

#### Returns

`void`

***

### getVoicesForLanguage()

```ts
getVoicesForLanguage(lang): readonly SpeechSynthesisVoice[];
```

Defined in: [audio/speech/TextToSpeechService.ts:251](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L251)

Returns the voices of one language.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `lang` | `string` | BCP 47 language code or its leading subtag, for example `'de'` or `'de-DE'`. |

#### Returns

readonly `SpeechSynthesisVoice`[]

The matching voices, in the order the browser reports them.

***

### pause()

```ts
pause(): void;
```

Defined in: [audio/speech/TextToSpeechService.ts:191](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L191)

Pauses the running utterance.

#### Returns

`void`

***

### resume()

```ts
resume(): void;
```

Defined in: [audio/speech/TextToSpeechService.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L202)

Resumes a paused utterance.

#### Returns

`void`

***

### speak()

```ts
speak(text, options?): Promise<void>;
```

Defined in: [audio/speech/TextToSpeechService.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L131)

Speaks the given text, replacing any utterance that is still running.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to speak. |
| `options?` | [`ITextToSpeechOptions`](Interface.ITextToSpeechOptions) \| `null` | Language, rate, pitch, volume, and voice of this utterance. |

#### Returns

`Promise`\<`void`\>

A promise that resolves when the utterance finished or was interrupted.

#### Throws

Error when the browser cannot synthesize speech or the utterance failed.

***

### stop()

```ts
stop(): void;
```

Defined in: [audio/speech/TextToSpeechService.ts:213](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L213)

Stops all speech synthesis of this browser context.

#### Returns

`void`

***

### toggle()

```ts
toggle(text, options?): Promise<void>;
```

Defined in: [audio/speech/TextToSpeechService.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/TextToSpeechService.ts#L234)

Stops when speech is running and speaks the given text otherwise, which is the behaviour a
single read-aloud button needs.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The text to speak while nothing is spoken. |
| `options?` | [`ITextToSpeechOptions`](Interface.ITextToSpeechOptions) \| `null` | Language, rate, pitch, volume, and voice of this utterance. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once the action completed.

#### Throws

Error when the browser cannot synthesize speech or the utterance failed.
