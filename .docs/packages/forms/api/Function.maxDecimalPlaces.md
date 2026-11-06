---
title: 'Function: maxDecimalPlaces()'
generated: true
editUrl: false
---
# Function: maxDecimalPlaces()

```ts
function maxDecimalPlaces<TPathKind>(
   path,
   decimalPlaces,
   config?
): void;
```

Defined in: [validators/maxDecimalPlaces.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/maxDecimalPlaces.ts#L21)

Validates the maximum decimal precision of a present finite number. Non-finite numbers and `null`
pass so the validator composes with `finite` and `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`number` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `decimalPlaces` | `number` | The maximum number of decimal places accepted. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`number` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
