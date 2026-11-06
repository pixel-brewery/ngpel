---
title: 'Class: ApiResultError'
generated: true
editUrl: false
---
# Class: ApiResultError

Defined in: [results/ApiResultError.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/ApiResultError.ts#L13)

Error thrown when an API call returns a failure result. Wraps the [IProblemDetail](Interface.IProblemDetail)
so callers can inspect the structured error information in their error handler.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new ApiResultError(problem, status): ApiResultError;
```

Defined in: [results/ApiResultError.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/ApiResultError.ts#L30)

Constructs a new instance of the `ApiResultError` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `problem` | [`IProblemDetail`](Interface.IProblemDetail) | The structured problem detail of the failed response. |
| `status` | `number` | The HTTP status code of the failed response. |

#### Returns

`ApiResultError`

#### Overrides

```ts
Error.constructor
```

## Accessors

### problem

#### Get Signature

```ts
get problem(): IProblemDetail;
```

Defined in: [results/ApiResultError.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/ApiResultError.ts#L46)

The structured Problem Detail from the API response.

##### Returns

[`IProblemDetail`](Interface.IProblemDetail)

***

### status

#### Get Signature

```ts
get status(): number;
```

Defined in: [results/ApiResultError.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/ApiResultError.ts#L55)

The HTTP status code of the failed response.

##### Returns

`number`
