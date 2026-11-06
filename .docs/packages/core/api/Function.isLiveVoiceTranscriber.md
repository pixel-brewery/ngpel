---
title: 'Function: isLiveVoiceTranscriber()'
generated: true
editUrl: false
---
# Function: isLiveVoiceTranscriber()

```ts
function isLiveVoiceTranscriber(transcriber): transcriber is ILiveVoiceTranscriber;
```

Defined in: [audio/transcribers/isLiveVoiceTranscriber.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/isLiveVoiceTranscriber.ts#L24)

Determines whether a configured transcriber supports live recognition sessions, so a recorder
user interface can offer live dictation without knowing which strategy is registered.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `transcriber` | [`IVoiceTranscriber`](Interface.IVoiceTranscriber) \| `null` \| `undefined` | The configured transcription strategy, which may be absent. |

## Returns

`transcriber is ILiveVoiceTranscriber`

`true` when the strategy exposes the live-session lifecycle.

## Example

```typescript
const transcriber = inject(VOICE_TRANSCRIBER, { optional: true });
if (isLiveVoiceTranscriber(transcriber)) {
    await transcriber.startSession();
}
```
