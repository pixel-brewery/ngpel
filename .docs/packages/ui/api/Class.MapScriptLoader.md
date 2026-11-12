---
title: 'Class: MapScriptLoader'
generated: true
editUrl: false
---
# Class: MapScriptLoader

Defined in: [libs/ui/src/google-maps/MapScriptLoader.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapScriptLoader.ts#L16)

Loads only Google's rendering SDK through its supported script entry point.

## Constructors

### Constructor

```ts
new MapScriptLoader(): MapScriptLoader;
```

#### Returns

`MapScriptLoader`

## Methods

### load()

```ts
load(): Promise<void>;
```

Defined in: [libs/ui/src/google-maps/MapScriptLoader.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapScriptLoader.ts#L38)

Loads the map and marker libraries once per browser document.

#### Returns

`Promise`\<`void`\>

Completion of the rendering SDK bootstrap.

***

### loadMarkerClusterer()

```ts
loadMarkerClusterer(): Promise<void>;
```

Defined in: [libs/ui/src/google-maps/MapScriptLoader.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapScriptLoader.ts#L90)

Prepares the official clustering library for Angular's native cluster overlay.

#### Returns

`Promise`\<`void`\>

Completion of the rendering SDK and clustering bootstrap.
