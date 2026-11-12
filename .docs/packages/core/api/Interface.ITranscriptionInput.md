---
title: 'Interface: ITranscriptionInput'
generated: true
editUrl: false
---
# Interface: ITranscriptionInput

Defined in: [audio/transcribers/ITranscriptionInput.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ITranscriptionInput.ts#L6)

The recorded audio handed to a [IVoiceTranscriber](Interface.IVoiceTranscriber).

## Properties

### blob

```ts
readonly blob: Blob;
```

Defined in: [audio/transcribers/ITranscriptionInput.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ITranscriptionInput.ts#L12)

Encoded audio payload to transcribe.

***

### filename?

```ts
readonly filename?: string | null;
```

Defined in: [audio/transcribers/ITranscriptionInput.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ITranscriptionInput.ts#L17)

File name a remote strategy may attach to its upload.

***

### mimeType?

```ts
readonly mimeType?: string | null;
```

Defined in: [audio/transcribers/ITranscriptionInput.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/audio/transcribers/ITranscriptionInput.ts#L22)

Effective MIME type of the payload when it differs from `blob.type`.
