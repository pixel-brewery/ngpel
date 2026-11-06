---
title: 'Class: AudioRecorderError'
generated: true
editUrl: false
---
# Class: AudioRecorderError

Defined in: [audio/recorder/AudioRecorderError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorderError.ts#L13)

Typed browser audio failure suitable for user-facing recovery decisions. The original browser
failure is preserved as the error `cause`.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new AudioRecorderError(
   code,
   message,
   cause?
): AudioRecorderError;
```

Defined in: [audio/recorder/AudioRecorderError.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorderError.ts#L30)

Constructs a new instance of the `AudioRecorderError` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | [`AudioRecorderErrorCode`](TypeAlias.AudioRecorderErrorCode) | Stable failure category. |
| `message` | `string` | Human-readable technical description. |
| `cause?` | `unknown` | Original browser failure, when one exists. |

#### Returns

`AudioRecorderError`

#### Overrides

```ts
Error.constructor
```

## Accessors

### code

#### Get Signature

```ts
get code(): AudioRecorderErrorCode;
```

Defined in: [audio/recorder/AudioRecorderError.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/recorder/AudioRecorderError.ts#L47)

Stable failure category used by consuming interfaces.

##### Returns

[`AudioRecorderErrorCode`](TypeAlias.AudioRecorderErrorCode)
