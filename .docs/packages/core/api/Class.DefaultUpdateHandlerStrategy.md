---
title: 'Class: DefaultUpdateHandlerStrategy'
generated: true
editUrl: false
---
# Class: DefaultUpdateHandlerStrategy

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L21)

Console-only strategy: reports the lifecycle with the [IUpdateIntl](Interface.IUpdateIntl) texts and never
touches the UI. Registered by default when `provideUpdate()` receives no strategy feature.

## Extends

- [`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase)

## Constructors

### Constructor

```ts
new DefaultUpdateHandlerStrategy(): DefaultUpdateHandlerStrategy;
```

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:37](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L37)

Constructs a new instance of the `DefaultUpdateHandlerStrategy` class. The base constructor is
protected, so the public constructor is what keeps the class usable as an Angular `Type`.

#### Returns

`DefaultUpdateHandlerStrategy`

#### Overrides

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`constructor`](Class.UpdateHandlerStrategyBase#constructor)

## Methods

### noNewVersionDetected()

```ts
noNewVersionDetected(event): void;
```

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L75)

Reports the unchanged version on the console.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateNoNewVersionDetectedEvent`](Interface.IUpdateNoNewVersionDetectedEvent) |

#### Returns

`void`

#### Overrides

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`noNewVersionDetected`](Class.UpdateHandlerStrategyBase#nonewversiondetected)

***

### unrecoverable()

```ts
unrecoverable(event): void;
```

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L87)

Reports the broken installation on the console.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateUnrecoverableEvent`](Interface.IUpdateUnrecoverableEvent) |

#### Returns

`void`

#### Overrides

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`unrecoverable`](Class.UpdateHandlerStrategyBase#unrecoverable)

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

#### Inherited from

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`versionDetected`](Class.UpdateHandlerStrategyBase#versiondetected)

***

### versionInstallationFailed()

```ts
versionInstallationFailed(event): void;
```

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L51)

Reports the failed installation on the console.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateVersionInstallationFailedEvent`](Interface.IUpdateVersionInstallationFailedEvent) |

#### Returns

`void`

#### Overrides

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`versionInstallationFailed`](Class.UpdateHandlerStrategyBase#versioninstallationfailed)

***

### versionReady()

```ts
versionReady(event): void;
```

Defined in: [update/strategies/DefaultUpdateHandlerStrategy.ts:63](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/strategies/DefaultUpdateHandlerStrategy.ts#L63)

Reports the available version on the console.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | [`IUpdateVersionReadyEvent`](Interface.IUpdateVersionReadyEvent) |

#### Returns

`void`

#### Overrides

[`UpdateHandlerStrategyBase`](Class.UpdateHandlerStrategyBase).[`versionReady`](Class.UpdateHandlerStrategyBase#versionready)
