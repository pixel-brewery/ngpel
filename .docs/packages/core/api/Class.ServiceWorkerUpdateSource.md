---
title: 'Class: ServiceWorkerUpdateSource'
generated: true
editUrl: false
---
# Class: ServiceWorkerUpdateSource

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:24](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L24)

[IUpdateSource](Interface.IUpdateSource) adapter over the Angular service worker: maps `versionUpdates` and
`unrecoverable` onto [IUpdateEvent](TypeAlias.IUpdateEvent), derives the [IUpdateStatus](Interface.IUpdateStatus) from that stream and
from the outcome of `checkForUpdate()`, and delegates activation to `activateUpdate()`.
Requires `provideServiceWorker()` in the application; reports `disabled` when the service worker
is not enabled (for example in development builds).

## Implements

- [`IUpdateSource`](Interface.IUpdateSource)

## Constructors

### Constructor

```ts
new ServiceWorkerUpdateSource(swUpdate?): ServiceWorkerUpdateSource;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L41)

Constructs a new instance of the `ServiceWorkerUpdateSource` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `swUpdate` | `SwUpdate` | The service worker update API; injected when omitted. |

#### Returns

`ServiceWorkerUpdateSource`

## Accessors

### events

#### Get Signature

```ts
get events(): Observable<IUpdateEvent>;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L79)

The mapped `versionUpdates` and `unrecoverable` events. Subscribing keeps the status in sync.

##### Returns

`Observable`\<[`IUpdateEvent`](TypeAlias.IUpdateEvent)\>

Lifecycle events, dispatched by the manager to every registered strategy.

#### Implementation of

[`IUpdateSource`](Interface.IUpdateSource).[`events`](Interface.IUpdateSource#events)

***

### isEnabled

#### Get Signature

```ts
get isEnabled(): boolean;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L59)

Whether the service worker is enabled in this build and browser.

##### Returns

`boolean`

Whether the source can deliver updates at all. Expected to be stable for the lifetime of the
application; transient conditions are reported through [IUpdateSource.status](Interface.IUpdateSource#status).

#### Implementation of

[`IUpdateSource`](Interface.IUpdateSource).[`isEnabled`](Interface.IUpdateSource#isenabled)

***

### status

#### Get Signature

```ts
get status(): Signal<IUpdateStatus>;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:69](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L69)

The lifecycle snapshot derived from the service worker events and checks.

##### Returns

`Signal`\<[`IUpdateStatus`](Interface.IUpdateStatus)\>

The current lifecycle snapshot.

#### Implementation of

[`IUpdateSource`](Interface.IUpdateSource).[`status`](Interface.IUpdateSource#status)

## Methods

### activate()

```ts
activate(): Observable<boolean>;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L115)

Runs `activateUpdate()`. Emits `false` without touching a disabled service worker.

#### Returns

`Observable`\<`boolean`\>

#### Implementation of

[`IUpdateSource`](Interface.IUpdateSource).[`activate`](Interface.IUpdateSource#activate)

***

### check()

```ts
check(): Observable<boolean>;
```

Defined in: [update/service-worker/ServiceWorkerUpdateSource.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/service-worker/ServiceWorkerUpdateSource.ts#L93)

Runs `checkForUpdate()`, moving the status through `checking` to `downloading`, `idle` or
`failed`. Emits `false` without touching a disabled service worker.

#### Returns

`Observable`\<`boolean`\>

#### Implementation of

[`IUpdateSource`](Interface.IUpdateSource).[`check`](Interface.IUpdateSource#check)
