---
title: 'Function: provideTextToSpeech()'
generated: true
editUrl: false
---
# Function: provideTextToSpeech()

```ts
function provideTextToSpeech(): EnvironmentProviders;
```

Defined in: [audio/speech/provideTextToSpeech.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/speech/provideTextToSpeech.ts#L22)

Registers the [TextToSpeechService](Class.TextToSpeechService) for the composition root it is added to. Speech is
bound to that injector's lifetime, so leaving a route that reads text aloud silences it.

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Example

```typescript
export const appConfig = {
    providers: [provideTextToSpeech()]
};
```
