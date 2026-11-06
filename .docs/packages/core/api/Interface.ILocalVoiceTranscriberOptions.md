---
title: 'Interface: ILocalVoiceTranscriberOptions'
generated: true
editUrl: false
---
# Interface: ILocalVoiceTranscriberOptions

Defined in: [audio/transcribers/ILocalVoiceTranscriberOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILocalVoiceTranscriberOptions.ts#L6)

Configuration of the browser-based [LocalVoiceTranscriber](Class.LocalVoiceTranscriber).

## Properties

### interimResults?

```ts
readonly optional interimResults?: boolean;
```

Defined in: [audio/transcribers/ILocalVoiceTranscriberOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILocalVoiceTranscriberOptions.ts#L18)

Whether single-shot recognition also reports interim results. Live sessions always use
interim results because they join them into the running transcript. Defaults to `false`.

***

### language?

```ts
readonly optional language?: string;
```

Defined in: [audio/transcribers/ILocalVoiceTranscriberOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILocalVoiceTranscriberOptions.ts#L12)

BCP 47 recognition language, for example `'en-US'` or `'de-DE'`. Defaults to `'en-US'`.

***

### maxAlternatives?

```ts
readonly optional maxAlternatives?: number;
```

Defined in: [audio/transcribers/ILocalVoiceTranscriberOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ILocalVoiceTranscriberOptions.ts#L23)

Number of alternatives the engine reports per result. Defaults to `1`.
