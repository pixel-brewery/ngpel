---
title: 'Interface: IAudioSource'
generated: true
editUrl: false
---
# Interface: IAudioSource

Defined in: [audio/player/IAudioSource.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioSource.ts#L8)

The audio the [AudioPlayer](Class.AudioPlayer) attaches to its element: a URL, a retained blob, or an
externally owned live media stream. Ownership of a stream stays with the caller — the player
detaches it but never stops its tracks.

## Properties

### label?

```ts
readonly optional label?: string | null;
```

Defined in: [audio/player/IAudioSource.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioSource.ts#L19)

Friendly name for diagnostics and logging.

***

### src

```ts
readonly src: string | MediaStream | Blob;
```

Defined in: [audio/player/IAudioSource.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/IAudioSource.ts#L14)

URL, retained blob, or externally owned live media stream.
