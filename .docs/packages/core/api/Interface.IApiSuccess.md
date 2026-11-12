---
title: 'Interface: IApiSuccess\<TData\>'
generated: true
editUrl: false
---
# Interface: IApiSuccess\<TData\>

Defined in: [results/IApiSuccess.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiSuccess.ts#L6)

Represents a successful API response.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tdata"></a> `TData` |

## Properties

### data

```ts
readonly data: TData;
```

Defined in: [results/IApiSuccess.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiSuccess.ts#L22)

The typed response data.

***

### status

```ts
readonly status: number;
```

Defined in: [results/IApiSuccess.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiSuccess.ts#L17)

The HTTP status code of the response.

***

### success

```ts
readonly success: true;
```

Defined in: [results/IApiSuccess.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/IApiSuccess.ts#L12)

Discriminator indicating a successful response.
