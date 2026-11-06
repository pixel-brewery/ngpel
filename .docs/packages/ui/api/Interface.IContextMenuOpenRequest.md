---
title: 'Interface: IContextMenuOpenRequest\<T\>'
generated: true
editUrl: false
---
# Interface: IContextMenuOpenRequest\<T\>

Defined in: libs/ui/src/components/context-menu/IContextMenuOpenRequest.ts:7

Describes one request to open a context menu at a viewport position.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Context value associated with the invoking item. |

## Properties

### clientX

```ts
readonly clientX: number;
```

Defined in: libs/ui/src/components/context-menu/IContextMenuOpenRequest.ts:11

Horizontal viewport coordinate of the invocation.

***

### clientY

```ts
readonly clientY: number;
```

Defined in: libs/ui/src/components/context-menu/IContextMenuOpenRequest.ts:16

Vertical viewport coordinate of the invocation.

***

### context

```ts
readonly context: T;
```

Defined in: libs/ui/src/components/context-menu/IContextMenuOpenRequest.ts:21

Item-specific value exposed to the declarative menu template.

***

### origin

```ts
readonly origin: HTMLElement;
```

Defined in: libs/ui/src/components/context-menu/IContextMenuOpenRequest.ts:26

Element that initiated the menu and receives focus again after keyboard use.
