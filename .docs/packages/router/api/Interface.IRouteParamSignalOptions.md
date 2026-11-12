---
title: 'Interface: IRouteParamSignalOptions\<T\>'
generated: true
editUrl: false
---
# Interface: IRouteParamSignalOptions\<T\>

Defined in: [signals/IRouteParamSignalOptions.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamSignalOptions.ts#L17)

Configures a route-parameter signal. The destination is explicit because changing one route
parameter can mean detail navigation, edit navigation, preview navigation or a return to the
parent view, and only the caller knows which.

## Extends

- [`IUrlParamNavigationOptions`](Interface.IUrlParamNavigationOptions)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | The typed application value. |

## Properties

### replaceUrl?

```ts
readonly replaceUrl?: boolean;
```

Defined in: [signals/IUrlParamNavigationOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IUrlParamNavigationOptions.ts#L12)

Replaces the current history entry instead of pushing a new one. Defaults to `false`.

#### Inherited from

[`IUrlParamNavigationOptions`](Interface.IUrlParamNavigationOptions).[`replaceUrl`](Interface.IUrlParamNavigationOptions#replaceurl)

## Methods

### toUrlTree()

```ts
toUrlTree(context): UrlTree;
```

Defined in: [signals/IRouteParamSignalOptions.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IRouteParamSignalOptions.ts#L26)

Builds the destination URL for a requested value.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | [`IRouteParamNavigationContext`](Interface.IRouteParamNavigationContext)\<`T`\> | The requested value and the router context. |

#### Returns

`UrlTree`

The URL tree to navigate to.
