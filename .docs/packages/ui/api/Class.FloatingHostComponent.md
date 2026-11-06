---
title: 'Class: FloatingHostComponent'
generated: true
editUrl: false
---
# Class: FloatingHostComponent

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L104)

Generic floating host container that can be positioned anywhere on screen.
Supports drag-to-move and resize functionality.
Use content projection for header and body content.

## Constructors

### Constructor

```ts
new FloatingHostComponent(): FloatingHostComponent;
```

#### Returns

`FloatingHostComponent`

## Properties

### minHeight

```ts
readonly minHeight: InputSignal<number>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L134)

Minimum height constraint in pixels.

***

### minWidth

```ts
readonly minWidth: InputSignal<number>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:127](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L127)

Minimum width constraint in pixels.

***

### position

```ts
readonly position: InputSignal<IFloatingHostPosition>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:120](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L120)

The current position and size of the floating host.

***

### positionChange

```ts
readonly positionChange: OutputEmitterRef<IFloatingHostPosition>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L148)

Emits when the position or size changes due to drag or resize.

***

### resizable

```ts
readonly resizable: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L141)

Whether the resize handle is visible.

***

### showResizeHandle

```ts
protected readonly showResizeHandle: Signal<boolean>;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:156](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L156)

Whether the resize handle should be shown.

## Methods

### onDragEnded()

```ts
protected onDragEnded(event): void;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:168](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L168)

Handles drag end to emit the new position.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `CdkDragEnd` | The drag end event. |

#### Returns

`void`

***

### onResizeStart()

```ts
protected onResizeStart(event): void;
```

Defined in: [libs/ui/src/components/floating-host/FloatingHostComponent.ts:190](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/floating-host/FloatingHostComponent.ts#L190)

Handles resize start from the resize handle.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `MouseEvent` | The mouse down event. |

#### Returns

`void`
