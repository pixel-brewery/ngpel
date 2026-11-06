---
title: 'Variable: UPDATE\_SOURCE'
generated: true
editUrl: false
---
# Variable: UPDATE\_SOURCE

```ts
const UPDATE_SOURCE: InjectionToken<IUpdateSource>;
```

Defined in: [update/provider/UPDATE\_SOURCE.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/provider/UPDATE_SOURCE.ts#L14)

Injection token of the single [IUpdateSource](Interface.IUpdateSource) the manager listens to. Registered by
`withUpdateSource()` or an adapter feature such as `withServiceWorkerUpdateSource()`.
