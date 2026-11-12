---
title: 'Class: DynamicSizeVirtualScrollStrategy'
generated: true
editUrl: false
---
# Class: DynamicSizeVirtualScrollStrategy

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L17)

Virtual-scroll strategy for lists whose rendered items have different and changing block sizes.

## Extended by

- [`DynamicSizeVirtualScrollDirective`](Class.DynamicSizeVirtualScrollDirective)

## Implements

- `VirtualScrollStrategy`

## Constructors

### Constructor

```ts
new DynamicSizeVirtualScrollStrategy(): DynamicSizeVirtualScrollStrategy;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L41)

Constructs a strategy that observes later size changes when the runtime supports `ResizeObserver`.

#### Returns

`DynamicSizeVirtualScrollStrategy`

## Properties

### scrolledIndexChange

```ts
readonly scrolledIndexChange: Observable<number>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L56)

Emits the first visible logical item index.

#### Implementation of

`VirtualScrollStrategy.scrolledIndexChange`

## Methods

### attach()

```ts
attach(viewport): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:85](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L85)

Attaches the CDK viewport controlled by this strategy.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewport` | `CdkVirtualScrollViewport` | Viewport to control. |

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.attach`

***

### detach()

```ts
detach(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L95)

Releases the attached viewport and observed elements.

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.detach`

***

### onContentRendered()

```ts
onContentRendered(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L124)

Measures and observes the items in the latest rendered range.

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.onContentRendered`

***

### onContentScrolled()

```ts
onContentScrolled(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L106)

Recalculates the rendered range after scrolling.

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.onContentScrolled`

***

### onDataLengthChanged()

```ts
onDataLengthChanged(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L115)

Recalculates the rendered range after a data-length change.

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.onDataLengthChanged`

***

### onRenderedOffsetChanged()

```ts
onRenderedOffsetChanged(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L134)

Handles a rendered-content offset change required by the CDK strategy contract.

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.onRenderedOffsetChanged`

***

### scrollToIndex()

```ts
scrollToIndex(index, behavior): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:145](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L145)

Scrolls to a logical item using measured and estimated sizes.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `index` | `number` | Zero-based logical item index. |
| `behavior` | `ScrollBehavior` | Browser scroll behavior. |

#### Returns

`void`

#### Implementation of

`VirtualScrollStrategy.scrollToIndex`

***

### update()

```ts
update(
   keys,
   estimatedItemSize,
   bufferSize
): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L70)

Updates the ordered keys and sizing configuration.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `keys` | readonly `string`[] | Stable item keys in display order. |
| `estimatedItemSize` | `number` | Initial block size for unmeasured items. |
| `bufferSize` | `number` | Overscan in pixels before and after the viewport. |

#### Returns

`void`
