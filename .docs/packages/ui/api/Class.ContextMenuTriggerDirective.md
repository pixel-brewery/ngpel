---
title: 'Class: ContextMenuTriggerDirective\<T\>'
generated: true
editUrl: false
---
# Class: ContextMenuTriggerDirective\<T\>

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L31)

Connects a host to a context menu. Supply a value for explicit triggers, or omit it
on a Mosaik data table to read the row value from the event's composed path.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | The item exposed to the menu template. |

## Constructors

### Constructor

```ts
new ContextMenuTriggerDirective<T>(): ContextMenuTriggerDirective<T>;
```

#### Returns

`ContextMenuTriggerDirective`\<`T`\>

## Properties

### disabled

```ts
readonly disabled: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:48](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L48)

Leaves native events alone when the menu is unavailable for this trigger.

***

### menu

```ts
readonly menu: InputSignal<
  | ContextMenuComponent<T>
| undefined>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:42](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L42)

Menu shared by the triggers for a collection.

***

### openOnClick

```ts
readonly openOnClick: InputSignal<boolean>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L51)

Enables a normal click on a visible action button.

***

### value

```ts
readonly value: InputSignal<T | typeof CONTEXT_FROM_EVENT>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:45](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L45)

Optional item value; the default resolves a Mosaik body row from the event path.

## Methods

### onClick()

```ts
protected onClick(event): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `MouseEvent` |

#### Returns

`void`

***

### onContextMenu()

```ts
protected onContextMenu(event): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:57](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L57)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `MouseEvent` |

#### Returns

`void`

***

### onKeyDown()

```ts
protected onKeyDown(event): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts:67](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuTriggerDirective.ts#L67)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `KeyboardEvent` |

#### Returns

`void`
