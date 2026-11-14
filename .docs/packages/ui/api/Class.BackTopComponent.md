---
title: 'Class: BackTopComponent'
generated: true
editUrl: false
---
# Class: BackTopComponent

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:55](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L55)

Displays a floating back-to-top button that scrolls the nearest scroll container to the top.

## Implements

- `AfterViewInit`

## Constructors

### Constructor

```ts
new BackTopComponent(): BackTopComponent;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L75)

Constructs a new instance of the `BackTopComponent` class.

#### Returns

`BackTopComponent`

## Properties

### animate

```ts
readonly animate: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L151)

Whether the floating action button fades in and out.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L145)

Accessible label for the action.

***

### offset

```ts
readonly offset: InputSignal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:136](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L136)

The scroll offset before the button becomes visible.

***

### options

```ts
readonly options: InputSignal<ExtendedScrollToOptions | null | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:162](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L162)

The scroll options applied when the button is clicked.

***

### position

```ts
readonly position: Signal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:186](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L186)

Indicates the current scroll progress of the active container.

***

### restored

```ts
readonly restored: OutputEmitterRef<{
  restored: boolean;
  sender: BackTopComponent;
}>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:170](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L170)

Emits when the scroll-to-top action completes.

***

### revealAfter

```ts
readonly revealAfter: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L139)

Shows the control after this element has fully scrolled above the container.

***

### scrollable

```ts
readonly scrollable: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:142](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L142)

Explicit scroll target when the component is outside the scrolling subtree.

***

### size

```ts
readonly size: InputSignal<Size | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L154)

Size of the floating action button. Pass `undefined` to use the host theme default.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L148)

Stable automation identifier for the action.

***

### visible

```ts
readonly visible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L178)

Indicates whether the button is currently visible.

## Accessors

### active

#### Get Signature

```ts
get protected active(): boolean;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:195](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L195)

Applies an active class when the button is visible.

##### Returns

`boolean`

## Methods

### ngAfterViewInit()

```ts
ngAfterViewInit(): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:122](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L122)

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

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:208](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L208)

Scrolls the nearest scroll container back to the top.

#### Returns

`void`

***

### onEnter()

```ts
protected onEnter(event): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:221](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L221)

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

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:233](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L233)

Keeps the button mounted until Mosaik's fade-out has finished.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `AnimationCallbackEvent` |

#### Returns

`void`
