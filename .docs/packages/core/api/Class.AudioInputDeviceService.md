---
title: 'Class: AudioInputDeviceService'
generated: true
editUrl: false
---
# Class: AudioInputDeviceService

Defined in: [audio/devices/AudioInputDeviceService.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L40)

Discovers browser microphones and owns one short-lived, non-recording voice test.

The voice test acquires a stream, grades its level through an `AnalyserNode` and marks the
device as verified after three consecutive usable samples, so a settings page can prove a
microphone works before a recording depends on it. Nothing is recorded, the stream is released
with the test, and the media APIs — `mediaDevices`, `permissions` and `AudioContext` — are
reached through the injected `DOCUMENT` only. Timers remain the ambient ones.

## Constructors

### Constructor

```ts
new AudioInputDeviceService(): AudioInputDeviceService;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L80)

Constructs a new instance of the `AudioInputDeviceService` class and guarantees the release
of its browser audio resources.

#### Returns

`AudioInputDeviceService`

## Accessors

### activeDeviceId

#### Get Signature

```ts
get activeDeviceId(): Signal<string | null>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L94)

Microphone identifier a running voice test holds a stream for.

##### Returns

`Signal`\<`string` \| `null`\>

***

### decibels

#### Get Signature

```ts
get decibels(): Signal<number | null>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L104)

Current signal level in dBFS, or `null` while nothing is measured.

##### Returns

`Signal`\<`number` \| `null`\>

***

### devices

#### Get Signature

```ts
get devices(): Signal<readonly IAudioInputDevice[]>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L114)

Available browser audio-input devices.

##### Returns

`Signal`\<readonly [`IAudioInputDevice`](Interface.IAudioInputDevice)[]\>

***

### error

#### Get Signature

```ts
get error(): Signal<AudioInputDeviceError | null>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L124)

Last typed discovery, permission, capture, or analysis failure.

##### Returns

`Signal`\<[`AudioInputDeviceError`](Class.AudioInputDeviceError) \| `null`\>

***

### isBusy

#### Get Signature

```ts
get isBusy(): Signal<boolean>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L134)

Indicates whether a browser operation is currently pending.

##### Returns

`Signal`\<`boolean`\>

***

### isSupported

#### Get Signature

```ts
get isSupported(): Signal<boolean>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:144](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L144)

Indicates whether the required browser media APIs are available.

##### Returns

`Signal`\<`boolean`\>

***

### isTesting

#### Get Signature

```ts
get isTesting(): Signal<boolean>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L154)

Indicates whether a voice test is starting or listening.

##### Returns

`Signal`\<`boolean`\>

***

### mediaStream

#### Get Signature

```ts
get mediaStream(): Signal<MediaStream | null>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:164](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L164)

Test stream, exposed for a live waveform visualization.

##### Returns

`Signal`\<`MediaStream` \| `null`\>

***

### permissionState

#### Get Signature

```ts
get permissionState(): Signal<AudioInputPermissionState>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:174](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L174)

Current browser microphone permission state.

##### Returns

`Signal`\<[`AudioInputPermissionState`](TypeAlias.AudioInputPermissionState)\>

***

### signalQuality

#### Get Signature

```ts
get signalQuality(): Signal<AudioInputSignalQuality>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:184](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L184)

Current normalized microphone signal quality.

##### Returns

`Signal`\<[`AudioInputSignalQuality`](TypeAlias.AudioInputSignalQuality)\>

***

### testedDeviceId

#### Get Signature

```ts
get testedDeviceId(): Signal<string | null>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:204](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L204)

Device identifier that passed a voice test during this service's lifetime.

##### Returns

`Signal`\<`string` \| `null`\>

***

### testState

#### Get Signature

```ts
get testState(): Signal<AudioInputTestState>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:194](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L194)

Current voice-test lifecycle.

##### Returns

`Signal`\<[`AudioInputTestState`](TypeAlias.AudioInputTestState)\>

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:416](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L416)

Releases listeners, streams, timers, and Web Audio nodes.

#### Returns

`void`

***

### initialize()

```ts
initialize(): Promise<void>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:219](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L219)

Discovers devices, observes browser device changes, and resolves the permission state.

#### Returns

`Promise`\<`void`\>

A promise that resolves once devices and permission state are known.

#### Throws

AudioInputDeviceError when the browser has no audio-input APIs.

***

### refresh()

```ts
refresh(): Promise<void>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:237](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L237)

Refreshes the browser's current audio-input inventory.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the inventory is published.

#### Throws

AudioInputDeviceError when enumeration is unavailable or fails.

***

### requestPermission()

```ts
requestPermission(): Promise<void>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:286](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L286)

Requests microphone permission without retaining or recording the acquired stream.

#### Returns

`Promise`\<`void`\>

A promise that resolves once permission is granted.

#### Throws

AudioInputDeviceError when the browser denies or cannot serve the request.

***

### startTest()

```ts
startTest(deviceId): Promise<void>;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:324](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L324)

Starts a non-recording voice test for one browser microphone.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deviceId` | `string` | Exact browser-scoped device identifier. |

#### Returns

`Promise`\<`void`\>

A promise that resolves once the test listens.

#### Throws

AudioInputDeviceError when the device is missing, blocked, or cannot be analysed.

***

### stopTest()

```ts
stopTest(): void;
```

Defined in: [audio/devices/AudioInputDeviceService.ts:402](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceService.ts#L402)

Stops the owned test stream while preserving a successful test result.

#### Returns

`void`
