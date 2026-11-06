---
title: 'Interface: IUpdateVersionDetectedEvent'
generated: true
editUrl: false
---
# Interface: IUpdateVersionDetectedEvent

Defined in: [update/models/IUpdateVersionDetectedEvent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionDetectedEvent.ts#L12)

A newer version was found and its download is about to start.

## Properties

### type

```ts
readonly type: "versionDetected";
```

Defined in: [update/models/IUpdateVersionDetectedEvent.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionDetectedEvent.ts#L18)

Discriminator.

***

### version

```ts
readonly version: IUpdateVersion;
```

Defined in: [update/models/IUpdateVersionDetectedEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionDetectedEvent.ts#L23)

The detected version.
