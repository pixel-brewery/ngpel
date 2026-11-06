---
title: 'Function: countryCode()'
generated: true
editUrl: false
---
# Function: countryCode()

```ts
function countryCode<TPathKind>(path, config?): void;
```

Defined in: [validators/countryCode.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/countryCode.ts#L21)

Validates the shape of an optional ISO 3166-1 alpha-2 country code (two letters, no country table). Empty strings pass so the validator composes with `required`.

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
