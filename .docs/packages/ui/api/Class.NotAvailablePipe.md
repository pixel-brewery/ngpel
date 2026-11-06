---
title: 'Class: NotAvailablePipe'
generated: true
editUrl: false
---
# Class: NotAvailablePipe

Defined in: [libs/ui/src/pipes/text/NotAvailablePipe.ts:18](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/NotAvailablePipe.ts#L18)

Renders a placeholder instead of an absent value, so a table cell reads as "not filled in" rather
than as an empty gap: <code v-pre>{{ contact.phone &#124; ngpNotAvailable }}</code>.

`null`, `undefined` and the empty string are treated as absent; every other value is rendered
through its string representation. The placeholder comes from [NOT\_AVAILABLE\_TEXT](Variable.NOT_AVAILABLE_TEXT).

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new NotAvailablePipe(): NotAvailablePipe;
```

#### Returns

`NotAvailablePipe`

## Methods

### transform()

```ts
transform<TValue>(value): string;
```

Defined in: [libs/ui/src/pipes/text/NotAvailablePipe.ts:34](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/NotAvailablePipe.ts#L34)

Renders `value`, or the configured placeholder when it is absent.

#### Type Parameters

| Type Parameter |
| ------ |
| `TValue` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `TValue` | The value to render. |

#### Returns

`string`

The string representation of `value`, or the placeholder.

#### Implementation of

```ts
PipeTransform.transform
```
