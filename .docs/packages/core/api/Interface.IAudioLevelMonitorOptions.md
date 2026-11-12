---
title: 'Interface: IAudioLevelMonitorOptions'
generated: true
editUrl: false
---
# Interface: IAudioLevelMonitorOptions

Defined in: [audio/level/IAudioLevelMonitorOptions.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMonitorOptions.ts#L2)

Options for monitoring a borrowed audio stream.

## Properties

### frameDurationMs?

```ts
readonly frameDurationMs?: number;
```

Defined in: [audio/level/IAudioLevelMonitorOptions.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/IAudioLevelMonitorOptions.ts#L4)

Duration of each measurement window, between 5 and 1,000 milliseconds. Defaults to 20.
