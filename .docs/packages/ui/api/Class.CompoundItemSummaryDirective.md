---
title: 'Class: CompoundItemSummaryDirective\<T\>'
generated: true
editUrl: false
---
# Class: CompoundItemSummaryDirective\<T\>

Defined in: [libs/ui/src/components/compound/CompoundItemSummaryDirective.ts:10](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemSummaryDirective.ts#L10)

Projects the heading of each stacked compound item.

## Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t"></a> `T` |

## Constructors

### Constructor

```ts
new CompoundItemSummaryDirective<T>(): CompoundItemSummaryDirective<T>;
```

#### Returns

`CompoundItemSummaryDirective`\<`T`\>

## Properties

### templateRef

```ts
readonly templateRef: TemplateRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemSummaryDirective.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemSummaryDirective.ts#L14)

The template rendered with the item's context.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<T>(directive, context): context is ICompoundItemContext<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemSummaryDirective.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemSummaryDirective.ts#L21)

Supplies the item context to Angular's template type checker.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `directive` | `CompoundItemSummaryDirective`\<`T`\> |
| `context` | `unknown` |

#### Returns

`context is ICompoundItemContext<T>`
