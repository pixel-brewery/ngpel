---
title: 'Interface: IContextMenuContentContext\<T\>'
generated: true
editUrl: false
---
# Interface: IContextMenuContentContext\<T\>

Defined in: [libs/ui/src/components/context-menu/IContextMenuContentContext.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/IContextMenuContentContext.ts#L7)

Template context supplied to declarative context-menu content.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Context value resolved by the trigger. |

## Properties

### $implicit

```ts
readonly $implicit: T;
```

Defined in: [libs/ui/src/components/context-menu/IContextMenuContentContext.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/context-menu/IContextMenuContentContext.ts#L11)

Context value resolved for the item that opened the menu.
