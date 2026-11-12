---
title: 'Class: MapComponent'
generated: true
editUrl: false
---
# Class: MapComponent

Defined in: [libs/ui/src/google-maps/MapComponent.ts:84](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L84)

Composes Angular Google Maps with lazy SDK loading and deferred native overlays.

## Constructors

### Constructor

```ts
new MapComponent(): MapComponent;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:217](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L217)

Loads the SDK on demand and supplies the actual map to deferred overlays.

#### Returns

`MapComponent`

## Properties

### authFailure

```ts
readonly authFailure: OutputEmitterRef<void>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:197](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L197)

Google Maps authorization failure, such as invalid API restrictions.

***

### center

```ts
readonly center: InputSignal<LatLng | LatLngLiteral | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:133](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L133)

Camera center; otherwise the options center applies.

***

### content

```ts
protected readonly content: Signal<MapContentDirective | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:200](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L200)

***

### contentInjector

```ts
protected readonly contentInjector: Signal<Injector>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:202](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L202)

***

### errorLabel

```ts
readonly errorLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L109)

SDK failure message, localized by the consuming feature.

***

### height

```ts
readonly height: InputSignal<string>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:157](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L157)

Reserved CSS height for the loading, failure, and map surface.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L93)

Name for this map region, localized by the consuming feature.

***

### loadError

```ts
readonly loadError: OutputEmitterRef<MapLoadError>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:189](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L189)

Sanitized SDK bootstrap failure.

***

### loadingLabel

```ts
readonly loadingLabel: InputSignal<string>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:101](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L101)

Accessible loading announcement, localized by the consuming feature.

***

### map

```ts
protected readonly map: Signal<GoogleMap | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:199](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L199)

***

### mapClick

```ts
readonly mapClick: OutputEmitterRef<MapMouseEvent | IconMouseEvent>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:181](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L181)

Map and POI clicks; POI events preserve their placeId and stop method.

***

### mapId

```ts
readonly mapId: InputSignal<string | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:149](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L149)

Google Cloud map ID, required for Advanced Markers and immutable after creation.

***

### mapInitialized

```ts
readonly mapInitialized: OutputEmitterRef<Map>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L173)

Native map instance for SDK capabilities beyond declarative overlays.

***

### markerClustering

```ts
readonly markerClustering: InputSignal<boolean>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:125](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L125)

Loads the official clustering library before creating projected cluster overlays.

***

### options

```ts
readonly options: InputSignal<MapOptions>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:117](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L117)

Map options, including camera, POI visibility, controls, and map ID.

***

### sdk

```ts
protected readonly sdk: ResourceRef<boolean | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:201](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L201)

***

### width

```ts
readonly width: InputSignal<string>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:165](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L165)

Reserved CSS width for the loading, failure, and map surface.

***

### zoom

```ts
readonly zoom: InputSignal<number | undefined>;
```

Defined in: [libs/ui/src/google-maps/MapComponent.ts:141](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapComponent.ts#L141)

Camera zoom; otherwise the options zoom applies.
