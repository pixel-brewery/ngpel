---
title: 'Interface: IViewportClearanceReservation'
generated: true
editUrl: false
---
# Interface: IViewportClearanceReservation

Defined in: [libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts:2](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts#L2)

A live reservation that can be resized and released.

## Methods

### release()

```ts
release(): void;
```

Defined in: [libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts#L7)

Removes the reservation.

#### Returns

`void`

***

### update()

```ts
update(distance): void;
```

Defined in: [libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts:4](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/viewport-clearance/IViewportClearanceReservation.ts#L4)

Sets the distance in CSS pixels, measured from the viewport edge, that a floating surface keeps clear.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `distance` | `number` |

#### Returns

`void`
