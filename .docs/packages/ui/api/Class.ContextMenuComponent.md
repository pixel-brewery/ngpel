---
title: 'Class: ContextMenuComponent\<T\>'
generated: true
editUrl: false
---
# Class: ContextMenuComponent\<T\>

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L61)

Displays caller-provided Mosaik menu actions for the item that opened it. Place one host
beside a list or table and connect it using `ngpContextMenuTriggerFor`.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| <a id="type-parameter-t"></a> `T` | `unknown` | The item passed to the projected template. |

## Constructors

### Constructor

```ts
new ContextMenuComponent<T>(): ContextMenuComponent<T>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:81](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L81)

Releases the document listener when the host is destroyed.

#### Returns

`ContextMenuComponent`\<`T`\>

## Properties

### activeRequest

```ts
protected readonly activeRequest: Signal<
  | IContextMenuOpenRequest<T>
| null>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:93](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L93)

The current item and its anchor, when the popup is open or opening.

***

### content

```ts
protected readonly content: Signal<
  | ContextMenuContentDirective<T>
| undefined>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:96](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L96)

Menu content contributed by the caller.

***

### isOpen

```ts
readonly isOpen: Signal<boolean>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:90](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L90)

Whether a request is active, including while the popup opens.

## Methods

### close()

```ts
close(): Promise<void>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:147](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L147)

Cancels queued openings and closes the active menu.

#### Returns

`Promise`\<`void`\>

***

### onClosed()

```ts
protected onClosed(): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:166](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L166)

#### Returns

`void`

***

### onItemActivated()

```ts
protected onItemActivated(event): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:178](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L178)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`void`

***

### onOpened()

```ts
protected onOpened(): void;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:158](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L158)

#### Returns

`void`

***

### open()

```ts
open(request): Promise<void>;
```

Defined in: [libs/ui/src/components/context-menu/ContextMenuComponent.ts:107](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/ContextMenuComponent.ts#L107)

Opens at the supplied viewport position. A newer request wins over queued openings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`IContextMenuOpenRequest`](Interface.IContextMenuOpenRequest)\<`T`\> | Position, context and element used as the anchor. |

#### Returns

`Promise`\<`void`\>
