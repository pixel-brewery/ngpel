---
title: 'Class: ViewportClearanceDirective'
generated: true
editUrl: false
---
# Class: ViewportClearanceDirective

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts#L30)

Keeps the floating surface clear of the host element, for example an open side panel or a session dock.
The host reserves the distance from its leading edge to the given viewport edge while it is visible.

## Constructors

### Constructor

```ts
new ViewportClearanceDirective(): ViewportClearanceDirective;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts#L44)

#### Returns

`ViewportClearanceDirective`

## Properties

### ngpViewportClearance

```ts
readonly ngpViewportClearance: InputSignalWithTransform<ViewportClearanceEdge, "" | ViewportClearanceEdge>;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts:68](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts#L68)

Viewport edge the host occupies; `right` for side panels, `bottom` for docks.

***

### ngpViewportClearanceDisabled

```ts
readonly ngpViewportClearanceDisabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts:79](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceDirective.ts#L79)

Releases the space while the host stays mounted but is not shown, for example a closed side panel.
