---
title: 'Interface: IApiFailure'
generated: true
editUrl: false
---
# Interface: IApiFailure

Defined in: [results/IApiFailure.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailure.ts#L12)

Represents a failed API response with Problem Detail information.

## Properties

### problem

```ts
readonly problem: IProblemDetail;
```

Defined in: [results/IApiFailure.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailure.ts#L28)

The structured Problem Detail error information.

***

### status

```ts
readonly status: number;
```

Defined in: [results/IApiFailure.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailure.ts#L23)

The HTTP status code of the error response.

***

### success

```ts
readonly success: false;
```

Defined in: [results/IApiFailure.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiFailure.ts#L18)

Discriminator indicating a failed response.
