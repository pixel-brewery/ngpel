---
title: 'Interface: IUpdateStatus'
generated: true
editUrl: false
---
# Interface: IUpdateStatus

Defined in: [update/models/IUpdateStatus.ts:13](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L13)

Snapshot of the update lifecycle as reported by an [IUpdateSource](Interface.IUpdateSource). Only `kind` is
mandatory; sources fill in whatever their platform knows.

## Properties

### currentVersion?

```ts
readonly optional currentVersion?: string;
```

Defined in: [update/models/IUpdateStatus.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L24)

Identifier of the running version (a manifest hash or a semantic version).

***

### kind

```ts
readonly kind: UpdateStatusKind;
```

Defined in: [update/models/IUpdateStatus.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L19)

The lifecycle phase.

***

### lastCheckedAt?

```ts
readonly optional lastCheckedAt?: Date;
```

Defined in: [update/models/IUpdateStatus.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L34)

When the source last completed a check.

***

### reason?

```ts
readonly optional reason?: string;
```

Defined in: [update/models/IUpdateStatus.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L44)

Why the source is `disabled` or why the last operation `failed`.

***

### releaseNotes?

```ts
readonly optional releaseNotes?: string;
```

Defined in: [update/models/IUpdateStatus.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L39)

Release notes of the target version, when the platform provides them.

***

### targetVersion?

```ts
readonly optional targetVersion?: string;
```

Defined in: [update/models/IUpdateStatus.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateStatus.ts#L29)

Identifier of the version being downloaded or ready for activation.
