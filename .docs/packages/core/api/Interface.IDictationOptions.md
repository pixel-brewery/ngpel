---
title: 'Interface: IDictationOptions'
generated: true
editUrl: false
---
# Interface: IDictationOptions

Defined in: [audio/transcribers/IDictationOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationOptions.ts#L6)

Options for a dictation that completes when the browser ends recognition.

## Properties

### continuous?

```ts
readonly continuous?: boolean;
```

Defined in: [audio/transcribers/IDictationOptions.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationOptions.ts#L8)

Recognizes continuously until the browser or caller ends the session.

***

### language?

```ts
readonly language?: string;
```

Defined in: [audio/transcribers/IDictationOptions.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationOptions.ts#L10)

BCP 47 language for this session. Defaults to the configured recognition language.

***

### onTranscript?

```ts
readonly onTranscript?: (transcript) => void;
```

Defined in: [audio/transcribers/IDictationOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationOptions.ts#L12)

Receives the complete current transcript, including interim text.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `transcript` | `string` |

#### Returns

`void`
