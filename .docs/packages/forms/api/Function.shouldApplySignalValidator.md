---
title: 'Function: shouldApplySignalValidator()'
generated: true
editUrl: false
---
# Function: shouldApplySignalValidator()

```ts
function shouldApplySignalValidator<TValue, TPathKind>(config, context): boolean;
```

Defined in: [config/shouldApplySignalValidator.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/shouldApplySignalValidator.ts#L19)

Determines whether a validator applies to the current field state by evaluating the optional
`when` condition of its configuration. Validators without a condition always apply.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `config` | \| [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`TValue`, `TPathKind`\> \| `undefined` | The validator configuration, if any. |
| `context` | `FieldContext`\<`TValue`, `TPathKind`\> | The field context of the validated field. |

## Returns

`boolean`

`true` when the validator should run.
