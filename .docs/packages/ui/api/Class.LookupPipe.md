---
title: 'Class: LookupPipe'
generated: true
editUrl: false
---
# Class: LookupPipe

Defined in: [libs/ui/src/pipes/logic/LookupPipe.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/logic/LookupPipe.ts#L18)

Resolves a key through a lookup table, which replaces the `@switch` ladders a template grows once
a status, a severity or a kind has more than two branches:
`[icon]="ticket.status | ngpLookup: statusIcons : 'help'"`.

A key that the table does not hold — including `null` and `undefined` — yields the fallback, so a
value the backend adds later cannot render as an empty cell.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new LookupPipe(): LookupPipe;
```

#### Returns

`LookupPipe`

## Methods

### transform()

```ts
transform<TKey, TValue>(
   key,
   table,
   fallback
): TValue;
```

Defined in: [libs/ui/src/pipes/logic/LookupPipe.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/logic/LookupPipe.ts#L30)

Resolves `key` through `table`.

#### Type Parameters

| Type Parameter |
| ------ |
| `TKey` *extends* `PropertyKey` |
| `TValue` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `TKey` \| `null` \| `undefined` | The key to resolve. |
| `table` | `Readonly`\<`Partial`\<`Record`\<`TKey`, `TValue`\>\>\> | The lookup table. |
| `fallback` | `TValue` | The value for a key the table does not hold. |

#### Returns

`TValue`

The entry of `key`, or `fallback`.

#### Implementation of

```ts
PipeTransform.transform
```
