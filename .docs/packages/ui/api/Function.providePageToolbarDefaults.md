---
title: 'Function: providePageToolbarDefaults()'
generated: true
editUrl: false
---
# Function: providePageToolbarDefaults()

```ts
function providePageToolbarDefaults(defaults): Provider;
```

Defined in: [libs/ui/src/components/page-toolbar/providePageToolbarDefaults.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-toolbar/providePageToolbarDefaults.ts#L12)

Supplies application defaults for page toolbars. Individual toolbar inputs take precedence.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `defaults` | \| [`IPageToolbarDefaults`](Interface.IPageToolbarDefaults) \| (() => [`IPageToolbarDefaults`](Interface.IPageToolbarDefaults)) | Default controls and labels, or a factory that resolves them in the application injector. |

## Returns

`Provider`

Angular provider for page toolbars.
