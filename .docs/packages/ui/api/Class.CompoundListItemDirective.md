---
title: 'Class: CompoundListItemDirective\<T\>'
generated: true
editUrl: false
---
# Class: CompoundListItemDirective\<T\>

Defined in: [libs/ui/src/components/compound/CompoundListItemDirective.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundListItemDirective.ts#L17)

Marks the template used to render each item in the compound list view.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | Collection item type supplied by the consumer. |

## Constructors

### Constructor

```ts
new CompoundListItemDirective<T>(): CompoundListItemDirective<T>;
```

#### Returns

`CompoundListItemDirective`\<`T`\>

## Properties

### templateRef

```ts
readonly templateRef: TemplateRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundListItemDirective.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundListItemDirective.ts#L34)

Template reference rendered by the owning compound component.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<T>(directive, context): context is ICompoundItemContext<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundListItemDirective.ts:49](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundListItemDirective.ts#L49)

Describes the template context exposed to Angular template type checking.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `CompoundListItemDirective`\<`T`\> | Directive instance whose generic item type is checked. |
| `context` | `unknown` | Template context to narrow. |

#### Returns

`context is ICompoundItemContext<T>`

Whether the context matches the compound list item contract.

#### Static
