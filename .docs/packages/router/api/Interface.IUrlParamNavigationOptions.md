---
title: 'Interface: IUrlParamNavigationOptions'
generated: true
editUrl: false
---
# Interface: IUrlParamNavigationOptions

Defined in: [signals/IUrlParamNavigationOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IUrlParamNavigationOptions.ts#L6)

Configures the browser history behavior of a URL-backed signal.

## Extended by

- [`IQueryParamSignalOptions`](Interface.IQueryParamSignalOptions)
- [`IRouteParamSignalOptions`](Interface.IRouteParamSignalOptions)

## Properties

### replaceUrl?

```ts
readonly replaceUrl?: boolean;
```

Defined in: [signals/IUrlParamNavigationOptions.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/router/src/signals/IUrlParamNavigationOptions.ts#L12)

Replaces the current history entry instead of pushing a new one. Defaults to `false`.
