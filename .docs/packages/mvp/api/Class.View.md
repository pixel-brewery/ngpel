---
title: 'Abstract Class: View\<TPresenter\>'
generated: true
editUrl: false
---
# Abstract Class: View\<TPresenter\>

Defined in: [views/View.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L30)

Base class for the View half of the Model-View-Presenter triad. Components extend it and provide
their concrete presenter through [VIEW\_PRESENTER](Variable.VIEW_PRESENTER), usually with `provideViewPresenter()`.

## Remarks

The View owns nothing but the presenter's lifecycle: `ngOnInit` initializes it, `ngOnDestroy`
disposes it. Everything the template binds to lives on `presenter`.

## Example

```typescript
@Component({ selector: 'ngp-orders', template: '{{ presenter.isLoading() }}', providers: [provideViewPresenter(OrderViewPresenter)] })
class OrderView extends View<OrderViewPresenter> {}
```

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TPresenter` *extends* [`IViewPresenter`](Interface.IViewPresenter) | The concrete presenter provided by the View. |

## Implements

- [`IView`](Interface.IView)\<`TPresenter`\>
- `OnInit`
- `OnDestroy`

## Constructors

### Constructor

```ts
new View<TPresenter>(): View<TPresenter>;
```

#### Returns

`View`\<`TPresenter`\>

## Accessors

### presenter

#### Get Signature

```ts
get presenter(): TPresenter;
```

Defined in: [views/View.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L45)

The presenter backing this view.

##### Returns

`TPresenter`

The presenter backing this view.

#### Implementation of

[`IView`](Interface.IView).[`presenter`](Interface.IView#presenter)

## Methods

### dispose()

```ts
dispose(): void;
```

Defined in: [views/View.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L87)

Disposes the backing presenter. Override to run View-side teardown around it.

#### Returns

`void`

***

### initialize()

```ts
initialize(): void;
```

Defined in: [views/View.ts:77](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L77)

Initializes the backing presenter. Override to run View-side setup around it.

#### Returns

`void`

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: [views/View.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L67)

Disposes the presenter when Angular destroys the View.

#### Returns

`void`

#### Implementation of

```ts
OnDestroy.ngOnDestroy
```

***

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [views/View.ts:58](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/views/View.ts#L58)

Initializes the presenter when Angular initializes the View.

#### Returns

`void`

#### Implementation of

```ts
OnInit.ngOnInit
```
