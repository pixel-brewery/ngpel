---
title: 'Function: provideDataTableIntl()'
generated: true
editUrl: false
---
# Function: provideDataTableIntl()

```ts
function provideDataTableIntl(translations): Provider;
```

Defined in: [libs/ui/src/intl/DataTableIntl.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/intl/DataTableIntl.ts#L21)

Provides the application's own labels for the Mosaik data table.

The data table embeds the column editor, so a column-editor internationalization provided
alongside it is folded in rather than silently ignored.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `translations` | [`IntlTranslationMap`](TypeAlias.IntlTranslationMap)\<`DataTableElementIntl`\> | Translation keys for the data table labels. |

## Returns

`Provider`

The provider to add to the composition root.
