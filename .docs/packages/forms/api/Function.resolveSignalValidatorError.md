---
title: 'Function: resolveSignalValidatorError()'
generated: true
editUrl: false
---
# Function: resolveSignalValidatorError()

```ts
function resolveSignalValidatorError<TValue, TPathKind>(
   config,
   context,
   createError
): OneOrMany<ValidationError> | undefined;
```

Defined in: [config/resolveSignalValidatorError.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/resolveSignalValidatorError.ts#L22)

Produces the validation result of a failed validator: the configured custom `error` when one is
present, otherwise the validator's default error built by `createError` with the resolved
`message`. Product validators built on [SignalValidatorConfig](TypeAlias.SignalValidatorConfig) share this tail.

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
| `createError` | (`message`) => `WithoutFieldTree` | Builds the validator's default error from the resolved message. |

## Returns

`OneOrMany`\<`ValidationError`\> \| `undefined`

The error(s) to report; `undefined` when a configured error resolver produced nothing.
