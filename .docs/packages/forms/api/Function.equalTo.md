---
title: 'Function: equalTo()'
generated: true
editUrl: false
---
# Function: equalTo()

```ts
function equalTo<TValue, TPathKind>(
   path,
   expectedValue,
   config?
): void;
```

Defined in: [validators/equalTo.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/equalTo.ts#L24)

Requires a value to equal a static or context-dependent reference value, compared with
`Object.is` (so `NaN` equals `NaN` and `+0` differs from `-0`). Typical use: a password
confirmation field resolving the reference through `context.valueOf(schema.password)`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`TValue`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `expectedValue` | [`EqualToReference`](TypeAlias.EqualToReference)\<`TValue`, `TPathKind`\> | Expected value or its context-dependent resolver. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`TValue`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
