---
title: 'Function: withServiceWorkerUpdateSource()'
generated: true
editUrl: false
---
# Function: withServiceWorkerUpdateSource()

```ts
function withServiceWorkerUpdateSource(): IFeature<UpdateFeatureKind>;
```

Defined in: [update/service-worker/withServiceWorkerUpdateSource.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/withServiceWorkerUpdateSource.ts#L16)

Registers the [ServiceWorkerUpdateSource](Class.ServiceWorkerUpdateSource) as the update source. The application must also
call `provideServiceWorker()` from `@angular/service-worker`.

## Returns

[`IFeature`](Interface.IFeature)\<[`UpdateFeatureKind`](TypeAlias.UpdateFeatureKind)\>
