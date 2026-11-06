---
title: 'Function: provideViewPresenter()'
generated: true
editUrl: false
---
# Function: provideViewPresenter()

```ts
function provideViewPresenter(presenter): Provider[];
```

Defined in: [presenters/provideViewPresenter.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/presenters/provideViewPresenter.ts#L27)

Binds a concrete presenter to [VIEW\_PRESENTER](Variable.VIEW_PRESENTER) for one View.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `presenter` | `Type`\<[`IViewPresenter`](Interface.IViewPresenter)\> | The presenter type instantiated for the View. |

## Returns

`Provider`[]

The providers to place on the View component.

## Remarks

Belongs in the `providers` of the component that extends [View](Class.View), so every instance of that
component owns its presenter and disposes it with its own injector. The presenter type must carry
its own `@Injectable()`; Angular refuses to instantiate a class that only inherits the decorator.

## Example

```typescript
@Component({ selector: 'ngp-orders', template: '', providers: [provideViewPresenter(OrderViewPresenter)] })
class OrderView extends View<OrderViewPresenter> {}
```
