---
title: 'Class: AudioInputDeviceError'
generated: true
editUrl: false
---
# Class: AudioInputDeviceError

Defined in: [audio/devices/AudioInputDeviceError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceError.ts#L13)

Typed browser audio-input failure with a stable recovery category. The original browser failure
is preserved as the error `cause`.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new AudioInputDeviceError(
   code,
   message,
   cause?
): AudioInputDeviceError;
```

Defined in: [audio/devices/AudioInputDeviceError.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceError.ts#L30)

Constructs a new instance of the `AudioInputDeviceError` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | [`AudioInputDeviceErrorCode`](TypeAlias.AudioInputDeviceErrorCode) | Stable recovery category. |
| `message` | `string` | Human-readable technical description. |
| `cause?` | `unknown` | Original browser failure, when one exists. |

#### Returns

`AudioInputDeviceError`

#### Overrides

`Error.constructor`

## Accessors

### code

#### Get Signature

```ts
get code(): AudioInputDeviceErrorCode;
```

Defined in: [audio/devices/AudioInputDeviceError.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/devices/AudioInputDeviceError.ts#L47)

Stable recovery category used by consuming interfaces.

##### Returns

[`AudioInputDeviceErrorCode`](TypeAlias.AudioInputDeviceErrorCode)
