---
title: 'Function: routeParamSignal()'
generated: true
editUrl: false
---
# Function: routeParamSignal()

```ts
function routeParamSignal<T>(
   parameterName,
   codec,
   options
): UrlParamSignal<T>;
```

Defined in: [signals/routeParamSignal.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/routeParamSignal.ts#L32)

Creates a bidirectional signal for a parameter declared in the route path. Must be called in an
injection context. Reading follows the activated URL; writing navigates to the URL tree the
`toUrlTree` policy returns.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `parameterName` | `string` | The parameter name as declared in the route path, without the colon. |
| `codec` | [`UrlParamCodec`](TypeAlias.UrlParamCodec)\<`T`\> | The codec converting between the raw parameter and the typed value. |
| `options` | [`IRouteParamSignalOptions`](Interface.IRouteParamSignalOptions)\<`T`\> | The destination policy and history behavior. |

## Returns

[`UrlParamSignal`](TypeAlias.UrlParamSignal)\<`T`\>

The URL-backed signal.

## Example

```typescript
// Route: { path: 'newsletters/:newsletterId', component: NewsletterDetailView }
private readonly _newsletterId = routeParamSignal('newsletterId', fromNullable(positiveIntegerCodec), {
    toUrlTree: ({ serializedValue, router }) => router.createUrlTree(['/newsletters', serializedValue ?? ''])
});
```
