---
title: 'Class: ContextMenuContentDirective\<T\>'
generated: true
editUrl: false
---
# Class: ContextMenuContentDirective\<T\>

Defined in: libs/ui/src/components/context-menu/ContextMenuContentDirective.ts:15

Marks the declarative HTML template rendered inside a context menu.

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Context value resolved by the menu trigger. |

## Constructors

### Constructor

```ts
new ContextMenuContentDirective<T>(): ContextMenuContentDirective<T>;
```

#### Returns

`ContextMenuContentDirective`\<`T`\>

## Properties

### items

```ts
readonly items: InputSignal<"" | readonly T[]>;
```

Defined in: libs/ui/src/components/context-menu/ContextMenuContentDirective.ts:28

Optionally binds a collection so Angular can infer the type of the implicit item.

***

### templateRef

```ts
readonly templateRef: TemplateRef<IContextMenuContentContext<T>>;
```

Defined in: libs/ui/src/components/context-menu/ContextMenuContentDirective.ts:21

Template rendered with the active item as its implicit value.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<TContext>(directive, context): context is IContextMenuContentContext<TContext>;
```

Defined in: libs/ui/src/components/context-menu/ContextMenuContentDirective.ts:44

Narrows the Angular template context to the context-menu contract.

#### Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `TContext` | Context value resolved by the menu trigger. |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `ContextMenuContentDirective`\<`TContext`\> | Directive instance whose generic type is checked. |
| `context` | `unknown` | Template context to narrow. |

#### Returns

`context is IContextMenuContentContext<TContext>`

Whether the context is a context-menu template context.

#### Static
