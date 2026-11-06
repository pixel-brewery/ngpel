---
title: 'Type Alias: InputSuggestionSource\<TOption\>'
generated: true
editUrl: false
---
# Type Alias: InputSuggestionSource\<TOption\>

```ts
type InputSuggestionSource<TOption> = (query, signal) => Promise<ReadonlyArray<TOption>> | ReadonlyArray<TOption>;
```

Defined in: libs/ui/src/directives/input-suggestions/InputSuggestionSource.ts:9

Supplies options for a normalized whole-field query. The signal is aborted when the query is
replaced, the suggestions close, or the owning directive is destroyed.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TOption` *extends* [`ITextSuggestionOption`](Interface.ITextSuggestionOption) | [`ITextSuggestionOption`](Interface.ITextSuggestionOption) |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `query` | `string` |
| `signal` | `AbortSignal` |

## Returns

`Promise`\<`ReadonlyArray`\<`TOption`\>\> \| `ReadonlyArray`\<`TOption`\>
