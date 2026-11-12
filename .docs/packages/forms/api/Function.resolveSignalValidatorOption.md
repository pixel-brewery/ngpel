---
title: 'Function: resolveSignalValidatorOption()'
generated: true
editUrl: false
---
# Function: resolveSignalValidatorOption()

```ts
function resolveSignalValidatorOption<TValue, TOption, TPathKind>(option, context): TOption | undefined;
```

Defined in: [config/resolveSignalValidatorOption.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/config/resolveSignalValidatorOption.ts#L19)

Resolves a validator option that is either a static value or a `LogicFn` evaluated against the
field context.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-tvalue"></a> `TValue` | - | The value type of the validated field. |
| <a id="type-parameter-toption"></a> `TOption` | - | The option type once resolved. |
| <a id="type-parameter-tpathkind"></a> `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `option` | `TOption` \| `LogicFn`\<`TValue`, `TOption`, `TPathKind`\> \| `undefined` | The static option, its field-context resolver, or `undefined`. |
| `context` | `FieldContext`\<`TValue`, `TPathKind`\> | The field context of the validated field. |

## Returns

`TOption` \| `undefined`

The resolved option, or `undefined` when no option was configured.
