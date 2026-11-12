---
title: 'Function: resolveMosaikSelectionValue()'
generated: true
editUrl: false
---
# Function: resolveMosaikSelectionValue()

```ts
function resolveMosaikSelectionValue(event): string | null;
```

Defined in: [libs/ui/src/events/resolveMosaikSelectionValue.ts:15](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/events/resolveMosaikSelectionValue.ts#L15)

Resolves the string value selected by a Mosaik selector.

Mosaik's Angular wrapper emits the custom-event detail directly, while raw
element listeners receive the same detail below `event.detail`. Direct
string values and native target values remain supported for command and
test callers.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `unknown` | Angular output detail, raw selection event, or direct value. |

## Returns

`string` \| `null`

The selected string value, or `null` for unsupported payloads.
