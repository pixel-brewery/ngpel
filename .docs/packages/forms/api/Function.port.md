---
title: 'Function: port()'
generated: true
editUrl: false
---
# Function: port()

```ts
function port<TPathKind>(path, config?): void;
```

Defined in: [validators/port.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/port.ts#L23)

Validates that an optional string is an integral TCP port number from 1 to 65535. Empty strings
pass so the validator composes with `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`string`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`string`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
