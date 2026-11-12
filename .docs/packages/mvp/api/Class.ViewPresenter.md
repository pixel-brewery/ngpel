---
title: 'Abstract Class: ViewPresenter'
generated: true
editUrl: false
---
# Abstract Class: ViewPresenter

Defined in: [presenters/ViewPresenter.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L34)

Signal-based presentation state owned by a [View](Class.View).

## Remarks

The presenter binds itself to the destruction of the injector that created it, so it releases its
tracked subscriptions and aborts its in-flight work even when no View ever ran `ngOnDestroy`.
Loading is counted, not flagged: `withLoading` balances one enter against one leave, and an
Observable only counts while something is subscribed to it.

Every concrete presenter carries its own `@Injectable()`: Angular refuses to instantiate a class
that only inherits the decorator.

## Example

```typescript
@Injectable()
class OrderViewPresenter extends ViewPresenter {}
```

## Implements

- [`IViewPresenter`](Interface.IViewPresenter)

## Constructors

### Constructor

```ts
new ViewPresenter(destroyRef?): ViewPresenter;
```

Defined in: [presenters/ViewPresenter.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L57)

Constructs a new instance of the `ViewPresenter` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `destroyRef?` | `DestroyRef` | The destruction scope the presenter disposes with; injected when omitted. |

#### Returns

`ViewPresenter`

## Accessors

### abortRef

#### Get Signature

```ts
get protected abortRef(): AbortRef;
```

Defined in: [presenters/ViewPresenter.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L131)

Cancellation reference for presenter-owned asynchronous work; aborted on disposal.

##### Returns

[`AbortRef`](TypeAlias.AbortRef)

***

### disposed

#### Get Signature

```ts
get disposed(): Signal<boolean>;
```

Defined in: [presenters/ViewPresenter.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L90)

Becomes `true` after `dispose()` was called.

##### Returns

`Signal`\<`boolean`\>

Becomes `true` after `dispose()` was called.

#### Implementation of

[`IViewPresenter`](Interface.IViewPresenter).[`disposed`](Interface.IViewPresenter#disposed)

***

### initialized

#### Get Signature

```ts
get initialized(): Signal<boolean>;
```

Defined in: [presenters/ViewPresenter.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L100)

Becomes `true` after `initialize()` was called.

##### Returns

`Signal`\<`boolean`\>

Becomes `true` after `initialize()` was called.

#### Implementation of

[`IViewPresenter`](Interface.IViewPresenter).[`initialized`](Interface.IViewPresenter#initialized)

***

### isLoading

#### Get Signature

```ts
get isLoading(): Signal<boolean>;
```

Defined in: [presenters/ViewPresenter.ts:110](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L110)

Emits `true` while at least one tracked operation is active.

##### Returns

`Signal`\<`boolean`\>

Emits `true` while at least one tracked operation is active.

#### Implementation of

[`IViewPresenter`](Interface.IViewPresenter).[`isLoading`](Interface.IViewPresenter#isloading)

***

### loadingRef

#### Get Signature

```ts
get protected loadingRef(): LoadingRef;
```

Defined in: [presenters/ViewPresenter.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L121)

Loading reference handed to asynchronous commands so their runtime feeds `isLoading`, as in
`asyncCommand(() => this.save(), undefined, this.loadingRef)`.

##### Returns

[`LoadingRef`](TypeAlias.LoadingRef)

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [presenters/ViewPresenter.ts:159](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L159)

Aborts in-flight work, unsubscribes every tracked subscription and marks the presenter as
disposed. Repeated calls are ignored.

#### Returns

`void`

#### Implementation of

[`IViewPresenter`](Interface.IViewPresenter).[`dispose`](Interface.IViewPresenter#dispose)

***

### initialize()

```ts
initialize(): void;
```

Defined in: [presenters/ViewPresenter.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L146)

Marks the presenter as initialized. Override to load the data the View binds to and call
`super.initialize()` first.

#### Returns

`void`

#### Implementation of

[`IViewPresenter`](Interface.IViewPresenter).[`initialize`](Interface.IViewPresenter#initialize)

***

### loading()

```ts
protected loading(value): void;
```

Defined in: [presenters/ViewPresenter.ts:180](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L180)

Balances the loading counter for work managed directly by a presenter subclass.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `boolean` | Whether an operation starts (`true`) or finishes (`false`). |

#### Returns

`void`

***

### withLoading()

#### Call Signature

```ts
protected withLoading(operation): Subscription;
```

Defined in: [presenters/ViewPresenter.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L197)

Balances the loading state around an operation.

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | `Subscription` | The operation to track. |

##### Returns

`Subscription`

The tracked operation.

##### Remarks

A `Subscription` counts from the moment it is handed over until it closes or is unsubscribed
and is released on disposal. An `Observable` is wrapped so every attached subscriber counts
separately and is released on disposal. A factory is invoked immediately; its `Observable` result
is wrapped, any other result is adopted as a promise that counts until it settles.

#### Call Signature

```ts
protected withLoading<T>(operation): Observable<T>;
```

Defined in: [presenters/ViewPresenter.ts:198](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L198)

Balances the loading state around an operation.

##### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | `Observable`\<`T`\> | The operation to track. |

##### Returns

`Observable`\<`T`\>

The tracked operation.

##### Remarks

A `Subscription` counts from the moment it is handed over until it closes or is unsubscribed
and is released on disposal. An `Observable` is wrapped so every attached subscriber counts
separately and is released on disposal. A factory is invoked immediately; its `Observable` result
is wrapped, any other result is adopted as a promise that counts until it settles.

#### Call Signature

```ts
protected withLoading<T>(operation): Observable<T>;
```

Defined in: [presenters/ViewPresenter.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L199)

Balances the loading state around an operation.

##### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | () => `Observable`\<`T`\> | The operation to track. |

##### Returns

`Observable`\<`T`\>

The tracked operation.

##### Remarks

A `Subscription` counts from the moment it is handed over until it closes or is unsubscribed
and is released on disposal. An `Observable` is wrapped so every attached subscriber counts
separately and is released on disposal. A factory is invoked immediately; its `Observable` result
is wrapped, any other result is adopted as a promise that counts until it settles.

#### Call Signature

```ts
protected withLoading<T>(operation): Promise<T>;
```

Defined in: [presenters/ViewPresenter.ts:200](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/ViewPresenter.ts#L200)

Balances the loading state around an operation.

##### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-2"></a> `T` |

##### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `operation` | () => `T` \| `Promise`\<`T`\> | The operation to track. |

##### Returns

`Promise`\<`T`\>

The tracked operation.

##### Remarks

A `Subscription` counts from the moment it is handed over until it closes or is unsubscribed
and is released on disposal. An `Observable` is wrapped so every attached subscriber counts
separately and is released on disposal. A factory is invoked immediately; its `Observable` result
is wrapped, any other result is adopted as a promise that counts until it settles.
