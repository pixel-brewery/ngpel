---
title: 'Abstract Class: AudioLevelWorkletModuleLoader'
generated: true
editUrl: false
---
# Abstract Class: AudioLevelWorkletModuleLoader

Defined in: [audio/level/AudioLevelWorkletModuleLoader.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelWorkletModuleLoader.ts#L16)

DI token and strategy for registering the level processor in one Web Audio context.
By default the browser loads a temporary blob URL. Hosts can provide a loader for a static
[AUDIO\_LEVEL\_WORKLET\_SOURCE](Variable.AUDIO_LEVEL_WORKLET_SOURCE) asset under their content security policy.

## Constructors

### Constructor

```ts
new AudioLevelWorkletModuleLoader(): AudioLevelWorkletModuleLoader;
```

#### Returns

`AudioLevelWorkletModuleLoader`

## Methods

### load()

```ts
abstract load(context): Promise<void>;
```

Defined in: [audio/level/AudioLevelWorkletModuleLoader.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelWorkletModuleLoader.ts#L20)

Registers the level processor before the monitor connects the graph.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `AudioContext` |

#### Returns

`Promise`\<`void`\>
