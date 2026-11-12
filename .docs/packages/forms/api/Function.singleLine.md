---
title: 'Function: singleLine()'
generated: true
editUrl: false
---
# Function: singleLine()

```ts
function singleLine<TPathKind>(path, config?): void;
```

Defined in: [validators/singleLine.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/singleLine.ts#L21)

Validates that optional text can be represented on one line: control characters and Unicode line or paragraph separators are rejected. Empty strings pass so the validator composes with `required`.

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
