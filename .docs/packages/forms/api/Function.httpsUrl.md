---
title: 'Function: httpsUrl()'
generated: true
editUrl: false
---
# Function: httpsUrl()

```ts
function httpsUrl<TPathKind>(path, config?): void;
```

Defined in: [validators/httpsUrl.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/httpsUrl.ts#L22)

Validates that an optional string is an absolute HTTPS URL; plain HTTP is rejected. Empty strings pass so the validator composes with `required`.

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
