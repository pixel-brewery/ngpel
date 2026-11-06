---
title: 'Variable: AUDIO\_LEVEL\_WORKLET\_SOURCE'
generated: true
editUrl: false
---
# Variable: AUDIO\_LEVEL\_WORKLET\_SOURCE

```ts
const AUDIO_LEVEL_WORKLET_SOURCE: string;
```

Defined in: [audio/level/AUDIO\_LEVEL\_WORKLET\_SOURCE.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AUDIO_LEVEL_WORKLET_SOURCE.ts#L14)

JavaScript source for the level monitor's AudioWorklet module. A host with a restrictive content
security policy can write this string to a same-origin asset and load it with its own
`AudioLevelWorkletModuleLoader`.
