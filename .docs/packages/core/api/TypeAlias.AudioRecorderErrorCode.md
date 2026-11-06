---
title: 'Type Alias: AudioRecorderErrorCode'
generated: true
editUrl: false
---
# Type Alias: AudioRecorderErrorCode

```ts
type AudioRecorderErrorCode =
  | "unsupported"
  | "invalid-state"
  | "permission-denied"
  | "device-not-found"
  | "constraints-unsatisfied"
  | "capture-aborted"
  | "capture-failed"
  | "recorder-failed";
```

Defined in: [audio/recorder/AudioRecorderErrorCode.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorderErrorCode.ts#L8)

Stable failure categories of the browser audio recorder. They exist so a user interface can
decide on recovery — ask for permission again, offer another device, fall back to typing —
without parsing browser messages.
