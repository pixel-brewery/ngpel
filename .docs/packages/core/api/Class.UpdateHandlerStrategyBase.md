---
title: 'Abstract Class: UpdateHandlerStrategyBase'
generated: true
editUrl: false
---
# Abstract Class: UpdateHandlerStrategyBase

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L18)

No-op base for [IUpdateHandlerStrategy](Interface.IUpdateHandlerStrategy) implementations: override only the events a
strategy cares about.

## Extended by

- [`DefaultUpdateHandlerStrategy`](Class.DefaultUpdateHandlerStrategy)

## Implements

- [`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy)

## Constructors

### Constructor

```ts
protected new UpdateHandlerStrategyBase(): UpdateHandlerStrategyBase;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L26)

Constructs a new instance of the `UpdateHandlerStrategyBase` class.

#### Returns

`UpdateHandlerStrategyBase`

## Methods

### noNewVersionDetected()

```ts
noNewVersionDetected(_event): void;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L70)

A check completed and the running version is still the latest one.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_event` | [`IUpdateNoNewVersionDetectedEvent`](Interface.IUpdateNoNewVersionDetectedEvent) |

#### Returns

`void`

#### Implementation of

[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy).[`noNewVersionDetected`](Interface.IUpdateHandlerStrategy#nonewversiondetected)

***

### unrecoverable()

```ts
unrecoverable(_event): void;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L80)

The installed version is broken and requires a full reload.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_event` | [`IUpdateUnrecoverableEvent`](Interface.IUpdateUnrecoverableEvent) |

#### Returns

`void`

#### Implementation of

[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy).[`unrecoverable`](Interface.IUpdateHandlerStrategy#unrecoverable)

***

### versionDetected()

```ts
versionDetected(_event): void;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L40)

A newer version was found and its download is about to start.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_event` | [`IUpdateVersionDetectedEvent`](Interface.IUpdateVersionDetectedEvent) |

#### Returns

`void`

#### Implementation of

[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy).[`versionDetected`](Interface.IUpdateHandlerStrategy#versiondetected)

***

### versionInstallationFailed()

```ts
versionInstallationFailed(_event): void;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:50](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L50)

Checking for or downloading a newer version failed.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_event` | [`IUpdateVersionInstallationFailedEvent`](Interface.IUpdateVersionInstallationFailedEvent) |

#### Returns

`void`

#### Implementation of

[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy).[`versionInstallationFailed`](Interface.IUpdateHandlerStrategy#versioninstallationfailed)

***

### versionReady()

```ts
versionReady(_event): void;
```

Defined in: [update/strategies/UpdateHandlerStrategyBase.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/UpdateHandlerStrategyBase.ts#L60)

A newer version is fully downloaded and can be activated.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `_event` | [`IUpdateVersionReadyEvent`](Interface.IUpdateVersionReadyEvent) |

#### Returns

`void`

#### Implementation of

[`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy).[`versionReady`](Interface.IUpdateHandlerStrategy#versionready)
