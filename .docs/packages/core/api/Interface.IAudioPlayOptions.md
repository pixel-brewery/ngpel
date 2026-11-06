---
title: 'Interface: IAudioPlayOptions'
generated: true
editUrl: false
---
# Interface: IAudioPlayOptions

Defined in: [audio/player/IAudioPlayOptions.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioPlayOptions.ts#L7)

Per-call playback options. Every option is optional and keeps the player's current setting when
omitted, so a caller can start a sound without restating the whole configuration.

## Properties

### loop?

```ts
readonly optional loop?: boolean | null;
```

Defined in: [audio/player/IAudioPlayOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioPlayOptions.ts#L18)

Whether playback repeats. Live streams ignore this option.

***

### startAt?

```ts
readonly optional startAt?: number | null;
```

Defined in: [audio/player/IAudioPlayOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioPlayOptions.ts#L23)

Start position of a seekable source in seconds. Live streams ignore this option.

***

### volume?

```ts
readonly optional volume?: number | null;
```

Defined in: [audio/player/IAudioPlayOptions.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioPlayOptions.ts#L13)

Volume in the inclusive range from zero to one. Values outside the range are clamped.
