---
title: 'Function: emailAddress()'
generated: true
editUrl: false
---
# Function: emailAddress()

```ts
function emailAddress<TPathKind>(path, config?): void;
```

Defined in: [validators/emailAddress.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/validators/emailAddress.ts#L22)

Validates an optional email address with a qualified domain using the framework-free
`isEmailAddress` predicate of `@pixel-brewery/ngpel-core`, so pipes and validators agree on one
definition. Empty strings pass so the validator composes with `required`.

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
