---
title: 'Function: toApiFailure()'
generated: true
editUrl: false
---
# Function: toApiFailure()

```ts
function toApiFailure(source): IApiFailure;
```

Defined in: [results/toApiFailure.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/toApiFailure.ts#L21)

Creates a failed API result envelope from a transport-agnostic failure source. When the body is
a problem detail it is carried over (missing `title`/`status` members are backfilled from the
response); otherwise a synthetic problem is built from the status text and message.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`IApiFailureSource`](Interface.IApiFailureSource) | The failed response. |

## Returns

[`IApiFailure`](Interface.IApiFailure)

The failure envelope.
