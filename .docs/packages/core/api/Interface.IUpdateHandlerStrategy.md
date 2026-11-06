---
title: 'Interface: IUpdateHandlerStrategy'
generated: true
editUrl: false
---
# Interface: IUpdateHandlerStrategy

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L17)

Reacts to update lifecycle events. The manager fans every event out to all registered
strategies, so a logging strategy and a user-facing one can coexist.

## Methods

### noNewVersionDetected()

```ts
noNewVersionDetected(event): void;
```

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L38)

A check completed and the running version is still the latest one.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateNoNewVersionDetectedEvent`](Interface.IUpdateNoNewVersionDetectedEvent) |

#### Returns

`void`

***

### unrecoverable()

```ts
unrecoverable(event): void;
```

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L43)

The installed version is broken and requires a full reload.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateUnrecoverableEvent`](Interface.IUpdateUnrecoverableEvent) |

#### Returns

`void`

***

### versionDetected()

```ts
versionDetected(event): void;
```

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L23)

A newer version was found and its download is about to start.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateVersionDetectedEvent`](Interface.IUpdateVersionDetectedEvent) |

#### Returns

`void`

***

### versionInstallationFailed()

```ts
versionInstallationFailed(event): void;
```

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L28)

Checking for or downloading a newer version failed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateVersionInstallationFailedEvent`](Interface.IUpdateVersionInstallationFailedEvent) |

#### Returns

`void`

***

### versionReady()

```ts
versionReady(event): void;
```

Defined in: [update/strategies/IUpdateHandlerStrategy.ts:33](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/IUpdateHandlerStrategy.ts#L33)

A newer version is fully downloaded and can be activated.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateVersionReadyEvent`](Interface.IUpdateVersionReadyEvent) |

#### Returns

`void`
