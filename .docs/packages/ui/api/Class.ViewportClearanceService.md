---
title: 'Class: ViewportClearanceService'
generated: true
editUrl: false
---
# Class: ViewportClearanceService

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L25)

Collects the screen areas, such as an open side panel or a session dock, that the floating surface keeps clear.
Overlapping reservations along one edge do not add up; a floating surface keeps clear of the widest one. A modal
full-screen surface opens its own layer: while it is open, only reservations inside it count, because everything
beneath it is covered anyway.

## Constructors

### Constructor

```ts
new ViewportClearanceService(): ViewportClearanceService;
```

#### Returns

`ViewportClearanceService`

## Accessors

### blocked

#### Get Signature

```ts
get blocked(): Signal<boolean>;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L61)

Whether a content view needs the full viewport without a floating surface.

##### Returns

`Signal`\<`boolean`\>

***

### bottom

#### Get Signature

```ts
get bottom(): Signal<number>;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:46](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L46)

Distance from the bottom viewport edge that a floating surface keeps clear.

##### Returns

`Signal`\<`number`\>

***

### right

#### Get Signature

```ts
get right(): Signal<number>;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:56](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L56)

Distance from the right viewport edge that a floating surface keeps clear.

##### Returns

`Signal`\<`number`\>

## Methods

### blockForContent()

```ts
blockForContent(): () => void;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:92](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L92)

Keeps a floating surface hidden while a dense content view is mounted.

#### Returns

() => `void`

***

### openLayer()

```ts
openLayer(root): () => void;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:109](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L109)

Opens a layer for a modal surface that covers everything beneath it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `root` | `Element` | Root element of the modal surface. |

#### Returns

Closes the layer again.

() => `void`

***

### reserve()

```ts
reserve(edge, host?): IViewportClearanceReservation;
```

Defined in: [libs/ui/src/viewport-clearance/ViewportClearanceService.ts:76](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/ViewportClearanceService.ts#L76)

Starts an empty reservation along one edge.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `edge` | [`ViewportClearanceEdge`](TypeAlias.ViewportClearanceEdge) | `undefined` | Viewport edge the surface occupies. |
| `host?` | `Element` \| `null` | `null` | Element that occupies the space; decides the layer the reservation belongs to. |

#### Returns

[`IViewportClearanceReservation`](Interface.IViewportClearanceReservation)
