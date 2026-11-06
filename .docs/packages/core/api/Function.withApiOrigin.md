---
title: 'Function: withApiOrigin()'
generated: true
editUrl: false
---
# Function: withApiOrigin()

```ts
function withApiOrigin(origin): IFeature<"origin">;
```

Defined in: [browser/media/withApiOrigin.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/withApiOrigin.ts#L18)

Contributes the API origin root-relative media paths are resolved against.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin` | `string` \| (() => `string`) | The origin as a value (`'https://api.example.com'`) or as an accessor evaluated on every resolution inside an injection context (`() => inject(ENV)['API_URL'] ?? ''`). |

## Returns

[`IFeature`](Interface.IFeature)\<`"origin"`\>

A feature for `provideMediaUrls(...)`.
