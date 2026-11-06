---
title: 'Interface: IUpdateVersionReadyEvent'
generated: true
editUrl: false
---
# Interface: IUpdateVersionReadyEvent

Defined in: [update/models/IUpdateVersionReadyEvent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionReadyEvent.ts#L12)

A newer version is fully downloaded and can be activated.

## Properties

### currentVersion

```ts
readonly currentVersion: IUpdateVersion;
```

Defined in: [update/models/IUpdateVersionReadyEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionReadyEvent.ts#L23)

The version currently running.

***

### latestVersion

```ts
readonly latestVersion: IUpdateVersion;
```

Defined in: [update/models/IUpdateVersionReadyEvent.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionReadyEvent.ts#L28)

The version ready for activation.

***

### type

```ts
readonly type: "versionReady";
```

Defined in: [update/models/IUpdateVersionReadyEvent.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionReadyEvent.ts#L18)

Discriminator.
