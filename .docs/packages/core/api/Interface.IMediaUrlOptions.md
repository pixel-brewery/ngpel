---
title: 'Interface: IMediaUrlOptions'
generated: true
editUrl: false
---
# Interface: IMediaUrlOptions

Defined in: [browser/media/IMediaUrlOptions.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/IMediaUrlOptions.ts#L6)

Configuration of the media URL resolution.

## Properties

### origin

```ts
readonly origin: string | (() => string);
```

Defined in: [browser/media/IMediaUrlOptions.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/IMediaUrlOptions.ts#L14)

The API origin root-relative media paths are resolved against, either as a value or as an
accessor. An accessor is evaluated on every resolution inside an injection context, so it
may read other tokens (`() => inject(ENV)['API_URL'] ?? ''`) or follow a changing origin.
