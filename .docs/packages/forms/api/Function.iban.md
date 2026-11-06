---
title: 'Function: iban()'
generated: true
editUrl: false
---
# Function: iban()

```ts
function iban<TPathKind>(path, config?): void;
```

Defined in: [validators/iban.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/iban.ts#L108)

Validates that an optional string is an IBAN with a known country code, the registered length
for that country and a valid ISO 7064 mod-97 checksum. Whitespace and casing are ignored. Empty
strings pass so the validator composes with `required`.

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
