---
title: 'Function: onceOn()'
generated: true
editUrl: false
---
# Function: onceOn()

```ts
function onceOn<T>(observable, nextOrObserver): Subscription & {
  observable: Observable<T>;
};
```

Defined in: [rx/operators/onceOn.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/onceOn.ts#L20)

Subscribes once to a source, forwarding its values until completion, error or cancellation.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `observable` | `Observable`\<`T`\> | The source to observe once. |
| `nextOrObserver` | ((`value`) => `void`) \| `Partial`\<`Observer`\<`T`\>\> | A `next` callback or a partial observer. |

## Returns

`Subscription` & \{
  `observable`: `Observable`\<`T`\>;
\}

The subscription, carrying the original source as `observable`.

## Remarks

The historical name refers to one subscription, not one emitted value. Pass a source piped
through `take(1)` when only its first value is wanted. The result preserves the original
`{ observable }` handle and also exposes the subscription for explicit lifecycle cleanup.
