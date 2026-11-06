---
title: 'Variable: MEDIA\_URL\_OPTIONS'
generated: true
editUrl: false
---
# Variable: MEDIA\_URL\_OPTIONS

```ts
const MEDIA_URL_OPTIONS: InjectionToken<IMediaUrlOptions>;
```

Defined in: [browser/media/MEDIA\_URL\_OPTIONS.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MEDIA_URL_OPTIONS.ts#L14)

Injection token carrying the [IMediaUrlOptions](Interface.IMediaUrlOptions). Registered by `withApiOrigin(...)`
through `provideMediaUrls(...)`; when absent, media paths are passed through unchanged.
