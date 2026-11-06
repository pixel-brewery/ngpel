---
title: 'Interface: IActionStripShowRequest\<T\>'
generated: true
editUrl: false
---
# Interface: IActionStripShowRequest\<T\>

Defined in: libs/ui/src/components/action-strip/IActionStripShowRequest.ts:7

Information required to show an action strip for one item.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Context value exposed to the declarative content template. |

## Properties

### boundaries

```ts
readonly boundaries: readonly Element[];
```

Defined in: libs/ui/src/components/action-strip/IActionStripShowRequest.ts:9

Clipping ancestors that define the item's visible viewport.

***

### context

```ts
readonly context: T;
```

Defined in: libs/ui/src/components/action-strip/IActionStripShowRequest.ts:12

Item-specific context exposed as the content template's implicit value.

***

### origin

```ts
readonly origin: HTMLElement;
```

Defined in: libs/ui/src/components/action-strip/IActionStripShowRequest.ts:15

Element that owns the action strip while it is visible.
