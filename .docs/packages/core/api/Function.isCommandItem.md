---
title: 'Function: isCommandItem()'
generated: true
editUrl: false
---
# Function: isCommandItem()

```ts
function isCommandItem(value): value is ICommandItem;
```

Defined in: [search/models/isCommandItem.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/search/models/isCommandItem.ts#L15)

Narrows a search surface item to an executable command. A command is recognised by its
`execute()` method, which no search result carries.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to test. |

## Returns

`value is ICommandItem`

`true` when the value is an [ICommandItem](Interface.ICommandItem).
