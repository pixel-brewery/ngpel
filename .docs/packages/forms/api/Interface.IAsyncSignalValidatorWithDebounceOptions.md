---
title: >-
  Interface: IAsyncSignalValidatorWithDebounceOptions\<TValue, TParams, TResult,
  TPathKind\>
generated: true
editUrl: false
---
# Interface: IAsyncSignalValidatorWithDebounceOptions\<TValue, TParams, TResult, TPathKind\>

Defined in: [async/IAsyncSignalValidatorWithDebounceOptions.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorWithDebounceOptions.ts#L18)

Options of [useAsyncValidatorWithDebounce](Function.useAsyncValidatorWithDebounce): the async validator options plus an optional
debounce applied to the validated path before the validator is registered.

## Extends

- [`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions)\<`TValue`, `TParams`, `TResult`, `TPathKind`\>

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `TValue` | - | The value type of the validated field. |
| `TParams` | - | The parameters derived from the field value. |
| `TResult` | - | The result produced by the resource. |
| `TPathKind` *extends* `PathKind` | `PathKind.Root` | The kind of the validated path. |

## Properties

### config?

```ts
readonly optional config?: {
  durationOrDebouncer?: number | Debouncer<TValue, TPathKind>;
};
```

Defined in: [async/IAsyncSignalValidatorWithDebounceOptions.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorWithDebounceOptions.ts#L27)

Debounce configuration; omitted or a falsy duration registers the validator undebounced.

#### durationOrDebouncer?

```ts
readonly optional durationOrDebouncer?: number | Debouncer<TValue, TPathKind>;
```

***

### factoryFn

```ts
readonly factoryFn: (params) => ResourceRef<TResult | undefined>;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L29)

Creates the resource that performs the asynchronous check for the given parameters.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `Signal`\<`TParams` \| `undefined`\> |

#### Returns

`ResourceRef`\<`TResult` \| `undefined`\>

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`factoryFn`](Interface.IAsyncSignalValidatorOptions#factoryfn)

***

### mapResultToError

```ts
readonly mapResultToError: (result, context) => unknown;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L32)

Maps a resolved result to a validation error, a list of errors, or `null` when valid.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `result` | `TResult` \| `undefined` |
| `context` | \{ `value`: `Signal`\<`TValue`\>; \} |
| `context.value` | `Signal`\<`TValue`\> |

#### Returns

`unknown`

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`mapResultToError`](Interface.IAsyncSignalValidatorOptions#mapresulttoerror)

***

### onError?

```ts
readonly optional onError?: (error, context) => unknown;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L35)

Maps a rejected resource to validation errors; defaults to reporting no error.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |
| `context` | \{ `value`: `Signal`\<`TValue`\>; \} |
| `context.value` | `Signal`\<`TValue`\> |

#### Returns

`unknown`

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`onError`](Interface.IAsyncSignalValidatorOptions#onerror)

***

### paramsFn

```ts
readonly paramsFn: (context) => TParams;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L26)

Derives the request parameters from the current field value.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | \{ `value`: `Signal`\<`TValue`\>; \} |
| `context.value` | `Signal`\<`TValue`\> |

#### Returns

`TParams`

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`paramsFn`](Interface.IAsyncSignalValidatorOptions#paramsfn)

***

### path

```ts
readonly path: SchemaPath<TValue, 1, TPathKind>;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L23)

Signal Forms schema path to validate.

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`path`](Interface.IAsyncSignalValidatorOptions#path)

***

### when?

```ts
readonly optional when?: NoInfer<LogicFn<TValue, boolean, TPathKind>>;
```

Defined in: [async/IAsyncSignalValidatorOptions.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/forms/src/async/IAsyncSignalValidatorOptions.ts#L38)

Activation condition forwarded to Angular's `validateAsync`.

#### Inherited from

[`IAsyncSignalValidatorOptions`](Interface.IAsyncSignalValidatorOptions).[`when`](Interface.IAsyncSignalValidatorOptions#when)
