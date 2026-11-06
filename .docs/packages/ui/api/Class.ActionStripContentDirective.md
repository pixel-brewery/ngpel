---
title: 'Class: ActionStripContentDirective\<T\>'
generated: true
editUrl: false
---
# Class: ActionStripContentDirective\<T\>

Defined in: libs/ui/src/components/action-strip/ActionStripContentDirective.ts:15

Marks the declarative HTML template rendered inside an action strip.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Context value resolved by the action-strip trigger. |

## Constructors

### Constructor

```ts
new ActionStripContentDirective<T>(): ActionStripContentDirective<T>;
```

#### Returns

`ActionStripContentDirective`\<`T`\>

## Properties

### templateRef

```ts
readonly templateRef: TemplateRef<IActionStripContentContext<T>>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripContentDirective.ts:19

Template rendered with the active item as its implicit value.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<TContext>(directive, context): context is IActionStripContentContext<TContext>;
```

Defined in: libs/ui/src/components/action-strip/ActionStripContentDirective.ts:35

Narrows the Angular template context to the action-strip contract.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TContext` | Context value resolved by the trigger. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `ActionStripContentDirective`\<`TContext`\> | Directive instance whose generic type is checked. |
| `context` | `unknown` | Template context to narrow. |

#### Returns

`context is IActionStripContentContext<TContext>`

Whether the context is an action-strip template context.

#### Static
