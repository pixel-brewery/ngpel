---
title: 'Function: finite()'
generated: true
editUrl: false
---
# Function: finite()

```ts
function finite<TPathKind>(path, config?): void;
```

Defined in: [validators/finite.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/finite.ts#L20)

Requires a present numeric value to be finite (`NaN` and infinities are rejected). `null` passes
so the validator composes with `required`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `path` | `SchemaPath`\<`number` \| `null`, `1`, `TPathKind`\> | Signal Forms schema path to validate. |
| `config?` | [`SignalValidatorConfig`](TypeAlias.SignalValidatorConfig)\<`number` \| `null`, `TPathKind`\> | Optional custom message, error or activation condition. |

## Returns

`void`
