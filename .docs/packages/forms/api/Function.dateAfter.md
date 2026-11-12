---
title: 'Function: dateAfter()'
generated: true
editUrl: false
---
# Function: dateAfter()

```ts
function dateAfter<TPathKind>(
   path,
   minimum,
   config?
): void;
```

Defined in: [validators/dateAfter.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/dateAfter.ts#L24)

Requires a present valid `Date` to be strictly after an exclusive lower bound, compared as
instants. Invalid dates are left to `validDate`; `null` values and a `null` bound pass.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`Date` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `minimum` | [`DateReference`](TypeAlias.DateReference)\<`TPathKind`\> | Exclusive lower bound or its context-dependent resolver. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`Date` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
