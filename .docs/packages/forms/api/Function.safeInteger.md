---
title: 'Function: safeInteger()'
generated: true
editUrl: false
---
# Function: safeInteger()

```ts
function safeInteger<TPathKind>(path, config?): void;
```

Defined in: [validators/safeInteger.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/safeInteger.ts#L20)

Requires a present numeric value to be a safe integer (`Number.isSafeInteger`). `null` passes so
the validator composes with `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`number` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`number` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
