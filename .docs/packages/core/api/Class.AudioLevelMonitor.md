---
title: 'Class: AudioLevelMonitor'
generated: true
editUrl: false
---
# Class: AudioLevelMonitor

Defined in: [audio/level/AudioLevelMonitor.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L60)

Measures a borrowed stream in sample-aligned mono windows at 24 kHz. Provide a separate monitor
for each independent capture. Only the analysis graph is owned by the monitor.

## Constructors

### Constructor

```ts
new AudioLevelMonitor(): AudioLevelMonitor;
```

Defined in: [audio/level/AudioLevelMonitor.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L78)

Releases the graph when the providing injector is destroyed.

#### Returns

`AudioLevelMonitor`

## Accessors

### error

#### Get Signature

```ts
get error(): Signal<Error | null>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L87)

The latest browser or worklet failure, cleared when starting a new capture.

##### Returns

`Signal`\<`Error` \| `null`\>

***

### levels

#### Get Signature

```ts
get levels(): Observable<IAudioLevelMeasurement>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L92)

Ordered level measurements, including the last partial window on graceful stop.

##### Returns

`Observable`\<[`IAudioLevelMeasurement`](Interface.IAudioLevelMeasurement)\>

***

### state

#### Get Signature

```ts
get state(): Signal<AudioLevelMonitorState>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L97)

The current lifecycle state of the monitor.

##### Returns

`Signal`\<[`AudioLevelMonitorState`](TypeAlias.AudioLevelMonitorState)\>

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [audio/level/AudioLevelMonitor.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L199)

Permanently releases the graph immediately and completes the measurement stream.

#### Returns

`void`

***

### isSupported()

```ts
isSupported(): boolean;
```

Defined in: [audio/level/AudioLevelMonitor.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L106)

Indicates whether the browser exposes the required Web Audio constructors.

#### Returns

`boolean`

***

### pause()

```ts
pause(): Promise<void>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L173)

Pauses measurements while retaining the borrowed stream and the graph.

#### Returns

`Promise`\<`void`\>

***

### resume()

```ts
resume(): Promise<void>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L178)

Resumes measurement of the same stream.

#### Returns

`Promise`\<`void`\>

***

### start()

```ts
start(stream, options?): Promise<void>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:111](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L111)

Starts monitoring a stream with at least one live audio track.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `stream` | `MediaStream` |
| `options` | [`IAudioLevelMonitorOptions`](Interface.IAudioLevelMonitorOptions) |

#### Returns

`Promise`\<`void`\>

***

### stop()

```ts
stop(): Promise<void>;
```

Defined in: [audio/level/AudioLevelMonitor.ts:183](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/level/AudioLevelMonitor.ts#L183)

Flushes any partial measurement and releases the graph without ending the stream.

#### Returns

`Promise`\<`void`\>
