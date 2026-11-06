---
title: 'Type Alias: AudioInputPermissionState'
generated: true
editUrl: false
---
# Type Alias: AudioInputPermissionState

```ts
type AudioInputPermissionState = "denied" | "granted" | "prompt" | "unknown" | "unsupported";
```

Defined in: [audio/devices/AudioInputPermissionState.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputPermissionState.ts#L7)

Browser permission state for microphone access. `unknown` is the state before the browser was
asked, `unsupported` the state of a runtime without media APIs.
