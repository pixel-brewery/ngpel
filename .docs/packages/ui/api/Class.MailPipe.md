---
title: 'Class: MailPipe'
generated: true
editUrl: false
---
# Class: MailPipe

Defined in: [libs/ui/src/pipes/links/MailPipe.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MailPipe.ts#L30)

Turns an email address into a `mailto:` link target: `[href]="contact.email | ngpMail"`.

An already prefixed `mailto:` is not prefixed twice, and an address that is not syntactically
valid yields `null`, so the template can render plain text instead of a link that cannot work.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new MailPipe(): MailPipe;
```

#### Returns

`MailPipe`

## Methods

### transform()

```ts
transform(value): string | null;
```

Defined in: [libs/ui/src/pipes/links/MailPipe.ts:40](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/links/MailPipe.ts#L40)

Builds the `mailto:` link target of `value`.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | The email address. |

#### Returns

`string` \| `null`

The `mailto:` URL, or `null` when the value is not an email address.

#### Implementation of

```ts
PipeTransform.transform
```
