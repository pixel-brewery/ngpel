---
title: 'Class: AudioPlayer'
generated: true
editUrl: false
---
# Class: AudioPlayer

Defined in: [audio/player/AudioPlayer.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L20)

Plays seekable audio and externally owned live media streams through one audio element.

The element, its object URLs and its animation frames are reached through the injected
`DOCUMENT` only, so the player carries no module globals, can be driven from a `TestBed` and
degrades to a no-op when the document has no window. Its browser resources are released when
the owning injector is destroyed; live streams passed in through [IAudioSource](Interface.IAudioSource) keep
belonging to the caller and are detached, never stopped.

## Constructors

### Constructor

```ts
new AudioPlayer(): AudioPlayer;
```

Defined in: [audio/player/AudioPlayer.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L51)

Constructs a new instance of the `AudioPlayer` class whose browser resources follow the
Angular injection lifecycle.

#### Returns

`AudioPlayer`

## Accessors

### currentTime

#### Get Signature

```ts
get currentTime(): Signal<number>;
```

Defined in: [audio/player/AudioPlayer.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L65)

Current playback position in seconds.

##### Returns

`Signal`\<`number`\>

***

### duration

#### Get Signature

```ts
get duration(): Signal<number>;
```

Defined in: [audio/player/AudioPlayer.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L75)

Duration of a seekable source in seconds, or zero for an unknown live duration.

##### Returns

`Signal`\<`number`\>

***

### error

#### Get Signature

```ts
get error(): Signal<string | null>;
```

Defined in: [audio/player/AudioPlayer.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L85)

Last playback failure message.

##### Returns

`Signal`\<`string` \| `null`\>

***

### isMuted

#### Get Signature

```ts
get isMuted(): Signal<boolean>;
```

Defined in: [audio/player/AudioPlayer.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L95)

Indicates whether output is muted without changing the retained volume.

##### Returns

`Signal`\<`boolean`\>

***

### isPaused

#### Get Signature

```ts
get isPaused(): Signal<boolean>;
```

Defined in: [audio/player/AudioPlayer.ts:105](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L105)

Indicates whether playback is paused after having started.

##### Returns

`Signal`\<`boolean`\>

***

### isPlaying

#### Get Signature

```ts
get isPlaying(): Signal<boolean>;
```

Defined in: [audio/player/AudioPlayer.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L115)

Indicates whether audio is actively playing.

##### Returns

`Signal`\<`boolean`\>

***

### loop

#### Get Signature

```ts
get loop(): Signal<boolean>;
```

Defined in: [audio/player/AudioPlayer.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L125)

Current loop setting.

##### Returns

`Signal`\<`boolean`\>

***

### sourceStream

#### Get Signature

```ts
get sourceStream(): Signal<MediaStream | null>;
```

Defined in: [audio/player/AudioPlayer.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L135)

Externally owned live stream currently attached to the audio element.

##### Returns

`Signal`\<`MediaStream` \| `null`\>

***

### sourceUrl

#### Get Signature

```ts
get sourceUrl(): Signal<string | null>;
```

Defined in: [audio/player/AudioPlayer.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L145)

Current URL source, including object URLs created for blobs.

##### Returns

`Signal`\<`string` \| `null`\>

***

### timeLabel

#### Get Signature

```ts
get timeLabel(): Signal<string>;
```

Defined in: [audio/player/AudioPlayer.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L155)

Current and total duration formatted as `mm:ss / mm:ss`.

##### Returns

`Signal`\<`string`\>

***

### volume

#### Get Signature

```ts
get volume(): Signal<number>;
```

Defined in: [audio/player/AudioPlayer.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L165)

Playback volume in the inclusive range from zero to one.

##### Returns

`Signal`\<`number`\>

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [audio/player/AudioPlayer.ts:339](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L339)

Detaches sources and listeners without stopping externally owned media tracks.

#### Returns

`void`

***

### load()

```ts
load(source): void;
```

Defined in: [audio/player/AudioPlayer.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L179)

Loads a URL, blob, or live stream without starting playback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`IAudioSource`](Interface.IAudioSource) | Source to attach to the audio element. |

#### Returns

`void`

***

### pause()

```ts
pause(): void;
```

Defined in: [audio/player/AudioPlayer.ts:257](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L257)

Pauses playback without detaching the current source.

#### Returns

`void`

***

### play()

```ts
play(source?, options?): Promise<void>;
```

Defined in: [audio/player/AudioPlayer.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L219)

Plays the current source and optionally loads a new one first.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source?` | [`IAudioSource`](Interface.IAudioSource) \| `null` | Source loaded before playback starts. |
| `options?` | [`IAudioPlayOptions`](Interface.IAudioPlayOptions) \| `null` | Volume, loop, and seek settings for this call. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once the element reports playback.

#### Throws

The browser playback failure, after publishing its message on [error](#error).

***

### setLoop()

```ts
setLoop(value): void;
```

Defined in: [audio/player/AudioPlayer.ts:312](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L312)

Changes the loop behavior of seekable sources.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | `true` to repeat playback. |

#### Returns

`void`

***

### setMuted()

```ts
setMuted(muted): void;
```

Defined in: [audio/player/AudioPlayer.ts:326](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L326)

Mutes or unmutes output without replacing the configured volume.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `muted` | `boolean` | `true` to silence playback. |

#### Returns

`void`

***

### setVolume()

```ts
setVolume(value): void;
```

Defined in: [audio/player/AudioPlayer.ts:296](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L296)

Changes playback volume while retaining the current source.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | Volume in the inclusive range from zero to one; values outside are clamped. |

#### Returns

`void`

***

### stop()

```ts
stop(): void;
```

Defined in: [audio/player/AudioPlayer.ts:273](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/AudioPlayer.ts#L273)

Stops playback and rewinds only seekable sources.

#### Returns

`void`
