---
title: 'Interface: IQueryParamSignalOptions'
generated: true
editUrl: false
---
# Interface: IQueryParamSignalOptions

Defined in: [signals/IQueryParamSignalOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IQueryParamSignalOptions.ts#L12)

Configures a query-parameter signal.

## Extends

- [`IUrlParamNavigationOptions`](Interface.IUrlParamNavigationOptions)

## Properties

### preserveFragment?

```ts
readonly optional preserveFragment?: boolean;
```

Defined in: [signals/IQueryParamSignalOptions.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IQueryParamSignalOptions.ts#L19)

Keeps the URL fragment across the navigation. Defaults to `true`, because a query parameter
change is a refinement of the current view and must not drop its scroll anchor.

***

### replaceUrl?

```ts
readonly optional replaceUrl?: boolean;
```

Defined in: [signals/IUrlParamNavigationOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IUrlParamNavigationOptions.ts#L12)

Replaces the current history entry instead of pushing a new one. Defaults to `false`.

#### Inherited from

[`IUrlParamNavigationOptions`](Interface.IUrlParamNavigationOptions).[`replaceUrl`](Interface.IUrlParamNavigationOptions#replaceurl)
