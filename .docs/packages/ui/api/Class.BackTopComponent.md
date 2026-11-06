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

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:97](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L97)

Accessible label for the action.

***

### offset

```ts
readonly offset: InputSignal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:91](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L91)

The scroll offset before the button becomes visible.

***

### options

```ts
readonly options: InputSignal<ExtendedScrollToOptions | null | undefined>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:108](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L108)

The scroll options applied when the button is clicked.

***

### position

```ts
readonly position: Signal<number>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:132](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L132)

Indicates the current scroll progress of the active container.

***

### restored

```ts
readonly restored: OutputEmitterRef<{
  restored: boolean;
  sender: BackTopComponent;
}>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:116](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L116)

Emits when the scroll-to-top action completes.

***

### scrollable

```ts
readonly scrollable: InputSignal<HTMLElement | null>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L94)

Explicit scroll target when the component is outside the scrolling subtree.

***

### testId

```ts
readonly testId: InputSignal<string>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:100](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L100)

Stable automation identifier for the action.

***

### visible

```ts
readonly visible: Signal<boolean>;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L124)

Indicates whether the button is currently visible.

## Accessors

### active

#### Get Signature

```ts
get protected active(): boolean;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L141)

Applies an active class when the button is visible.

##### Returns

`boolean`

## Methods

### onClick()

```ts
protected onClick(): void;
```

Defined in: [libs/ui/src/components/back-top/BackTopComponent.ts:154](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/back-top/BackTopComponent.ts#L154)

Scrolls the nearest scroll container back to the top.

#### Returns

`void`
