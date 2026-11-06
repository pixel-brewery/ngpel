---
title: 'Function: uuid()'
generated: true
editUrl: false
---
# Function: uuid()

```ts
function uuid<TPathKind>(path, config?): void;
```

Defined in: [validators/uuid.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/uuid.ts#L21)

Validates an optional RFC 9562 UUID in canonical textual form (versions 1 to 8). Empty strings pass so the validator composes with `required`.

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
