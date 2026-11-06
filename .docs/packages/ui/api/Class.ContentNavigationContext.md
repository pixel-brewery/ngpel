---
title: 'Class: ContentNavigationContext'
generated: true
editUrl: false
---
# Class: ContentNavigationContext

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:28](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L28)

Route-scoped registry for stable in-page navigation destinations.

## Constructors

### Constructor

```ts
new ContentNavigationContext(): ContentNavigationContext;
```

#### Returns

`ContentNavigationContext`

## Accessors

### activeItemId

#### Get Signature

```ts
get activeItemId(): Signal<string | null>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:61](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L61)

Identifier of the destination that currently represents the viewport.

##### Returns

`Signal`\<`string` \| `null`\>

***

### items

#### Get Signature

```ts
get items(): Signal<readonly IContentNavigationItem[]>;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:51](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L51)

Registered destinations in their deterministic display order.

##### Returns

`Signal`\<readonly [`IContentNavigationItem`](Interface.IContentNavigationItem)[]\>

## Methods

### activate()

```ts
activate(id): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:78](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L78)

Marks a registered destination as the current viewport destination.

Unknown identifiers are ignored because an observer callback can arrive
immediately after its routed content has been destroyed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Registered destination identifier. |

#### Returns

`void`

***

### navigate()

```ts
navigate(id): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:94](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L94)

Activates a registered destination and invokes its owner-provided navigation behavior.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Registered destination identifier. |

#### Returns

`void`

***

### register()

```ts
register(item, navigate?): () => void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:114](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L114)

Registers one destination and returns an idempotent cleanup callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `item` | [`IContentNavigationItem`](Interface.IContentNavigationItem) | Destination metadata supplied by the content owner. |
| `navigate?` | () => `void` | Optional navigation behavior owned by the destination. |

#### Returns

Cleanup callback for the registration.

() => `void`

***

### synchronizeIntersection()

```ts
synchronizeIntersection(
   id,
   isIntersecting,
   viewport
): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:151](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L151)

Synchronizes one destination's tracking-band intersection with the active outline item.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | Registered destination identifier. |
| `isIntersecting` | `boolean` | Whether the destination currently crosses the tracking band. |
| `viewport` | [`IContentNavigationViewportState`](Interface.IContentNavigationViewportState) | Current scroll direction and boundary state. |

#### Returns

`void`

***

### synchronizeViewport()

```ts
synchronizeViewport(viewport): void;
```

Defined in: [libs/ui/src/components/content-navigation/ContentNavigationContext.ts:173](https://github.com/pixel-brewery/ngpel/blob/main/libs/ui/src/components/content-navigation/ContentNavigationContext.ts#L173)

Resolves the active destination from scroll boundaries, direction, and current intersections.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `viewport` | [`IContentNavigationViewportState`](Interface.IContentNavigationViewportState) | Current scroll direction and boundary state. |

#### Returns

`void`
