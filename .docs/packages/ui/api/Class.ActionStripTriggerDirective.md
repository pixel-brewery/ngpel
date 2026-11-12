---
title: 'Class: ActionStripTriggerDirective\<T\>'
generated: true
editUrl: false
---
# Class: ActionStripTriggerDirective\<T\>

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L30)

Shows a declarative action strip while an item is hovered or contains keyboard focus.

Direct item hosts supply `ngpActionStripValue`. A Mosaik data table may omit it: the directive
resolves the body-row value from the composed event path across the component's shadow roots.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | Context value exposed to the action template. |

## Constructors

### Constructor

```ts
new ActionStripTriggerDirective<T>(): ActionStripTriggerDirective<T>;
```

#### Returns

`ActionStripTriggerDirective`\<`T`\>

## Properties

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:53](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L53)

Whether hover and focus invocation is disabled for this host.

***

### strip

```ts
readonly strip: InputSignal<ActionStripComponent<T>>;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L42)

Action strip shown by this host.

***

### value

```ts
readonly value: InputSignal<T | typeof ACTION_STRIP_CONTEXT_FROM_EVENT>;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L47)

Optional item value. When omitted on a Mosaik data table, the body-row value is inferred.

## Methods

### onFocusIn()

```ts
onFocusIn(event): void;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:75](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L75)

Shows the strip for the item containing keyboard focus.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent` |

#### Returns

`void`

***

### onFocusOut()

```ts
onFocusOut(event): void;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:80](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L80)

Hides the strip after keyboard focus leaves the complete active item.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `FocusEvent` |

#### Returns

`void`

***

### onPointerMove()

```ts
onPointerMove(event): void;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:65](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L65)

Tracks item changes inside Shadow-DOM collections whose boundary events are retargeted.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerOut()

```ts
onPointerOut(event): void;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:70](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L70)

Hides the strip after the pointer leaves the complete active item, including the strip.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`

***

### onPointerOver()

```ts
onPointerOver(event): void;
```

Defined in: [libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts:60](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/ActionStripTriggerDirective.ts#L60)

Shows the strip for the item under the pointer.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `PointerEvent` |

#### Returns

`void`
