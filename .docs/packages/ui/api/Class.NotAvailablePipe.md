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
through its string representation. The default placeholder comes from [NOT\_AVAILABLE\_TEXT](Variable.NOT_AVAILABLE_TEXT).

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
transform<TValue>(value, placeholder?): string;
```

Defined in: [libs/ui/src/pipes/text/NotAvailablePipe.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/NotAvailablePipe.ts#L35)

Renders `value`, or the configured placeholder when it is absent.

#### Type Parameters

| Type Parameter |
| ------ |
| <a id="type-parameter-tvalue"></a> `TValue` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `TValue` | The value to render. |
| `placeholder?` | `string` | Overrides the default placeholder for this binding. |

#### Returns

`string`

The string representation of `value`, or the placeholder.

#### Implementation of

`PipeTransform.transform`
