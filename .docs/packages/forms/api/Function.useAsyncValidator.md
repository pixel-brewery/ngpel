---
title: 'Function: useAsyncValidator()'
generated: true
editUrl: false
---
# Function: useAsyncValidator()

```ts
function useAsyncValidator<TValue, TParams, TResult, TPathKind>(options): void;
```

Defined in: [async/useAsyncValidator.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/useAsyncValidator.ts#L20)

Registers an asynchronous Signal Forms validator that checks a field through a resource factory
(typically an HTTP lookup) and maps the result to validation errors. Rejections report no error
unless `onError` is configured.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TParams` | - | The parameters derived from the field value. |
| `TResult` | - | The result produced by the resource. |
| `TPathKind` *extends* `PathKind` | `Root` | The kind of the validated path. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions)\<`TValue`, `TParams`, `TResult`, `TPathKind`\> | Path, parameter derivation, resource factory, result mapping and activation condition. |

## Returns

`void`
