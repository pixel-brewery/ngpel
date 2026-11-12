---
title: 'Function: validDate()'
generated: true
editUrl: false
---
# Function: validDate()

```ts
function validDate<TPathKind>(path, config?): void;
```

Defined in: [validators/validDate.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/validDate.ts#L21)

Requires a present value to be a `Date` with a valid timestamp; invalid dates and non-date
runtime values are rejected. `null` passes so the validator composes with `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`Date` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`Date` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
