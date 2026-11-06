---
title: 'Interface: IUpdateUnrecoverableEvent'
generated: true
editUrl: false
---
# Interface: IUpdateUnrecoverableEvent

Defined in: [update/models/IUpdateUnrecoverableEvent.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateUnrecoverableEvent.ts#L6)

The installed version is in a broken state that cannot be repaired without a full reload.

## Properties

### reason

```ts
readonly reason: string;
```

Defined in: [update/models/IUpdateUnrecoverableEvent.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateUnrecoverableEvent.ts#L17)

Why the installed version can no longer be used.

***

### type

```ts
readonly type: "unrecoverable";
```

Defined in: [update/models/IUpdateUnrecoverableEvent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateUnrecoverableEvent.ts#L12)

Discriminator.
