---
title: 'Function: provideAudioPlayer()'
generated: true
editUrl: false
---
# Function: provideAudioPlayer()

```ts
function provideAudioPlayer(): EnvironmentProviders;
```

Defined in: [audio/player/provideAudioPlayer.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/player/provideAudioPlayer.ts#L23)

Registers the [AudioPlayer](Class.AudioPlayer) for the composition root it is added to. The player is bound
to that injector's lifetime, so a route-level composition releases its element when the route is
left instead of keeping one element alive for the whole application.

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Example

```typescript
export const appConfig = {
    providers: [provideAudioPlayer()]
};
```
