---
title: 'Class: InfiniteScrollDirective'
generated: true
editUrl: false
---
# Class: InfiniteScrollDirective

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:59](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L59)

Emits an event when the user scrolls near the end of a container.

Attach this directive to an element containing a scrollable container to trigger
data loading when the user approaches the scroll boundary. The directive monitors
scroll events and emits when the scroll position exceeds the threshold defined by
the `offset` property.

## Example

```html
<div ngpInfiniteScroll
     [ngpInfiniteScrollContainer]="'.scroll-area'"
     [ngpInfiniteScrollOffset]="100"
     (ngpInfiniteScrollReached)="loadMore()">
    <div class="scroll-area">
        <!-- scrollable content -->
    </div>
</div>
```

## Implements

- `OnInit`

## Constructors

### Constructor

```ts
new InfiniteScrollDirective(): InfiniteScrollDirective;
```

#### Returns

`InfiniteScrollDirective`

## Properties

### container

```ts
readonly container: InputSignal<string | HTMLElement>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:175](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L175)

CSS selector or element reference identifying the scrollable container.

If a string is provided, it is used as a query selector relative to the host
element. An empty string uses the host element itself as the container.

***

### delay

```ts
readonly delay: InputSignalWithTransform<number, unknown>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:134](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L134)

Debounce delay in milliseconds before processing scroll events.

Higher values reduce processing frequency but increase perceived latency.

***

### directionReversed

```ts
readonly directionReversed: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:161](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L161)

Reverses scroll direction detection for upward infinite scroll.

When `true`, the directive monitors scroll-to-top instead of scroll-to-bottom.

***

### disabled

```ts
readonly disabled: InputSignalWithTransform<boolean, unknown>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:121](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L121)

Disables infinite scroll detection when `true`.

Use this to temporarily pause scroll monitoring while a data request is
in progress or when no more data is available.

***

### offset

```ts
readonly offset: InputSignalWithTransform<number, unknown>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:148](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L148)

Pixel offset from the scroll boundary to trigger the event early.

A positive value causes the event to fire before reaching the absolute end,
allowing content to load before the user perceives the boundary.

***

### reached

```ts
readonly reached: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:185](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L185)

Emits when the scroll position reaches the configured threshold.

## Methods

### ngOnInit()

```ts
ngOnInit(): void;
```

Defined in: [libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts:198](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/infinite-scroll/InfiniteScrollDirective.ts#L198)

Initializes scroll monitoring after Angular processes inputs.

#### Returns

`void`

#### Implementation of

```ts
OnInit.ngOnInit
```
