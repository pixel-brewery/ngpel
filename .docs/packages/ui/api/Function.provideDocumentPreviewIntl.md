---
title: 'Function: provideDocumentPreviewIntl()'
generated: true
editUrl: false
---
# Function: provideDocumentPreviewIntl()

```ts
function provideDocumentPreviewIntl(translations): Provider;
```

Defined in: libs/ui/src/components/document-preview/provideDocumentPreviewIntl.ts:13

Maps the preview labels to application translation keys. Unmapped labels retain their defaults.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `translations` | [`IntlTranslationMap`](TypeAlias.IntlTranslationMap)\<[`DocumentPreviewIntl`](Class.DocumentPreviewIntl)\> | Label-to-key mapping. |

## Returns

`Provider`

The Angular provider.
