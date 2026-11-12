---
title: 'Class: MapLoadError'
generated: true
editUrl: false
---
# Class: MapLoadError

Defined in: [libs/ui/src/google-maps/MapLoadError.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapLoadError.ts#L6)

Sanitized failure at the browser Maps SDK boundary.

## Extends

- `Error`

## Constructors

### Constructor

```ts
new MapLoadError(reason): MapLoadError;
```

Defined in: [libs/ui/src/google-maps/MapLoadError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapLoadError.ts#L18)

Creates a failure without exposing a provider URL or API key.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reason` | `"platform"` \| `"configuration"` \| `"load"` | Configuration, platform, or SDK loading failure. |

#### Returns

`MapLoadError`

#### Overrides

`Error.constructor`

## Properties

### reason

```ts
readonly reason: "platform" | "configuration" | "load";
```

Defined in: [libs/ui/src/google-maps/MapLoadError.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/google-maps/MapLoadError.ts#L18)

Configuration, platform, or SDK loading failure.
