---
title: 'Class: MediaUrlPipe'
generated: true
editUrl: false
---
# Class: MediaUrlPipe

Defined in: [browser/media/MediaUrlPipe.ts:14](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlPipe.ts#L14)

Resolves backend-owned media paths for template bindings: `[src]="user.avatarUrl | ngpMediaUrl"`.

## Implements

- `PipeTransform`

## Constructors

### Constructor

```ts
new MediaUrlPipe(): MediaUrlPipe;
```

#### Returns

`MediaUrlPipe`

## Methods

### transform()

```ts
transform(value): string;
```

Defined in: [browser/media/MediaUrlPipe.ts:30](https://github.com/pixel-brewery/ngpel/blob/main/libs/core/src/browser/media/MediaUrlPipe.ts#L30)

Resolves `value` through the [MediaUrlResolver](Class.MediaUrlResolver).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `string` \| `null` \| `undefined` | Media URL returned by an API or created locally for a preview. |

#### Returns

`string`

The resolved URL, or `''` for `null`/`undefined`.

#### Implementation of

```ts
PipeTransform.transform
```
