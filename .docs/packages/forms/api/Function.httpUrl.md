---
title: 'Function: httpUrl()'
generated: true
editUrl: false
---
# Function: httpUrl()

```ts
function httpUrl<TPathKind>(path, config?): void;
```

Defined in: [validators/httpUrl.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/httpUrl.ts#L21)

Validates that an optional string is an absolute HTTP or HTTPS URL with a hostname, as parsed by
the WHATWG `URL` constructor; surrounding whitespace is ignored. Empty strings pass so the
validator composes with `required`.

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
