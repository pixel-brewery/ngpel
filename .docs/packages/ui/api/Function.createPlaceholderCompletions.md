---
title: 'Function: createPlaceholderCompletions()'
generated: true
editUrl: false
---
# Function: createPlaceholderCompletions()

```ts
function createPlaceholderCompletions(placeholders): CompletionSource;
```

Defined in: [libs/ui/src/components/code-editor/placeholderCompletions.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/code-editor/placeholderCompletions.ts#L16)

Creates a CodeMirror `CompletionSource` that suggests <code v-pre>{{placeholder}}</code> tokens.
The completions trigger when the user types <code v-pre>{{</code> or when invoked explicitly.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `placeholders` | readonly `string`[] | The list of available placeholder names. |

## Returns

`CompletionSource`

A `CompletionSource` providing placeholder completions.
