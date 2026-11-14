---
title: 'Interface: ICompoundItemContext\<T\>'
generated: true
editUrl: false
---
# Interface: ICompoundItemContext\<T\>

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:7](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L7)

Context exposed to a compound item's dynamic template.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| <a id="type-parameter-t"></a> `T` | Collection item type supplied by the consumer. |

## Properties

### $implicit

```ts
readonly $implicit: T;
```

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L14)

Active item exposed as the template's implicit value.

***

### count

```ts
readonly count: number;
```

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:38](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L38)

Total number of items in the collection.

***

### index

```ts
readonly index: number;
```

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L30)

Zero-based index of the active item.

***

### item

```ts
readonly item: T;
```

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:22](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L22)

Active item exposed as a named template value.

***

### tourAnchor

```ts
readonly tourAnchor: (anchorId) => string;
```

Defined in: [libs/ui/src/components/compound/ICompoundItemContext.ts:41](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/compound/ICompoundItemContext.ts#L41)

Resolves a tour anchor only for the active entry, avoiding duplicate anchor registrations.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `anchorId` | `string` |

#### Returns

`string`
