---
title: 'Interface: IActionStripContentContext\<T\>'
generated: true
editUrl: false
---
# Interface: IActionStripContentContext\<T\>

Defined in: [libs/ui/src/components/action-strip/IActionStripContentContext.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/IActionStripContentContext.ts#L7)

Template context supplied to declarative action-strip content.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Context value resolved by the trigger. |

## Properties

### $implicit

```ts
readonly $implicit: T;
```

Defined in: [libs/ui/src/components/action-strip/IActionStripContentContext.ts:11](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/action-strip/IActionStripContentContext.ts#L11)

Context value resolved for the item currently hosting the strip.
