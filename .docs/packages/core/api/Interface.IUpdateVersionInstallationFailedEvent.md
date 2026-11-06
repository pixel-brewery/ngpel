---
title: 'Interface: IUpdateVersionInstallationFailedEvent'
generated: true
editUrl: false
---
# Interface: IUpdateVersionInstallationFailedEvent

Defined in: [update/models/IUpdateVersionInstallationFailedEvent.ts:12](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionInstallationFailedEvent.ts#L12)

Checking for or downloading a newer version failed.

## Properties

### error

```ts
readonly error: string;
```

Defined in: [update/models/IUpdateVersionInstallationFailedEvent.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionInstallationFailedEvent.ts#L28)

Human-readable failure description.

***

### type

```ts
readonly type: "versionInstallationFailed";
```

Defined in: [update/models/IUpdateVersionInstallationFailedEvent.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionInstallationFailedEvent.ts#L18)

Discriminator.

***

### version

```ts
readonly version: IUpdateVersion;
```

Defined in: [update/models/IUpdateVersionInstallationFailedEvent.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateVersionInstallationFailedEvent.ts#L23)

The version whose installation failed.
