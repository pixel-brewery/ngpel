---
title: 'Class: PagePathRegistry'
generated: true
editUrl: false
---
# Class: PagePathRegistry

Defined in: [libs/ui/src/components/page-path/PagePathRegistry.ts:6](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathRegistry.ts#L6)

Resolves the latest mounted page path while retaining previous mounted declarations.

## Constructors

### Constructor

```ts
new PagePathRegistry(): PagePathRegistry;
```

#### Returns

`PagePathRegistry`

## Properties

### levels

```ts
readonly levels: Signal<readonly IPagePathLevel[]>;
```

Defined in: [libs/ui/src/components/page-path/PagePathRegistry.ts:16](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathRegistry.ts#L16)

The current declaration's live levels.

## Methods

### register()

```ts
register(levels): () => void;
```

Defined in: [libs/ui/src/components/page-path/PagePathRegistry.ts:27](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/page-path/PagePathRegistry.ts#L27)

Registers a page path until its owner releases it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `levels` | `Signal`\<readonly [`IPagePathLevel`](Interface.IPagePathLevel)[]\> | Live path supplied by the owning page. |

#### Returns

Releases this registration.

() => `void`
