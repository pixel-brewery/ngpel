---
title: 'Class: WidgetGridResizeDirective'
generated: true
editUrl: false
---
# Class: WidgetGridResizeDirective

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L62)

Converts a pointer resize gesture into column/row spans snapped to the visible grid.

Angular CDK intentionally has no resize primitive. Drag/drop remains CDK-owned;
this directive owns only pointer capture and the deterministic resize gesture.

## Constructors

### Constructor

```ts
new WidgetGridResizeDirective(): WidgetGridResizeDirective;
```

#### Returns

`WidgetGridResizeDirective`

## Properties

### configuration

```ts
readonly configuration: InputSignal<IWidgetGridResizeConfiguration>;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L81)

Current widget spans and constraints.

***

### direction

```ts
readonly direction: InputSignal<WidgetGridResizeDirection>;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:86](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L86)

Grid axis controlled by this adornment.

***

### previewChange

```ts
readonly previewChange: OutputEmitterRef<
  | IWidgetGridResizePreview
| null>;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L91)

Emits a snapped target throughout the gesture and `null` after it ends.

***

### resized

```ts
readonly resized: OutputEmitterRef<IWidgetGridResizePreview>;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L96)

Emits the final snapped size after a completed gesture.

## Methods

### onPointerCancel()

```ts
protected onPointerCancel(event): void;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L162)

Cancels a resize without changing the layout.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerDown()

```ts
protected onPointerDown(event): void;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:103](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L103)

Starts a touch-, pen-, or mouse-based resize gesture.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerMove()

```ts
protected onPointerMove(event): void;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L124)

Updates the live target after crossing a visible snap line.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerUp()

```ts
protected onPointerUp(event): void;
```

Defined in: [libs/ui/src/widget/directives/WidgetGridResizeDirective.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/widget/directives/WidgetGridResizeDirective.ts#L147)

Commits the last snapped target.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`
