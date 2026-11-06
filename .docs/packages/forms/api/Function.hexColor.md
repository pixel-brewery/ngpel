---
title: 'Function: hexColor()'
generated: true
editUrl: false
---
# Function: hexColor()

```ts
function hexColor<TPathKind>(path, config?): void;
```

Defined in: [validators/hexColor.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/hexColor.ts#L21)

Validates an optional six-digit hexadecimal color including its leading hash; surrounding whitespace is ignored. Empty strings pass so the validator composes with `required`.

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
