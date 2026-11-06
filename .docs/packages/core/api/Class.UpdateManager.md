---
title: 'Class: UpdateManager'
generated: true
editUrl: false
---
# Class: UpdateManager

Defined in: [update/services/UpdateManager.ts:20](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L20)

Drives the update lifecycle: listens to the [IUpdateSource](Interface.IUpdateSource), fans every event out to all
registered strategies and exposes check/activate operations that wait for application
stability. Created by `provideUpdate()`; inject it to trigger manual checks or to read the status.

## Constructors

### Constructor

```ts
new UpdateManager(
   source,
   strategies,
   options?
): UpdateManager;
```

Defined in: [update/services/UpdateManager.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L42)

Constructs a new instance of the `UpdateManager` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`IUpdateSource`](Interface.IUpdateSource) | The platform source to listen to. |
| `strategies` | readonly [`IUpdateHandlerStrategy`](Interface.IUpdateHandlerStrategy)[] | The strategies every event is dispatched to, in order. |
| `options` | [`IUpdateManagerOptions`](Interface.IUpdateManagerOptions) | Lifecycle options. |

#### Returns

`UpdateManager`

## Accessors

### isEnabled

#### Get Signature

```ts
get isEnabled(): boolean;
```

Defined in: [update/services/UpdateManager.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L81)

Whether the source can deliver updates at all.

##### Returns

`boolean`

***

### lastUpdate

#### Get Signature

```ts
get lastUpdate(): Signal<Date | null>;
```

Defined in: [update/services/UpdateManager.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L71)

When the manager last completed a check, or `null` before the first one.

##### Returns

`Signal`\<`Date` \| `null`\>

***

### status

#### Get Signature

```ts
get status(): Signal<IUpdateStatus>;
```

Defined in: [update/services/UpdateManager.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L61)

The lifecycle snapshot reported by the source.

##### Returns

`Signal`\<[`IUpdateStatus`](Interface.IUpdateStatus)\>

## Methods

### check()

```ts
check(): Observable<boolean>;
```

Defined in: [update/services/UpdateManager.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L122)

Waits for application stability, then asks the source for a newer version and records the
check time. Emits `false` without consulting a disabled source.

#### Returns

`Observable`\<`boolean`\>

***

### dispose()

```ts
dispose(): void;
```

Defined in: [update/services/UpdateManager.ts:112](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L112)

Stops listening to the source and cancels a pending initial check.

#### Returns

`void`

***

### initialize()

```ts
initialize(): void;
```

Defined in: [update/services/UpdateManager.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L95)

Starts listening to the source and, when configured, runs the initial check. Does nothing
for a disabled source.

#### Returns

`void`

***

### update()

```ts
update(): Observable<boolean>;
```

Defined in: [update/services/UpdateManager.ts:135](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/update/services/UpdateManager.ts#L135)

Activates a downloaded version through the source.

#### Returns

`Observable`\<`boolean`\>
