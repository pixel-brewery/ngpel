---
title: 'Variable: VOICE\_TRANSCRIBER'
generated: true
editUrl: false
---
# Variable: VOICE\_TRANSCRIBER

```ts
const VOICE_TRANSCRIBER: InjectionToken<IVoiceTranscriber>;
```

Defined in: [audio/transcribers/VOICE\_TRANSCRIBER.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/VOICE_TRANSCRIBER.ts#L16)

Injection token of the active [IVoiceTranscriber](Interface.IVoiceTranscriber). It has no default factory on purpose:
importing the token must not pull a recognition strategy into the bundle. Bind it through
`provideAudioRecorder(withLocalTranscriber())` or `withVoiceTranscriber(...)`; while it is
unbound, transcription is simply unavailable and the recorder still records.
