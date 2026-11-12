---
title: 'Function: currencyCode()'
generated: true
editUrl: false
---
# Function: currencyCode()

```ts
function currencyCode<TPathKind>(path, config?): void;
```

Defined in: [validators/currencyCode.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/currencyCode.ts#L21)

Validates the shape of an optional ISO 4217 alphabetic currency code (three letters, no currency table). Empty strings pass so the validator composes with `required`.

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
