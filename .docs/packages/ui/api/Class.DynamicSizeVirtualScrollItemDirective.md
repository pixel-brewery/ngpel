---
title: 'Class: DynamicSizeVirtualScrollItemDirective'
generated: true
editUrl: false
---
# Class: DynamicSizeVirtualScrollItemDirective

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts:19](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts#L19)

Marks one rendered item so the dynamic virtual-scroll strategy can measure it by stable key.

## Constructors

### Constructor

```ts
new DynamicSizeVirtualScrollItemDirective(): DynamicSizeVirtualScrollItemDirective;
```

#### Returns

`DynamicSizeVirtualScrollItemDirective`

## Properties

### index

```ts
readonly index: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts#L38)

Logical item index in the complete data source.

***

### key

```ts
readonly key: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/dynamic-size-virtual-scroll/DynamicSizeVirtualScrollItemDirective.ts#L28)

Stable identity of the rendered item.
