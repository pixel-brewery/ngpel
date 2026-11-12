---
title: 'Function: bic()'
generated: true
editUrl: false
---
# Function: bic()

```ts
function bic<TPathKind>(path, config?): void;
```

Defined in: [validators/bic.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/bic.ts#L21)

Validates an optional ISO 9362 Business Identifier Code of eight or eleven characters. Empty strings pass so the validator composes with `required`.

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
