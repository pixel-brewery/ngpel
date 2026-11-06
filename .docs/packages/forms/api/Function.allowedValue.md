---
title: 'Function: allowedValue()'
generated: true
editUrl: false
---
# Function: allowedValue()

```ts
function allowedValue<TValue, TPathKind>(
   path,
   allowedValues,
   config?
): void;
```

Defined in: [validators/allowedValue.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/allowedValue.ts#L21)

Requires a value to be part of an allowed set (`Array.prototype.includes` semantics).

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`TValue`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `allowedValues` | \| readonly `TValue`[] \| `LogicFn`\<`TValue`, readonly `TValue`[], `TPathKind`\> | Accepted values or a resolver that reads sibling fields or other signals. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`TValue`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
