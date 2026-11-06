---
title: 'Class: ClipboardService'
generated: true
editUrl: false
---
# Class: ClipboardService

Defined in: [browser/clipboard/ClipboardService.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/clipboard/ClipboardService.ts#L16)

Default [IClipboard](Interface.IClipboard) adapter over the asynchronous Clipboard API. The platform is reached
through the injected `DOCUMENT` only, so the adapter stays free of module globals, can be faked
in a `TestBed` and does nothing outside a browser window.

## Implements

- [`IClipboard`](Interface.IClipboard)

## Constructors

### Constructor

```ts
new ClipboardService(): ClipboardService;
```

#### Returns

`ClipboardService`

## Methods

### writeText()

```ts
writeText(text): Promise<boolean>;
```

Defined in: [browser/clipboard/ClipboardService.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/clipboard/ClipboardService.ts#L32)

Writes `text` to the system clipboard.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` \| `undefined` | The text to copy; empty or `undefined` values copy nothing. |

#### Returns

`Promise`\<`boolean`\>

`true` when the text was written, otherwise `false`.

#### Implementation of

[`IClipboard`](Interface.IClipboard).[`writeText`](Interface.IClipboard#writetext)
