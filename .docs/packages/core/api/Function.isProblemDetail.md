---
title: 'Function: isProblemDetail()'
generated: true
editUrl: false
---
# Function: isProblemDetail()

```ts
function isProblemDetail(value, contentType?): value is IProblemDetail;
```

Defined in: [results/isProblemDetail.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/results/isProblemDetail.ts#L19)

Determines whether a response body is an RFC 9457 problem detail. A body qualifies when the
response was declared as `application/problem+json` (header detection) or when the body carries
a `title` together with a numeric `status` or a textual `detail` (body detection). Both
detection paths are treated alike so header-only and body-only producers behave the same.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The parsed response body. |
| `contentType?` | `string` \| `null` | The optional `Content-Type` header of the response. |

## Returns

`value is IProblemDetail`

`true` when the value should be treated as a problem detail.
