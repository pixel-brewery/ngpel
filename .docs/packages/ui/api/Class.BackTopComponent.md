---
title: 'Class: BackTopComponent'
generated: true
editUrl: false
---
# Class: BackTopComponent

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:39](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L39)

Displays a floating back-to-top button that scrolls the nearest scroll container to the top.

## Constructors

### Constructor

```ts
new BackTopComponent(): BackTopComponent;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L56)

Constructs a new instance of the `BackTopComponent` class.

#### Returns

`BackTopComponent`

## Properties

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:104](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L104)

Accessible label for the action.

***

### offset

```ts
readonly offset: InputSignal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L95)

The scroll offset before the button becomes visible.

***

### options

```ts
readonly options: InputSignal<ExtendedScrollToOptions | null | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L115)

The scroll options applied when the button is clicked.

***

### position

```ts
readonly position: Signal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:139](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L139)

Indicates the current scroll progress of the active container.

***

### restored

```ts
readonly restored: OutputEmitterRef<{
  restored: boolean;
  sender: BackTopComponent;
}>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:123](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L123)

Emits when the scroll-to-top action completes.

***

### revealAfter

```ts
readonly revealAfter: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:98](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L98)

Shows the control after this element has fully scrolled above the container.

***

### scrollable

```ts
readonly scrollable: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L101)

Explicit scroll target when the component is outside the scrolling subtree.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L107)

Stable automation identifier for the action.

***

### visible

```ts
readonly visible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:131](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L131)

Indicates whether the button is currently visible.

## Accessors

### active

#### Get Signature

```ts
get protected active(): boolean;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L148)

Applies an active class when the button is visible.

##### Returns

`boolean`

## Methods

### onClick()

```ts
protected onClick(): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L161)

Scrolls the nearest scroll container back to the top.

#### Returns

`void`
