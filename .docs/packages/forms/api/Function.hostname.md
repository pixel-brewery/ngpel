---
title: 'Function: hostname()'
generated: true
editUrl: false
---
# Function: hostname()

```ts
function hostname<TPathKind>(path, config?): void;
```

Defined in: [validators/hostname.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/hostname.ts#L25)

Validates that an optional string is a fully qualified hostname per RFC 5321 (single-label names such as `localhost` are rejected). Empty strings pass so the validator composes with `required`.

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
