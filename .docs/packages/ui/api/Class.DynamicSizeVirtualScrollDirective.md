---
title: 'Class: DynamicSizeVirtualScrollDirective'
generated: true
editUrl: false
---
# Class: DynamicSizeVirtualScrollDirective

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts:23](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts#L23)

Provides dynamic-size virtualization to a CDK viewport.

## Extends

- [`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy)

## Constructors

### Constructor

```ts
new DynamicSizeVirtualScrollDirective(): DynamicSizeVirtualScrollDirective;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts#L65)

Constructs the strategy provider and synchronizes its signal inputs.

#### Returns

`DynamicSizeVirtualScrollDirective`

#### Overrides

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`constructor`](Class.DynamicSizeVirtualScrollStrategy#constructor)

## Properties

### bufferSize

```ts
readonly bufferSize: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts:52](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts#L52)

Overscan in pixels rendered before and after the visible viewport.

***

### estimatedItemSize

```ts
readonly estimatedItemSize: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts#L42)

Initial block size used until an item has been measured.

***

### keys

```ts
readonly keys: InputSignal<readonly string[]>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollDirective.ts#L32)

Stable item keys in the same order as the viewport data.

***

### scrolledIndexChange

```ts
readonly scrolledIndexChange: Observable<number>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L56)

Emits the first visible logical item index.

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`scrolledIndexChange`](Class.DynamicSizeVirtualScrollStrategy#scrolledindexchange)

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

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`attach`](Class.DynamicSizeVirtualScrollStrategy#attach)

***

### detach()

```ts
detach(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:95](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L95)

Releases the attached viewport and observed elements.

#### Returns

`void`

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`detach`](Class.DynamicSizeVirtualScrollStrategy#detach)

***

### onContentRendered()

```ts
onContentRendered(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:124](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L124)

Measures and observes the items in the latest rendered range.

#### Returns

`void`

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`onContentRendered`](Class.DynamicSizeVirtualScrollStrategy#oncontentrendered)

***

### onContentScrolled()

```ts
onContentScrolled(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:106](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L106)

Recalculates the rendered range after scrolling.

#### Returns

`void`

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`onContentScrolled`](Class.DynamicSizeVirtualScrollStrategy#oncontentscrolled)

***

### onDataLengthChanged()

```ts
onDataLengthChanged(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:115](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L115)

Recalculates the rendered range after a data-length change.

#### Returns

`void`

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`onDataLengthChanged`](Class.DynamicSizeVirtualScrollStrategy#ondatalengthchanged)

***

### onRenderedOffsetChanged()

```ts
onRenderedOffsetChanged(): void;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollStrategy.ts#L134)

Handles a rendered-content offset change required by the CDK strategy contract.

#### Returns

`void`

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`onRenderedOffsetChanged`](Class.DynamicSizeVirtualScrollStrategy#onrenderedoffsetchanged)

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

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`scrollToIndex`](Class.DynamicSizeVirtualScrollStrategy#scrolltoindex)

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

#### Inherited from

[`DynamicSizeVirtualScrollStrategy`](Class.DynamicSizeVirtualScrollStrategy).[`update`](Class.DynamicSizeVirtualScrollStrategy#update)
