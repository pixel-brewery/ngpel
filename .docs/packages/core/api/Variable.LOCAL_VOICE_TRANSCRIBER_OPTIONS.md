---
title: 'Variable: LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS'
generated: true
editUrl: false
---
# Variable: LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS

```ts
const LOCAL_VOICE_TRANSCRIBER_OPTIONS: InjectionToken<ILocalVoiceTranscriberOptions>;
```

Defined in: [audio/transcribers/LOCAL\_VOICE\_TRANSCRIBER\_OPTIONS.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/LOCAL_VOICE_TRANSCRIBER_OPTIONS.ts#L15)

Injection token carrying the [ILocalVoiceTranscriberOptions](Interface.ILocalVoiceTranscriberOptions). Registered by
`withLocalTranscriber(...)`; when absent, the [LocalVoiceTranscriber](Class.LocalVoiceTranscriber) falls back to its
documented defaults.
