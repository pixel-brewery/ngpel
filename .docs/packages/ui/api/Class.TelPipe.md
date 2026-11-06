---
title: 'Class: TelPipe'
generated: true
editUrl: false
---
# Class: TelPipe

Defined in: [libs/ui/src/pipes/links/TelPipe.ts:25](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/TelPipe.ts#L25)

Turns a phone number into a `tel:` link target: `[href]="contact.phone | ngpTel"`.

The visual grouping a number is stored with — spaces, dots, dashes and brackets — is removed,
because a dialler must not receive it, and an already prefixed `tel:` is not prefixed twice. A
value that holds no diallable character yields `null`, so the template can hide the link.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new TelPipe(): TelPipe;
```

#### Returns

`TelPipe`

## Methods

### transform()

```ts
transform(value): string | null;
```

Defined in: [libs/ui/src/pipes/links/TelPipe.ts:35](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/TelPipe.ts#L35)

Builds the `tel:` link target of `value`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | The phone number. |

#### Returns

`string` \| `null`

The `tel:` URL, or `null` when the value is not diallable.

#### Implementation of

```ts
PipeTransform.transform
```
