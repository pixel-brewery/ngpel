---
title: 'Function: safeScaledInteger()'
generated: true
editUrl: false
---
# Function: safeScaledInteger()

```ts
function safeScaledInteger<TPathKind>(
   path,
   factor,
   config?
): void;
```

Defined in: [validators/safeScaledInteger.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/safeScaledInteger.ts#L23)

Requires a present numeric value to remain a safe integer after multiplication by a fixed scale
factor (for example `100` for amounts stored in cents). Decimal precision is validated separately
by `maxDecimalPlaces`; `null` passes so the validator composes with `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`number` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `factor` | `number` | The positive safe-integer scale factor. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`number` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`

## Throws

RangeError when `factor` is not a positive safe integer.
