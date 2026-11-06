---
title: 'Function: play()'
generated: true
editUrl: false
---
# Function: play()

```ts
function play(src, options?): Promise<void>;
```

Defined in: [audio/player/play.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/play.ts#L27)

Plays one sound through the [AudioPlayer](Class.AudioPlayer) of the current injector. Intended for the short
notification sounds that would otherwise make every caller inject the player itself; it must run
inside an injection context, so a component reaches it from a field initializer or through
`runInInjectionContext`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `src` | [`IAudioSource`](Interface.IAudioSource) | URL, retained blob, or externally owned live media stream. |
| `options?` | [`IAudioPlayOptions`](Interface.IAudioPlayOptions) \| `null` | Volume, loop, and seek settings for this call. |

## Returns

`Promise`\<`void`\>

A promise that resolves once the element reports playback.

## Throws

The browser playback failure when the sound cannot start.

## Example

```typescript
await play({ src: '/assets/sounds/notification.mp3' }, { volume: 0.4 });
```
