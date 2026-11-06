---
title: 'Class: ViewMentionRegistry'
generated: true
editUrl: false
---
# Class: ViewMentionRegistry

Defined in: [mentions/ViewMentionRegistry.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/ViewMentionRegistry.ts#L16)

Tracks active presenter contributions and selects mentions for the current Angular route.

## Constructors

### Constructor

```ts
new ViewMentionRegistry(): ViewMentionRegistry;
```

#### Returns

`ViewMentionRegistry`

## Accessors

### activeViewKey

#### Get Signature

```ts
get activeViewKey(): string | null;
```

Defined in: [mentions/ViewMentionRegistry.ts:32](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/ViewMentionRegistry.ts#L32)

Key of the most recently registered source matching the current route.

##### Returns

`string` \| `null`

## Methods

### items()

```ts
items(query): readonly IViewMentionOption[];
```

Defined in: [mentions/ViewMentionRegistry.ts:62](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/ViewMentionRegistry.ts#L62)

Returns up to fifty current items whose labels contain the query, ignoring case.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `query` | `string` | The label fragment to match. |

#### Returns

readonly [`IViewMentionOption`](Interface.IViewMentionOption)[]

Matching resources from the source selected for the current route.

***

### register()

```ts
register(source): () => void;
```

Defined in: [mentions/ViewMentionRegistry.ts:47](https://github.com/pixel-brewery/ngpel/blob/main/libs/mvp/src/mentions/ViewMentionRegistry.ts#L47)

Registers a source until its presenter releases it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `source` | [`IViewMentionSource`](Interface.IViewMentionSource) | The presenter-owned source to register. |

#### Returns

A callback that releases the registration.

() => `void`
