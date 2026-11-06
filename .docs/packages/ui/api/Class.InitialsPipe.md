---
title: 'Class: InitialsPipe'
generated: true
editUrl: false
---
# Class: InitialsPipe

Defined in: [libs/ui/src/pipes/text/InitialsPipe.ts:21](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/InitialsPipe.ts#L21)

Reduces a display name to at most two upper-case initials for avatar fallbacks:
<code v-pre>{{ user.displayName &#124; ngpInitials }}</code> renders `AW` for `Andre Wehlert`.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new InitialsPipe(): InitialsPipe;
```

#### Returns

`InitialsPipe`

## Methods

### transform()

```ts
transform(value): string;
```

Defined in: [libs/ui/src/pipes/text/InitialsPipe.ts:31](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/pipes/text/InitialsPipe.ts#L31)

Builds the initials of a display name.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | The display name. |

#### Returns

`string`

Up to two upper-case initials, or an empty string when there is no name.

#### Implementation of

```ts
PipeTransform.transform
```
