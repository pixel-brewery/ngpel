---
title: 'Interface: IUpdateVersion'
generated: true
editUrl: false
---
# Interface: IUpdateVersion

Defined in: [update/models/IUpdateVersion.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersion.ts#L6)

Identifies one application version inside an update event.

## Properties

### appData?

```ts
readonly appData?: object;
```

Defined in: [update/models/IUpdateVersion.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersion.ts#L19)

Arbitrary metadata the source attaches to the version (for example the service worker
manifest `appData`).

***

### id

```ts
readonly id: string;
```

Defined in: [update/models/IUpdateVersion.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersion.ts#L13)

Version identifier: the manifest hash for a service worker, the semantic version for a
desktop or mobile channel.
