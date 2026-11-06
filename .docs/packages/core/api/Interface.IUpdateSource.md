---
title: 'Interface: IUpdateSource'
generated: true
editUrl: false
---
# Interface: IUpdateSource

Defined in: [update/models/IUpdateSource.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L17)

Port between the update lifecycle and the platform that delivers updates. The service-worker
entry point ships an adapter over `SwUpdate`; a desktop application implements it over its IPC
channel, a test over a scriptable fake.

## Properties

### events

```ts
readonly events: Observable<IUpdateEvent>;
```

Defined in: [update/models/IUpdateSource.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L34)

Lifecycle events, dispatched by the manager to every registered strategy.

***

### isEnabled

```ts
readonly isEnabled: boolean;
```

Defined in: [update/models/IUpdateSource.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L24)

Whether the source can deliver updates at all. Expected to be stable for the lifetime of the
application; transient conditions are reported through [IUpdateSource.status](#status).

***

### status

```ts
readonly status: Signal<IUpdateStatus>;
```

Defined in: [update/models/IUpdateSource.ts:29](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L29)

The current lifecycle snapshot.

## Methods

### activate()

```ts
activate(): Promise<boolean> | Observable<boolean>;
```

Defined in: [update/models/IUpdateSource.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L48)

Activates a downloaded version. Resolves `true` when a version was activated.

#### Returns

`Promise`\<`boolean`\> \| `Observable`\<`boolean`\>

***

### check()

```ts
check(): Promise<boolean> | Observable<boolean>;
```

Defined in: [update/models/IUpdateSource.ts:43](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/models/IUpdateSource.ts#L43)

Asks the platform for a newer version. Resolves `true` when a newer version was found.

#### Returns

`Promise`\<`boolean`\> \| `Observable`\<`boolean`\>
