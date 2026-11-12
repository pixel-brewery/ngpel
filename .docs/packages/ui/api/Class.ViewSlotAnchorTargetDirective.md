---
title: 'Class: ViewSlotAnchorTargetDirective'
generated: true
editUrl: false
---
# Class: ViewSlotAnchorTargetDirective

Defined in: [libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts#L31)

Scrolls an anchored view-slot item into view when it becomes the active anchor.

The host represents one anchor of an outlet that renders several anchored items in a scroll
container. When the active anchor matches the host, the host is scrolled into view; while the
user has not scrolled manually, preceding items that change height (lazy content) trigger a
realignment so the anchor stays at the top. A monotonic request marker re-scrolls an anchor
that is already active.

## Example

```html
@for (section of sections(); track section.id) {
    <section [ngpViewSlotAnchorTarget]="section.id" [ngpViewSlotActiveAnchor]="activeAnchor()" [ngpViewSlotAnchorRequest]="anchorRequest()">
        <ng-container *ngTemplateOutlet="section.template" />
    </section>
}
```

## Constructors

### Constructor

```ts
new ViewSlotAnchorTargetDirective(elementRef?, destroyRef?): ViewSlotAnchorTargetDirective;
```

Defined in: [libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts:54](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts#L54)

Constructs a new instance of the `ViewSlotAnchorTargetDirective` class.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `elementRef?` | `ElementRef`\<`HTMLElement`\> | The host element representing the anchor. |
| `destroyRef?` | `DestroyRef` | The destruction lifecycle used to cancel pending work. |

#### Returns

`ViewSlotAnchorTargetDirective`

## Properties

### activeAnchor

```ts
readonly activeAnchor: InputSignal<string | null>;
```

Defined in: [libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts#L79)

Currently active anchor identifier.

***

### anchor

```ts
readonly anchor: InputSignal<string>;
```

Defined in: [libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts:71](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts#L71)

Anchor identifier represented by the host element.

***

### request

```ts
readonly request: InputSignal<number>;
```

Defined in: [libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts:87](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/directives/view-slot-anchor-target/ViewSlotAnchorTargetDirective.ts#L87)

Monotonic request marker used to re-scroll the same active anchor.
