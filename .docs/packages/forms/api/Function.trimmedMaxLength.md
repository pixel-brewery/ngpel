---
title: 'Function: trimmedMaxLength()'
generated: true
editUrl: false
---
# Function: trimmedMaxLength()

```ts
function trimmedMaxLength<TPathKind>(
   path,
   maxLength,
   config?
): void;
```

Defined in: [validators/trimmedMaxLength.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/trimmedMaxLength.ts#L21)

Checks the maximum length of a string after trimming surrounding whitespace. Use `nonBlank`
alongside it when the field also requires a value.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`string`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `maxLength` | `number` | The maximum length after trimming. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`string`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
