---
title: 'Class: MapViewportDirective'
generated: true
editUrl: false
---
# Class: MapViewportDirective

Defined in: [libs/ui/src/google-maps/MapViewportDirective.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapViewportDirective.ts#L16)

Applies the server-provided bounds to the native Angular map after initialization.

## Constructors

### Constructor

```ts
new MapViewportDirective(): MapViewportDirective;
```

Defined in: [libs/ui/src/google-maps/MapViewportDirective.ts:44](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapViewportDirective.ts#L44)

Reframes when the native map or the server-provided bounds change.

#### Returns

`MapViewportDirective`

## Properties

### bounds

```ts
readonly bounds: InputSignal<LatLngBoundsLiteral | null>;
```

Defined in: [libs/ui/src/google-maps/MapViewportDirective.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapViewportDirective.ts#L25)

Server-provided viewport bounds; null preserves the center and zoom inputs.

***

### viewportChanged

```ts
readonly viewportChanged: OutputEmitterRef<LatLngBounds | null>;
```

Defined in: [libs/ui/src/google-maps/MapViewportDirective.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapViewportDirective.ts#L28)

Actual visible bounds after the camera finishes moving or zooming.
