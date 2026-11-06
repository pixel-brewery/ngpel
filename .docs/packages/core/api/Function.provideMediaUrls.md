---
title: 'Function: provideMediaUrls()'
generated: true
editUrl: false
---
# Function: provideMediaUrls()

```ts
function provideMediaUrls(...features): EnvironmentProviders;
```

Defined in: [browser/media/provideMediaUrls.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/provideMediaUrls.ts#L24)

Configures media URL resolution: registers a [MediaUrlResolver](Class.MediaUrlResolver) scoped to the composition
root together with the origin contributed by the given features.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`features` | readonly [`IFeature`](Interface.IFeature)\<`"origin"`\>[] | Origin features such as `withApiOrigin(...)`. |

## Returns

`EnvironmentProviders`

Environment providers for the application or route composition root.

## Throws

Error when two origin features are given.

## Example

```typescript
provideMediaUrls(withApiOrigin(() => inject(ENV)['API_URL'] ?? ''))
```
