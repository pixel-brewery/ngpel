---
title: 'Function: nonBlank()'
generated: true
editUrl: false
---
# Function: nonBlank()

```ts
function nonBlank<TPathKind>(path, config?): void;
```

Defined in: [validators/nonBlank.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/nonBlank.ts#L21)

Requires a string to contain at least one non-whitespace character. Unlike the other text
validators an empty string fails; the error kind is `required` so it fills the same error slot
as Angular's built-in validator.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`string`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`string`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
