---
title: 'Interface: IDictationResult'
generated: true
editUrl: false
---
# Interface: IDictationResult

Defined in: [audio/transcribers/IDictationResult.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationResult.ts#L6)

The final result of a browser dictation.

## Properties

### errorCode?

```ts
readonly errorCode?: string;
```

Defined in: [audio/transcribers/IDictationResult.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationResult.ts#L10)

Browser recognition error code, `unsupported` or `start-failed`.

***

### transcript

```ts
readonly transcript: string;
```

Defined in: [audio/transcribers/IDictationResult.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/IDictationResult.ts#L8)

Final transcript, or an empty string after cancellation or failure.
