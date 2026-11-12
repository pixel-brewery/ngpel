---
title: 'Function: guardImplicitCloseAttempts()'
generated: true
editUrl: false
---
# Function: guardImplicitCloseAttempts()

```ts
function guardImplicitCloseAttempts<TAttempt>(
   ref,
   shouldPreventClose,
   onPreventClose?
): Subscription;
```

Defined in: [rx/operators/guardImplicitCloseAttempts.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/rx/operators/guardImplicitCloseAttempts.ts#L19)

Prevents implicit close attempts while the supplied predicate reports unsaved state, requesting
attention for the surface instead.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tattempt"></a> `TAttempt` *extends* [`IPreventableCloseAttempt`](Interface.IPreventableCloseAttempt) |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ref` | [`IAttentionRequestRef`](Interface.IAttentionRequestRef)\<`TAttempt`\> | Surface ref that emits preventable close attempts. |
| `shouldPreventClose` | () => `boolean` | Predicate evaluated for every close attempt. |
| `onPreventClose?` | (`attempt`) => `void` | Callback invoked after a close attempt has been prevented. |

## Returns

`Subscription`

Subscription for presenter lifecycle cleanup.
