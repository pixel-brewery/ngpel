---
title: 'Interface: IRouteParamNavigationContext\<T\>'
generated: true
editUrl: false
---
# Interface: IRouteParamNavigationContext\<T\>

Defined in: [signals/IRouteParamNavigationContext.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamNavigationContext.ts#L13)

Everything required to build the destination URL for a changed route parameter.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Properties

### route

```ts
readonly route: ActivatedRoute;
```

Defined in: [signals/IRouteParamNavigationContext.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamNavigationContext.ts#L35)

The route the signal was created in, for relative URL trees.

***

### router

```ts
readonly router: Router;
```

Defined in: [signals/IRouteParamNavigationContext.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamNavigationContext.ts#L30)

The router, for `createUrlTree(...)`.

***

### serializedValue

```ts
readonly serializedValue: string | undefined;
```

Defined in: [signals/IRouteParamNavigationContext.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamNavigationContext.ts#L25)

The serialized representation of [IRouteParamNavigationContext.value](#value); `undefined`
when the parameter is being cleared or the codec serialized it to `null`.

***

### value

```ts
readonly value: T | undefined;
```

Defined in: [signals/IRouteParamNavigationContext.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamNavigationContext.ts#L19)

The requested value, or `undefined` when the parameter is being cleared.
