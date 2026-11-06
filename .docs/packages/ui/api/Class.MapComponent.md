---
title: 'Class: MapComponent'
generated: true
editUrl: false
---
# Class: MapComponent

Defined in: libs/ui/src/google-maps/MapComponent.ts:84

Composes Angular Google Maps with lazy SDK loading and deferred native overlays.

## Constructors

### Constructor

```ts
new MapComponent(): MapComponent;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:217

Loads the SDK on demand and supplies the actual map to deferred overlays.

#### Returns

`MapComponent`

## Properties

### authFailure

```ts
readonly authFailure: OutputEmitterRef<void>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:197

Google Maps authorization failure, such as invalid API restrictions.

***

### center

```ts
readonly center: InputSignal<LatLng | LatLngLiteral | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:133

Camera center; otherwise the options center applies.

***

### content

```ts
protected readonly content: Signal<MapContentDirective | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:200

***

### contentInjector

```ts
protected readonly contentInjector: Signal<Injector>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:202

***

### errorLabel

```ts
readonly errorLabel: InputSignal<string>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:109

SDK failure message, localized by the consuming feature.

***

### height

```ts
readonly height: InputSignal<string>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:157

Reserved CSS height for the loading, failure, and map surface.

***

### label

```ts
readonly label: InputSignal<string>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:93

Name for this map region, localized by the consuming feature.

***

### loadError

```ts
readonly loadError: OutputEmitterRef<MapLoadError>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:189

Sanitized SDK bootstrap failure.

***

### loadingLabel

```ts
readonly loadingLabel: InputSignal<string>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:101

Accessible loading announcement, localized by the consuming feature.

***

### map

```ts
protected readonly map: Signal<GoogleMap | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:199

***

### mapClick

```ts
readonly mapClick: OutputEmitterRef<MapMouseEvent | IconMouseEvent>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:181

Map and POI clicks; POI events preserve their placeId and stop method.

***

### mapId

```ts
readonly mapId: InputSignal<string | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:149

Google Cloud map ID, required for Advanced Markers and immutable after creation.

***

### mapInitialized

```ts
readonly mapInitialized: OutputEmitterRef<Map>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:173

Native map instance for SDK capabilities beyond declarative overlays.

***

### markerClustering

```ts
readonly markerClustering: InputSignal<boolean>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:125

Loads the official clustering library before creating projected cluster overlays.

***

### options

```ts
readonly options: InputSignal<MapOptions>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:117

Map options, including camera, POI visibility, controls, and map ID.

***

### sdk

```ts
protected readonly sdk: ResourceRef<boolean | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:201

***

### width

```ts
readonly width: InputSignal<string>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:165

Reserved CSS width for the loading, failure, and map surface.

***

### zoom

```ts
readonly zoom: InputSignal<number | undefined>;
```

Defined in: libs/ui/src/google-maps/MapComponent.ts:141

Camera zoom; otherwise the options zoom applies.
