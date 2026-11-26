---
title: 'Class: BackTopComponent'
generated: true
editUrl: false
---
# Class: BackTopComponent

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L56)

Displays a floating back-to-top button that scrolls the nearest scroll container to the top.

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new BackTopComponent(): BackTopComponent;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L76)

Constructs a new instance of the `BackTopComponent` class.

#### Returns

`BackTopComponent`

## Properties

### animate

```ts
readonly animate: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:152](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L152)

Whether the floating action button fades in and out.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:146](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L146)

Accessible label for the action.

***

### offset

```ts
readonly offset: InputSignal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:137](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L137)

The scroll offset before the button becomes visible.

***

### options

```ts
readonly options: InputSignal<ExtendedScrollToOptions | null | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:163](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L163)

The scroll options applied when the button is clicked.

***

### position

```ts
readonly position: Signal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:187](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L187)

Indicates the current scroll progress of the active container.

***

### restored

```ts
readonly restored: OutputEmitterRef<{
  restored: boolean;
  sender: BackTopComponent;
}>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:171](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L171)

Emits when the scroll-to-top action completes.

***

### revealAfter

```ts
readonly revealAfter: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:140](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L140)

Shows the control after this element has fully scrolled above the container.

***

### scrollable

```ts
readonly scrollable: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:143](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L143)

Explicit scroll target when the component is outside the scrolling subtree.

***

### size

```ts
readonly size: InputSignal<Size | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:155](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L155)

Size of the floating action button. Pass `undefined` to use the host theme default.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L149)

Stable automation identifier for the action.

***

### visible

```ts
readonly visible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:179](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L179)

Indicates whether the button is currently visible.

## Accessors

### active

#### Get Signature

```ts
get protected active(): boolean;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:196](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L196)

Applies an active class when the button is visible.

##### Returns

`boolean`

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L123)

Starts observing the scroll container once the view is mounted.

#### Returns

`void`

#### Implementation of

`AfterViewInit.ngAfterViewInit`

***

### onClick()

```ts
protected onClick(): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:209](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L209)

Scrolls the nearest scroll container back to the top.

#### Returns

`void`

***

### onEnter()

```ts
protected onEnter(event): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:222](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L222)

Fades in the button using the Mosaik preset.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `AnimationCallbackEvent` |

#### Returns

`void`

***

### onLeave()

```ts
protected onLeave(event): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:234](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L234)

Keeps the button mounted until Mosaik's fade-out has finished.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `AnimationCallbackEvent` |

#### Returns

`void`
