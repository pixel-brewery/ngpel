---
title: 'Interface: IClipboard'
generated: true
editUrl: false
---
# Interface: IClipboard

Defined in: [browser/clipboard/IClipboard.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/clipboard/IClipboard.ts#L8)

Port for writing text to the system clipboard. The outcome is reported instead of swallowed:
a rejected write is indistinguishable from a successful one to the user, so the caller owns
the confirmation it shows.

## Methods

### writeText()

```ts
writeText(text): Promise<boolean>;
```

Defined in: [browser/clipboard/IClipboard.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/clipboard/IClipboard.ts#L18)

Writes `text` to the clipboard.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` \| `undefined` | The text to copy; empty or `undefined` values copy nothing. |

#### Returns

`Promise`\<`boolean`\>

`true` when the text was written, `false` when there was nothing to write, no
clipboard is available or the platform rejected the write.
