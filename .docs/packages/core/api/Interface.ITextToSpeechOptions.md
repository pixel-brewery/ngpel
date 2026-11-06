---
title: 'Interface: ITextToSpeechOptions'
generated: true
editUrl: false
---
# Interface: ITextToSpeechOptions

Defined in: [audio/speech/ITextToSpeechOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L7)

Options of one speech synthesis utterance. Every option is optional and falls back to the
browser default of the selected voice.

## Properties

### lang?

```ts
readonly optional lang?: string;
```

Defined in: [audio/speech/ITextToSpeechOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L13)

BCP 47 language code, for example `'en-US'` or `'de-DE'`.

***

### pitch?

```ts
readonly optional pitch?: number;
```

Defined in: [audio/speech/ITextToSpeechOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L23)

Pitch between `0` and `2`; values outside are clamped.

***

### rate?

```ts
readonly optional rate?: number;
```

Defined in: [audio/speech/ITextToSpeechOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L18)

Speaking rate between `0.1` and `10`; values outside are clamped.

***

### voiceName?

```ts
readonly optional voiceName?: string;
```

Defined in: [audio/speech/ITextToSpeechOptions.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L34)

Name of the voice to speak with, as reported by the browser voice list. An unknown name
keeps the browser default voice.

***

### volume?

```ts
readonly optional volume?: number;
```

Defined in: [audio/speech/ITextToSpeechOptions.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/ITextToSpeechOptions.ts#L28)

Volume between `0` and `1`; values outside are clamped.
