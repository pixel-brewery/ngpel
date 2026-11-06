---
title: 'Interface: IUpdateNoNewVersionDetectedEvent'
generated: true
editUrl: false
---
# Interface: IUpdateNoNewVersionDetectedEvent

Defined in: [update/models/IUpdateNoNewVersionDetectedEvent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateNoNewVersionDetectedEvent.ts#L12)

A check completed and the running version is still the latest one.

## Properties

### type

```ts
readonly type: "noNewVersionDetected";
```

Defined in: [update/models/IUpdateNoNewVersionDetectedEvent.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateNoNewVersionDetectedEvent.ts#L18)

Discriminator.

***

### version

```ts
readonly version: IUpdateVersion;
```

Defined in: [update/models/IUpdateNoNewVersionDetectedEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateNoNewVersionDetectedEvent.ts#L23)

The version that is still current.
