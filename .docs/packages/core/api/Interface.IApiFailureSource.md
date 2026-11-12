---
title: 'Interface: IApiFailureSource'
generated: true
editUrl: false
---
# Interface: IApiFailureSource

Defined in: [results/IApiFailureSource.ts:8](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L8)

Transport-agnostic description of a failed response, the input of [toApiFailure](Function.toApiFailure).
HTTP adapters map their native error type (for example Angular's `HttpErrorResponse`) onto
this shape; the core stays free of any transport dependency.

## Properties

### body?

```ts
readonly body?: unknown;
```

Defined in: [results/IApiFailureSource.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L29)

The parsed response body, inspected for an RFC 9457 problem detail.

***

### contentType?

```ts
readonly contentType?: string | null;
```

Defined in: [results/IApiFailureSource.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L34)

The `Content-Type` header of the response, enabling header-based problem detection.

***

### message?

```ts
readonly message?: string;
```

Defined in: [results/IApiFailureSource.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L24)

A transport-level error message, used as the fallback problem detail.

***

### status

```ts
readonly status: number;
```

Defined in: [results/IApiFailureSource.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L14)

The HTTP status code of the response (`0` for network failures).

***

### statusText?

```ts
readonly statusText?: string;
```

Defined in: [results/IApiFailureSource.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailureSource.ts#L19)

The HTTP status text of the response, used as the fallback problem title.
