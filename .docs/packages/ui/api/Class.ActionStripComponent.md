---
title: 'Class: ActionStripComponent\<T\>'
generated: true
editUrl: false
---
# Class: ActionStripComponent\<T\>

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:85

Hosts one item-anchored action strip whose actions are declared as projected HTML.

One component instance is reused for every trigger. Its Mosaik popup is attached to the active
item and its template context is replaced whenever the hovered or focused item changes.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Context value resolved by a trigger. |

## Implements

- `OnDestroy`

## Constructors

### Constructor

```ts
new ActionStripComponent<T>(): ActionStripComponent<T>;
```

#### Returns

`ActionStripComponent`\<`T`\>

## Properties

### activeRequest

```ts
protected readonly activeRequest: Signal<
  | IActionStripShowRequest<T>
| null>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:108

Active item exposed to the declarative content template.

***

### content

```ts
protected readonly content: Signal<
  | ActionStripContentDirective<T>
| undefined>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:111

Caller-provided declarative action template.

## Methods

### cancelScheduledHide()

```ts
cancelScheduledHide(): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:163

Cancels a pending hide while pointer or focus is inside the floating action surface.

#### Returns

`void`

***

### hide()

```ts
hide(origin?): Promise<void>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:178

Hides the strip and clears its active item context.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin?` | `HTMLElement` | Optional item expected to own the currently visible strip. |

#### Returns

`Promise`\<`void`\>

***

### ngOnDestroy()

```ts
ngOnDestroy(): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:118

Cancels deferred interaction work before Angular destroys the strip.

#### Returns

`void`

#### Implementation of

```ts
OnDestroy.ngOnDestroy
```

***

### onActionInteraction()

```ts
protected onActionInteraction(event): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:207

Stops item activation and hides the strip after an action has handled its event.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onClosed()

```ts
protected onClosed(): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:225

Clears transient item context after Mosaik closes the popup.

#### Returns

`void`

***

### onInteraction()

```ts
protected onInteraction(event): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:202

Stops pointer and keyboard events from activating the item beneath the strip.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onSurfaceEnter()

```ts
protected onSurfaceEnter(): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:189

Keeps the strip open while its surface contains pointer or keyboard focus.

#### Returns

`void`

***

### onSurfaceLeave()

```ts
protected onSurfaceLeave(event): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:194

Starts the hide bridge after pointer or keyboard focus leaves the action surface.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` \| `FocusEvent` |

#### Returns

`void`

***

### scheduleHide()

```ts
scheduleHide(origin?): void;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:148

Schedules hiding after a short pointer bridge between an item and its floating strip.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `origin?` | `HTMLElement` | Optional item expected to own the currently visible strip. |

#### Returns

`void`

***

### show()

```ts
show(request): Promise<void>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripComponent.ts:130

Shows this strip at the top end of an item and exposes that item's value to the template.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`IActionStripShowRequest`](Interface.IActionStripShowRequest)\<`T`\> | Active item context and its host element. |

#### Returns

`Promise`\<`void`\>
