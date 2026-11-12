---
title: 'Function: withClipboard()'
generated: true
editUrl: false
---
# Function: withClipboard()

```ts
function withClipboard(adapter?): IFeature<BrowserFeatureKind>;
```

Defined in: [browser/features/withClipboard.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/features/withClipboard.ts#L20)

Registers the [CLIPBOARD](Variable.CLIPBOARD) port.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `adapter?` | `Type`\<[`IClipboard`](Interface.IClipboard)\> | `ClipboardService` | The adapter class to instantiate; defaults to the `DOCUMENT`-based [ClipboardService](Class.ClipboardService). |

## Returns

[`IFeature`](Interface.IFeature)\<[`BrowserFeatureKind`](TypeAlias.BrowserFeatureKind)\>

A feature for `provideBrowser(...)`.
