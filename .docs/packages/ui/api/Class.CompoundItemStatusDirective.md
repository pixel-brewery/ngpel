---
title: 'Class: CompoundItemStatusDirective\<T\>'
generated: true
editUrl: false
---
# Class: CompoundItemStatusDirective\<T\>

Defined in: [libs/ui/src/components/compound/CompoundItemStatusDirective.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemStatusDirective.ts#L10)

Projects status alongside a stacked compound item's heading.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Constructors

### Constructor

```ts
new CompoundItemStatusDirective<T>(): CompoundItemStatusDirective<T>;
```

#### Returns

`CompoundItemStatusDirective`\<`T`\>

## Properties

### templateRef

```ts
readonly templateRef: TemplateRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemStatusDirective.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemStatusDirective.ts#L14)

The template rendered with the item's context.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<T>(directive, context): context is ICompoundItemContext<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemStatusDirective.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemStatusDirective.ts#L21)

Supplies the item context to Angular's template type checker.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `directive` | `CompoundItemStatusDirective`\<`T`\> |
| `context` | `unknown` |

#### Returns

`context is ICompoundItemContext<T>`
