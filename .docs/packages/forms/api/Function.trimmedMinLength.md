---
title: 'Function: trimmedMinLength()'
generated: true
editUrl: false
---
# Function: trimmedMinLength()

```ts
function trimmedMinLength<TPathKind>(
   path,
   minLength,
   config?
): void;
```

Defined in: [validators/trimmedMinLength.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/trimmedMinLength.ts#L22)

Validates the minimum length of a string after removing surrounding whitespace. Empty strings
pass so the validator composes with `required`; the error kind is `minLength` so it fills the
same error slot as Angular's built-in validator.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`string`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `minLength` | `number` | The minimum length of the trimmed text. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`string`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
