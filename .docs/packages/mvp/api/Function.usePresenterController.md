---
title: 'Function: usePresenterController()'
generated: true
editUrl: false
---
# Function: usePresenterController()

## Call Signature

```ts
function usePresenterController<TController>(controllerFactory): TController;
```

Defined in: [controllers/usePresenterController.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/usePresenterController.ts#L85)

Creates a presenter controller and binds it to the lifetime of the presenter that creates it.

Call it from a field initializer or the constructor of a presenter. The controller is constructed
inside the presenter's injection context, so it may `inject()` whatever it needs, and it is
disconnected when the presenter's injector is destroyed — no lifecycle hook has to be forwarded.

### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TController` *extends* [`IPresenterController`](Interface.IPresenterController)\<[`IViewPresenter`](Interface.IViewPresenter)\> | The concrete controller type. |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `controllerFactory` | [`PresenterControllerFactory`](TypeAlias.PresenterControllerFactory)\<`TController`\> | The controller class, or a factory that builds one from the host. |

### Returns

`TController`

The connected controller.

### Example

```typescript
@Injectable()
export class OrderListViewPresenter extends ViewPresenter {
    public readonly filters = usePresenterController(FilterController);
    public readonly presence = usePresenterController((host) => new PresenceController(host, config));
}
```

## Call Signature

```ts
function usePresenterController<TPresenter, TController>(controllerFactory): TController;
```

Defined in: [controllers/usePresenterController.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/controllers/usePresenterController.ts#L86)

Creates a presenter controller and binds it to the lifetime of the presenter that creates it.

Call it from a field initializer or the constructor of a presenter. The controller is constructed
inside the presenter's injection context, so it may `inject()` whatever it needs, and it is
disconnected when the presenter's injector is destroyed — no lifecycle hook has to be forwarded.

### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TPresenter` *extends* [`IViewPresenter`](Interface.IViewPresenter) | - |
| `TController` *extends* [`IPresenterController`](Interface.IPresenterController)\<`TPresenter`\> | The concrete controller type. |

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `controllerFactory` | ((`host`) => `TController`) \| ((`host`) => `TController`) | The controller class, or a factory that builds one from the host. |

### Returns

`TController`

The connected controller.

### Example

```typescript
@Injectable()
export class OrderListViewPresenter extends ViewPresenter {
    public readonly filters = usePresenterController(FilterController);
    public readonly presence = usePresenterController((host) => new PresenceController(host, config));
}
```
