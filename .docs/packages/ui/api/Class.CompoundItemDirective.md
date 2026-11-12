---
title: 'Class: CompoundItemDirective\<T\>'
generated: true
editUrl: false
---
# Class: CompoundItemDirective\<T\>

Defined in: [libs/ui/src/components/compound/CompoundItemDirective.ts:17](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemDirective.ts#L17)

Marks the template used to render the active item of a compound collection.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type supplied by the consumer. |

## Constructors

### Constructor

```ts
new CompoundItemDirective<T>(): CompoundItemDirective<T>;
```

#### Returns

`CompoundItemDirective`\<`T`\>

## Properties

### templateRef

```ts
readonly templateRef: TemplateRef<ICompoundItemContext<T>>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemDirective.ts:26](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemDirective.ts#L26)

Template reference rendered by the owning compound component.

## Methods

### ngTemplateContextGuard()

```ts
static ngTemplateContextGuard<T>(directive, context): context is ICompoundItemContext<T>;
```

Defined in: [libs/ui/src/components/compound/CompoundItemDirective.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/CompoundItemDirective.ts#L41)

Describes the template context exposed to Angular template type checking.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-t-1"></a> `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `directive` | `CompoundItemDirective`\<`T`\> | Directive instance whose generic item type is checked. |
| `context` | `unknown` | Template context to narrow. |

#### Returns

`context is ICompoundItemContext<T>`

Whether the context matches the compound item contract.

#### Static
